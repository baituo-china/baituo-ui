import isString from 'lodash/isString';
export default (function (e, defaultMessage) {
    if (isString(e)) {
        defaultMessage = e;
    } else if (e instanceof Error) {
        defaultMessage = e.message;
    } else if (e && e.message) {
        defaultMessage = e.message;
    }
    if (typeof console !== 'undefined') {
        console.error(e);
    }
    return defaultMessage;
});