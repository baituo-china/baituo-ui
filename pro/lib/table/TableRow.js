'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _measureScrollbar = require('../../../lib/_util/measureScrollbar');

var _measureScrollbar2 = _interopRequireDefault(_measureScrollbar);

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _Record = require('../data-set/Record');

var _Record2 = _interopRequireDefault(_Record);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _ExpandIcon = require('./ExpandIcon');

var _ExpandIcon2 = _interopRequireDefault(_ExpandIcon);

var _utils = require('./utils');

var _TableStore = require('./TableStore');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableRow = function (_Component) {
    (0, _inherits3['default'])(TableRow, _Component);

    function TableRow() {
        (0, _classCallCheck3['default'])(this, TableRow);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).apply(this, arguments));

        _this.rowExternalProps = {};
        _this.childrenRendered = false;
        _this.saveRef = (0, _mobx.action)(function (node) {
            if (node) {
                _this.node = node;
                var _this$props = _this.props,
                    lock = _this$props.lock,
                    record = _this$props.record;
                var _this$context$tableSt = _this.context.tableStore,
                    rowHeight = _this$context$tableSt.rowHeight,
                    lockColumnsBodyRowsHeight = _this$context$tableSt.lockColumnsBodyRowsHeight;

                if (rowHeight === 'auto' && !lock) {
                    (0, _mobx.set)(lockColumnsBodyRowsHeight, _this.rowKey = record.key, node.offsetHeight);
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

            if (dataSet && !(0, _utils.isDisabledRow)(record)) {
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

                return _react2['default'].createElement(
                    _TableCell2['default'],
                    { key: (0, _utils.getColumnKey)(column), prefixCls: prefixCls, column: column, record: record, indentSize: indentSize },
                    _this.hasExpandIcon(index) && _this.renderExpandIcon()
                );
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(TableRow, [{
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

                            var bottomSide = offsetTop + offsetHeight - height + (0, _measureScrollbar2['default'])();
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
            (0, _mobx.remove)(tableStore.lockColumnsBodyRowsHeight, this.rowKey);
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

            return _react2['default'].createElement(_ExpandIcon2['default'], { prefixCls: prefixCls, expandable: this.expandable, onChange: this.handleExpandChange, expanded: this.isExpanded });
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
                    var classString = (0, _classnames2['default'])(prefixCls + '-expanded-row', rowExternalProps.className);
                    var rowProps = {
                        key: record.key + '-expanded-row',
                        className: classString,
                        style: (0, _extends3['default'])({}, rowExternalProps.style)
                    };
                    if (overflowX || !record.isCurrent) {
                        rowProps.onMouseEnter = this.handleMouseEnter;
                        rowProps.onMouseLeave = this.handleMouseLeave;
                    }
                    if (!isExpanded) {
                        rowProps.style.display = 'none';
                    }
                    expandRows.push(_react2['default'].createElement(
                        'tr',
                        (0, _extends3['default'])({}, rowExternalProps, rowProps),
                        expandIconAsCell && _react2['default'].createElement('td', { key: _TableStore.EXPAND_KEY }),
                        _react2['default'].createElement(
                            'td',
                            { key: _TableStore.EXPAND_KEY + '-rest', className: prefixCls + '-cell', colSpan: columns.length - (expandIconAsCell ? 1 : 0) },
                            _react2['default'].createElement(
                                'div',
                                { className: prefixCls + '-cell-inner' },
                                expandedRowRenderer({ dataSet: record.dataSet, record: record })
                            )
                        )
                    ));
                }
                if ((0, _react.isValidElement)(children)) {
                    expandRows.push((0, _react.cloneElement)(children, { isExpanded: isExpanded, key: record.key + '-expanded-rows' }));
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

            var rowExternalProps = this.rowExternalProps = (0, _extends3['default'])({}, typeof rowRenderer === 'function' ? rowRenderer(record, index) : {}, typeof onRow === 'function' ? onRow({
                dataSet: dataSet,
                record: record,
                expandedRow: false,
                index: index
            }) : {});
            var rowPrefixCls = prefixCls + '-row';
            var classString = (0, _classnames2['default'])(rowPrefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, rowPrefixCls + '-current', highLightRow && isCurrent), (0, _defineProperty3['default'])(_classNames, rowPrefixCls + '-hover', highLightRow && !isCurrent && this.isHover), (0, _defineProperty3['default'])(_classNames, rowPrefixCls + '-highlight', highLightRow), (0, _defineProperty3['default'])(_classNames, rowPrefixCls + '-disabled', (0, _utils.isDisabledRow)(record)), _classNames), rowExternalProps.className);
            var rowProps = {
                ref: this.saveRef,
                className: classString,
                style: (0, _extends3['default'])({}, rowExternalProps.style),
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
                    rowProps.style.height = (0, _UnitConvertor.pxToRem)((0, _mobx.get)(lockColumnsBodyRowsHeight, key));
                }
            }
            if (selectionMode === "click" /* click */) {
                    rowProps.onClick = this.handleSelectionByClick;
                } else if (selectionMode === "dblclick" /* dblclick */) {
                    rowProps.onDoubleClick = this.handleSelectionByDblClick;
                }
            return [_react2['default'].createElement(
                'tr',
                (0, _extends3['default'])({ key: key }, rowExternalProps, rowProps),
                columns.map(this.getCell)
            )].concat((0, _toConsumableArray3['default'])(this.renderExpandRow()));
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
}(_react.Component);
TableRow.displayName = 'TableRow';
TableRow.propTypes = {
    prefixCls: _propTypes2['default'].string,
    lock: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].oneOf(["right" /* right */, "left" /* left */])]),
    columns: _propTypes2['default'].array.isRequired,
    record: _propTypes2['default'].instanceOf(_Record2['default']).isRequired,
    indentSize: _propTypes2['default'].number.isRequired
};
TableRow.contextType = _TableContext2['default'];
tslib_1.__decorate([_mobx.computed], TableRow.prototype, "expandable", null);
tslib_1.__decorate([_mobx.computed], TableRow.prototype, "isExpanded", null);
tslib_1.__decorate([_mobx.computed], TableRow.prototype, "isHover", null);
tslib_1.__decorate([_mobx.action], TableRow.prototype, "componentWillUnmount", null);
TableRow = tslib_1.__decorate([_mobxReact.observer], TableRow);
exports['default'] = TableRow;
module.exports = exports['default'];