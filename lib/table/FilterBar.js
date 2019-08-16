'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _FilterSelect = require('./FilterSelect');

var _FilterSelect2 = _interopRequireDefault(_FilterSelect);

var _ColumnFilter = require('./ColumnFilter');

var _ColumnFilter2 = _interopRequireDefault(_ColumnFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FilterBar = function (_Component) {
    (0, _inherits3['default'])(FilterBar, _Component);

    function FilterBar() {
        (0, _classCallCheck3['default'])(this, FilterBar);
        return (0, _possibleConstructorReturn3['default'])(this, (FilterBar.__proto__ || Object.getPrototypeOf(FilterBar)).apply(this, arguments));
    }

    (0, _createClass3['default'])(FilterBar, [{
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

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-filter-bar' },
                _react2['default'].createElement(_FilterSelect2['default'], { prefixCls: prefixCls, placeholder: placeholder, columns: columns, dataSource: dataSource, onChange: onFilterSelectChange, onClear: onFilterSelectClear, onFilter: onFilter, filters: filters, columnFilters: columnFilters, getPopupContainer: getPopupContainer, multiple: multiple }),
                _react2['default'].createElement(_ColumnFilter2['default'], { prefixCls: prefixCls, columns: columns, onColumnFilterChange: onColumnFilterChange, getPopupContainer: getPopupContainer })
            );
        }
    }]);
    return FilterBar;
}(_react.Component);

exports['default'] = FilterBar;

;
module.exports = exports['default'];