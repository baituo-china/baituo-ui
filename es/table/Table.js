import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _typeof from 'babel-runtime/helpers/typeof';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import Pagination from '../pagination';
import Icon from '../icon';
import Spin from '../spin';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import warning from '../_util/warning';
import FilterDropdown from './filterDropdown';
import createStore from './createStore';
import SelectionBox from './SelectionBox';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import createBodyRow from './createBodyRow';
import { findColumnByFilterValue, flatArray, flatFilter, getColumnKey as _getColumnKey, getLeafColumns, normalizeColumns, removeHiddenColumns, treeMap } from './util';
import FilterBar from './FilterBar';
import { VALUE_OR } from './FilterSelect';
import RcTable from '../rc-components/table';
import { getPrefixCls as _getPrefixCls } from '../configure';
function findBodyDom(dom, reg) {
    if (dom.childElementCount > 0) {
        for (var i = 0; i < dom.childElementCount; i += 1) {
            if (reg.test(dom.children[i].className)) {
                return dom.children[i];
            } else if (dom.childElementCount > 0) {
                var childFound = findBodyDom(dom.children[i], reg);
                if (childFound !== null) {
                    return childFound;
                }
            }
        }
    }
    return null;
}
function stopPropagation(e) {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
    }
}
var defaultPagination = {
    onChange: noop,
    onShowSizeChange: noop
};
/**
 * Avoid creating new object, so that parent component's shouldComponentUpdate
 * can works appropriately。
 */
var emptyObject = {};

