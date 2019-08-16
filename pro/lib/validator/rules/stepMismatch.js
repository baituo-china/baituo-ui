'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = stepMismatch;

var _stringTemplate = require('string-template');

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

var _utils = require('../../number-field/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function stepMismatch(value, _ref) {
    var step = _ref.step,
        min = _ref.min,
        max = _ref.max;

    if (!(0, _isEmpty2['default'])(value) && step !== void 0) {
        var nearStepValues = (0, _utils.getNearStepValues)(Number(value), step, min, max);
        if (nearStepValues !== void 0) {
            var injectionOptions = {
                near: nearStepValues.length === 2 ? '\u4E24\u4E2A\u6700\u63A5\u8FD1\u7684\u6709\u6548\u503C\u5206\u522B\u4E3A' + nearStepValues[0] + '\u548C' + nearStepValues[1] + '\u3002' : '\u6700\u63A5\u8FD1\u7684\u6709\u6548\u503C\u4E3A' + nearStepValues[0] + '\u3002'
            };
            return new _ValidationResult2['default']({
                validationMessage: (0, _stringTemplate2['default'])((0, _localeContext.$l)('Validator', 'step_mismatch'), injectionOptions),
                injectionOptions: injectionOptions,
                value: value,
                ruleName: 'stepMismatch'
            });
        }
    }
    return true;
}
module.exports = exports['default'];