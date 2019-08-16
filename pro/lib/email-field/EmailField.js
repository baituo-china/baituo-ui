'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _TextField2 = require('../text-field/TextField');

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var EmailField = function (_TextField) {
    (0, _inherits3['default'])(EmailField, _TextField);

    function EmailField() {
        (0, _classCallCheck3['default'])(this, EmailField);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (EmailField.__proto__ || Object.getPrototypeOf(EmailField)).apply(this, arguments));

        _this.type = 'email';
        return _this;
    }

    (0, _createClass3['default'])(EmailField, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "email" /* email */;
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: (0, _localeContext.$l)('EmailField', label ? 'value_missing_with_label' : 'value_missing', { label: label }),
                typeMismatch: (0, _localeContext.$l)('EmailField', 'type_mismatch')
            };
        }
    }]);
    return EmailField;
}(_TextField2.TextField);
EmailField.displayName = 'EmailField';
tslib_1.__decorate([_mobx.computed], EmailField.prototype, "defaultValidationMessages", null);
EmailField = tslib_1.__decorate([_mobxReact.observer], EmailField);
exports['default'] = EmailField;
module.exports = exports['default'];