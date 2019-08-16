import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { cloneElement, Component, isValidElement } from 'react';
import classNames from 'classnames';
import { action, isArrayLike } from 'mobx';
import { observer } from 'mobx-react';
import { isMoment } from 'moment';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import Button from '../button';
import { getEditorByField } from './utils';
import TableContext from './TableContext';
import { filterBindField } from './TableToolBar';
import KeyValueBar from './KeyValueBar';
import { getDateFormatByField } from '../data-set/utils';
import { $l } from '../locale-context';
function isFieldEmpty(field) {
    var value = field.getValue();
    return isArrayLike(value) ? value.length === 0 : !value;
}
function processFieldValue(field) {
    var value = field.getValue();
    if (isMoment(value)) {
        value = value.format(getDateFormatByField(field, field.get('type')));
    }
    if (isArrayLike(value)) {
        value = value.join(',');
    }
    return value;
}
var TableAdvancedQueryBar = function (_Component) {
    _inherits(TableAdvancedQueryBar, _Component);

    function TableAdvancedQueryBar() {
        _classCallCheck(this, TableAdvancedQueryBar);

        var _this = _possibleConstructorReturn(this, (TableAdvancedQueryBar.__proto__ || Object.getPrototypeOf(TableAdvancedQueryBar)).apply(this, arguments));

        _this.state = {
            showMoreFieldsPanel: false
        };
        _this.handleFieldEnter = function () {
            _this.handleQuery();
        };
        _this.handleFieldChange = function () {
            _this.handleQuery();
        };
        _this.handleQuery = function () {
            _this.context.tableStore.dataSet.query();
        };
        _this.handleMoreFieldsButtonClick = function () {
            // toggle state
            _this.setState(function (prevState) {
                return _extends({}, prevState, {
                    showMoreFieldsPanel: !prevState.showMoreFieldsPanel
                });
            });
        };
        _this.handleKeyValueItemClose = function (label) {
            var queryDataSet = _this.context.tableStore.dataSet.queryDataSet;

            if (queryDataSet) {
                var fields = filterBindField(queryDataSet.fields);
                Object.keys(fields).map(function (fieldKey) {
                    return fields[fieldKey];
                }).filter(function (field) {
                    return field.get('label') === label;
                }).forEach(function (field) {
                    var record = field.record || queryDataSet.current;
                    record.set(field.name, null);
                    _this.handleQuery();
                });
            }
        };
        return _this;
    }

    _createClass(TableAdvancedQueryBar, [{
        key: 'getMoreFieldsButton',
        value: function getMoreFieldsButton(fields) {
            var showMoreFieldsPanel = this.state.showMoreFieldsPanel;

            if (fields.length) {
                return React.createElement(
                    Button,
                    { icon: 'filter_list', color: "blue" /* blue */, funcType: "flat" /* flat */, onClick: this.handleMoreFieldsButtonClick },
                    !showMoreFieldsPanel ? $l('Table', 'advanced_query') : $l('Table', 'hide_advanced_query')
                );
            }
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var prefixCls = this.props.prefixCls;

            return classNames(prefixCls + '-advanced-query-bar-container');
        }
    }, {
        key: 'getCurrentFields',
        value: function getCurrentFields(fields, dataSet) {
            return this.createFields(fields, dataSet, false);
        }
    }, {
        key: 'getQueryBar',
        value: function getQueryBar() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                queryFieldsLimit = _props.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;

            if (queryDataSet) {
                var fields = filterBindField(queryDataSet.fields);
                var keys = Object.keys(fields);
                if (keys.length) {
                    var currentFields = keys.slice(0, queryFieldsLimit).map(function (name) {
                        return fields[name];
                    });
                    var moreKeys = keys.slice(queryFieldsLimit);
                    var moreFieldsButton = void 0;
                    // let dirtyInfo;
                    if (moreKeys.length) {
                        var moreFields = keys.slice(queryFieldsLimit).map(function (name) {
                            return fields[name];
                        });
                        moreFieldsButton = this.getMoreFieldsButton(moreFields);
                        // dirtyInfo = this.getDirtyInfo(queryDataSet.current, moreKeys);
                    }
                    return React.createElement(
                        'div',
                        { className: prefixCls + '-advanced-query-bar' },
                        this.getCurrentFields(currentFields, queryDataSet),
                        moreFieldsButton
                    );
                }
            }
        }
    }, {
        key: 'renderMoreFields',
        value: function renderMoreFields(fields) {
            return fields.map(function (field, index) {
                var label = field.props.label;

                return React.createElement(
                    'div',
                    { className: 'more-field-container', key: field.key + '-' + index },
                    React.createElement(
                        'label',
                        { className: 'more-field-label' },
                        label
                    ),
                    React.createElement(
                        'div',
                        { className: 'more-field-wrapper' },
                        field
                    )
                );
            });
        }
    }, {
        key: 'renderMoreFieldsPanel',
        value: function renderMoreFieldsPanel(fields, dataSet) {
            var prefixCls = this.props.prefixCls;

            return React.createElement(
                'div',
                { className: prefixCls + '-advanced-query-bar-more-fields-panel' },
                this.renderMoreFields(this.createFields(fields, dataSet, true))
            );
        }
    }, {
        key: 'createFields',
        value: function createFields(fields, dataSet, isMore) {
            var _this2 = this;

            var queryFields = this.props.queryFields;

            return fields.map(function (field, index) {
                var name = field.name;

                var props = _extends({
                    key: name,
                    name: name,
                    dataSet: dataSet,
                    autoFocus: isMore && index === 0,
                    onEnterDown: _this2.handleFieldEnter,
                    onChange: isMore ? _this2.handleFieldChange : undefined,
                    style: {
                        width: pxToRem(isMore ? 250 : 260),
                        marginRight: !isMore ? pxToRem(16) : 0
                    }
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
        key: 'getMoreFields',
        value: function getMoreFields() {
            var queryFieldsLimit = this.props.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;

            if (queryDataSet) {
                var fields = filterBindField(queryDataSet.fields);
                var keys = Object.keys(fields);
                if (keys.length) {
                    var moreFields = keys.slice(queryFieldsLimit).map(function (name) {
                        return fields[name];
                    });
                    return moreFields;
                }
            }
            return [];
        }
    }, {
        key: 'renderKeyValueBar',
        value: function renderKeyValueBar() {
            var prefixCls = this.props.prefixCls;

            var items = [];
            this.getMoreFields().forEach(function (field) {
                if (!isFieldEmpty(field)) {
                    items.push({
                        key: field.get('label'),
                        value: processFieldValue(field)
                    });
                }
            });
            return React.createElement(KeyValueBar, { prefixCls: prefixCls, items: items, onCloseBtnClick: this.handleKeyValueItemClose });
        }
    }, {
        key: 'getMoreFieldKeys',
        value: function getMoreFieldKeys() {
            var queryFieldsLimit = this.props.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;

            if (queryDataSet) {
                var fields = filterBindField(queryDataSet.fields);
                var keys = Object.keys(fields);
                return keys.slice(queryFieldsLimit);
            }
            return [];
        }
    }, {
        key: 'render',
        value: function render() {
            var queryFieldsLimit = this.props.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;
            var showMoreFieldsPanel = this.state.showMoreFieldsPanel;

            if (queryDataSet) {
                var fields = filterBindField(queryDataSet.fields);
                var keys = Object.keys(fields);
                if (keys.length) {
                    var moreFields = keys.slice(queryFieldsLimit).map(function (name) {
                        return fields[name];
                    });
                    return React.createElement(
                        'div',
                        { className: this.getClassName() },
                        this.getQueryBar(),
                        showMoreFieldsPanel ? this.renderMoreFieldsPanel(moreFields, queryDataSet) : null,
                        this.renderKeyValueBar()
                    );
                }
            }
            // invalid advanced query bar
            console.warn('queryBar = \'advancedBar\' doesn\'t work, invalid queryDataSet');
            return null;
        }
    }]);

    return TableAdvancedQueryBar;
}(Component);
TableAdvancedQueryBar.defaultProps = {
    queryFields: []
};
TableAdvancedQueryBar.contextType = TableContext;
tslib_1.__decorate([action], TableAdvancedQueryBar.prototype, "handleKeyValueItemClose", void 0);
TableAdvancedQueryBar = tslib_1.__decorate([observer], TableAdvancedQueryBar);
export default TableAdvancedQueryBar;