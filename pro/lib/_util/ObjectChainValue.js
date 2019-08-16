'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.get = get;
exports.set = set;
exports.remove = remove;

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _mobx = require('mobx');

var _MobxUtils = require('./MobxUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function get(obj, prop) {
    var index = prop.indexOf('.');
    if (index !== -1) {
        var key = prop.slice(0, index);
        var restKey = prop.slice(index + 1);
        var value = (0, _MobxUtils.mobxGet)(obj, key);
        if ((0, _mobx.isArrayLike)(value)) {
            return value.map(function (item) {
                return get(item, restKey);
            }).filter(function (item) {
                return !!item;
            });
        }
        if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3['default'])(value)) === 'object') {
            return get(value, restKey);
        }
    } else {
        return (0, _MobxUtils.mobxGet)(obj, prop);
    }
}
function set(data, prop, value) {
    var fields = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _mobx.observable.map();

    var index = prop.indexOf('.');
    if (index !== -1) {
        var key = prop.slice(0, index);
        if (!data[key] && value !== void 0) {
            var field = fields.get(key);
            if (field && field.get('multiple')) {
                (0, _MobxUtils.mobxSet)(data, key, []);
            } else {
                (0, _MobxUtils.mobxSet)(data, key, {});
            }
        }
        var obj = (0, _MobxUtils.mobxGet)(data, key);
        if ((0, _mobx.isArrayLike)(obj)) {
            if ((0, _mobx.isArrayLike)(value)) {
                value.forEach(function (item, i) {
                    if (!obj[i]) {
                        obj.push({});
                    }
                    set(obj[i], prop.slice(index + 1), item);
                });
            }
        } else if ((0, _isObject2['default'])(obj)) {
            set(obj, prop.slice(index + 1), value);
        }
    } else {
        (0, _MobxUtils.mobxSet)(data, prop, value);
    }
}
function remove(obj, prop) {
    var index = prop.indexOf('.');
    if (index !== -1) {
        var key = prop.slice(0, index);
        var restKey = prop.slice(index + 1);
        var value = (0, _MobxUtils.mobxGet)(obj, key);
        if ((0, _mobx.isArrayLike)(value)) {
            value.forEach(function (item) {
                return remove(item, restKey);
            });
        } else if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3['default'])(value)) === 'object') {
            remove(value, restKey);
        }
    } else {
        (0, _MobxUtils.mobxRemove)(obj, prop);
    }
}