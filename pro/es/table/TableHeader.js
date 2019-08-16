import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import TableHeaderCell from './TableHeaderCell';
import TableContext from './TableContext';
import { computed, get } from 'mobx';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import { getColumnKey } from './utils';
var TableHeader = function (_Component) {
    _inherits(TableHeader, _Component);

    function TableHeader() {
        _classCallCheck(this, TableHeader);

        var _this = _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));

        _this.saveRef = function (node) {
            return _this.node = node;
        };
        _this.getHeaderNode = function () {
            return _this.node;
        };
        return _this;
    }

    _createClass(TableHeader, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                lock = _props.lock,
                dataSet = _props.dataSet;
            var groupedColumns = this.groupedColumns;

            var rows = this.getTableHeaderRows(groupedColumns);
            var trs = rows.map(function (row, rowIndex) {
                if (row.length) {
                    var prevColumn = void 0;
                    var tds = row.map(function (_ref) {
                        var hidden = _ref.hidden,
                            column = _ref.column,
                            rowSpan = _ref.rowSpan,
                            colSpan = _ref.colSpan,
                            lastLeaf = _ref.lastLeaf;

                        if (!hidden) {
                            var props = {
                                key: getColumnKey(column),
                                prefixCls: prefixCls,
                                dataSet: dataSet,
                                prevColumn: prevColumn,
                                column: column,
                                resizeColumn: lastLeaf,
                                getHeaderNode: _this2.getHeaderNode
                            };
                            if (rowSpan > 1) {
                                props.rowSpan = rowSpan;
                            }
                            if (colSpan > 1) {
                                props.colSpan = colSpan;
                            }
                            prevColumn = lastLeaf;
                            return React.createElement(TableHeaderCell, props);
                        }
                    });
                    if (_this2.context.tableStore.overflowY && lock !== "left" /* left */ && rowIndex === 0) {
                        tds.push(React.createElement('th', { key: 'fixed-column', className: prefixCls + '-cell', rowSpan: rows.length }));
                    }
                    return React.createElement(
                        'tr',
                        { key: rowIndex, style: { height: lock ? _this2.getHeaderRowStyle(rows, rowIndex) : void 0 } },
                        tds
                    );
                }
            });
            var classString = classNames(prefixCls + '-thead', _defineProperty({}, prefixCls + '-column-resizable', this.context.tableStore.columnResizable));
            return React.createElement(
                'thead',
                { ref: this.saveRef, className: classString },
                trs
            );
        }
    }, {
        key: 'getTableHeaderRows',
        value: function getTableHeaderRows(columns) {
            var _this3 = this;

            var currentRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            rows[currentRow] = rows[currentRow] || [];
            columns.forEach(function (column) {
                var hidden = column.hidden,
                    rowSpan = column.rowSpan,
                    colSpan = column.colSpan,
                    children = column.children;

                if (!hidden) {
                    if (rowSpan && rows.length < rowSpan) {
                        while (rows.length < rowSpan) {
                            rows.push([]);
                        }
                    }
                    if (children) {
                        _this3.getTableHeaderRows(children.columns, currentRow + rowSpan, rows);
                    }
                    if (colSpan !== 0) {
                        rows[currentRow].push(column);
                    }
                }
            });
            return rows;
        }
    }, {
        key: 'getHeaderRowStyle',
        value: function getHeaderRowStyle(rows, rowIndex) {
            var _this4 = this;

            var rowHeight = this.context.tableStore.rowHeight;

            var height = rowHeight === 'auto' ? this.getRowHeight(rowIndex++) : rowHeight;
            return pxToRem(rows.slice(rowIndex).reduce(function (total, r, index) {
                return r.length ? total : total + 1 + (rowHeight === 'auto' ? _this4.getRowHeight(index + rowIndex) : rowHeight);
            }, height));
        }
    }, {
        key: 'getRowHeight',
        value: function getRowHeight(index) {
            return get(this.context.tableStore.lockColumnsHeadRowsHeight, index) || 0;
        }
    }, {
        key: 'groupedColumns',
        get: function get() {
            var tableStore = this.context.tableStore;
            var lock = this.props.lock;

            switch (lock) {
                case "left" /* left */:
                case true:
                    return tableStore.leftGroupedColumns;
                case "right" /* right */:
                    return tableStore.rightGroupedColumns;
                default:
                    return tableStore.groupedColumns;
            }
        }
    }]);

    return TableHeader;
}(Component);
TableHeader.displayName = 'TableHeader';
TableHeader.propTypes = {
    prefixCls: PropTypes.string,
    lock: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["right" /* right */, "left" /* left */])])
};
TableHeader.contextType = TableContext;
tslib_1.__decorate([computed], TableHeader.prototype, "groupedColumns", null);
TableHeader = tslib_1.__decorate([observer], TableHeader);
export default TableHeader;