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

var MonthPicker = function (_DatePicker) {
    (0, _inherits3['default'])(MonthPicker, _DatePicker);

    function MonthPicker() {
        (0, _classCallCheck3['default'])(this, MonthPicker);
        return (0, _possibleConstructorReturn3['default'])(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).apply(this, arguments));
    }

    return MonthPicker;
}(_DatePicker3['default']);

exports['default'] = MonthPicker;

MonthPicker.displayName = 'MonthPicker';
MonthPicker.defaultProps = (0, _extends3['default'])({}, _DatePicker3['default'].defaultProps, {
    mode: "month" /* month */
});
module.exports = exports['default'];