'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _field = require('../field');

var _field2 = _interopRequireDefault(_field);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
    (0, _inherits3['default'])(CodeArea, _FormField);

    function CodeArea() {
        (0, _classCallCheck3['default'])(this, CodeArea);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (CodeArea.__proto__ || Object.getPrototypeOf(CodeArea)).apply(this, arguments));

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

    (0, _createClass3['default'])(CodeArea, [{
        key: 'handleBeforeChange',
        value: function handleBeforeChange(_editor, _data, value) {
            this.setText(value);
        }
    }, {
        key: 'handleCodeMirrorKeyDown',
        value: function handleCodeMirrorKeyDown(cm, e) {
            var _props = this.props,
                _props$onKeyDown = _props.onKeyDown,
                onKeyDown = _props$onKeyDown === undefined ? _noop2['default'] : _props$onKeyDown,
                _props$onEnterDown = _props.onEnterDown,
                onEnterDown = _props$onEnterDown === undefined ? _noop2['default'] : _props$onEnterDown;

            switch (e.keyCode) {
                case _KeyCode2['default'].ENTER:
                    onEnterDown(e);
                    break;
                case _KeyCode2['default'].ESC:
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

            return (0, _extends3['default'])({}, defaultCodeMirrorOptions, options);
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get3['default'])(CodeArea.prototype.__proto__ || Object.getPrototypeOf(CodeArea.prototype), 'getOtherProps', this).call(this), ['onChange', 'formatHotKey', 'unFormatHotKey']);
            otherProps.onKeyDown = this.handleCodeMirrorKeyDown;
            return otherProps;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var options = nextProps.options;

            if (!(0, _isEqual2['default'])(options, this.props.options)) {
                this.cmOptions = this.getCodeMirrorOptions(options);
            }
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            if (CodeMirror) {
                this.cmOptions.readOnly = this.isDisabled() ? 'nocursor' : this.isReadOnly();
                return _react2['default'].createElement(
                    'div',
                    this.getWrapperProps(),
                    _react2['default'].createElement(
                        'label',
                        null,
                        _react2['default'].createElement(CodeMirror, (0, _extends3['default'])({}, this.getOtherProps(), { value: this.getText(), options: this.cmOptions, onBeforeChange: this.handleBeforeChange, onBlur: this.handleCodeMirrorBlur, editorDidMount: this.handleCodeMirrorDidMount })),
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
            return this.text === void 0 ? (0, _get3['default'])(CodeArea.prototype.__proto__ || Object.getPrototypeOf(CodeArea.prototype), 'getText', this).call(this) || '' : this.text;
        }
    }, {
        key: 'processValue',
        value: function processValue(value) {
            var formatter = this.props.formatter;

            value = (0, _get3['default'])(CodeArea.prototype.__proto__ || Object.getPrototypeOf(CodeArea.prototype), 'processValue', this).call(this, value);
            return formatter ? formatter.getFormatted(value) : value;
        }
    }]);
    return CodeArea;
}(_field2['default']);
CodeArea.displayName = 'CodeArea';
CodeArea.propTypes = (0, _extends3['default'])({
    options: _propTypes2['default'].object,
    formatHotKey: _propTypes2['default'].string,
    unFormatHotKey: _propTypes2['default'].string,
    formatter: _propTypes2['default'].object
}, _field2['default'].propTypes);
CodeArea.defaultProps = (0, _extends3['default'])({}, _field2['default'].defaultProps, {
    suffixCls: 'code-area',
    formatHotKey: 'Alt-F',
    unFormatHotKey: 'Alt-R'
});
tslib_1.__decorate([_mobx.observable], CodeArea.prototype, "text", void 0);
tslib_1.__decorate([_autobind2['default']], CodeArea.prototype, "handleBeforeChange", null);
tslib_1.__decorate([_autobind2['default']], CodeArea.prototype, "handleCodeMirrorKeyDown", null);
tslib_1.__decorate([_mobx.action], CodeArea.prototype, "setText", null);
CodeArea = tslib_1.__decorate([_mobxReact.observer], CodeArea);
exports['default'] = CodeArea;
module.exports = exports['default'];