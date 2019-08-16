'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _utils = require('./utils');

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _EventManager = require('../_util/EventManager');

var _mobx = require('mobx');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableEditor = function (_Component) {
    (0, _inherits3['default'])(TableEditor, _Component);

    function TableEditor() {
        (0, _classCallCheck3['default'])(this, TableEditor);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableEditor.__proto__ || Object.getPrototypeOf(TableEditor)).apply(this, arguments));

        _this.editing = false;
        _this.saveRef = function (node) {
            return _this.editor = node;
        };
        _this.handleEditorKeyEnterDown = function (e) {
            if (!e.isDefaultPrevented()) {
                _this.showNextEditor(e.shiftKey);
            }
        };
        _this.handleEditorKeyDown = function (e) {
            var tableStore = _this.context.tableStore;

            switch (e.keyCode) {
                case _KeyCode2['default'].ESC:
                    if (e.isDefaultPrevented()) {
                        break;
                    }
                case _KeyCode2['default'].TAB:
                    var _this$props = _this.props,
                        prefixCls = _this$props.prefixCls,
                        column = _this$props.column;

                    var cell = (0, _utils.findCell)(tableStore, prefixCls, (0, _utils.getColumnKey)(column));
                    if (cell) {
                        cell.focus();
                    }
                    _this.hideEditor();
                    break;
                case _KeyCode2['default'].PAGE_UP:
                case _KeyCode2['default'].PAGE_DOWN:
                    (0, _EventManager.stopEvent)(e);
                    break;
                default:
            }
            var editorProps = _this.editorProps;

            if (editorProps) {
                var _editorProps$onKeyDow = editorProps.onKeyDown,
                    onKeyDown = _editorProps$onKeyDow === undefined ? _noop2['default'] : _editorProps$onKeyDow;

                onKeyDown(e);
            }
        };
        _this.handleEditorFocus = function () {
            var currentEditorName = _this.currentEditorName,
                tableStore = _this.context.tableStore;

            if (!tableStore.currentEditorName && currentEditorName) {
                (0, _mobx.runInAction)(function () {
                    tableStore.currentEditorName = currentEditorName;
                });
            }
        };
        _this.handleEditorBlur = function (e) {
            _this.hideEditor();
            var editorProps = _this.editorProps;

            if (editorProps) {
                var _editorProps$onBlur = editorProps.onBlur,
                    onBlur = _editorProps$onBlur === undefined ? _noop2['default'] : _editorProps$onBlur;

                onBlur(e);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(TableEditor, [{
        key: 'hideEditor',
        value: function hideEditor() {
            if (this.editing) {
                this.context.tableStore.hideEditor();
            }
        }
    }, {
        key: 'showNextEditor',
        value: function showNextEditor(reserve) {
            if (this.editor) {
                this.editor.blur();
            }
            this.context.tableStore.showNextEditor(this.props.column.name, reserve);
        }
    }, {
        key: 'renderEditor',
        value: function renderEditor() {
            var column = this.props.column;
            var _context$tableStore = this.context.tableStore,
                dataSet = _context$tableStore.dataSet,
                currentEditRecord = _context$tableStore.currentEditRecord,
                rowHeight = _context$tableStore.rowHeight,
                pristine = _context$tableStore.pristine;

            var record = currentEditRecord || dataSet.current;
            var cellEditor = (0, _utils.getEditorByColumnAndRecord)(column, record);
            if (!pristine && (0, _react.isValidElement)(cellEditor) && !(0, _utils.isRadio)(cellEditor)) {
                this.editorProps = cellEditor.props;
                var _editorProps = this.editorProps,
                    _editorProps$style = _editorProps.style,
                    style = _editorProps$style === undefined ? {} : _editorProps$style,
                    otherProps = (0, _objectWithoutProperties3['default'])(_editorProps, ['style']);

                if (rowHeight !== 'auto') {
                    style.height = (0, _UnitConvertor.pxToRem)(rowHeight);
                }
                var newEditorProps = (0, _extends3['default'])({}, otherProps, {
                    style: style,
                    ref: this.saveRef,
                    record: record,
                    name: column.name,
                    onKeyDown: this.handleEditorKeyDown,
                    onEnterDown: this.handleEditorKeyEnterDown,
                    onBlur: this.handleEditorBlur,
                    tabIndex: -1,
                    showHelp: "none" /* none */
                });
                return (0, _react.cloneElement)(cellEditor, newEditorProps);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var editor = this.renderEditor();
            if (editor) {
                var _props = this.props,
                    prefixCls = _props.prefixCls,
                    column = _props.column,
                    _props$column = _props.column,
                    lock = _props$column.lock,
                    name = _props$column.name;

                var props = {
                    className: prefixCls + '-editor'
                };
                var editorProps = {};
                var tableStore = this.context.tableStore;

                if (tableStore.currentEditorName === name || tableStore.currentEditRecord) {
                    this.currentEditorName = name;
                    var cell = (0, _utils.findCell)(tableStore, prefixCls, (0, _utils.getColumnKey)(column), lock);
                    if (cell) {
                        this.editing = true;
                        var offsetLeft = cell.offsetLeft,
                            offsetTop = cell.offsetTop,
                            offsetWidth = cell.offsetWidth,
                            offsetHeight = cell.offsetHeight;

                        props.style = {
                            left: (0, _UnitConvertor.pxToRem)(offsetLeft),
                            top: (0, _UnitConvertor.pxToRem)(offsetTop)
                        };
                        editorProps.style = (0, _extends3['default'])({}, editor.props.style, {
                            width: (0, _UnitConvertor.pxToRem)(offsetWidth),
                            height: (0, _UnitConvertor.pxToRem)(offsetHeight)
                        });
                    }
                } else if (this.editing) {
                    this.editing = false;
                    editorProps.onFocus = this.handleEditorFocus;
                }
                return _react2['default'].createElement(
                    'div',
                    props,
                    (0, _react.cloneElement)(editor, editorProps)
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var name = this.props.column.name;
            var tableStore = this.context.tableStore;

            if (this.editor && this.editing && tableStore.currentEditorName === name) {
                this.editor.focus();
            }
        }
    }]);
    return TableEditor;
}(_react.Component);
TableEditor.displayName = 'TableEditor';
TableEditor.propTypes = {
    column: _propTypes2['default'].object.isRequired
};
TableEditor.contextType = _TableContext2['default'];
TableEditor = tslib_1.__decorate([_mobxReact.observer], TableEditor);
exports['default'] = TableEditor;
module.exports = exports['default'];