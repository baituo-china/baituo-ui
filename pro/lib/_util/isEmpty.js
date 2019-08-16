'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = isEmpty;
function isEmpty(value) {
    var allowBlank = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return value === null || value === void 0 || (allowBlank ? false : value === '');
}
module.exports = exports['default'];