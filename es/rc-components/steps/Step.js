import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function isString(str) {
  return typeof str === 'string';
}

var Step = function (_Component) {
  _inherits(Step, _Component);

  function Step() {
    _classCallCheck(this, Step);

    return _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).apply(this, arguments));
  }

  _createClass(Step, [{
    key: 'renderIconNode',
    value: function renderIconNode() {
      var _classNames;

      var _props = this.props,
          prefixCls = _props.prefixCls,
          progressDot = _props.progressDot,
          stepNumber = _props.stepNumber,
          status = _props.status,
          title = _props.title,
          description = _props.description,
          icon = _props.icon,
          iconPrefix = _props.iconPrefix;

      var iconNode = void 0;
      var iconClassName = classNames('' + iconPrefix, (_classNames = {}, _defineProperty(_classNames, iconPrefix + '-' + icon, icon && isString(icon)), _defineProperty(_classNames, iconPrefix + '-check', !icon && status === 'finish'), _defineProperty(_classNames, iconPrefix + '-close', !icon && status === 'error'), _classNames));
      var iconDot = React.createElement('span', { className: prefixCls + '-icon-dot' });
      // `progressDot` enjoy the highest priority
      if (progressDot) {
        if (typeof progressDot === 'function') {
          iconNode = React.createElement(
            'span',
            { className: prefixCls + '-icon' },
            progressDot(iconDot, { index: stepNumber - 1, status: status, title: title, description: description })
          );
        } else {
          iconNode = React.createElement(
            'span',
            { className: prefixCls + '-icon' },
            iconDot
          );
        }
      } else if (icon && !isString(icon)) {
        iconNode = React.createElement(
          'span',
          { className: prefixCls + '-icon' },
          icon
        );
      } else if (icon || status === 'finish' || status === 'error') {
        iconNode = React.createElement('span', { className: iconClassName });
      } else {
        iconNode = React.createElement(
          'span',
          { className: prefixCls + '-icon' },
          stepNumber
        );
      }
      return iconNode;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          prefixCls = _props2.prefixCls,
          style = _props2.style,
          itemWidth = _props2.itemWidth,
          _props2$status = _props2.status,
          status = _props2$status === undefined ? 'wait' : _props2$status,
          iconPrefix = _props2.iconPrefix,
          icon = _props2.icon,
          wrapperStyle = _props2.wrapperStyle,
          adjustMarginRight = _props2.adjustMarginRight,
          stepNumber = _props2.stepNumber,
          description = _props2.description,
          title = _props2.title,
          progressDot = _props2.progressDot,
          tailContent = _props2.tailContent,
          restProps = _objectWithoutProperties(_props2, ['className', 'prefixCls', 'style', 'itemWidth', 'status', 'iconPrefix', 'icon', 'wrapperStyle', 'adjustMarginRight', 'stepNumber', 'description', 'title', 'progressDot', 'tailContent']);

      var classString = classNames(prefixCls + '-item', prefixCls + '-item-' + status, className, _defineProperty({}, prefixCls + '-item-custom', icon));
      var stepItemStyle = _extends({}, style);
      if (itemWidth) {
        stepItemStyle.width = itemWidth;
      }
      if (adjustMarginRight) {
        stepItemStyle.marginRight = adjustMarginRight;
      }
      return React.createElement(
        'div',
        _extends({}, restProps, {
          className: classString,
          style: stepItemStyle
        }),
        React.createElement(
          'div',
          { className: prefixCls + '-item-tail' },
          tailContent
        ),
        React.createElement(
          'div',
          { className: prefixCls + '-item-icon' },
          this.renderIconNode()
        ),
        React.createElement(
          'div',
          { className: prefixCls + '-item-content' },
          React.createElement(
            'div',
            { className: prefixCls + '-item-title' },
            title
          ),
          description && React.createElement(
            'div',
            { className: prefixCls + '-item-description' },
            description
          )
        )
      );
    }
  }]);

  return Step;
}(Component);

Step.propTypes = {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.string,
  iconPrefix: PropTypes.string,
  icon: PropTypes.node,
  adjustMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stepNumber: PropTypes.string,
  description: PropTypes.any,
  title: PropTypes.any,
  progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  tailContent: PropTypes.any
};
export default Step;