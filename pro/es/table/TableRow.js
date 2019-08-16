import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { cloneElement, Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, computed, get, remove, set } from 'mobx';
import classNames from 'classnames';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import measureScrollbar from '../../../es/_util/measureScrollbar';
import TableCell from './TableCell';
import Record from '../data-set/Record';
import TableContext from './TableContext';
import ExpandIcon from './ExpandIcon';
import { getColumnKey, isDisabledRow } from './utils';
import { EXPAND_KEY } from './TableStore';
var TableRow = function (_Component) {
    _inherits(TableRow, _Component);

    function TableRow() {
        _classCallCheck(this, TableRow);

        var _this = _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).apply(this, arguments));

        _this.rowExternalProps = {};
        _this.childrenRendered = false;
        _this.saveRef = action(function (node) {
            if (node) {
                _this.node = node;
                var _this$props = _this.props,
                    lock = _this$props.lock,
                    record = _this$props.record;
                var _this$context$tableSt = _this.context.tableStore,
                    rowHeight = _this$context$tableSt.rowHeight,
                    lockColumnsBodyRowsHeight = _this$context$tableSt.lockColumnsBodyRowsHeight;

                if (rowHeight === 'auto' && !lock) {
                    set(lockColumnsBodyRowsHeight, _this.rowKey = record.key, node.offsetHeight);
                }
            }
        });
        _this.handleMouseEnter = function () {
            _this.isHover = true;
        };
        _this.handleMouseLeave = function () {
            _this.isHover = false;
        };
        _this.handleSelectionByClick = function () {
            _this.handleSelection();
            _this.handleClick();
        };
        _this.handleSelectionByDblClick = function () {
            _this.handleSelection();
            var onDoubleClick = _this.rowExternalProps.onDoubleClick;

            if (typeof onDoubleClick === 'function') {
                onDoubleClick();
            }
        };
        _this.handleExpandChange = function () {
            if (_this.expandable) {
                _this.isExpanded = !_this.isExpanded;
            }
        };
        _this.handleClick = function () {
            var _this$props2 = _this.props,
                record = _this$props2.record,
                dataSet = _this$props2.record.dataSet;

            if (dataSet && !isDisabledRow(record)) {
                dataSet.current = record;
            }
            var onClick = _this.rowExternalProps.onClick;

            if (typeof onClick === 'function') {
                onClick();
            }
        };
        _this.getCell = function (column, index) {
            var hidden = column.hidden;

            if (!hidden) {
                var _this$props3 = _this.props,
                    prefixCls = _this$props3.prefixCls,
                    record = _this$props3.record,
                    indentSize = _this$props3.indentSize;

                return React.createElement(
                    TableCell,
                    { key: getColumnKey(column), prefixCls: prefixCls, column: column, record: record, indentSize: indentSize },
                    _this.hasExpandIcon(index) && _this.renderExpandIcon()
                );
            }
        };
        return _this;
    }

    _createClass(TableRow, [{
        key: 'focusRow',
        value: function focusRow(row) {
            if (row) {
                var _context$tableStore = this.context.tableStore,
                    node = _context$tableStore.node,
                    overflowY = _context$tableStore.overflowY,
                    currentEditorName = _context$tableStore.currentEditorName;
                var _props = this.props,
                    lock = _props.lock,
                    record = _props.record;

                if (!lock && !currentEditorName) {
                    var element = node.element;

                    if (element && element.contains(document.activeElement) && Array.from(element.querySelectorAll('tr[data-index="' + record.id + '"]')).every(function (tr) {
                        return !tr.contains(document.activeElement);
                    })) {
                        row.focus();
                    }
                }
                if (overflowY) {
                    var offsetParent = row.offsetParent;

                    if (offsetParent) {
                        var tableBodyWrap = offsetParent.parentNode;
                        if (tableBodyWrap) {
                            var offsetTop = row.offsetTop,
                                offsetHeight = row.offsetHeight;
                            var scrollTop = tableBodyWrap.scrollTop,
                                height = tableBodyWrap.offsetHeight;

                            var bottomSide = offsetTop + offsetHeight - height + measureScrollbar();
                            var _scrollTop = scrollTop;
                            if (_scrollTop < bottomSide) {
                                _scrollTop = bottomSide;
                            }
                            if (_scrollTop > offsetTop) {
                                _scrollTop = offsetTop + 1;
                            }
                            if (_scrollTop !== scrollTop) {
                                tableBodyWrap.scrollTop = _scrollTop;
                                node.handleBodyScrollTop({
                                    target: tableBodyWrap,
                                    currentTarget: tableBodyWrap
                                });
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.record.isCurrent) {
                this.focusRow(this.node);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.record.isCurrent) {
                this.focusRow(this.node);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var record = this.props.record;
            var tableStore = this.context.tableStore;

            tableStore.setRowExpanded(record, false);
            remove(tableStore.lockColumnsBodyRowsHeight, this.rowKey);
        }
    }, {
        key: 'handleSelection',
        value: function handleSelection() {
            var record = this.props.record;
            var dataSet = record.dataSet;

            if (dataSet) {
                dataSet.select(record);
            }
        }
    }, {
        key: 'hasExpandIcon',
        value: function hasExpandIcon(columnIndex) {
            var tableStore = this.context.tableStore;
            var _tableStore$props = tableStore.props,
                expandRowByClick = _tableStore$props.expandRowByClick,
                expandedRowRenderer = _tableStore$props.expandedRowRenderer,
                expandIconColumnIndex = tableStore.expandIconColumnIndex,
                isTree = tableStore.isTree;

            return !expandRowByClick && (expandedRowRenderer || isTree) && columnIndex === expandIconColumnIndex;
        }
    }, {
        key: 'renderExpandIcon',
        value: function renderExpandIcon() {
            var prefixCls = this.props.prefixCls;

            return React.createElement(ExpandIcon, { prefixCls: prefixCls, expandable: this.expandable, onChange: this.handleExpandChange, expanded: this.isExpanded });
        }
    }, {
        key: 'renderExpandRow',
        value: function renderExpandRow() {
            var isExpanded = this.isExpanded,
                _props2 = this.props,
                children = _props2.children,
                columns = _props2.columns,
                record = _props2.record,
                prefixCls = _props2.prefixCls,
                index = _props2.index;
            var tableStore = this.context.tableStore;
            var _tableStore$props2 = tableStore.props,
                expandedRowRenderer = _tableStore$props2.expandedRowRenderer,
                onRow = _tableStore$props2.onRow,
                expandIconAsCell = tableStore.expandIconAsCell,
                overflowX = tableStore.overflowX;

            var expandRows = [];
            if (isExpanded || this.childrenRendered) {
                this.childrenRendered = true;
                if (expandedRowRenderer) {
                    var rowExternalProps = typeof onRow === 'function' ? onRow({
                        dataSet: record.dataSet,
                        record: record,
                        expandedRow: true,
                        index: index
                    }) : {};
                    var classString = classNames(prefixCls + '-expanded-row', rowExternalProps.className);
                    var rowProps = {
                        key: record.key + '-expanded-row',
                        className: classString,
                        style: _extends({}, rowExternalProps.style)
                    };
                    if (overflowX || !record.isCurrent) {
                        rowProps.onMouseEnter = this.handleMouseEnter;
                        rowProps.onMouseLeave = this.handleMouseLeave;
                    }
                    if (!isExpanded) {
                        rowProps.style.display = 'none';
                    }
                    expandRows.push(React.createElement(
                        'tr',
                        _extends({}, rowExternalProps, rowProps),
                        expandIconAsCell && React.createElement('td', { key: EXPAND_KEY }),
                        React.createElement(
                            'td',
                            { key: EXPAND_KEY + '-rest', className: prefixCls + '-cell', colSpan: columns.length - (expandIconAsCell ? 1 : 0) },
                            React.createElement(
                                'div',
                                { className: prefixCls + '-cell-inner' },
                                expandedRowRenderer({ dataSet: record.dataSet, record: record })
                            )
                        )
                    ));
                }
                if (isValidElement(children)) {
                    expandRows.push(cloneElement(children, { isExpanded: isExpanded, key: record.key + '-expanded-rows' }));
                }
            }
            return expandRows;
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props3 = this.props,
                prefixCls = _props3.prefixCls,
                columns = _props3.columns,
                record = _props3.record,
                lock = _props3.lock,
                hidden = _props3.hidden,
                index = _props3.index;
            var _context$tableStore2 = this.context.tableStore,
                rowHeight = _context$tableStore2.rowHeight,
                lockColumnsBodyRowsHeight = _context$tableStore2.lockColumnsBodyRowsHeight,
                overflowX = _context$tableStore2.overflowX,
                highLightRow = _context$tableStore2.highLightRow,
                _context$tableStore2$ = _context$tableStore2.props,
                onRow = _context$tableStore2$.onRow,
                rowRenderer = _context$tableStore2$.rowRenderer,
                selectionMode = _context$tableStore2$.selectionMode;
            var dataSet = record.dataSet,
                isCurrent = record.isCurrent,
                key = record.key,
                id = record.id;

            var rowExternalProps = this.rowExternalProps = _extends({}, typeof rowRenderer === 'function' ? rowRenderer(record, index) : {}, typeof onRow === 'function' ? onRow({
                dataSet: dataSet,
                record: record,
                expandedRow: false,
                index: index
            }) : {});
            var rowPrefixCls = prefixCls + '-row';
            var classString = classNames(rowPrefixCls, (_classNames = {}, _defineProperty(_classNames, rowPrefixCls + '-current', highLightRow && isCurrent), _defineProperty(_classNames, rowPrefixCls + '-hover', highLightRow && !isCurrent && this.isHover), _defineProperty(_classNames, rowPrefixCls + '-highlight', highLightRow), _defineProperty(_classNames, rowPrefixCls + '-disabled', isDisabledRow(record)), _classNames), rowExternalProps.className);
            var rowProps = {
                ref: this.saveRef,
                className: classString,
                style: _extends({}, rowExternalProps.style),
                onClick: this.handleClick,
                tabIndex: -1,
                'data-index': id
            };
            if (overflowX) {
                rowProps.onMouseEnter = this.handleMouseEnter;
                rowProps.onMouseLeave = this.handleMouseLeave;
            }
            if (hidden) {
                rowProps.style.display = 'none';
            }
            if (lock) {
                if (rowHeight === 'auto') {
                    rowProps.style.height = pxToRem(get(lockColumnsBodyRowsHeight, key));
                }
            }
            if (selectionMode === "click" /* click */) {
                    rowProps.onClick = this.handleSelectionByClick;
                } else if (selectionMode === "dblclick" /* dblclick */) {
                    rowProps.onDoubleClick = this.handleSelectionByDblClick;
                }
            return [React.createElement(
                'tr',
                _extends({ key: key }, rowExternalProps, rowProps),
                columns.map(this.getCell)
            )].concat(_toConsumableArray(this.renderExpandRow()));
        }
    }, {
        key: 'expandable',
        get: function get() {
            var record = this.props.record;
            var _context$tableStore3 = this.context.tableStore,
                isTree = _context$tableStore3.isTree,
                expandedRowRenderer = _context$tableStore3.props.expandedRowRenderer;

            return !!expandedRowRenderer || isTree && !!record.children;
        }
    }, {
        key: 'isExpanded',
        get: function get() {
            return this.context.tableStore.isRowExpanded(this.props.record);
        },
        set: function set(expanded) {
            this.context.tableStore.setRowExpanded(this.props.record, expanded);
        }
    }, {
        key: 'isHover',
        get: function get() {
            return this.context.tableStore.isRowHover(this.props.record);
        },
        set: function set(hover) {
            var tableStore = this.context.tableStore;

            if (tableStore.highLightRow) {
                tableStore.setRowHover(this.props.record, hover);
            }
        }
    }]);

    return TableRow;
}(Component);
TableRow.displayName = 'TableRow';
TableRow.propTypes = {
    prefixCls: PropTypes.string,
    lock: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["right" /* right */, "left" /* left */])]),
    columns: PropTypes.array.isRequired,
    record: PropTypes.instanceOf(Record).isRequired,
    indentSize: PropTypes.number.isRequired
};
TableRow.contextType = TableContext;
tslib_1.__decorate([computed], TableRow.prototype, "expandable", null);
tslib_1.__decorate([computed], TableRow.prototype, "isExpanded", null);
tslib_1.__decorate([computed], TableRow.prototype, "isHover", null);
tslib_1.__decorate([action], TableRow.prototype, "componentWillUnmount", null);
TableRow = tslib_1.__decorate([observer], TableRow);
export default TableRow;