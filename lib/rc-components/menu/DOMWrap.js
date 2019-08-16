'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _SubMenu = require('./SubMenu');

var _SubMenu2 = _interopRequireDefault(_SubMenu);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var MENUITEM_OVERFLOWED_CLASSNAME = 'menuitem-overflowed';

// Fix ssr
if (canUseDOM) {
  require('mutationobserver-shim');
}

var DOMWrap = function (_Component) {
  (0, _inherits3['default'])(DOMWrap, _Component);

  function DOMWrap() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, DOMWrap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = DOMWrap.__proto__ || Object.getPrototypeOf(DOMWrap)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      lastVisibleIndex: undefined
    }, _this.getMenuItemNodes = function () {
      var prefixCls = _this.props.prefixCls;

      var ul = _reactDom2['default'].findDOMNode(_this);
      if (!ul) {
        return [];
      }

      // filter out all overflowed indicator placeholder
      return [].slice.call(ul.children).filter(function (node) {
        return node.className.split(' ').indexOf(prefixCls + '-overflowed-submenu') < 0;
      });
    }, _this.getOverflowedSubMenuItem = function (keyPrefix, overflowedItems, renderPlaceholder) {
      var _this$props = _this.props,
          overflowedIndicator = _this$props.overflowedIndicator,
          level = _this$props.level,
          mode = _this$props.mode,
          prefixCls = _this$props.prefixCls,
          theme = _this$props.theme,
          propStyle = _this$props.style;

      if (level !== 1 || mode !== 'horizontal') {
        return null;
      }
      // put all the overflowed item inside a submenu
      // with a title of overflow indicator ('...')
      var copy = _this.props.children[0];
      var _copy$props = copy.props,
          throwAway = _copy$props.children,
          title = _copy$props.title,
          eventKey = _copy$props.eventKey,
          rest = (0, _objectWithoutProperties3['default'])(_copy$props, ['children', 'title', 'eventKey']);


      var style = (0, _extends3['default'])({}, propStyle);
      var key = keyPrefix + '-overflowed-indicator';

      if (overflowedItems.length === 0 && renderPlaceholder !== true) {
        style = (0, _extends3['default'])({}, style, {
          display: 'none'
        });
      } else if (renderPlaceholder) {
        style = (0, _extends3['default'])({}, style, {
          visibility: 'hidden',
          // prevent from taking normal dom space
          position: 'absolute'
        });
        key = key + '-placeholder';
      }

      var popupClassName = theme ? prefixCls + '-' + theme : '';
      var props = {};
      _util.menuAllProps.forEach(function (k) {
        if (rest[k] !== undefined) {
          props[k] = rest[k];
        }
      });

      return _react2['default'].createElement(
        _SubMenu2['default'],
        (0, _extends3['default'])({
          title: overflowedIndicator,
          className: prefixCls + '-overflowed-submenu',
          popupClassName: popupClassName
        }, props, {
          key: key,
          eventKey: keyPrefix + '-overflowed-indicator',
          disabled: false,
          style: style
        }),
        overflowedItems
      );
    }, _this.setChildrenWidthAndResize = function () {
      if (_this.props.mode !== 'horizontal') {
        return;
      }
      var ul = _reactDom2['default'].findDOMNode(_this);

      if (!ul) {
        return;
      }

      var ulChildrenNodes = ul.children;

      if (!ulChildrenNodes || ulChildrenNodes.length === 0) {
        return;
      }

      var lastOverflowedIndicatorPlaceholder = ul.children[ulChildrenNodes.length - 1];

      // need last overflowed indicator for calculating length;
      (0, _util.setStyle)(lastOverflowedIndicatorPlaceholder, 'display', 'inline-block');

      var menuItemNodes = _this.getMenuItemNodes();

      // reset display attribute for all hidden elements caused by overflow to calculate updated width
      // and then reset to original state after width calculation

      var overflowedItems = menuItemNodes.filter(function (c) {
        return c.className.split(' ').indexOf(MENUITEM_OVERFLOWED_CLASSNAME) >= 0;
      });

      overflowedItems.forEach(function (c) {
        (0, _util.setStyle)(c, 'display', 'inline-block');
      });

      _this.menuItemSizes = menuItemNodes.map(function (c) {
        return (0, _util.getWidth)(c);
      });

      overflowedItems.forEach(function (c) {
        (0, _util.setStyle)(c, 'display', 'none');
      });
      _this.overflowedIndicatorWidth = (0, _util.getWidth)(ul.children[ul.children.length - 1]);
      _this.originalTotalWidth = _this.menuItemSizes.reduce(function (acc, cur) {
        return acc + cur;
      }, 0);
      _this.handleResize();
      // prevent the overflowed indicator from taking space;
      (0, _util.setStyle)(lastOverflowedIndicatorPlaceholder, 'display', 'none');
    }, _this.resizeObserver = null, _this.mutationObserver = null, _this.originalTotalWidth = 0, _this.overflowedItems = [], _this.menuItemSizes = [], _this.handleResize = function () {
      if (_this.props.mode !== 'horizontal') {
        return;
      }

      var ul = _reactDom2['default'].findDOMNode(_this);
      if (!ul) {
        return;
      }
      var width = (0, _util.getWidth)(ul);

      _this.overflowedItems = [];
      var currentSumWidth = 0;

      // index for last visible child in horizontal mode
      var lastVisibleIndex = undefined;

      if (_this.originalTotalWidth > width) {
        lastVisibleIndex = -1;

        _this.menuItemSizes.forEach(function (liWidth) {
          currentSumWidth += liWidth;
          if (currentSumWidth + _this.overflowedIndicatorWidth <= width) {
            lastVisibleIndex++;
          }
        });
      }

      _this.setState({ lastVisibleIndex: lastVisibleIndex });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(DOMWrap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setChildrenWidthAndResize();
      if (this.props.level === 1 && this.props.mode === 'horizontal') {
        var menuUl = _reactDom2['default'].findDOMNode(this);
        if (!menuUl) {
          return;
        }
        this.resizeObserver = new _resizeObserverPolyfill2['default'](function (entries) {
          entries.forEach(_this2.setChildrenWidthAndResize);
        });

        [].slice.call(menuUl.children).concat(menuUl).forEach(function (el) {
          _this2.resizeObserver.observe(el);
        });

        if (typeof MutationObserver !== 'undefined') {
          this.mutationObserver = new MutationObserver(function () {
            _this2.resizeObserver.disconnect();
            [].slice.call(menuUl.children).concat(menuUl).forEach(function (el) {
              _this2.resizeObserver.observe(el);
            });
            _this2.setChildrenWidthAndResize();
          });
          this.mutationObserver.observe(menuUl, { attributes: false, childList: true, subTree: false });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      if (this.mutationObserver) {
        this.resizeObserver.disconnect();
      }
    }

    // get all valid menuItem nodes


    // memorize rendered menuSize


    // original scroll size of the list


    // copy of overflowed items


    // cache item of the original items (so we can track the size and order)

  }, {
    key: 'renderChildren',
    value: function renderChildren(children) {
      var _this3 = this;

      // need to take care of overflowed items in horizontal mode
      var lastVisibleIndex = this.state.lastVisibleIndex;

      return (children || []).reduce(function (acc, childNode, index) {
        var item = childNode;
        if (_this3.props.mode === 'horizontal') {
          var overflowed = _this3.getOverflowedSubMenuItem(childNode.props.eventKey, []);
          if (lastVisibleIndex !== undefined && _this3.props.className.indexOf(_this3.props.prefixCls + '-root') !== -1) {
            if (index > lastVisibleIndex) {
              item = (0, _react.cloneElement)(childNode,
              // 这里修改 eventKey 是为了防止隐藏状态下还会触发 openkeys 事件
              {
                style: { display: 'none' },
                eventKey: childNode.props.eventKey + '-hidden',
                className: childNode.className + ' ' + MENUITEM_OVERFLOWED_CLASSNAME
              });
            }
            if (index === lastVisibleIndex + 1) {
              _this3.overflowedItems = children.slice(lastVisibleIndex + 1).map(function (c) {
                return (0, _react.cloneElement)(c,
                // children[index].key will become '.$key' in clone by default,
                // we have to overwrite with the correct key explicitly
                { key: c.props.eventKey, mode: 'vertical-left' });
              });

              overflowed = _this3.getOverflowedSubMenuItem(childNode.props.eventKey, _this3.overflowedItems);
            }
          }

          var ret = [].concat((0, _toConsumableArray3['default'])(acc), [overflowed, item]);

          if (index === children.length - 1) {
            // need a placeholder for calculating overflowed indicator width
            ret.push(_this3.getOverflowedSubMenuItem(childNode.props.eventKey, [], true));
          }
          return ret;
        }
        return [].concat((0, _toConsumableArray3['default'])(acc), [item]);
      }, []);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          hiddenClassName = _props.hiddenClassName,
          hidden = _props.hidden,
          prefixCls = _props.prefixCls,
          overflowedIndicator = _props.overflowedIndicator,
          mode = _props.mode,
          level = _props.level,
          Tag = _props.tag,
          children = _props.children,
          theme = _props.theme,
          rest = (0, _objectWithoutProperties3['default'])(_props, ['hiddenClassName', 'hidden', 'prefixCls', 'overflowedIndicator', 'mode', 'level', 'tag', 'children', 'theme']);


      if (hidden) {
        rest.className += ' ' + hiddenClassName;
      }

      return _react2['default'].createElement(
        Tag,
        rest,
        this.renderChildren(this.props.children)
      );
    }
  }]);
  return DOMWrap;
}(_react.Component);

DOMWrap.propTypes = {
  className: _propTypes2['default'].string,
  children: _propTypes2['default'].node,
  mode: _propTypes2['default'].oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  prefixCls: _propTypes2['default'].string,
  level: _propTypes2['default'].number,
  theme: _propTypes2['default'].string,
  overflowedIndicator: _propTypes2['default'].node,
  hidden: _propTypes2['default'].bool,
  hiddenClassName: _propTypes2['default'].string,
  tag: _propTypes2['default'].string,
  style: _propTypes2['default'].object
};
DOMWrap.defaultProps = {
  tag: 'div',
  className: ''
};
exports['default'] = DOMWrap;
module.exports = exports['default'];