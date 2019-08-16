import _extends from 'babel-runtime/helpers/extends';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import * as tslib_1 from "tslib";
import React, { cloneElement, Component, isValidElement } from 'react';
import { isArrayLike } from 'mobx';
import { observer } from 'mobx-react';
import isString from 'lodash/isString';
import DataSet from '../data-set/DataSet';
import { TableButtonType } from './enum';
import Button from '../button/Button';
import { getEditorByField } from './utils';
import Modal from '../modal';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import Form from '../form/Form';
import Icon from '../icon';
import TableContext from './TableContext';
import { $l } from '../locale-context';
import Table from './Table';
import Column from './Column';
import { findBindFieldBy } from '../data-set/utils';
/**
 * 去除级联字段
 *
 * @export
 * @param {Fields} fields 待筛选的字段数组
 * @returns {{ [key: string]: Field }} 不含级联字段的字段数组
 */
export function filterBindField(fields) {
    return Array.from(fields.entries()).reduce(function (newFields, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            field = _ref2[1];

        if (!field.get('bind')) {
            newFields[key] = field;
        }
        return newFields;
    }, {});
}
var TableToolBar = function (_Component) {
    _inherits(TableToolBar, _Component);

    function TableToolBar() {
        var _this2 = this;

        _classCallCheck(this, TableToolBar);

        var _this = _possibleConstructorReturn(this, (TableToolBar.__proto__ || Object.getPrototypeOf(TableToolBar)).apply(this, arguments));

        _this.handleFieldEnter = function () {
            _this.handleQuery();
            if (_this.modal) {
                _this.modal.close();
            }
        };
        _this.handleButtonCreate = function () {
            var dataSet = _this.context.tableStore.dataSet;

            dataSet.create({}, 0);
        };
        _this.handleButtonSubmit = function () {
            return _this.context.tableStore.dataSet.submit();
        };
        _this.handleButtonDelete = function () {
            var dataSet = _this.context.tableStore.dataSet;

            dataSet['delete'](dataSet.selected);
        };
        _this.handleButtonRemove = function () {
            var dataSet = _this.context.tableStore.dataSet;

            dataSet.remove(dataSet.selected);
        };
        _this.handleButtonReset = function () {
            return _this.context.tableStore.dataSet.reset();
        };
        _this.handleQueryReset = function () {
            var current = _this.context.tableStore.dataSet.queryDataSet.current;

            if (current) {
                current.reset();
            }
            _this.handleQuery();
        };
        _this.handleExpandAll = function () {
            return _this.context.tableStore.expandAll();
        };
        _this.handleCollapseAll = function () {
            return _this.context.tableStore.collapseAll();
        };
        _this.handleButtonExport = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var columnHeaders;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _this.context.tableStore.getColumnHeaders();

                        case 2:
                            columnHeaders = _context.sent;

                            _this.exportDataSet = new DataSet({ data: columnHeaders, paging: false });
                            _this.exportDataSet.selectAll();
                            _this.exportModal = Modal.open({
                                title: $l('Table', 'choose_export_columns'),
                                children: React.createElement(
                                    Table,
                                    { dataSet: _this.exportDataSet, style: { height: pxToRem(300) } },
                                    React.createElement(Column, { header: $l('Table', 'column_name'), name: 'label', resizable: false })
                                ),
                                okText: $l('Table', 'export_button'),
                                onOk: _this.handleExport,
                                style: {
                                    width: pxToRem(400)
                                }
                            });

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        _this.handleQuery = function () {
            _this.context.tableStore.dataSet.query();
        };
        _this.handleExport = function () {
            var selected = _this.exportDataSet.selected;

            if (selected.length) {
                var dataSet = _this.context.tableStore.dataSet;

                dataSet['export'](selected.reduce(function (columns, record) {
                    var myName = record.get('name');
                    var myField = dataSet.getField(myName);
                    if (myField && myField.type === "object" /* object */) {
                            var bindField = findBindFieldBy(myField, dataSet.fields, 'textField');
                            if (bindField) {
                                myName = bindField.name;
                            }
                        }
                    columns[myName] = record.get('label');
                    return columns;
                }, {}));
            } else {
                return false;
            }
        };
        return _this;
    }

    _createClass(TableToolBar, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.modal) {
                this.modal.close(true);
            }
            if (this.exportModal) {
                this.exportModal.close(true);
            }
        }
    }, {
        key: 'getButtonProps',
        value: function getButtonProps(type) {
            var tableStore = this.context.tableStore;
            var dataSet = tableStore.dataSet,
                isTree = tableStore.isTree;

            var disabled = dataSet.parent ? !dataSet.parent.current : false;
            var submitting = dataSet.status === "submitting" /* submitting */;
            var canRemove = !submitting && dataSet.selected.length > 0;
            switch (type) {
                case TableButtonType.add:
                    return { icon: 'playlist_add', onClick: this.handleButtonCreate, children: $l('Table', 'create_button'), disabled: disabled };
                case TableButtonType.save:
                    return {
                        icon: 'save',
                        onClick: this.handleButtonSubmit,
                        children: $l('Table', 'save_button'),
                        type: "submit" /* submit */, disabled: submitting
                    };
                case TableButtonType['delete']:
                    return {
                        icon: 'delete',
                        onClick: this.handleButtonDelete,
                        children: $l('Table', 'delete_button'),
                        disabled: !canRemove
                    };
                case TableButtonType.remove:
                    return {
                        icon: 'remove_circle',
                        onClick: this.handleButtonRemove,
                        children: $l('Table', 'remove_button'),
                        disabled: !canRemove
                    };
                case TableButtonType.reset:
                    return { icon: 'undo', onClick: this.handleButtonReset, children: $l('Table', 'reset_button'), type: "reset" /* reset */ };
                case TableButtonType.query:
                    return { icon: 'search', onClick: this.handleQuery, children: $l('Table', 'query_button') };
                case TableButtonType['export']:
                    return { icon: 'export', onClick: this.handleButtonExport, children: $l('Table', 'export_button') };
                case TableButtonType.expandAll:
                    return isTree && { icon: 'add_box', onClick: this.handleExpandAll, children: $l('Table', 'expand_button') };
                case TableButtonType.collapseAll:
                    return isTree && { icon: 'short_text', onClick: this.handleCollapseAll, children: $l('Table', 'collapse_button') };
                default:
            }
        }
    }, {
        key: 'getButtons',
        value: function getButtons() {
            var _this3 = this;

            var _props = this.props,
                buttons = _props.buttons,
                prefixCls = _props.prefixCls;

            if (buttons) {
                var children = [];
                buttons.forEach(function (button) {
                    var props = {};
                    if (isArrayLike(button)) {
                        props = button[1];
                        button = button[0];
                    }
                    if (isString(button) && button in TableButtonType) {
                        var defaultButtonProps = _this3.getButtonProps(button);
                        if (defaultButtonProps) {
                            children.push(React.createElement(Button, _extends({ color: "blue" /* blue */, funcType: "flat" /* flat */, key: button }, defaultButtonProps, props)));
                        }
                    } else if (isValidElement(button)) {
                        children.push(button);
                    }
                });
                if (children.length) {
                    return React.createElement(
                        'span',
                        { className: prefixCls + '-toolbar-button-group' },
                        children
                    );
                }
            }
        }
    }, {
        key: 'getQueryBar',
        value: function getQueryBar() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                showQueryBar = _props2.showQueryBar,
                queryFieldsLimit = _props2.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;

            if (showQueryBar && queryDataSet) {
                var fields = filterBindField(queryDataSet.fields);
                var keys = Object.keys(fields);
                if (keys.length) {
                    var currentFields = keys.slice(0, queryFieldsLimit).map(function (name) {
                        return fields[name];
                    });
                    var moreKeys = keys.slice(queryFieldsLimit);
                    var more = void 0;
                    var dirtyInfo = void 0;
                    if (moreKeys.length) {
                        var moreFields = keys.slice(queryFieldsLimit).map(function (name) {
                            return fields[name];
                        });
                        more = this.getMoreButton(moreFields, queryDataSet);
                        dirtyInfo = this.getDirtyInfo(queryDataSet.current, moreKeys);
                    }
                    return React.createElement(
                        'span',
                        { className: prefixCls + '-query-bar' },
                        dirtyInfo,
                        this.getCurrentFields(currentFields, queryDataSet),
                        React.createElement(
                            Button,
                            { color: "blue" /* blue */, onClick: this.handleQuery },
                            $l('Table', 'query_button')
                        ),
                        more
                    );
                }
            }
        }
    }, {
        key: 'getDirtyInfo',
        value: function getDirtyInfo(current, moreKeys) {
            if (current && moreKeys.some(function (key) {
                var field = current.getField(key);
                return field ? field.dirty : false;
            })) {
                var prefixCls = this.props.prefixCls;

                return React.createElement(
                    'span',
                    { className: prefixCls + '-query-bar-dirty-info' },
                    React.createElement(Icon, { type: 'info' }),
                    React.createElement(
                        'span',
                        null,
                        $l('Table', 'dirty_info')
                    ),
                    React.createElement(
                        'a',
                        { onClick: this.handleQueryReset },
                        $l('Table', 'restore')
                    )
                );
            }
        }
    }, {
        key: 'getCurrentFields',
        value: function getCurrentFields(fields, dataSet) {
            return this.createFields(fields, dataSet, false);
        }
    }, {
        key: 'getMoreButton',
        value: function getMoreButton(fields, dataSet) {
            var _this4 = this;

            if (fields.length) {
                var moreFields = this.createFields(fields, dataSet, true);
                return React.createElement(
                    Button,
                    { color: "blue" /* blue */, funcType: "flat" /* flat */, onClick: function onClick() {
                            return _this4.openMore(moreFields);
                        } },
                    $l('Table', 'advanced_search')
                );
            }
        }
    }, {
        key: 'createFields',
        value: function createFields(fields, dataSet, isMore) {
            var _this5 = this;

            var queryFields = this.props.queryFields;

            return fields.map(function (field, index) {
                var name = field.name;

                var props = _extends({
                    key: name,
                    name: name,
                    dataSet: dataSet,
                    autoFocus: isMore && index === 0,
                    onEnterDown: _this5.handleFieldEnter,
                    style: { width: pxToRem(isMore ? 250 : 130) }
                }, isMore ? { label: field.get('label') } : { placeholder: field.get('label') });
                var label = field.get('label');
                if (label) {
                    if (isMore) {
                        props.label = label;
                    } else {
                        props.placeholder = label;
                    }
                }
                var element = queryFields[name];
                return isValidElement(element) ? cloneElement(element, props) : cloneElement(getEditorByField(field), _extends({}, props, element));
            });
        }
    }, {
        key: 'openMore',
        value: function openMore(children) {
            this.modal = Modal.open({
                title: $l('Table', 'advanced_search'),
                children: React.createElement(
                    Form,
                    null,
                    children
                ),
                okText: $l('Table', 'query_button'),
                onOk: this.handleQuery,
                style: {
                    width: pxToRem(400)
                },
                drawer: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.props.prefixCls;

            var buttons = this.getButtons();
            var queryBar = this.getQueryBar();
            if (buttons || queryBar) {
                var className = prefixCls + '-toolbar';
                return React.createElement(
                    'div',
                    { className: className },
                    buttons,
                    queryBar
                );
            }
            return null;
        }
    }]);

    return TableToolBar;
}(Component);
TableToolBar.displayName = 'TableToolBar';
TableToolBar.contextType = TableContext;
TableToolBar = tslib_1.__decorate([observer], TableToolBar);
export default TableToolBar;