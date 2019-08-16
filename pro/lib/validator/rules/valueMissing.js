'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = valueMissing;

var _mobx = require('mobx');

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function valueMissing(value, _ref) {
    var required = _ref.required,
        label = _ref.label;

    if (required && ((0, _isEmpty2['default'])(value) || (0, _mobx.isArrayLike)(value) && value.length === 0)) {
        var injectionOptions = { label: label };
        return new _ValidationResult2['default']({
            validationMessage: (0, _localeContext.$l)('Validator', label ? 'value_missing_with_label' : 'value_missing', injectionOptions),
            injectionOptions: injectionOptions,
            value: value,
            ruleName: 'valueMissing'
        });
    }
    return true;
}
module.exports = exports['default'];