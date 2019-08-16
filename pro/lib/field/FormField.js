'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormField = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get3 = require('babel-runtime/helpers/get');

var _get4 = _interopRequireDefault(_get3);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.getFieldsById = getFieldsById;

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _map = require('core-js/library/fn/map');

var _map2 = _interopRequireDefault(_map);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _omitBy = require('lodash/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _defaultTo = require('lodash/defaultTo');

var _defaultTo2 = _interopRequireDefault(_defaultTo);

var _moment = require('moment');

var _mobxReact = require('mobx-react');

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _configure = require('../../../lib/configure');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _utils = require('../data-set/utils');

var _Validator = require('../validator/Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _FormContext = require('../form/FormContext');

var _FormContext2 = _interopRequireDefault(_FormContext);

var _DataSetComponent2 = require('../data-set/DataSetComponent');

var _DataSetComponent3 = _interopRequireDefault(_DataSetComponent2);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _isEmpty2 = require('../_util/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _utils2 = require('../form/utils');

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var map = {};
function getFieldsById(id) {
    if (!map[id]) {
        map[id] = [];
    }
    return map[id];
}

var FormField = exports.FormField = function (_DataSetComponent) {
    (0, _inherits3['default'])(FormField, _DataSetComponent);

    function FormField(props, context) {
        (0, _classCallCheck3['default'])(this, FormField);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).call(this, props, context));

        _this.emptyValue = null;
        _this.setName(props.name);
        if (!('value' in props)) {
            _this.value = props.defaultValue;
        }
        return _this;
    }

    (0, _createClass3['default'])(FormField, [{
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
            return (0, _mobx.isArrayLike)(value) ? !value.length : (0, _isEmpty3['default'])(value);
        }
    }, {
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return {
                record: 'record' in props ? props.record : context.record,
                dataSet: 'dataSet' in props ? props.dataSet : context.dataSet,
                dataIndex: (0, _defaultTo2['default'])(props.dataIndex, context.dataIndex),
                value: props.value
            };
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get4['default'])(FormField.prototype.__proto__ || Object.getPrototypeOf(FormField.prototype), 'getOtherProps', this).call(this), ['record', 'defaultValue', 'dataIndex', 'onEnterDown', 'onClear', 'readOnly', 'validator', 'validationRenderer', 'help', 'showHelp', 'renderer', 'maxTagPlaceholder', 'maxTagCount', 'maxTagTextLength', 'rowIndex', 'colIndex', 'labelLayout']);
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
            return this.hasFloatLabel ? [(0, _react.isValidElement)(wrapper) && (0, _react.cloneElement)(wrapper, { key: 'wrapper' }), _react2['default'].createElement(
                _animate2['default'],
                { transitionName: 'show-error', component: '', transitionAppear: true, key: 'validation-message' },
                validationMessage
            ), help] : _react2['default'].createElement(
                _tooltip2['default'],
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

            return (_get2 = (0, _get4['default'])(FormField.prototype.__proto__ || Object.getPrototypeOf(FormField.prototype), 'getWrapperClassNames', this)).call.apply(_get2, [this, (_ref2 = {}, (0, _defineProperty3['default'])(_ref2, prefixCls + '-invalid', !this.isValid), (0, _defineProperty3['default'])(_ref2, prefixCls + '-float-label', this.hasFloatLabel), (0, _defineProperty3['default'])(_ref2, prefixCls + '-required', this.getProp('required')), _ref2)].concat(args));
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
                return _react2['default'].createElement(
                    'div',
                    { key: 'help', className: (0, _configure.getProPrefixCls)(_utils2.FIELD_SUFFIX) + '-help' },
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
                    var prefixCls = (0, _configure.getProPrefixCls)(_utils2.FIELD_SUFFIX);
                    var required = this.getProp('required');
                    var classString = (0, _classnames2['default'])(prefixCls + '-label', (0, _defineProperty3['default'])({}, prefixCls + '-required', required));
                    return _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-label-wrapper' },
                        _react2['default'].createElement(
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
            (0, _get4['default'])(FormField.prototype.__proto__ || Object.getPrototypeOf(FormField.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);
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
                return _react2['default'].createElement(
                    'div',
                    { className: (0, _configure.getProPrefixCls)('validation-message') },
                    this.context.labelLayout !== "float" /* float */ && _react2['default'].createElement(_icon2['default'], { type: 'error' }),
                    _react2['default'].createElement(
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
                onKeyDown = _props2$onKeyDown === undefined ? _noop2['default'] : _props2$onKeyDown,
                _props2$onEnterDown = _props2.onEnterDown,
                onEnterDown = _props2$onEnterDown === undefined ? _noop2['default'] : _props2$onEnterDown;

            onKeyDown(e);
            if (!e.isDefaultPrevented()) {
                switch (e.keyCode) {
                    case _KeyCode2['default'].ENTER:
                        this.handleEnterDown(e);
                        onEnterDown(e);
                        break;
                    case _KeyCode2['default'].ESC:
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
            return (0, _utils.getDateFormatByField)(this.field, this.getFieldType());
        }
    }, {
        key: 'processValue',
        value: function processValue(value) {
            if (!(0, _isNil2['default'])(value)) {
                if ((0, _moment.isMoment)(value)) {
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
            return (0, _isEmpty3['default'])(old) ? [] : (0, _mobx.isArrayLike)(old) ? old.slice() : [old];
        }
    }, {
        key: 'addValues',
        value: function addValues(values) {
            if (this.multiple) {
                var oldValues = this.getValues();
                if (values.length) {
                    this.setValue([].concat((0, _toConsumableArray3['default'])(oldValues), (0, _toConsumableArray3['default'])(values)));
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
            this.addValues((0, _isEmpty3['default'])(value) ? [] : [value]);
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
                if (this.multiple ? (0, _mobx.isArrayLike)(value) && !value.length : (0, _isNil2['default'])(value) || value === '') {
                    value = this.emptyValue;
                }
                var name = this.name,
                    dataSet = this.dataSet,
                    dataIndex = this.observableProps.dataIndex;
                var _props$onChange = this.props.onChange,
                    onChange = _props$onChange === undefined ? _noop2['default'] : _props$onChange;
                var formNode = this.context.formNode;

                var old = this.getOldValue();
                if (dataSet && name) {
                    (this.record || dataSet.create({}, dataIndex)).set(name, value);
                } else {
                    this.validate(value);
                }
                if (!(0, _utils.isSame)(old, value)) {
                    onChange(value, (0, _mobx.toJS)(old), formNode);
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
            var repeats = new _map2['default']();
            var disabled = this.isDisabled() || this.isReadOnly();
            var blockClassName = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-multiple-block-disabled', disabled), prefixCls + '-multiple-block');
            var tags = values.slice(0, maxTagCount).map(function (v) {
                var repeat = repeats.get(v) || 0;
                var text = _this3.processText(_this3.processValue(v), v, repeat);
                repeats.set(v, repeat + 1);
                if (!(0, _isNil2['default'])(text)) {
                    var content = maxTagTextLength && text.length > maxTagTextLength ? text.slice(0, maxTagTextLength) + '...' : text;
                    var validationResult = validationErrorValues.find(function (error) {
                        return error.value === v;
                    });
                    var className = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-multiple-block-invalid', validationResult), blockClassName);
                    var validationMessage = validationResult && _this3.renderValidationMessage(validationResult);
                    var closeBtn = !disabled && _react2['default'].createElement(_CloseButton2['default'], { onClose: _this3.handleMutipleValueRemove, value: v, index: repeat });
                    var inner = readOnly ? _react2['default'].createElement(
                        'span',
                        { className: className },
                        content
                    ) : _react2['default'].createElement(
                        'li',
                        { className: className },
                        _react2['default'].createElement(
                            'div',
                            null,
                            content
                        ),
                        closeBtn
                    );
                    return _react2['default'].createElement(
                        _tooltip2['default'],
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
                tags.push(_react2['default'].createElement(
                    'li',
                    { key: 'maxTagPlaceholder', className: blockClassName },
                    _react2['default'].createElement(
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
                onClear = _props$onClear === undefined ? _noop2['default'] : _props$onClear;

            this.setValue(this.emptyValue);
            onClear();
        }
    }, {
        key: 'checkValidity',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
                var name, valid, _props$onInvalid, onInvalid, _validator, validationErrorValues, validity;

                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                name = this.name;
                                _context.next = 3;
                                return this.validate();

                            case 3:
                                valid = _context.sent;
                                _props$onInvalid = this.props.onInvalid, onInvalid = _props$onInvalid === undefined ? _noop2['default'] : _props$onInvalid;

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
            var _ref4 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2(value) {
                var invalid, validator, field;
                return _regenerator2['default'].wrap(function _callee2$(_context2) {
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
                                validator.setControlProps((0, _omitBy2['default'])(this.getValidatorProps(), _isUndefined2['default']));
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
            return (0, _get4['default'])(FormField.prototype.__proto__ || Object.getPrototypeOf(FormField.prototype), 'isDisabled', this).call(this);
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

            return (0, _defaultTo2['default'])(field && field.get(propName), this.props[propName]);
        }
    }, {
        key: 'validator',
        get: function get() {
            var field = this.field;

            if (field) {
                return field.validator;
            }
            return new _Validator2['default']();
        }
    }, {
        key: 'value',
        get: function get() {
            return this.observableProps.value;
        },
        set: function set(value) {
            var _this4 = this;

            (0, _mobx.runInAction)(function () {
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
                if ((0, _isNumber2['default'])(dataIndex)) {
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

            (0, _warning2['default'])(dataSet && displayName !== 'Output' ? !!name : true, displayName + ' with binding DataSet need property name.');
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
}(_DataSetComponent3['default']);

FormField.contextType = _FormContext2['default'];
FormField.propTypes = (0, _extends3['default'])({
    type: _propTypes2['default'].string,
    /**
     * 字段名
     */
    name: _propTypes2['default'].string,
    /**
     * <受控>当前值
     */
    value: _propTypes2['default'].any,
    /**
     * 默认值
     */
    defaultValue: _propTypes2['default'].any,
    /**
     * 是否必输
     */
    required: _propTypes2['default'].bool,
    /**
     * 是否只读
     */
    readOnly: _propTypes2['default'].bool,
    /**
     * 对照表单id
     */
    form: _propTypes2['default'].string,
    /**
     * 对照record在DataSet中的index
     * @default dataSet.currentIndex
     */
    dataIndex: _propTypes2['default'].number,
    /**
     * 是否是多值
     * @default false
     */
    multiple: _propTypes2['default'].bool,
    /**
     * 表单下控件跨越的行数
     */
    rowSpan: _propTypes2['default'].number,
    /**
     * 表单下控件跨越的列数
     */
    colSpan: _propTypes2['default'].number,
    /**
     * 校验器
     * (value: any, name?: string, form?: ReactInstance) => string | boolean | Promise<string | boolean>
     */
    validator: _propTypes2['default'].func,
    /**
     * 校验提示渲染器
     * (validationMessage: string, validity: Validity, name?: string) => ReactNode
     */
    validationRenderer: _propTypes2['default'].func,
    /**
     * 校验失败回调
     * (validationMessage: ReactNode, validity: Validity, name?: string) => void
     */
    onInvalid: _propTypes2['default'].func,
    /**
     * 额外信息，常用作提示
     */
    help: _propTypes2['default'].string,
    /**
     * 显示提示信息的方式
     */
    showHelp: _propTypes2['default'].oneOf(["tooltip" /* tooltip */
    , "newLine" /* newLine */
    , "none" /* none */
    ]),
    renderer: _propTypes2['default'].func,
    /**
     * 值变化回调
     * (value: any, oldValue: any, form?: ReactInstance) => void
     */
    onChange: _propTypes2['default'].func,
    /**
     * 输入回调
     */
    onInput: _propTypes2['default'].func,
    /**
     * 键盘回车回调
     */
    onEnterDown: _propTypes2['default'].func
}, _DataSetComponent3['default'].propTypes);
FormField.defaultProps = {
    readOnly: false,
    noValidate: false,
    showHelp: 'newLine'
};
tslib_1.__decorate([_mobx.computed], FormField.prototype, "validator", null);
tslib_1.__decorate([_mobx.observable], FormField.prototype, "name", void 0);
tslib_1.__decorate([_mobx.computed], FormField.prototype, "value", null);
tslib_1.__decorate([_mobx.computed], FormField.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([_mobx.computed], FormField.prototype, "editable", null);
tslib_1.__decorate([_mobx.computed], FormField.prototype, "dataSet", null);
tslib_1.__decorate([_mobx.computed], FormField.prototype, "record", null);
tslib_1.__decorate([_mobx.computed], FormField.prototype, "field", null);
tslib_1.__decorate([_autobind2['default']], FormField.prototype, "defaultRenderer", null);
tslib_1.__decorate([_mobx.action], FormField.prototype, "setName", null);
tslib_1.__decorate([_mobx.computed], FormField.prototype, "isValid", null);
tslib_1.__decorate([_mobx.computed], FormField.prototype, "multiple", null);
tslib_1.__decorate([_autobind2['default']], FormField.prototype, "handleChange", null);
tslib_1.__decorate([_autobind2['default']], FormField.prototype, "handleKeyDown", null);
tslib_1.__decorate([_autobind2['default']], FormField.prototype, "handleMutipleValueRemove", null);
tslib_1.__decorate([_mobx.action], FormField.prototype, "setValue", null);
tslib_1.__decorate([_autobind2['default']], FormField.prototype, "reset", null);
var ObserverFormField = function (_FormField) {
    (0, _inherits3['default'])(ObserverFormField, _FormField);

    function ObserverFormField() {
        (0, _classCallCheck3['default'])(this, ObserverFormField);
        return (0, _possibleConstructorReturn3['default'])(this, (ObserverFormField.__proto__ || Object.getPrototypeOf(ObserverFormField)).apply(this, arguments));
    }

    return ObserverFormField;
}(FormField);
ObserverFormField.defaultProps = FormField.defaultProps;
ObserverFormField = tslib_1.__decorate([_mobxReact.observer], ObserverFormField);
exports['default'] = ObserverFormField;