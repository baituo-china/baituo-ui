'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = patternMismatch;

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function generatePattern(pattern) {
    if (pattern instanceof RegExp) {
        return pattern;
    }
    var begin = pattern.startsWith('^') ? '' : '^';
    var end = pattern.endsWith('$') ? '' : '$';
    return new RegExp('' + begin + pattern + end);
}
function patternMismatch(value, _ref) {
    var pattern = _ref.pattern;

    if (!(0, _isEmpty2['default'])(value) && !!pattern && !generatePattern(pattern).test(value)) {
        return new _ValidationResult2['default']({
            validationMessage: (0, _localeContext.$l)('Validator', 'pattern_mismatch'),
            value: value,
            ruleName: 'patternMismatch'
        });
    }
    return true;
}
module.exports = exports['default'];