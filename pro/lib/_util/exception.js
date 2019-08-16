'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (e, defaultMessage) {
    if ((0, _isString2['default'])(e)) {
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
};

module.exports = exports['default'];