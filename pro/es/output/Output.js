import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import { FormField } from '../field/FormField';
import autobind from '../_util/autobind';
import processFieldValue from '../field/utils';
var Output = function (_FormField) {
    _inherits(Output, _FormField);

    function Output() {
        _classCallCheck(this, Output);

        return _possibleConstructorReturn(this, (Output.__proto__ || Object.getPrototypeOf(Output)).apply(this, arguments));
    }

    _createClass(Output, [{
        key: 'handleChange',
        value: function handleChange() {}
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(Output.prototype.__proto__ || Object.getPrototypeOf(Output.prototype), 'getOtherProps', this).call(this), ['name']);
        }
    }, {
        key: 'getText',
        value: function getText() {
            return this.processText(this.processValue(this.getValue()));
        }
    }, {
        key: 'processValue',
        value: function processValue(value) {
            if (!isNil(value)) {
                value = _get(Output.prototype.__proto__ || Object.getPrototypeOf(Output.prototype), 'processValue', this).call(this, value);
                var field = this.field,
                    lang = this.lang;

                if (field) {
                    return processFieldValue(value, field, lang, true);
                }
            }
            return value;
        }
    }, {
        key: 'getRenderedValue',
        value: function getRenderedValue() {
            var field = this.field;

            if (field) {
                var multiple = field.get('multiple');
                if (multiple) {
                    return this.renderMultipleValues(true);
                }
            }
            return this.getText();
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            return React.createElement(
                'span',
                this.getMergedProps(),
                this.getRenderedValue()
            );
        }
    }, {
        key: 'editable',
        get: function get() {
            return false;
        }
    }]);

    return Output;
}(FormField);
Output.displayName = 'Output';
Output.defaultProps = _extends({}, FormField.defaultProps, {
    suffixCls: 'output'
});
tslib_1.__decorate([computed], Output.prototype, "editable", null);
tslib_1.__decorate([autobind], Output.prototype, "handleChange", null);
Output = tslib_1.__decorate([observer], Output);
export default Output;