var Table = function (_Component) {
    _inherits(Table, _Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.saveRef = function (ref) {
            _this.refTable = ref;
        };
        _this.getCheckboxPropsByItem = function (item, index) {
            var _this$props$rowSelect = _this.props.rowSelection,
                rowSelection = _this$props$rowSelect === undefined ? {} : _this$props$rowSelect;

            if (!rowSelection.getCheckboxProps) {
                return {};
            }
            var key = _this.getRecordKey(item, index);
            // Cache checkboxProps
            if (!_this.CheckboxPropsCache[key]) {
                _this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item);
            }
            return _this.CheckboxPropsCache[key];
        };
        _this.onRow = function (record, index) {
            var onRow = _this.props.onRow;

            var prefixCls = _this.getPrefixCls();
            var custom = onRow ? onRow(record, index) : {};
            return _extends({}, custom, {
                prefixCls: prefixCls,
                store: _this.store,
                rowKey: _this.getRecordKey(record, index)
            });
        };
        _this.handleFilterSelectClear = function () {
            var filters = _this.state.filters;

            Object.keys(_this.state.filters).map(function (key) {
                return filters[key] = [];
            });
            _this.setNewFilterState({
                barFilters: [],
                filters: filters
            });
        };
        _this.handleFilterSelectChange = function (barFilters) {
            var onFilterSelectChange = _this.props.onFilterSelectChange;

            if (onFilterSelectChange) {
                onFilterSelectChange(barFilters);
            }
            _this.setNewFilterState({
                barFilters: barFilters
            });
        };
        _this.handleColumnFilterChange = function (e) {
            var onColumnFilterChange = _this.props.onColumnFilterChange;

            if (onColumnFilterChange) {
                onColumnFilterChange(e);
            }
            _this.forceUpdate();
        };
        _this.handleFilter = function (column, nextFilters) {
            var filters = _extends({}, _this.state.filters, _defineProperty({}, _this.getColumnKey(column), nextFilters));
            // Remove filters not in current columns
            var currentColumnKeys = [];
            treeMap(_this.columns, function (c) {
                if (!c.children) {
                    currentColumnKeys.push(_this.getColumnKey(c));
                }
            });
            Object.keys(filters).forEach(function (columnKey) {
                if (currentColumnKeys.indexOf(columnKey) < 0) {
                    delete filters[columnKey];
                }
            });
            _this.setNewFilterState({
                filters: filters
            });
        };
        _this.handleSelect = function (record, rowIndex, e) {
            var checked = e.target.checked;
            var nativeEvent = e.nativeEvent;
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var key = _this.getRecordKey(record, rowIndex);
            if (checked) {
                selectedRowKeys.push(_this.getRecordKey(record, rowIndex));
            } else {
                selectedRowKeys = selectedRowKeys.filter(function (i) {
                    return key !== i;
                });
            }
            _this.store.setState({
                selectionDirty: true
            });
            _this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: 'onSelect',
                record: record,
                checked: checked,
                changeRowKeys: void 0,
                nativeEvent: nativeEvent
            });
        };
        _this.handleRadioSelect = function (record, rowIndex, e) {
            var checked = e.target.checked;
            var nativeEvent = e.nativeEvent;
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var key = _this.getRecordKey(record, rowIndex);
            selectedRowKeys = [key];
            _this.store.setState({
                selectionDirty: true
            });
            _this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: 'onSelect',
                record: record,
                checked: checked,
                changeRowKeys: void 0,
                nativeEvent: nativeEvent
            });
        };
        _this.handleSelectRow = function (selectionKey, index, onSelectFunc) {
            var data = _this.getFlatCurrentPageData();
            var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();
            var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);
            var changeableRowKeys = data.filter(function (item, i) {
                return !_this.getCheckboxPropsByItem(item, i).disabled;
            }).map(function (item, i) {
                return _this.getRecordKey(item, i);
            });
            var changeRowKeys = [];
            var selectWay = '';
            var checked = void 0;
            // handle default selection
            switch (selectionKey) {
                case 'all':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) < 0) {
                            selectedRowKeys.push(key);
                            changeRowKeys.push(key);
                        }
                    });
                    selectWay = 'onSelectAll';
                    checked = true;
                    break;
                case 'removeAll':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) >= 0) {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                            changeRowKeys.push(key);
                        }
                    });
                    selectWay = 'onSelectAll';
                    checked = false;
                    break;
                case 'invert':
                    changeableRowKeys.forEach(function (key) {
                        if (selectedRowKeys.indexOf(key) < 0) {
                            selectedRowKeys.push(key);
                        } else {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                        }
                        changeRowKeys.push(key);
                        selectWay = 'onSelectInvert';
                    });
                    break;
                default:
                    break;
            }
            _this.store.setState({
                selectionDirty: true
            });
            // when select custom selection, callback selections[n].onSelect
            var rowSelection = _this.props.rowSelection;

            var customSelectionStartIndex = 2;
            if (rowSelection && rowSelection.hideDefaultSelections) {
                customSelectionStartIndex = 0;
            }
            if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
                return onSelectFunc(changeableRowKeys);
            }
            _this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: selectWay,
                checked: checked,
                changeRowKeys: changeRowKeys
            });
        };
        _this.handlePageChange = function (current) {
            for (var _len = arguments.length, otherArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                otherArguments[_key - 1] = arguments[_key];
            }

            var props = _this.props;
            var pagination = _extends({}, _this.state.pagination);
            if (props.autoScroll) {
                setTimeout(function () {
                    if (_this.refTable && _this.refTable.clientHeight > document.body.clientHeight) {
                        _this.refTable.scrollIntoView({
                            block: 'start'
                        });
                    } else if (_this.refTable) {
                        // @ts-ignore
                        _this.refTable.scrollIntoViewIfNeeded({
                            block: 'start'
                        });
                    }
                }, 10);
                if (_this.refTable) {
                    var dom = findBodyDom(_this.refTable, new RegExp(_this.getPrefixCls() + '-body'));
                    if (dom !== null && dom.scroll) {
                        dom.scrollTop = 0;
                    }
                }
            }
            if (current) {
                pagination.current = current;
            } else {
                pagination.current = pagination.current || 1;
            }
            pagination.onChange.apply(pagination, [pagination.current].concat(otherArguments));
            var newState = {
                pagination: pagination
            };
            // Controlled current prop will not respond user interaction
            if (props.pagination && _typeof(props.pagination) === 'object' && 'current' in props.pagination) {
                newState.pagination = _extends({}, pagination, {
                    current: _this.state.pagination.current
                });
            }
            _this.setState(newState);
            _this.store.setState({
                selectionDirty: false
            });
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange.apply(null, _this.prepareParamsArguments(_extends({}, _this.state, {
                    selectionDirty: false,
                    pagination: pagination
                })));
            }
        };
        _this.renderSelectionBox = function (type) {
            return function (_, record, index) {
                var rowIndex = _this.getRecordKey(record, index); // 从 1 开始
                var props = _this.getCheckboxPropsByItem(record, index);
                var handleChange = function handleChange(e) {
                    type === 'radio' ? _this.handleRadioSelect(record, rowIndex, e) : _this.handleSelect(record, rowIndex, e);
                };
                return React.createElement(
                    'span',
                    { onClick: stopPropagation },
                    React.createElement(SelectionBox, _extends({ type: type, store: _this.store, rowIndex: rowIndex, onChange: handleChange, defaultSelection: _this.getDefaultSelection() }, props))
                );
            };
        };
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey;
            var recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
            warning(recordKey !== undefined, 'Each record in dataSource of table should have a unique `key` prop, or set `rowKey` to an unique primary key');
            return recordKey === undefined ? index : recordKey;
        };
        _this.getPopupContainer = function () {
            return findDOMNode(_this);
        };
        _this.handleShowSizeChange = function (current, pageSize) {
            var pagination = _this.state.pagination;
            pagination.onShowSizeChange(current, pageSize);
            var nextPagination = _extends({}, pagination, {
                pageSize: pageSize,
                current: current
            });
            _this.setState({ pagination: nextPagination });
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange.apply(null, _this.prepareParamsArguments(_extends({}, _this.state, {
                    pagination: nextPagination
                })));
            }
        };
        _this.renderTable = function (contextLocale, loading) {
            var _classNames;

            var locale = _extends({}, contextLocale, _this.props.locale);

            var _this$props = _this.props,
                filterBarMultiple = _this$props.filterBarMultiple,
                filterBarPlaceholder = _this$props.filterBarPlaceholder,
                showHeader = _this$props.showHeader,
                filterBar = _this$props.filterBar,
                dataSource = _this$props.dataSource,
                filters = _this$props.filters,
                empty = _this$props.empty,
                restProps = _objectWithoutProperties(_this$props, ['filterBarMultiple', 'filterBarPlaceholder', 'showHeader', 'filterBar', 'dataSource', 'filters', 'empty']);

            var prefixCls = _this.getPrefixCls();
            var data = _this.getCurrentPageData();
            var expandIconAsCell = _this.props.expandedRowRender && _this.props.expandIconAsCell !== false;
            var classString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + _this.props.size, true), _defineProperty(_classNames, prefixCls + '-bordered', _this.props.bordered), _defineProperty(_classNames, prefixCls + '-empty', !data.length), _defineProperty(_classNames, prefixCls + '-without-column-header', !showHeader), _classNames));
            var columns = _this.renderRowSelection(locale);
            columns = _this.renderColumnsDropdown(columns, locale);
            columns = columns.map(function (column, i) {
                var newColumn = _extends({}, column);
                newColumn.key = _this.getColumnKey(newColumn, i);
                return newColumn;
            });
            columns = removeHiddenColumns(columns);
            var expandIconColumnIndex = columns[0] && columns[0].key === 'selection-column' ? 1 : 0;
            if ('expandIconColumnIndex' in restProps) {
                expandIconColumnIndex = restProps.expandIconColumnIndex;
            }
            var table = React.createElement(RcTable, _extends({ key: 'table' }, restProps, { onRow: _this.onRow, components: _this.components, prefixCls: prefixCls, data: data, columns: columns, showHeader: showHeader, className: classString, expandIconColumnIndex: expandIconColumnIndex, expandIconAsCell: expandIconAsCell, emptyText: !loading.spinning && (empty || locale.emptyText) }));
            if (filterBar) {
                var bar = React.createElement(FilterBar, { key: 'filter-bar', prefixCls: prefixCls, placeholder: filterBarPlaceholder, columns: getLeafColumns(_this.columns), onFilterSelectChange: _this.handleFilterSelectChange, onFilterSelectClear: _this.handleFilterSelectClear, onColumnFilterChange: _this.handleColumnFilterChange, onFilter: _this.handleFilter, dataSource: dataSource, filters: filters, columnFilters: _this.state.filters, multiple: filterBarMultiple, getPopupContainer: _this.getPopupContainer });
                return [bar, table];
            }
            return table;
        };
        warning(!('columnsPageRange' in props || 'columnsPageSize' in props), '`columnsPageRange` and `columnsPageSize` are removed, please use fixed columns instead');
        _this.columns = props.columns || normalizeColumns(props.children);
        _this.createComponents(props.components);
        _this.state = _extends({}, _this.getDefaultSortOrder(_this.columns), {
            // 减少状态
            filters: _this.getFiltersFromColumns(),
            barFilters: props.filters || [],
            pagination: _this.getDefaultPagination(props)
        });
        _this.CheckboxPropsCache = {};
        _this.store = createStore({
            selectedRowKeys: (props.rowSelection || {}).selectedRowKeys || [],
            selectionDirty: false
        });
        return _this;
    }

    _createClass(Table, [{
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return _getPrefixCls('table', this.props.prefixCls);
        }
    }, {
        key: 'getDefaultSelection',
        value: function getDefaultSelection() {
            var _this2 = this;

            var _props$rowSelection = this.props.rowSelection,
                rowSelection = _props$rowSelection === undefined ? {} : _props$rowSelection;

            if (!rowSelection.getCheckboxProps) {
                return [];
            }
            return this.getFlatData().filter(function (item, rowIndex) {
                return _this2.getCheckboxPropsByItem(item, rowIndex).defaultChecked;
            }).map(function (record, rowIndex) {
                return _this2.getRecordKey(record, rowIndex);
            });
        }
    }, {
        key: 'getDefaultPagination',
        value: function getDefaultPagination(props) {
            var pagination = props.pagination || {};
            return this.hasPagination(props) ? _extends({}, defaultPagination, {
                size: props.size
            }, pagination, {
                current: pagination.defaultCurrent || pagination.current || 1,
                pageSize: pagination.defaultPageSize || pagination.pageSize || 10
            }) : {};
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.columns = nextProps.columns || normalizeColumns(nextProps.children);
            if ('pagination' in nextProps || 'pagination' in this.props) {
                this.setState(function (previousState) {
                    var newPagination = _extends({}, defaultPagination, {
                        size: nextProps.size
                    }, previousState.pagination, nextProps.pagination);
                    newPagination.current = newPagination.current || 1;
                    newPagination.pageSize = newPagination.pageSize || 10;
                    return { pagination: nextProps.pagination !== false ? newPagination : emptyObject };
                });
            }
            if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
                this.store.setState({
                    selectedRowKeys: nextProps.rowSelection.selectedRowKeys || []
                });
                var rowSelection = this.props.rowSelection;

                if (rowSelection && nextProps.rowSelection.getCheckboxProps !== rowSelection.getCheckboxProps) {
                    this.CheckboxPropsCache = {};
                }
            }
            if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
                this.store.setState({
                    selectionDirty: false
                });
                this.CheckboxPropsCache = {};
            }
            if (this.getSortOrderColumns(this.columns).length > 0) {
                var sortState = this.getSortStateFromColumns(this.columns);
                if (sortState.sortColumn !== this.state.sortColumn || sortState.sortOrder !== this.state.sortOrder) {
                    this.setState(sortState);
                }
            }
            var filteredValueColumns = this.getFilteredValueColumns(this.columns);
            if (filteredValueColumns.length > 0) {
                var filtersFromColumns = this.getFiltersFromColumns(this.columns);
                var newFilters = _extends({}, this.state.filters);
                Object.keys(filtersFromColumns).forEach(function (key) {
                    newFilters[key] = filtersFromColumns[key];
                });
                if (this.isFiltersChanged(newFilters)) {
                    this.setState({ filters: newFilters });
                }
            }
            if ('filters' in nextProps) {
                this.setState({
                    barFilters: nextProps.filters || []
                });
            }
            this.createComponents(nextProps.components, this.props.components);
        }
    }, {
        key: 'setSelectedRowKeys',
        value: function setSelectedRowKeys(selectedRowKeys, _ref) {
            var _this3 = this;

            var selectWay = _ref.selectWay,
                record = _ref.record,
                checked = _ref.checked,
                changeRowKeys = _ref.changeRowKeys,
                nativeEvent = _ref.nativeEvent;
            var _props$rowSelection2 = this.props.rowSelection,
                rowSelection = _props$rowSelection2 === undefined ? {} : _props$rowSelection2;

            if (rowSelection && !('selectedRowKeys' in rowSelection)) {
                this.store.setState({ selectedRowKeys: selectedRowKeys });
            }
            var data = this.getFlatData();
            if (!rowSelection.onChange && !rowSelection[selectWay]) {
                return;
            }
            var selectedRows = data.filter(function (row, i) {
                return selectedRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
            });
            if (rowSelection.onChange) {
                rowSelection.onChange(selectedRowKeys, selectedRows);
            }
            if (selectWay === 'onSelect' && rowSelection.onSelect) {
                rowSelection.onSelect(record, checked, selectedRows, nativeEvent);
            } else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
                var changeRows = data.filter(function (row, i) {
                    return changeRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
                });
                rowSelection.onSelectAll(checked, selectedRows, changeRows);
            } else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
                rowSelection.onSelectInvert(selectedRowKeys);
            }
        }
    }, {
        key: 'hasPagination',
        value: function hasPagination(props) {
            return (props || this.props).pagination !== false;
        }
    }, {
        key: 'isFiltersChanged',
        value: function isFiltersChanged(filters) {
            var _this4 = this;

            var filtersChanged = false;
            if (Object.keys(filters).length !== Object.keys(this.state.filters).length) {
                filtersChanged = true;
            } else {
                Object.keys(filters).forEach(function (columnKey) {
                    if (filters[columnKey] !== _this4.state.filters[columnKey]) {
                        filtersChanged = true;
                    }
                });
            }
            return filtersChanged;
        }
    }, {
        key: 'getSortOrderColumns',
        value: function getSortOrderColumns(columns) {
            return flatFilter(columns || this.columns || [], function (column) {
                return 'sortOrder' in column;
            });
        }
    }, {
        key: 'getFilteredValueColumns',
        value: function getFilteredValueColumns(columns) {
            return flatFilter(columns || this.columns || [], function (column) {
                return typeof column.filteredValue !== 'undefined';
            });
        }
    }, {
        key: 'getFiltersFromColumns',
        value: function getFiltersFromColumns(columns) {
            var _this5 = this;

            var filters = {};
            this.getFilteredValueColumns(columns).forEach(function (col) {
                var colKey = _this5.getColumnKey(col);
                filters[colKey] = col.filteredValue;
            });
            return filters;
        }
    }, {
        key: 'getDefaultSortOrder',
        value: function getDefaultSortOrder(columns) {
            var definedSortState = this.getSortStateFromColumns(columns);
            var defaultSortedColumn = flatFilter(columns || [], function (column) {
                return column.defaultSortOrder != null;
            })[0];
            if (defaultSortedColumn && !definedSortState.sortColumn) {
                return {
                    sortColumn: defaultSortedColumn,
                    sortOrder: defaultSortedColumn.defaultSortOrder
                };
            }
            return definedSortState;
        }
    }, {
        key: 'getSortStateFromColumns',
        value: function getSortStateFromColumns(columns) {
            // return first column which sortOrder is not falsy
            var sortedColumn = this.getSortOrderColumns(columns).filter(function (col) {
                return col.sortOrder;
            })[0];
            if (sortedColumn) {
                return {
                    sortColumn: sortedColumn,
                    sortOrder: sortedColumn.sortOrder
                };
            }
            return {
                sortColumn: null,
                sortOrder: null
            };
        }
    }, {
        key: 'getSorterFn',
        value: function getSorterFn() {
            var _state = this.state,
                sortOrder = _state.sortOrder,
                sortColumn = _state.sortColumn;

            if (!sortOrder || !sortColumn || typeof sortColumn.sorter !== 'function') {
                return;
            }
            return function (a, b) {
                var result = sortColumn.sorter(a, b);
                if (result !== 0) {
                    return sortOrder === 'descend' ? -result : result;
                }
                return 0;
            };
        }
    }, {
        key: 'setSortOrder',
        value: function setSortOrder(order, column) {
            var newState = {
                sortOrder: order,
                sortColumn: column
            };
            // Controlled
            if (this.getSortOrderColumns().length === 0) {
                this.setState(newState);
            }
            var onChange = this.props.onChange;
            if (onChange) {
                onChange.apply(null, this.prepareParamsArguments(_extends({}, this.state, newState)));
            }
        }
    }, {
        key: 'toggleSortOrder',
        value: function toggleSortOrder(order, column) {
            var _state2 = this.state,
                sortColumn = _state2.sortColumn,
                sortOrder = _state2.sortOrder;
            // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题

            var isSortColumn = this.isSortColumn(column);
            if (!isSortColumn) {
                // 当前列未排序
                sortOrder = order;
                sortColumn = column;
            } else {
                // 当前列已排序
                if (sortOrder === order) {
                    // 切换为未排序状态
                    sortOrder = '';
                    sortColumn = null;
                } else {
                    // 切换为排序状态
                    sortOrder = order;
                }
            }
            var newState = {
                sortOrder: sortOrder,
                sortColumn: sortColumn
            };
            // Controlled
            if (this.getSortOrderColumns().length === 0) {
                this.setState(newState);
            }
            var onChange = this.props.onChange;
            if (onChange) {
                onChange.apply(null, this.prepareParamsArguments(_extends({}, this.state, newState)));
            }
        }
    }, {
        key: 'setNewFilterState',
        value: function setNewFilterState(newState) {
            var _this6 = this;

            var props = this.props;
            var pagination = _extends({}, this.state.pagination);
            if (props.pagination) {
                // Reset current prop
                pagination.current = 1;
                pagination.onChange(pagination.current);
            }
            // Controlled current prop will not respond user interaction
            if (_typeof(props.pagination) === 'object' && 'current' in props.pagination) {
                newState.pagination = _extends({}, pagination, {
                    current: this.state.pagination.current
                });
            }
            this.setState(newState, function () {
                _this6.store.setState({
                    selectionDirty: false
                });
                var onChange = _this6.props.onChange;
                if (onChange) {
                    onChange.apply(null, _this6.prepareParamsArguments(_extends({}, _this6.state, {
                        selectionDirty: false,
                        pagination: pagination
                    })));
                }
            });
        }
    }, {
        key: 'renderRowSelection',
        value: function renderRowSelection(locale) {
            var _this7 = this;

            var rowSelection = this.props.rowSelection;

            var prefixCls = this.getPrefixCls();
            var columns = this.columns.concat();
            if (rowSelection) {
                var data = this.getFlatCurrentPageData().filter(function (item, index) {
                    if (rowSelection.getCheckboxProps) {
                        return !_this7.getCheckboxPropsByItem(item, index).disabled;
                    }
                    return true;
                });
                var selectionColumnClass = classNames(prefixCls + '-selection-column', _defineProperty({}, prefixCls + '-selection-column-custom', rowSelection.selections));
                var selectionColumn = {
                    key: 'selection-column',
                    render: this.renderSelectionBox(rowSelection.type),
                    className: selectionColumnClass,
                    fixed: rowSelection.fixed,
                    width: rowSelection.columnWidth
                };
                if (rowSelection.type !== 'radio') {
                    var checkboxAllDisabled = data.every(function (item, index) {
                        return _this7.getCheckboxPropsByItem(item, index).disabled;
                    });
                    selectionColumn.title = React.createElement(SelectionCheckboxAll, { store: this.store, locale: locale, data: data, getCheckboxPropsByItem: this.getCheckboxPropsByItem, getRecordKey: this.getRecordKey, disabled: checkboxAllDisabled, prefixCls: prefixCls, onSelect: this.handleSelectRow, selections: rowSelection.selections, hideDefaultSelections: rowSelection.hideDefaultSelections, getPopupContainer: this.getPopupContainer });
                }
                if ('fixed' in rowSelection) {
                    selectionColumn.fixed = rowSelection.fixed;
                } else if (columns.some(function (column) {
                    return column.fixed === 'left' || column.fixed === true;
                })) {
                    selectionColumn.fixed = 'left';
                }
                if (columns[0] && columns[0].key === 'selection-column') {
                    columns[0] = selectionColumn;
                } else {
                    columns.unshift(selectionColumn);
                }
            }
            return columns;
        }
    }, {
        key: 'getColumnKey',
        value: function getColumnKey(column, index) {
            return _getColumnKey(column, index);
        }
    }, {
        key: 'getMaxCurrent',
        value: function getMaxCurrent(total) {
            var _state$pagination = this.state.pagination,
                current = _state$pagination.current,
                pageSize = _state$pagination.pageSize;

            if ((current - 1) * pageSize >= total) {
                return Math.floor((total - 1) / pageSize) + 1;
            }
            return current;
        }
    }, {
        key: 'isSortColumn',
        value: function isSortColumn(column) {
            var sortColumn = this.state.sortColumn;

            if (!column || !sortColumn) {
                return false;
            }
            return this.getColumnKey(sortColumn) === this.getColumnKey(column);
        }
    }, {
        key: 'renderColumnsDropdown',
        value: function renderColumnsDropdown(columns, locale) {
            var _this8 = this;

            var _props = this.props,
                customizeDropdownPrefixCls = _props.dropdownPrefixCls,
                filterBar = _props.filterBar;

            var prefixCls = this.getPrefixCls();
            var dropdownPrefixCls = _getPrefixCls('dropdown', customizeDropdownPrefixCls);
            var sortOrder = this.state.sortOrder;

            return treeMap(columns, function (originColumn, i) {
                var column = _extends({}, originColumn);
                var key = _this8.getColumnKey(column, i);
                var filterDropdown = void 0;
                var sortButton = void 0;
                if (!filterBar && column.filters && column.filters.length > 0 || column.filterDropdown) {
                    var colFilters = _this8.state.filters[key] || [];
                    filterDropdown = React.createElement(FilterDropdown, { locale: locale, column: column, selectedKeys: colFilters, confirmFilter: _this8.handleFilter, prefixCls: prefixCls + '-filter', dropdownPrefixCls: dropdownPrefixCls, getPopupContainer: _this8.getPopupContainer });
                }
                if (column.sorter) {
                    var isSortColumn = _this8.isSortColumn(column);
                    var isAscend = isSortColumn && sortOrder === 'ascend';
                    // const isDescend = isSortColumn && sortOrder === 'descend';
                    column.className = classNames(column.className, _defineProperty({}, prefixCls + '-sort-' + sortOrder, isSortColumn));
                    var onHeaderCell = column.onHeaderCell;

                    column.onHeaderCell = function (col) {
                        var customProps = onHeaderCell && onHeaderCell(col) || {};
                        var _onClick = customProps.onClick;

                        return _extends({}, customProps, {
                            onClick: function onClick(e) {
                                if (!e.isDefaultPrevented()) {
                                    if (typeof _onClick === 'function') {
                                        _onClick(e);
                                    }
                                    if (!e.isDefaultPrevented()) {
                                        _this8.setSortOrder(isAscend ? 'descend' : 'ascend', column);
                                    }
                                }
                            }
                        });
                    };
                    sortButton = React.createElement(Icon, { type: 'arrow_upward', className: prefixCls + '-sort-icon' });
                }
                column.title = React.createElement(
                    'span',
                    { key: key },
                    column.title,
                    sortButton,
                    filterDropdown
                );
                if (sortButton || filterDropdown) {
                    column.className = classNames(prefixCls + '-column-has-filters', column.className);
                }
                return column;
            });
        }
    }, {
        key: 'renderPagination',
        value: function renderPagination(paginationPosition) {
            // 强制不需要分页
            if (!this.hasPagination()) {
                return null;
            }
            var pagination = this.state.pagination;

            var prefixCls = this.getPrefixCls();
            var position = pagination.position || 'bottom';
            var total = pagination.total || this.getLocalData().length;
            return total > 0 && (position === paginationPosition || position === 'both') ? React.createElement(Pagination, _extends({ key: 'pagination-' + paginationPosition }, pagination, { className: classNames(pagination.className, prefixCls + '-pagination'), onChange: this.handlePageChange, total: total, size: pagination.size || this.props.size, current: this.getMaxCurrent(total), onShowSizeChange: this.handleShowSizeChange })) : null;
        }
        // Get pagination, filters, sorter

    }, {
        key: 'prepareParamsArguments',
        value: function prepareParamsArguments(state) {
            var pagination = _extends({}, state.pagination);
            // remove useless handle function in Table.onChange
            delete pagination.onChange;
            delete pagination.onShowSizeChange;
            delete pagination.showTotal;
            delete pagination.sizeChangerOptionText;
            var filters = state.filters;
            var barFilters = state.barFilters;
            var sorter = {};
            if (state.sortColumn && state.sortOrder) {
                sorter.column = state.sortColumn;
                sorter.order = state.sortOrder;
                sorter.field = state.sortColumn.dataIndex;
                sorter.columnKey = this.getColumnKey(state.sortColumn);
            }
            return [pagination, filters, sorter, barFilters];
        }
    }, {
        key: 'findColumn',
        value: function findColumn(myKey) {
            var _this9 = this;

            var column = void 0;
            treeMap(this.columns, function (c) {
                if (_this9.getColumnKey(c) === myKey) {
                    column = c;
                }
            });
            return column;
        }
    }, {
        key: 'getCurrentPageData',
        value: function getCurrentPageData() {
            var data = this.getLocalData();
            var current = void 0;
            var pageSize = void 0;
            var state = this.state;
            // 如果没有分页的话，默认全部展示
            if (!this.hasPagination()) {
                pageSize = Number.MAX_VALUE;
                current = 1;
            } else {
                pageSize = state.pagination.pageSize;
                current = this.getMaxCurrent(state.pagination.total || data.length);
            }
            // 分页
            // ---
            // 当数据量少于等于每页数量时，直接设置数据
            // 否则进行读取分页数据
            if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
                data = data.filter(function (_, i) {
                    return i >= (current - 1) * pageSize && i < current * pageSize;
                });
            }
            return data;
        }
    }, {
        key: 'getFlatData',
        value: function getFlatData() {
            return flatArray(this.getLocalData(), this.props.childrenColumnName);
        }
    }, {
        key: 'getFlatCurrentPageData',
        value: function getFlatCurrentPageData() {
            return flatArray(this.getCurrentPageData(), this.props.childrenColumnName);
        }
    }, {
        key: 'recursiveSort',
        value: function recursiveSort(data, sorterFn) {
            var _this10 = this;

            var _props$childrenColumn = this.props.childrenColumnName,
                childrenColumnName = _props$childrenColumn === undefined ? 'children' : _props$childrenColumn;

            return data.sort(sorterFn).map(function (item) {
                return item[childrenColumnName] ? _extends({}, item, _defineProperty({}, childrenColumnName, _this10.recursiveSort(item[childrenColumnName], sorterFn))) : item;
            });
        }
    }, {
        key: 'getLocalData',
        value: function getLocalData() {
            var _this11 = this;

            var _props2 = this.props,
                dataSource = _props2.dataSource,
                noFilter = _props2.noFilter;

            if (dataSource) {
                var state = this.state;
                var filters = state.filters,
                    barFilters = state.barFilters;

                var data = dataSource;
                // 优化本地排序
                data = data.slice(0);
                var sorterFn = this.getSorterFn();
                if (sorterFn) {
                    data = this.recursiveSort(data, sorterFn);
                }
                var filteredData = data;
                // 筛选
                if (filters) {
                    Object.keys(filters).forEach(function (columnKey) {
                        var col = _this11.findColumn(columnKey);
                        if (!col) {
                            return;
                        }
                        var values = filters[columnKey] || [];
                        if (values.length === 0) {
                            return;
                        }
                        var onFilter = col.onFilter,
                            columnFilters = col.filters;

                        filteredData = onFilter ? filteredData.filter(function (record) {
                            return values.some(function (v) {
                                return onFilter(v, record, columnFilters);
                            });
                        }) : filteredData;
                    });
                }
                if (barFilters.length) {
                    var isOr = false;
                    barFilters.forEach(function (filter) {
                        if (filter === VALUE_OR) {
                            isOr = true;
                        } else {
                            filteredData = data.filter(function (record) {
                                return isOr ? filteredData.indexOf(record) !== -1 || _this11.doBarFilter(filter, record) : filteredData.indexOf(record) !== -1 && _this11.doBarFilter(filter, record);
                            });
                            isOr = false;
                        }
                    });
                }
                if (noFilter) {
                    return data;
                }
                return filteredData;
            } else {
                return [];
            }
        }
    }, {
        key: 'doBarFilter',
        value: function doBarFilter(filter, record) {
            if (typeof filter === 'string') {
                return !!findColumnByFilterValue(record, getLeafColumns(this.columns), filter);
            } else {
                var columnKey = Object.keys(filter)[0];
                var col = this.findColumn(columnKey);
                if (!col) {
                    return true;
                }
                var onFilter = col.onFilter,
                    filters = col.filters;

                return !onFilter || onFilter(filter[columnKey], record, filters);
            }
        }
    }, {
        key: 'createComponents',
        value: function createComponents() {
            var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var prevComponents = arguments[1];

            var bodyRow = components && components.body && components.body.row;
            var preBodyRow = prevComponents && prevComponents.body && prevComponents.body.row;
            if (!this.components || bodyRow !== preBodyRow) {
                this.components = _extends({}, components);
                this.components.body = _extends({}, components.body, {
                    row: createBodyRow(bodyRow)
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this12 = this;

            var _props3 = this.props,
                style = _props3.style,
                className = _props3.className;

            var prefixCls = this.getPrefixCls();
            var data = this.getCurrentPageData();
            var loading = this.props.loading;
            if (typeof loading === 'boolean') {
                loading = {
                    spinning: loading
                };
            }
            var table = React.createElement(
                LocaleReceiver,
                { componentName: 'Table', defaultLocale: defaultLocale.Table },
                function (locale) {
                    return _this12.renderTable(locale, loading);
                }
            );
            // if there is no pagination or no data,
            // the height of spin should decrease by half of pagination
            var paginationPatchClass = this.hasPagination() && data && data.length !== 0 ? prefixCls + '-with-pagination' : prefixCls + '-without-pagination';
            return React.createElement(
                'div',
                { className: classNames(prefixCls + '-wrapper', className), style: style, ref: this.saveRef },
                React.createElement(
                    Spin,
                    _extends({}, loading, { className: loading.spinning ? paginationPatchClass + ' ' + prefixCls + '-spin-holder' : '' }),
                    this.renderPagination('top'),
                    table,
                    this.renderPagination('bottom')
                )
            );
        }
    }]);

    return Table;
}(Component);

export default Table;

Table.displayName = 'Table';
Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.propTypes = {
    dataSource: PropTypes.array,
    empty: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onColumnFilterChange: PropTypes.func,
    columns: PropTypes.array,
    prefixCls: PropTypes.string,
    useFixedHeader: PropTypes.bool,
    rowSelection: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.oneOf(["large" /* large */, "default" /* default */, "small" /* small */]),
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    bordered: PropTypes.bool,
    onChange: PropTypes.func,
    locale: PropTypes.object,
    dropdownPrefixCls: PropTypes.string,
    filterBar: PropTypes.bool,
    filters: PropTypes.array,
    filterBarPlaceholder: PropTypes.string,
    onFilterSelectChange: PropTypes.func,
    noFilter: PropTypes.bool,
    autoScroll: PropTypes.bool
};
Table.defaultProps = {
    dataSource: [],
    empty: null,
    useFixedHeader: false,
    rowSelection: null,
    className: '',
    size: "default" /* default */
    , loading: false,
    bordered: false,
    indentSize: 20,
    locale: {},
    rowKey: 'key',
    showHeader: true,
    filterBar: true,
    noFilter: false,
    autoScroll: true
};