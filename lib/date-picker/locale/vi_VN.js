'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _en_US = require('../../rc-components/calendar/locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _en_US3 = require('../../time-picker/locale/en_US');

var _en_US4 = _interopRequireDefault(_en_US3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _extends3['default'])({
        placeholder: 'Chọn thời điểm',
        rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc']
    }, _en_US2['default']),
    timePickerLocale: (0, _extends3['default'])({}, _en_US4['default'])
};
// All settings at:
exports['default'] = locale;
module.exports = exports['default'];