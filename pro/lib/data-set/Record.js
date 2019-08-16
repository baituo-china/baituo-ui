'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobx = require('mobx');

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _DataSet = require('./DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _utils = require('./utils');

var _ObjectChainValue = require('../_util/ObjectChainValue');

var ObjectChainValue = _interopRequireWildcard(_ObjectChainValue);

var _localeContext = require('../locale-context');

var _localeContext2 = _interopRequireDefault(_localeContext);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * 记录ID生成器
 */
var IDGen = /*#__PURE__*/_regenerator2['default'].mark(function _callee(start) {
    return _regenerator2['default'].wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!true) {
                        _context.next = 5;
                        break;
                    }

                    _context.next = 3;
                    return ++start;

                case 3:
                    _context.next = 0;
                    break;

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})(1000);

var Record = function () {
    function Record() {
        var _this = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var dataSet = arguments[1];
        (0, _classCallCheck3['default'])(this, Record);

        this.dataSetSnapshot = {};
        (0, _mobx.runInAction)(function () {
            _this.fields = _mobx.observable.map();
            _this.status = "add" /* add */;
            _this.selectable = true;
            _this.isSelected = false;
            _this.isCurrent = false;
            _this.isCached = false;
            _this.id = IDGen.next().value;
            if (dataSet) {
                _this.dataSet = dataSet;
                var fields = dataSet.fields;

                if (fields) {
                    _this.initFields(fields);
                }
            }
            _this.initData = (0, _mobx.toJS)(data);
            _this.data = _this.pristineData = _this.processData(_this.initData);
            delete _this.initData;
        });
    }

    (0, _createClass3['default'])(Record, [{
        key: 'toData',
        value: function toData() {
            var json = this.normalizeData();
            var tls = this.normalizeTls(true);
            if (tls) {
                json.__tls = tls;
            }
            this.normalizeCascadeData(json, true);
            return json;
        }
    }, {
        key: 'toJSONData',
        value: function toJSONData(noCascade) {
            var status = this.status;

            var dirty = status !== "sync" /* sync */;
            var json = this.normalizeData(true);
            var tls = this.normalizeTls();
            if (tls) {
                dirty = true;
                json.__tls = tls;
            }
            if (!noCascade && this.normalizeCascadeData(json)) {
                dirty = true;
            }
            return (0, _extends3['default'])({}, json, {
                __id: this.id,
                __status: status === "sync" /* sync */ ? "update" /* update */ : status,
                __dirty: dirty
            });
        }
    }, {
        key: 'validate',
        value: function validate(all, noCascade) {
            var dataSetSnapshot = this.dataSetSnapshot,
                isCurrent = this.isCurrent,
                dataSet = this.dataSet,
                status = this.status,
                fields = this.fields;

            return Promise.all([].concat((0, _toConsumableArray3['default'])(Array.from(fields.values()).map(function (field) {
                return all || status !== "sync" /* sync */ ? field.checkValidity() : true;
            })), (0, _toConsumableArray3['default'])(noCascade ? [] : Object.keys(dataSetSnapshot).map(function (key) {
                return (isCurrent && dataSet ? dataSet.children[key] : new _DataSet2['default']().restore(dataSetSnapshot[key])).validate(all);
            })))).then(function (results) {
                return results.every(function (result) {
                    return result;
                });
            });
        }
    }, {
        key: 'getField',
        value: function getField(fieldName) {
            if (fieldName) {
                return this.fields.get(fieldName);
            }
        }
    }, {
        key: 'getCascadeRecords',
        value: function getCascadeRecords(fieldName) {
            var dataSet = this.dataSet;

            if (fieldName && dataSet) {
                var childDataSet = dataSet.children[fieldName];
                if (childDataSet) {
                    var snapshot = this.dataSetSnapshot[fieldName];
                    if (snapshot) {
                        var isCurrent = dataSet.current === this;
                        return (isCurrent ? childDataSet : new _DataSet2['default']().restore(snapshot)).slice();
                    } else {
                        var data = this.get(fieldName);
                        if ((0, _mobx.isObservableArray)(data)) {
                            var newSnapshot = childDataSet.snapshot();
                            this.dataSetSnapshot[fieldName] = childDataSet.loadData(data.slice()).snapshot();
                            var records = childDataSet.slice();
                            childDataSet.restore(newSnapshot);
                            return records;
                        }
                    }
                }
            }
        }
    }, {
        key: 'get',
        value: function get(fieldName) {
            return _utils.getRecordValue.call(this, this.data, function (child, checkField) {
                return child.get(checkField);
            }, fieldName);
        }
    }, {
        key: 'getPristineValue',
        value: function getPristineValue(fieldName) {
            return _utils.getRecordValue.call(this, this.pristineData, function (child, checkField) {
                return child.getPristineValue(checkField);
            }, fieldName);
        }
    }, {
        key: 'set',
        value: function set(item, value) {
            var _this2 = this;

            if ((0, _isString2['default'])(item)) {
                var fieldName = item;
                var oldName = fieldName;
                var field = this.getField(fieldName);
                if (field) {
                    (0, _utils.checkFieldType)(value, field);
                    var bind = field.get('bind');
                    if (bind) {
                        fieldName = bind;
                    }
                }
                var oldValue = (0, _mobx.toJS)(this.get(fieldName));
                var newValue = (0, _utils.processValue)(value, field);
                if (!(0, _utils.isSame)(newValue, oldValue)) {
                    var fields = this.fields;

                    ObjectChainValue.set(this.data, fieldName, newValue, fields);
                    var pristineValue = this.getPristineValue(fieldName);
                    if ((0, _utils.isSame)(pristineValue, newValue)) {
                        if (field && field.dirty) {
                            field.dirty = false;
                            if (this.status === "update" /* update */ && Array.from(fields.values()).every(function (f) {
                                return !f.dirty;
                            })) {
                                this.status = "sync" /* sync */;
                            }
                        }
                    } else {
                        if (field) {
                            field.dirty = true;
                        }
                        if (this.status === "sync" /* sync */) {
                                this.status = "update" /* update */;
                            }
                    }
                    var dataSet = this.dataSet,
                        tlsDataSet = this.tlsDataSet;

                    if (dataSet) {
                        if (tlsDataSet) {
                            var _dataSet$lang = dataSet.lang,
                                lang = _dataSet$lang === undefined ? _localeContext2['default'].locale.lang : _dataSet$lang;
                            var current = tlsDataSet.current;

                            if (current && current.get(fieldName)) {
                                current.set(fieldName + '.' + lang, newValue);
                            }
                        }
                        dataSet.fireEvent("update" /* update */, { dataSet: dataSet, record: this, name: oldName, value: newValue, oldValue: oldValue });
                        var checkField = dataSet.props.checkField;

                        if (checkField && (checkField === fieldName || checkField === oldName)) {
                            var children = this.children;

                            if (children) {
                                children.forEach(function (record) {
                                    return record.set(fieldName, value);
                                });
                            }
                        }
                    }
                }
                if (field) {
                    (0, _utils.findBindFields)(field, this.fields).forEach(function (oneField) {
                        return (
                            // oneField.dirty = field.dirty,
                            oneField.validator.reset(), oneField.checkValidity()
                        );
                    });
                }
            } else if ((0, _isPlainObject2['default'])(item)) {
                Object.keys(item).forEach(function (key) {
                    return _this2.set(key, item[key]);
                });
            }
            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {
            var _this3 = this;

            var dataSet = this.dataSet;

            var cloneData = (0, _cloneDeep2['default'])((0, _mobx.toJS)(this.data));
            if (dataSet) {
                var _dataSet$props = dataSet.props,
                    primaryKey = _dataSet$props.primaryKey,
                    tlsUrl = _dataSet$props.tlsUrl;

                if (primaryKey) {
                    delete cloneData[primaryKey];
                }
                var clone = new Record(cloneData, dataSet);
                if (tlsUrl && primaryKey) {
                    this.tls().then(function (locales) {
                        if (locales) {
                            var record = locales[0];
                            _this3.mergeLocaleData(record);
                            clone.tlsDataSet = new _DataSet2['default']({
                                fields: (0, _utils.mergeTlsFields)(_this3.fields, _localeContext2['default'].supports, Object.keys(record))
                            });
                            clone.tlsDataSet.tlsRecord = clone;
                            clone.tlsDataSet.create(record);
                            if (dataSet) {
                                var _dataSet$lang2 = dataSet.lang,
                                    lang = _dataSet$lang2 === undefined ? _localeContext2['default'].locale.lang : _dataSet$lang2;

                                Object.keys(record).forEach(function (fieldName) {
                                    return clone.set(fieldName, record[fieldName][lang]);
                                });
                            }
                        }
                    });
                    clone.localeSupports = this.localeSupports;
                }
                return clone;
            } else {
                return new Record(cloneData);
            }
        }
    }, {
        key: 'ready',
        value: function () {
            var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
                var pending, result;
                return _regenerator2['default'].wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                pending = this.pending;
                                _context2.next = 3;
                                return Promise.all([pending].concat((0, _toConsumableArray3['default'])(Array.from(this.fields.values()).map(function (field) {
                                    return field.ready();
                                }))));

                            case 3:
                                result = _context2.sent;

                                if (!(this.pending && this.pending !== pending)) {
                                    _context2.next = 6;
                                    break;
                                }

                                return _context2.abrupt('return', this.ready());

                            case 6:
                                return _context2.abrupt('return', result);

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function ready() {
                return _ref.apply(this, arguments);
            }

            return ready;
        }()
    }, {
        key: 'mergeLocaleData',
        value: function mergeLocaleData(record) {
            var _this4 = this;

            var dataSet = this.dataSet;

            if (record && dataSet) {
                var _dataSet$lang3 = dataSet.lang,
                    lang = _dataSet$lang3 === undefined ? _localeContext2['default'].locale.lang : _dataSet$lang3;

                Object.keys(record).forEach(function (name) {
                    var field = _this4.getField(name);
                    if (field && field.dirty) {
                        record[name][lang] = _this4.get(name);
                    }
                });
            }
        }
    }, {
        key: 'tls',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee3(name) {
                var _this5 = this;

                var supports, dataSet, tlsUrl, _dataSet$lang4, lang, _dataSet$props2, primaryKey, dataKey, data, current;

                return _regenerator2['default'].wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                supports = _localeContext2['default'].supports;
                                dataSet = this.dataSet;

                                if (!dataSet) {
                                    _context3.next = 18;
                                    break;
                                }

                                tlsUrl = dataSet.tlsUrl, _dataSet$lang4 = dataSet.lang, lang = _dataSet$lang4 === undefined ? _localeContext2['default'].locale.lang : _dataSet$lang4;
                                _dataSet$props2 = dataSet.props, primaryKey = _dataSet$props2.primaryKey, dataKey = _dataSet$props2.dataKey;

                                if (!this.tlsDataSet) {
                                    (0, _warning2['default'])(!!primaryKey, 'If you want to use IntlField, please set `primaryKey` for dataSet.');
                                    (0, _warning2['default'])(!!tlsUrl, 'If you want to use IntlField, please set `tlsUrl` for dataSet.');
                                    if (tlsUrl && primaryKey) {
                                        this.tlsDataSet = new _DataSet2['default']({
                                            data: name ? [(0, _defineProperty3['default'])({}, name, (0, _defineProperty3['default'])({}, lang, this.get(name)))] : void 0,
                                            queryUrl: tlsUrl,
                                            queryParameter: {
                                                key: this.get(primaryKey)
                                            },
                                            fields: name ? (0, _utils.mergeTlsFields)(this.fields, supports, [name]) : void 0,
                                            events: (0, _defineProperty3['default'])({}, "beforeLoad" /* beforeLoad */, function beforeLoad(_ref4) {
                                                var _ref4$data = (0, _slicedToArray3['default'])(_ref4.data, 1),
                                                    record = _ref4$data[0];

                                                if (_this5.tlsDataSet) {
                                                    _this5.tlsDataSet.initFields((0, _utils.mergeTlsFields)(_this5.fields, supports, Object.keys(record)));
                                                }
                                                _this5.mergeLocaleData(record);
                                                Object.keys(record).forEach(function (fieldName) {
                                                    return _this5.set(fieldName, record[fieldName][lang]);
                                                });
                                            })
                                        });
                                        this.tlsDataSet.tlsRecord = this;
                                    }
                                } else if (name) {
                                    (0, _utils.mergeTlsFields)(this.fields, supports, [name]).forEach(function (field) {
                                        return field.name && _this5.tlsDataSet && _this5.tlsDataSet.addField(field.name, field);
                                    });
                                }

                                if (!this.tlsDataSet) {
                                    _context3.next = 18;
                                    break;
                                }

                                if (!(this.status !== "add" /* add */ && this.localeSupports !== supports)) {
                                    _context3.next = 15;
                                    break;
                                }

                                this.localeSupports = supports;
                                _context3.next = 11;
                                return this.tlsDataSet.query();

                            case 11:
                                data = _context3.sent;
                                return _context3.abrupt('return', data[dataKey]);

                            case 15:
                                current = this.tlsDataSet.current;

                                if (!current) {
                                    _context3.next = 18;
                                    break;
                                }

                                return _context3.abrupt('return', [(0, _cloneDeep2['default'])((0, _mobx.toJS)(current.data))]);

                            case 18:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function tls(_x2) {
                return _ref2.apply(this, arguments);
            }

            return tls;
        }()
    }, {
        key: 'reset',
        value: function reset() {
            var status = this.status,
                fields = this.fields;

            Array.from(fields.values()).forEach(function (field) {
                return field.commit();
            });
            this.data = this.pristineData;
            if (this.tlsDataSet) {
                this.tlsDataSet.reset();
            }
            if (status === "update" /* update */ || status === "delete" /* delete */) {
                    this.status = "sync" /* sync */;
                }
            return this;
        }
    }, {
        key: 'commit',
        value: function commit(data, dataSet) {
            var _this6 = this;

            var dataSetSnapshot = this.dataSetSnapshot,
                fields = this.fields;

            if (dataSet) {
                var totalCount = dataSet.totalCount,
                    destroyed = dataSet.destroyed;

                if (this.status === "add" /* add */ && dataSet.indexOf(this) !== -1) {
                    totalCount += 1;
                } else if (this.status === "delete" /* delete */) {
                        var index = destroyed.indexOf(this);
                        if (index !== -1) {
                            destroyed.splice(index, 1);
                            totalCount -= 1;
                        }
                    }
                dataSet.totalCount = totalCount;
                if (data) {
                    var newData = this.pristineData = this.processData(data);
                    Object.keys(newData).forEach(function (key) {
                        var newValue = newData[key];
                        if (_this6.get(key) !== newValue) {
                            (0, _mobx.set)(_this6.data, key, newData[key]);
                        }
                    });
                    var snapShorts = Object.keys(dataSetSnapshot);
                    if (snapShorts.length) {
                        var isCurrent = dataSet.current === this;
                        var ds = new _DataSet2['default']();
                        snapShorts.forEach(function (key) {
                            return dataSetSnapshot[key] = (isCurrent ? dataSet.children[key] : ds.restore(dataSetSnapshot[key])).commitData(data[key] || []).snapshot();
                        });
                    }
                }
            }
            if (this.tlsDataSet) {
                var current = this.tlsDataSet.current;

                if (current) {
                    current.commit();
                }
            }
            Array.from(fields.values()).forEach(function (field) {
                return field.commit();
            });
            this.status = "sync" /* sync */;
            return this;
        }
    }, {
        key: 'initFields',
        value: function initFields(fields) {
            var _this7 = this;

            Array.from(fields.keys()).forEach(function (key) {
                return _this7.addField(key);
            });
        }
    }, {
        key: 'addField',
        value: function addField(name) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var field = new _Field2['default']((0, _extends3['default'])({}, props, { name: name }), this.dataSet, this);
            this.fields.set(name, field);
            return field;
        }
    }, {
        key: 'processData',
        value: function processData() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var fields = this.fields;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = fields.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref5 = _step.value;

                    var _ref6 = (0, _slicedToArray3['default'])(_ref5, 2);

                    var fieldName = _ref6[0];
                    var field = _ref6[1];

                    var value = ObjectChainValue.get(data, fieldName);
                    var bind = field.get('bind');
                    var type = field.get('type');
                    var transformResponse = field.get('transformResponse');
                    if (bind) {
                        fieldName = bind;
                        var bindValue = ObjectChainValue.get(data, fieldName);
                        if ((0, _isNil2['default'])(value) && !(0, _isNil2['default'])(bindValue)) {
                            value = bindValue;
                        }
                    }
                    if (value === void 0 && type === "boolean" /* boolean */) {
                            value = false;
                        }
                    if (transformResponse) {
                        value = transformResponse(value);
                    }
                    value = (0, _utils.processValue)(value, field);
                    if (value === null) {
                        value = void 0;
                    }
                    ObjectChainValue.set(data, fieldName, value, fields);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return data;
        }
    }, {
        key: 'normalizeData',
        value: function normalizeData(needIgnore) {
            var _this8 = this;

            var fields = this.fields;

            var json = (0, _mobx.toJS)(this.data);
            Array.from(fields.keys()).forEach(function (key) {
                var value = ObjectChainValue.get(json, key);
                var field = _this8.getField(key);
                if (field) {
                    var ignore = field.get('ignore');
                    if (needIgnore && (ignore === "always" /* always */ || ignore === "clean" /* clean */ && !field.dirty)) {
                        delete json[key];
                        return;
                    }
                    var bind = field.get('bind');
                    var multiple = field.get('multiple');
                    var type = field.get('type');
                    var transformRequest = field.get('transformRequest');
                    if (bind) {
                        value = _this8.get(bind);
                    }
                    if (type === "object" /* object */) {
                            return;
                        } else if ((0, _isString2['default'])(multiple) && (0, _mobx.isArrayLike)(value)) {
                        value = value.map(_utils.processToJSON).join(multiple);
                    }
                    if (transformRequest) {
                        value = transformRequest(value);
                    }
                }
                if (value !== void 0) {
                    ObjectChainValue.set(json, key, (0, _utils.processToJSON)(value), fields);
                } else {
                    ObjectChainValue.remove(json, key);
                }
            });
            return json;
        }
    }, {
        key: 'normalizeTls',
        value: function normalizeTls(all) {
            if (this.tlsDataSet) {
                var current = this.tlsDataSet.current;

                if (current) {
                    if (all) {
                        return current.toData();
                    } else {
                        var tls = current.toJSONData();
                        if (tls.__dirty) {
                            delete tls.__id;
                            delete tls.__status;
                            delete tls.__dirty;
                            return tls;
                        }
                    }
                }
            }
        }
    }, {
        key: 'normalizeCascadeData',
        value: function normalizeCascadeData(json, all) {
            var dataSetSnapshot = this.dataSetSnapshot,
                dataSet = this.dataSet,
                isCurrent = this.isCurrent,
                status = this.status,
                fields = this.fields;

            var isDelete = status === "delete" /* delete */;
            if (dataSet) {
                var dirty = false;
                var children = dataSet.children;

                if (isDelete) {
                    (0, _utils.childrenInfoForDelete)(json, children);
                } else {
                    var keys = Object.keys(children);
                    if (keys) {
                        keys.forEach(function (name) {
                            var child = isCurrent ? children[name] : new _DataSet2['default']().restore(dataSetSnapshot[name]);
                            var jsonArray = all ? child.toData() : child.toJSONData();
                            if (jsonArray.length > 0) {
                                dirty = true;
                            }
                            ObjectChainValue.set(json, name, jsonArray, fields);
                        });
                    }
                }
                return dirty;
            }
        }
    }, {
        key: 'key',
        get: function get() {
            if (this.status !== "add" /* add */) {
                    var dataSet = this.dataSet;

                    if (dataSet && dataSet.uniqueKeys) {
                        var key = this.get(dataSet.uniqueKeys[0]);
                        if ((0, _isString2['default'])(key) || (0, _isNumber2['default'])(key)) {
                            return key;
                        }
                    }
                }
            return this.id;
        }
    }, {
        key: 'index',
        get: function get() {
            var dataSet = this.dataSet;

            if (dataSet) {
                return dataSet.indexOf(this);
            }
            return -1;
        }
    }, {
        key: 'isIndeterminate',
        get: function get() {
            var dataSet = this.dataSet;

            if (dataSet) {
                var checkField = dataSet.props.checkField;

                if (checkField) {
                    var field = this.getField(checkField);
                    var trueValue = field ? field.get("trueValue" /* trueValue */) : true;
                    var children = this.children;

                    if (children) {
                        var checkedLength = 0;
                        return children.some(function (record) {
                            if (record.isIndeterminate) {
                                return true;
                            }
                            if (record.get(checkField) === trueValue) {
                                checkedLength += 1;
                            }
                            return false;
                        }) || checkedLength > 0 && checkedLength !== children.length;
                    }
                }
            }
            return false;
        }
    }, {
        key: 'isExpanded',
        get: function get() {
            var dataSet = this.dataSet;

            if (dataSet) {
                var expandField = dataSet.props.expandField;

                if (expandField) {
                    var expanded = this.get(expandField);
                    var field = this.getField(expandField);
                    return expanded === (field ? field.get("trueValue" /* trueValue */) : true);
                }
            }
            return false;
        },
        set: function set(expand) {
            var dataSet = this.dataSet;

            if (dataSet) {
                var expandField = dataSet.props.expandField;

                if (expandField) {
                    var field = this.getField(expandField);
                    this.set(expandField, field ? expand ? field.get("trueValue" /* trueValue */) : field.get("falseValue" /* falseValue */) : expand);
                }
            }
        }
    }, {
        key: 'previousRecord',
        get: function get() {
            var parent = this.parent,
                dataSet = this.dataSet;

            var children = void 0;
            if (parent) {
                children = parent.children;
            } else if (dataSet) {
                children = dataSet.treeData;
            }
            if (children) {
                return children[children.indexOf(this) - 1];
            }
        }
    }, {
        key: 'nextRecord',
        get: function get() {
            var parent = this.parent,
                dataSet = this.dataSet;

            var children = void 0;
            if (parent) {
                children = parent.children;
            } else if (dataSet) {
                children = dataSet.treeData;
            }
            if (children) {
                return children[children.indexOf(this) + 1];
            }
        }
    }, {
        key: 'children',
        get: function get() {
            var _this9 = this;

            var dataSet = this.dataSet;

            if (dataSet) {
                var _dataSet$props3 = dataSet.props,
                    parentField = _dataSet$props3.parentField,
                    idField = _dataSet$props3.idField;

                if (parentField && idField) {
                    var children = (0, _utils.sortTree)(dataSet.filter(function (record) {
                        var childParentId = record.get(parentField);
                        var id = _this9.get(idField);
                        return !(0, _isNil2['default'])(childParentId) && !(0, _isNil2['default'])(id) && childParentId === id;
                    }), (0, _utils.getOrderFields)(this.fields)[0]);
                    return children.length > 0 ? children : void 0;
                }
            }
        }
    }, {
        key: 'parent',
        get: function get() {
            var _this10 = this;

            var dataSet = this.dataSet;

            if (dataSet) {
                var _dataSet$props4 = dataSet.props,
                    parentField = _dataSet$props4.parentField,
                    idField = _dataSet$props4.idField;

                if (parentField && idField) {
                    return dataSet.find(function (record) {
                        var parentId = _this10.get(parentField);
                        var id = record.get(idField);
                        return !(0, _isNil2['default'])(parentId) && !(0, _isNil2['default'])(id) && parentId === id;
                    });
                }
            }
        }
    }, {
        key: 'level',
        get: function get() {
            var parent = this.parent;

            if (parent) {
                return parent.level + 1;
            }
            return 0;
        }
    }, {
        key: 'dirty',
        get: function get() {
            var fields = this.fields;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = fields.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var field = _step2.value;

                    if (field.dirty) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'cascadeParent',
        get: function get() {
            var _this11 = this;

            var dataSet = this.dataSet;

            if (dataSet) {
                var parent = dataSet.parent;

                if (parent) {
                    var children = parent.children;

                    var name = Object.keys(children).find(function (key) {
                        return children[key] === dataSet;
                    });
                    if (name) {
                        return parent.find(function (record) {
                            return (record.getCascadeRecords(name) || []).indexOf(_this11) !== -1;
                        });
                    }
                }
            }
        }
    }]);
    return Record;
}();

