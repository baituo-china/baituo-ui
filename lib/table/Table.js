'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _pagination = require('../pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _spin = require('../spin');

var _spin2 = _interopRequireDefault(_spin);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _default = require('../locale-provider/default');

var _default2 = _interopRequireDefault(_default);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _filterDropdown = require('./filterDropdown');

var _filterDropdown2 = _interopRequireDefault(_filterDropdown);

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _SelectionBox = require('./SelectionBox');

var _SelectionBox2 = _interopRequireDefault(_SelectionBox);

var _SelectionCheckboxAll = require('./SelectionCheckboxAll');

var _SelectionCheckboxAll2 = _interopRequireDefault(_SelectionCheckboxAll);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

var _ColumnGroup = require('./ColumnGroup');

var _ColumnGroup2 = _interopRequireDefault(_ColumnGroup);

var _createBodyRow = require('./createBodyRow');

var _createBodyRow2 = _interopRequireDefault(_createBodyRow);

var _util = require('./util');

var _FilterBar = require('./FilterBar');

var _FilterBar2 = _interopRequireDefault(_FilterBar);

var _FilterSelect = require('./FilterSelect');

var _table = require('../rc-components/table');

var _table2 = _interopRequireDefault(_table);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
    onChange: _noop2['default'],
    onShowSizeChange: _noop2['default']
};
/**
 * Avoid creating new object, so that parent component's shouldComponentUpdate
 * can works appropriately。
 */
var emptyObject = {};

