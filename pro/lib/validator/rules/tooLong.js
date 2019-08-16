'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = tooLong;

var _stringTemplate = require('string-template');

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function tooLong(value, _ref) {
    var maxLength = _ref.maxLength;

    if (!(0, _isEmpty2['default'])(value)) {
        var _value$toString = value.toString(),
            length = _value$toString.length;

        if (!!maxLength && maxLength > 0 && length > maxLength) {
            var injectionOptions = { maxLength: maxLength, length: length };
            return new _ValidationResult2['default']({
                validationMessage: (0, _stringTemplate2['default'])((0, _localeContext.$l)('Validator', 'too_long'), injectionOptions),
                injectionOptions: injectionOptions,
                value: value,
                ruleName: 'tooLong'
            });
        }
    }
    return true;
}
module.exports = exports['default'];