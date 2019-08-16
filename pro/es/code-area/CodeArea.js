import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import noop from 'lodash/noop';
import KeyCode from '../../../es/_util/KeyCode';
import FormField from '../field';
import autobind from '../_util/autobind';
var CodeMirror = void 0;
if (typeof window !== 'undefined') {
    CodeMirror = require('react-codemirror2').Controlled;
}
var defaultCodeMirrorOptions = {
    theme: 'neat',
    lineNumbers: true,
    lint: true,
    gutters: ['CodeMirror-lint-markers']
};
var CodeArea = function (_FormField) {
    _inherits(CodeArea, _FormField);

    function CodeArea() {
        _classCallCheck(this, CodeArea);

        var _this = _possibleConstructorReturn(this, (CodeArea.__proto__ || Object.getPrototypeOf(CodeArea)).apply(this, arguments));

        _this.cmOptions = _this.getCodeMirrorOptions();
        _this.emptyValue = '';
        /**
         * 编辑器失去焦点时，调用父类方法，同步DataSet中的内容
         *
         * @memberof CodeArea
         */
        _this.handleCodeMirrorBlur = function (codeMirrorInstance) {
            var formatter = _this.props.formatter;
            // 更新DataSet的值之前，先去拿到原始的raw格式

            var codeMirrorText = codeMirrorInstance.getValue();
            _this.setValue(formatter ? formatter.getRaw(codeMirrorText) : codeMirrorText);
        };
        /**
         * 在CodeMirror编辑器实例挂载前添加额外配置
         *
         * @memberof CodeArea
         */
        _this.handleCodeMirrorDidMount = function (editor) {
            var _this$props = _this.props,
                formatter = _this$props.formatter,
                style = _this$props.style,
                formatHotKey = _this$props.formatHotKey,
                unFormatHotKey = _this$props.unFormatHotKey;

            var _ref = style || {},
                _ref$width = _ref.width,
                width = _ref$width === undefined ? '100%' : _ref$width,
                _ref$height = _ref.height,
                height = _ref$height === undefined ? 100 : _ref$height;

            var options = {
                Tab: function Tab(cm) {
                    if (cm.somethingSelected()) {
                        cm.indentSelection('add'); // 有选中内容时整体缩进
                    } else {
                        // 使用空格代替缩进
                        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
                        cm.replaceSelection(spaces);
                    }
                }
            };
            if (formatter) {
                if (formatHotKey) {
                    // default: 'Alt-F'
                    options[formatHotKey] = function (cm) {
                        return cm.setValue(formatter.getFormatted(cm.getValue()));
                    };
                }
                if (unFormatHotKey) {
                    // default: 'Alt-R'
                    options[unFormatHotKey] = function (cm) {
                        return cm.setValue(formatter.getRaw(cm.getValue()));
                    };
                }
            }
            editor.setSize(width, height); // default size: ('100%', 100)
            editor.setOption('extraKeys', options);
        };
        return _this;
    }

    _createClass(CodeArea, [{
        key: 'handleBeforeChange',
        value: function handleBeforeChange(_editor, _data, value) {
            this.setText(value);
        }
    }, {
        key: 'handleCodeMirrorKeyDown',
        value: function handleCodeMirrorKeyDown(cm, e) {
            var _props = this.props,
                _props$onKeyDown = _props.onKeyDown,
                onKeyDown = _props$onKeyDown === undefined ? noop : _props$onKeyDown,
                _props$onEnterDown = _props.onEnterDown,
                onEnterDown = _props$onEnterDown === undefined ? noop : _props$onEnterDown;

            switch (e.keyCode) {
                case KeyCode.ENTER:
                    onEnterDown(e);
                    break;
                case KeyCode.ESC:
                    cm.getInputField().blur();
                    break;
                default:
            }
            onKeyDown(e);
        }
    }, {
        key: 'getCodeMirrorOptions',
        value: function getCodeMirrorOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.options;

            return _extends({}, defaultCodeMirrorOptions, options);
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(CodeArea.prototype.__proto__ || Object.getPrototypeOf(CodeArea.prototype), 'getOtherProps', this).call(this), ['onChange', 'formatHotKey', 'unFormatHotKey']);
            otherProps.onKeyDown = this.handleCodeMirrorKeyDown;
            return otherProps;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var options = nextProps.options;

            if (!isEqual(options, this.props.options)) {
                this.cmOptions = this.getCodeMirrorOptions(options);
            }
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            if (CodeMirror) {
                this.cmOptions.readOnly = this.isDisabled() ? 'nocursor' : this.isReadOnly();
                return React.createElement(
                    'div',
                    this.getWrapperProps(),
                    React.createElement(
                        'label',
                        null,
                        React.createElement(CodeMirror, _extends({}, this.getOtherProps(), { value: this.getText(), options: this.cmOptions, onBeforeChange: this.handleBeforeChange, onBlur: this.handleCodeMirrorBlur, editorDidMount: this.handleCodeMirrorDidMount })),
                        this.renderFloatLabel()
                    )
                );
            }
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            this.text = text;
        }
    }, {
        key: 'getText',
        value: function getText() {
            return this.text === void 0 ? _get(CodeArea.prototype.__proto__ || Object.getPrototypeOf(CodeArea.prototype), 'getText', this).call(this) || '' : this.text;
        }
    }, {
        key: 'processValue',
        value: function processValue(value) {
            var formatter = this.props.formatter;

            value = _get(CodeArea.prototype.__proto__ || Object.getPrototypeOf(CodeArea.prototype), 'processValue', this).call(this, value);
            return formatter ? formatter.getFormatted(value) : value;
        }
    }]);

    return CodeArea;
}(FormField);
CodeArea.displayName = 'CodeArea';
CodeArea.propTypes = _extends({
    options: PropTypes.object,
    formatHotKey: PropTypes.string,
    unFormatHotKey: PropTypes.string,
    formatter: PropTypes.object
}, FormField.propTypes);
CodeArea.defaultProps = _extends({}, FormField.defaultProps, {
    suffixCls: 'code-area',
    formatHotKey: 'Alt-F',
    unFormatHotKey: 'Alt-R'
});
tslib_1.__decorate([observable], CodeArea.prototype, "text", void 0);
tslib_1.__decorate([autobind], CodeArea.prototype, "handleBeforeChange", null);
tslib_1.__decorate([autobind], CodeArea.prototype, "handleCodeMirrorKeyDown", null);
tslib_1.__decorate([action], CodeArea.prototype, "setText", null);
CodeArea = tslib_1.__decorate([observer], CodeArea);
export default CodeArea;