'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _MouseDown = require('./MouseDown');

var _MouseDown2 = _interopRequireDefault(_MouseDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RippleChild = function (_PureComponent) {
    (0, _inherits3['default'])(RippleChild, _PureComponent);

    function RippleChild() {
        (0, _classCallCheck3['default'])(this, RippleChild);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (RippleChild.__proto__ || Object.getPrototypeOf(RippleChild)).apply(this, arguments));

        _this.handleMouseDown = function (child, size) {
            var prefixCls = _this.props.prefixCls;
            var _child$props = child.props,
                children = _child$props.children,
                style = _child$props.style;

            var componentProps = {
                className: prefixCls + '-wrapper'
            };
            if (size) {
                var x = size.x,
                    y = size.y,
                    width = size.width,
                    height = size.height;

                var maxWidth = Math.max(width - x, x);
                var maxHeight = Math.max(height - y, y);
                var max = Math.sqrt(maxWidth * maxWidth + maxHeight * maxHeight);
                _this.currentCircleStyle = {
                    width: max + max,
                    height: max + max,
                    left: x - max,
                    top: y - max
                };
            }
            var newProps = {
                children: [children, _react2['default'].createElement(
                    _animate2['default'],
                    { key: 'ripple', component: 'div', componentProps: componentProps, transitionName: size ? 'zoom-small-slow' : 'fade', hiddenProp: 'hidden' },
                    _this.currentCircleStyle && _react2['default'].createElement('div', { hidden: !size, className: prefixCls, key: 'circle', style: _this.currentCircleStyle })
                )],
                style: _this.currentStyle || style
            };
            if (size && size.position === 'static') {
                newProps.style = _this.currentStyle = (0, _extends3['default'])({}, style, { position: 'relative' });
            }
            return (0, _react.cloneElement)(child, newProps);
        };
        _this.ripple = function (child) {
            if ((0, _react.isValidElement)(child)) {
                return _react2['default'].createElement(
                    _MouseDown2['default'],
                    { rippleChild: child },
                    _this.handleMouseDown
                );
            }
            return child;
        };
        return _this;
    }

    (0, _createClass3['default'])(RippleChild, [{
        key: 'render',
        value: function render() {
            return this.ripple(_react.Children.only(this.props.children));
        }
    }]);
    return RippleChild;
}(_react.PureComponent);

exports['default'] = RippleChild;

RippleChild.displayName = 'RippleChild';
module.exports = exports['default'];