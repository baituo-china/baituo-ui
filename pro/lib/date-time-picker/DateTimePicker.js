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

var DateTimePicker = function (_DatePicker) {
    (0, _inherits3['default'])(DateTimePicker, _DatePicker);

    function DateTimePicker() {
        (0, _classCallCheck3['default'])(this, DateTimePicker);
        return (0, _possibleConstructorReturn3['default'])(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).apply(this, arguments));
    }

    return DateTimePicker;
}(_DatePicker3['default']);

exports['default'] = DateTimePicker;

DateTimePicker.displayName = 'DateTimePicker';
DateTimePicker.defaultProps = (0, _extends3['default'])({}, _DatePicker3['default'].defaultProps, {
    mode: "dateTime" /* dateTime */
});
module.exports = exports['default'];