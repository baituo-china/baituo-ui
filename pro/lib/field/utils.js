'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = processFieldValue;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CheckBox = require('../check-box/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _utils = require('../number-field/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function processFieldValue(value, field, lang, showValueIfNotFound) {
    var type = field.type;

    if (type === "boolean" /* boolean */) {
            return _react2['default'].createElement(_CheckBox2['default'], { disabled: true, checked: value === field.get("trueValue" /* trueValue */) });
        } else if (type === "number" /* number */) {
            return (0, _utils.formatNumber)(value, lang);
        } else if (type === "currency" /* currency */) {
            return (0, _utils.formatCurrency)(value, lang, {
                currency: this.getProp('currency')
            });
        }
    return field.getText(value, showValueIfNotFound);
}
module.exports = exports['default'];