'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobx = require('mobx');

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _defer = require('lodash/defer');

var _defer2 = _interopRequireDefault(_defer);

var _Record = require('./Record');

var _Record2 = _interopRequireDefault(_Record);

var _Validator = require('../validator/Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _LookupCodeStore = require('../stores/LookupCodeStore');

var _LookupCodeStore2 = _interopRequireDefault(_LookupCodeStore);

var _LovCodeStore = require('../stores/LovCodeStore');

var _LovCodeStore2 = _interopRequireDefault(_LovCodeStore);

var _localeContext = require('../locale-context');

var _localeContext2 = _interopRequireDefault(_localeContext);

var _utils = require('./utils');

var _configure = require('../../../lib/configure');

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function setFieldDirty(field, dirty) {
    if (dirty) {
        field.dirty = true;
    } else {
        var record = field.record,
            name = field.name;

        if (record) {
            if (!isValueDirty(name, record)) {
                field.dirty = false;
            }
        } else {
            field.dirty = false;
        }
    }
}
function isValueDirty(name, record) {
    var pristineValue = record.getPristineValue(name);
    var value = record.get(name);
    return !(0, _isEqual2['default'])(pristineValue, value);
}
function getParentField(name, record) {
    var parentFieldIndex = name.lastIndexOf('.');
    if (parentFieldIndex > -1) {
        var parentFieldName = name.slice(0, parentFieldIndex);
        var parentField = record.getField(parentFieldName);
        if (parentField) {
            return parentField;
        }
        return getParentField(parentFieldName, record);
    }
}

var Field = function () {
    // private reactions: { [key: string]: IReactionDisposer } = {};
    // private lookupReaction: IReactionDisposer;
    // private lovReaction: IReactionDisposer;
    function Field() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _this = this;

        var dataSet = arguments[1];
        var record = arguments[2];
        (0, _classCallCheck3['default'])(this, Field);

        this.validator = new _Validator2['default']();
        this.lastDynamicProps = {};
        this.isDirtyComputing = false;
        this.isBinding = false;
        (0, _mobx.runInAction)(function () {
            _this.dataSet = dataSet;
            _this.record = record;
            _this.props = _this.pristineProps = props;
            _this.modified = false;
            _this.fetchLookup();
            _this.fetchLovConfig();
            // this.lookupReaction = reaction(() => this.fetchLookup(), noop);
            // this.lovReaction = reaction(() => this.fetchLovConfig(), noop);
        });
    }

    (0, _createClass3['default'])(Field, [{
        key: 'getProps',

        /**
         * 获取所有属性
         * @return 属性对象
         */
        value: function getProps() {
            var dsField = this.findDataSetField();
            return (0, _merge2['default'])({ lookupUrl: (0, _configure.getConfig)('lookupUrl') }, Field.defaultProps, dsField && dsField.props, this.props);
        }
        /**
         * 根据属性名获取属性值
         * @param propsName 属性名
         * @return {any}
         */

    }, {
        key: 'get',
        value: function get(propsName) {
            if (propsName !== 'dynamicProps') {
                var dynamicProps = this.get('dynamicProps');
                if (typeof dynamicProps === 'function') {
                    var dataSet = this.dataSet,
                        record = this.record,
                        name = this.name;

                    if (dataSet && dataSet.tlsRecord) {
                        record = dataSet.tlsRecord;
                        dataSet = record.dataSet;
                    }
                    if (record && !record.data) {
                        record = new _Record2['default'](record.initData);
                        record.dataSet = dataSet;
                    }
                    if (dataSet && record) {
                        var props = dynamicProps({ dataSet: dataSet, record: record, name: name });
                        if (props && propsName in props) {
                            // const reactor = this.reactions[propsName];
                            // if (!reactor) {
                            //   this.reactions[propsName] = reaction(() => this.get(propsName), () => {
                            //     this.validator.reset();
                            //     this.checkValidity();
                            //   });
                            // }
                            var prop = props[propsName];
                            this.checkDynamicProp(propsName, prop);
                            return prop;
                        }
                        this.checkDynamicProp(propsName, void 0);
                    }
                }
            }
            var value = (0, _mobx.get)(this.props, propsName);
            if (value !== void 0) {
                return value;
            }
            var dsField = this.findDataSetField();
            if (dsField) {
                return dsField.get(propsName);
            }
            if (propsName === 'lookupUrl') {
                return (0, _configure.getConfig)(propsName);
            }
            return Field.defaultProps[propsName];
        }
        /**
         * 设置属性值
         * @param propsName 属性名
         * @param value 属性值
         * @return {any}
         */

    }, {
        key: 'set',
        value: function set(propsName, value) {
            var oldValue = this.get(propsName);
            if (oldValue !== value) {
                (0, _mobx.set)(this.props, propsName, value);
                var record = this.record,
                    dataSet = this.dataSet;

                if (record) {
                    if (propsName === 'type') {
                        record.set(this.name, (0, _utils.processValue)(record.get(this.name), this));
                    }
                }
                if (dataSet) {
                    dataSet.fireEvent("fieldChange" /* fieldChange */, { dataSet: dataSet, record: record, field: this, propsName: propsName, value: value, oldValue: oldValue });
                }
                this.handlePropChange(propsName);
            }
        }
        /**
         * 根据lookup值获取lookup对象
         * @param value lookup值
         * @return {object}
         */

    }, {
        key: 'getLookupData',
        value: function getLookupData() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getValue();

            var valueField = this.get('valueField');
            var lookupKey = _LookupCodeStore2['default'].getKey(this);
            var data = {};
            if (lookupKey) {
                return _LookupCodeStore2['default'].getByValue(lookupKey, value, valueField) || data;
            }
            return data;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var dataSet = this.dataSet,
                name = this.name;

            var record = this.record || dataSet && dataSet.current;
            if (record) {
                return record.get(name);
            }
        }
        /**
         * 根据lookup值获取lookup含义
         * @param value lookup值
         * @param boolean showValueIfNotFound
         * @return {string}
         */

    }, {
        key: 'getText',
        value: function getText() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getValue();
            var showValueIfNotFound = arguments[1];

            var textField = this.get('textField');
            var valueField = this.get('valueField');
            var lookupKey = _LookupCodeStore2['default'].getKey(this);
            if (lookupKey) {
                var found = _LookupCodeStore2['default'].getByValue(lookupKey, value, valueField);
                if (found) {
                    return (0, _mobx.get)(found, textField);
                } else if (showValueIfNotFound) {
                    return value;
                } else {
                    return void 0;
                }
            }
            var options = this.getOptions();
            if (options) {
                var _found = options.find(function (record) {
                    return record.get(valueField) === value;
                });
                if (_found) {
                    return _found.get(textField);
                }
            }
            if (textField && (0, _isObject2['default'])(value)) {
                return value[textField];
            }
            return value;
        }
    }, {
        key: 'setOptions',
        value: function setOptions(options) {
            this.set('options', options);
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            return this.get('options');
        }
        /**
         * 重置设置的属性
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.props = this.pristineProps;
        }
    }, {
        key: 'commit',
        value: function commit() {
            this.dirty = false;
            this.validator.reset();
        }
        /**
         * 是否必选
         * @return true | false
         */

    }, {
        key: 'setLovPara',

        /**
         * 设置Lov的查询参数
         * @param {String} name
         * @param {Object} value
         */
        value: function setLovPara(name, value) {
            var p = this.get('lovPara') || {};
            if (value === null) {
                delete p[name];
            } else {
                p[name] = value;
            }
            this.set('lovPara', p);
        }
    }, {
        key: 'getValidatorProps',
        value: function getValidatorProps() {
            var record = this.record,
                dataSet = this.dataSet,
                name = this.name,
                type = this.type,
                required = this.required;

            if (record) {
                var customValidator = this.get('validator');
                var max = this.get('max');
                var min = this.get('min');
                var pattern = this.get('pattern');
                var step = this.get('step');
                var minLength = this.get('minLength');
                var maxLength = this.get('maxLength');
                var label = this.get('label');
                return {
                    type: type,
                    required: required,
                    record: record,
                    dataSet: dataSet,
                    name: name,
                    unique: this.dirty ? this.get('unique') : false,
                    customValidator: customValidator,
                    pattern: pattern,
                    max: max,
                    min: min,
                    step: step,
                    minLength: minLength,
                    maxLength: maxLength,
                    label: label
                };
            }
        }
        /**
         * 校验字段值
         * 只有通过record.getField()获取的field才能校验
         * @return true | false
         */

    }, {
        key: 'checkValidity',
        value: function () {
            var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
                var valid, record, validator, name, value;
                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                valid = true;
                                record = this.record, validator = this.validator, name = this.name;

                                if (!record) {
                                    _context.next = 8;
                                    break;
                                }

                                value = record.get(name);

                                validator.setProps(this.getValidatorProps());
                                _context.next = 7;
                                return validator.checkValidity(value);

                            case 7:
                                valid = _context.sent;

                            case 8:
                                return _context.abrupt('return', valid);

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function checkValidity() {
                return _ref.apply(this, arguments);
            }

            return checkValidity;
        }()
    }, {
        key: 'fetchLookup',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
                var axiosConfig;
                return _regenerator2['default'].wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                axiosConfig = _LookupCodeStore2['default'].getAxiosConfig(this);

                                if (!axiosConfig.url) {
                                    _context2.next = 8;
                                    break;
                                }

                                _context2.prev = 2;
                                _context2.next = 5;
                                return this.lookUpPending = _LookupCodeStore2['default'].fetchLookupData(axiosConfig);

                            case 5:
                                _context2.prev = 5;

                                this.lookUpPending = void 0;
                                return _context2.finish(5);

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2,, 5, 8]]);
            }));

            function fetchLookup() {
                return _ref2.apply(this, arguments);
            }

            return fetchLookup;
        }()
    }, {
        key: 'fetchLovConfig',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee3() {
                var lovCode, config, textField, valueField;
                return _regenerator2['default'].wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                lovCode = this.get('lovCode');

                                if (!lovCode) {
                                    _context3.next = 10;
                                    break;
                                }

                                _context3.prev = 2;
                                _context3.next = 5;
                                return this.lovPending = _LovCodeStore2['default'].fetchConfig(lovCode);

                            case 5:
                                config = _context3.sent;

                                if (config) {
                                    textField = config.textField, valueField = config.valueField;

                                    if (textField) {
                                        this.set('textField', textField);
                                        this.pristineProps.textField = valueField;
                                    }
                                    if (valueField) {
                                        this.set('valueField', valueField);
                                        this.pristineProps.valueField = valueField;
                                    }
                                }

                            case 7:
                                _context3.prev = 7;

                                this.lovPending = void 0;
                                return _context3.finish(7);

                            case 10:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2,, 7, 10]]);
            }));

            function fetchLovConfig() {
                return _ref3.apply(this, arguments);
            }

            return fetchLovConfig;
        }()
    }, {
        key: 'isValid',
        value: function isValid() {
            // return findInvalidField(this).validator.validity.valid;
            return this.validator.validity.valid;
        }
    }, {
        key: 'getValidationMessage',
        value: function getValidationMessage() {
            // return findInvalidField(this).validator.validationMessage;
            return this.validator.validationMessage;
        }
    }, {
        key: 'getValidityState',
        value: function getValidityState() {
            // return findInvalidField(this).validator.validity;
            return this.validator.validity;
        }
    }, {
        key: 'getValidationErrorValues',
        value: function getValidationErrorValues() {
            // return findInvalidField(this).validator.validationErrorValues;
            return this.validator.validationErrorValues;
        }
    }, {
        key: 'ready',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee4() {
                var lookUpPending, lovPending, result;
                return _regenerator2['default'].wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                lookUpPending = this.lookUpPending, lovPending = this.lovPending;
                                _context4.next = 3;
                                return Promise.all([this.lookUpPending, this.lovPending]);

                            case 3:
                                result = _context4.sent;

                                if (!(this.lookUpPending && this.lookUpPending !== lookUpPending || this.lovPending && this.lovPending !== lovPending)) {
                                    _context4.next = 6;
                                    break;
                                }

                                return _context4.abrupt('return', this.ready());

                            case 6:
                                return _context4.abrupt('return', result);

                            case 7:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function ready() {
                return _ref4.apply(this, arguments);
            }

            return ready;
        }()
    }, {
        key: 'findDataSetField',
        value: function findDataSetField() {
            var dataSet = this.dataSet,
                name = this.name,
                record = this.record;

            if (record && dataSet && name) {
                return dataSet.getField(name);
            }
        }
    }, {
        key: 'checkDynamicProp',
        value: function checkDynamicProp(propsName, newProp) {
            var _this2 = this;

            if (propsName in this.lastDynamicProps) {
                var oldProp = this.lastDynamicProps[propsName];
                if (oldProp !== newProp) {
                    (0, _defer2['default'])(function () {
                        if (propsName in _this2.validator.props || propsName === 'validator') {
                            _this2.validator.reset();
                            // this.checkValidity();
                        }
                        _this2.handlePropChange(propsName);
                    });
                }
            }
            this.lastDynamicProps[propsName] = newProp;
        }
    }, {
        key: 'handlePropChange',
        value: function handlePropChange(propsName) {
            if (propsName === 'type' || propsName === 'lookupUrl' || propsName === 'lookupCode') {
                this.fetchLookup();
            }
            if (propsName === 'lovCode') {
                this.fetchLookup();
                this.fetchLovConfig();
            }
        }
    }, {
        key: 'dirty',
        get: function get() {
            if (this.modified) {
                return true;
            }
            var record = this.record,
                name = this.name;

            if (record) {
                try {
                    this.isDirtyComputing = true;
                    var bind = this.get('bind') || name;
                    if (bind !== name) {
                        var field = record.getField(bind);
                        if (field && !field.isDirtyComputing) {
                            return field.dirty;
                        }
                    }
                    var parentField = getParentField(bind, record);
                    if (parentField && parentField !== this && !parentField.isDirtyComputing) {
                        return parentField.dirty && isValueDirty(bind, record);
                    }
                    if (record.tlsDataSet && this.type === "intl" /* intl */) {
                            var current = record.tlsDataSet.current;

                            if (current) {
                                return Object.keys(_localeContext2['default'].supports).some(function (lang) {
                                    var langField = current.getField(name + '.' + lang);
                                    return langField && !langField.isDirtyComputing ? langField.dirty : false;
                                });
                            }
                        }
                } catch (e) {
                    (0, _warning2['default'])(false, 'Field#' + name + '; ' + e.message);
                } finally {
                    this.isDirtyComputing = false;
                }
            }
            return false;
        },
        set: function set(dirty) {
            var _this3 = this;

            (0, _mobx.runInAction)(function () {
                var record = _this3.record,
                    name = _this3.name;

                if (record) {
                    var bind = _this3.get('bind') || name;
                    if (bind !== name) {
                        var field = record.getField(bind);
                        if (field) {
                            setFieldDirty(field, dirty);
                        }
                    }
                    var parentField = getParentField(bind, record);
                    if (parentField) {
                        setFieldDirty(parentField, dirty);
                    }
                }
                _this3.modified = dirty;
            });
        }
    }, {
        key: 'name',
        get: function get() {
            return this.props.name;
        }
    }, {
        key: 'order',
        get: function get() {
            return this.get('order');
        },
        set: function set(order) {
            this.set('order', order);
        }
    }, {
        key: 'required',
        get: function get() {
            return this.get('required');
        }
        /**
         * 设置是否必选
         * @param required 是否必选
         */
        ,
        set: function set(required) {
            this.set('required', required);
        }
        /**
         * 是否只读
         * @return true | false
         */

    }, {
        key: 'readOnly',
        get: function get() {
            return this.get('readOnly');
        }
        /**
         * 设置是否只读
         * @param readOnly 是否只读
         */
        ,
        set: function set(readOnly) {
            this.set('readOnly', readOnly);
        }
        /**
         * 获取字段类型
         * @return 获取字段类型
         */

    }, {
        key: 'type',
        get: function get() {
            return this.get('type');
        }
        /**
         * 设置字段类型
         * @param type 字段类型
         */
        ,
        set: function set(type) {
            this.set('type', type);
        }
    }]);
    return Field;
}();

exports['default'] = Field;

Field.defaultProps = {
    type: "auto" /* auto */
    , required: false,
    readOnly: false,
    group: false,
    textField: 'meaning',
    valueField: 'value',
    trueValue: true,
    falseValue: false
};
tslib_1.__decorate([_mobx.observable], Field.prototype, "props", void 0);
tslib_1.__decorate([_mobx.observable], Field.prototype, "modified", void 0);
tslib_1.__decorate([_mobx.computed], Field.prototype, "dirty", null);
tslib_1.__decorate([_mobx.action], Field.prototype, "set", null);
tslib_1.__decorate([_mobx.action], Field.prototype, "reset", null);
tslib_1.__decorate([_mobx.action], Field.prototype, "commit", null);
module.exports = exports['default'];