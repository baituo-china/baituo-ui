import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, observable, runInAction } from 'mobx';
import { Select } from '../select/Select';
import Option from '../option/Option';
import OptGroup from '../option/OptGroup';
import TransferList from './TransferList';
import { isSameLike } from '../data-set/utils';
import TransferOperation from './TransferOperation';
import autobind from '../_util/autobind';
var Transfer = function (_Select) {
    _inherits(Transfer, _Select);

    function Transfer(props, context) {
        _classCallCheck(this, Transfer);

        var _this = _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props, context));

        runInAction(function () {
            _this.sourceSelected = [];
            _this.targetSelected = [];
        });
        return _this;
    }

    _createClass(Transfer, [{
        key: 'sourceFilter',
        value: function sourceFilter(record, index, array) {
            var valueField = this.valueField,
                optionsFilter = this.props.optionsFilter;

            if (optionsFilter && !optionsFilter(record, index, array)) {
                return false;
            }
            var values = this.getValues();
            if (values.length) {
                return values.every(function (v) {
                    return !isSameLike(record.get(valueField), v);
                });
            }
            return true;
        }
    }, {
        key: 'targetFilter',
        value: function targetFilter(record, index, array) {
            var valueField = this.valueField,
                optionsFilter = this.props.optionsFilter;

            if (optionsFilter && !optionsFilter(record, index, array)) {
                return false;
            }
            var values = this.getValues();
            if (values.length) {
                return values.some(function (v) {
                    return isSameLike(record.get(valueField), v);
                });
            }
            return false;
        }
    }, {
        key: 'handleMenuClick',
        value: function handleMenuClick(_ref) {
            var value = _ref.item.props.value;

            if (this.multiple) {
                this.selectRecord(value, this.sourceSelected);
            } else {
                this.addValue(this.processRecordToObject(value));
            }
        }
    }, {
        key: 'handleTargetMenuClick',
        value: function handleTargetMenuClick(_ref2) {
            var value = _ref2.item.props.value;

            if (this.multiple) {
                this.selectRecord(value, this.targetSelected);
            } else {
                this.removeValue(value);
            }
        }
    }, {
        key: 'handleMoveToLeft',
        value: function handleMoveToLeft() {
            var valueField = this.valueField;

            this.removeValues(this.targetSelected.map(function (record) {
                return record.get(valueField);
            }));
            this.targetSelected = [];
        }
    }, {
        key: 'handleMoveToRight',
        value: function handleMoveToRight() {
            var valueField = this.valueField;

            this.addValues(this.sourceSelected.map(function (record) {
                return record.get(valueField);
            }));
            this.sourceSelected = [];
        }
    }, {
        key: 'handleSourceSelectAllChange',
        value: function handleSourceSelectAllChange(selected) {
            this.sourceSelected = selected;
        }
    }, {
        key: 'handleTargetSelectAllChange',
        value: function handleTargetSelectAllChange(selected) {
            this.targetSelected = selected;
        }
    }, {
        key: 'selectRecord',
        value: function selectRecord(value, selected) {
            var index = selected.indexOf(value);
            if (index !== -1) {
                selected.splice(index, 1);
            } else {
                selected.push(value);
            }
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            var prefixCls = this.prefixCls,
                targetSelected = this.targetSelected,
                sourceSelected = this.sourceSelected,
                multiple = this.multiple,
                _props$titles = this.props.titles,
                titles = _props$titles === undefined ? [] : _props$titles;

            var disabled = this.isDisabled();
            return React.createElement(
                'span',
                { key: 'wrapper', className: prefixCls + '-wrapper' },
                React.createElement(TransferList, _extends({}, this.props, { options: this.options, selected: sourceSelected, header: titles[0], onSelectAll: this.handleSourceSelectAllChange, onSelect: this.handleMenuClick, optionsFilter: this.sourceFilter })),
                React.createElement(TransferOperation, { className: prefixCls + '-operation', leftActive: !(!targetSelected.length || disabled), rightActive: !(!sourceSelected.length || disabled), moveToLeft: this.handleMoveToLeft, moveToRight: this.handleMoveToRight, multiple: multiple }),
                React.createElement(TransferList, _extends({}, this.props, { options: this.options, selected: targetSelected, header: titles[1], onSelectAll: this.handleTargetSelectAllChange, onSelect: this.handleTargetMenuClick, optionsFilter: this.targetFilter }))
            );
        }
    }]);

    return Transfer;
}(Select);
Transfer.displayName = 'Transfer';
Transfer.propTypes = _extends({}, Select.propTypes, {
    titles: PropTypes.arrayOf(PropTypes.node)
});
Transfer.defaultProps = _extends({}, Select.defaultProps, {
    suffixCls: 'transfer',
    multiple: true
});
Transfer.Option = Option;
Transfer.OptGroup = OptGroup;
tslib_1.__decorate([observable], Transfer.prototype, "sourceSelected", void 0);
tslib_1.__decorate([observable], Transfer.prototype, "targetSelected", void 0);
tslib_1.__decorate([autobind], Transfer.prototype, "sourceFilter", null);
tslib_1.__decorate([autobind], Transfer.prototype, "targetFilter", null);
tslib_1.__decorate([autobind], Transfer.prototype, "handleMenuClick", null);
tslib_1.__decorate([autobind], Transfer.prototype, "handleTargetMenuClick", null);
tslib_1.__decorate([autobind, action], Transfer.prototype, "handleMoveToLeft", null);
tslib_1.__decorate([autobind, action], Transfer.prototype, "handleMoveToRight", null);
tslib_1.__decorate([autobind, action], Transfer.prototype, "handleSourceSelectAllChange", null);
tslib_1.__decorate([autobind, action], Transfer.prototype, "handleTargetSelectAllChange", null);
tslib_1.__decorate([action], Transfer.prototype, "selectRecord", null);
Transfer = tslib_1.__decorate([observer], Transfer);
export default Transfer;