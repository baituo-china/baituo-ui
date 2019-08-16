import format from 'string-template';
import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
import { getNearStepValues } from '../../number-field/utils';
export default function stepMismatch(value, _ref) {
    var step = _ref.step,
        min = _ref.min,
        max = _ref.max;

    if (!isEmpty(value) && step !== void 0) {
        var nearStepValues = getNearStepValues(Number(value), step, min, max);
        if (nearStepValues !== void 0) {
            var injectionOptions = {
                near: nearStepValues.length === 2 ? '\u4E24\u4E2A\u6700\u63A5\u8FD1\u7684\u6709\u6548\u503C\u5206\u522B\u4E3A' + nearStepValues[0] + '\u548C' + nearStepValues[1] + '\u3002' : '\u6700\u63A5\u8FD1\u7684\u6709\u6548\u503C\u4E3A' + nearStepValues[0] + '\u3002'
            };
            return new ValidationResult({
                validationMessage: format($l('Validator', 'step_mismatch'), injectionOptions),
                injectionOptions: injectionOptions,
                value: value,
                ruleName: 'stepMismatch'
            });
        }
    }
    return true;
}