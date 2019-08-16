import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { cloneElement, Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import noop from 'lodash/noop';
import TableContext from './TableContext';
import KeyCode from '../../../es/_util/KeyCode';
import { findCell, getColumnKey, getEditorByColumnAndRecord, isRadio } from './utils';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import { stopEvent } from '../_util/EventManager';
import { runInAction } from 'mobx';
var TableEditor = function (_Component) {
    _inherits(TableEditor, _Component);

    function TableEditor() {
        _classCallCheck(this, TableEditor);

        var _this = _possibleConstructorReturn(this, (TableEditor.__proto__ || Object.getPrototypeOf(TableEditor)).apply(this, arguments));

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
                case KeyCode.ESC:
                    if (e.isDefaultPrevented()) {
                        break;
                    }
                case KeyCode.TAB:
                    var _this$props = _this.props,
                        prefixCls = _this$props.prefixCls,
                        column = _this$props.column;

                    var cell = findCell(tableStore, prefixCls, getColumnKey(column));
                    if (cell) {
                        cell.focus();
                    }
                    _this.hideEditor();
                    break;
                case KeyCode.PAGE_UP:
                case KeyCode.PAGE_DOWN:
                    stopEvent(e);
                    break;
                default:
            }
            var editorProps = _this.editorProps;

            if (editorProps) {
                var _editorProps$onKeyDow = editorProps.onKeyDown,
                    onKeyDown = _editorProps$onKeyDow === undefined ? noop : _editorProps$onKeyDow;

                onKeyDown(e);
            }
        };
        _this.handleEditorFocus = function () {
            var currentEditorName = _this.currentEditorName,
                tableStore = _this.context.tableStore;

            if (!tableStore.currentEditorName && currentEditorName) {
                runInAction(function () {
                    tableStore.currentEditorName = currentEditorName;
                });
            }
        };
        _this.handleEditorBlur = function (e) {
            _this.hideEditor();
            var editorProps = _this.editorProps;

            if (editorProps) {
                var _editorProps$onBlur = editorProps.onBlur,
                    onBlur = _editorProps$onBlur === undefined ? noop : _editorProps$onBlur;

                onBlur(e);
            }
        };
        return _this;
    }

    _createClass(TableEditor, [{
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
            var cellEditor = getEditorByColumnAndRecord(column, record);
            if (!pristine && isValidElement(cellEditor) && !isRadio(cellEditor)) {
                this.editorProps = cellEditor.props;

                var _editorProps = this.editorProps,
                    _editorProps$style = _editorProps.style,
                    style = _editorProps$style === undefined ? {} : _editorProps$style,
                    otherProps = _objectWithoutProperties(_editorProps, ['style']);

                if (rowHeight !== 'auto') {
                    style.height = pxToRem(rowHeight);
                }
                var newEditorProps = _extends({}, otherProps, {
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
                return cloneElement(cellEditor, newEditorProps);
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
                    var cell = findCell(tableStore, prefixCls, getColumnKey(column), lock);
                    if (cell) {
                        this.editing = true;
                        var offsetLeft = cell.offsetLeft,
                            offsetTop = cell.offsetTop,
                            offsetWidth = cell.offsetWidth,
                            offsetHeight = cell.offsetHeight;

                        props.style = {
                            left: pxToRem(offsetLeft),
                            top: pxToRem(offsetTop)
                        };
                        editorProps.style = _extends({}, editor.props.style, {
                            width: pxToRem(offsetWidth),
                            height: pxToRem(offsetHeight)
                        });
                    }
                } else if (this.editing) {
                    this.editing = false;
                    editorProps.onFocus = this.handleEditorFocus;
                }
                return React.createElement(
                    'div',
                    props,
                    cloneElement(editor, editorProps)
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
}(Component);
TableEditor.displayName = 'TableEditor';
TableEditor.propTypes = {
    column: PropTypes.object.isRequired
};
TableEditor.contextType = TableContext;
TableEditor = tslib_1.__decorate([observer], TableEditor);
export default TableEditor;