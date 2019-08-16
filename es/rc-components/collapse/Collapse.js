import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CollapsePanel from './Panel';
import openAnimationFactory from './openAnimationFactory';

function toArray(activeKey) {
  var currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}

var Collapse = function (_Component) {
  _inherits(Collapse, _Component);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    var _this$props = _this.props,
        activeKey = _this$props.activeKey,
        defaultActiveKey = _this$props.defaultActiveKey;

    var currentActiveKey = defaultActiveKey;
    if ('activeKey' in _this.props) {
      currentActiveKey = activeKey;
    }

    _this.state = {
      openAnimation: _this.props.openAnimation || openAnimationFactory(_this.props.prefixCls),
      activeKey: toArray(currentActiveKey)
    };
    return _this;
  }

  _createClass(Collapse, [{
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
        activeKey = [].concat(_toConsumableArray(activeKey));
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

      Children.forEach(this.props.children, function (child, index) {
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

        newChildren.push(cloneElement(child, props));
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

      var collapseClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _classNames));
      return React.createElement(
        'div',
        { className: collapseClassName, style: style },
        this.getItems()
      );
    }
  }]);

  return Collapse;
}(Component);

Collapse.propTypes = {
  children: PropTypes.any,
  prefixCls: PropTypes.string,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  openAnimation: PropTypes.object,
  onChange: PropTypes.func,
  accordion: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  destroyInactivePanel: PropTypes.bool
};
Collapse.defaultProps = {
  prefixCls: 'rc-collapse',
  onChange: function onChange() {},

  accordion: false,
  destroyInactivePanel: false
};
Collapse.Panel = CollapsePanel;
export default Collapse;