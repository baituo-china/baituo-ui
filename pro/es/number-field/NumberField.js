import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import defaultTo from 'lodash/defaultTo';
import { TextField } from '../text-field/TextField';
import autobind from '../_util/autobind';
import keepRunning from '../_util/keepRunning';
import Icon from '../icon';
import KeyCode from '../../../es/_util/KeyCode';
import { formatNumber, getNearStepValues, MAX_SAFE_INTEGER, plus } from './utils';
import isEmpty from '../_util/isEmpty';
import { $l } from '../locale-context';
export var NumberField = function (_TextField) {
    _inherits(NumberField, _TextField);

    function NumberField() {
        _classCallCheck(this, NumberField);

        return _possibleConstructorReturn(this, (NumberField.__proto__ || Object.getPrototypeOf(NumberField)).apply(this, arguments));
    }

    _createClass(NumberField, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "number" /* number */;
        }
    }, {
        key: 'getLimit',
        value: function getLimit(type) {
            var record = this.record;

            var limit = this.getProp(type);
            if (record && isString(limit)) {
                var num = record.get(limit);
                if (num !== void 0) {
                    return num;
                }
            }
            return limit;
        }
    }, {
        key: 'getValidatorProps',
        value: function getValidatorProps() {
            var min = this.min,
                max = this.max;

            var step = this.getProp('step');
            return _extends({}, _get(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'getValidatorProps', this).call(this), {
                min: min,
                max: max,
                step: step
            });
        }
    }, {
        key: 'getInnerSpanButton',
        value: function getInnerSpanButton() {
            var prefixCls = this.prefixCls;

            var step = this.getProp('step');
            if (step && !this.isReadOnly()) {
                return this.wrapperInnerSpanButton(React.createElement(
                    'div',
                    null,
                    React.createElement(Icon, { key: 'plus', type: 'keyboard_arrow_up', className: prefixCls + '-plus', onMouseDown: this.handlePlus }),
                    React.createElement(Icon, { key: 'minus', type: 'keyboard_arrow_down', className: prefixCls + '-minus', onMouseDown: this.handleMinus })
                ));
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (!this.props.disabled && !this.isReadOnly()) {
                switch (e.keyCode) {
                    case KeyCode.UP:
                        this.handleKeyDownUp(e);
                        break;
                    case KeyCode.DOWN:
                        this.handleKeyDownDown(e);
                        break;
                    default:
                }
            }
            _get(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleKeyDownUp',
        value: function handleKeyDownUp(e) {
            e.preventDefault();
            if (this.getProp('step')) {
                this.step(true);
            }
        }
    }, {
        key: 'handleKeyDownDown',
        value: function handleKeyDownDown(e) {
            e.preventDefault();
            if (this.getProp('step')) {
                this.step(false);
            }
        }
    }, {
        key: 'handlePlus',
        value: function handlePlus() {
            this.step(true);
        }
    }, {
        key: 'handleMinus',
        value: function handleMinus() {
            this.step(false);
        }
    }, {
        key: 'step',
        value: function step(isPlus) {
            var min = defaultTo(this.min, -MAX_SAFE_INTEGER);
            var max = defaultTo(this.max, MAX_SAFE_INTEGER);
            var step = defaultTo(this.getProp('step'), 1);
            var newValue = void 0;
            if (!isNumber(this.value)) {
                newValue = defaultTo(this.min, 0);
            } else {
                var currentValue = newValue = getCurrentValidValue(String(this.value));
                var nearStep = getNearStepValues(currentValue, step, min, max);
                if (nearStep) {
                    switch (nearStep.length) {
                        case 1:
                            newValue = nearStep[0];
                            break;
                        case 2:
                            newValue = nearStep[isPlus ? 1 : 0];
                            break;
                        default:
                    }
                } else {
                    var nextValue = plus(currentValue, isPlus ? step : -step);
                    if (nextValue < min) {
                        newValue = min;
                    } else if (nextValue > max) {
                        var nearMaxStep = getNearStepValues(max, step, min, max);
                        if (nearMaxStep) {
                            newValue = nearMaxStep[0];
                        } else {
                            newValue = max;
                        }
                    } else {
                        newValue = nextValue;
                    }
                }
            }
            if (this.value !== newValue) {
                if (this.multiple) {
                    this.setText(String(newValue));
                } else {
                    this.addValue(newValue);
                }
            }
        }
    }, {
        key: 'addValue',
        value: function addValue(value) {
            _get(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'addValue', this).call(this, isNaN(value) || isEmpty(value) ? null : Number(value));
        }
    }, {
        key: 'restrictInput',
        value: function restrictInput(value) {
            if (value) {
                var restrict = '0-9';
                if (this.allowDecimal) {
                    restrict += '.';
                }
                var isNegative = this.allowNegative && /^-/.test(value);
                value = _get(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'restrictInput', this).call(this, value.replace(new RegExp('[^' + restrict + ']+', 'g'), ''));
                var values = value.split('.');
                if (values.length > 2) {
                    value = values.shift() + '.' + values.join('');
                }
                if (isNegative) {
                    value = '-' + value;
                }
            }
            return value;
        }
    }, {
        key: 'getFormatOptions',
        value: function getFormatOptions() {
            return;
        }
    }, {
        key: 'getFormatter',
        value: function getFormatter() {
            return formatNumber;
        }
    }, {
        key: 'processText',
        value: function processText(text, value, repeat) {
            return _get(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'processText', this).call(this, this.getFormatter()(text, this.lang, this.getFormatOptions()), value, repeat);
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: $l('NumberField', label ? 'value_missing_with_label' : 'value_missing', { label: label })
            };
        }
    }, {
        key: 'allowDecimal',
        get: function get() {
            var min = this.min;

            var step = this.getProp('step');
            return !step || step % 1 !== 0 || !!min && min % 1 !== 0;
        }
    }, {
        key: 'allowNegative',
        get: function get() {
            var min = this.min;

            return min === void 0 || min < 0;
        }
    }, {
        key: 'min',
        get: function get() {
            return this.getLimit('min');
        }
    }, {
        key: 'max',
        get: function get() {
            return this.getLimit('max');
        }
    }]);

    return NumberField;
}(TextField);
NumberField.displayName = 'NumberField';
NumberField.propTypes = _extends({
    /**
     * 最小值
     */
    min: PropTypes.number,
    /**
     * 最大值
     */
    max: PropTypes.number,
    /**
     * 步距
     */
    step: PropTypes.number
}, TextField.propTypes);
NumberField.defaultProps = _extends({}, TextField.defaultProps, {
    suffixCls: 'input-number'
});
NumberField.format = formatNumber;
tslib_1.__decorate([computed], NumberField.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([computed], NumberField.prototype, "allowDecimal", null);
tslib_1.__decorate([computed], NumberField.prototype, "allowNegative", null);
tslib_1.__decorate([autobind], NumberField.prototype, "handleKeyDown", null);
tslib_1.__decorate([keepRunning], NumberField.prototype, "handlePlus", null);
tslib_1.__decorate([keepRunning], NumberField.prototype, "handleMinus", null);
var ObserverNumberField = function (_NumberField) {
    _inherits(ObserverNumberField, _NumberField);

    function ObserverNumberField() {
        _classCallCheck(this, ObserverNumberField);

        return _possibleConstructorReturn(this, (ObserverNumberField.__proto__ || Object.getPrototypeOf(ObserverNumberField)).apply(this, arguments));
    }

    return ObserverNumberField;
}(NumberField);
ObserverNumberField.defaultProps = NumberField.defaultProps;
ObserverNumberField.format = formatNumber;
ObserverNumberField = tslib_1.__decorate([observer], ObserverNumberField);
export default ObserverNumberField;
function getCurrentValidValue(value) {
    return Number(value.replace(/\.$/, '')) || 0;
}