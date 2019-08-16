'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _RippleChild = require('./RippleChild');

var _RippleChild2 = _interopRequireDefault(_RippleChild);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Ripple = function (_PureComponent) {
    (0, _inherits3['default'])(Ripple, _PureComponent);

    function Ripple() {
        (0, _classCallCheck3['default'])(this, Ripple);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Ripple.__proto__ || Object.getPrototypeOf(Ripple)).apply(this, arguments));

        _this.rippleChild = function (child) {
            return _react2['default'].createElement(
                _RippleChild2['default'],
                { prefixCls: (0, _configure.getPrefixCls)('ripple', _this.props.prefixCls) },
                child
            );
        };
        return _this;
    }

    (0, _createClass3['default'])(Ripple, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                disabled = _props.disabled,
                children = _props.children;

            if (disabled || !children || !(0, _configure.getConfig)('ripple')) {
                return children;
            }
            return _react.Children.map(children, this.rippleChild);
        }
    }]);
    return Ripple;
}(_react.PureComponent);

exports['default'] = Ripple;

Ripple.displayName = 'Ripple';
module.exports = exports['default'];