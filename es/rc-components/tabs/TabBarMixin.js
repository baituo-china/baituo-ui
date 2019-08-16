import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import React, { Children, cloneElement } from 'react';
import classnames from 'classnames';
import { generateKey, getDataAttr } from './utils';
import warning from '../../_util/warning';
import Ripple from '../../ripple';

export default {
  getDefaultProps: function getDefaultProps() {
    return {
      styles: {}
    };
  },
  onTabClick: function onTabClick(key) {
    this.props.onTabClick(key);
  },
  getTabs: function getTabs() {
    var _this = this;

    var _props = this.props,
        children = _props.panels,
        activeKey = _props.activeKey,
        prefixCls = _props.prefixCls,
        tabBarGutter = _props.tabBarGutter;

    var rst = [];

    Children.forEach(children, function (child, index) {
      if (!child) {
        return;
      }
      var key = generateKey(child.key, index);
      var _child$props = child.props,
          disabled = _child$props.disabled,
          tab = _child$props.tab;

      var cls = activeKey === key ? prefixCls + '-tab-active' : '';
      cls += ' ' + prefixCls + '-tab';
      var events = {};
      if (disabled) {
        cls += ' ' + prefixCls + '-tab-disabled';
      } else {
        events = {
          onClick: _this.onTabClick.bind(_this, key)
        };
      }
      var ref = {};
      if (activeKey === key) {
        ref.ref = _this.saveRef('activeTab');
      }
      warning('tab' in child.props, 'There must be `tab` property on children of Tabs.');
      rst.push(React.createElement(
        Ripple,
        {
          disabled: disabled,
          key: key
        },
        React.createElement(
          'div',
          _extends({
            role: 'tab',
            'aria-disabled': disabled ? 'true' : 'false',
            'aria-selected': activeKey === key ? 'true' : 'false'
          }, events, {
            className: cls,
            style: { marginRight: tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter }
          }, ref),
          tab
        )
      ));
    });

    return rst;
  },
  getRootNode: function getRootNode(contents) {
    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        onKeyDown = _props2.onKeyDown,
        className = _props2.className,
        extraContent = _props2.extraContent,
        style = _props2.style,
        tabBarPosition = _props2.tabBarPosition,
        restProps = _objectWithoutProperties(_props2, ['prefixCls', 'onKeyDown', 'className', 'extraContent', 'style', 'tabBarPosition']);

    var cls = classnames(prefixCls + '-bar', _defineProperty({}, className, !!className));
    var topOrBottom = tabBarPosition === 'top' || tabBarPosition === 'bottom';
    var tabBarExtraContentStyle = topOrBottom ? { float: 'right' } : {};
    var extraContentStyle = extraContent && extraContent.props ? extraContent.props.style : {};
    var children = contents;
    if (extraContent) {
      children = [cloneElement(extraContent, {
        key: 'extra',
        style: _extends({}, tabBarExtraContentStyle, extraContentStyle)
      }), cloneElement(contents, { key: 'content' })];
      children = topOrBottom ? children : children.reverse();
    }
    return React.createElement(
      'div',
      _extends({
        role: 'tablist',
        className: cls,
        tabIndex: '0',
        ref: this.saveRef('root'),
        onKeyDown: onKeyDown,
        style: style
      }, getDataAttr(restProps)),
      children
    );
  }
};