import _extends from 'babel-runtime/helpers/extends';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import Set from 'core-js/library/fn/set';
import React, { cloneElement } from 'react';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import defer from 'lodash/defer';
import noop from 'lodash/noop';
import debounce from 'lodash/debounce';
import isString from 'lodash/isString';
import { observer } from 'mobx-react';
import { action, get, observable, toJS } from 'mobx';
import Icon from '../icon';
import { TextField } from '../text-field/TextField';
import DataSet from '../data-set/DataSet';
import autobind from '../_util/autobind';
import measureTextWidth from '../_util/measureTextWidth';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import { getEditorByField } from './utils';
import Select from '../select/Select';
import processFieldValue from '../field/utils';
import LookupCodeStore from '../stores/LookupCodeStore';
import { isSameLike } from '../data-set/utils';
import Option from '../option/Option';
import KeyCode from '../../../es/_util/KeyCode';
var FilterSelect = function (_TextField) {
    _inherits(FilterSelect, _TextField);

    function FilterSelect() {
        _classCallCheck(this, FilterSelect);

        var _this = _possibleConstructorReturn(this, (FilterSelect.__proto__ || Object.getPrototypeOf(FilterSelect)).apply(this, arguments));

        _this.setFilterText = debounce(action(function (text) {
            _this.filterText = text;
        }), 500);
        return _this;
    }

    _createClass(FilterSelect, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _get(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'componentWillUnmount', this).call(this);
            this.setFilterText.cancel();
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            _get(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'setText', this).call(this, text);
            this.setFilterText(text);
        }
    }, {
        key: 'getPlaceholder',
        value: function getPlaceholder() {
            if (!this.selectField) {
                return _get(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'getPlaceholder', this).call(this);
            }
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'getOtherProps', this).call(this), ['paramName', 'optionDataSet', 'dropdownMenuStyle']);
        }
    }, {
        key: 'getRootDomNode',
        value: function getRootDomNode() {
            return this.element;
        }
    }, {
        key: 'defaultRenderer',
        value: function defaultRenderer(_ref) {
            var value = _ref.value,
                _ref$repeat = _ref.repeat,
                repeat = _ref$repeat === undefined ? 0 : _ref$repeat;
            var _props = this.props,
                queryDataSet = _props.optionDataSet.queryDataSet,
                paramName = _props.paramName;

            if (queryDataSet) {
                var current = queryDataSet.current;

                if (current) {
                    var fieldValue = current.get(value);
                    if (value === paramName) {
                        return (fieldValue || [])[repeat];
                    }
                    var field = queryDataSet.getField(value);
                    if (field) {
                        if (field.get('multiple')) {
                            fieldValue = (fieldValue || [])[repeat];
                        }
                        return this.getFieldLabel(field) + ': ' + processFieldValue(_get(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'processValue', this).call(this, fieldValue), field, this.lang);
                    }
                    return value;
                }
            }
        }
    }, {
        key: 'getQueryRecord',
        value: function getQueryRecord() {
            var queryDataSet = this.props.optionDataSet.queryDataSet;

            if (queryDataSet) {
                return queryDataSet.current;
            }
        }
    }, {
        key: 'getQueryField',
        value: function getQueryField(fieldName) {
            var queryDataSet = this.props.optionDataSet.queryDataSet;

            if (queryDataSet) {
                return queryDataSet.getField(fieldName);
            }
        }
    }, {
        key: 'addQueryParams',
        value: function addQueryParams(value) {
            var paramName = this.props.paramName;

            var values = this.getQueryValues(paramName);
            this.setQueryValue(paramName, values.concat(value));
            this.addValue(paramName);
        }
    }, {
        key: 'afterRemoveValue',
        value: function afterRemoveValue(value, repeat) {
            var values = this.getQueryValues(value);
            if (repeat === -1) {
                values.pop();
            } else {
                values.splice(repeat, 1);
            }
            var multiple = this.getQueryFieldMultiple(value);
            this.setQueryValue(value, multiple ? values : values[0]);
        }
    }, {
        key: 'getQueryFieldMultiple',
        value: function getQueryFieldMultiple(value) {
            var paramName = this.props.paramName;

            if (paramName !== value) {
                var field = this.getQueryField(value);
                if (field && !field.get('multiple')) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'handleFieldChange',
        value: function handleFieldChange(value, oldValue) {
            var selectField = this.selectField;

            if (selectField) {
                var name = selectField.name;

                this.setQueryValue(name, value);
                if (selectField.get('multiple')) {
                    if (isNil(value)) {
                        this.setValue(this.getValues().filter(function (v) {
                            return v !== name;
                        }));
                    } else {
                        if (oldValue.length < value.length) {
                            this.addValue(name);
                        } else {
                            var diffIndex = [];
                            var d = 0;
                            oldValue.forEach(function (v, index) {
                                if (!isSameLike(value[index - d], v)) {
                                    diffIndex.push(index);
                                    d += 1;
                                }
                            });
                            var repeat = 0;
                            this.setValue(this.getValues().filter(function (v) {
                                if (v === name && diffIndex.length) {
                                    if (diffIndex[0] === repeat) {
                                        diffIndex.shift();
                                        repeat += 1;
                                        return false;
                                    }
                                    repeat += 1;
                                }
                                return true;
                            }));
                        }
                    }
                } else if (!isNil(value)) {
                    this.addValue(name);
                }
            } else if (isString(value)) {
                this.addQueryParams(value);
                if (this.isFocused) {
                    this.element.expand();
                }
            } else {
                this.setSelectField(value);
            }
        }
    }, {
        key: 'handleInput',
        value: function handleInput(e) {
            this.setText(e.target.value);
        }
    }, {
        key: 'handleFieldEnterDown',
        value: function handleFieldEnterDown() {
            var _this2 = this;

            defer(function () {
                return _this2.focus();
            });
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (this.selectField) {
                if (e.keyCode === KeyCode.BACKSPACE && !this.text) {
                    this.setSelectField(void 0);
                }
            } else {
                _get(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'handleKeyDown', this).call(this, e);
            }
        }
    }, {
        key: 'handleEnterDown',
        value: function handleEnterDown() {}
    }, {
        key: 'setSelectField',
        value: function setSelectField(value) {
            this.selectField = value;
            this.setFilterText(void 0);
        }
    }, {
        key: 'getQueryValues',
        value: function getQueryValues(fieldName) {
            var current = this.getQueryRecord();
            if (current) {
                return [].concat(toJS(current.get(fieldName)) || []);
            }
            return [];
        }
    }, {
        key: 'syncValueOnBlur',
        value: function syncValueOnBlur() {}
    }, {
        key: 'setQueryValue',
        value: function setQueryValue(fieldName, value) {
            var current = this.getQueryRecord();
            if (current) {
                current.set(fieldName, value);
            }
            this.setSelectField(void 0);
        }
    }, {
        key: 'getFieldLabel',
        value: function getFieldLabel(field) {
            return field.get('label') || field.name;
        }
    }, {
        key: 'multipleFieldExistsValue',
        value: function multipleFieldExistsValue(field, current) {
            if (field.get('multiple')) {
                var lookupKey = LookupCodeStore.getKey(field);
                if (lookupKey) {
                    var lookupData = LookupCodeStore.get(lookupKey);
                    if (lookupData && current) {
                        var values = current.get(field.name);
                        return lookupData.some(function (obj) {
                            return !values.some(function (value) {
                                return isSameLike(get(obj, field.get('valueField')), value);
                            });
                        });
                    }
                }
            }
            return false;
        }
    }, {
        key: 'getInputFilterOptions',
        value: function getInputFilterOptions(filterText) {
            var _props2 = this.props,
                optionDataSet = _props2.optionDataSet,
                fields = _props2.optionDataSet.fields;

            var values = new Set();
            optionDataSet.forEach(function (record) {
                [].concat(_toConsumableArray(fields.keys())).forEach(function (key) {
                    var value = record.get(key);
                    if (isString(value) && value.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
                        values.add(value);
                    }
                });
            });
            return [].concat(_toConsumableArray(values)).map(function (value) {
                return React.createElement(
                    Option,
                    { key: value, value: value },
                    value
                );
            });
        }
    }, {
        key: 'getFieldSelectOptions',
        value: function getFieldSelectOptions() {
            var _this3 = this;

            var _props3 = this.props,
                queryDataSet = _props3.optionDataSet.queryDataSet,
                paramName = _props3.paramName;

            var data = [];
            if (queryDataSet) {
                [].concat(_toConsumableArray(queryDataSet.fields.entries())).forEach(function (_ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2),
                        key = _ref3[0],
                        field = _ref3[1];

                    if (key !== paramName && (_this3.getValues().indexOf(key) === -1 || _this3.multipleFieldExistsValue(field, _this3.getQueryRecord()))) {
                        data.push(React.createElement(
                            Option,
                            { key: key, value: field },
                            _this3.getFieldLabel(field)
                        ));
                    }
                });
            }
            return data;
        }
    }, {
        key: 'getFieldEditor',
        value: function getFieldEditor(props, selectField) {
            var editor = getEditorByField(selectField);
            var editorProps = _extends({}, props, {
                key: 'value',
                record: this.getQueryRecord(),
                name: selectField.name,
                autoFocus: true,
                onInput: this.handleInput,
                onEnterDown: this.handleFieldEnterDown,
                renderer: noop
            });
            if (editor.type === Select) {
                editorProps.dropdownMenuStyle = this.props.dropdownMenuStyle;
            }
            return cloneElement(editor, editorProps);
        }
    }, {
        key: 'getFieldSelect',
        value: function getFieldSelect(props) {
            var filterText = this.filterText,
                dropdownMenuStyle = this.props.dropdownMenuStyle;

            return React.createElement(
                Select,
                _extends({}, props, { key: 'key', combo: true, searchable: true, value: null, onInput: this.handleInput, onEnterDown: this.handleFieldEnterDown, autoFocus: this.isFocused, checkValueOnOptionsChange: false, dropdownMenuStyle: dropdownMenuStyle }),
                filterText ? this.getInputFilterOptions(filterText) : this.getFieldSelectOptions()
            );
        }
    }, {
        key: 'clear',
        value: function clear() {
            var record = this.getQueryRecord();
            if (record) {
                record.reset();
            }
            _get(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'clear', this).call(this);
        }
    }, {
        key: 'renderMultipleEditor',
        value: function renderMultipleEditor(props) {
            var text = this.text,
                selectField = this.selectField,
                prefixCls = this.prefixCls;

            var editorProps = _extends({}, omit(props, ['multiple', 'prefixCls']), {
                clearButton: false,
                prefix: null,
                suffix: null,
                elementClassName: prefixCls + '-inner-editor',
                onChange: this.handleFieldChange
            });
            if (text) {
                editorProps.style = { width: pxToRem(measureTextWidth(text)) };
            }
            return React.createElement(
                'li',
                { key: 'text' },
                selectField ? React.createElement(
                    'span',
                    { className: prefixCls + '-select-field' },
                    this.getFieldLabel(selectField),
                    ':'
                ) : null,
                selectField ? this.getFieldEditor(editorProps, selectField) : this.getFieldSelect(editorProps)
            );
        }
    }]);

    return FilterSelect;
}(TextField);
FilterSelect.defaultProps = _extends({}, TextField.defaultProps, {
    optionDataSet: DataSet,
    multiple: true,
    clearButton: true,
    prefix: React.createElement(Icon, { type: 'filter_list' }),
    dropdownMenuStyle: { minWidth: pxToRem(180) }
});
tslib_1.__decorate([observable], FilterSelect.prototype, "selectField", void 0);
tslib_1.__decorate([observable], FilterSelect.prototype, "filterText", void 0);
tslib_1.__decorate([action], FilterSelect.prototype, "setText", null);
tslib_1.__decorate([autobind], FilterSelect.prototype, "getRootDomNode", null);
tslib_1.__decorate([autobind], FilterSelect.prototype, "defaultRenderer", null);
tslib_1.__decorate([autobind], FilterSelect.prototype, "handleFieldChange", null);
tslib_1.__decorate([autobind], FilterSelect.prototype, "handleInput", null);
tslib_1.__decorate([autobind], FilterSelect.prototype, "handleFieldEnterDown", null);
tslib_1.__decorate([autobind], FilterSelect.prototype, "handleKeyDown", null);
tslib_1.__decorate([autobind], FilterSelect.prototype, "handleEnterDown", null);
tslib_1.__decorate([action], FilterSelect.prototype, "setSelectField", null);
tslib_1.__decorate([action], FilterSelect.prototype, "setQueryValue", null);
FilterSelect = tslib_1.__decorate([observer], FilterSelect);
export default FilterSelect;