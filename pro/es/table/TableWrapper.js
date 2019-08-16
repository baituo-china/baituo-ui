import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, computed, get, set } from 'mobx';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import measureScrollbar from '../../../es/_util/measureScrollbar';
import TableContext from './TableContext';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import { minColumnWidth } from './Column';
import TableEditor from './TableEditor';
import TableCol from './TableCol';
import { getColumnKey } from './utils';
var TableWrapper = function (_Component) {
    _inherits(TableWrapper, _Component);

    function TableWrapper() {
        _classCallCheck(this, TableWrapper);

        var _this = _possibleConstructorReturn(this, (TableWrapper.__proto__ || Object.getPrototypeOf(TableWrapper)).apply(this, arguments));

        _this.handleResizeEnd = function () {
            if (_this.context.tableStore.rowHeight === 'auto') {
                _this.syncFixedTableRowHeight();
            }
        };
        _this.saveRef = function (node) {
            _this.tableWrapper = node;
        };
        return _this;
    }

    _createClass(TableWrapper, [{
        key: 'getCol',
        value: function getCol(column, width) {
            if (!column.hidden) {
                var prefixCls = this.props.prefixCls;

                return React.createElement(TableCol, { key: getColumnKey(column), prefixCls: prefixCls, width: width, minWidth: minColumnWidth(column), onResizeEnd: this.handleResizeEnd });
            }
        }
    }, {
        key: 'getColGroup',
        value: function getColGroup() {
            var _this2 = this;

            var _props = this.props,
                lock = _props.lock,
                hasHeader = _props.hasHeader,
                hasFooter = _props.hasFooter;
            var _context$tableStore = this.context.tableStore,
                overflowY = _context$tableStore.overflowY,
                overflowX = _context$tableStore.overflowX;

            var hasEmptyWidth = false;
            var cols = this.leafColumns.map(function (column, index, array) {
                var width = get(column, 'width');
                if (!overflowX) {
                    if (!hasEmptyWidth && index === array.length - 1) {
                        width = void 0;
                    } else if (isNil(width)) {
                        hasEmptyWidth = true;
                    }
                }
                return _this2.getCol(column, width);
            });
            if (overflowY && lock !== "left" /* left */ && (hasHeader || hasFooter)) {
                cols.push(React.createElement('col', { key: 'fixed-column', style: { width: pxToRem(measureScrollbar()) } }));
            }
            return React.createElement(
                'colgroup',
                null,
                cols
            );
        }
    }, {
        key: 'getEditors',
        value: function getEditors() {
            var prefixCls = this.props.prefixCls;

            return this.leafEditorColumns.map(function (column) {
                return React.createElement(TableEditor, { key: column.name, prefixCls: prefixCls, column: column });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                lock = _props2.lock,
                hasBody = _props2.hasBody,
                prefixCls = _props2.prefixCls;
            var _context$tableStore2 = this.context.tableStore,
                overflowY = _context$tableStore2.overflowY,
                height = _context$tableStore2.height;

            var editors = hasBody && this.getEditors();
            var className = classNames(_defineProperty({}, prefixCls + '-last-row-bordered', hasBody && !overflowY && height !== void 0));
            var table = React.createElement(
                'table',
                { key: 'table', ref: lock ? void 0 : this.saveRef, className: className, style: { width: this.tableWidth } },
                this.getColGroup(),
                children
            );
            return [editors, table];
        }
    }, {
        key: 'syncFixedTableRowHeight',
        value: function syncFixedTableRowHeight() {
            var _props3 = this.props,
                prefixCls = _props3.prefixCls,
                hasFooter = _props3.hasFooter,
                hasBody = _props3.hasBody,
                hasHeader = _props3.hasHeader;

            if (this.tableWrapper) {
                var _context$tableStore3 = this.context.tableStore,
                    lockColumnsHeadRowsHeight = _context$tableStore3.lockColumnsHeadRowsHeight,
                    lockColumnsBodyRowsHeight = _context$tableStore3.lockColumnsBodyRowsHeight,
                    lockColumnsFootRowsHeight = _context$tableStore3.lockColumnsFootRowsHeight;

                if (hasHeader) {
                    var headRows = Array.from(this.tableWrapper.querySelectorAll('thead tr'));
                    headRows.forEach(function (row, index) {
                        return set(lockColumnsHeadRowsHeight, index, row.offsetHeight);
                    });
                }
                if (hasBody) {
                    var bodyRows = Array.from(this.tableWrapper.querySelectorAll('.' + prefixCls + '-row'));
                    bodyRows.forEach(function (row) {
                        return set(lockColumnsBodyRowsHeight, row.dataset.index, row.offsetHeight);
                    });
                }
                if (hasFooter) {
                    var footRows = Array.from(this.tableWrapper.querySelectorAll('tfoot tr'));
                    footRows.forEach(function (row, index) {
                        return set(lockColumnsFootRowsHeight, index, row.offsetHeight);
                    });
                }
            }
        }
    }, {
        key: 'leafColumnsWidth',
        get: function get() {
            var tableStore = this.context.tableStore;
            var lock = this.props.lock;

            switch (lock) {
                case "left" /* left */:
                case true:
                    return tableStore.leftLeafColumnsWidth;
                case "right" /* right */:
                    return tableStore.rightLeafColumnsWidth;
                default:
                    if (tableStore.overflowX) {
                        return tableStore.totalLeafColumnsWidth;
                    }
            }
        }
    }, {
        key: 'leafEditorColumns',
        get: function get() {
            var tableStore = this.context.tableStore;
            var lock = this.props.lock;

            switch (lock) {
                case "left" /* left */:
                case true:
                    return tableStore.leftLeafColumns.filter(function (column) {
                        return column.editor && column.name;
                    });
                case "right" /* right */:
                    return tableStore.rightLeafColumns.filter(function (column) {
                        return column.editor && column.name;
                    });
                default:
                    return tableStore.leafColumns.filter(function (column) {
                        return column.editor && column.name && !column.lock;
                    });
            }
        }
    }, {
        key: 'leafColumns',
        get: function get() {
            var tableStore = this.context.tableStore;
            var lock = this.props.lock;

            switch (lock) {
                case "left" /* left */:
                case true:
                    return tableStore.leftLeafColumns;
                case "right" /* right */:
                    return tableStore.rightLeafColumns;
                default:
                    return tableStore.leafColumns;
            }
        }
    }, {
        key: 'tableWidth',
        get: function get() {
            var _props4 = this.props,
                lock = _props4.lock,
                hasBody = _props4.hasBody;
            var _context$tableStore4 = this.context.tableStore,
                overflowY = _context$tableStore4.overflowY,
                overflowX = _context$tableStore4.overflowX;

            if (overflowX) {
                var tableWidth = this.leafColumnsWidth;
                if (tableWidth !== void 0 && overflowY && lock !== "left" /* left */ && !hasBody) {
                    tableWidth += measureScrollbar();
                }
                return pxToRem(tableWidth);
            } else {
                return '100%';
            }
        }
    }]);

    return TableWrapper;
}(Component);
TableWrapper.contextType = TableContext;
TableWrapper.propTypes = {
    lock: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["right" /* right */, "left" /* left */])]),
    hasBody: PropTypes.bool,
    hasHeader: PropTypes.bool,
    hasFooter: PropTypes.bool
};
tslib_1.__decorate([computed], TableWrapper.prototype, "leafColumnsWidth", null);
tslib_1.__decorate([computed], TableWrapper.prototype, "leafEditorColumns", null);
tslib_1.__decorate([computed], TableWrapper.prototype, "leafColumns", null);
tslib_1.__decorate([computed], TableWrapper.prototype, "tableWidth", null);
tslib_1.__decorate([action], TableWrapper.prototype, "syncFixedTableRowHeight", null);
TableWrapper = tslib_1.__decorate([observer], TableWrapper);
export default TableWrapper;