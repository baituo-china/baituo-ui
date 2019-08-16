import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import Menu, { Item } from '../../../es/rc-components/menu';
import Button from '../button/Button';
import Dropdown from '../dropdown/Dropdown';
import TableContext from './TableContext';
import { getColumnKey, getHeader } from './utils';
import { stopEvent, stopPropagation } from '../_util/EventManager';
import autobind from '../_util/autobind';
var ColumnFilter = function (_Component) {
    _inherits(ColumnFilter, _Component);

    function ColumnFilter(props, context) {
        _classCallCheck(this, ColumnFilter);

        var _this = _possibleConstructorReturn(this, (ColumnFilter.__proto__ || Object.getPrototypeOf(ColumnFilter)).call(this, props, context));

        _this.saveMenu = function (node) {
            return _this.menu = node;
        };
        _this.setDropDownHidden(true);
        return _this;
    }

    _createClass(ColumnFilter, [{
        key: 'handleHiddenChange',
        value: function handleHiddenChange(hidden) {
            this.setDropDownHidden(hidden);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (this.menu && this.menu.onKeyDown(e)) {
                stopEvent(e);
            }
        }
    }, {
        key: 'setDropDownHidden',
        value: function setDropDownHidden(hidden) {
            this.hidden = hidden;
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.props.prefixCls + '-columns-chooser';
            return React.createElement(
                'div',
                { className: prefixCls, onFocus: stopPropagation, onMouseDown: stopPropagation, tabIndex: -1 },
                React.createElement(
                    Dropdown,
                    { placement: "bottomRight" /* bottomRight */, overlay: this.getMenu(prefixCls), hidden: this.hidden, onHiddenChange: this.handleHiddenChange },
                    React.createElement(Button, { funcType: "flat" /* flat */, icon: 'view_column', size: "small" /* small */, onKeyDown: this.handleKeyDown })
                )
            );
        }
    }, {
        key: 'handleMenuSelect',
        value: function handleMenuSelect(_ref) {
            var value = _ref.item.props.value;

            value.hidden = false;
        }
    }, {
        key: 'handleMenuUnSelect',
        value: function handleMenuUnSelect(_ref2) {
            var value = _ref2.item.props.value;

            value.hidden = true;
        }
    }, {
        key: 'handleMenuClick',
        value: function handleMenuClick(_ref3) {
            var domEvent = _ref3.domEvent;

            domEvent.preventDefault();
        }
    }, {
        key: 'getMenu',
        value: function getMenu(prefixCls) {
            var _context$tableStore = this.context.tableStore,
                leafColumns = _context$tableStore.leafColumns,
                dataSet = _context$tableStore.dataSet;

            var selectedKeys = [];
            var columns = [];
            leafColumns.forEach(function (column) {
                if (column.hideable) {
                    var header = getHeader(column, dataSet);
                    if (header) {
                        var key = getColumnKey(column);
                        if (!column.hidden) {
                            selectedKeys.push(key);
                        }
                        columns.push([column, header, key]);
                    }
                }
            });
            return React.createElement(
                Menu,
                { ref: this.saveMenu, multiple: true, defaultActiveFirst: true, prefixCls: prefixCls + '-dropdown-menu', selectedKeys: selectedKeys, onSelect: this.handleMenuSelect, onDeselect: this.handleMenuUnSelect, onClick: this.handleMenuClick },
                this.getOptions(columns)
            );
        }
    }, {
        key: 'getOptions',
        value: function getOptions(columns) {
            return columns.map(function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 3),
                    column = _ref5[0],
                    header = _ref5[1],
                    key = _ref5[2];

                return React.createElement(
                    Item,
                    { key: key, value: column },
                    React.createElement(
                        'span',
                        null,
                        header
                    )
                );
            });
        }
    }]);

    return ColumnFilter;
}(Component);
ColumnFilter.displayName = 'ColumnFilter';
ColumnFilter.contextType = TableContext;
tslib_1.__decorate([observable], ColumnFilter.prototype, "hidden", void 0);
tslib_1.__decorate([autobind], ColumnFilter.prototype, "handleHiddenChange", null);
tslib_1.__decorate([autobind], ColumnFilter.prototype, "handleKeyDown", null);
tslib_1.__decorate([action], ColumnFilter.prototype, "setDropDownHidden", null);
tslib_1.__decorate([action], ColumnFilter.prototype, "handleMenuSelect", null);
tslib_1.__decorate([action], ColumnFilter.prototype, "handleMenuUnSelect", null);
ColumnFilter = tslib_1.__decorate([observer], ColumnFilter);
export default ColumnFilter;