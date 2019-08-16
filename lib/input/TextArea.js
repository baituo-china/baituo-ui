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

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _calculateNodeHeight = require('./calculateNodeHeight');

var _calculateNodeHeight2 = _interopRequireDefault(_calculateNodeHeight);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}
function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

var TextArea = function (_Component) {
    (0, _inherits3['default'])(TextArea, _Component);

    function TextArea() {
        (0, _classCallCheck3['default'])(this, TextArea);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));

        _this.state = {
            textareaStyles: {},
            inputLength: 0,
            focused: false
        };
        _this.resizeTextarea = function () {
            var autosize = _this.props.autosize;

            if (!autosize || !_this.textAreaRef) {
                return;
            }
            var minRows = autosize ? autosize.minRows : null;
            var maxRows = autosize ? autosize.maxRows : null;
            var textareaStyles = (0, _calculateNodeHeight2['default'])(_this.textAreaRef, false, minRows, maxRows);
            _this.setState({ textareaStyles: textareaStyles });
        };
        _this.handleTextareaChange = function (e) {
            if (!('value' in _this.props)) {
                _this.resizeTextarea();
            }
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange(e);
            }
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
        _this.handleInput = function () {
            _this.setState({
                inputLength: _this.textAreaRef.value.length
            });
        };
        _this.saveTextAreaRef = function (textArea) {
            _this.textAreaRef = textArea;
        };
        _this.handleFocus = function (e) {
            var onFocus = _this.props.onFocus;

            _this.setState({
                focused: true
            });
            if (onFocus) {
                onFocus(e);
            }
        };
        _this.handleBlur = function (e) {
            var onBlur = _this.props.onBlur;

            _this.setState({
                focused: false
            });
            if (onBlur) {
                onBlur(e);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(TextArea, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.resizeTextarea();
            if (this.textAreaRef.value) {
                this.setState({
                    inputLength: this.textAreaRef.value.length
                });
            }
            if (this.props.autoFocus) {
                this.setState({
                    focused: true
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // Re-render with the new content then recalculate the height as required.
            if (this.textAreaRef.value !== nextProps.value) {
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
            if (this.props.value !== nextProps.value) {
                if (this.nextFrameActionId) {
                    clearNextFrameAction(this.nextFrameActionId);
                }
                this.nextFrameActionId = onNextFrame(this.resizeTextarea);
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.textAreaRef.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.textAreaRef.blur();
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('input', this.props.prefixCls);
        }
    }, {
        key: 'getTextAreaClassName',
        value: function getTextAreaClassName() {
            var className = this.props.className;

            var prefixCls = this.getPrefixCls();
            return (0, _classnames2['default'])(prefixCls, prefixCls + '-textarea-element', className);
        }
    }, {
        key: 'getWrapperClassName',
        value: function getWrapperClassName() {
            var _classNames;

            var _props = this.props,
                disabled = _props.disabled,
                label = _props.label,
                border = _props.border;

            var prefixCls = this.getPrefixCls();
            return (0, _classnames2['default'])(prefixCls + '-wrapper', prefixCls + '-textarea', (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-has-value', this.state.inputLength !== 0), (0, _defineProperty3['default'])(_classNames, prefixCls + '-focused', this.state.focused), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_classNames, prefixCls + '-has-label', !!label), (0, _defineProperty3['default'])(_classNames, prefixCls + '-has-border', border), _classNames));
        }
    }, {
        key: 'getLengthInfo',
        value: function getLengthInfo() {
            var _props2 = this.props,
                maxLength = _props2.maxLength,
                showLengthInfo = _props2.showLengthInfo;

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
            var _props3 = this.props,
                placeholder = _props3.placeholder,
                label = _props3.label;
            var inputLength = this.state.inputLength;

            if (inputLength === 0 && placeholder) {
                return placeholder;
            }
            return label;
        }
    }, {
        key: 'renderFloatLabel',
        value: function renderFloatLabel() {
            var label = this.getLabel();
            if (label) {
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
        key: 'render',
        value: function render() {
            var props = this.props;
            var prefixCls = this.getPrefixCls();
            var otherProps = (0, _omit2['default'])(props, ['prefixCls', 'onPressEnter', 'autosize', 'placeholder', 'focused', 'showLengthInfo']);
            var style = (0, _extends3['default'])({}, props.style, this.state.textareaStyles);
            // Make sure it could be reset when using form.getFieldDecorator
            if ('value' in otherProps) {
                otherProps.value = otherProps.value || '';
            }
            otherProps.onInput = this.handleInput;
            return _react2['default'].createElement(
                'span',
                { className: this.getWrapperClassName() },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-rendered-wrapper' },
                    _react2['default'].createElement('textarea', (0, _extends3['default'])({}, otherProps, { className: this.getTextAreaClassName(), style: style, onKeyDown: this.handleKeyDown, onChange: this.handleTextareaChange, ref: this.saveTextAreaRef, onInput: this.handleInput, onBlur: this.handleBlur, onFocus: this.handleFocus })),
                    this.renderFloatLabel()
                ),
                this.getLengthInfo()
            );
        }
    }]);
    return TextArea;
}(_react.Component);

exports['default'] = TextArea;

TextArea.displayName = 'TextArea';
TextArea.defaultProps = {
    showLengthInfo: true,
    border: true
};
module.exports = exports['default'];