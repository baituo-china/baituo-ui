'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = rangeUnderflow;

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function rangeUnderflow(value, _ref) {
    var min = _ref.min,
        label = _ref.label;

    if (!(0, _isEmpty2['default'])(value) && min !== void 0 && Number(value) < min) {
        var injectionOptions = { min: min, label: label };
        return new _ValidationResult2['default']({
            validationMessage: (0, _localeContext.$l)('Validator', 'range_underflow', injectionOptions),
            injectionOptions: injectionOptions,
            value: value,
            ruleName: 'rangeUnderflow'
        });
    }
    return true;
}
module.exports = exports['default'];