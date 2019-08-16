'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextField = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

exports.isPlaceHolderSupport = isPlaceHolderSupport;

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _defer = require('lodash/defer');

var _defer2 = _interopRequireDefault(_defer);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _FormField2 = require('../field/FormField');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _isEmpty2 = require('../_util/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _EventManager = require('../_util/EventManager');

var _measureTextWidth = require('../_util/measureTextWidth');

var _measureTextWidth2 = _interopRequireDefault(_measureTextWidth);

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PLACEHOLDER_SUPPORT = void 0;
function isPlaceHolderSupport() {
    if (PLACEHOLDER_SUPPORT !== void 0) {
        return PLACEHOLDER_SUPPORT;
    } else if (typeof window !== 'undefined') {
        return PLACEHOLDER_SUPPORT = 'placeholder' in document.createElement('input');
    } else {
        return true;
    }
}

var TextField = exports.TextField = function (_FormField) {
    (0, _inherits3['default'])(TextField, _FormField);

    function TextField() {
        (0, _classCallCheck3['default'])(this, TextField);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).apply(this, arguments));

        _this.type = 'text';
        return _this;
    }

    (0, _createClass3['default'])(TextField, [{
        key: 'isEmpty',
        value: function isEmpty() {
            return (0, _isEmpty3['default'])(this.text) && (0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'isEmpty', this).call(this);
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'getOtherProps', this).call(this), ['prefix', 'suffix', 'clearButton', 'addonBefore', 'addonAfter', 'restrict', 'placeholder', 'placeHolder']);
            otherProps.type = this.type;
            otherProps.maxLength = this.getProp('maxLength');
            otherProps.onKeyDown = this.handleKeyDown;
            return otherProps;
        }
    }, {
        key: 'getValidatorProps',
        value: function getValidatorProps() {
            var pattern = this.getProp('pattern');
            var maxLength = this.getProp('maxLength');
            var minLength = this.getProp('minLength');
            return (0, _extends3['default'])({}, (0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'getValidatorProps', this).call(this), {
                pattern: pattern,
                maxLength: maxLength,
                minLength: minLength
            });
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var _get2, _ref;

            var prefixCls = this.prefixCls;

            var suffix = this.getSuffix();
            var prefix = this.getPrefix();

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = (0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'getWrapperClassNames', this)).call.apply(_get2, [this, (_ref = {}, (0, _defineProperty3['default'])(_ref, prefixCls + '-empty', this.isEmpty()), (0, _defineProperty3['default'])(_ref, prefixCls + '-suffix-button', (0, _react.isValidElement)(suffix)), (0, _defineProperty3['default'])(_ref, prefixCls + '-multiple', this.multiple), (0, _defineProperty3['default'])(_ref, prefixCls + '-prefix-button', (0, _react.isValidElement)(prefix)), _ref)].concat(args));
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            return this.renderGroup();
        }
    }, {
        key: 'renderInputElement',
        value: function renderInputElement() {
            var input = this.getWrappedEditor();
            var button = this.getInnerSpanButton();
            var suffix = this.getSuffix();
            var prefix = this.getPrefix();
            var otherPrevNode = this.getOtherPrevNode();
            var otherNextNode = this.getOtherNextNode();
            var placeholderDiv = this.renderPlaceHolder();
            var floatLabel = this.renderFloatLabel();
            var multipleHolder = this.renderMultipleHolder();
            return _react2['default'].createElement(
                'span',
                (0, _extends3['default'])({ key: 'element' }, this.getWrapperProps()),
                multipleHolder,
                otherPrevNode,
                placeholderDiv,
                _react2['default'].createElement(
                    'label',
                    { onMouseDown: this.handleMouseDown },
                    prefix,
                    input,
                    floatLabel,
                    button,
                    suffix
                ),
                otherNextNode
            );
        }
    }, {
        key: 'renderGroup',
        value: function renderGroup() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                addonBefore = _props.addonBefore,
                addonAfter = _props.addonAfter,
                showHelp = _props.showHelp;

            var inputElement = this.renderInputElement();
            var help = showHelp === "tooltip" /* tooltip */ ? this.renderTooltipHelp() : null;
            if (!addonBefore && !addonAfter && !help) {
                return inputElement;
            }
            var classString = (0, _classnames2['default'])(prefixCls + '-group', (0, _defineProperty3['default'])({}, prefixCls + '-float-label-group', this.hasFloatLabel));
            return _react2['default'].createElement(
                'div',
                { key: 'wrapper', className: prefixCls + '-group-wrapper' },
                _react2['default'].createElement(
                    'div',
                    (0, _extends3['default'])({}, this.getWrapperProps(), { className: classString }),
                    this.wrapGroupItem(addonBefore, "before" /* before */),
                    this.wrapGroupItem(inputElement, "input" /* input */),
                    this.wrapGroupItem(help, "help" /* help */),
                    this.wrapGroupItem(addonAfter, "after" /* after */)
                )
            );
        }
    }, {
        key: 'renderTooltipHelp',
        value: function renderTooltipHelp() {
            return _react2['default'].createElement(
                _Tooltip2['default'],
                { title: this.getProp('help'), placement: 'bottom' },
                _react2['default'].createElement(_icon2['default'], { type: 'help' })
            );
        }
    }, {
        key: 'getPlaceholder',
        value: function getPlaceholder() {
            return this.props.placeholder;
        }
    }, {
        key: 'getLabel',
        value: function getLabel() {
            var placeholder = this.getPlaceholder();
            if (this.isEmpty() && placeholder) {
                return placeholder;
            }
            return this.getProp('label');
        }
    }, {
        key: 'wrapGroupItem',
        value: function wrapGroupItem(node, category) {
            var prefixCls = this.prefixCls;

            if (!node) {
                return null;
            }
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-group-' + category },
                node
            );
        }
    }, {
        key: 'renderMultipleEditor',
        value: function renderMultipleEditor(props) {
            var style = this.props.style;
            var text = this.text;

            var editorStyle = {};
            if (!this.editable) {
                editorStyle.position = 'absolute';
                editorStyle.left = 0;
                editorStyle.top = 0;
                editorStyle.zIndex = -1;
                props.readOnly = true;
            } else if (text) {
                editorStyle.width = (0, _UnitConvertor.pxToRem)((0, _measureTextWidth2['default'])(text, style));
            }
            return _react2['default'].createElement(
                'li',
                { key: 'text' },
                _react2['default'].createElement('input', (0, _extends3['default'])({}, props, { value: text || '', style: editorStyle }))
            );
        }
    }, {
        key: 'getWrappedEditor',
        value: function getWrappedEditor() {
            return this.getEditor();
        }
    }, {
        key: 'getEditor',
        value: function getEditor() {
            var prefixCls = this.prefixCls,
                style = this.props.style;

            var otherProps = this.getOtherProps();

            var _ref2 = style || {},
                height = _ref2.height;

            return this.multiple ? _react2['default'].createElement(
                'div',
                { key: 'text', className: otherProps.className },
                _react2['default'].createElement(
                    _animate2['default'],
                    { component: 'ul', componentProps: { style: height && height !== 'auto' ? { height: (0, _UnitConvertor.pxToRem)((0, _UnitConvertor.toPx)(height) - 2) } : void 0 }, transitionName: 'zoom', exclusive: true },
                    this.renderMultipleValues(),
                    this.renderMultipleEditor((0, _extends3['default'])({}, otherProps, { className: prefixCls + '-multiple-input' }))
                )
            ) : _react2['default'].createElement('input', (0, _extends3['default'])({ key: 'text' }, otherProps, { placeholder: this.hasFloatLabel ? void 0 : this.getPlaceholder(), value: this.getText(), readOnly: !this.editable }));
        }
    }, {
        key: 'getSuffix',
        value: function getSuffix() {
            var _props$suffix = this.props.suffix,
                suffix = _props$suffix === undefined ? this.getDefaultSuffix() : _props$suffix;

            if (suffix) {
                return this.wrapperSuffix(suffix);
            }
        }
    }, {
        key: 'getDefaultSuffix',
        value: function getDefaultSuffix() {
            return;
        }
    }, {
        key: 'wrapperSuffix',
        value: function wrapperSuffix(children, props) {
            var prefixCls = this.prefixCls;

            if ((0, _react.isValidElement)(children)) {
                var _children = children,
                    type = _children.type;
                var _children$props = children.props,
                    onClick = _children$props.onClick,
                    otherProps = (0, _objectWithoutProperties3['default'])(_children$props, ['onClick']);

                if (onClick) {
                    children = (0, _react.createElement)(type, otherProps);
                    props = (0, _extends3['default'])({
                        onClick: onClick
                    }, props);
                }
            }
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({ className: prefixCls + '-suffix', onMouseDown: _EventManager.preventDefault }, props),
                children
            );
        }
    }, {
        key: 'getPrefix',
        value: function getPrefix() {
            var prefix = this.props.prefix;

            if (prefix) {
                return this.wrapperPrefix(prefix);
            }
        }
    }, {
        key: 'wrapperPrefix',
        value: function wrapperPrefix(children) {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-prefix' },
                children
            );
        }
    }, {
        key: 'renderMultipleHolder',
        value: function renderMultipleHolder() {
            var name = this.name,
                multiple = this.multiple;

            if (multiple) {
                return _react2['default'].createElement('input', { key: 'value', className: this.prefixCls + '-multiple-value', value: this.toValueString(this.getValue()) || '', name: name, onChange: _noop2['default'] });
            }
        }
    }, {
        key: 'getOtherPrevNode',
        value: function getOtherPrevNode() {
            return;
        }
    }, {
        key: 'getOtherNextNode',
        value: function getOtherNextNode() {
            return;
        }
    }, {
        key: 'renderPlaceHolder',
        value: function renderPlaceHolder() {
            if ((this.multiple || !isPlaceHolderSupport()) && !this.hasFloatLabel) {
                return this.getPlaceHolderNode();
            }
        }
    }, {
        key: 'getPlaceHolderNode',
        value: function getPlaceHolderNode() {
            var prefixCls = this.prefixCls;

            var placeholder = this.getPlaceholder();
            if (placeholder) {
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-placeholder' },
                    placeholder
                );
            }
        }
    }, {
        key: 'getInnerSpanButton',
        value: function getInnerSpanButton() {
            var clearButton = this.props.clearButton,
                prefixCls = this.prefixCls;

            if (clearButton && !this.isReadOnly()) {
                return this.wrapperInnerSpanButton(_react2['default'].createElement(_icon2['default'], { type: 'close', onClick: this.handleClearButtonClick }), {
                    className: prefixCls + '-clear-button'
                });
            }
        }
    }, {
        key: 'wrapperInnerSpanButton',
        value: function wrapperInnerSpanButton(children) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var prefixCls = this.prefixCls;
            var className = props.className,
                otherProps = (0, _objectWithoutProperties3['default'])(props, ['className']);

            return !this.isDisabled() && _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({ key: 'inner-button' }, otherProps, { className: (0, _classnames2['default'])(prefixCls + '-inner-button', className) }),
                children
            );
        }
    }, {
        key: 'removeLastValue',
        value: function removeLastValue() {
            var values = this.getValues();
            var value = values.pop();
            this.setValue(values);
            this.afterRemoveValue(value, -1);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var _props2 = this.props,
                disabled = _props2.disabled,
                clearButton = _props2.clearButton;

            if (!this.isReadOnly() && !disabled) {
                if (this.multiple) {
                    if (!this.text) {
                        switch (e.keyCode) {
                            case _KeyCode2['default'].DELETE:
                                this.clear();
                                break;
                            case _KeyCode2['default'].BACKSPACE:
                                this.removeLastValue();
                                break;
                            default:
                        }
                    }
                } else if (clearButton && !this.editable) {
                    switch (e.keyCode) {
                        case _KeyCode2['default'].DELETE:
                        case _KeyCode2['default'].BACKSPACE:
                            this.clear();
                            break;
                        default:
                    }
                }
            }
            (0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(e) {
            if (e.target !== this.element) {
                e.preventDefault();
                if (!this.isFocused) {
                    this.focus();
                }
            }
        }
    }, {
        key: 'handleClearButtonClick',
        value: function handleClearButtonClick() {
            this.clear();
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(e) {
            var _this2 = this;

            (0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'handleFocus', this).call(this, e);
            (0, _defer2['default'])(function () {
                return _this2.isFocused && _this2.select();
            });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            if (!e.isDefaultPrevented()) {
                if (this.editable) {
                    this.syncValueOnBlur(e.target.value);
                } else if (!this.getValues().length) {
                    this.setValue(null);
                }
            }
            (0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'handleBlur', this).call(this, e);
        }
    }, {
        key: 'syncValueOnBlur',
        value: function syncValueOnBlur(value) {
            this.addValue(value);
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            (0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'setValue', this).call(this, value);
            this.setText(void 0);
        }
    }, {
        key: 'getText',
        value: function getText() {
            return this.text === void 0 ? (0, _get4['default'])(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'getText', this).call(this) : this.text;
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            this.text = text;
        }
    }, {
        key: 'select',
        value: function select() {
            var element = this.element;

            if (element && this.editable) {
                element.select();
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var target = e.target,
                value = e.target.value;

            var restricted = this.restrictInput(value);
            if (restricted !== value) {
                var selectionEnd = target.selectionEnd + restricted.length - value.length;
                target.value = restricted;
                target.setSelectionRange(selectionEnd, selectionEnd);
            }
            this.setText(restricted);
        }
    }, {
        key: 'restrictInput',
        value: function restrictInput(value) {
            var restrict = this.props.restrict;

            if (restrict) {
                return value.replace(new RegExp('[^' + restrict + ']+', 'g'), '');
            }
            return value;
        }
    }, {
        key: 'toValueString',
        value: function toValueString(value) {
            if ((0, _isArray2['default'])(value)) {
                return value.join(',');
            }
            return value;
        }
    }]);
    return TextField;
}(_FormField2.FormField);

TextField.displayName = 'TextField';
TextField.propTypes = (0, _extends3['default'])({
    /**
     * 占位词
     */
    placeholder: _propTypes2['default'].string,
    /**
     * 最小长度
     */
    minLength: _propTypes2['default'].number,
    /**
     * 最大长度
     */
    maxLength: _propTypes2['default'].number,
    /**
     * 正则校验
     */
    pattern: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
    /**
     * 自动完成
     */
    autoComplete: _propTypes2['default'].string,
    /**
     * 前缀
     */
    prefix: _propTypes2['default'].node,
    /**
     * 后缀
     */
    suffix: _propTypes2['default'].node,
    /**
     * 是否显示清除按钮
     */
    clearButton: _propTypes2['default'].bool,
    /**
     * 前置标签
     */
    addonBefore: _propTypes2['default'].node,
    /**
     * 后置标签
     */
    addonAfter: _propTypes2['default'].node,
    /**
     * 限制可输入的字符
     */
    restrict: _propTypes2['default'].string
}, _FormField2.FormField.propTypes);
TextField.defaultProps = (0, _extends3['default'])({}, _FormField2.FormField.defaultProps, {
    suffixCls: 'input',
    autoComplete: 'off',
    clearButton: false,
    multiple: false
});
tslib_1.__decorate([_mobx.observable], TextField.prototype, "text", void 0);
tslib_1.__decorate([_mobx.action], TextField.prototype, "removeLastValue", null);
tslib_1.__decorate([_autobind2['default']], TextField.prototype, "handleKeyDown", null);
tslib_1.__decorate([_autobind2['default']], TextField.prototype, "handleMouseDown", null);
tslib_1.__decorate([_autobind2['default']], TextField.prototype, "handleClearButtonClick", null);
tslib_1.__decorate([_autobind2['default']], TextField.prototype, "handleFocus", null);
tslib_1.__decorate([_autobind2['default']], TextField.prototype, "handleBlur", null);
tslib_1.__decorate([_mobx.action], TextField.prototype, "setValue", null);
tslib_1.__decorate([_mobx.action], TextField.prototype, "setText", null);
tslib_1.__decorate([_autobind2['default']], TextField.prototype, "handleChange", null);
var ObserverTextField = function (_TextField) {
    (0, _inherits3['default'])(ObserverTextField, _TextField);

    function ObserverTextField() {
        (0, _classCallCheck3['default'])(this, ObserverTextField);
        return (0, _possibleConstructorReturn3['default'])(this, (ObserverTextField.__proto__ || Object.getPrototypeOf(ObserverTextField)).apply(this, arguments));
    }

    return ObserverTextField;
}(TextField);
ObserverTextField.defaultProps = TextField.defaultProps;
ObserverTextField = tslib_1.__decorate([_mobxReact.observer], ObserverTextField);
exports['default'] = ObserverTextField;