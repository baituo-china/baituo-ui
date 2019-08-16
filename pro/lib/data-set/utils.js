'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.append = append;
exports.getOrderFields = getOrderFields;
exports.processToJSON = processToJSON;
exports.processValue = processValue;
exports.childrenInfoForDelete = childrenInfoForDelete;
exports.sortTree = sortTree;
exports.mergeTlsFields = mergeTlsFields;
exports.checkParentByInsert = checkParentByInsert;
exports.isSame = isSame;
exports.isSameLike = isSameLike;
exports.checkFieldType = checkFieldType;
exports.doExport = doExport;
exports.findBindFieldBy = findBindFieldBy;
exports.findBindFields = findBindFields;
exports.findInvalidField = findInvalidField;
exports.getFieldSorter = getFieldSorter;
exports.getDateFormatByFieldType = getDateFormatByFieldType;
exports.getDateFormatByField = getDateFormatByField;
exports.generateJSONData = generateJSONData;
exports.prepareSubmitData = prepareSubmitData;
exports.prepareForSubmit = prepareForSubmit;
exports.axiosAdapter = axiosAdapter;
exports.generateResponseData = generateResponseData;
exports.getRecordValue = getRecordValue;

var _querystringify = require('querystringify');

var _querystringify2 = _interopRequireDefault(_querystringify);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mobx = require('mobx');

