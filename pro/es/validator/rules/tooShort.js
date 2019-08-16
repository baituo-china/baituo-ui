import format from 'string-template';
import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
export default function tooShort(value, _ref) {
    var minLength = _ref.minLength;

    if (!isEmpty(value)) {
        var _value$toString = value.toString(),
            length = _value$toString.length;

        if (!!minLength && minLength > 0 && length < minLength) {
            var injectionOptions = { minLength: minLength, length: length };
            return new ValidationResult({
                validationMessage: format($l('Validator', 'too_short'), injectionOptions),
                injectionOptions: injectionOptions,
                value: value,
                ruleName: 'tooShort'
            });
        }
    }
    return true;
}