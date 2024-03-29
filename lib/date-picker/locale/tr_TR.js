'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _tr_TR = require('../../rc-components/calendar/locale/tr_TR');

var _tr_TR2 = _interopRequireDefault(_tr_TR);

var _tr_TR3 = require('../../time-picker/locale/tr_TR');

var _tr_TR4 = _interopRequireDefault(_tr_TR3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Merge into a locale object
var locale = {
    lang: (0, _extends3['default'])({
        placeholder: 'Tarih Seç',
        rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi']
    }, _tr_TR2['default']),
    timePickerLocale: (0, _extends3['default'])({}, _tr_TR4['default'])
};
// All settings at:
exports['default'] = locale;
module.exports = exports['default'];