var _isBoolean = require('lodash/isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _isEmpty = require('../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ObjectChainValue = require('../_util/ObjectChainValue');

var ObjectChainValue = _interopRequireWildcard(_ObjectChainValue);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function append(url, suffix) {
    if (suffix) {
        return url + _querystringify2['default'].stringify(suffix, url.indexOf('?') === -1);
    } else {
        return url;
    }
}
function getOrderFields(fields) {
    var result = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = fields.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var field = _step.value;

            if (field.order) {
                result.push(field);
            }
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

    return result;
}
function processToJSON(value) {
    if ((0, _moment.isDate)(value)) {
        value = (0, _moment2['default'])(value);
    }
    if ((0, _moment.isMoment)(value)) {
        value = value.format(_Constants2['default'].DATE_JSON_FORMAT);
    }
    return value;
}
function processOne(value, field) {
    if (!(0, _isEmpty2['default'])(value)) {
        if (value instanceof Date) {
            value = (0, _moment2['default'])(value, _Constants2['default'].DATE_JSON_FORMAT);
        } else if (!(0, _isObject2['default'])(value)) {
            switch (field.type) {
                case "boolean" /* boolean */:
                    var trueValue = field.get("trueValue" /* trueValue */);
                    var falseValue = field.get("falseValue" /* falseValue */);
                    if (value !== trueValue) {
                        value = falseValue;
                    }
                    break;
                case "number" /* number */:
                    if (!isNaN(value)) {
                        value = Number(value);
                    } else {
                        value = '';
                    }
                    break;
                case "string" /* string */:
                case "intl" /* intl */:
                case "email" /* email */:
                case "url" /* url */:
                    value = String(value);
                    break;
                case "date" /* date */:
                case "dateTime" /* dateTime */:
                case "time" /* time */:
                case "week" /* week */:
                case "month" /* month */:
                case "year" /* year */:
                    value = (0, _moment2['default'])(value, _Constants2['default'].DATE_JSON_FORMAT);
                    break;
                default:
            }
        }
    }
    return value;
}
function processValue(value, field) {
    if (field) {
        var multiple = field.get('multiple');
        if (multiple) {
            if ((0, _isEmpty2['default'])(value)) {
                value = [];
            } else if (!(0, _isArray2['default'])(value)) {
                if ((0, _isString2['default'])(multiple) && (0, _isString2['default'])(value)) {
                    value = value.split(multiple);
                } else {
                    value = [value];
                }
            }
        }
        if ((0, _isArray2['default'])(value)) {
            return value.map(function (item) {
                return processOne(item, field);
            });
        }
        return processOne(value, field);
    }
    return value;
}
function childrenInfoForDelete(json, children) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(children)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var name = _step2.value;

            var child = children[name];
            if (child) {
                json[name] = [childrenInfoForDelete({}, child.children)];
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

    return json;
}
function sortTree(children, orderField) {
    if (orderField && children.length > 0) {
        var name = orderField.name,
            order = orderField.order;

        var m = Number.MIN_SAFE_INTEGER;
        children.sort(function (record1, record2) {
            var a = record1.get(name) || m;
            var b = record2.get(name) || m;
            if ((0, _isString2['default'])(a) || (0, _isString2['default'])(b)) {
                return order === "asc" /* asc */ ? String(a).localeCompare(String(b)) : String(b).localeCompare(String(a));
            } else {
                return order === "asc" /* asc */ ? a - b : b - a;
            }
        });
    }
    return children;
}
function mergeTlsFields(fields, supports, fieldNames) {
    var newFields = [];
    var langs = Object.keys(supports);
    fieldNames.forEach(function (fieldName) {
        var field = fields.get(fieldName);
        if (field) {
            var props = field.getProps();
            newFields.push((0, _extends3['default'])({}, props, { name: fieldName }));
            langs.forEach(function (lang) {
                newFields.push((0, _extends3['default'])({}, props, { name: fieldName + '.' + lang, label: langs[lang] }));
            });
        }
    });
    return newFields;
}
function checkParentByInsert(_ref) {
    var parent = _ref.parent;

    if (parent && !parent.current) {
        throw new Error((0, _localeContext.$l)('DataSet', 'cannot_add_record_when_head_no_current'));
    }
}
function isSame(newValue, oldValue) {
    return (0, _isEmpty2['default'])(newValue) && (0, _isEmpty2['default'])(oldValue) || (0, _isEqual2['default'])(newValue, oldValue);
}
function isSameLike(newValue, oldValue) {
    /* tslint:disable */
    return isSame(newValue, oldValue) || newValue == oldValue;
    /* tslint:enable */
}
function getBaseType(type) {
    switch (type) {
        case "dateTime" /* dateTime */:
        case "time" /* time */:
        case "week" /* week */:
        case "month" /* month */:
        case "year" /* year */:
            return "date" /* date */;
        case "intl" /* intl */:
        case "url" /* url */:
        case "email" /* email */:
            return "string" /* string */;
        default:
            return type;
    }
}
function getValueType(value) {
    return (0, _isBoolean2['default'])(value) ? "boolean" /* boolean */
    : (0, _isNumber2['default'])(value) ? "number" /* number */
    : (0, _isString2['default'])(value) ? "string" /* string */
    : (0, _moment.isMoment)(value) ? "date" /* date */
    : (0, _isObject2['default'])(value) ? "object" /* object */
    : "auto" /* auto */;
}
function checkFieldType(value, field) {
    if (process.env.NODE_ENV !== 'production') {
        if (!(0, _isEmpty2['default'])(value)) {
            if ((0, _mobx.isArrayLike)(value)) {
                return value.every(function (item) {
                    return checkFieldType(item, field);
                });
            } else {
                var fieldType = getBaseType(field.type);
                var valueType = getValueType(value);
                if (fieldType !== "auto" /* auto */ && fieldType !== "reactNode" /* reactNode */ && fieldType !== valueType) {
                    (0, _warning2['default'])(false, 'Value type error: The value<' + value + '>\'s type is ' + valueType + ', but the field<' + field.name + '>\'s type is ' + fieldType + '.');
                    return false;
                }
            }
        }
    }
    return true;
}
var iframe = void 0;
function doExport(url, data) {
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = '_export_window';
        iframe.name = '_export_window';
        iframe.style.cssText = 'position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;display:none';
        document.body.appendChild(iframe);
    }
    var form = document.createElement('form');
    form.target = '_export_window';
    form.method = 'post';
    form.action = url;
    var s = document.createElement('input');
    s.id = '_request_data';
    s.type = 'hidden';
    s.name = '_request_data';
    s.value = data;
    form.appendChild(s);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}
