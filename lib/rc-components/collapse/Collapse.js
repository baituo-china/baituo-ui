'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _openAnimationFactory = require('./openAnimationFactory');

var _openAnimationFactory2 = _interopRequireDefault(_openAnimationFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function toArray(activeKey) {
  var currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}

var Collapse = function (_Component) {
  (0, _inherits3['default'])(Collapse, _Component);

  function Collapse(props) {
    (0, _classCallCheck3['default'])(this, Collapse);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    var _this$props = _this.props,
        activeKey = _this$props.activeKey,
        defaultActiveKey = _this$props.defaultActiveKey;

    var currentActiveKey = defaultActiveKey;
    if ('activeKey' in _this.props) {
      currentActiveKey = activeKey;
    }

    _this.state = {
      openAnimation: _this.props.openAnimation || (0, _openAnimationFactory2['default'])(_this.props.prefixCls),
      activeKey: toArray(currentActiveKey)
    };
    return _this;
  }

  (0, _createClass3['default'])(Collapse, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('activeKey' in nextProps) {
        this.setState({
          activeKey: toArray(nextProps.activeKey)
        });
      }
      if ('openAnimation' in nextProps) {
        this.setState({
          openAnimation: nextProps.openAnimation
        });
      }
    }
  }, {
    key: 'onClickItem',
    value: function onClickItem(key) {
      var activeKey = this.state.activeKey;
      if (this.props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [].concat((0, _toConsumableArray3['default'])(activeKey));
        var index = activeKey.indexOf(key);
        var isActive = index > -1;
        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }
      this.setActiveKey(activeKey);
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      var _this2 = this;

      var activeKey = this.state.activeKey;
      var _props = this.props,
          prefixCls = _props.prefixCls,
          accordion = _props.accordion,
          destroyInactivePanel = _props.destroyInactivePanel;

      var newChildren = [];

      _react.Children.forEach(this.props.children, function (child, index) {
        if (!child) return;
        // If there is no key provide, use the panel order as default key
        var key = child.key || String(index);
        var _child$props = child.props,
            header = _child$props.header,
            headerClass = _child$props.headerClass,
            disabled = _child$props.disabled;

        var isActive = false;
        if (accordion) {
          isActive = activeKey[0] === key;
        } else {
          isActive = activeKey.indexOf(key) > -1;
        }

        var props = {
          key: key,
          header: header,
          headerClass: headerClass,
          isActive: isActive,
          prefixCls: prefixCls,
          destroyInactivePanel: destroyInactivePanel,
          openAnimation: _this2.state.openAnimation,
          children: child.props.children,
          onItemClick: disabled ? null : function () {
            return _this2.onClickItem(key);
          }
        };

        newChildren.push((0, _react.cloneElement)(child, props));
      });

      return newChildren;
    }
  }, {
    key: 'setActiveKey',
    value: function setActiveKey(activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({ activeKey: activeKey });
      }
      this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          className = _props2.className,
          style = _props2.style;

      var collapseClassName = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls, true), (0, _defineProperty3['default'])(_classNames, className, !!className), _classNames));
      return _react2['default'].createElement(
        'div',
        { className: collapseClassName, style: style },
        this.getItems()
      );
    }
  }]);
  return Collapse;
}(_react.Component);

Collapse.propTypes = {
  children: _propTypes2['default'].any,
  prefixCls: _propTypes2['default'].string,
  activeKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
  defaultActiveKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
  openAnimation: _propTypes2['default'].object,
  onChange: _propTypes2['default'].func,
  accordion: _propTypes2['default'].bool,
  className: _propTypes2['default'].string,
  style: _propTypes2['default'].object,
  destroyInactivePanel: _propTypes2['default'].bool
};
Collapse.defaultProps = {
  prefixCls: 'rc-collapse',
  onChange: function onChange() {},

  accordion: false,
  destroyInactivePanel: false
};
Collapse.Panel = _Panel2['default'];
exports['default'] = Collapse;
module.exports = exports['default'];