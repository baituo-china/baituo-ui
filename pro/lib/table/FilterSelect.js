'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _set = require('core-js/library/fn/set');

var _set2 = _interopRequireDefault(_set);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _defer = require('lodash/defer');

var _defer2 = _interopRequireDefault(_defer);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _TextField2 = require('../text-field/TextField');

var _DataSet = require('../data-set/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _measureTextWidth = require('../_util/measureTextWidth');

var _measureTextWidth2 = _interopRequireDefault(_measureTextWidth);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _utils = require('./utils');

var _Select = require('../select/Select');

var _Select2 = _interopRequireDefault(_Select);

var _utils2 = require('../field/utils');

var _utils3 = _interopRequireDefault(_utils2);

var _LookupCodeStore = require('../stores/LookupCodeStore');

var _LookupCodeStore2 = _interopRequireDefault(_LookupCodeStore);

var _utils4 = require('../data-set/utils');

var _Option = require('../option/Option');

var _Option2 = _interopRequireDefault(_Option);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FilterSelect = function (_TextField) {
    (0, _inherits3['default'])(FilterSelect, _TextField);

    function FilterSelect() {
        (0, _classCallCheck3['default'])(this, FilterSelect);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (FilterSelect.__proto__ || Object.getPrototypeOf(FilterSelect)).apply(this, arguments));

        _this.setFilterText = (0, _debounce2['default'])((0, _mobx.action)(function (text) {
            _this.filterText = text;
        }), 500);
        return _this;
    }

    (0, _createClass3['default'])(FilterSelect, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _get3['default'])(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'componentWillUnmount', this).call(this);
            this.setFilterText.cancel();
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            (0, _get3['default'])(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'setText', this).call(this, text);
            this.setFilterText(text);
        }
    }, {
        key: 'getPlaceholder',
        value: function getPlaceholder() {
            if (!this.selectField) {
                return (0, _get3['default'])(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'getPlaceholder', this).call(this);
            }
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'getOtherProps', this).call(this), ['paramName', 'optionDataSet', 'dropdownMenuStyle']);
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
                        return this.getFieldLabel(field) + ': ' + (0, _utils3['default'])((0, _get3['default'])(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'processValue', this).call(this, fieldValue), field, this.lang);
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
                    if ((0, _isNil2['default'])(value)) {
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
                                if (!(0, _utils4.isSameLike)(value[index - d], v)) {
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
                } else if (!(0, _isNil2['default'])(value)) {
                    this.addValue(name);
                }
            } else if ((0, _isString2['default'])(value)) {
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

            (0, _defer2['default'])(function () {
                return _this2.focus();
            });
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (this.selectField) {
                if (e.keyCode === _KeyCode2['default'].BACKSPACE && !this.text) {
                    this.setSelectField(void 0);
                }
            } else {
                (0, _get3['default'])(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'handleKeyDown', this).call(this, e);
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
                return [].concat((0, _mobx.toJS)(current.get(fieldName)) || []);
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
                var lookupKey = _LookupCodeStore2['default'].getKey(field);
                if (lookupKey) {
                    var lookupData = _LookupCodeStore2['default'].get(lookupKey);
                    if (lookupData && current) {
                        var values = current.get(field.name);
                        return lookupData.some(function (obj) {
                            return !values.some(function (value) {
                                return (0, _utils4.isSameLike)((0, _mobx.get)(obj, field.get('valueField')), value);
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

            var values = new _set2['default']();
            optionDataSet.forEach(function (record) {
                [].concat((0, _toConsumableArray3['default'])(fields.keys())).forEach(function (key) {
                    var value = record.get(key);
                    if ((0, _isString2['default'])(value) && value.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
                        values.add(value);
                    }
                });
            });
            return [].concat((0, _toConsumableArray3['default'])(values)).map(function (value) {
                return _react2['default'].createElement(
                    _Option2['default'],
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
                [].concat((0, _toConsumableArray3['default'])(queryDataSet.fields.entries())).forEach(function (_ref2) {
                    var _ref3 = (0, _slicedToArray3['default'])(_ref2, 2),
                        key = _ref3[0],
                        field = _ref3[1];

                    if (key !== paramName && (_this3.getValues().indexOf(key) === -1 || _this3.multipleFieldExistsValue(field, _this3.getQueryRecord()))) {
                        data.push(_react2['default'].createElement(
                            _Option2['default'],
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
            var editor = (0, _utils.getEditorByField)(selectField);
            var editorProps = (0, _extends3['default'])({}, props, {
                key: 'value',
                record: this.getQueryRecord(),
                name: selectField.name,
                autoFocus: true,
                onInput: this.handleInput,
                onEnterDown: this.handleFieldEnterDown,
                renderer: _noop2['default']
            });
            if (editor.type === _Select2['default']) {
                editorProps.dropdownMenuStyle = this.props.dropdownMenuStyle;
            }
            return (0, _react.cloneElement)(editor, editorProps);
        }
    }, {
        key: 'getFieldSelect',
        value: function getFieldSelect(props) {
            var filterText = this.filterText,
                dropdownMenuStyle = this.props.dropdownMenuStyle;

            return _react2['default'].createElement(
                _Select2['default'],
                (0, _extends3['default'])({}, props, { key: 'key', combo: true, searchable: true, value: null, onInput: this.handleInput, onEnterDown: this.handleFieldEnterDown, autoFocus: this.isFocused, checkValueOnOptionsChange: false, dropdownMenuStyle: dropdownMenuStyle }),
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
            (0, _get3['default'])(FilterSelect.prototype.__proto__ || Object.getPrototypeOf(FilterSelect.prototype), 'clear', this).call(this);
        }
    }, {
        key: 'renderMultipleEditor',
        value: function renderMultipleEditor(props) {
            var text = this.text,
                selectField = this.selectField,
                prefixCls = this.prefixCls;

            var editorProps = (0, _extends3['default'])({}, (0, _omit2['default'])(props, ['multiple', 'prefixCls']), {
                clearButton: false,
                prefix: null,
                suffix: null,
                elementClassName: prefixCls + '-inner-editor',
                onChange: this.handleFieldChange
            });
            if (text) {
                editorProps.style = { width: (0, _UnitConvertor.pxToRem)((0, _measureTextWidth2['default'])(text)) };
            }
            return _react2['default'].createElement(
                'li',
                { key: 'text' },
                selectField ? _react2['default'].createElement(
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
}(_TextField2.TextField);
FilterSelect.defaultProps = (0, _extends3['default'])({}, _TextField2.TextField.defaultProps, {
    optionDataSet: _DataSet2['default'],
    multiple: true,
    clearButton: true,
    prefix: _react2['default'].createElement(_icon2['default'], { type: 'filter_list' }),
    dropdownMenuStyle: { minWidth: (0, _UnitConvertor.pxToRem)(180) }
});
tslib_1.__decorate([_mobx.observable], FilterSelect.prototype, "selectField", void 0);
tslib_1.__decorate([_mobx.observable], FilterSelect.prototype, "filterText", void 0);
tslib_1.__decorate([_mobx.action], FilterSelect.prototype, "setText", null);
tslib_1.__decorate([_autobind2['default']], FilterSelect.prototype, "getRootDomNode", null);
tslib_1.__decorate([_autobind2['default']], FilterSelect.prototype, "defaultRenderer", null);
tslib_1.__decorate([_autobind2['default']], FilterSelect.prototype, "handleFieldChange", null);
tslib_1.__decorate([_autobind2['default']], FilterSelect.prototype, "handleInput", null);
tslib_1.__decorate([_autobind2['default']], FilterSelect.prototype, "handleFieldEnterDown", null);
tslib_1.__decorate([_autobind2['default']], FilterSelect.prototype, "handleKeyDown", null);
tslib_1.__decorate([_autobind2['default']], FilterSelect.prototype, "handleEnterDown", null);
tslib_1.__decorate([_mobx.action], FilterSelect.prototype, "setSelectField", null);
tslib_1.__decorate([_mobx.action], FilterSelect.prototype, "setQueryValue", null);
FilterSelect = tslib_1.__decorate([_mobxReact.observer], FilterSelect);
exports['default'] = FilterSelect;
module.exports = exports['default'];