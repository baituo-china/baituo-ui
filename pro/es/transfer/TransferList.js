import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import CheckBox from '../check-box/CheckBox';
import { $l } from '../locale-context';
import TextField from '../text-field/TextField';
import Icon from '../icon';
import { getItemKey, Select } from '../select/Select';
import autobind from '../_util/autobind';
import { stopPropagation } from '../_util/EventManager';
import ViewComponent from '../core/ViewComponent';
var TransferList = function (_Select) {
    _inherits(TransferList, _Select);

    function TransferList() {
        _classCallCheck(this, TransferList);

        return _possibleConstructorReturn(this, (TransferList.__proto__ || Object.getPrototypeOf(TransferList)).apply(this, arguments));
    }

    _createClass(TransferList, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(TransferList.prototype.__proto__ || Object.getPrototypeOf(TransferList.prototype), 'getOtherProps', this).call(this), ['type', 'autoComplete', 'ref', 'body', 'footer', 'header', 'selected', 'onChange', 'onSelect', 'onSelectAll', 'onKeyDown']);
        }
    }, {
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return _extends({}, _get(TransferList.prototype.__proto__ || Object.getPrototypeOf(TransferList.prototype), 'getObservableProps', this).call(this, props, context), {
                header: props.header,
                footer: props.footer
            });
        }
    }, {
        key: 'getMenuPrefixCls',
        value: function getMenuPrefixCls() {
            return this.prefixCls + '-content';
        }
    }, {
        key: 'handleSelectAllChange',
        value: function handleSelectAllChange(value) {
            var onSelectAll = this.props.onSelectAll;

            if (onSelectAll) {
                onSelectAll(value ? this.filteredOptions : []);
            }
        }
    }, {
        key: 'handleClear',
        value: function handleClear() {
            this.setText(void 0);
        }
    }, {
        key: 'getHeaderSelected',
        value: function getHeaderSelected() {
            var length = this.filteredOptions.length,
                multiple = this.multiple,
                prefixCls = this.prefixCls,
                selectedLength = this.props.selected.length;

            var selectedText = selectedLength ? selectedLength + '/' : '';
            if (multiple) {
                return React.createElement(
                    CheckBox,
                    { disabled: this.isDisabled(), onChange: this.handleSelectAllChange, onFocus: stopPropagation, checked: !!length && length === selectedLength, indeterminate: !!selectedLength && length !== selectedLength },
                    React.createElement(
                        'span',
                        { className: prefixCls + '-header-selected' },
                        '' + selectedText + length + $l('Transfer', 'items')
                    )
                );
            }
        }
    }, {
        key: 'getSearchField',
        value: function getSearchField() {
            var prefixCls = this.prefixCls;

            return React.createElement(
                'div',
                { className: prefixCls + '-body-search-wrapper' },
                React.createElement(TextField, { ref: this.elementReference, onInput: this.handleChange, onClear: this.handleClear, onKeyDown: this.handleKeyDown, suffix: React.createElement(Icon, { type: 'search' }), clearButton: true })
            );
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var prefixCls = this.prefixCls,
                searchable = this.searchable,
                textField = this.textField,
                valueField = this.valueField,
                _props = this.props,
                selected = _props.selected,
                onSelect = _props.onSelect;

            var searchField = searchable && this.getSearchField();
            var classString = classNames(prefixCls + '-body', _defineProperty({}, prefixCls + '-body-with-search', searchable));
            var selectedKeys = selected.map(function (record) {
                return getItemKey(record, record.get(textField), record.get(valueField));
            });
            return React.createElement(
                'div',
                { className: classString },
                searchField,
                React.createElement(
                    'div',
                    { className: prefixCls + '-content-wrapper', onFocus: searchable ? stopPropagation : void 0 },
                    this.getMenu({ selectedKeys: selectedKeys, onClick: onSelect, focusable: !this.searchable })
                )
            );
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var _get$call;

            var prefixCls = this.prefixCls,
                header = this.header,
                footer = this.footer;

            return _get(TransferList.prototype.__proto__ || Object.getPrototypeOf(TransferList.prototype), 'getClassName', this).call(this, (_get$call = {}, _defineProperty(_get$call, prefixCls + '-with-header', header), _defineProperty(_get$call, prefixCls + '-with-footer', footer), _get$call));
        }
    }, {
        key: 'removeLastValue',
        value: function removeLastValue() {}
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            ViewComponent.prototype.handleBlur.call(this, e);
        }
    }, {
        key: 'render',
        value: function render() {
            var header = this.header,
                footer = this.footer;

            return React.createElement(
                'div',
                this.getOtherProps(),
                header,
                this.renderBody(),
                footer
            );
        }
    }, {
        key: 'popup',
        get: function get() {
            return true;
        }
    }, {
        key: 'header',
        get: function get() {
            var prefixCls = this.prefixCls,
                multiple = this.multiple,
                header = this.observableProps.header;

            if (multiple || header) {
                return React.createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    this.getHeaderSelected(),
                    header && React.createElement(
                        'span',
                        { className: prefixCls + '-header-title' },
                        header
                    )
                );
            }
        }
    }, {
        key: 'footer',
        get: function get() {
            var prefixCls = this.prefixCls,
                filteredOptions = this.filteredOptions,
                footer = this.observableProps.footer;

            if (footer) {
                return React.createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    footer(filteredOptions)
                );
            }
        }
    }]);

    return TransferList;
}(Select);
tslib_1.__decorate([computed], TransferList.prototype, "popup", null);
tslib_1.__decorate([computed], TransferList.prototype, "header", null);
tslib_1.__decorate([computed], TransferList.prototype, "footer", null);
tslib_1.__decorate([autobind], TransferList.prototype, "handleSelectAllChange", null);
tslib_1.__decorate([autobind], TransferList.prototype, "handleClear", null);
tslib_1.__decorate([autobind], TransferList.prototype, "handleBlur", null);
TransferList = tslib_1.__decorate([observer], TransferList);
export default TransferList;