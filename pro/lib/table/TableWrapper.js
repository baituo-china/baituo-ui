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

var _mobx = require('mobx');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _measureScrollbar = require('../../../lib/_util/measureScrollbar');

var _measureScrollbar2 = _interopRequireDefault(_measureScrollbar);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _Column = require('./Column');

var _TableEditor = require('./TableEditor');

var _TableEditor2 = _interopRequireDefault(_TableEditor);

var _TableCol = require('./TableCol');

var _TableCol2 = _interopRequireDefault(_TableCol);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableWrapper = function (_Component) {
    (0, _inherits3['default'])(TableWrapper, _Component);

    function TableWrapper() {
        (0, _classCallCheck3['default'])(this, TableWrapper);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableWrapper.__proto__ || Object.getPrototypeOf(TableWrapper)).apply(this, arguments));

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

    (0, _createClass3['default'])(TableWrapper, [{
        key: 'getCol',
        value: function getCol(column, width) {
            if (!column.hidden) {
                var prefixCls = this.props.prefixCls;

                return _react2['default'].createElement(_TableCol2['default'], { key: (0, _utils.getColumnKey)(column), prefixCls: prefixCls, width: width, minWidth: (0, _Column.minColumnWidth)(column), onResizeEnd: this.handleResizeEnd });
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
                var width = (0, _mobx.get)(column, 'width');
                if (!overflowX) {
                    if (!hasEmptyWidth && index === array.length - 1) {
                        width = void 0;
                    } else if ((0, _isNil2['default'])(width)) {
                        hasEmptyWidth = true;
                    }
                }
                return _this2.getCol(column, width);
            });
            if (overflowY && lock !== "left" /* left */ && (hasHeader || hasFooter)) {
                cols.push(_react2['default'].createElement('col', { key: 'fixed-column', style: { width: (0, _UnitConvertor.pxToRem)((0, _measureScrollbar2['default'])()) } }));
            }
            return _react2['default'].createElement(
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
                return _react2['default'].createElement(_TableEditor2['default'], { key: column.name, prefixCls: prefixCls, column: column });
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
            var className = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-last-row-bordered', hasBody && !overflowY && height !== void 0));
            var table = _react2['default'].createElement(
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
                        return (0, _mobx.set)(lockColumnsHeadRowsHeight, index, row.offsetHeight);
                    });
                }
                if (hasBody) {
                    var bodyRows = Array.from(this.tableWrapper.querySelectorAll('.' + prefixCls + '-row'));
                    bodyRows.forEach(function (row) {
                        return (0, _mobx.set)(lockColumnsBodyRowsHeight, row.dataset.index, row.offsetHeight);
                    });
                }
                if (hasFooter) {
                    var footRows = Array.from(this.tableWrapper.querySelectorAll('tfoot tr'));
                    footRows.forEach(function (row, index) {
                        return (0, _mobx.set)(lockColumnsFootRowsHeight, index, row.offsetHeight);
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
                    tableWidth += (0, _measureScrollbar2['default'])();
                }
                return (0, _UnitConvertor.pxToRem)(tableWidth);
            } else {
                return '100%';
            }
        }
    }]);
    return TableWrapper;
}(_react.Component);
TableWrapper.contextType = _TableContext2['default'];
TableWrapper.propTypes = {
    lock: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].oneOf(["right" /* right */, "left" /* left */])]),
    hasBody: _propTypes2['default'].bool,
    hasHeader: _propTypes2['default'].bool,
    hasFooter: _propTypes2['default'].bool
};
tslib_1.__decorate([_mobx.computed], TableWrapper.prototype, "leafColumnsWidth", null);
tslib_1.__decorate([_mobx.computed], TableWrapper.prototype, "leafEditorColumns", null);
tslib_1.__decorate([_mobx.computed], TableWrapper.prototype, "leafColumns", null);
tslib_1.__decorate([_mobx.computed], TableWrapper.prototype, "tableWidth", null);
tslib_1.__decorate([_mobx.action], TableWrapper.prototype, "syncFixedTableRowHeight", null);
TableWrapper = tslib_1.__decorate([_mobxReact.observer], TableWrapper);
exports['default'] = TableWrapper;
module.exports = exports['default'];