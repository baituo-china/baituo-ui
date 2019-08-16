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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _inputNumber = require('../rc-components/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var InputNumber = function (_Component) {
    (0, _inherits3['default'])(InputNumber, _Component);

    function InputNumber() {
        (0, _classCallCheck3['default'])(this, InputNumber);
        return (0, _possibleConstructorReturn3['default'])(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).apply(this, arguments));
    }

    (0, _createClass3['default'])(InputNumber, [{
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var _props = this.props,
                className = _props.className,
                size = _props.size,
                customizePrefixCls = _props.prefixCls,
                others = (0, _objectWithoutProperties3['default'])(_props, ['className', 'size', 'prefixCls']);

            var prefixCls = (0, _configure.getPrefixCls)('input-number', customizePrefixCls);
            var inputNumberClass = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === "large"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === "small"), _classNames), className);
            return _react2['default'].createElement(_inputNumber2['default'], (0, _extends3['default'])({ ref: function ref(c) {
                    return _this2.inputNumberRef = c;
                }, className: inputNumberClass, prefixCls: prefixCls }, others));
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.inputNumberRef.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.inputNumberRef.blur();
        }
    }]);
    return InputNumber;
}(_react.Component);

exports['default'] = InputNumber;

InputNumber.displayName = 'InputNumber';
InputNumber.defaultProps = {
    step: 1
};
module.exports = exports['default'];