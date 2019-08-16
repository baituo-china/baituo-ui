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

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LargeSelect = function (_Component) {
    (0, _inherits3['default'])(LargeSelect, _Component);

    function LargeSelect() {
        (0, _classCallCheck3['default'])(this, LargeSelect);
        return (0, _possibleConstructorReturn3['default'])(this, (LargeSelect.__proto__ || Object.getPrototypeOf(LargeSelect)).apply(this, arguments));
    }

    (0, _createClass3['default'])(LargeSelect, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(_select2['default'], (0, _extends3['default'])({ size: "large" /* large */ }, this.props));
        }
    }]);
    return LargeSelect;
}(_react.Component);

exports['default'] = LargeSelect;

LargeSelect.Option = _select2['default'].Option;
module.exports = exports['default'];