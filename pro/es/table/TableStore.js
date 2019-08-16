import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import * as tslib_1 from "tslib";
import React, { Children, isValidElement } from 'react';
import { action, computed, observable, runInAction } from 'mobx';
import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import defer from 'lodash/defer';
import measureScrollbar from '../../../es/_util/measureScrollbar';
import Column, { columnWidth } from './Column';
import CheckBox from '../check-box';
import Radio from '../radio';
import { stopPropagation } from '../_util/EventManager';
import { getColumnKey, getHeader } from './utils';
import getReactNodeText from '../_util/getReactNodeText';
import { getConfig, getProPrefixCls } from '../../../es/configure';
import ColumnGroups from './ColumnGroups';
import { $l } from '../locale-context';
var SELECTION_KEY = '__selection-column__';
export var EXPAND_KEY = '__expand-column__';

var TableStore = function () {
    function TableStore(node) {
        var _this = this;

        _classCallCheck(this, TableStore);

        this.handleSelectAllChange = action(function (value) {
            var _props = _this.props,
                dataSet = _props.dataSet,
                filter = _props.filter;

            if (value) {
                dataSet.selectAll(filter);
            } else {
                dataSet.unSelectAll();
                if (_this.showCachedSeletion) {
                    dataSet.clearCachedSelected();
                }
            }
        });
        runInAction(function () {
            _this.showCachedSeletion = false;
            _this.lockColumnsHeadRowsHeight = {};
            _this.lockColumnsBodyRowsHeight = {};
            _this.lockColumnsFootRowsHeight = {};
            _this.node = node;
            _this.expandedRows = [];
        });
        this.setProps(node.props);
    }

    _createClass(TableStore, [{
        key: 'getColumnHeaders',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                var leafNamedColumns, dataSet, headers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, column;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                leafNamedColumns = this.leafNamedColumns, dataSet = this.dataSet;
                                headers = [];
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 5;
                                _iterator = leafNamedColumns[Symbol.iterator]();

                            case 7:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context.next = 19;
                                    break;
                                }

                                column = _step.value;
                                _context.t0 = headers;
                                _context.t1 = column.name;
                                _context.next = 13;
                                return getReactNodeText(getHeader(column, dataSet));

                            case 13:
                                _context.t2 = _context.sent;
                                _context.t3 = {
                                    name: _context.t1,
                                    label: _context.t2
                                };

                                _context.t0.push.call(_context.t0, _context.t3);

                            case 16:
                                _iteratorNormalCompletion = true;
                                _context.next = 7;
                                break;

                            case 19:
                                _context.next = 25;
                                break;

                            case 21:
                                _context.prev = 21;
                                _context.t4 = _context['catch'](5);
                                _didIteratorError = true;
                                _iteratorError = _context.t4;

                            case 25:
                                _context.prev = 25;
                                _context.prev = 26;

                                if (!_iteratorNormalCompletion && _iterator['return']) {
                                    _iterator['return']();
                                }

                            case 28:
                                _context.prev = 28;

                                if (!_didIteratorError) {
                                    _context.next = 31;
                                    break;
                                }

                                throw _iteratorError;

                            case 31:
                                return _context.finish(28);

                            case 32:
                                return _context.finish(25);

                            case 33:
                                return _context.abrupt('return', headers);

                            case 34:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[5, 21, 25, 33], [26,, 28, 32]]);
            }));

            function getColumnHeaders() {
                return _ref.apply(this, arguments);
            }

            return getColumnHeaders;
        }()
    }, {
        key: 'showEditor',
        value: function showEditor(name) {
            this.currentEditorName = name;
        }
    }, {
        key: 'hideEditor',
        value: function hideEditor() {
            this.currentEditorName = void 0;
        }
    }, {
        key: 'showNextEditor',
        value: function showNextEditor(name, reserve) {
            if (reserve) {
                this.dataSet.pre();
            } else {
                this.dataSet.next();
            }
            this.showEditor(name);
        }
    }, {
        key: 'setProps',
        value: function setProps(props) {
            var dataSet = props.dataSet;

            this.props = props;
            this.dataSet = dataSet;
        }
    }, {
        key: 'isRowExpanded',
        value: function isRowExpanded(record) {
            var parent = record.parent;

            var expanded = this.dataSet.props.expandField ? record.isExpanded : this.expandedRows.indexOf(record) !== -1;
            return expanded && (!this.isTree || !parent || this.isRowExpanded(parent));
        }
    }, {
        key: 'setRowExpanded',
        value: function setRowExpanded(record, expanded) {
            if (this.dataSet.props.expandField) {
                record.isExpanded = expanded;
            } else {
                if (expanded) {
                    this.expandedRows.push(record);
                } else {
                    var index = this.expandedRows.indexOf(record);
                    if (index !== -1) {
                        this.expandedRows.splice(index, 1);
                    }
                }
            }
        }
    }, {
        key: 'isRowHover',
        value: function isRowHover(record) {
            return this.hoverRow === record;
        }
    }, {
        key: 'setRowHover',
        value: function setRowHover(record, hover) {
            this.hoverRow = hover ? record : void 0;
        }
    }, {
        key: 'expandAll',
        value: function expandAll() {
            var _this2 = this;

            this.dataSet.data.forEach(function (record) {
                return _this2.setRowExpanded(record, true);
            });
        }
    }, {
        key: 'collapseAll',
        value: function collapseAll() {
            var _this3 = this;

            this.dataSet.data.forEach(function (record) {
                return _this3.setRowExpanded(record, false);
            });
        }
    }, {
        key: '_leafColumns',
        value: function _leafColumns(columns) {
            var _this4 = this;

            var leafColumns = [];
            columns.forEach(function (column) {
                if (!column.children || column.children.length === 0) {
                    leafColumns.push(column);
                } else {
                    leafColumns.push.apply(leafColumns, _toConsumableArray(_this4._leafColumns(column.children)));
                }
            });
            return leafColumns;
        }
    }, {
        key: '_addExpandColumn',
        value: function _addExpandColumn(columns) {
            if (this.expandIconAsCell) {
                columns.unshift({
                    key: EXPAND_KEY,
                    resizable: false,
                    align: "center" /* center */
                    , width: 50,
                    lock: true
                });
            }
            return columns;
        }
    }, {
        key: '_addSelectionColumn',
        value: function _addSelectionColumn(columns) {
            var _this5 = this;

            if (this.hasRowBox) {
                var dataSet = this.dataSet;
                var _props2 = this.props,
                    suffixCls = _props2.suffixCls,
                    prefixCls = _props2.prefixCls;

                var selectionColumn = {
                    key: SELECTION_KEY,
                    resizable: false,
                    className: getProPrefixCls(suffixCls, prefixCls) + '-selection-column',
                    renderer: renderSelectionBox,
                    align: "center" /* center */
                    , width: 50,
                    lock: true
                };
                if (dataSet) {
                    var selection = dataSet.selection;

                    if (selection === "multiple" /* multiple */) {
                            selectionColumn.header = selectionColumn.footer = function () {
                                return React.createElement(CheckBox, { checked: _this5.allChecked, indeterminate: _this5.indeterminate, onChange: _this5.handleSelectAllChange, value: true });
                            };
                        }
                }
                columns.unshift(selectionColumn);
            }
            return columns;
        }
    }, {
        key: 'columnResizable',
        get: function get() {
            if ('columnResizable' in this.props) {
                return this.props.columnResizable;
            }
            if (getConfig('tableColumnResizable') === false) {
                return false;
            }
            return true;
        }
    }, {
        key: 'rowHeight',
        get: function get() {
            if ('rowHeight' in this.props) {
                return this.props.rowHeight;
            }
            var rowHeight = getConfig('tableRowHeight');
            if (typeof rowHeight !== 'undefined') {
                return rowHeight;
            }
            return 30;
        }
    }, {
        key: 'emptyText',
        get: function get() {
            var renderEmpty = getConfig('renderEmpty');
            if (typeof renderEmpty === 'function') {
                return renderEmpty('Table');
            }
            return $l('Table', 'empty_data');
        }
    }, {
        key: 'highLightRow',
        get: function get() {
            if ('highLightRow' in this.props) {
                return this.props.highLightRow;
            }
            if (getConfig('tableHighLightRow') === false) {
                return false;
            }
            return true;
        }
    }, {
        key: 'border',
        get: function get() {
            if ('border' in this.props) {
                return this.props.border;
            }
            if (getConfig('tableBorder') === false) {
                return false;
            }
            return true;
        }
    }, {
        key: 'queryBar',
        get: function get() {
            return this.props.queryBar || getConfig('queryBar');
        }
    }, {
        key: 'pristine',
        get: function get() {
            return this.props.pristine;
        }
    }, {
        key: 'currentEditRecord',
        get: function get() {
            return this.dataSet.find(function (record) {
                return record.editing === true;
            });
        },
        set: function set(record) {
            var _this6 = this;

            runInAction(function () {
                var currentEditRecord = _this6.currentEditRecord,
                    dataSet = _this6.dataSet;

                if (currentEditRecord) {
                    if (currentEditRecord.status === "add" /* add */) {
                            dataSet.remove(currentEditRecord);
                        } else {
                        currentEditRecord.reset();
                        currentEditRecord.editing = false;
                    }
                }
                if (record) {
                    defer(action(function () {
                        return record.editing = true;
                    }));
                }
            });
        }
    }, {
        key: 'isTree',
        get: function get() {
            return this.props.mode === "tree" /* tree */;
        }
    }, {
        key: 'editing',
        get: function get() {
            return this.currentEditorName !== void 0 || this.currentEditRecord !== void 0;
        }
    }, {
        key: 'hasRowBox',
        get: function get() {
            var _props3 = this.props,
                dataSet = _props3.dataSet,
                selectionMode = _props3.selectionMode;

            if (dataSet) {
                var selection = dataSet.selection;

                return selection && selectionMode === "rowbox" /* rowbox */;
            }
            return false;
        }
    }, {
        key: 'overflowX',
        get: function get() {
            if (this.width) {
                return this.totalLeafColumnsWidth > this.width;
            }
            return false;
        }
    }, {
        key: 'overflowY',
        get: function get() {
            var bodyHeight = this.bodyHeight,
                height = this.height;

            return bodyHeight !== void 0 && height !== void 0 && height < bodyHeight + (this.overflowX ? measureScrollbar() : 0);
        }
    }, {
        key: 'columns',
        get: function get() {
            var _props4 = this.props,
                columns = _props4.columns,
                children = _props4.children;

            return observable.array(this._addExpandColumn(this._addSelectionColumn(columns ? mergeDefaultProps(columns) : normalizeColumns(children))));
        }
    }, {
        key: 'leftColumns',
        get: function get() {
            return this.columns.filter(function (column) {
                return column.lock === "left" /* left */ || column.lock === true;
            });
        }
    }, {
        key: 'rightColumns',
        get: function get() {
            return this.columns.filter(function (column) {
                return column.lock === "right";
            } /* right */);
        }
    }, {
        key: 'columnGroups',
        get: function get() {
            return new ColumnGroups(this.columns);
        }
    }, {
        key: 'groupedColumns',
        get: function get() {
            return this.columnGroups.columns;
        }
    }, {
        key: 'leftGroupedColumns',
        get: function get() {
            return this.groupedColumns.filter(function (_ref2) {
                var lock = _ref2.column.lock;
                return lock === "left" /* left */ || lock === true;
            });
        }
    }, {
        key: 'rightGroupedColumns',
        get: function get() {
            return this.groupedColumns.filter(function (_ref3) {
                var lock = _ref3.column.lock;
                return lock === "right";
            } /* right */);
        }
    }, {
        key: 'leafColumns',
        get: function get() {
            return this._leafColumns(this.columns);
        }
    }, {
        key: 'leftLeafColumns',
        get: function get() {
            return this._leafColumns(this.leftColumns);
        }
    }, {
        key: 'rightLeafColumns',
        get: function get() {
            return this._leafColumns(this.rightColumns);
        }
    }, {
        key: 'leafNamedColumns',
        get: function get() {
            return this.leafColumns.filter(function (column) {
                return !!column.name;
            });
        }
    }, {
        key: 'totalLeafColumnsWidth',
        get: function get() {
            return this.leafColumns.reduce(function (total, column) {
                return total + columnWidth(column);
            }, 0);
        }
    }, {
        key: 'leftLeafColumnsWidth',
        get: function get() {
            return this.leftLeafColumns.reduce(function (total, column) {
                return total + columnWidth(column);
            }, 0);
        }
    }, {
        key: 'rightLeafColumnsWidth',
        get: function get() {
            return this.rightLeafColumns.reduce(function (total, column) {
                return total + columnWidth(column);
            }, 0);
        }
    }, {
        key: 'hasCheckFieldColumn',
        get: function get() {
            var checkField = this.dataSet.props.checkField;

            return this.leafColumns.some(function (_ref4) {
                var name = _ref4.name,
                    editor = _ref4.editor;
                return !!editor && checkField === name;
            });
        }
    }, {
        key: 'hasFooter',
        get: function get() {
            return this.leafColumns.some(function (column) {
                return !!column.footer && column.key !== SELECTION_KEY;
            });
        }
    }, {
        key: 'isAnyColumnsResizable',
        get: function get() {
            return this.leafColumns.some(function (column) {
                return column.resizable === true;
            });
        }
    }, {
        key: 'isAnyColumnsLock',
        get: function get() {
            return this.columns.some(function (column) {
                return !!column.lock;
            });
        }
    }, {
        key: 'isAnyColumnsLeftLock',
        get: function get() {
            return this.columns.some(function (column) {
                return column.lock === "left" /* left */ || column.lock === true;
            });
        }
    }, {
        key: 'isAnyColumnsRightLock',
        get: function get() {
            return this.columns.some(function (column) {
                return column.lock === "right";
            } /* right */);
        }
    }, {
        key: 'data',
        get: function get() {
            var _props5 = this.props,
                filter = _props5.filter,
                pristine = _props5.pristine;
            var dataSet = this.dataSet,
                isTree = this.isTree,
                showCachedSeletion = this.showCachedSeletion;

            var data = isTree ? dataSet.treeData : dataSet.data;
            if (typeof filter === 'function') {
                data = data.filter(filter);
            }
            if (pristine) {
                data = data.filter(function (record) {
                    return record.status !== "add";
                } /* add */);
            }
            if (showCachedSeletion) {
                return [].concat(_toConsumableArray(dataSet.cachedSelected), _toConsumableArray(data));
            } else {
                return data;
            }
        }
    }, {
        key: 'indeterminate',
        get: function get() {
            var dataSet = this.dataSet,
                showCachedSeletion = this.showCachedSeletion;

            if (dataSet) {
                var _filter = (showCachedSeletion ? this.data : dataSet.data).filter(function (record) {
                    return record.selectable;
                }),
                    length = _filter.length;

                var selectedLength = showCachedSeletion ? dataSet.selected.length : dataSet.currentSelected.length;
                return !!selectedLength && selectedLength !== length;
            }
            return false;
        }
    }, {
        key: 'allChecked',
        get: function get() {
            var dataSet = this.dataSet,
                showCachedSeletion = this.showCachedSeletion;

            if (dataSet) {
                var _filter2 = (showCachedSeletion ? this.data : dataSet.data).filter(function (record) {
                    return record.selectable;
                }),
                    length = _filter2.length;

                var selectedLength = showCachedSeletion ? dataSet.selected.length : dataSet.currentSelected.length;
                return !!selectedLength && selectedLength === length;
            }
            return false;
        }
    }, {
        key: 'expandIconAsCell',
        get: function get() {
            var expandedRowRenderer = this.props.expandedRowRenderer;

            return !!expandedRowRenderer && !this.isTree;
        }
    }, {
        key: 'expandIconColumnIndex',
        get: function get() {
            var expandIconAsCell = this.expandIconAsCell,
                _props$expandIconColu = this.props.expandIconColumnIndex,
                expandIconColumnIndex = _props$expandIconColu === undefined ? 0 : _props$expandIconColu;

            if (expandIconAsCell) {
                return 0;
            }
            if (this.hasRowBox) {
                return expandIconColumnIndex + 1;
            }
            return expandIconColumnIndex;
        }
    }, {
        key: 'inlineEdit',
        get: function get() {
            return this.props.editMode === "inline" /* inline */;
        }
    }]);

    return TableStore;
}();

