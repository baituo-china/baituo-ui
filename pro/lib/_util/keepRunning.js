'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = keepRunning;

var _createDefaultSetter = require('./createDefaultSetter');

var _createDefaultSetter2 = _interopRequireDefault(_createDefaultSetter);

var _EventManager = require('./EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

var _TaskRunner = require('./TaskRunner');

var _TaskRunner2 = _interopRequireDefault(_TaskRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function keep(fn, e) {
    var _this = this;

    if (e && e.target) {
        e.persist();
        var delayer = new _TaskRunner2['default']();
        var keeper = new _TaskRunner2['default']();
        var event = new _EventManager2['default'](e.target);
        var delayFn = function delayFn() {
            keeper.run(40, fn.bind(_this, e));
        };
        var stopFn = function stopFn() {
            delayer.cancel();
            keeper.cancel();
            event.clear();
        };
        delayer.delay(500, delayFn);
        event.addEventListener('mouseleave', stopFn);
        event.addEventListener('mouseup', stopFn);
    }
    fn.call(this, e);
}
function keepRunning(target, key, descriptor) {
    var constructor = target.constructor;
    var fn = descriptor.value;

    return {
        configurable: true,
        get: function get() {
            if (this === target) {
                return fn;
            }
            if (this.constructor !== constructor && Object.getPrototypeOf(this).constructor === constructor) {
                return fn;
            }
            var boundFn = keep.bind(this, fn);
            Object.defineProperty(this, key, {
                value: boundFn,
                configurable: true,
                writable: true
            });
            return boundFn;
        },

        set: (0, _createDefaultSetter2['default'])(key)
    };
}
module.exports = exports['default'];