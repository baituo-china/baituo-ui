'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var Input = function (_Component) {
    (0, _inherits3['default'])(Input, _Component);

    function Input() {
        (0, _classCallCheck3['default'])(this, Input);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));

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

    (0, _createClass3['default'])(Input, [{
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
            return (0, _configure.getPrefixCls)('input', this.props.prefixCls);
        }
    }, {
        key: 'getInputClassName',
        value: function getInputClassName() {
            var _classNames;

            var _props = this.props,
                size = _props.size,
                copy = _props.copy;

            var prefixCls = this.getPrefixCls();
            return (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === "small"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === "large"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-has-copy', copy), _classNames));
        }
    }, {
        key: 'renderCopyIcon',
        value: function renderCopyIcon() {
            var copy = this.props.copy;

            var prefixCls = this.getPrefixCls();
            return copy ? _react2['default'].createElement(
                'span',
                { className: prefixCls + '-icon', onClick: this.handleCopy },
                _react2['default'].createElement(_icon2['default'], { className: prefixCls + '-icon-copy', type: 'library_books' })
            ) : null;
        }
    }, {
        key: 'renderShowPassword',
        value: function renderShowPassword() {
            var type = this.props.type;

            var prefixCls = this.getPrefixCls();
            var showPassword = this.state.showPassword;

            return type === 'password' ? _react2['default'].createElement(
                'span',
                { className: prefixCls + '-icon', onClick: this.handleTogglePassword },
                _react2['default'].createElement(_icon2['default'], { className: prefixCls + '-icon-copy', type: showPassword ? 'visibility' : 'visibility_off' })
            ) : null;
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _props2 = this.props,
                value = _props2.value,
                className = _props2.className;
            // Fix https://fb.me/react-unknown-prop

            var otherProps = (0, _omit2['default'])(this.props, ['placeholder', 'prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'label', 'copy', 'style', 'focused', 'showLengthInfo', 'showPasswordEye', 'size']);
            if ('value' in this.props) {
                otherProps.value = fixControlledValue(value);
                // Input elements must be either controlled or uncontrolled,
                // specify either the value prop, or the defaultValue prop, but not both.
                delete otherProps.defaultValue;
            }
            otherProps.onInput = this.handleInput;
            return _react2['default'].createElement('input', (0, _extends3['default'])({}, otherProps, { className: (0, _classnames2['default'])(this.getInputClassName(), className), onKeyDown: this.handleKeyDown, ref: this.saveInput, onFocus: this.handleFocus, onBlur: this.handleBlur, type: this.state.type }));
        }
    }, {
        key: 'getLengthInfo',
        value: function getLengthInfo() {
            var _props3 = this.props,
                maxLength = _props3.maxLength,
                showLengthInfo = _props3.showLengthInfo;

            var prefixCls = this.getPrefixCls();
            var inputLength = this.state.inputLength;

            return maxLength && showLengthInfo || maxLength && maxLength > 0 && inputLength === maxLength ? _react2['default'].createElement(
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
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-label-wrapper' },
                    _react2['default'].createElement(
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
            return (0, _classnames2['default'])(prefixCls + '-' + name, (_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-' + name + '-sm', size === "small"), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-' + name + '-lg', size === "large"), _classNames2));
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
                return _react2['default'].createElement(
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

            var prefix = props.prefix ? _react2['default'].createElement(
                'span',
                { ref: 'prefix', className: this.getSizeClassName('prefix') },
                props.prefix
            ) : null;
            var suffix = props.suffix ? _react2['default'].createElement(
                'span',
                { ref: 'suffix', className: this.getSizeClassName('suffix') },
                props.suffix
            ) : null;
            var className = (0, _classnames2['default'])(prefixCls + '-wrapper', (_classNames3 = {}, (0, _defineProperty3['default'])(_classNames3, prefixCls + '-has-value', this.hasValue()), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-focused', focused), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-has-label', !!label), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-has-prefix', !!prefix), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-has-suffix', !!suffix), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-has-border', border), _classNames3));
            return _react2['default'].createElement(
                'span',
                { className: className, style: style },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-rendered-wrapper' },
                        prefix,
                        _react2['default'].createElement(
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
}(_react.Component);

exports['default'] = Input;

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
    type: _propTypes2['default'].string,
    id: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    label: _propTypes2['default'].node,
    size: _propTypes2['default'].oneOf(["small" /* small */, "default" /* default */, "large" /* large */]),
    maxLength: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    disabled: _propTypes2['default'].bool,
    value: _propTypes2['default'].any,
    defaultValue: _propTypes2['default'].any,
    className: _propTypes2['default'].string,
    addonBefore: _propTypes2['default'].node,
    addonAfter: _propTypes2['default'].node,
    prefixCls: _propTypes2['default'].string,
    autosize: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
    onPressEnter: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    onKeyUp: _propTypes2['default'].func,
    onFocus: _propTypes2['default'].func,
    onBlur: _propTypes2['default'].func,
    prefix: _propTypes2['default'].node,
    suffix: _propTypes2['default'].node,
    copy: _propTypes2['default'].bool,
    onCopy: _propTypes2['default'].func,
    readOnly: _propTypes2['default'].bool,
    focused: _propTypes2['default'].bool,
    showLengthInfo: _propTypes2['default'].bool,
    showPasswordEye: _propTypes2['default'].bool
};
module.exports = exports['default'];