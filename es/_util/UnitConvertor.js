import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
export function pxToRem(num) {
    if (num !== void 0 && num !== null) {
        if (num === 0) {
            return '0';
        }
        if (isNumber(num)) {
            return num / 100 + 'rem';
        }
        return num;
    }
}
export function toPx(num) {
    if (num !== void 0 && num !== null) {
        if (isNumber(num)) {
            return num;
        }
        if (isString(num) && num !== 'auto' && !num.endsWith('%')) {
            return parseFloat(num) * (num.endsWith('rem') ? 100 : 1);
        }
    }
}