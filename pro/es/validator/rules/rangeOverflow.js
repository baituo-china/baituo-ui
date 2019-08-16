import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
export default function rangeOverflow(value, _ref) {
    var max = _ref.max,
        label = _ref.label;

    if (!isEmpty(value) && max !== void 0 && Number(value) > max) {
        var injectionOptions = { max: max, label: label };
        return new ValidationResult({
            validationMessage: $l('Validator', 'range_overflow', injectionOptions),
            injectionOptions: injectionOptions,
            value: value,
            ruleName: 'rangeOverflow'
        });
    }
    return true;
}