import _typeof from 'babel-runtime/helpers/typeof';
import isObject from 'lodash/isObject';
import { isArrayLike, observable } from 'mobx';
import { mobxGet, mobxRemove, mobxSet } from './MobxUtils';
export function get(obj, prop) {
    var index = prop.indexOf('.');
    if (index !== -1) {
        var key = prop.slice(0, index);
        var restKey = prop.slice(index + 1);
        var value = mobxGet(obj, key);
        if (isArrayLike(value)) {
            return value.map(function (item) {
                return get(item, restKey);
            }).filter(function (item) {
                return !!item;
            });
        }
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            return get(value, restKey);
        }
    } else {
        return mobxGet(obj, prop);
    }
}
export function set(data, prop, value) {
    var fields = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : observable.map();

    var index = prop.indexOf('.');
    if (index !== -1) {
        var key = prop.slice(0, index);
        if (!data[key] && value !== void 0) {
            var field = fields.get(key);
            if (field && field.get('multiple')) {
                mobxSet(data, key, []);
            } else {
                mobxSet(data, key, {});
            }
        }
        var obj = mobxGet(data, key);
        if (isArrayLike(obj)) {
            if (isArrayLike(value)) {
                value.forEach(function (item, i) {
                    if (!obj[i]) {
                        obj.push({});
                    }
                    set(obj[i], prop.slice(index + 1), item);
                });
            }
        } else if (isObject(obj)) {
            set(obj, prop.slice(index + 1), value);
        }
    } else {
        mobxSet(data, prop, value);
    }
}
export function remove(obj, prop) {
    var index = prop.indexOf('.');
    if (index !== -1) {
        var key = prop.slice(0, index);
        var restKey = prop.slice(index + 1);
        var value = mobxGet(obj, key);
        if (isArrayLike(value)) {
            value.forEach(function (item) {
                return remove(item, restKey);
            });
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            remove(value, restKey);
        }
    } else {
        mobxRemove(obj, prop);
    }
}