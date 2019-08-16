'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint react/no-did-mount-set-state: 0 */
var Steps = function (_Component) {
  (0, _inherits3['default'])(Steps, _Component);

  function Steps(props) {
    (0, _classCallCheck3['default'])(this, Steps);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).call(this, props));

    _this.calcStepOffsetWidth = function () {
      if ((0, _utils.isFlexSupported)()) {
        return;
      }
      // Just for IE9
      var domNode = (0, _reactDom.findDOMNode)(_this);
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
    _this.calcStepOffsetWidth = (0, _debounce2['default'])(_this.calcStepOffsetWidth, 150);
    return _this;
  }

  (0, _createClass3['default'])(Steps, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calcStepOffsetWidth();
      if (!(0, _utils.isFlexSupported)()) {
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
          restProps = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'style', 'className', 'children', 'direction', 'labelPlacement', 'iconPrefix', 'status', 'size', 'current', 'progressDot']);
      var _state = this.state,
          lastStepOffsetWidth = _state.lastStepOffsetWidth,
          flexSupported = _state.flexSupported;

      var filteredChildren = _react.Children.toArray(children).filter(function (c) {
        return !!c;
      });
      var lastIndex = filteredChildren.length - 1;
      var adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
      var classString = (0, _classnames2['default'])(prefixCls, prefixCls + '-' + direction, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + size, size), (0, _defineProperty3['default'])(_classNames, prefixCls + '-label-' + adjustedlabelPlacement, direction === 'horizontal'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-dot', !!progressDot), _classNames));

      return _react2['default'].createElement(
        'div',
        (0, _extends3['default'])({ className: classString, style: style }, restProps),
        _react.Children.map(filteredChildren, function (child, index) {
          if (!child) {
            return null;
          }
          var childProps = (0, _extends3['default'])({
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
          return (0, _react.cloneElement)(child, childProps);
        })
      );
    }
  }]);
  return Steps;
}(_react.Component);

Steps.propTypes = {
  prefixCls: _propTypes2['default'].string,
  className: _propTypes2['default'].string,
  iconPrefix: _propTypes2['default'].string,
  direction: _propTypes2['default'].string,
  labelPlacement: _propTypes2['default'].string,
  children: _propTypes2['default'].any,
  status: _propTypes2['default'].string,
  size: _propTypes2['default'].string,
  progressDot: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].func]),
  style: _propTypes2['default'].object,
  current: _propTypes2['default'].number
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
exports['default'] = Steps;
module.exports = exports['default'];