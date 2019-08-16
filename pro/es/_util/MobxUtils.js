import { get, isObservableObject, remove, runInAction, set } from 'mobx';
export function mobxGet(obj, key) {
    if (isObservableObject(obj)) {
        return get(obj, key);
    } else {
        return obj[key];
    }
}
export function mobxSet(obj, key, value) {
    if (isObservableObject(obj)) {
        runInAction(function () {
            set(obj, key, value);
        });
    } else {
        obj[key] = value;
    }
}
export function mobxRemove(obj, key) {
    if (isObservableObject(obj)) {
        runInAction(function () {
            remove(obj, key);
        });
    } else {
        delete obj[key];
    }
}