'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = autobind;

var _weakMap = require('core-js/library/fn/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _createDefaultSetter = require('./createDefaultSetter');

var _createDefaultSetter2 = _interopRequireDefault(_createDefaultSetter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var mapStore = void 0;
function bind(fn, context) {
    if (fn.bind) {
        return fn.bind(context);
    } else {
        return function __autobind__() {
            return fn.apply(context, arguments);
        };
    }
}
function getBoundSuper(obj, fn) {
    if (typeof _weakMap2['default'] === 'undefined') {
        throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()\n      See https://github.com/jayphelps/core-decorators.js/issues/20');
    }
    if (!mapStore) {
        mapStore = new _weakMap2['default']();
    }
    if (mapStore.has(obj) === false) {
        mapStore.set(obj, new _weakMap2['default']());
    }
    var superStore = mapStore.get(obj);
    if (superStore.has(fn) === false) {
        superStore.set(fn, bind(fn, obj));
    }
    return superStore.get(fn);
}
/**
 * 绑定方法的this指向当前对象实例.
 *
 * @private
 * @param {Function} target 方法对象
 * @param {string} key 方法名.
 * @param {Object} descriptor 方法描述对象.
 * @returns {Object} 方法描述对象.
 */
function autobind(target, key, descriptor) {
    var constructor = target.constructor;
    var fn = descriptor.value,
        configurable = descriptor.configurable,
        enumerable = descriptor.enumerable;

    return {
        configurable: configurable,
        enumerable: enumerable,
        get: function get() {
            // Class.prototype.key lookup
            // Someone accesses the property directly on the prototype on which it is
            // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
            if (this === target) {
                return fn;
            }
            // Class.prototype.key lookup
            // Someone accesses the property directly on a prototype but it was found
            // up the chain, not defined directly on it
            // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
            if (this.constructor !== constructor && Object.getPrototypeOf(this).constructor === constructor) {
                return fn;
            }
            // Autobound method calling super.sameMethod() which is also autobound and so on.
            if (this.constructor !== constructor && key in this.constructor.prototype) {
                return getBoundSuper(this, fn);
            }
            var boundFn = bind(fn, this);
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                // NOT enumerable when it's a bound method
                enumerable: false,
                value: boundFn
            });
            return boundFn;
        },

        set: (0, _createDefaultSetter2['default'])(key)
    };
}
module.exports = exports['default'];