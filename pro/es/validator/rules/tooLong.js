import format from 'string-template';
import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
export default function tooLong(value, _ref) {
    var maxLength = _ref.maxLength;

    if (!isEmpty(value)) {
        var _value$toString = value.toString(),
            length = _value$toString.length;

        if (!!maxLength && maxLength > 0 && length > maxLength) {
            var injectionOptions = { maxLength: maxLength, length: length };
            return new ValidationResult({
                validationMessage: format($l('Validator', 'too_long'), injectionOptions),
                injectionOptions: injectionOptions,
                value: value,
                ruleName: 'tooLong'
            });
        }
    }
    return true;
}