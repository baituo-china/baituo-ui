import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { computed, get } from 'mobx';
import TableContext from './TableContext';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import TableFooterCell from './TableFooterCell';
import { getColumnKey } from './utils';
var TableFooter = function (_Component) {
    _inherits(TableFooter, _Component);

    function TableFooter() {
        _classCallCheck(this, TableFooter);

        return _possibleConstructorReturn(this, (TableFooter.__proto__ || Object.getPrototypeOf(TableFooter)).apply(this, arguments));
    }

    _createClass(TableFooter, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                lock = _props.lock,
                dataSet = _props.dataSet;
            var _context$tableStore = this.context.tableStore,
                lockColumnsFootRowsHeight = _context$tableStore.lockColumnsFootRowsHeight,
                overflowY = _context$tableStore.overflowY,
                rowHeight = _context$tableStore.rowHeight;

            var tds = this.leafColumns.map(function (column) {
                var hidden = column.hidden;

                if (!hidden) {
                    return React.createElement(TableFooterCell, { key: getColumnKey(column), prefixCls: prefixCls, dataSet: dataSet, column: column });
                }
            });
            if (overflowY && lock !== "left" /* left */) {
                    tds.push(React.createElement('th', { key: 'fixed-column', className: prefixCls + '-cell' }));
                }
            return React.createElement(
                'tfoot',
                { className: prefixCls + '-tfoot' },
                React.createElement(
                    'tr',
                    { style: { height: lock && rowHeight === 'auto' ? pxToRem(get(lockColumnsFootRowsHeight, 0)) : void 0 } },
                    tds
                )
            );
        }
    }, {
        key: 'leafColumns',
        get: function get() {
            var tableStore = this.context.tableStore;
            var lock = this.props.lock;

            if (lock === 'right') {
                return tableStore.rightLeafColumns;
            } else if (lock) {
                return tableStore.leftLeafColumns;
            } else {
                return tableStore.leafColumns;
            }
        }
    }]);

    return TableFooter;
}(Component);
TableFooter.displayName = 'TableFooter';
TableFooter.propTypes = {
    prefixCls: PropTypes.string,
    lock: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["right" /* right */, "left" /* left */])])
};
TableFooter.contextType = TableContext;
tslib_1.__decorate([computed], TableFooter.prototype, "leafColumns", null);
TableFooter = tslib_1.__decorate([observer], TableFooter);
export default TableFooter;