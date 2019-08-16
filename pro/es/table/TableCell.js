import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { cloneElement, Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { computed, isArrayLike } from 'mobx';
import classNames from 'classnames';
import omit from 'lodash/omit';
import isString from 'lodash/isString';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import KeyCode from '../../../es/_util/KeyCode';
import measureScrollbar from '../../../es/_util/measureScrollbar';
import Record from '../data-set/Record';
import TableContext from './TableContext';
import { findCell, findFirstFocusableElement, getAlignByField, getColumnKey, getEditorByColumnAndRecord, isDisabledRow, isRadio } from './utils';
import { TableCommandType } from './enum';
import CheckBox from '../check-box/CheckBox';
import Output from '../output/Output';
import { default as Button } from '../button/Button';
import { $l } from '../locale-context';
import Tooltip from '../tooltip/Tooltip';
var inTab = false;
var TableCell = function (_Component) {
    _inherits(TableCell, _Component);

    function TableCell() {
        var _this2 = this;

        _classCallCheck(this, TableCell);

        var _this = _possibleConstructorReturn(this, (TableCell.__proto__ || Object.getPrototypeOf(TableCell)).apply(this, arguments));

        _this.handleEditorKeyDown = function (e) {
            switch (e.keyCode) {
                case KeyCode.TAB:
                    var _this$props = _this.props,
                        prefixCls = _this$props.prefixCls,
                        column = _this$props.column;

                    var cell = findCell(_this.context.tableStore, prefixCls, getColumnKey(column));
                    var node = findFirstFocusableElement(cell);
                    if (node) {
                        inTab = true;
                        node.focus();
                    }
                    break;
                default:
            }
        };
        _this.handleFocus = function (e) {
            var tableStore = _this.context.tableStore;
            var currentEditorName = tableStore.currentEditorName,
                dataSet = tableStore.dataSet,
                inlineEdit = tableStore.inlineEdit;
            var _this$props2 = _this.props,
                prefixCls = _this$props2.prefixCls,
                record = _this$props2.record,
                column = _this$props2.column,
                lock = _this$props2.column.lock;

            if (!currentEditorName && !isDisabledRow(record) && (!inlineEdit || record.editing)) {
                dataSet.current = record;
                _this.showEditor(e.currentTarget, lock);
                if (!_this.cellEditor || isRadio(_this.cellEditor)) {
                    var cell = findCell(tableStore, prefixCls, getColumnKey(column), lock);
                    var node = findFirstFocusableElement(cell);
                    if (node && !inTab) {
                        node.focus();
                    }
                }
            }
            inTab = false;
        };
        _this.handleCommandEdit = function () {
            var record = _this.props.record;
            var tableStore = _this.context.tableStore;

            if (tableStore.inlineEdit) {
                tableStore.currentEditRecord = record;
            }
        };
        _this.handleCommandDelete = function () {
            var record = _this.props.record;
            var tableStore = _this.context.tableStore;
            var dataSet = tableStore.dataSet;

            dataSet['delete'](record);
        };
        _this.handleCommandSave = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var tableStore, dataSet;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            tableStore = _this.context.tableStore;
                            dataSet = tableStore.dataSet;
                            _context.next = 4;
                            return dataSet.submit();

                        case 4:
                            _context.t0 = _context.sent;

                            if (!(_context.t0 !== false)) {
                                _context.next = 7;
                                break;
                            }

                            tableStore.currentEditRecord = void 0;

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        _this.handleCommandCancel = function () {
            var record = _this.props.record;
            var tableStore = _this.context.tableStore;

            if (record.status === "add" /* add */) {
                    var dataSet = tableStore.dataSet;

                    dataSet.remove(record);
                } else {
                record.reset();
                tableStore.currentEditRecord = void 0;
            }
        };
        _this.renderCommand = function () {
            var _this$props3 = _this.props,
                column = _this$props3.column,
                record = _this$props3.record;
            var command = column.command;

            if (record.editing) {
                return [React.createElement(
                    Tooltip,
                    { key: 'save', title: $l('Table', 'save_button') },
                    React.createElement(Button, { color: "blue" /* blue */, funcType: "flat" /* flat */, icon: 'finished', onClick: _this.handleCommandSave })
                ), React.createElement(
                    Tooltip,
                    { key: 'cancel', title: $l('Table', 'cancel_button') },
                    React.createElement(Button, { color: "blue" /* blue */, funcType: "flat" /* flat */, icon: 'cancle_a', onClick: _this.handleCommandCancel })
                )];
            }
            if (command) {
                var children = [];
                command.forEach(function (button) {
                    var props = {};
                    if (isArrayLike(button)) {
                        props = button[1];
                        button = button[0];
                    }
                    if (isString(button) && button in TableCommandType) {
                        var defaultButtonProps = _this.getButtonProps(button, record);
                        if (defaultButtonProps) {
                            var title = defaultButtonProps.title,
                                otherProps = _objectWithoutProperties(defaultButtonProps, ['title']);

                            children.push(React.createElement(
                                Tooltip,
                                { key: button, title: title },
                                React.createElement(Button, _extends({ color: "blue" /* blue */, funcType: "flat" /* flat */ }, otherProps, props))
                            ));
                        }
                    } else if (isValidElement(button)) {
                        children.push(button);
                    }
                });
                return children;
            }
        };
        _this.renderEditor = function () {
            var cellEditor = _this.cellEditor;

            if (isValidElement(cellEditor)) {
                var _this$context$tableSt = _this.context.tableStore,
                    dataSet = _this$context$tableSt.dataSet,
                    pristine = _this$context$tableSt.pristine;
                var _this$props4 = _this.props,
                    name = _this$props4.column.name,
                    record = _this$props4.record;
                var checkField = dataSet.props.checkField;

                var newEditorProps = _extends({}, cellEditor.props, {
                    record: record,
                    name: name,
                    pristine: pristine,
                    disabled: isDisabledRow(record),
                    indeterminate: checkField && checkField === name && record.isIndeterminate,
                    labelLayout: "none" /* none */
                });
                return cloneElement(cellEditor, newEditorProps);
            }
        };
        return _this;
    }

    _createClass(TableCell, [{
        key: 'getButtonProps',
        value: function getButtonProps(type, record) {
            var disabled = isDisabledRow(record);
            switch (type) {
                case TableCommandType.edit:
                    return { icon: 'mode_edit', onClick: this.handleCommandEdit, disabled: disabled, title: $l('Table', 'edit_button') };
                case TableCommandType['delete']:
                    return { icon: 'delete', onClick: this.handleCommandDelete, disabled: disabled, title: $l('Table', 'delete_button') };
                default:
            }
        }
    }, {
        key: 'getCheckBox',
        value: function getCheckBox() {
            var record = this.props.record;
            var dataSet = this.context.tableStore.dataSet;
            var checkField = dataSet.props.checkField;

            if (checkField) {
                return React.createElement(CheckBox, { name: checkField, record: record, disabled: isDisabledRow(record), indeterminate: record.isIndeterminate });
            }
        }
    }, {
        key: 'getCellRenderer',
        value: function getCellRenderer() {
            var column = this.props.column;
            var renderer = column.renderer,
                command = column.command;

            if (command) {
                return this.renderCommand;
            }
            if (this.cellEditorInCell) {
                return this.renderEditor;
            }
            return renderer;
        }
    }, {
        key: 'getInnerNode',
        value: function getInnerNode(prefixCls) {
            var _context$tableStore = this.context.tableStore,
                rowHeight = _context$tableStore.rowHeight,
                expandIconAsCell = _context$tableStore.expandIconAsCell,
                hasCheckFieldColumn = _context$tableStore.hasCheckFieldColumn,
                pristine = _context$tableStore.pristine,
                children = this.props.children;

            if (expandIconAsCell && children) {
                return children;
            }
            var _props = this.props,
                column = _props.column,
                record = _props.record,
                indentSize = _props.indentSize;
            var name = column.name;
            var hasEditor = this.hasEditor;

            var innerProps = {
                className: prefixCls + '-inner',
                tabIndex: hasEditor && !isDisabledRow(record) ? 0 : -1,
                onFocus: this.handleFocus,
                pristine: pristine
            };
            if (!hasEditor) {
                innerProps.onKeyDown = this.handleEditorKeyDown;
            }
            if (rowHeight !== 'auto') {
                innerProps.style = {
                    height: pxToRem(rowHeight)
                };
            }
            var indentText = children && React.createElement('span', { style: { paddingLeft: pxToRem(indentSize * record.level) } });
            var checkBox = children && !hasCheckFieldColumn && this.getCheckBox();
            var prefix = (indentText || children || checkBox) && React.createElement(
                'span',
                { key: 'prefix', className: prefixCls + '-prefix', style: innerProps.style },
                indentText,
                children,
                checkBox
            );
            return [prefix, React.createElement(Output, _extends({ key: 'output' }, innerProps, { record: record, renderer: this.getCellRenderer(), name: name, disabled: isDisabledRow(record), showHelp: "none" /* none */ }))];
        }
    }, {
        key: 'render',
        value: function render() {
            var _ref2;

            var _props2 = this.props,
                column = _props2.column,
                prefixCls = _props2.prefixCls,
                record = _props2.record;
            var _context$tableStore2 = this.context.tableStore,
                inlineEdit = _context$tableStore2.inlineEdit,
                pristine = _context$tableStore2.pristine;
            var className = column.className,
                style = column.style,
                align = column.align,
                name = column.name,
                onCell = column.onCell,
                command = column.command;

            var field = name ? record.getField(name) : void 0;
            var cellPrefix = prefixCls + '-cell';
            var cellExternalProps = typeof onCell === 'function' ? onCell({
                dataSet: record.dataSet,
                record: record,
                column: column
            }) : {};
            var cellStyle = _extends({
                textAlign: align || (command ? "center" /* center */ : getAlignByField(field))
            }, style, cellExternalProps.style);
            var classString = classNames(cellPrefix, field ? (_ref2 = {}, _defineProperty(_ref2, cellPrefix + '-dirty', !pristine && field.dirty), _defineProperty(_ref2, cellPrefix + '-required', !inlineEdit && field.required), _defineProperty(_ref2, cellPrefix + '-editable', !inlineEdit && this.hasEditor), _ref2) : void 0, className, cellExternalProps.className);
            return React.createElement(
                'td',
                _extends({}, cellExternalProps, { className: classString, style: omit(cellStyle, ['width', 'height']), 'data-index': getColumnKey(column) }),
                this.getInnerNode(cellPrefix)
            );
        }
    }, {
        key: 'showEditor',
        value: function showEditor(cell, lock) {
            var name = this.props.column.name;
            var cellEditor = this.cellEditor;

            if (name && cellEditor && !isRadio(cellEditor)) {
                if (!lock) {
                    var tableStore = this.context.tableStore;
                    var node = tableStore.node,
                        overflowX = tableStore.overflowX;

                    if (overflowX) {
                        var tableBodyWrap = cell.offsetParent;
                        if (tableBodyWrap) {
                            var leftLeafColumnsWidth = tableStore.leftLeafColumnsWidth,
                                rightLeafColumnsWidth = tableStore.rightLeafColumnsWidth;
                            var offsetLeft = cell.offsetLeft,
                                offsetWidth = cell.offsetWidth;
                            var scrollLeft = tableBodyWrap.scrollLeft;

                            var _tableBodyWrap$getBou = tableBodyWrap.getBoundingClientRect(),
                                width = _tableBodyWrap$getBou.width;

                            var leftSide = offsetLeft - leftLeafColumnsWidth;
                            var rightSide = offsetLeft + offsetWidth - width + rightLeafColumnsWidth + measureScrollbar();
                            var _scrollLeft = scrollLeft;
                            if (_scrollLeft < rightSide) {
                                _scrollLeft = rightSide;
                            }
                            if (_scrollLeft > leftSide) {
                                _scrollLeft = leftSide;
                            }
                            if (_scrollLeft !== scrollLeft) {
                                tableBodyWrap.scrollLeft = _scrollLeft;
                                node.handleBodyScrollLeft({
                                    target: tableBodyWrap,
                                    currentTarget: tableBodyWrap
                                });
                            }
                        }
                    }
                }
                this.context.tableStore.showEditor(name);
            }
        }
    }, {
        key: 'cellEditor',
        get: function get() {
            var _props3 = this.props,
                column = _props3.column,
                record = _props3.record;

            return getEditorByColumnAndRecord(column, record);
        }
    }, {
        key: 'cellEditorInCell',
        get: function get() {
            return isRadio(this.cellEditor);
        }
    }, {
        key: 'hasEditor',
        get: function get() {
            return !this.context.tableStore.pristine && this.cellEditor && !this.cellEditorInCell;
        }
    }]);

    return TableCell;
}(Component);
TableCell.displayName = 'TableCell';
TableCell.propTypes = {
    prefixCls: PropTypes.string,
    column: PropTypes.object.isRequired,
    record: PropTypes.instanceOf(Record).isRequired,
    indentSize: PropTypes.number.isRequired
};
TableCell.contextType = TableContext;
tslib_1.__decorate([computed], TableCell.prototype, "cellEditor", null);
tslib_1.__decorate([computed], TableCell.prototype, "cellEditorInCell", null);
tslib_1.__decorate([computed], TableCell.prototype, "hasEditor", null);
TableCell = tslib_1.__decorate([observer], TableCell);
export default TableCell;