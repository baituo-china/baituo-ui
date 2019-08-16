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

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Pager = function (_PureComponent) {
    (0, _inherits3['default'])(Pager, _PureComponent);

    function Pager() {
        (0, _classCallCheck3['default'])(this, Pager);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).apply(this, arguments));

        _this.handleClick = function () {
            var _this$props = _this.props,
                page = _this$props.page,
                onClick = _this$props.onClick;

            if (onClick) {
                onClick(page);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(Pager, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                active = _props.active,
                renderer = _props.renderer,
                page = _props.page,
                type = _props.type,
                disabled = _props.disabled,
                className = _props.className;

            return _react2['default'].createElement(
                _Button2['default'],
                { className: className, funcType: active ? "raised" /* raised */ : "flat" /* flat */, onClick: this.handleClick, color: active ? "blue" /* blue */ : void 0, disabled: disabled },
                renderer(page, type)
            );
        }
    }]);
    return Pager;
}(_react.PureComponent);

exports['default'] = Pager;

Pager.displayName = 'Pager';
module.exports = exports['default'];