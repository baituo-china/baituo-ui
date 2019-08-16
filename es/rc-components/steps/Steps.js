import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* eslint react/no-did-mount-set-state: 0 */
import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { isFlexSupported } from './utils';

var Steps = function (_Component) {
  _inherits(Steps, _Component);

  function Steps(props) {
    _classCallCheck(this, Steps);

    var _this = _possibleConstructorReturn(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).call(this, props));

    _this.calcStepOffsetWidth = function () {
      if (isFlexSupported()) {
        return;
      }
      // Just for IE9
      var domNode = findDOMNode(_this);
      if (domNode.children.length > 0) {
        if (_this.calcTimeout) {
          clearTimeout(_this.calcTimeout);
        }
        _this.calcTimeout = setTimeout(function () {
          // +1 for fit edge bug of digit width, like 35.4px
          var lastStepOffsetWidth = (domNode.lastChild.offsetWidth || 0) + 1;
          // Reduce shake bug
          if (_this.state.lastStepOffsetWidth === lastStepOffsetWidth || Math.abs(_this.state.lastStepOffsetWidth - lastStepOffsetWidth) <= 3) {
            return;
          }
          _this.setState({ lastStepOffsetWidth: lastStepOffsetWidth });
        });
      }
    };

    _this.state = {
      flexSupported: true,
      lastStepOffsetWidth: 0
    };
    _this.calcStepOffsetWidth = debounce(_this.calcStepOffsetWidth, 150);
    return _this;
  }

  _createClass(Steps, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calcStepOffsetWidth();
      if (!isFlexSupported()) {
        this.setState({
          flexSupported: false
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.calcStepOffsetWidth();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.calcTimeout) {
        clearTimeout(this.calcTimeout);
      }
      if (this.calcStepOffsetWidth && this.calcStepOffsetWidth.cancel) {
        this.calcStepOffsetWidth.cancel();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          prefixCls = _props.prefixCls,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          className = _props.className,
          children = _props.children,
          direction = _props.direction,
          labelPlacement = _props.labelPlacement,
          iconPrefix = _props.iconPrefix,
          status = _props.status,
          size = _props.size,
          current = _props.current,
          progressDot = _props.progressDot,
          restProps = _objectWithoutProperties(_props, ['prefixCls', 'style', 'className', 'children', 'direction', 'labelPlacement', 'iconPrefix', 'status', 'size', 'current', 'progressDot']);

      var _state = this.state,
          lastStepOffsetWidth = _state.lastStepOffsetWidth,
          flexSupported = _state.flexSupported;

      var filteredChildren = Children.toArray(children).filter(function (c) {
        return !!c;
      });
      var lastIndex = filteredChildren.length - 1;
      var adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
      var classString = classNames(prefixCls, prefixCls + '-' + direction, className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + size, size), _defineProperty(_classNames, prefixCls + '-label-' + adjustedlabelPlacement, direction === 'horizontal'), _defineProperty(_classNames, prefixCls + '-dot', !!progressDot), _classNames));

      return React.createElement(
        'div',
        _extends({ className: classString, style: style }, restProps),
        Children.map(filteredChildren, function (child, index) {
          if (!child) {
            return null;
          }
          var childProps = _extends({
            stepNumber: '' + (index + 1),
            prefixCls: prefixCls,
            iconPrefix: iconPrefix,
            wrapperStyle: style,
            progressDot: progressDot
          }, child.props);
          if (!flexSupported && direction !== 'vertical' && index !== lastIndex) {
            childProps.itemWidth = 100 / lastIndex + '%';
            childProps.adjustMarginRight = -Math.round(lastStepOffsetWidth / lastIndex + 1);
          }
          // fix tail color
          if (status === 'error' && index === current - 1) {
            childProps.className = prefixCls + '-next-error';
          }
          if (!child.props.status) {
            if (index === current) {
              childProps.status = status;
            } else if (index < current) {
              childProps.status = 'finish';
            } else {
              childProps.status = 'wait';
            }
          }
          return cloneElement(child, childProps);
        })
      );
    }
  }]);

  return Steps;
}(Component);

Steps.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  iconPrefix: PropTypes.string,
  direction: PropTypes.string,
  labelPlacement: PropTypes.string,
  children: PropTypes.any,
  status: PropTypes.string,
  size: PropTypes.string,
  progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  style: PropTypes.object,
  current: PropTypes.number
};
Steps.defaultProps = {
  prefixCls: 'rc-steps',
  iconPrefix: 'rc',
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  current: 0,
  status: 'process',
  size: '',
  progressDot: false
};
export default Steps;