function findBindFieldBy(myField, fields, prop) {
    var value = myField.get(prop);
    var myName = myField.name;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = fields.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var field = _step3.value;

            var bind = field.get('bind');
            if (bind && bind === myName + '.' + value) {
                return field;
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                _iterator3['return']();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
}
function findBindFields(myField, fields) {
    var bindFields = [myField];
    var myName = myField.name;
    var myBind = myField.get('bind');
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = fields.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var field = _step4.value;

            if (field !== myField) {
                var bind = field.get('bind');
                if (bind && bind.startsWith(myName + '.')) {
                    bindFields.push(field);
                } else if (myBind && myBind.startsWith(field.name + '.')) {
                    bindFields.push(field);
                }
            }
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                _iterator4['return']();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return bindFields;
}
function findInvalidField(field) {
    var record = field.record;

    if (record) {
        return findBindFields(field, record.fields).find(function (oneField) {
            return !oneField.validator.validity.valid;
        }) || field;
    }
    return field;
}
function numberSorter(a, b) {
    return a - b;
}
function stringSorter(a, b) {
    return String(a || '').localeCompare(String(b || ''));
}
function getFieldSorter(field) {
    var name = field.name;

    switch (field.type) {
        case "number" /* number */:
        case "currency" /* currency */:
        case "date" /* date */:
        case "dateTime" /* dateTime */:
        case "week" /* week */:
        case "month" /* month */:
        case "year" /* year */:
        case "time" /* time */:
            return field.order === "asc" /* asc */
            ? function (a, b) {
                return numberSorter(a.get(name), b.get(name));
            } : function (a, b) {
                return numberSorter(b.get(name), a.get(name));
            };
        default:
            return field.order === "asc" /* asc */
            ? function (a, b) {
                return stringSorter(a.get(name), b.get(name));
            } : function (a, b) {
                return stringSorter(b.get(name), a.get(name));
            };
    }
}
function getDateFormatByFieldType(type) {
    switch (type) {
        case "date" /* date */:
            return _Constants2['default'].DATE_FORMAT;
        case "dateTime" /* dateTime */:
            return _Constants2['default'].DATE_TIME_FORMAT;
        case "week" /* week */:
            return _Constants2['default'].WEEK_FORMAT;
        case "month" /* month */:
            return _Constants2['default'].MONTH_FORMAT;
        case "year" /* year */:
            return _Constants2['default'].YEAR_FORMAT;
        case "time" /* time */:
            return _Constants2['default'].TIME_FORMAT;
        default:
            return _Constants2['default'].DATE_FORMAT;
    }
}
function getDateFormatByField(field, type) {
    if (field) {
        return field.get('format') || getDateFormatByFieldType(type || field.type);
    }
    if (type) {
        return getDateFormatByFieldType(type);
    }
    return _Constants2['default'].DATE_JSON_FORMAT;
}
function generateJSONData(array, record, noCascade) {
    var json = record.toJSONData(noCascade);
    if (json.__dirty) {
        delete json.__dirty;
        array.push(json);
    }
}
function prepareSubmitData(records, noCascade) {
    var created = [];
    var updated = [];
    var destroyed = [];
    var cascade = [];
    function storeWith(status) {
        switch (status) {
            case "add" /* add */:
                return created;
            case "update" /* update */:
                return updated;
            case "delete" /* delete */:
                return destroyed;
            default:
                return cascade;
        }
    }
    records.forEach(function (record) {
        return noCascade && record.status === "sync" /* sync */ || generateJSONData(storeWith(record.status), record, noCascade);
    });
    return [created, updated, destroyed, cascade];
}
function prepareForSubmit(type, data, transport, configs, dataSet) {
    var adapter = transport.adapter,
        _transport$type = transport[type],
        config = _transport$type === undefined ? {} : _transport$type;

    if (data.length) {
        var newConfig = axiosAdapter(config, dataSet, data);
        var adapterConfig = adapter(newConfig, type) || newConfig;
        if (adapterConfig.url) {
            configs.push(adapterConfig);
        } else {
            return data;
        }
    }
    return [];
}
function axiosAdapter(config, dataSet, data, params) {
    var newConfig = {
        data: data,
        params: params,
        method: 'post'
    };
    if ((0, _isString2['default'])(config)) {
        newConfig.url = config;
    } else if (config) {
        (0, _extends3['default'])(newConfig, typeof config === 'function' ? config({ data: data, dataSet: dataSet, params: params }) : config);
    }
    if (newConfig.data && newConfig.method && newConfig.method.toLowerCase() === 'get') {
        newConfig.params = (0, _extends3['default'])({}, newConfig.params, newConfig.data);
    }
    return newConfig;
}
function generateResponseData(item, dataKey) {
    return (0, _isArray2['default'])(item) ? item : dataKey && dataKey in item ? item[dataKey] || [] : [item];
}
function getRecordValue(data, cb, fieldName) {
    if (fieldName) {
        var field = this.getField(fieldName);
        if (field) {
            var bind = field.get('bind');
            if (bind) {
                fieldName = bind;
            }
        }
        var dataSet = this.dataSet;

        if (dataSet) {
            var checkField = dataSet.props.checkField;

            if (checkField && checkField === fieldName) {
                var trueValue = field ? field.get("trueValue" /* trueValue */) : true;
                var falseValue = field ? field.get("falseValue" /* falseValue */) : false;
                var children = this.children;

                if (children) {
                    return children.every(function (child) {
                        return cb(child, checkField) === trueValue;
                    }) ? trueValue : falseValue;
                }
            }
        }
        return ObjectChainValue.get(data, fieldName);
    }
}