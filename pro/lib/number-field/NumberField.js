'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NumberField = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _defaultTo = require('lodash/defaultTo');

var _defaultTo2 = _interopRequireDefault(_defaultTo);

var _TextField2 = require('../text-field/TextField');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _keepRunning = require('../_util/keepRunning');

var _keepRunning2 = _interopRequireDefault(_keepRunning);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _utils = require('./utils');

var _isEmpty = require('../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var NumberField = exports.NumberField = function (_TextField) {
    (0, _inherits3['default'])(NumberField, _TextField);

    function NumberField() {
        (0, _classCallCheck3['default'])(this, NumberField);
        return (0, _possibleConstructorReturn3['default'])(this, (NumberField.__proto__ || Object.getPrototypeOf(NumberField)).apply(this, arguments));
    }

    (0, _createClass3['default'])(NumberField, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "number" /* number */;
        }
    }, {
        key: 'getLimit',
        value: function getLimit(type) {
            var record = this.record;

            var limit = this.getProp(type);
            if (record && (0, _isString2['default'])(limit)) {
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
            return (0, _extends3['default'])({}, (0, _get3['default'])(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'getValidatorProps', this).call(this), {
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
                return this.wrapperInnerSpanButton(_react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(_icon2['default'], { key: 'plus', type: 'keyboard_arrow_up', className: prefixCls + '-plus', onMouseDown: this.handlePlus }),
                    _react2['default'].createElement(_icon2['default'], { key: 'minus', type: 'keyboard_arrow_down', className: prefixCls + '-minus', onMouseDown: this.handleMinus })
                ));
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (!this.props.disabled && !this.isReadOnly()) {
                switch (e.keyCode) {
                    case _KeyCode2['default'].UP:
                        this.handleKeyDownUp(e);
                        break;
                    case _KeyCode2['default'].DOWN:
                        this.handleKeyDownDown(e);
                        break;
                    default:
                }
            }
            (0, _get3['default'])(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'handleKeyDown', this).call(this, e);
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
            var min = (0, _defaultTo2['default'])(this.min, -_utils.MAX_SAFE_INTEGER);
            var max = (0, _defaultTo2['default'])(this.max, _utils.MAX_SAFE_INTEGER);
            var step = (0, _defaultTo2['default'])(this.getProp('step'), 1);
            var newValue = void 0;
            if (!(0, _isNumber2['default'])(this.value)) {
                newValue = (0, _defaultTo2['default'])(this.min, 0);
            } else {
                var currentValue = newValue = getCurrentValidValue(String(this.value));
                var nearStep = (0, _utils.getNearStepValues)(currentValue, step, min, max);
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
                    var nextValue = (0, _utils.plus)(currentValue, isPlus ? step : -step);
                    if (nextValue < min) {
                        newValue = min;
                    } else if (nextValue > max) {
                        var nearMaxStep = (0, _utils.getNearStepValues)(max, step, min, max);
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
            (0, _get3['default'])(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'addValue', this).call(this, isNaN(value) || (0, _isEmpty2['default'])(value) ? null : Number(value));
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
                value = (0, _get3['default'])(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'restrictInput', this).call(this, value.replace(new RegExp('[^' + restrict + ']+', 'g'), ''));
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
            return _utils.formatNumber;
        }
    }, {
        key: 'processText',
        value: function processText(text, value, repeat) {
            return (0, _get3['default'])(NumberField.prototype.__proto__ || Object.getPrototypeOf(NumberField.prototype), 'processText', this).call(this, this.getFormatter()(text, this.lang, this.getFormatOptions()), value, repeat);
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: (0, _localeContext.$l)('NumberField', label ? 'value_missing_with_label' : 'value_missing', { label: label })
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
}(_TextField2.TextField);

NumberField.displayName = 'NumberField';
NumberField.propTypes = (0, _extends3['default'])({
    /**
     * 最小值
     */
    min: _propTypes2['default'].number,
    /**
     * 最大值
     */
    max: _propTypes2['default'].number,
    /**
     * 步距
     */
    step: _propTypes2['default'].number
}, _TextField2.TextField.propTypes);
NumberField.defaultProps = (0, _extends3['default'])({}, _TextField2.TextField.defaultProps, {
    suffixCls: 'input-number'
});
NumberField.format = _utils.formatNumber;
tslib_1.__decorate([_mobx.computed], NumberField.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([_mobx.computed], NumberField.prototype, "allowDecimal", null);
tslib_1.__decorate([_mobx.computed], NumberField.prototype, "allowNegative", null);
tslib_1.__decorate([_autobind2['default']], NumberField.prototype, "handleKeyDown", null);
tslib_1.__decorate([_keepRunning2['default']], NumberField.prototype, "handlePlus", null);
tslib_1.__decorate([_keepRunning2['default']], NumberField.prototype, "handleMinus", null);
var ObserverNumberField = function (_NumberField) {
    (0, _inherits3['default'])(ObserverNumberField, _NumberField);

    function ObserverNumberField() {
        (0, _classCallCheck3['default'])(this, ObserverNumberField);
        return (0, _possibleConstructorReturn3['default'])(this, (ObserverNumberField.__proto__ || Object.getPrototypeOf(ObserverNumberField)).apply(this, arguments));
    }

    return ObserverNumberField;
}(NumberField);
ObserverNumberField.defaultProps = NumberField.defaultProps;
ObserverNumberField.format = _utils.formatNumber;
ObserverNumberField = tslib_1.__decorate([_mobxReact.observer], ObserverNumberField);
exports['default'] = ObserverNumberField;

function getCurrentValidValue(value) {
    return Number(value.replace(/\.$/, '')) || 0;
}