import { isArrayLike } from 'mobx';
import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
export default function valueMissing(value, _ref) {
    var required = _ref.required,
        label = _ref.label;

    if (required && (isEmpty(value) || isArrayLike(value) && value.length === 0)) {
        var injectionOptions = { label: label };
        return new ValidationResult({
            validationMessage: $l('Validator', label ? 'value_missing_with_label' : 'value_missing', injectionOptions),
            injectionOptions: injectionOptions,
            value: value,
            ruleName: 'valueMissing'
        });
    }
    return true;
}