export default TableStore;

tslib_1.__decorate([observable], TableStore.prototype, "props", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "bodyHeight", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "width", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "height", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "lockColumnsBodyRowsHeight", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "lockColumnsFootRowsHeight", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "lockColumnsHeadRowsHeight", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "expandedRows", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "hoverRow", void 0);
tslib_1.__decorate([observable], TableStore.prototype, "currentEditorName", void 0);
tslib_1.__decorate([computed], TableStore.prototype, "columnResizable", null);
tslib_1.__decorate([computed], TableStore.prototype, "rowHeight", null);
tslib_1.__decorate([computed], TableStore.prototype, "emptyText", null);
tslib_1.__decorate([computed], TableStore.prototype, "highLightRow", null);
tslib_1.__decorate([computed], TableStore.prototype, "border", null);
tslib_1.__decorate([computed], TableStore.prototype, "queryBar", null);
tslib_1.__decorate([computed], TableStore.prototype, "currentEditRecord", null);
tslib_1.__decorate([observable], TableStore.prototype, "showCachedSeletion", void 0);
tslib_1.__decorate([computed], TableStore.prototype, "hasRowBox", null);
tslib_1.__decorate([computed], TableStore.prototype, "overflowX", null);
tslib_1.__decorate([computed], TableStore.prototype, "overflowY", null);
tslib_1.__decorate([computed], TableStore.prototype, "columns", null);
tslib_1.__decorate([computed], TableStore.prototype, "leftColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "rightColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "columnGroups", null);
tslib_1.__decorate([computed], TableStore.prototype, "groupedColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "leftGroupedColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "rightGroupedColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "leafColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "leftLeafColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "rightLeafColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "leafNamedColumns", null);
tslib_1.__decorate([computed], TableStore.prototype, "totalLeafColumnsWidth", null);
tslib_1.__decorate([computed], TableStore.prototype, "leftLeafColumnsWidth", null);
tslib_1.__decorate([computed], TableStore.prototype, "rightLeafColumnsWidth", null);
tslib_1.__decorate([computed], TableStore.prototype, "hasCheckFieldColumn", null);
tslib_1.__decorate([computed], TableStore.prototype, "hasFooter", null);
tslib_1.__decorate([computed], TableStore.prototype, "isAnyColumnsResizable", null);
tslib_1.__decorate([computed], TableStore.prototype, "isAnyColumnsLock", null);
tslib_1.__decorate([computed], TableStore.prototype, "isAnyColumnsLeftLock", null);
tslib_1.__decorate([computed], TableStore.prototype, "isAnyColumnsRightLock", null);
tslib_1.__decorate([computed], TableStore.prototype, "data", null);
tslib_1.__decorate([computed], TableStore.prototype, "indeterminate", null);
tslib_1.__decorate([computed], TableStore.prototype, "allChecked", null);
tslib_1.__decorate([computed], TableStore.prototype, "expandIconAsCell", null);
tslib_1.__decorate([computed], TableStore.prototype, "expandIconColumnIndex", null);
tslib_1.__decorate([computed], TableStore.prototype, "inlineEdit", null);
tslib_1.__decorate([action], TableStore.prototype, "showEditor", null);
tslib_1.__decorate([action], TableStore.prototype, "hideEditor", null);
tslib_1.__decorate([action], TableStore.prototype, "setProps", null);
tslib_1.__decorate([action], TableStore.prototype, "setRowExpanded", null);
tslib_1.__decorate([action], TableStore.prototype, "setRowHover", null);
function renderSelectionBox(_ref5) {
    var record = _ref5.record;
    var dataSet = record.dataSet;

    if (dataSet) {
        var selection = dataSet.selection;

        var handleChange = function handleChange(value) {
            if (value) {
                dataSet.select(record);
            } else {
                dataSet.unSelect(record);
            }
        };
        if (selection === "multiple" /* multiple */) {
                return React.createElement(CheckBox, { checked: record.isSelected, onChange: handleChange, onClick: stopPropagation, disabled: !record.selectable, value: true });
            } else if (selection === "single" /* single */) {
                return React.createElement(Radio, { checked: record.isSelected, onChange: handleChange, onClick: stopPropagation, disabled: !record.selectable, value: true });
            }
    }
}
function mergeDefaultProps(columns) {
    var defaultKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0];

    return columns.reduce(function (newColumns, column) {
        if (isPlainObject(column)) {
            var newColumn = _extends({}, Column.defaultProps, column);
            if (isNil(getColumnKey(newColumn))) {
                newColumn.key = 'anonymous-' + defaultKey[0]++;
            }
            var children = newColumn.children;

            if (children) {
                newColumn.children = mergeDefaultProps(children, defaultKey);
            }
            newColumns.push(newColumn);
        }
        return newColumns;
    }, []);
}
function normalizeColumns(elements) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var defaultKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0];

    var columns = [];
    var leftFixedColumns = [];
    var rightFixedColumns = [];
    Children.forEach(elements, function (element) {
        if (!isValidElement(element) || element.type !== Column) {
            return;
        }
        var props = element.props,
            key = element.key;

        var column = _extends({}, props);
        if (isNil(getColumnKey(column))) {
            column.key = 'anonymous-' + defaultKey[0]++;
        }
        if (parent) {
            column.lock = parent.lock;
        }
        column.children = normalizeColumns(column.children, column, defaultKey);
        if (key) {
            column.key = key;
        }
        if (column.lock === "left" /* left */ || column.lock === true) {
            leftFixedColumns.push(column);
        } else if (column.lock === "right" /* right */) {
                rightFixedColumns.push(column);
            } else {
            columns.push(column);
        }
    });
    return leftFixedColumns.concat(columns, rightFixedColumns);
}