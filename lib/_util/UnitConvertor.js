'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pxToRem = pxToRem;
exports.toPx = toPx;

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function pxToRem(num) {
    if (num !== void 0 && num !== null) {
        if (num === 0) {
            return '0';
        }
        if ((0, _isNumber2['default'])(num)) {
            return num / 100 + 'rem';
        }
        return num;
    }
}
function toPx(num) {
    if (num !== void 0 && num !== null) {
        if ((0, _isNumber2['default'])(num)) {
            return num;
        }
        if ((0, _isString2['default'])(num) && num !== 'auto' && !num.endsWith('%')) {
            return parseFloat(num) * (num.endsWith('rem') ? 100 : 1);
        }
    }
}