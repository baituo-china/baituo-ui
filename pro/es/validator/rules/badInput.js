import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
export default function badInput(value, _ref) {
    var type = _ref.type;

    if (!isEmpty(value) && type === "number" /* number */ && isNaN(value)) {
        return new ValidationResult({
            validationMessage: $l('Validator', 'bad_input'),
            value: value,
            ruleName: 'badInput'
        });
    }
    return true;
}