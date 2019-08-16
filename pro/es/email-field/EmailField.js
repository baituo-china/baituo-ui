import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { TextField } from '../text-field/TextField';
import { $l } from '../locale-context';
var EmailField = function (_TextField) {
    _inherits(EmailField, _TextField);

    function EmailField() {
        _classCallCheck(this, EmailField);

        var _this = _possibleConstructorReturn(this, (EmailField.__proto__ || Object.getPrototypeOf(EmailField)).apply(this, arguments));

        _this.type = 'email';
        return _this;
    }

    _createClass(EmailField, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "email" /* email */;
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: $l('EmailField', label ? 'value_missing_with_label' : 'value_missing', { label: label }),
                typeMismatch: $l('EmailField', 'type_mismatch')
            };
        }
    }]);

    return EmailField;
}(TextField);
EmailField.displayName = 'EmailField';
tslib_1.__decorate([computed], EmailField.prototype, "defaultValidationMessages", null);
EmailField = tslib_1.__decorate([observer], EmailField);
export default EmailField;