import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { Radio } from '../radio/Radio';
export var CheckBox = function (_Radio) {
    _inherits(CheckBox, _Radio);

    function CheckBox(props, context) {
        _classCallCheck(this, CheckBox);

        var _this = _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call(this, props, context));

        _this.type = 'checkbox';
        runInAction(function () {
            _this.value = _this.props.defaultChecked ? _this.checkedValue : _this.unCheckedValue;
        });
        return _this;
    }

    _createClass(CheckBox, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'getOtherProps', this).call(this), ['defaultChecked', 'unCheckedValue', 'unCheckedChildren', 'indeterminate']);
        }
    }, {
        key: 'renderInner',
        value: function renderInner() {
            return React.createElement('i', { className: this.prefixCls + '-inner' });
        }
    }, {
        key: 'getChildrenText',
        value: function getChildrenText() {
            var _props = this.props,
                children = _props.children,
                unCheckedChildren = _props.unCheckedChildren;

            return this.isChecked() ? children : unCheckedChildren || children;
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var prefixCls = this.prefixCls,
                indeterminate = this.props.indeterminate;

            return _get(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'getWrapperClassNames', this).call(this, _defineProperty({}, prefixCls + '-indeterminate', indeterminate));
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            var _props2 = this.props,
                checked = _props2.checked,
                indeterminate = _props2.indeterminate;

            if (indeterminate) {
                return false;
            }
            var name = this.name,
                dataSet = this.dataSet,
                checkedValue = this.checkedValue;

            if (dataSet && name) {
                return this.getValues().indexOf(checkedValue) !== -1;
            } else if (checked !== void 0) {
                return checked;
            } else {
                return this.value === checkedValue;
            }
        }
    }, {
        key: 'getDataSetValues',
        value: function getDataSetValues() {
            var values = this.getDataSetValue();
            if (values === void 0) {
                return [];
            } else {
                return [].concat(values);
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var record = this.record,
                checkedValue = this.checkedValue,
                multiple = this.multiple;

            if (record) {
                var values = void 0;
                if (multiple) {
                    values = this.getValues();
                    if (value === checkedValue) {
                        values.push(value);
                    } else {
                        var index = values.indexOf(checkedValue);
                        if (index !== -1) {
                            values.splice(index, 1);
                        }
                    }
                } else {
                    values = value;
                }
                _get(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'setValue', this).call(this, values);
            } else {
                _get(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'setValue', this).call(this, value);
            }
        }
    }, {
        key: 'setChecked',
        value: function setChecked(checked) {
            this.setValue(checked ? this.checkedValue : this.unCheckedValue);
        }
    }, {
        key: 'getOldValue',
        value: function getOldValue() {
            return this.isChecked() ? this.checkedValue : this.unCheckedValue;
        }
    }, {
        key: 'unCheckedValue',
        get: function get() {
            var unCheckedValue = this.props.unCheckedValue;

            if (unCheckedValue !== void 0) {
                return unCheckedValue;
            } else {
                var field = this.field;

                if (field) {
                    return field.get("falseValue" /* falseValue */);
                }
            }
            return false;
        }
    }, {
        key: 'checkedValue',
        get: function get() {
            var value = this.props.value;

            if (value !== void 0) {
                return value;
            } else {
                var field = this.field;

                if (field) {
                    return field.get("trueValue" /* trueValue */);
                }
            }
            return true;
        }
    }]);

    return CheckBox;
}(Radio);
CheckBox.displayName = 'CheckBox';
CheckBox.propTypes = _extends({
    /**
     * 中间状态
     */
    indeterminate: PropTypes.bool,
    /**
     * 未选中时的值
     */
    unCheckedValue: PropTypes.any,
    /**
     * 未选中时的内容
     */
    unCheckedChildren: PropTypes.node,
    defaultChecked: PropTypes.bool
}, Radio.propTypes);
CheckBox.defaultProps = _extends({}, Radio.defaultProps, {
    suffixCls: 'checkbox',
    indeterminate: false
});
tslib_1.__decorate([action], CheckBox.prototype, "setValue", null);
tslib_1.__decorate([action], CheckBox.prototype, "setChecked", null);
var ObserverCheckBox = function (_CheckBox) {
    _inherits(ObserverCheckBox, _CheckBox);

    function ObserverCheckBox() {
        _classCallCheck(this, ObserverCheckBox);

        return _possibleConstructorReturn(this, (ObserverCheckBox.__proto__ || Object.getPrototypeOf(ObserverCheckBox)).apply(this, arguments));
    }

    return ObserverCheckBox;
}(CheckBox);
ObserverCheckBox.defaultProps = CheckBox.defaultProps;
ObserverCheckBox = tslib_1.__decorate([observer], ObserverCheckBox);
export default ObserverCheckBox;