var Table = function (_Component) {
    (0, _inherits3['default'])(Table, _Component);

    function Table(props) {
        (0, _classCallCheck3['default'])(this, Table);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

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
            return (0, _extends5['default'])({}, custom, {
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
            var filters = (0, _extends5['default'])({}, _this.state.filters, (0, _defineProperty3['default'])({}, _this.getColumnKey(column), nextFilters));
            // Remove filters not in current columns
            var currentColumnKeys = [];
            (0, _util.treeMap)(_this.columns, function (c) {
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
            var pagination = (0, _extends5['default'])({}, _this.state.pagination);
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
            if (props.pagination && (0, _typeof3['default'])(props.pagination) === 'object' && 'current' in props.pagination) {
                newState.pagination = (0, _extends5['default'])({}, pagination, {
                    current: _this.state.pagination.current
                });
            }
            _this.setState(newState);
            _this.store.setState({
                selectionDirty: false
            });
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange.apply(null, _this.prepareParamsArguments((0, _extends5['default'])({}, _this.state, {
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
                return _react2['default'].createElement(
                    'span',
                    { onClick: stopPropagation },
                    _react2['default'].createElement(_SelectionBox2['default'], (0, _extends5['default'])({ type: type, store: _this.store, rowIndex: rowIndex, onChange: handleChange, defaultSelection: _this.getDefaultSelection() }, props))
                );
            };
        };
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey;
            var recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
            (0, _warning2['default'])(recordKey !== undefined, 'Each record in dataSource of table should have a unique `key` prop, or set `rowKey` to an unique primary key');
            return recordKey === undefined ? index : recordKey;
        };
        _this.getPopupContainer = function () {
            return (0, _reactDom.findDOMNode)(_this);
        };
        _this.handleShowSizeChange = function (current, pageSize) {
            var pagination = _this.state.pagination;
            pagination.onShowSizeChange(current, pageSize);
            var nextPagination = (0, _extends5['default'])({}, pagination, {
                pageSize: pageSize,
                current: current
            });
            _this.setState({ pagination: nextPagination });
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange.apply(null, _this.prepareParamsArguments((0, _extends5['default'])({}, _this.state, {
                    pagination: nextPagination
                })));
            }
        };
        _this.renderTable = function (contextLocale, loading) {
            var _classNames;

            var locale = (0, _extends5['default'])({}, contextLocale, _this.props.locale);
            var _this$props = _this.props,
                filterBarMultiple = _this$props.filterBarMultiple,
                filterBarPlaceholder = _this$props.filterBarPlaceholder,
                showHeader = _this$props.showHeader,
                filterBar = _this$props.filterBar,
                dataSource = _this$props.dataSource,
                filters = _this$props.filters,
                empty = _this$props.empty,
                restProps = (0, _objectWithoutProperties3['default'])(_this$props, ['filterBarMultiple', 'filterBarPlaceholder', 'showHeader', 'filterBar', 'dataSource', 'filters', 'empty']);

            var prefixCls = _this.getPrefixCls();
            var data = _this.getCurrentPageData();
            var expandIconAsCell = _this.props.expandedRowRender && _this.props.expandIconAsCell !== false;
            var classString = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + _this.props.size, true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-bordered', _this.props.bordered), (0, _defineProperty3['default'])(_classNames, prefixCls + '-empty', !data.length), (0, _defineProperty3['default'])(_classNames, prefixCls + '-without-column-header', !showHeader), _classNames));
            var columns = _this.renderRowSelection(locale);
            columns = _this.renderColumnsDropdown(columns, locale);
            columns = columns.map(function (column, i) {
                var newColumn = (0, _extends5['default'])({}, column);
                newColumn.key = _this.getColumnKey(newColumn, i);
                return newColumn;
            });
            columns = (0, _util.removeHiddenColumns)(columns);
            var expandIconColumnIndex = columns[0] && columns[0].key === 'selection-column' ? 1 : 0;
            if ('expandIconColumnIndex' in restProps) {
                expandIconColumnIndex = restProps.expandIconColumnIndex;
            }
            var table = _react2['default'].createElement(_table2['default'], (0, _extends5['default'])({ key: 'table' }, restProps, { onRow: _this.onRow, components: _this.components, prefixCls: prefixCls, data: data, columns: columns, showHeader: showHeader, className: classString, expandIconColumnIndex: expandIconColumnIndex, expandIconAsCell: expandIconAsCell, emptyText: !loading.spinning && (empty || locale.emptyText) }));
            if (filterBar) {
                var bar = _react2['default'].createElement(_FilterBar2['default'], { key: 'filter-bar', prefixCls: prefixCls, placeholder: filterBarPlaceholder, columns: (0, _util.getLeafColumns)(_this.columns), onFilterSelectChange: _this.handleFilterSelectChange, onFilterSelectClear: _this.handleFilterSelectClear, onColumnFilterChange: _this.handleColumnFilterChange, onFilter: _this.handleFilter, dataSource: dataSource, filters: filters, columnFilters: _this.state.filters, multiple: filterBarMultiple, getPopupContainer: _this.getPopupContainer });
                return [bar, table];
            }
            return table;
        };
        (0, _warning2['default'])(!('columnsPageRange' in props || 'columnsPageSize' in props), '`columnsPageRange` and `columnsPageSize` are removed, please use fixed columns instead');
        _this.columns = props.columns || (0, _util.normalizeColumns)(props.children);
        _this.createComponents(props.components);
        _this.state = (0, _extends5['default'])({}, _this.getDefaultSortOrder(_this.columns), {
            // 减少状态
            filters: _this.getFiltersFromColumns(),
            barFilters: props.filters || [],
            pagination: _this.getDefaultPagination(props)
        });
        _this.CheckboxPropsCache = {};
        _this.store = (0, _createStore2['default'])({
            selectedRowKeys: (props.rowSelection || {}).selectedRowKeys || [],
            selectionDirty: false
        });
        return _this;
    }

    (0, _createClass3['default'])(Table, [{
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('table', this.props.prefixCls);
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
            return this.hasPagination(props) ? (0, _extends5['default'])({}, defaultPagination, {
                size: props.size
            }, pagination, {
                current: pagination.defaultCurrent || pagination.current || 1,
                pageSize: pagination.defaultPageSize || pagination.pageSize || 10
            }) : {};
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.columns = nextProps.columns || (0, _util.normalizeColumns)(nextProps.children);
            if ('pagination' in nextProps || 'pagination' in this.props) {
                this.setState(function (previousState) {
                    var newPagination = (0, _extends5['default'])({}, defaultPagination, {
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
                var newFilters = (0, _extends5['default'])({}, this.state.filters);
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
            return (0, _util.flatFilter)(columns || this.columns || [], function (column) {
                return 'sortOrder' in column;
            });
        }
    }, {
        key: 'getFilteredValueColumns',
        value: function getFilteredValueColumns(columns) {
            return (0, _util.flatFilter)(columns || this.columns || [], function (column) {
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
            var defaultSortedColumn = (0, _util.flatFilter)(columns || [], function (column) {
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
                onChange.apply(null, this.prepareParamsArguments((0, _extends5['default'])({}, this.state, newState)));
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
                onChange.apply(null, this.prepareParamsArguments((0, _extends5['default'])({}, this.state, newState)));
            }
        }
    }, {
        key: 'setNewFilterState',
        value: function setNewFilterState(newState) {
            var _this6 = this;

            var props = this.props;
            var pagination = (0, _extends5['default'])({}, this.state.pagination);
            if (props.pagination) {
                // Reset current prop
                pagination.current = 1;
                pagination.onChange(pagination.current);
            }
            // Controlled current prop will not respond user interaction
            if ((0, _typeof3['default'])(props.pagination) === 'object' && 'current' in props.pagination) {
                newState.pagination = (0, _extends5['default'])({}, pagination, {
                    current: this.state.pagination.current
                });
            }
            this.setState(newState, function () {
                _this6.store.setState({
                    selectionDirty: false
                });
                var onChange = _this6.props.onChange;
                if (onChange) {
                    onChange.apply(null, _this6.prepareParamsArguments((0, _extends5['default'])({}, _this6.state, {
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
                var selectionColumnClass = (0, _classnames2['default'])(prefixCls + '-selection-column', (0, _defineProperty3['default'])({}, prefixCls + '-selection-column-custom', rowSelection.selections));
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
                    selectionColumn.title = _react2['default'].createElement(_SelectionCheckboxAll2['default'], { store: this.store, locale: locale, data: data, getCheckboxPropsByItem: this.getCheckboxPropsByItem, getRecordKey: this.getRecordKey, disabled: checkboxAllDisabled, prefixCls: prefixCls, onSelect: this.handleSelectRow, selections: rowSelection.selections, hideDefaultSelections: rowSelection.hideDefaultSelections, getPopupContainer: this.getPopupContainer });
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
            return (0, _util.getColumnKey)(column, index);
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
            var dropdownPrefixCls = (0, _configure.getPrefixCls)('dropdown', customizeDropdownPrefixCls);
            var sortOrder = this.state.sortOrder;

            return (0, _util.treeMap)(columns, function (originColumn, i) {
                var column = (0, _extends5['default'])({}, originColumn);
                var key = _this8.getColumnKey(column, i);
                var filterDropdown = void 0;
                var sortButton = void 0;
                if (!filterBar && column.filters && column.filters.length > 0 || column.filterDropdown) {
                    var colFilters = _this8.state.filters[key] || [];
                    filterDropdown = _react2['default'].createElement(_filterDropdown2['default'], { locale: locale, column: column, selectedKeys: colFilters, confirmFilter: _this8.handleFilter, prefixCls: prefixCls + '-filter', dropdownPrefixCls: dropdownPrefixCls, getPopupContainer: _this8.getPopupContainer });
                }
                if (column.sorter) {
                    var isSortColumn = _this8.isSortColumn(column);
                    var isAscend = isSortColumn && sortOrder === 'ascend';
                    // const isDescend = isSortColumn && sortOrder === 'descend';
                    column.className = (0, _classnames2['default'])(column.className, (0, _defineProperty3['default'])({}, prefixCls + '-sort-' + sortOrder, isSortColumn));
                    var onHeaderCell = column.onHeaderCell;

                    column.onHeaderCell = function (col) {
                        var customProps = onHeaderCell && onHeaderCell(col) || {};
                        var _onClick = customProps.onClick;

                        return (0, _extends5['default'])({}, customProps, {
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
                    sortButton = _react2['default'].createElement(_icon2['default'], { type: 'arrow_upward', className: prefixCls + '-sort-icon' });
                }
                column.title = _react2['default'].createElement(
                    'span',
                    { key: key },
                    column.title,
                    sortButton,
                    filterDropdown
                );
                if (sortButton || filterDropdown) {
                    column.className = (0, _classnames2['default'])(prefixCls + '-column-has-filters', column.className);
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
            return total > 0 && (position === paginationPosition || position === 'both') ? _react2['default'].createElement(_pagination2['default'], (0, _extends5['default'])({ key: 'pagination-' + paginationPosition }, pagination, { className: (0, _classnames2['default'])(pagination.className, prefixCls + '-pagination'), onChange: this.handlePageChange, total: total, size: pagination.size || this.props.size, current: this.getMaxCurrent(total), onShowSizeChange: this.handleShowSizeChange })) : null;
        }
        // Get pagination, filters, sorter

    }, {
        key: 'prepareParamsArguments',
        value: function prepareParamsArguments(state) {
            var pagination = (0, _extends5['default'])({}, state.pagination);
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
            (0, _util.treeMap)(this.columns, function (c) {
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
            return (0, _util.flatArray)(this.getLocalData(), this.props.childrenColumnName);
        }
    }, {
        key: 'getFlatCurrentPageData',
        value: function getFlatCurrentPageData() {
            return (0, _util.flatArray)(this.getCurrentPageData(), this.props.childrenColumnName);
        }
    }, {
        key: 'recursiveSort',
        value: function recursiveSort(data, sorterFn) {
            var _this10 = this;

            var _props$childrenColumn = this.props.childrenColumnName,
                childrenColumnName = _props$childrenColumn === undefined ? 'children' : _props$childrenColumn;

            return data.sort(sorterFn).map(function (item) {
                return item[childrenColumnName] ? (0, _extends5['default'])({}, item, (0, _defineProperty3['default'])({}, childrenColumnName, _this10.recursiveSort(item[childrenColumnName], sorterFn))) : item;
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
                        if (filter === _FilterSelect.VALUE_OR) {
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
                return !!(0, _util.findColumnByFilterValue)(record, (0, _util.getLeafColumns)(this.columns), filter);
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
                this.components = (0, _extends5['default'])({}, components);
                this.components.body = (0, _extends5['default'])({}, components.body, {
                    row: (0, _createBodyRow2['default'])(bodyRow)
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
            var table = _react2['default'].createElement(
                _LocaleReceiver2['default'],
                { componentName: 'Table', defaultLocale: _default2['default'].Table },
                function (locale) {
                    return _this12.renderTable(locale, loading);
                }
            );
            // if there is no pagination or no data,
            // the height of spin should decrease by half of pagination
            var paginationPatchClass = this.hasPagination() && data && data.length !== 0 ? prefixCls + '-with-pagination' : prefixCls + '-without-pagination';
            return _react2['default'].createElement(
                'div',
                { className: (0, _classnames2['default'])(prefixCls + '-wrapper', className), style: style, ref: this.saveRef },
                _react2['default'].createElement(
                    _spin2['default'],
                    (0, _extends5['default'])({}, loading, { className: loading.spinning ? paginationPatchClass + ' ' + prefixCls + '-spin-holder' : '' }),
                    this.renderPagination('top'),
                    table,
                    this.renderPagination('bottom')
                )
            );
        }
    }]);
    return Table;
}(_react.Component);

exports['default'] = Table;

Table.displayName = 'Table';
Table.Column = _Column2['default'];
Table.ColumnGroup = _ColumnGroup2['default'];
Table.propTypes = {
    dataSource: _propTypes2['default'].array,
    empty: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func]),
    onColumnFilterChange: _propTypes2['default'].func,
    columns: _propTypes2['default'].array,
    prefixCls: _propTypes2['default'].string,
    useFixedHeader: _propTypes2['default'].bool,
    rowSelection: _propTypes2['default'].object,
    className: _propTypes2['default'].string,
    size: _propTypes2['default'].oneOf(["large" /* large */, "default" /* default */, "small" /* small */]),
    loading: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
    bordered: _propTypes2['default'].bool,
    onChange: _propTypes2['default'].func,
    locale: _propTypes2['default'].object,
    dropdownPrefixCls: _propTypes2['default'].string,
    filterBar: _propTypes2['default'].bool,
    filters: _propTypes2['default'].array,
    filterBarPlaceholder: _propTypes2['default'].string,
    onFilterSelectChange: _propTypes2['default'].func,
    noFilter: _propTypes2['default'].bool,
    autoScroll: _propTypes2['default'].bool
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
module.exports = exports['default'];