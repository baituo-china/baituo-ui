import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { observer } from 'mobx-react';
import { action, computed } from 'mobx';
import classes from 'component-classes';
import debounce from 'lodash/debounce';
import TableContext from './TableContext';
import TableRow from './TableRow';
import ExpandedRow from './ExpandedRow';
import { pxToRem } from '../../../es/_util/UnitConvertor';
var TableBody = function (_Component) {
    _inherits(TableBody, _Component);

    function TableBody() {
        _classCallCheck(this, TableBody);

        var _this = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).apply(this, arguments));

        _this.handleResize = debounce(function () {
            _this.syncBodyHeight();
        }, 30);
        _this.saveRef = function (node) {
            _this.tableBody = node;
        };
        _this.renderExpandedRows = function (columns, record, isExpanded, lock) {
            return _this.getRows(record.children || [], columns, isExpanded, lock);
        };
        return _this;
    }

    _createClass(TableBody, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                lock = _props.lock;
            var leafColumns = this.leafColumns;
            var data = this.context.tableStore.data;

            var rows = data.length ? this.getRows(data, leafColumns, true, lock) : this.getEmptyRow(leafColumns, lock);
            return React.createElement(
                'tbody',
                { ref: lock ? void 0 : this.saveRef, className: prefixCls + '-tbody' },
                rows
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.tableBody) {
                this.resizeObserver = new ResizeObserver(this.handleResize);
                this.resizeObserver.observe(this.tableBody);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.handleResize.cancel();
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this.props.lock) {
                var node = this.context.tableStore.node;

                if (classes(node.wrapper).has(this.props.prefixCls + '-focused')) {
                    node.focus();
                }
            }
        }
    }, {
        key: 'getRows',
        value: function getRows(records, columns, expanded, lock) {
            var _this2 = this;

            return records.map(function (record, index) {
                return _this2.getRow(columns, record, index, expanded, lock);
            });
        }
    }, {
        key: 'getEmptyRow',
        value: function getEmptyRow(columns, lock) {
            var _context$tableStore = this.context.tableStore,
                dataSet = _context$tableStore.dataSet,
                emptyText = _context$tableStore.emptyText,
                width = _context$tableStore.width;
            var prefixCls = this.props.prefixCls;

            var style = width ? {
                marginLeft: pxToRem(width / 2)
            } : {
                transform: 'none',
                display: 'inline-block'
            };
            var tdStyle = width ? {} : { textAlign: 'center' };
            return React.createElement(
                'tr',
                { className: prefixCls + '-empty-row' },
                React.createElement(
                    'td',
                    { colSpan: columns.length, style: tdStyle },
                    React.createElement(
                        'div',
                        { style: style },
                        !lock && dataSet.status === "ready" /* ready */ && emptyText
                    )
                )
            );
        }
    }, {
        key: 'getRow',
        value: function getRow(columns, record, index, expanded, lock) {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                indentSize = _props2.indentSize;
            var isTree = this.context.tableStore.isTree;

            var children = isTree && React.createElement(
                ExpandedRow,
                { record: record, columns: columns, lock: lock },
                this.renderExpandedRows
            );
            return React.createElement(
                TableRow,
                { key: record.key, hidden: !expanded, lock: lock, indentSize: indentSize, prefixCls: prefixCls, columns: columns, record: record, index: index },
                children
            );
        }
    }, {
        key: 'syncBodyHeight',
        value: function syncBodyHeight() {
            var tableStore = this.context.tableStore;

            if (this.tableBody) {
                tableStore.bodyHeight = this.tableBody.offsetHeight;
            }
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

    return TableBody;
}(Component);
TableBody.displayName = 'TableBody';
TableBody.propTypes = {
    lock: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["right" /* right */, "left" /* left */])]),
    prefixCls: PropTypes.string,
    indentSize: PropTypes.number.isRequired
};
TableBody.contextType = TableContext;
tslib_1.__decorate([computed], TableBody.prototype, "leafColumns", null);
tslib_1.__decorate([action], TableBody.prototype, "syncBodyHeight", null);
TableBody = tslib_1.__decorate([observer], TableBody);
export default TableBody;