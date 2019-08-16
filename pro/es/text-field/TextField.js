import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { createElement, isValidElement } from 'react';
import omit from 'lodash/omit';
import defer from 'lodash/defer';
import isArray from 'lodash/isArray';
import noop from 'lodash/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import KeyCode from '../../../es/_util/KeyCode';
import { pxToRem, toPx } from '../../../es/_util/UnitConvertor';
import { FormField } from '../field/FormField';
import autobind from '../_util/autobind';
import _isEmpty from '../_util/isEmpty';
import Icon from '../icon';
import { preventDefault } from '../_util/EventManager';
import measureTextWidth from '../_util/measureTextWidth';
import Animate from '../animate';
import Tooltip from '../tooltip/Tooltip';
var PLACEHOLDER_SUPPORT = void 0;
export function isPlaceHolderSupport() {
    if (PLACEHOLDER_SUPPORT !== void 0) {
        return PLACEHOLDER_SUPPORT;
    } else if (typeof window !== 'undefined') {
        return PLACEHOLDER_SUPPORT = 'placeholder' in document.createElement('input');
    } else {
        return true;
    }
}
export var TextField = function (_FormField) {
    _inherits(TextField, _FormField);

    function TextField() {
        _classCallCheck(this, TextField);

        var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).apply(this, arguments));

        _this.type = 'text';
        return _this;
    }

    _createClass(TextField, [{
        key: 'isEmpty',
        value: function isEmpty() {
            return _isEmpty(this.text) && _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'isEmpty', this).call(this);
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'getOtherProps', this).call(this), ['prefix', 'suffix', 'clearButton', 'addonBefore', 'addonAfter', 'restrict', 'placeholder', 'placeHolder']);
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
            return _extends({}, _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'getValidatorProps', this).call(this), {
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

            return (_get2 = _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'getWrapperClassNames', this)).call.apply(_get2, [this, (_ref = {}, _defineProperty(_ref, prefixCls + '-empty', this.isEmpty()), _defineProperty(_ref, prefixCls + '-suffix-button', isValidElement(suffix)), _defineProperty(_ref, prefixCls + '-multiple', this.multiple), _defineProperty(_ref, prefixCls + '-prefix-button', isValidElement(prefix)), _ref)].concat(args));
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
            return React.createElement(
                'span',
                _extends({ key: 'element' }, this.getWrapperProps()),
                multipleHolder,
                otherPrevNode,
                placeholderDiv,
                React.createElement(
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
            var classString = classNames(prefixCls + '-group', _defineProperty({}, prefixCls + '-float-label-group', this.hasFloatLabel));
            return React.createElement(
                'div',
                { key: 'wrapper', className: prefixCls + '-group-wrapper' },
                React.createElement(
                    'div',
                    _extends({}, this.getWrapperProps(), { className: classString }),
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
            return React.createElement(
                Tooltip,
                { title: this.getProp('help'), placement: 'bottom' },
                React.createElement(Icon, { type: 'help' })
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
            return React.createElement(
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
                editorStyle.width = pxToRem(measureTextWidth(text, style));
            }
            return React.createElement(
                'li',
                { key: 'text' },
                React.createElement('input', _extends({}, props, { value: text || '', style: editorStyle }))
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

            return this.multiple ? React.createElement(
                'div',
                { key: 'text', className: otherProps.className },
                React.createElement(
                    Animate,
                    { component: 'ul', componentProps: { style: height && height !== 'auto' ? { height: pxToRem(toPx(height) - 2) } : void 0 }, transitionName: 'zoom', exclusive: true },
                    this.renderMultipleValues(),
                    this.renderMultipleEditor(_extends({}, otherProps, { className: prefixCls + '-multiple-input' }))
                )
            ) : React.createElement('input', _extends({ key: 'text' }, otherProps, { placeholder: this.hasFloatLabel ? void 0 : this.getPlaceholder(), value: this.getText(), readOnly: !this.editable }));
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

            if (isValidElement(children)) {
                var _children = children,
                    type = _children.type;

                var _children$props = children.props,
                    onClick = _children$props.onClick,
                    otherProps = _objectWithoutProperties(_children$props, ['onClick']);

                if (onClick) {
                    children = createElement(type, otherProps);
                    props = _extends({
                        onClick: onClick
                    }, props);
                }
            }
            return React.createElement(
                'div',
                _extends({ className: prefixCls + '-suffix', onMouseDown: preventDefault }, props),
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

            return React.createElement(
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
                return React.createElement('input', { key: 'value', className: this.prefixCls + '-multiple-value', value: this.toValueString(this.getValue()) || '', name: name, onChange: noop });
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
                return React.createElement(
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
                return this.wrapperInnerSpanButton(React.createElement(Icon, { type: 'close', onClick: this.handleClearButtonClick }), {
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
                otherProps = _objectWithoutProperties(props, ['className']);

            return !this.isDisabled() && React.createElement(
                'div',
                _extends({ key: 'inner-button' }, otherProps, { className: classNames(prefixCls + '-inner-button', className) }),
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
                            case KeyCode.DELETE:
                                this.clear();
                                break;
                            case KeyCode.BACKSPACE:
                                this.removeLastValue();
                                break;
                            default:
                        }
                    }
                } else if (clearButton && !this.editable) {
                    switch (e.keyCode) {
                        case KeyCode.DELETE:
                        case KeyCode.BACKSPACE:
                            this.clear();
                            break;
                        default:
                    }
                }
            }
            _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'handleKeyDown', this).call(this, e);
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

            _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'handleFocus', this).call(this, e);
            defer(function () {
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
            _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'handleBlur', this).call(this, e);
        }
    }, {
        key: 'syncValueOnBlur',
        value: function syncValueOnBlur(value) {
            this.addValue(value);
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'setValue', this).call(this, value);
            this.setText(void 0);
        }
    }, {
        key: 'getText',
        value: function getText() {
            return this.text === void 0 ? _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), 'getText', this).call(this) : this.text;
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
            if (isArray(value)) {
                return value.join(',');
            }
            return value;
        }
    }]);

    return TextField;
}(FormField);
TextField.displayName = 'TextField';
TextField.propTypes = _extends({
    /**
     * 占位词
     */
    placeholder: PropTypes.string,
    /**
     * 最小长度
     */
    minLength: PropTypes.number,
    /**
     * 最大长度
     */
    maxLength: PropTypes.number,
    /**
     * 正则校验
     */
    pattern: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * 自动完成
     */
    autoComplete: PropTypes.string,
    /**
     * 前缀
     */
    prefix: PropTypes.node,
    /**
     * 后缀
     */
    suffix: PropTypes.node,
    /**
     * 是否显示清除按钮
     */
    clearButton: PropTypes.bool,
    /**
     * 前置标签
     */
    addonBefore: PropTypes.node,
    /**
     * 后置标签
     */
    addonAfter: PropTypes.node,
    /**
     * 限制可输入的字符
     */
    restrict: PropTypes.string
}, FormField.propTypes);
TextField.defaultProps = _extends({}, FormField.defaultProps, {
    suffixCls: 'input',
    autoComplete: 'off',
    clearButton: false,
    multiple: false
});
tslib_1.__decorate([observable], TextField.prototype, "text", void 0);
tslib_1.__decorate([action], TextField.prototype, "removeLastValue", null);
tslib_1.__decorate([autobind], TextField.prototype, "handleKeyDown", null);
tslib_1.__decorate([autobind], TextField.prototype, "handleMouseDown", null);
tslib_1.__decorate([autobind], TextField.prototype, "handleClearButtonClick", null);
tslib_1.__decorate([autobind], TextField.prototype, "handleFocus", null);
tslib_1.__decorate([autobind], TextField.prototype, "handleBlur", null);
tslib_1.__decorate([action], TextField.prototype, "setValue", null);
tslib_1.__decorate([action], TextField.prototype, "setText", null);
tslib_1.__decorate([autobind], TextField.prototype, "handleChange", null);
var ObserverTextField = function (_TextField) {
    _inherits(ObserverTextField, _TextField);

    function ObserverTextField() {
        _classCallCheck(this, ObserverTextField);

        return _possibleConstructorReturn(this, (ObserverTextField.__proto__ || Object.getPrototypeOf(ObserverTextField)).apply(this, arguments));
    }

    return ObserverTextField;
}(TextField);
ObserverTextField.defaultProps = TextField.defaultProps;
ObserverTextField = tslib_1.__decorate([observer], ObserverTextField);
export default ObserverTextField;