exports['default'] = Record;

tslib_1.__decorate([_mobx.computed], Record.prototype, "key", null);
tslib_1.__decorate([_mobx.observable], Record.prototype, "fields", void 0);
tslib_1.__decorate([_mobx.observable], Record.prototype, "tlsDataSet", void 0);
tslib_1.__decorate([_mobx.observable], Record.prototype, "data", void 0);
tslib_1.__decorate([_mobx.observable], Record.prototype, "status", void 0);
tslib_1.__decorate([_mobx.observable], Record.prototype, "selectable", void 0);
tslib_1.__decorate([_mobx.observable], Record.prototype, "isSelected", void 0);
tslib_1.__decorate([_mobx.observable], Record.prototype, "isCurrent", void 0);
tslib_1.__decorate([_mobx.observable], Record.prototype, "isCached", void 0);
tslib_1.__decorate([_mobx.observable], Record.prototype, "editing", void 0);
tslib_1.__decorate([_mobx.computed], Record.prototype, "index", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "isIndeterminate", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "isExpanded", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "previousRecord", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "nextRecord", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "children", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "parent", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "level", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "dirty", null);
tslib_1.__decorate([_mobx.computed], Record.prototype, "cascadeParent", null);
tslib_1.__decorate([_mobx.action], Record.prototype, "set", null);
tslib_1.__decorate([_mobx.action], Record.prototype, "tls", null);
tslib_1.__decorate([_mobx.action], Record.prototype, "reset", null);
tslib_1.__decorate([_mobx.action], Record.prototype, "commit", null);
tslib_1.__decorate([_mobx.action], Record.prototype, "addField", null);
module.exports = exports['default'];