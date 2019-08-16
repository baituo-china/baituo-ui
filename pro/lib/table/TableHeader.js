'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TableHeaderCell = require('./TableHeaderCell');

var _TableHeaderCell2 = _interopRequireDefault(_TableHeaderCell);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _mobx = require('mobx');

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableHeader = function (_Component) {
    (0, _inherits3['default'])(TableHeader, _Component);

    function TableHeader() {
        (0, _classCallCheck3['default'])(this, TableHeader);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));

        _this.saveRef = function (node) {
            return _this.node = node;
        };
        _this.getHeaderNode = function () {
            return _this.node;
        };
        return _this;
    }

    (0, _createClass3['default'])(TableHeader, [{
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
                                key: (0, _utils.getColumnKey)(column),
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
                            return _react2['default'].createElement(_TableHeaderCell2['default'], props);
                        }
                    });
                    if (_this2.context.tableStore.overflowY && lock !== "left" /* left */ && rowIndex === 0) {
                        tds.push(_react2['default'].createElement('th', { key: 'fixed-column', className: prefixCls + '-cell', rowSpan: rows.length }));
                    }
                    return _react2['default'].createElement(
                        'tr',
                        { key: rowIndex, style: { height: lock ? _this2.getHeaderRowStyle(rows, rowIndex) : void 0 } },
                        tds
                    );
                }
            });
            var classString = (0, _classnames2['default'])(prefixCls + '-thead', (0, _defineProperty3['default'])({}, prefixCls + '-column-resizable', this.context.tableStore.columnResizable));
            return _react2['default'].createElement(
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
            return (0, _UnitConvertor.pxToRem)(rows.slice(rowIndex).reduce(function (total, r, index) {
                return r.length ? total : total + 1 + (rowHeight === 'auto' ? _this4.getRowHeight(index + rowIndex) : rowHeight);
            }, height));
        }
    }, {
        key: 'getRowHeight',
        value: function getRowHeight(index) {
            return (0, _mobx.get)(this.context.tableStore.lockColumnsHeadRowsHeight, index) || 0;
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
}(_react.Component);
TableHeader.displayName = 'TableHeader';
TableHeader.propTypes = {
    prefixCls: _propTypes2['default'].string,
    lock: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].oneOf(["right" /* right */, "left" /* left */])])
};
TableHeader.contextType = _TableContext2['default'];
tslib_1.__decorate([_mobx.computed], TableHeader.prototype, "groupedColumns", null);
TableHeader = tslib_1.__decorate([_mobxReact.observer], TableHeader);
exports['default'] = TableHeader;
module.exports = exports['default'];