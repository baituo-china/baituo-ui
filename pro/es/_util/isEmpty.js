export default function isEmpty(value) {
    var allowBlank = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return value === null || value === void 0 || (allowBlank ? false : value === '');
}