'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = tooShort;

var _stringTemplate = require('string-template');

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function tooShort(value, _ref) {
    var minLength = _ref.minLength;

    if (!(0, _isEmpty2['default'])(value)) {
        var _value$toString = value.toString(),
            length = _value$toString.length;

        if (!!minLength && minLength > 0 && length < minLength) {
            var injectionOptions = { minLength: minLength, length: length };
            return new _ValidationResult2['default']({
                validationMessage: (0, _stringTemplate2['default'])((0, _localeContext.$l)('Validator', 'too_short'), injectionOptions),
                injectionOptions: injectionOptions,
                value: value,
                ruleName: 'tooShort'
            });
        }
    }
    return true;
}
module.exports = exports['default'];