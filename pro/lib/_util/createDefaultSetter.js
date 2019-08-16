"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = createDefaultSetter;
function createDefaultSetter(key) {
    return function set(newValue) {
        Object.defineProperty(this, key, {
            configurable: true,
            writable: true,
            // IS enumerable when reassigned by the outside word
            enumerable: true,
            value: newValue
        });
        return newValue;
    };
}
module.exports = exports["default"];