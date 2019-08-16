'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = rangeOverflow;

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function rangeOverflow(value, _ref) {
    var max = _ref.max,
        label = _ref.label;

    if (!(0, _isEmpty2['default'])(value) && max !== void 0 && Number(value) > max) {
        var injectionOptions = { max: max, label: label };
        return new _ValidationResult2['default']({
            validationMessage: (0, _localeContext.$l)('Validator', 'range_overflow', injectionOptions),
            injectionOptions: injectionOptions,
            value: value,
            ruleName: 'rangeOverflow'
        });
    }
    return true;
}
module.exports = exports['default'];