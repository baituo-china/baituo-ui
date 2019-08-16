'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Select = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.getItemKey = getItemKey;

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _menu = require('../../../lib/rc-components/menu');

var _menu2 = _interopRequireDefault(_menu);

var _TriggerField2 = require('../trigger-field/TriggerField');

var _TriggerField3 = _interopRequireDefault(_TriggerField2);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _Option = require('../option/Option');

var _Option2 = _interopRequireDefault(_Option);

var _OptGroup = require('../option/OptGroup');

var _OptGroup2 = _interopRequireDefault(_OptGroup);

var _DataSet = require('../data-set/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _Record = require('../data-set/Record');

var _Record2 = _interopRequireDefault(_Record);

var _utils = require('../data-set/utils');

var _LookupCodeStore = require('../stores/LookupCodeStore');

var _LookupCodeStore2 = _interopRequireDefault(_LookupCodeStore);

var _spin = require('../spin');

var _spin2 = _interopRequireDefault(_spin);

var _EventManager = require('../_util/EventManager');

var _normalizeOptions = require('../option/normalizeOptions');

var _normalizeOptions2 = _interopRequireDefault(_normalizeOptions);

var _localeContext = require('../locale-context');

var _ObjectChainValue = require('../_util/ObjectChainValue');

var ObjectChainValue = _interopRequireWildcard(_ObjectChainValue);

var _isEmpty = require('../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function updateActiveKey(menu, activeKey) {
    var store = menu.getStore();
    var menuId = menu.getEventKey();
    var state = store.getState();
    store.setState({
        activeKey: (0, _extends4['default'])({}, state.activeKey, (0, _defineProperty3['default'])({}, menuId, activeKey))
    });
}
function getItemKey(record, text, value) {
    return 'item-' + (value || record.id) + '-' + (((0, _react.isValidElement)(text) ? text.key : text) || record.id);
}
function getSimpleValue(value, valueField) {
    if ((0, _isPlainObject2['default'])(value)) {
        return ObjectChainValue.get(value, valueField);
    }
    return value;
}

var Select = exports.Select = function (_TriggerField) {
    (0, _inherits3['default'])(Select, _TriggerField);

    function Select() {
        (0, _classCallCheck3['default'])(this, Select);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));

        _this.comboOptions = new _DataSet2['default']();
        _this.saveMenu = function (node) {
            return _this.menu = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Select, [{
        key: 'checkValue',
        value: function checkValue() {
            var _this2 = this;

            this.checkValueReaction = (0, _mobx.reaction)(function () {
                return _this2.cascadeOptions;
            }, function () {
                return _this2.processSelectedData();
            });
        }
    }, {
        key: 'checkCombo',
        value: function checkCombo() {
            var _this3 = this;

            this.checkComboReaction = (0, _mobx.reaction)(function () {
                return _this3.getValue();
            }, function (value) {
                return _this3.generateComboOption(value);
            });
        }
    }, {
        key: 'clearCheckValue',
        value: function clearCheckValue() {
            if (this.checkValueReaction) {
                this.checkValueReaction();
                this.checkValueReaction = void 0;
            }
        }
    }, {
        key: 'clearCheckCombo',
        value: function clearCheckCombo() {
            if (this.checkComboReaction) {
                this.checkComboReaction();
                this.checkComboReaction = void 0;
            }
        }
    }, {
        key: 'clearReaction',
        value: function clearReaction() {
            this.clearCheckValue();
            this.clearCheckCombo();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'componentWillMount', this).call(this);
            var _props = this.props,
                checkValueOnOptionsChange = _props.checkValueOnOptionsChange,
                combo = _props.combo;

            if (checkValueOnOptionsChange) {
                this.checkValue();
            }
            if (combo) {
                this.checkCombo();
                this.generateComboOption(this.getValue());
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'componentWillUnmount', this).call(this);
            this.clearReaction();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);
            var _props2 = this.props,
                checkValueOnOptionsChange = _props2.checkValueOnOptionsChange,
                combo = _props2.combo;

            if (checkValueOnOptionsChange && !nextProps.checkValueOnOptionsChange) {
                this.clearCheckValue();
            }
            if (!checkValueOnOptionsChange && nextProps.checkValueOnOptionsChange) {
                this.checkValue();
            }
            if (combo && !nextProps.combo) {
                this.removeComboOptions();
                this.clearCheckCombo();
            }
            if (!combo && nextProps.combo) {
                this.checkCombo();
                if ('value' in nextProps) {
                    this.generateComboOption(nextProps.value);
                }
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.forcePopupAlign();
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'getOtherProps', this).call(this), ['searchable', 'combo', 'multiple', 'value', 'name', 'options', 'optionsFilter', 'dropdownMatchSelectWidth', 'dropdownMenuStyle', 'checkValueOnOptionsChange', 'primitiveValue', 'optionRenderer']);
            return otherProps;
        }
    }, {
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return (0, _extends4['default'])({}, (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'getObservableProps', this).call(this, props, context), {
                children: props.children,
                options: props.options,
                combo: props.combo,
                primitiveValue: props.primitiveValue
            });
        }
    }, {
        key: 'getMenuPrefixCls',
        value: function getMenuPrefixCls() {
            return this.prefixCls + '-dropdown-menu';
        }
    }, {
        key: 'renderMultipleHolder',
        value: function renderMultipleHolder() {
            var name = this.name,
                multiple = this.multiple;

            if (multiple) {
                return _react2['default'].createElement('input', { key: 'value', className: this.prefixCls + '-multiple-value', value: this.toValueString(this.getValue()) || '', name: name, onChange: _noop2['default'] });
            } else {
                return _react2['default'].createElement('input', { key: 'value', type: 'hidden', value: this.toValueString(this.getValue()) || '', name: name, onChange: _noop2['default'] });
            }
        }
    }, {
        key: 'getMenu',
        value: function getMenu() {
            var _this4 = this;

            var menuProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = this.options,
                textField = this.textField,
                valueField = this.valueField,
                disabledField = this.disabledField,
                _props3 = this.props,
                dropdownMenuStyle = _props3.dropdownMenuStyle,
                optionRenderer = _props3.optionRenderer;

            if (!options) {
                return null;
            }
            var menuDisabled = this.isDisabled();
            var groups = options.getGroups();
            var optGroups = [];
            var selectedKeys = [];
            this.filteredOptions.forEach(function (record) {
                var previousGroup = void 0;
                groups.every(function (field) {
                    var label = record.get(field);
                    if (label !== void 0) {
                        if (!previousGroup) {
                            previousGroup = optGroups.find(function (item) {
                                return item.props.title === label;
                            });
                            if (!previousGroup) {
                                previousGroup = _react2['default'].createElement(_menu.ItemGroup, { key: 'group-' + label, title: label, children: [] });
                                optGroups.push(previousGroup);
                            }
                        } else {
                            var children = previousGroup.props.children;

                            previousGroup = children.find(function (item) {
                                return item.props.title === label;
                            });
                            if (!previousGroup) {
                                previousGroup = _react2['default'].createElement(_menu.ItemGroup, { key: 'group-' + label, title: label, children: [] });
                                children.push(previousGroup);
                            }
                        }
                        return true;
                    }
                    return false;
                });
                var value = record.get(valueField);
                var text = record.get(textField);
                var optionDisabled = record.get(disabledField);
                var key = getItemKey(record, text, value);
                if (!('selectedKeys' in menuProps) && _this4.isSelected(record)) {
                    selectedKeys.push(key);
                }
                var itemContent = optionRenderer ? optionRenderer({ record: record, text: text, value: value }) : text;
                var option = _react2['default'].createElement(
                    _menu.Item,
                    { key: key, value: record, disabled: menuDisabled ? menuDisabled : optionDisabled },
                    itemContent
                );
                if (previousGroup) {
                    var children = previousGroup.props.children;

                    children.push(option);
                } else {
                    optGroups.push(option);
                }
            });
            return _react2['default'].createElement(
                _menu2['default'],
                (0, _extends4['default'])({ ref: this.saveMenu, disabled: menuDisabled, defaultActiveFirst: true, multiple: this.menuMultiple, selectedKeys: selectedKeys, prefixCls: this.getMenuPrefixCls(), onClick: this.handleMenuClick, style: dropdownMenuStyle, focusable: false }, menuProps),
                optGroups
            );
        }
    }, {
        key: 'getPopupProps',
        value: function getPopupProps() {
            var options = this.options,
                textField = this.textField,
                valueField = this.valueField;

            return {
                dataSet: options,
                textField: textField,
                valueField: valueField
            };
        }
    }, {
        key: 'getPopupContent',
        value: function getPopupContent() {
            var options = this.options;

            var data = this.filteredOptions;
            return data.length ? _react2['default'].createElement(
                _spin2['default'],
                { spinning: options.status === "loading" /* loading */ },
                this.getMenu()
            ) : null;
        }
    }, {
        key: 'getPopupStyleFromAlign',
        value: function getPopupStyleFromAlign(target) {
            if (target && this.props.dropdownMatchSelectWidth) {
                return {
                    minWidth: (0, _UnitConvertor.pxToRem)(target.getBoundingClientRect().width)
                };
            }
        }
    }, {
        key: 'getTriggerIconFont',
        value: function getTriggerIconFont() {
            return 'baseline-arrow_drop_down';
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var menu = this.menu;

            if (!this.isDisabled() && !this.isReadOnly() && menu) {
                if (this.popup && menu.onKeyDown(e)) {
                    (0, _EventManager.stopEvent)(e);
                } else {
                    var direction = -1;
                    switch (e.keyCode) {
                        case _KeyCode2['default'].RIGHT:
                        case _KeyCode2['default'].DOWN:
                            direction = 1;
                        case _KeyCode2['default'].LEFT:
                        case _KeyCode2['default'].UP:
                            this.handleKeyDownPrevNext(e, menu, direction);
                            break;
                        case _KeyCode2['default'].END:
                        case _KeyCode2['default'].PAGE_DOWN:
                            direction = 1;
                        case _KeyCode2['default'].HOME:
                        case _KeyCode2['default'].PAGE_UP:
                            this.handleKeyDownFirstLast(e, menu, direction);
                            break;
                        case _KeyCode2['default'].ENTER:
                            this.handleKeyDownEnter(e);
                            break;
                        case _KeyCode2['default'].ESC:
                            this.handleKeyDownEsc(e);
                            break;
                        case _KeyCode2['default'].SPACE:
                            this.handleKeyDownSpace(e);
                            break;
                        default:
                    }
                }
            }
            (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleKeyDownFirstLast',
        value: function handleKeyDownFirstLast(e, menu, direction) {
            (0, _EventManager.stopEvent)(e);
            var children = menu.getFlatInstanceArray();
            var activeItem = children[direction < 0 ? 0 : children.length - 1];
            if (activeItem) {
                if (!this.editable || this.popup) {
                    updateActiveKey(menu, activeItem.props.eventKey);
                }
                if (!this.editable && !this.popup) {
                    this.choose(activeItem.props.value);
                }
            }
        }
    }, {
        key: 'handleKeyDownPrevNext',
        value: function handleKeyDownPrevNext(e, menu, direction) {
            if (!this.multiple && !this.editable) {
                var activeItem = menu.step(direction);
                if (activeItem) {
                    updateActiveKey(menu, activeItem.props.eventKey);
                    this.choose(activeItem.props.value);
                }
                e.preventDefault();
            } else if (e === _KeyCode2['default'].DOWN) {
                this.expand();
                e.preventDefault();
            }
        }
    }, {
        key: 'handleKeyDownEnter',
        value: function handleKeyDownEnter(_e) {}
    }, {
        key: 'handleKeyDownEsc',
        value: function handleKeyDownEsc(e) {
            if (this.popup) {
                e.preventDefault();
                this.collapse();
            }
        }
    }, {
        key: 'handleKeyDownSpace',
        value: function handleKeyDownSpace(e) {
            if (!this.editable) {
                e.preventDefault();
                if (!this.popup) {
                    this.expand();
                }
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            if (!e.isDefaultPrevented()) {
                if (!this.popup) {
                    this.resetFilter();
                }
                (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'handleBlur', this).call(this, e);
            }
        }
    }, {
        key: 'expand',
        value: function expand() {
            var filteredOptions = this.filteredOptions;

            if (filteredOptions && filteredOptions.length) {
                (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'expand', this).call(this);
            }
        }
    }, {
        key: 'syncValueOnBlur',
        value: function syncValueOnBlur(value) {
            var _this5 = this;

            if (value) {
                this.options.ready().then(function () {
                    var record = _this5.findByTextWithValue(value);
                    if (record) {
                        _this5.choose(record);
                    }
                });
            }
        }
    }, {
        key: 'findByTextWithValue',
        value: function findByTextWithValue(text) {
            var textField = this.textField;

            var records = this.cascadeOptions.filter(function (record) {
                return (0, _utils.isSameLike)(record.get(textField), text);
            });
            if (records.length > 1) {
                var valueField = this.valueField;

                var value = this.getValue();
                var found = records.find(function (record) {
                    return (0, _utils.isSameLike)(record.get(valueField), value);
                });
                if (found) {
                    return found;
                }
            }
            return records[0];
        }
    }, {
        key: 'findByText',
        value: function findByText(text) {
            var textField = this.textField;

            return this.cascadeOptions.find(function (record) {
                return (0, _utils.isSameLike)(record.get(textField), text);
            });
        }
    }, {
        key: 'findByValue',
        value: function findByValue(value) {
            var valueField = this.valueField;

            var autoType = this.getProp('type') === "auto" /* auto */;
            value = getSimpleValue(value, valueField);
            return this.cascadeOptions.find(function (record) {
                return autoType ? (0, _utils.isSameLike)(record.get(valueField), value) : (0, _utils.isSame)(record.get(valueField), value);
            });
        }
    }, {
        key: 'isSelected',
        value: function isSelected(record) {
            var valueField = this.valueField;

            var autoType = this.getProp('type') === "auto" /* auto */;
            return this.getValues().some(function (value) {
                return value = getSimpleValue(value, valueField), autoType ? (0, _utils.isSameLike)(record.get(valueField), value) : (0, _utils.isSame)(record.get(valueField), value);
            });
        }
    }, {
        key: 'generateComboOption',
        value: function generateComboOption(value, callback) {
            var _this6 = this;

            var currentComboOption = this.currentComboOption,
                textField = this.textField,
                valueField = this.valueField;

            if (value) {
                if ((0, _mobx.isArrayLike)(value)) {
                    value.forEach(function (v) {
                        return !(0, _isNil2['default'])(v) && _this6.generateComboOption(v);
                    });
                } else {
                    var found = this.findByText(value) || this.findByValue(value);
                    if (found) {
                        var text = found.get(textField);
                        if (text !== value && callback) {
                            callback(text);
                        }
                        this.removeComboOption();
                    } else if (currentComboOption) {
                        currentComboOption.set(textField, value);
                        currentComboOption.set(valueField, value);
                    } else {
                        this.createComboOption(value);
                    }
                }
            } else {
                this.removeComboOption();
            }
        }
    }, {
        key: 'createComboOption',
        value: function createComboOption(value) {
            var _comboOptions$create;

            var textField = this.textField,
                valueField = this.valueField,
                menu = this.menu;

            var record = this.comboOptions.create((_comboOptions$create = {}, (0, _defineProperty3['default'])(_comboOptions$create, textField, value), (0, _defineProperty3['default'])(_comboOptions$create, valueField, value), _comboOptions$create), 0);
            if (menu) {
                updateActiveKey(menu, getItemKey(record, value, value));
            }
        }
    }, {
        key: 'removeComboOptions',
        value: function removeComboOptions() {
            var _this7 = this;

            this.comboOptions.forEach(function (record) {
                return _this7.removeComboOption(record);
            });
        }
    }, {
        key: 'removeComboOption',
        value: function removeComboOption(record) {
            if (!record) {
                record = this.currentComboOption;
            }
            if (record && !this.isSelected(record)) {
                this.comboOptions.remove(record);
            }
        }
    }, {
        key: 'handlePopupAnimateAppear',
        value: function handlePopupAnimateAppear() {}
    }, {
        key: 'handlePopupAnimateEnd',
        value: function handlePopupAnimateEnd(key, exists) {
            if (!exists && key === 'align' && !this.isFocused) {
                this.resetFilter();
            }
        }
    }, {
        key: 'handleMenuClick',
        value: function handleMenuClick(_ref) {
            var value = _ref.item.props.value;

            if (this.isSelected(value) && this.multiple) {
                this.unChoose(value);
            } else {
                this.choose(value);
            }
        }
    }, {
        key: 'handleOptionSelect',
        value: function handleOptionSelect(record) {
            this.addValue(this.processRecordToObject(record));
        }
    }, {
        key: 'handleOptionUnSelect',
        value: function handleOptionUnSelect(record) {
            var valueField = this.valueField;

            var newValue = record.get(valueField);
            var autoType = this.getProp('type') === "auto" /* auto */;
            this.setValue(this.getValues().filter(function (v) {
                return v = getSimpleValue(v, valueField), autoType ? !(0, _utils.isSameLike)(v, newValue) : !(0, _utils.isSame)(v, newValue);
            }));
            this.removeComboOption(record);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _this8 = this;

            var value = e.target.value;

            this.setText(value);
            if (this.observableProps.combo) {
                this.generateComboOption(value, function (text) {
                    return _this8.setText(text);
                });
            }
            if (!this.popup) {
                this.expand();
            }
        }
    }, {
        key: 'generateLookupValue',
        value: function generateLookupValue(record) {
            var field = this.field,
                valueField = this.valueField;

            var lookupKey = field && _LookupCodeStore2['default'].getKey(field);
            var value = record.get(valueField);
            if (lookupKey) {
                var data = _LookupCodeStore2['default'].get(lookupKey);
                if (data && data.every(function (item) {
                    return item[valueField] !== value;
                })) {
                    data.push(record.toData());
                }
            }
            return value;
        }
    }, {
        key: 'processRecordToObject',
        value: function processRecordToObject(record) {
            var primitive = this.primitive;

            return primitive ? this.generateLookupValue(record) : record.toData();
        }
    }, {
        key: 'processObjectValue',
        value: function processObjectValue(value, textField) {
            if ((0, _isPlainObject2['default'])(value)) {
                return ObjectChainValue.get(value, textField);
            } else {
                var found = this.findByValue(value);
                if (found) {
                    return found.get(textField);
                }
            }
        }
    }, {
        key: 'processLookupValue',
        value: function processLookupValue(value) {
            var field = this.field,
                textField = this.textField,
                valueField = this.valueField,
                primitive = this.primitive;

            if (field && primitive) {
                var lookupKey = _LookupCodeStore2['default'].getKey(field);
                if (lookupKey) {
                    return (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'processValue', this).call(this, _LookupCodeStore2['default'].getText(lookupKey, value, valueField, textField));
                }
            }
            return (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'processValue', this).call(this, this.processObjectValue(value, textField));
        }
    }, {
        key: 'processValue',
        value: function processValue(value) {
            var text = this.processLookupValue(value);
            if ((0, _isEmpty2['default'])(text)) {
                if ((0, _isEmpty2['default'])(value)) {
                    return '';
                }
                if ((0, _isPlainObject2['default'])(value)) {
                    return ObjectChainValue.get(value, this.valueField);
                }
                return value;
            } else {
                return text;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.setText(void 0);
            (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'clear', this).call(this);
            this.removeComboOptions();
        }
    }, {
        key: 'resetFilter',
        value: function resetFilter() {
            this.setText(void 0);
            this.removeComboOption();
            this.forcePopupAlign();
        }
    }, {
        key: 'reset',
        value: function reset() {
            (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'reset', this).call(this);
            this.resetFilter();
        }
    }, {
        key: 'unChoose',
        value: function unChoose(record) {
            if (!this.multiple) {
                this.collapse();
            }
            if (record) {
                this.handleOptionUnSelect(record);
            }
        }
    }, {
        key: 'choose',
        value: function choose(record) {
            if (!this.multiple) {
                this.collapse();
            }
            if (record) {
                this.handleOptionSelect(record);
            }
        }
    }, {
        key: 'handlePopupHiddenChange',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(hidden) {
                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!hidden) {
                                    this.forcePopupAlign();
                                }
                                (0, _get3['default'])(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'handlePopupHiddenChange', this).call(this, hidden);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function handlePopupHiddenChange(_x2) {
                return _ref2.apply(this, arguments);
            }

            return handlePopupHiddenChange;
        }()
    }, {
        key: 'processSelectedData',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
                var _this9 = this;

                var values, field, filteredOptions, combo;
                return _regenerator2['default'].wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.comboOptions.remove(this.comboOptions.data);
                                values = this.getValues();
                                field = this.field;

                                if (!field) {
                                    _context2.next = 6;
                                    break;
                                }

                                _context2.next = 6;
                                return field.ready();

                            case 6:
                                filteredOptions = this.filteredOptions, combo = this.observableProps.combo;

                                (0, _mobx.runInAction)(function () {
                                    var newValues = values.filter(function (value) {
                                        var record = _this9.findByValue(value);
                                        if (record) {
                                            return true;
                                        } else if (combo) {
                                            _this9.createComboOption(value);
                                            return true;
                                        }
                                        return false;
                                    });
                                    if (field && field.get('cascadeMap') && filteredOptions.length && !(0, _isEqual2['default'])(newValues, values)) {
                                        _this9.setValue(_this9.multiple ? newValues : newValues[0]);
                                    }
                                });

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function processSelectedData() {
                return _ref3.apply(this, arguments);
            }

            return processSelectedData;
        }()
    }, {
        key: 'filterData',
        value: function filterData(data, text) {
            var textField = this.textField,
                searchable = this.searchable,
                optionsFilter = this.props.optionsFilter;

            data = optionsFilter ? data.filter(optionsFilter) : data;
            if (searchable && text) {
                var _ref4;

                var matchedRecords = data.filter(function (record) {
                    return record.get(textField).indexOf(text) !== -1;
                });
                return matchedRecords.length ? matchedRecords : [new _Record2['default']((_ref4 = {}, (0, _defineProperty3['default'])(_ref4, '' + this.textField, (0, _localeContext.$l)('Select', 'no_matching_results')), (0, _defineProperty3['default'])(_ref4, '' + this.valueField, null), (0, _defineProperty3['default'])(_ref4, 'disabled', true), _ref4))];
            }
            return data;
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: (0, _localeContext.$l)('Select', label ? 'value_missing_with_label' : 'value_missing', { label: label })
            };
        }
    }, {
        key: 'textField',
        get: function get() {
            return this.getProp('textField') || 'meaning';
        }
    }, {
        key: 'valueField',
        get: function get() {
            return this.getProp('valueField') || 'value';
        }
    }, {
        key: 'disabledField',
        get: function get() {
            return this.getProp('disabledField') || 'disabled';
        }
    }, {
        key: 'currentComboOption',
        get: function get() {
            var _this10 = this;

            return this.comboOptions.filter(function (record) {
                return !_this10.isSelected(record);
            })[0];
        }
    }, {
        key: 'filteredOptions',
        get: function get() {
            var cascadeOptions = this.cascadeOptions,
                text = this.text;

            return this.filterData(cascadeOptions, text);
        }
    }, {
        key: 'cascadeOptions',
        get: function get() {
            var record = this.record,
                field = this.field,
                options = this.options,
                comboOptions = this.comboOptions;

            var data = [].concat((0, _toConsumableArray3['default'])(comboOptions.data), (0, _toConsumableArray3['default'])(options.data));
            if (field) {
                var cascadeMap = field.get('cascadeMap');
                if (cascadeMap) {
                    if (record) {
                        var cascades = Object.keys(cascadeMap);
                        return data.filter(function (item) {
                            return cascades.every(function (cascade) {
                                return (0, _utils.isSameLike)(record.get(cascadeMap[cascade]), item.get(cascade));
                            });
                        });
                    } else {
                        return [];
                    }
                }
            }
            return data;
        }
    }, {
        key: 'editable',
        get: function get() {
            var combo = this.observableProps.combo;

            return !this.isReadOnly() && (!!this.searchable || !!combo);
        }
    }, {
        key: 'searchable',
        get: function get() {
            return !!this.props.searchable;
        }
    }, {
        key: 'multiple',
        get: function get() {
            return !!this.getProp('multiple');
        }
    }, {
        key: 'menuMultiple',
        get: function get() {
            return this.multiple;
        }
    }, {
        key: 'options',
        get: function get() {
            var field = this.field,
                textField = this.textField,
                valueField = this.valueField,
                multiple = this.multiple,
                _observableProps = this.observableProps,
                children = _observableProps.children,
                options = _observableProps.options;

            return options || (0, _normalizeOptions2['default'])({ field: field, textField: textField, valueField: valueField, multiple: multiple, children: children });
        }
    }, {
        key: 'popup',
        get: function get() {
            return this.statePopup && this.filteredOptions.length > 0;
        }
    }, {
        key: 'primitive',
        get: function get() {
            var type = this.getProp('type');
            return this.observableProps.primitiveValue !== false && type !== "object" /* object */;
        }
    }]);
    return Select;
}(_TriggerField3['default']);

