import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import classnames from 'classnames';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import { generateKey, getDataAttr } from './utils';

function getDefaultActiveKey(props) {
  var activeKey = void 0;
  Children.forEach(props.children, function (child, index) {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = generateKey(child.key, index);
    }
  });
  return activeKey;
}

function activeKeyIsValid(props, key) {
  var keys = Children.map(props.children, function (child, index) {
    return child && generateKey(child.key, index);
  });
  return keys.indexOf(key) >= 0;
}

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    _initialiseProps.call(_this);

    var activeKey = void 0;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = getDefaultActiveKey(props);
    }

    _this.state = {
      activeKey: activeKey
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('activeKey' in nextProps) {
        this.setState({
          activeKey: nextProps.activeKey
        });
      } else if (!activeKeyIsValid(nextProps, this.state.activeKey)) {
        this.setState({
          activeKey: getDefaultActiveKey(nextProps)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;

      var prefixCls = props.prefixCls,
          tabBarPosition = props.tabBarPosition,
          className = props.className,
          renderTabContent = props.renderTabContent,
          renderTabBar = props.renderTabBar,
          destroyInactiveTabPane = props.destroyInactiveTabPane,
          restProps = _objectWithoutProperties(props, ['prefixCls', 'tabBarPosition', 'className', 'renderTabContent', 'renderTabBar', 'destroyInactiveTabPane']);

      var cls = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls, 1), _defineProperty(_classnames, prefixCls + '-' + tabBarPosition, 1), _defineProperty(_classnames, className, !!className), _classnames));

      this.tabBar = renderTabBar();
      var contents = [cloneElement(this.tabBar, {
        prefixCls: prefixCls,
        key: 'tabBar',
        onKeyDown: this.onNavKeyDown,
        tabBarPosition: tabBarPosition,
        onTabClick: this.onTabClick,
        panels: props.children,
        activeKey: this.state.activeKey
      }), cloneElement(renderTabContent(), {
        prefixCls: prefixCls,
        tabBarPosition: tabBarPosition,
        activeKey: this.state.activeKey,
        destroyInactiveTabPane: destroyInactiveTabPane,
        children: props.children,
        onChange: this.setActiveKey,
        key: 'tabContent'
      })];
      if (tabBarPosition === 'bottom') {
        contents.reverse();
      }
      return React.createElement(
        'div',
        _extends({
          className: cls,
          style: props.style
        }, getDataAttr(restProps)),
        contents
      );
    }
  }]);

  return Tabs;
}(Component);

Tabs.propTypes = {
  destroyInactiveTabPane: PropTypes.bool,
  renderTabBar: PropTypes.func.isRequired,
  renderTabContent: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.any,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  tabBarPosition: PropTypes.string,
  style: PropTypes.object,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string
};
Tabs.defaultProps = {
  prefixCls: 'rc-tabs',
  destroyInactiveTabPane: false,
  onChange: noop,
  tabBarPosition: 'top',
  style: {}
};
Tabs.TabPane = TabPane;

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onTabClick = function (activeKey) {
    if (_this2.tabBar.props.onTabClick) {
      _this2.tabBar.props.onTabClick(activeKey);
    }
    _this2.setActiveKey(activeKey);
  };

  this.onNavKeyDown = function (e) {
    var eventKeyCode = e.keyCode;
    if (eventKeyCode === KeyCode.RIGHT || eventKeyCode === KeyCode.DOWN) {
      e.preventDefault();
      var nextKey = _this2.getNextActiveKey(true);
      _this2.onTabClick(nextKey);
    } else if (eventKeyCode === KeyCode.LEFT || eventKeyCode === KeyCode.UP) {
      e.preventDefault();
      var previousKey = _this2.getNextActiveKey(false);
      _this2.onTabClick(previousKey);
    }
  };

  this.setActiveKey = function (activeKey) {
    if (_this2.state.activeKey !== activeKey) {
      if (!('activeKey' in _this2.props)) {
        _this2.setState({
          activeKey: activeKey
        });
      }
      _this2.props.onChange(activeKey);
    }
  };

  this.getNextActiveKey = function (next) {
    var activeKey = _this2.state.activeKey;
    var children = [];
    Children.forEach(_this2.props.children, function (c) {
      if (c && !c.props.disabled) {
        if (next) {
          children.push(c);
        } else {
          children.unshift(c);
        }
      }
    });
    var length = children.length;
    var ret = length && generateKey(children[0].key, 0);
    children.forEach(function (child, i) {
      if (generateKey(child.key, i) === activeKey) {
        if (i === length - 1) {
          ret = generateKey(children[0].key, 0);
        } else {
          ret = generateKey(children[i + 1].key, i + 1);
        }
      }
    });
    return ret;
  };
};

export default Tabs;