'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _DatePicker2 = require('../date-picker/DatePicker');

var _DatePicker3 = _interopRequireDefault(_DatePicker2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var WeekPicker = function (_DatePicker) {
    (0, _inherits3['default'])(WeekPicker, _DatePicker);

    function WeekPicker() {
        (0, _classCallCheck3['default'])(this, WeekPicker);
        return (0, _possibleConstructorReturn3['default'])(this, (WeekPicker.__proto__ || Object.getPrototypeOf(WeekPicker)).apply(this, arguments));
    }

    return WeekPicker;
}(_DatePicker3['default']);

exports['default'] = WeekPicker;

WeekPicker.displayName = 'WeekPicker';
WeekPicker.defaultProps = (0, _extends3['default'])({}, _DatePicker3['default'].defaultProps, {
    mode: "week" /* week */
});
module.exports = exports['default'];