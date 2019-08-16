import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import * as tslib_1 from "tslib";
import { action, computed, isArrayLike, isObservableArray, observable, runInAction, set, toJS } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import warning from '../../../es/_util/warning';
import DataSet from './DataSet';
import Field from './Field';
import { checkFieldType, childrenInfoForDelete, findBindFields, getOrderFields, getRecordValue, isSame, mergeTlsFields, processToJSON, processValue, sortTree } from './utils';
import * as ObjectChainValue from '../_util/ObjectChainValue';
import localeContext from '../locale-context';
/**
 * 记录ID生成器
 */
var IDGen = /*#__PURE__*/_regeneratorRuntime.mark(function _callee(start) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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

        _classCallCheck(this, Record);

        this.dataSetSnapshot = {};
        runInAction(function () {
            _this.fields = observable.map();
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
            _this.initData = toJS(data);
            _this.data = _this.pristineData = _this.processData(_this.initData);
            delete _this.initData;
        });
    }

    _createClass(Record, [{
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
            return _extends({}, json, {
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

            return Promise.all([].concat(_toConsumableArray(Array.from(fields.values()).map(function (field) {
                return all || status !== "sync" /* sync */ ? field.checkValidity() : true;
            })), _toConsumableArray(noCascade ? [] : Object.keys(dataSetSnapshot).map(function (key) {
                return (isCurrent && dataSet ? dataSet.children[key] : new DataSet().restore(dataSetSnapshot[key])).validate(all);
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
                        return (isCurrent ? childDataSet : new DataSet().restore(snapshot)).slice();
                    } else {
                        var data = this.get(fieldName);
                        if (isObservableArray(data)) {
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
            return getRecordValue.call(this, this.data, function (child, checkField) {
                return child.get(checkField);
            }, fieldName);
        }
    }, {
        key: 'getPristineValue',
        value: function getPristineValue(fieldName) {
            return getRecordValue.call(this, this.pristineData, function (child, checkField) {
                return child.getPristineValue(checkField);
            }, fieldName);
        }
    }, {
        key: 'set',
        value: function set(item, value) {
            var _this2 = this;

            if (isString(item)) {
                var fieldName = item;
                var oldName = fieldName;
                var field = this.getField(fieldName);
                if (field) {
                    checkFieldType(value, field);
                    var bind = field.get('bind');
                    if (bind) {
                        fieldName = bind;
                    }
                }
                var oldValue = toJS(this.get(fieldName));
                var newValue = processValue(value, field);
                if (!isSame(newValue, oldValue)) {
                    var fields = this.fields;

                    ObjectChainValue.set(this.data, fieldName, newValue, fields);
                    var pristineValue = this.getPristineValue(fieldName);
                    if (isSame(pristineValue, newValue)) {
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
                                lang = _dataSet$lang === undefined ? localeContext.locale.lang : _dataSet$lang;
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
                    findBindFields(field, this.fields).forEach(function (oneField) {
                        return (
                            // oneField.dirty = field.dirty,
                            oneField.validator.reset(), oneField.checkValidity()
                        );
                    });
                }
            } else if (isPlainObject(item)) {
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

            var cloneData = cloneDeep(toJS(this.data));
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
                            clone.tlsDataSet = new DataSet({
                                fields: mergeTlsFields(_this3.fields, localeContext.supports, Object.keys(record))
                            });
                            clone.tlsDataSet.tlsRecord = clone;
                            clone.tlsDataSet.create(record);
                            if (dataSet) {
                                var _dataSet$lang2 = dataSet.lang,
                                    lang = _dataSet$lang2 === undefined ? localeContext.locale.lang : _dataSet$lang2;

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
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                var pending, result;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                pending = this.pending;
                                _context2.next = 3;
                                return Promise.all([pending].concat(_toConsumableArray(Array.from(this.fields.values()).map(function (field) {
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
                    lang = _dataSet$lang3 === undefined ? localeContext.locale.lang : _dataSet$lang3;

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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(name) {
                var _this5 = this;

                var supports, dataSet, tlsUrl, _dataSet$lang4, lang, _dataSet$props2, primaryKey, dataKey, data, current;

                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                supports = localeContext.supports;
                                dataSet = this.dataSet;

                                if (!dataSet) {
                                    _context3.next = 18;
                                    break;
                                }

                                tlsUrl = dataSet.tlsUrl, _dataSet$lang4 = dataSet.lang, lang = _dataSet$lang4 === undefined ? localeContext.locale.lang : _dataSet$lang4;
                                _dataSet$props2 = dataSet.props, primaryKey = _dataSet$props2.primaryKey, dataKey = _dataSet$props2.dataKey;

                                if (!this.tlsDataSet) {
                                    warning(!!primaryKey, 'If you want to use IntlField, please set `primaryKey` for dataSet.');
                                    warning(!!tlsUrl, 'If you want to use IntlField, please set `tlsUrl` for dataSet.');
                                    if (tlsUrl && primaryKey) {
                                        this.tlsDataSet = new DataSet({
                                            data: name ? [_defineProperty({}, name, _defineProperty({}, lang, this.get(name)))] : void 0,
                                            queryUrl: tlsUrl,
                                            queryParameter: {
                                                key: this.get(primaryKey)
                                            },
                                            fields: name ? mergeTlsFields(this.fields, supports, [name]) : void 0,
                                            events: _defineProperty({}, "beforeLoad" /* beforeLoad */, function beforeLoad(_ref4) {
                                                var _ref4$data = _slicedToArray(_ref4.data, 1),
                                                    record = _ref4$data[0];

                                                if (_this5.tlsDataSet) {
                                                    _this5.tlsDataSet.initFields(mergeTlsFields(_this5.fields, supports, Object.keys(record)));
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
                                    mergeTlsFields(this.fields, supports, [name]).forEach(function (field) {
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

                                return _context3.abrupt('return', [cloneDeep(toJS(current.data))]);

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
                            set(_this6.data, key, newData[key]);
                        }
                    });
                    var snapShorts = Object.keys(dataSetSnapshot);
                    if (snapShorts.length) {
                        var isCurrent = dataSet.current === this;
                        var ds = new DataSet();
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

            var field = new Field(_extends({}, props, { name: name }), this.dataSet, this);
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

                    var _ref6 = _slicedToArray(_ref5, 2);

                    var fieldName = _ref6[0];
                    var field = _ref6[1];

                    var value = ObjectChainValue.get(data, fieldName);
                    var bind = field.get('bind');
                    var type = field.get('type');
                    var transformResponse = field.get('transformResponse');
                    if (bind) {
                        fieldName = bind;
                        var bindValue = ObjectChainValue.get(data, fieldName);
                        if (isNil(value) && !isNil(bindValue)) {
                            value = bindValue;
                        }
                    }
                    if (value === void 0 && type === "boolean" /* boolean */) {
                            value = false;
                        }
                    if (transformResponse) {
                        value = transformResponse(value);
                    }
                    value = processValue(value, field);
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

            var json = toJS(this.data);
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
                        } else if (isString(multiple) && isArrayLike(value)) {
                        value = value.map(processToJSON).join(multiple);
                    }
                    if (transformRequest) {
                        value = transformRequest(value);
                    }
                }
                if (value !== void 0) {
                    ObjectChainValue.set(json, key, processToJSON(value), fields);
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
                    childrenInfoForDelete(json, children);
                } else {
                    var keys = Object.keys(children);
                    if (keys) {
                        keys.forEach(function (name) {
                            var child = isCurrent ? children[name] : new DataSet().restore(dataSetSnapshot[name]);
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
                        if (isString(key) || isNumber(key)) {
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
                    var children = sortTree(dataSet.filter(function (record) {
                        var childParentId = record.get(parentField);
                        var id = _this9.get(idField);
                        return !isNil(childParentId) && !isNil(id) && childParentId === id;
                    }), getOrderFields(this.fields)[0]);
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
                        return !isNil(parentId) && !isNil(id) && parentId === id;
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

export default Record;

tslib_1.__decorate([computed], Record.prototype, "key", null);
tslib_1.__decorate([observable], Record.prototype, "fields", void 0);
tslib_1.__decorate([observable], Record.prototype, "tlsDataSet", void 0);
tslib_1.__decorate([observable], Record.prototype, "data", void 0);
tslib_1.__decorate([observable], Record.prototype, "status", void 0);
tslib_1.__decorate([observable], Record.prototype, "selectable", void 0);
tslib_1.__decorate([observable], Record.prototype, "isSelected", void 0);
tslib_1.__decorate([observable], Record.prototype, "isCurrent", void 0);
tslib_1.__decorate([observable], Record.prototype, "isCached", void 0);
tslib_1.__decorate([observable], Record.prototype, "editing", void 0);
tslib_1.__decorate([computed], Record.prototype, "index", null);
tslib_1.__decorate([computed], Record.prototype, "isIndeterminate", null);
tslib_1.__decorate([computed], Record.prototype, "isExpanded", null);
tslib_1.__decorate([computed], Record.prototype, "previousRecord", null);
tslib_1.__decorate([computed], Record.prototype, "nextRecord", null);
tslib_1.__decorate([computed], Record.prototype, "children", null);
tslib_1.__decorate([computed], Record.prototype, "parent", null);
tslib_1.__decorate([computed], Record.prototype, "level", null);
tslib_1.__decorate([computed], Record.prototype, "dirty", null);
tslib_1.__decorate([computed], Record.prototype, "cascadeParent", null);
tslib_1.__decorate([action], Record.prototype, "set", null);
tslib_1.__decorate([action], Record.prototype, "tls", null);
tslib_1.__decorate([action], Record.prototype, "reset", null);
tslib_1.__decorate([action], Record.prototype, "commit", null);
tslib_1.__decorate([action], Record.prototype, "addField", null);