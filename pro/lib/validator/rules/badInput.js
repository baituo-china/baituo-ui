'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = badInput;

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function badInput(value, _ref) {
    var type = _ref.type;

    if (!(0, _isEmpty2['default'])(value) && type === "number" /* number */ && isNaN(value)) {
        return new _ValidationResult2['default']({
            validationMessage: (0, _localeContext.$l)('Validator', 'bad_input'),
            value: value,
            ruleName: 'badInput'
        });
    }
    return true;
}
module.exports = exports['default'];