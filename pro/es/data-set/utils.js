import _extends from 'babel-runtime/helpers/extends';
import queryString from 'querystringify';
import moment, { isDate, isMoment } from 'moment';
import { isArrayLike } from 'mobx';
import isBoolean from 'lodash/isBoolean';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
import warning from '../../../es/_util/warning';
import Constants from './Constants';
import isEmpty from '../_util/isEmpty';
import * as ObjectChainValue from '../_util/ObjectChainValue';
import { $l } from '../locale-context';
export function append(url, suffix) {
    if (suffix) {
        return url + queryString.stringify(suffix, url.indexOf('?') === -1);
    } else {
        return url;
    }
}
export function getOrderFields(fields) {
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
export function processToJSON(value) {
    if (isDate(value)) {
        value = moment(value);
    }
    if (isMoment(value)) {
        value = value.format(Constants.DATE_JSON_FORMAT);
    }
    return value;
}
function processOne(value, field) {
    if (!isEmpty(value)) {
        if (value instanceof Date) {
            value = moment(value, Constants.DATE_JSON_FORMAT);
        } else if (!isObject(value)) {
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
                    value = moment(value, Constants.DATE_JSON_FORMAT);
                    break;
                default:
            }
        }
    }
    return value;
}
export function processValue(value, field) {
    if (field) {
        var multiple = field.get('multiple');
        if (multiple) {
            if (isEmpty(value)) {
                value = [];
            } else if (!isArray(value)) {
                if (isString(multiple) && isString(value)) {
                    value = value.split(multiple);
                } else {
                    value = [value];
                }
            }
        }
        if (isArray(value)) {
            return value.map(function (item) {
                return processOne(item, field);
            });
        }
        return processOne(value, field);
    }
    return value;
}
export function childrenInfoForDelete(json, children) {
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
export function sortTree(children, orderField) {
    if (orderField && children.length > 0) {
        var name = orderField.name,
            order = orderField.order;

        var m = Number.MIN_SAFE_INTEGER;
        children.sort(function (record1, record2) {
            var a = record1.get(name) || m;
            var b = record2.get(name) || m;
            if (isString(a) || isString(b)) {
                return order === "asc" /* asc */ ? String(a).localeCompare(String(b)) : String(b).localeCompare(String(a));
            } else {
                return order === "asc" /* asc */ ? a - b : b - a;
            }
        });
    }
    return children;
}
export function mergeTlsFields(fields, supports, fieldNames) {
    var newFields = [];
    var langs = Object.keys(supports);
    fieldNames.forEach(function (fieldName) {
        var field = fields.get(fieldName);
        if (field) {
            var props = field.getProps();
            newFields.push(_extends({}, props, { name: fieldName }));
            langs.forEach(function (lang) {
                newFields.push(_extends({}, props, { name: fieldName + '.' + lang, label: langs[lang] }));
            });
        }
    });
    return newFields;
}
export function checkParentByInsert(_ref) {
    var parent = _ref.parent;

    if (parent && !parent.current) {
        throw new Error($l('DataSet', 'cannot_add_record_when_head_no_current'));
    }
}
export function isSame(newValue, oldValue) {
    return isEmpty(newValue) && isEmpty(oldValue) || isEqual(newValue, oldValue);
}
export function isSameLike(newValue, oldValue) {
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
    return isBoolean(value) ? "boolean" /* boolean */
    : isNumber(value) ? "number" /* number */
    : isString(value) ? "string" /* string */
    : isMoment(value) ? "date" /* date */
    : isObject(value) ? "object" /* object */
    : "auto" /* auto */;
}
export function checkFieldType(value, field) {
    if (process.env.NODE_ENV !== 'production') {
        if (!isEmpty(value)) {
            if (isArrayLike(value)) {
                return value.every(function (item) {
                    return checkFieldType(item, field);
                });
            } else {
                var fieldType = getBaseType(field.type);
                var valueType = getValueType(value);
                if (fieldType !== "auto" /* auto */ && fieldType !== "reactNode" /* reactNode */ && fieldType !== valueType) {
                    warning(false, 'Value type error: The value<' + value + '>\'s type is ' + valueType + ', but the field<' + field.name + '>\'s type is ' + fieldType + '.');
                    return false;
                }
            }
        }
    }
    return true;
}
var iframe = void 0;
export function doExport(url, data) {
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
export function findBindFieldBy(myField, fields, prop) {
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
export function findBindFields(myField, fields) {
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
export function findInvalidField(field) {
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
export function getFieldSorter(field) {
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
export function getDateFormatByFieldType(type) {
    switch (type) {
        case "date" /* date */:
            return Constants.DATE_FORMAT;
        case "dateTime" /* dateTime */:
            return Constants.DATE_TIME_FORMAT;
        case "week" /* week */:
            return Constants.WEEK_FORMAT;
        case "month" /* month */:
            return Constants.MONTH_FORMAT;
        case "year" /* year */:
            return Constants.YEAR_FORMAT;
        case "time" /* time */:
            return Constants.TIME_FORMAT;
        default:
            return Constants.DATE_FORMAT;
    }
}
export function getDateFormatByField(field, type) {
    if (field) {
        return field.get('format') || getDateFormatByFieldType(type || field.type);
    }
    if (type) {
        return getDateFormatByFieldType(type);
    }
    return Constants.DATE_JSON_FORMAT;
}
export function generateJSONData(array, record, noCascade) {
    var json = record.toJSONData(noCascade);
    if (json.__dirty) {
        delete json.__dirty;
        array.push(json);
    }
}
export function prepareSubmitData(records, noCascade) {
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
export function prepareForSubmit(type, data, transport, configs, dataSet) {
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
export function axiosAdapter(config, dataSet, data, params) {
    var newConfig = {
        data: data,
        params: params,
        method: 'post'
    };
    if (isString(config)) {
        newConfig.url = config;
    } else if (config) {
        _extends(newConfig, typeof config === 'function' ? config({ data: data, dataSet: dataSet, params: params }) : config);
    }
    if (newConfig.data && newConfig.method && newConfig.method.toLowerCase() === 'get') {
        newConfig.params = _extends({}, newConfig.params, newConfig.data);
    }
    return newConfig;
}
export function generateResponseData(item, dataKey) {
    return isArray(item) ? item : dataKey && dataKey in item ? item[dataKey] || [] : [item];
}
export function getRecordValue(data, cb, fieldName) {
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