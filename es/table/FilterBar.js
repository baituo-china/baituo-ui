import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import FilterSelect from './FilterSelect';
import ColumnFilter from './ColumnFilter';

var FilterBar = function (_Component) {
    _inherits(FilterBar, _Component);

    function FilterBar() {
        _classCallCheck(this, FilterBar);

        return _possibleConstructorReturn(this, (FilterBar.__proto__ || Object.getPrototypeOf(FilterBar)).apply(this, arguments));
    }

    _createClass(FilterBar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                columns = _props.columns,
                onColumnFilterChange = _props.onColumnFilterChange,
                onFilterSelectChange = _props.onFilterSelectChange,
                onFilterSelectClear = _props.onFilterSelectClear,
                onFilter = _props.onFilter,
                dataSource = _props.dataSource,
                filters = _props.filters,
                columnFilters = _props.columnFilters,
                placeholder = _props.placeholder,
                multiple = _props.multiple,
                getPopupContainer = _props.getPopupContainer;

            return React.createElement(
                'div',
                { className: prefixCls + '-filter-bar' },
                React.createElement(FilterSelect, { prefixCls: prefixCls, placeholder: placeholder, columns: columns, dataSource: dataSource, onChange: onFilterSelectChange, onClear: onFilterSelectClear, onFilter: onFilter, filters: filters, columnFilters: columnFilters, getPopupContainer: getPopupContainer, multiple: multiple }),
                React.createElement(ColumnFilter, { prefixCls: prefixCls, columns: columns, onColumnFilterChange: onColumnFilterChange, getPopupContainer: getPopupContainer })
            );
        }
    }]);

    return FilterBar;
}(Component);

export default FilterBar;

;