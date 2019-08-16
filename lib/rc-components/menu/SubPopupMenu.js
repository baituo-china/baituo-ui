'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPopupMenu = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

exports.getActiveKey = getActiveKey;
exports.saveRef = saveRef;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _miniStore = require('mini-store');

var _KeyCode = require('../../_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _createChainedFunction = require('../util/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _util = require('./util');

var _DOMWrap = require('./DOMWrap');

var _DOMWrap2 = _interopRequireDefault(_DOMWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function allDisabled(arr) {
  if (!arr.length) {
    return true;
  }
  return arr.every(function (c) {
    return !!c.props.disabled;
  });
}

function updateActiveKey(store, menuId, activeKey) {
  var state = store.getState();
  store.setState({
    activeKey: (0, _extends5['default'])({}, state.activeKey, (0, _defineProperty3['default'])({}, menuId, activeKey))
  });
}

function getEventKey(props) {
  // when eventKey not available ,it's menu and return menu id '0-menu-'
  return props.eventKey || '0-menu-';
}

function getActiveKey(props, originalActiveKey) {
  var activeKey = originalActiveKey;
  var children = props.children,
      eventKey = props.eventKey;

  if (activeKey) {
    var found = void 0;
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (c && !c.props.disabled && activeKey === (0, _util.getKeyFromChildrenIndex)(c, eventKey, i)) {
        found = true;
      }
    });
    if (found) {
      return activeKey;
    }
  }
  activeKey = null;
  if (props.defaultActiveFirst) {
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (!activeKey && c && !c.props.disabled) {
        activeKey = (0, _util.getKeyFromChildrenIndex)(c, eventKey, i);
      }
    });
    return activeKey;
  }
  return activeKey;
}

function saveRef(c) {
  if (c) {
    var index = this.instanceArray.indexOf(c);
    if (index !== -1) {
      // update component if it's already inside instanceArray
      this.instanceArray[index] = c;
    } else {
      // add component if it's not in instanceArray yet;
      this.instanceArray.push(c);
    }
  }
}

var SubPopupMenu = exports.SubPopupMenu = function (_Component) {
  (0, _inherits3['default'])(SubPopupMenu, _Component);

  function SubPopupMenu(props) {
    (0, _classCallCheck3['default'])(this, SubPopupMenu);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (SubPopupMenu.__proto__ || Object.getPrototypeOf(SubPopupMenu)).call(this, props));

    _initialiseProps.call(_this);

    props.store.setState({
      activeKey: (0, _extends5['default'])({}, props.store.getState().activeKey, (0, _defineProperty3['default'])({}, props.eventKey, getActiveKey(props, props.activeKey)))
    });

    _this.instanceArray = [];
    return _this;
  }

  (0, _createClass3['default'])(SubPopupMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // invoke customized ref to expose component to mixin
      if (this.props.manualRef) {
        this.props.manualRef(this);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !this.props.hidden || !nextProps.hidden;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var props = this.props;
      var originalActiveKey = 'activeKey' in props ? props.activeKey : props.store.getState().activeKey[getEventKey(props)];
      var activeKey = getActiveKey(props, originalActiveKey);
      if (activeKey !== originalActiveKey) {
        updateActiveKey(props.store, getEventKey(props), activeKey);
      }
    }

    // all keyboard events callbacks run from here at first

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = (0, _objectWithoutProperties3['default'])(this.props, []);


      this.instanceArray = [];
      var className = (0, _classnames2['default'])(props.prefixCls, props.className, props.prefixCls + '-' + props.mode);
      var haveRendered = this.haveRendered;
      this.haveRendered = true;
      this.haveOpened = this.haveOpened || !props.hidden || props.forceSubMenuRender;
      if (!this.haveOpened) {
        return null;
      }
      var domProps = {
        className: className,
        // role could be 'select' and by default set to menu
        role: props.role || 'menu'
      };
      if (props.id) {
        domProps.id = props.id;
      }
      if (props.focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.onKeyDown;
      }
      var prefixCls = props.prefixCls,
          eventKey = props.eventKey,
          hidden = props.hidden,
          level = props.level,
          mode = props.mode,
          overflowedIndicator = props.overflowedIndicator,
          theme = props.theme;

      _util.menuAllProps.forEach(function (key) {
        return delete props[key];
      });

      var transitionAppear = !(!haveRendered && !props.hidden && props.mode === 'inline');

      props.className += ' ' + props.prefixCls + '-sub';
      delete props.onClick;
      var animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if ((0, _typeof3['default'])(props.openAnimation) === 'object') {
        animProps.animation = (0, _extends5['default'])({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      return (
        /* eslint-disable */
        _react2['default'].createElement(
          _DOMWrap2['default'],
          (0, _extends5['default'])({}, props, {
            prefixCls: prefixCls,
            mode: mode,
            tag: 'ul',
            level: level,
            theme: theme,
            hiddenClassName: prefixCls + '-hidden',
            hidden: hidden,
            overflowedIndicator: overflowedIndicator
          }, domProps),
          _react.Children.map(props.children, function (c, i) {
            return _this2.renderMenuItem(c, i, eventKey || '0-menu-');
          })
        )
        /*eslint-enable */

      );
    }
  }]);
  return SubPopupMenu;
}(_react.Component);

