import _extends from 'babel-runtime/helpers/extends';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import Map from 'core-js/library/fn/map';
import React, { cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { action, computed, isArrayLike, observable, runInAction, toJS } from 'mobx';
import classNames from 'classnames';
import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import isNumber from 'lodash/isNumber';
import isNil from 'lodash/isNil';
import defaultTo from 'lodash/defaultTo';
import { isMoment } from 'moment';
import { observer } from 'mobx-react';
import noop from 'lodash/noop';
import KeyCode from '../../../es/_util/KeyCode';
import warning from '../../../es/_util/warning';
import { getProPrefixCls } from '../../../es/configure';
import autobind from '../_util/autobind';
import { getDateFormatByField, isSame } from '../data-set/utils';
import Validator from '../validator/Validator';
import FormContext from '../form/FormContext';
import DataSetComponent from '../data-set/DataSetComponent';
import Icon from '../icon';
import Tooltip from '../tooltip';
import _isEmpty from '../_util/isEmpty';
import { FIELD_SUFFIX } from '../form/utils';
import Animate from '../animate';
import CloseButton from './CloseButton';
var map = {};
export function getFieldsById(id) {
    if (!map[id]) {
        map[id] = [];
    }
    return map[id];
}
export var FormField = function (_DataSetComponent) {
    _inherits(FormField, _DataSetComponent);

    function FormField(props, context) {
        _classCallCheck(this, FormField);

        var _this = _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).call(this, props, context));

        _this.emptyValue = null;
        _this.setName(props.name);
        if (!('value' in props)) {
            _this.value = props.defaultValue;
        }
        return _this;
    }

    _createClass(FormField, [{
        key: 'defaultRenderer',
        value: function defaultRenderer(_ref) {
            var text = _ref.text;

            return text;
        }
        /**
         * 判断是否应该显示验证信息, 作为属性传给Tooltip
         *
         * @readonly
         * @type {(undefined | boolean)}
         * @memberof FormField
         */

    }, {
        key: 'isValidationMessageHidden',
        value: function isValidationMessageHidden(message) {
            var _props = this.props,
                hidden = _props.hidden,
                noValidate = _props.noValidate;

            if (hidden || this.pristine || !this.record && noValidate || !message) {
                return true;
            }
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            var value = this.getValue();
            return isArrayLike(value) ? !value.length : _isEmpty(value);
        }
    }, {
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return {
                record: 'record' in props ? props.record : context.record,
                dataSet: 'dataSet' in props ? props.dataSet : context.dataSet,
                dataIndex: defaultTo(props.dataIndex, context.dataIndex),
                value: props.value
            };
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(FormField.prototype.__proto__ || Object.getPrototypeOf(FormField.prototype), 'getOtherProps', this).call(this), ['record', 'defaultValue', 'dataIndex', 'onEnterDown', 'onClear', 'readOnly', 'validator', 'validationRenderer', 'help', 'showHelp', 'renderer', 'maxTagPlaceholder', 'maxTagCount', 'maxTagTextLength', 'rowIndex', 'colIndex', 'labelLayout']);
            if (!this.isDisabled() && !this.isReadOnly()) {
                otherProps.onChange = this.handleChange;
            }
            otherProps.onKeyDown = this.handleKeyDown;
            return otherProps;
        }
    }, {
        key: 'render',
        value: function render() {
            var validationMessage = this.renderValidationMessage();
            var wrapper = this.renderWrapper();
            var help = this.renderHelpMessage();
            return this.hasFloatLabel ? [isValidElement(wrapper) && cloneElement(wrapper, { key: 'wrapper' }), React.createElement(
                Animate,
                { transitionName: 'show-error', component: '', transitionAppear: true, key: 'validation-message' },
                validationMessage
            ), help] : React.createElement(
                Tooltip,
                { title: !!(this.multiple && this.getValues().length) || this.isValidationMessageHidden(validationMessage) ? null : validationMessage, theme: 'light', placement: 'bottomLeft' },
                wrapper,
                help
            );
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var _get2, _ref2;

            var prefixCls = this.prefixCls;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = _get(FormField.prototype.__proto__ || Object.getPrototypeOf(FormField.prototype), 'getWrapperClassNames', this)).call.apply(_get2, [this, (_ref2 = {}, _defineProperty(_ref2, prefixCls + '-invalid', !this.isValid), _defineProperty(_ref2, prefixCls + '-float-label', this.hasFloatLabel), _defineProperty(_ref2, prefixCls + '-required', this.getProp('required')), _ref2)].concat(args));
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            return;
        }
    }, {
        key: 'renderHelpMessage',
        value: function renderHelpMessage() {
            var showHelp = this.props.showHelp;

            var help = this.getProp('help');
            if (showHelp === "newLine" /* newLine */ && help) {
                return React.createElement(
                    'div',
                    { key: 'help', className: getProPrefixCls(FIELD_SUFFIX) + '-help' },
                    help
                );
            }
        }
    }, {
        key: 'getLabel',
        value: function getLabel() {
            return this.getProp('label');
        }
    }, {
        key: 'renderFloatLabel',
        value: function renderFloatLabel() {
            if (this.hasFloatLabel) {
                var label = this.getLabel();
                if (label) {
                    var prefixCls = getProPrefixCls(FIELD_SUFFIX);
                    var required = this.getProp('required');
                    var classString = classNames(prefixCls + '-label', _defineProperty({}, prefixCls + '-required', required));
                    return React.createElement(
                        'div',
                        { className: prefixCls + '-label-wrapper' },
                        React.createElement(
                            'div',
                            { className: classString },
                            label
                        )
                    );
                }
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.addToForm(this.props, this.context);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            _get(FormField.prototype.__proto__ || Object.getPrototypeOf(FormField.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);
            this.removeFromForm(this.props, this.context);
            this.addToForm(nextProps, nextContext);
            if (!this.record && this.props.value !== nextProps.value) {
                this.validate(nextProps.value);
            }
            this.setName(nextProps.name);
        }
    }, {
        key: 'setName',
        value: function setName(name) {
            this.name = name;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeFromForm(this.props, this.context);
        }
    }, {
        key: 'addToForm',
        value: function addToForm(props, context) {
            var form = props.form;
            var formNode = context.formNode;

            if (form) {
                var fields = map[form];
                if (!fields) {
                    map[form] = fields = [];
                }
                fields.push(this);
            } else if (formNode) {
                formNode.addField(this);
            }
        }
    }, {
        key: 'removeFromForm',
        value: function removeFromForm(props, context) {
            var form = props.form;
            var formNode = context.formNode;

            if (form) {
                var fields = map[form];
                if (fields) {
                    var index = fields.indexOf(this);
                    if (index !== -1) {
                        fields.splice(index, 1);
                    }
                }
            } else if (formNode) {
                formNode.removeField(this);
            }
        }
    }, {
        key: 'renderValidationMessage',
        value: function renderValidationMessage(validationResult) {
            var validationMessage = this.getValidationMessage(validationResult);
            if (validationMessage) {
                return React.createElement(
                    'div',
                    { className: getProPrefixCls('validation-message') },
                    this.context.labelLayout !== "float" /* float */ && React.createElement(Icon, { type: 'error' }),
                    React.createElement(
                        'span',
                        null,
                        validationMessage
                    )
                );
            }
        }
    }, {
        key: 'getValidatorProps',
        value: function getValidatorProps() {
            var name = this.name;

            var type = this.getFieldType();
            var required = this.getProp('required');
            var customValidator = this.getProp('validator');
            var label = this.getProp('label');
            return {
                type: type,
                required: required,
                customValidator: customValidator,
                name: name,
                label: label,
                form: this.context.formNode
            };
        }
    }, {
        key: 'getValidationMessage',
        value: function getValidationMessage(validationResult) {
            var defaultValidationMessages = this.defaultValidationMessages,
                validator = this.validator;

            if (defaultValidationMessages) {
                var validity = validator.validity;

                var found = Object.keys(defaultValidationMessages).find(function (key) {
                    return validationResult ? validationResult.ruleName === key : validity[key];
                });
                if (found) {
                    return defaultValidationMessages[found];
                }
            }
            if (validationResult) {
                return validationResult.validationMessage;
            }
            return validator.validationMessage;
        }
    }, {
        key: 'getValidationErrorValues',
        value: function getValidationErrorValues() {
            return this.validator.validationErrorValues;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var _props2 = this.props,
                _props2$onKeyDown = _props2.onKeyDown,
                onKeyDown = _props2$onKeyDown === undefined ? noop : _props2$onKeyDown,
                _props2$onEnterDown = _props2.onEnterDown,
                onEnterDown = _props2$onEnterDown === undefined ? noop : _props2$onEnterDown;

            onKeyDown(e);
            if (!e.isDefaultPrevented()) {
                switch (e.keyCode) {
                    case KeyCode.ENTER:
                        this.handleEnterDown(e);
                        onEnterDown(e);
                        break;
                    case KeyCode.ESC:
                        this.blur();
                        break;
                    default:
                }
            }
        }
    }, {
        key: 'handleEnterDown',
        value: function handleEnterDown(e) {
            if (this.multiple) {
                var value = e.target.value;

                if (value !== '') {
                    this.addValue(value);
                    e.preventDefault();
                }
            } else {
                this.blur();
            }
        }
    }, {
        key: 'handleMutipleValueRemove',
        value: function handleMutipleValueRemove(e, value, index) {
            this.removeValue(value, index);
            e.stopPropagation();
        }
    }, {
        key: 'getDateFormat',
        value: function getDateFormat() {
            return getDateFormatByField(this.field, this.getFieldType());
        }
    }, {
        key: 'processValue',
        value: function processValue(value) {
            if (!isNil(value)) {
                if (isMoment(value)) {
                    return value.format(this.getDateFormat());
                }
                return value;
            }
            return '';
        }
    }, {
        key: 'isReadOnly',
        value: function isReadOnly() {
            return this.getProp('readOnly') || this.pristine || this.isControlled && !this.props.onChange;
        }
    }, {
        key: 'getDataSetValue',
        value: function getDataSetValue() {
            var record = this.record,
                pristine = this.pristine,
                name = this.name;

            if (record) {
                return pristine ? record.getPristineValue(name) : record.get(name);
            }
        }
    }, {
        key: 'getText',
        value: function getText() {
            var text = this.processValue(this.getValue());
            return this.isFocused && this.editable ? text : this.processText(text);
        }
    }, {
        key: 'processText',
        value: function processText(text) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getValue();
            var repeat = arguments[2];
            var record = this.record,
                dataSet = this.dataSet,
                _props3 = this.props,
                _props3$renderer = _props3.renderer,
                renderer = _props3$renderer === undefined ? this.defaultRenderer : _props3$renderer,
                name = _props3.name;

            return renderer ? renderer({
                value: value,
                text: text,
                record: record,
                dataSet: dataSet,
                name: name,
                repeat: repeat
            }) : text;
        }
    }, {
        key: 'getOldValue',
        value: function getOldValue() {
            return this.getValue();
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var name = this.name;

            if (this.dataSet && name) {
                return this.getDataSetValue();
            } else {
                return this.value;
            }
        }
    }, {
        key: 'getValues',
        value: function getValues() {
            var old = this.getValue();
            return _isEmpty(old) ? [] : isArrayLike(old) ? old.slice() : [old];
        }
    }, {
        key: 'addValues',
        value: function addValues(values) {
            if (this.multiple) {
                var oldValues = this.getValues();
                if (values.length) {
                    this.setValue([].concat(_toConsumableArray(oldValues), _toConsumableArray(values)));
                } else if (!oldValues.length) {
                    this.setValue(null);
                }
            } else {
                this.setValue(values[values.length - 1]);
            }
        }
    }, {
        key: 'addValue',
        value: function addValue(value) {
            this.addValues(_isEmpty(value) ? [] : [value]);
        }
    }, {
        key: 'removeValues',
        value: function removeValues(values) {
            var _this2 = this;

            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var repeat = void 0;
            this.setValue(values.reduce(function (oldValues, value) {
                return repeat = 0, oldValues.filter(function (v) {
                    if (v === value) {
                        if (repeat === index) {
                            _this2.afterRemoveValue(value, repeat);
                            repeat += 1;
                            return false;
                        }
                        repeat += 1;
                    }
                    return true;
                });
            }, this.getValues()));
        }
    }, {
        key: 'removeValue',
        value: function removeValue(value) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.removeValues([value], index);
        }
    }, {
        key: 'afterRemoveValue',
        value: function afterRemoveValue(_value, _repeat) {}
    }, {
        key: 'setValue',
        value: function setValue(value) {
            if (!this.isReadOnly()) {
                if (this.multiple ? isArrayLike(value) && !value.length : isNil(value) || value === '') {
                    value = this.emptyValue;
                }
                var name = this.name,
                    dataSet = this.dataSet,
                    dataIndex = this.observableProps.dataIndex;
                var _props$onChange = this.props.onChange,
                    onChange = _props$onChange === undefined ? noop : _props$onChange;
                var formNode = this.context.formNode;

                var old = this.getOldValue();
                if (dataSet && name) {
                    (this.record || dataSet.create({}, dataIndex)).set(name, value);
                } else {
                    this.validate(value);
                }
                if (!isSame(old, value)) {
                    onChange(value, toJS(old), formNode);
                }
                this.value = value;
            }
        }
    }, {
        key: 'renderMultipleValues',
        value: function renderMultipleValues(readOnly) {
            var _this3 = this;

            var values = this.getValues();
            var valueLength = values.length;
            var prefixCls = this.prefixCls,
                _props4 = this.props,
                _props4$maxTagCount = _props4.maxTagCount,
                maxTagCount = _props4$maxTagCount === undefined ? valueLength : _props4$maxTagCount,
                maxTagPlaceholder = _props4.maxTagPlaceholder,
                maxTagTextLength = _props4.maxTagTextLength;

            var validationErrorValues = this.getValidationErrorValues();
            var repeats = new Map();
            var disabled = this.isDisabled() || this.isReadOnly();
            var blockClassName = classNames(_defineProperty({}, prefixCls + '-multiple-block-disabled', disabled), prefixCls + '-multiple-block');
            var tags = values.slice(0, maxTagCount).map(function (v) {
                var repeat = repeats.get(v) || 0;
                var text = _this3.processText(_this3.processValue(v), v, repeat);
                repeats.set(v, repeat + 1);
                if (!isNil(text)) {
                    var content = maxTagTextLength && text.length > maxTagTextLength ? text.slice(0, maxTagTextLength) + '...' : text;
                    var validationResult = validationErrorValues.find(function (error) {
                        return error.value === v;
                    });
                    var className = classNames(_defineProperty({}, prefixCls + '-multiple-block-invalid', validationResult), blockClassName);
                    var validationMessage = validationResult && _this3.renderValidationMessage(validationResult);
                    var closeBtn = !disabled && React.createElement(CloseButton, { onClose: _this3.handleMutipleValueRemove, value: v, index: repeat });
                    var inner = readOnly ? React.createElement(
                        'span',
                        { className: className },
                        content
                    ) : React.createElement(
                        'li',
                        { className: className },
                        React.createElement(
                            'div',
                            null,
                            content
                        ),
                        closeBtn
                    );
                    return React.createElement(
                        Tooltip,
                        { key: v + '-' + text + '-' + repeat, title: validationMessage, theme: 'light', placement: 'bottomLeft', hidden: _this3.isValidationMessageHidden(validationMessage) },
                        inner
                    );
                }
            });
            if (valueLength > maxTagCount) {
                var content = '+ ' + (valueLength - maxTagCount) + ' ...';
                if (maxTagPlaceholder) {
                    var omittedValues = values.slice(maxTagCount, valueLength);
                    content = typeof maxTagPlaceholder === 'function' ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
                }
                tags.push(React.createElement(
                    'li',
                    { key: 'maxTagPlaceholder', className: blockClassName },
                    React.createElement(
                        'div',
                        null,
                        content
                    )
                ));
            }
            return tags;
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _props$onClear = this.props.onClear,
                onClear = _props$onClear === undefined ? noop : _props$onClear;

            this.setValue(this.emptyValue);
            onClear();
        }
    }, {
        key: 'checkValidity',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                var name, valid, _props$onInvalid, onInvalid, _validator, validationErrorValues, validity;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                name = this.name;
                                _context.next = 3;
                                return this.validate();

                            case 3:
                                valid = _context.sent;
                                _props$onInvalid = this.props.onInvalid, onInvalid = _props$onInvalid === undefined ? noop : _props$onInvalid;

                                if (!valid) {
                                    _validator = this.validator, validationErrorValues = _validator.validationErrorValues, validity = _validator.validity;

                                    onInvalid(validationErrorValues, validity, name);
                                }
                                return _context.abrupt('return', valid);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function checkValidity() {
                return _ref3.apply(this, arguments);
            }

            return checkValidity;
        }()
    }, {
        key: 'validate',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(value) {
                var invalid, validator, field;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                invalid = false;

                                if (this.props.noValidate) {
                                    _context2.next = 10;
                                    break;
                                }

                                if (value === void 0) {
                                    value = this.multiple ? this.getValues() : this.getValue();
                                }
                                validator = this.validator, field = this.field;

                                validator.reset();
                                if (field) {
                                    validator.setProps(field.getValidatorProps());
                                }
                                validator.setControlProps(omitBy(this.getValidatorProps(), isUndefined));
                                _context2.next = 9;
                                return validator.checkValidity(value);

                            case 9:
                                invalid = !_context2.sent;

                            case 10:
                                return _context2.abrupt('return', !invalid);

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function validate(_x4) {
                return _ref4.apply(this, arguments);
            }

            return validate;
        }()
    }, {
        key: 'isDisabled',
        value: function isDisabled() {
            var disabled = this.context.disabled;
            var field = this.field,
                record = this.record;

            if (disabled) {
                return disabled;
            }
            if (field) {
                var cascadeMap = field.get('cascadeMap');
                if (cascadeMap && (!record || Object.keys(cascadeMap).some(function (cascade) {
                    return !record.get(cascadeMap[cascade]);
                }))) {
                    return true;
                }
            }
            return _get(FormField.prototype.__proto__ || Object.getPrototypeOf(FormField.prototype), 'isDisabled', this).call(this);
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (!this.isControlled && !this.dataSet) {
                this.setValue(this.props.defaultValue);
            }
            this.validator.reset();
        }
    }, {
        key: 'getFieldType',
        value: function getFieldType() {
            var field = this.field;

            return field && field.get('type') || "string" /* string */;
        }
    }, {
        key: 'getProp',
        value: function getProp(propName) {
            var field = this.field;

            return defaultTo(field && field.get(propName), this.props[propName]);
        }
    }, {
        key: 'validator',
        get: function get() {
            var field = this.field;

            if (field) {
                return field.validator;
            }
            return new Validator();
        }
    }, {
        key: 'value',
        get: function get() {
            return this.observableProps.value;
        },
        set: function set(value) {
            var _this4 = this;

            runInAction(function () {
                _this4.observableProps.value = value;
            });
        }
    }, {
        key: 'labelLayout',
        get: function get() {
            return this.props.labelLayout || this.context.labelLayout;
        }
    }, {
        key: 'hasFloatLabel',
        get: function get() {
            var labelLayout = this.labelLayout;

            return labelLayout === "float" /* float */;
        }
    }, {
        key: 'isControlled',
        get: function get() {
            return this.props.value !== void 0;
        }
    }, {
        key: 'pristine',
        get: function get() {
            return this.props.pristine || this.context.pristine;
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            return null;
        }
    }, {
        key: 'editable',
        get: function get() {
            return !this.isReadOnly();
        }
    }, {
        key: 'dataSet',
        get: function get() {
            var record = this.record;

            if (record) {
                return record.dataSet;
            } else {
                return this.observableProps.dataSet;
            }
        }
    }, {
        key: 'record',
        get: function get() {
            var _observableProps = this.observableProps,
                record = _observableProps.record,
                dataSet = _observableProps.dataSet,
                dataIndex = _observableProps.dataIndex;

            if (record) {
                return record;
            } else if (dataSet) {
                if (isNumber(dataIndex)) {
                    return dataSet.get(dataIndex);
                } else {
                    return dataSet.current;
                }
            }
        }
    }, {
        key: 'field',
        get: function get() {
            var record = this.record,
                dataSet = this.dataSet,
                name = this.name;
            var displayName = this.constructor.displayName;

            warning(dataSet && displayName !== 'Output' ? !!name : true, displayName + ' with binding DataSet need property name.');
            if (name) {
                var recordField = record ? record.getField(name) : void 0;
                var dsField = dataSet ? dataSet.getField(name) : void 0;
                if (recordField) {
                    return recordField;
                } else {
                    return dsField;
                }
            }
        }
    }, {
        key: 'isValid',
        get: function get() {
            return this.validator.validity.valid || this.pristine;
        }
    }, {
        key: 'multiple',
        get: function get() {
            return this.getProp('multiple');
        }
    }]);

    return FormField;
}(DataSetComponent);
FormField.contextType = FormContext;
FormField.propTypes = _extends({
    type: PropTypes.string,
    /**
     * 字段名
     */
    name: PropTypes.string,
    /**
     * <受控>当前值
     */
    value: PropTypes.any,
    /**
     * 默认值
     */
    defaultValue: PropTypes.any,
    /**
     * 是否必输
     */
    required: PropTypes.bool,
    /**
     * 是否只读
     */
    readOnly: PropTypes.bool,
    /**
     * 对照表单id
     */
    form: PropTypes.string,
    /**
     * 对照record在DataSet中的index
     * @default dataSet.currentIndex
     */
    dataIndex: PropTypes.number,
    /**
     * 是否是多值
     * @default false
     */
    multiple: PropTypes.bool,
    /**
     * 表单下控件跨越的行数
     */
    rowSpan: PropTypes.number,
    /**
     * 表单下控件跨越的列数
     */
    colSpan: PropTypes.number,
    /**
     * 校验器
     * (value: any, name?: string, form?: ReactInstance) => string | boolean | Promise<string | boolean>
     */
    validator: PropTypes.func,
    /**
     * 校验提示渲染器
     * (validationMessage: string, validity: Validity, name?: string) => ReactNode
     */
    validationRenderer: PropTypes.func,
    /**
     * 校验失败回调
     * (validationMessage: ReactNode, validity: Validity, name?: string) => void
     */
    onInvalid: PropTypes.func,
    /**
     * 额外信息，常用作提示
     */
    help: PropTypes.string,
    /**
     * 显示提示信息的方式
     */
    showHelp: PropTypes.oneOf(["tooltip" /* tooltip */
    , "newLine" /* newLine */
    , "none" /* none */
    ]),
    renderer: PropTypes.func,
    /**
     * 值变化回调
     * (value: any, oldValue: any, form?: ReactInstance) => void
     */
    onChange: PropTypes.func,
    /**
     * 输入回调
     */
    onInput: PropTypes.func,
    /**
     * 键盘回车回调
     */
    onEnterDown: PropTypes.func
}, DataSetComponent.propTypes);
FormField.defaultProps = {
    readOnly: false,
    noValidate: false,
    showHelp: 'newLine'
};
tslib_1.__decorate([computed], FormField.prototype, "validator", null);
tslib_1.__decorate([observable], FormField.prototype, "name", void 0);
tslib_1.__decorate([computed], FormField.prototype, "value", null);
tslib_1.__decorate([computed], FormField.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([computed], FormField.prototype, "editable", null);
tslib_1.__decorate([computed], FormField.prototype, "dataSet", null);
tslib_1.__decorate([computed], FormField.prototype, "record", null);
tslib_1.__decorate([computed], FormField.prototype, "field", null);
tslib_1.__decorate([autobind], FormField.prototype, "defaultRenderer", null);
tslib_1.__decorate([action], FormField.prototype, "setName", null);
tslib_1.__decorate([computed], FormField.prototype, "isValid", null);
tslib_1.__decorate([computed], FormField.prototype, "multiple", null);
tslib_1.__decorate([autobind], FormField.prototype, "handleChange", null);
tslib_1.__decorate([autobind], FormField.prototype, "handleKeyDown", null);
tslib_1.__decorate([autobind], FormField.prototype, "handleMutipleValueRemove", null);
tslib_1.__decorate([action], FormField.prototype, "setValue", null);
tslib_1.__decorate([autobind], FormField.prototype, "reset", null);
var ObserverFormField = function (_FormField) {
    _inherits(ObserverFormField, _FormField);

    function ObserverFormField() {
        _classCallCheck(this, ObserverFormField);

        return _possibleConstructorReturn(this, (ObserverFormField.__proto__ || Object.getPrototypeOf(ObserverFormField)).apply(this, arguments));
    }

    return ObserverFormField;
}(FormField);
ObserverFormField.defaultProps = FormField.defaultProps;
ObserverFormField = tslib_1.__decorate([observer], ObserverFormField);
export default ObserverFormField;