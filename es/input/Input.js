import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import Icon from '../icon';
import { getPrefixCls as _getPrefixCls } from '../configure';
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input() {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));

        _this.state = {
            inputLength: 0,
            focused: false,
            renderedStyle: {
                width: '100%',
                margin: 0
            },
            showPassword: false,
            type: 'text'
        };
        _this.handleKeyDown = function (e) {
            var _this$props = _this.props,
                onPressEnter = _this$props.onPressEnter,
                onKeyDown = _this$props.onKeyDown;

            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        _this.handleFocus = function (e) {
            var _this$props2 = _this.props,
                onFocus = _this$props2.onFocus,
                readOnly = _this$props2.readOnly;

            if (!readOnly) {
                _this.setState({
                    focused: true
                });
            }
            if (onFocus) {
                onFocus(e);
            }
        };
        _this.handleInput = function (e) {
            var onInput = _this.props.onInput;

            _this.setState({
                inputLength: _this.input.value.length
            });
            if (onInput) {
                onInput(e);
            }
        };
        _this.handleBlur = function (e) {
            var _this$props3 = _this.props,
                onBlur = _this$props3.onBlur,
                readOnly = _this$props3.readOnly;

            if (!readOnly) {
                _this.setState({
                    focused: false
                });
            }
            if (onBlur) {
                onBlur(e);
            }
        };
        _this.handleCopy = function () {
            var onCopy = _this.props.onCopy;

            _this.input.select();
            document.execCommand('Copy');
            if (onCopy) {
                onCopy(_this.input.value);
            }
        };
        _this.handleTogglePassword = function () {
            if (_this.state.type === 'password') {
                _this.handleShowPassword();
            } else {
                _this.handleHidePassword();
            }
        };
        _this.handleShowPassword = function () {
            _this.setState({
                type: 'text',
                showPassword: true
            });
        };
        _this.handleHidePassword = function () {
            _this.setState({
                type: 'password',
                showPassword: false
            });
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        return _this;
    }

    _createClass(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var inputLength = this.state.inputLength;
            var focused = this.props.focused;

            var inputValueLength = this.input.value.length;
            if (inputValueLength !== inputLength) {
                this.setState({
                    inputLength: inputValueLength
                });
            }
            if (this.props.autoFocus) {
                this.setState({
                    focused: true
                });
            }
            if (typeof focused === 'boolean') {
                this.setState({
                    focused: focused
                });
            }
            this.setState({
                type: this.props.type
            });
            this.setRenderedStyle();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.input.value !== nextProps.value) {
                var inputLength = nextProps.value && nextProps.value.length;
                this.setState({
                    inputLength: inputLength || 0
                });
            }
            if (nextProps.autoFocus) {
                this.setState({
                    focused: true
                });
            }
            if (typeof nextProps.focused === 'boolean') {
                this.setState({
                    focused: nextProps.focused
                });
            }
            this.setState({
                type: nextProps.type
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var inputLength = this.state.inputLength;

            var inputValueLength = this.input.value.length;
            if (inputValueLength !== inputLength) {
                this.setState({
                    inputLength: inputValueLength
                });
            }
            this.setRenderedStyle();
        }
    }, {
        key: 'setRenderedStyle',
        value: function setRenderedStyle() {
            var suffix = this.refs.suffix;
            var prefix = this.refs.prefix;
            var rendered = this.refs.rendered;
            var suffixWidth = void 0;
            var prefixWidth = void 0;
            var margin = '0';
            var width = '100%';
            if (suffix && prefix) {
                suffixWidth = (suffix.clientWidth || -2) + 2 + 'px';
                prefixWidth = (prefix.clientWidth || -2) + 2 + 'px';
                margin = '0 ' + suffixWidth + ' 0 ' + prefixWidth;
                width = 'calc(100% - ' + suffixWidth + ' - ' + prefixWidth + ')';
            } else if (suffix) {
                suffixWidth = (suffix.clientWidth || -2) + 2 + 'px';
                margin = '0 ' + suffixWidth + ' 0 0';
                width = 'calc(100% - ' + suffixWidth + ')';
            } else if (prefix) {
                prefixWidth = (prefix.clientWidth || -2) + 2 + 'px';
                margin = '0 0 0 ' + prefixWidth;
                width = 'calc(100% - ' + prefixWidth + ')';
            }
            rendered.style.margin = margin;
            rendered.style.width = width;
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return _getPrefixCls('input', this.props.prefixCls);
        }
    }, {
        key: 'getInputClassName',
        value: function getInputClassName() {
            var _classNames;

            var _props = this.props,
                size = _props.size,
                copy = _props.copy;

            var prefixCls = this.getPrefixCls();
            return classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-sm', size === "small"), _defineProperty(_classNames, prefixCls + '-lg', size === "large"), _defineProperty(_classNames, prefixCls + '-has-copy', copy), _classNames));
        }
    }, {
        key: 'renderCopyIcon',
        value: function renderCopyIcon() {
            var copy = this.props.copy;

            var prefixCls = this.getPrefixCls();
            return copy ? React.createElement(
                'span',
                { className: prefixCls + '-icon', onClick: this.handleCopy },
                React.createElement(Icon, { className: prefixCls + '-icon-copy', type: 'library_books' })
            ) : null;
        }
    }, {
        key: 'renderShowPassword',
        value: function renderShowPassword() {
            var type = this.props.type;

            var prefixCls = this.getPrefixCls();
            var showPassword = this.state.showPassword;

            return type === 'password' ? React.createElement(
                'span',
                { className: prefixCls + '-icon', onClick: this.handleTogglePassword },
                React.createElement(Icon, { className: prefixCls + '-icon-copy', type: showPassword ? 'visibility' : 'visibility_off' })
            ) : null;
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _props2 = this.props,
                value = _props2.value,
                className = _props2.className;
            // Fix https://fb.me/react-unknown-prop

            var otherProps = omit(this.props, ['placeholder', 'prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'label', 'copy', 'style', 'focused', 'showLengthInfo', 'showPasswordEye', 'size']);
            if ('value' in this.props) {
                otherProps.value = fixControlledValue(value);
                // Input elements must be either controlled or uncontrolled,
                // specify either the value prop, or the defaultValue prop, but not both.
                delete otherProps.defaultValue;
            }
            otherProps.onInput = this.handleInput;
            return React.createElement('input', _extends({}, otherProps, { className: classNames(this.getInputClassName(), className), onKeyDown: this.handleKeyDown, ref: this.saveInput, onFocus: this.handleFocus, onBlur: this.handleBlur, type: this.state.type }));
        }
    }, {
        key: 'getLengthInfo',
        value: function getLengthInfo() {
            var _props3 = this.props,
                maxLength = _props3.maxLength,
                showLengthInfo = _props3.showLengthInfo;

            var prefixCls = this.getPrefixCls();
            var inputLength = this.state.inputLength;

            return maxLength && showLengthInfo || maxLength && maxLength > 0 && inputLength === maxLength ? React.createElement(
                'div',
                { className: prefixCls + '-length-info' },
                inputLength + '/' + maxLength
            ) : null;
        }
    }, {
        key: 'getLabel',
        value: function getLabel() {
            var _props4 = this.props,
                placeholder = _props4.placeholder,
                label = _props4.label;

            if (!this.hasValue() && placeholder) {
                return placeholder;
            }
            return label;
        }
    }, {
        key: 'renderFloatLabel',
        value: function renderFloatLabel() {
            var label = this.getLabel();
            var border = this.props.border;

            if (label && border) {
                var prefixCls = this.getPrefixCls();
                return React.createElement(
                    'div',
                    { className: prefixCls + '-label-wrapper' },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-label' },
                        label
                    )
                );
            }
        }
    }, {
        key: 'getSizeClassName',
        value: function getSizeClassName(name) {
            var _classNames2;

            var size = this.props.size;

            var prefixCls = this.getPrefixCls();
            return classNames(prefixCls + '-' + name, (_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-' + name + '-sm', size === "small"), _defineProperty(_classNames2, prefixCls + '-' + name + '-lg', size === "large"), _classNames2));
        }
    }, {
        key: 'hasValue',
        value: function hasValue() {
            return this.state.inputLength !== 0;
        }
    }, {
        key: 'renderPlaceholder',
        value: function renderPlaceholder() {
            var _props5 = this.props,
                placeholder = _props5.placeholder,
                border = _props5.border;

            if (!border && placeholder) {
                var prefixCls = this.getPrefixCls();
                return React.createElement(
                    'div',
                    { className: prefixCls + '-placeholder' },
                    placeholder
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames3;

            var props = this.props;
            var _props6 = this.props,
                disabled = _props6.disabled,
                label = _props6.label,
                style = _props6.style,
                showPasswordEye = _props6.showPasswordEye,
                border = _props6.border;

            var prefixCls = this.getPrefixCls();
            var focused = this.state.focused;

            var prefix = props.prefix ? React.createElement(
                'span',
                { ref: 'prefix', className: this.getSizeClassName('prefix') },
                props.prefix
            ) : null;
            var suffix = props.suffix ? React.createElement(
                'span',
                { ref: 'suffix', className: this.getSizeClassName('suffix') },
                props.suffix
            ) : null;
            var className = classNames(prefixCls + '-wrapper', (_classNames3 = {}, _defineProperty(_classNames3, prefixCls + '-has-value', this.hasValue()), _defineProperty(_classNames3, prefixCls + '-focused', focused), _defineProperty(_classNames3, prefixCls + '-disabled', disabled), _defineProperty(_classNames3, prefixCls + '-has-label', !!label), _defineProperty(_classNames3, prefixCls + '-has-prefix', !!prefix), _defineProperty(_classNames3, prefixCls + '-has-suffix', !!suffix), _defineProperty(_classNames3, prefixCls + '-has-border', border), _classNames3));
            return React.createElement(
                'span',
                { className: className, style: style },
                React.createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-rendered-wrapper' },
                        prefix,
                        React.createElement(
                            'div',
                            { className: this.getSizeClassName('rendered'), ref: 'rendered' },
                            this.renderPlaceholder(),
                            this.renderInput(),
                            this.renderFloatLabel(),
                            this.renderCopyIcon(),
                            showPasswordEye ? this.renderShowPassword() : null
                        ),
                        suffix
                    ),
                    this.getLengthInfo()
                )
            );
        }
    }]);

    return Input;
}(Component);

export default Input;

Input.displayName = 'Input';
Input.defaultProps = {
    type: 'text',
    disabled: false,
    readOnly: false,
    showLengthInfo: true,
    showPasswordEye: false,
    border: true
};
Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    size: PropTypes.oneOf(["small" /* small */, "default" /* default */, "large" /* large */]),
    maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    copy: PropTypes.bool,
    onCopy: PropTypes.func,
    readOnly: PropTypes.bool,
    focused: PropTypes.bool,
    showLengthInfo: PropTypes.bool,
    showPasswordEye: PropTypes.bool
};