SubPopupMenu.propTypes = {
  onSelect: _propTypes2['default'].func,
  onClick: _propTypes2['default'].func,
  onDeselect: _propTypes2['default'].func,
  onOpenChange: _propTypes2['default'].func,
  onDestroy: _propTypes2['default'].func,
  openTransitionName: _propTypes2['default'].string,
  openAnimation: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
  openKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  hidden: _propTypes2['default'].bool,
  children: _propTypes2['default'].any,
  parentMenu: _propTypes2['default'].object,
  eventKey: _propTypes2['default'].string,
  store: _propTypes2['default'].shape({
    getState: _propTypes2['default'].func,
    setState: _propTypes2['default'].func
  }),

  // adding in refactor
  focusable: _propTypes2['default'].bool,
  multiple: _propTypes2['default'].bool,
  style: _propTypes2['default'].object,
  defaultActiveFirst: _propTypes2['default'].bool,
  activeKey: _propTypes2['default'].string,
  selectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  defaultSelectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  defaultOpenKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  level: _propTypes2['default'].number,
  mode: _propTypes2['default'].oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  triggerSubMenuAction: _propTypes2['default'].oneOf(['click', 'hover']),
  inlineIndent: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  manualRef: _propTypes2['default'].func,
  itemIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].node]),
  expandIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].node])
};
SubPopupMenu.defaultProps = {
  prefixCls: 'rc-menu',
  className: '',
  mode: 'vertical',
  level: 1,
  inlineIndent: 24,
  hidden: false,
  focusable: true,
  style: {},
  manualRef: _noop2['default']
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onKeyDown = function (e, callback) {
    var keyCode = e.keyCode;
    var handled = void 0;
    _this3.getFlatInstanceArray().forEach(function (obj) {
      if (obj && obj.props.active && obj.onKeyDown) {
        handled = obj.onKeyDown(e);
      }
    });
    if (handled) {
      return 1;
    }
    var activeItem = null;
    if (keyCode === _KeyCode2['default'].UP || keyCode === _KeyCode2['default'].DOWN) {
      activeItem = _this3.step(keyCode === _KeyCode2['default'].UP ? -1 : 1);
    }
    if (activeItem) {
      e.preventDefault();
      updateActiveKey(_this3.props.store, getEventKey(_this3.props), activeItem.props.eventKey);

      if (typeof callback === 'function') {
        callback(activeItem);
      }

      return 1;
    }
  };

  this.onItemHover = function (e) {
    var key = e.key,
        hover = e.hover;

    updateActiveKey(_this3.props.store, getEventKey(_this3.props), hover ? key : null);
  };

  this.onDeselect = function (selectInfo) {
    _this3.props.onDeselect(selectInfo);
  };

  this.onSelect = function (selectInfo) {
    _this3.props.onSelect(selectInfo);
  };

  this.onClick = function (e) {
    _this3.props.onClick(e);
  };

  this.onOpenChange = function (e) {
    _this3.props.onOpenChange(e);
  };

  this.onDestroy = function (key) {
    /* istanbul ignore next */
    _this3.props.onDestroy(key);
  };

  this.getFlatInstanceArray = function () {
    return _this3.instanceArray;
  };

  this.getOpenTransitionName = function () {
    return _this3.props.openTransitionName;
  };

  this.step = function (direction) {
    var children = _this3.getFlatInstanceArray();
    var activeKey = _this3.props.store.getState().activeKey[getEventKey(_this3.props)];
    var len = children.length;
    if (!len) {
      return null;
    }
    if (direction < 0) {
      children = children.concat().reverse();
    }
    // find current activeIndex
    var activeIndex = -1;
    children.every(function (c, ci) {
      if (c && c.props.eventKey === activeKey) {
        activeIndex = ci;
        return false;
      }
      return true;
    });
    if (!_this3.props.defaultActiveFirst && activeIndex !== -1 && allDisabled(children.slice(activeIndex, len - 1))) {
      return undefined;
    }
    var start = (activeIndex + 1) % len;
    var i = start;

    do {
      var child = children[i];
      if (!child || child.props.disabled) {
        i = (i + 1) % len;
      } else {
        return child;
      }
    } while (i !== start);

    return null;
  };

  this.renderCommonMenuItem = function (child, i, extraProps) {
    var state = _this3.props.store.getState();
    var props = _this3.props;
    var key = (0, _util.getKeyFromChildrenIndex)(child, props.eventKey, i);
    var childProps = child.props;
    var isActive = key === state.activeKey;
    var newChildProps = (0, _extends5['default'])({
      mode: childProps.mode || props.mode,
      level: props.level,
      inlineIndent: props.inlineIndent,
      renderMenuItem: _this3.renderMenuItem,
      rootPrefixCls: props.prefixCls,
      index: i,
      parentMenu: props.parentMenu,
      // customized ref function, need to be invoked manually in child's componentDidMount
      manualRef: childProps.disabled ? undefined : (0, _createChainedFunction2['default'])(child.ref, saveRef.bind(_this3)),
      eventKey: key,
      active: !childProps.disabled && isActive,
      multiple: props.multiple,
      onClick: function onClick(e) {
        (childProps.onClick || _noop2['default'])(e);
        _this3.onClick(e);
      },
      onItemHover: _this3.onItemHover,
      openTransitionName: _this3.getOpenTransitionName(),
      openAnimation: props.openAnimation,
      subMenuOpenDelay: props.subMenuOpenDelay,
      subMenuCloseDelay: props.subMenuCloseDelay,
      forceSubMenuRender: props.forceSubMenuRender,
      onOpenChange: _this3.onOpenChange,
      onDeselect: _this3.onDeselect,
      onSelect: _this3.onSelect,
      builtinPlacements: props.builtinPlacements,
      itemIcon: childProps.itemIcon || _this3.props.itemIcon,
      expandIcon: childProps.expandIcon || _this3.props.expandIcon
    }, extraProps);
    if (props.mode === 'inline') {
      newChildProps.triggerSubMenuAction = 'click';
    }
    return (0, _react.cloneElement)(child, newChildProps);
  };

  this.renderMenuItem = function (c, i, subMenuKey) {
    /* istanbul ignore if */
    if (!c) {
      return null;
    }
    var props = _this3.props;
    var extraProps = {
      openKeys: props.openKeys,
      selectedKeys: props.selectedKeys,
      triggerSubMenuAction: props.triggerSubMenuAction,
      subMenuKey: subMenuKey
    };
    return _this3.renderCommonMenuItem(c, i, extraProps);
  };
};

var connected = (0, _miniStore.connect)()(SubPopupMenu);

exports['default'] = connected;