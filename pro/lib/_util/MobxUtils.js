'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mobxGet = mobxGet;
exports.mobxSet = mobxSet;
exports.mobxRemove = mobxRemove;

var _mobx = require('mobx');

function mobxGet(obj, key) {
    if ((0, _mobx.isObservableObject)(obj)) {
        return (0, _mobx.get)(obj, key);
    } else {
        return obj[key];
    }
}
function mobxSet(obj, key, value) {
    if ((0, _mobx.isObservableObject)(obj)) {
        (0, _mobx.runInAction)(function () {
            (0, _mobx.set)(obj, key, value);
        });
    } else {
        obj[key] = value;
    }
}
function mobxRemove(obj, key) {
    if ((0, _mobx.isObservableObject)(obj)) {
        (0, _mobx.runInAction)(function () {
            (0, _mobx.remove)(obj, key);
        });
    } else {
        delete obj[key];
    }
}