import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PanelContent from './PanelContent';
import Animate from '../../animate';

var CollapsePanel = function (_Component) {
  _inherits(CollapsePanel, _Component);

  function CollapsePanel() {
    _classCallCheck(this, CollapsePanel);

    return _possibleConstructorReturn(this, (CollapsePanel.__proto__ || Object.getPrototypeOf(CollapsePanel)).apply(this, arguments));
  }

  _createClass(CollapsePanel, [{
    key: 'handleItemClick',
    value: function handleItemClick() {
      if (this.props.onItemClick) {
        this.props.onItemClick();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames2, _classNames3;

      var _props = this.props,
          className = _props.className,
          id = _props.id,
          style = _props.style,
          prefixCls = _props.prefixCls,
          header = _props.header,
          headerClass = _props.headerClass,
          children = _props.children,
          isActive = _props.isActive,
          showArrow = _props.showArrow,
          destroyInactivePanel = _props.destroyInactivePanel,
          disabled = _props.disabled,
          forceRender = _props.forceRender;

      var headerCls = classNames(prefixCls + '-header', _defineProperty({}, headerClass, headerClass));
      var itemCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-item', true), _defineProperty(_classNames2, prefixCls + '-item-active', isActive), _defineProperty(_classNames2, prefixCls + '-item-disabled', disabled), _classNames2), className);
      var iconCls = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls + '-expand-icon', true), _defineProperty(_classNames3, prefixCls + '-expanded', isActive), _defineProperty(_classNames3, prefixCls + '-collapsed', !isActive), _classNames3));
      return React.createElement(
        'div',
        { className: itemCls, style: style, id: id, role: 'tablist' },
        React.createElement(
          'div',
          {
            className: headerCls,
            onClick: this.handleItemClick.bind(this),
            role: 'tab',
            'aria-expanded': isActive
          },
          showArrow && React.createElement('i', { className: iconCls }),
          header
        ),
        React.createElement(
          Animate,
          {
            hiddenProp: 'isInactive',
            exclusive: true,
            component: '',
            animation: this.props.openAnimation
          },
          React.createElement(
            PanelContent,
            {
              prefixCls: prefixCls,
              isInactive: !isActive,
              destroyInactivePanel: destroyInactivePanel,
              forceRender: forceRender
            },
            children
          )
        )
      );
    }
  }]);

  return CollapsePanel;
}(Component);

CollapsePanel.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  id: PropTypes.string,
  children: PropTypes.any,
  openAnimation: PropTypes.object,
  prefixCls: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  headerClass: PropTypes.string,
  showArrow: PropTypes.bool,
  isActive: PropTypes.bool,
  onItemClick: PropTypes.func,
  style: PropTypes.object,
  destroyInactivePanel: PropTypes.bool,
  disabled: PropTypes.bool,
  forceRender: PropTypes.bool
};
CollapsePanel.defaultProps = {
  showArrow: true,
  isActive: false,
  destroyInactivePanel: false,
  onItemClick: function onItemClick() {},

  headerClass: '',
  forceRender: false
};
export default CollapsePanel;