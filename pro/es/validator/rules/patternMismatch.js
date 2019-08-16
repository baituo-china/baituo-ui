import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
function generatePattern(pattern) {
    if (pattern instanceof RegExp) {
        return pattern;
    }
    var begin = pattern.startsWith('^') ? '' : '^';
    var end = pattern.endsWith('$') ? '' : '$';
    return new RegExp('' + begin + pattern + end);
}
export default function patternMismatch(value, _ref) {
    var pattern = _ref.pattern;

    if (!isEmpty(value) && !!pattern && !generatePattern(pattern).test(value)) {
        return new ValidationResult({
            validationMessage: $l('Validator', 'pattern_mismatch'),
            value: value,
            ruleName: 'patternMismatch'
        });
    }
    return true;
}