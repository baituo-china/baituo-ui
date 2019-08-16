import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
export default function rangeUnderflow(value, _ref) {
    var min = _ref.min,
        label = _ref.label;

    if (!isEmpty(value) && min !== void 0 && Number(value) < min) {
        var injectionOptions = { min: min, label: label };
        return new ValidationResult({
            validationMessage: $l('Validator', 'range_underflow', injectionOptions),
            injectionOptions: injectionOptions,
            value: value,
            ruleName: 'rangeUnderflow'
        });
    }
    return true;
}