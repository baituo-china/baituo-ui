import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import FilterSelect from './FilterSelect';
import ColumnFilter from './ColumnFilter';
import { $l } from '../locale-context';

var FilterBar = function (_PureComponent) {
    _inherits(FilterBar, _PureComponent);

    function FilterBar() {
        _classCallCheck(this, FilterBar);

        var _this = _possibleConstructorReturn(this, (FilterBar.__proto__ || Object.getPrototypeOf(FilterBar)).apply(this, arguments));

        _this.handleChange = function () {
            var dataSet = _this.props.dataSet;

            dataSet.query();
        };
        return _this;
    }

    _createClass(FilterBar, [{
        key: 'renderSuffix',
        value: function renderSuffix() {
            var prefixCls = this.props.prefixCls;

            return React.createElement(ColumnFilter, { prefixCls: prefixCls });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                dataSet = _props.dataSet,
                paramName = _props.paramName,
                _props$placeholder = _props.placeholder,
                placeholder = _props$placeholder === undefined ? $l('Table', 'filter_bar_placeholder') : _props$placeholder;

            return React.createElement(FilterSelect, { prefixCls: prefixCls + '-filter-select', optionDataSet: dataSet, placeholder: placeholder, suffix: this.renderSuffix(), paramName: paramName, onChange: this.handleChange });
        }
    }]);

    return FilterBar;
}(PureComponent);

export default FilterBar;

;