Select.displayName = 'Select';
Select.propTypes = (0, _extends4['default'])({
    /**
     * 复合输入值
     * @default false
     */
    combo: _propTypes2['default'].bool,
    /**
     * 过滤器
     * @default false
     */
    searchable: _propTypes2['default'].bool,
    /**
     * 是否为原始值
     * true - 选项中valueField对应的值
     * false - 选项值对象
     */
    primitiveValue: _propTypes2['default'].bool,
    /**
     * 渲染Option文本的钩子
     * @example
     * ```js
     * <Select
     *   {...props}
     *   optionRenderer={({ record, text, value }) => text + '$'}
     * />
     * ```
     */
    optionRenderer: _propTypes2['default'].func
}, _TriggerField3['default'].propTypes);
Select.defaultProps = (0, _extends4['default'])({}, _TriggerField3['default'].defaultProps, {
    suffixCls: 'select',
    combo: false,
    searchable: false,
    dropdownMatchSelectWidth: true,
    checkValueOnOptionsChange: true
});
Select.Option = _Option2['default'];
Select.OptGroup = _OptGroup2['default'];
tslib_1.__decorate([_mobx.computed], Select.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "textField", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "valueField", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "disabledField", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "cascadeOptions", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "editable", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "searchable", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "multiple", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "menuMultiple", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "options", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "popup", null);
tslib_1.__decorate([_mobx.computed], Select.prototype, "primitive", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "getMenu", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "getPopupStyleFromAlign", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "handleKeyDown", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "handleBlur", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "handlePopupAnimateEnd", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "handleMenuClick", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "handleChange", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "reset", null);
tslib_1.__decorate([_autobind2['default']], Select.prototype, "handlePopupHiddenChange", null);
var ObserverSelect = function (_Select) {
    (0, _inherits3['default'])(ObserverSelect, _Select);

    function ObserverSelect() {
        (0, _classCallCheck3['default'])(this, ObserverSelect);
        return (0, _possibleConstructorReturn3['default'])(this, (ObserverSelect.__proto__ || Object.getPrototypeOf(ObserverSelect)).apply(this, arguments));
    }

    return ObserverSelect;
}(Select);
ObserverSelect.defaultProps = Select.defaultProps;
ObserverSelect.Option = _Option2['default'];
ObserverSelect.OptGroup = _OptGroup2['default'];
ObserverSelect = tslib_1.__decorate([_mobxReact.observer], ObserverSelect);
exports['default'] = ObserverSelect;