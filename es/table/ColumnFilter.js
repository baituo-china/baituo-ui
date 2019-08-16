import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Button from '../button/Button';
import SelectTrigger from '../rc-components/select/SelectTrigger';
import { Item as MenuItem } from '../rc-components/menu';
import { UNSELECTABLE_ATTRIBUTE, UNSELECTABLE_STYLE } from '../rc-components/select/util';
import { getColumnKey } from './util';
import { getPrefixCls } from '../configure';

var ColumnFilter = function (_Component) {
    _inherits(ColumnFilter, _Component);

    function ColumnFilter() {
        _classCallCheck(this, ColumnFilter);

        var _this = _possibleConstructorReturn(this, (ColumnFilter.__proto__ || Object.getPrototypeOf(ColumnFilter)).apply(this, arguments));

        _this.state = {
            open: false
        };
        _this.onMenuSelect = function (item) {
            item.item.props.value.hidden = false;
            _this.fireChange(item);
        };
        _this.onMenuDeselect = function (item) {
            item.item.props.value.hidden = true;
            _this.fireChange(item);
        };
        _this.onDropdownVisibleChange = function (open) {
            if (_this.state.open !== open) {
                _this.setState({
                    open: open
                });
            }
        };
        return _this;
    }

    _createClass(ColumnFilter, [{
        key: 'render',
        value: function render() {
            var prefixCls = this.props.prefixCls;
            var open = this.state.open;

            return React.createElement(
                'div',
                { className: prefixCls + '-columns-chooser' },
                React.createElement(
                    SelectTrigger,
                    { prefixCls: getPrefixCls('select'), showAction: ['click'], options: this.getOptions(), value: this.getVisibleColumns(), getPopupContainer: this.props.getPopupContainer, multiple: true, onDropdownVisibleChange: this.onDropdownVisibleChange, onMenuSelect: this.onMenuSelect, onMenuDeselect: this.onMenuDeselect, visible: open, popupPlacement: 'bottomRight', dropdownMatchSelectWidth: false, dropdownStyle: { minWidth: 187 } },
                    React.createElement(Button, { shape: 'circle', icon: 'view_column', size: "small" /* small */ })
                )
            );
        }
    }, {
        key: 'fireChange',
        value: function fireChange(item) {
            var onColumnFilterChange = this.props.onColumnFilterChange;

            if (onColumnFilterChange) {
                onColumnFilterChange(item);
            }
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            var options = [];
            (this.props.columns || []).filter(function (column) {
                return !column.notDisplay;
            }).map(function (column, i) {
                var item = column.title ? React.createElement(
                    MenuItem,
                    { disabled: column.disableClick, style: UNSELECTABLE_STYLE, attribute: UNSELECTABLE_ATTRIBUTE, value: column, key: getColumnKey(column, i) },
                    column.title
                ) : null;
                if (item) {
                    options.push(item);
                }
            });
            return options;
        }
    }, {
        key: 'getVisibleColumns',
        value: function getVisibleColumns() {
            return (this.props.columns || []).filter(function (column) {
                return !column.hidden;
            });
        }
    }]);

    return ColumnFilter;
}(Component);

export default ColumnFilter;

ColumnFilter.displayName = 'ColumnFilter';