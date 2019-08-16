import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { TextField } from '../text-field/TextField';
import { $l } from '../locale-context';
var UrlField = function (_TextField) {
    _inherits(UrlField, _TextField);

    function UrlField() {
        _classCallCheck(this, UrlField);

        var _this = _possibleConstructorReturn(this, (UrlField.__proto__ || Object.getPrototypeOf(UrlField)).apply(this, arguments));

        _this.type = 'url';
        return _this;
    }

    _createClass(UrlField, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "url" /* url */;
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: $l('UrlField', label ? 'value_missing_with_label' : 'value_missing', { label: label }),
                typeMismatch: $l('UrlField', 'type_mismatch')
            };
        }
    }]);

    return UrlField;
}(TextField);
UrlField.displayName = 'UrlField';
tslib_1.__decorate([computed], UrlField.prototype, "defaultValidationMessages", null);
UrlField = tslib_1.__decorate([observer], UrlField);
export default UrlField;