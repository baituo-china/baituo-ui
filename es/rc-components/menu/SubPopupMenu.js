import _typeof from 'babel-runtime/helpers/typeof';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import { connect } from 'mini-store';
import KeyCode from '../../_util/KeyCode';
import createChainedFunction from '../util/createChainedFunction';
import { getKeyFromChildrenIndex, loopMenuItem, menuAllProps } from './util';
import DOMWrap from './DOMWrap';

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
    activeKey: _extends({}, state.activeKey, _defineProperty({}, menuId, activeKey))
  });
}

function getEventKey(props) {
  // when eventKey not available ,it's menu and return menu id '0-menu-'
  return props.eventKey || '0-menu-';
}

export function getActiveKey(props, originalActiveKey) {
  var activeKey = originalActiveKey;
  var children = props.children,
      eventKey = props.eventKey;

  if (activeKey) {
    var found = void 0;
    loopMenuItem(children, function (c, i) {
      if (c && !c.props.disabled && activeKey === getKeyFromChildrenIndex(c, eventKey, i)) {
        found = true;
      }
    });
    if (found) {
      return activeKey;
    }
  }
  activeKey = null;
  if (props.defaultActiveFirst) {
    loopMenuItem(children, function (c, i) {
      if (!activeKey && c && !c.props.disabled) {
        activeKey = getKeyFromChildrenIndex(c, eventKey, i);
      }
    });
    return activeKey;
  }
  return activeKey;
}

export function saveRef(c) {
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

export var SubPopupMenu = function (_Component) {
  _inherits(SubPopupMenu, _Component);

  function SubPopupMenu(props) {
    _classCallCheck(this, SubPopupMenu);

    var _this = _possibleConstructorReturn(this, (SubPopupMenu.__proto__ || Object.getPrototypeOf(SubPopupMenu)).call(this, props));

    _initialiseProps.call(_this);

    props.store.setState({
      activeKey: _extends({}, props.store.getState().activeKey, _defineProperty({}, props.eventKey, getActiveKey(props, props.activeKey)))
    });

    _this.instanceArray = [];
    return _this;
  }

  _createClass(SubPopupMenu, [{
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

      var props = _objectWithoutProperties(this.props, []);

      this.instanceArray = [];
      var className = classNames(props.prefixCls, props.className, props.prefixCls + '-' + props.mode);
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

      menuAllProps.forEach(function (key) {
        return delete props[key];
      });

      var transitionAppear = !(!haveRendered && !props.hidden && props.mode === 'inline');

      props.className += ' ' + props.prefixCls + '-sub';
      delete props.onClick;
      var animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (_typeof(props.openAnimation) === 'object') {
        animProps.animation = _extends({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      return (
        /* eslint-disable */
        React.createElement(
          DOMWrap,
          _extends({}, props, {
            prefixCls: prefixCls,
            mode: mode,
            tag: 'ul',
            level: level,
            theme: theme,
            hiddenClassName: prefixCls + '-hidden',
            hidden: hidden,
            overflowedIndicator: overflowedIndicator
          }, domProps),
          Children.map(props.children, function (c, i) {
            return _this2.renderMenuItem(c, i, eventKey || '0-menu-');
          })
        )
        /*eslint-enable */

      );
    }
  }]);

  return SubPopupMenu;
}(Component);

SubPopupMenu.propTypes = {
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  onDeselect: PropTypes.func,
  onOpenChange: PropTypes.func,
  onDestroy: PropTypes.func,
  openTransitionName: PropTypes.string,
  openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  openKeys: PropTypes.arrayOf(PropTypes.string),
  hidden: PropTypes.bool,
  children: PropTypes.any,
  parentMenu: PropTypes.object,
  eventKey: PropTypes.string,
  store: PropTypes.shape({
    getState: PropTypes.func,
    setState: PropTypes.func
  }),

  // adding in refactor
  focusable: PropTypes.bool,
  multiple: PropTypes.bool,
  style: PropTypes.object,
  defaultActiveFirst: PropTypes.bool,
  activeKey: PropTypes.string,
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
  level: PropTypes.number,
  mode: PropTypes.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  triggerSubMenuAction: PropTypes.oneOf(['click', 'hover']),
  inlineIndent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  manualRef: PropTypes.func,
  itemIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  expandIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
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
  manualRef: noop
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
    if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
      activeItem = _this3.step(keyCode === KeyCode.UP ? -1 : 1);
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
    var key = getKeyFromChildrenIndex(child, props.eventKey, i);
    var childProps = child.props;
    var isActive = key === state.activeKey;
    var newChildProps = _extends({
      mode: childProps.mode || props.mode,
      level: props.level,
      inlineIndent: props.inlineIndent,
      renderMenuItem: _this3.renderMenuItem,
      rootPrefixCls: props.prefixCls,
      index: i,
      parentMenu: props.parentMenu,
      // customized ref function, need to be invoked manually in child's componentDidMount
      manualRef: childProps.disabled ? undefined : createChainedFunction(child.ref, saveRef.bind(_this3)),
      eventKey: key,
      active: !childProps.disabled && isActive,
      multiple: props.multiple,
      onClick: function onClick(e) {
        (childProps.onClick || noop)(e);
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
    return cloneElement(child, newChildProps);
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

var connected = connect()(SubPopupMenu);

export default connected;