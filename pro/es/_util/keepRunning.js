import createDefaultSetter from './createDefaultSetter';
import EventManager from './EventManager';
import TaskRunner from './TaskRunner';
function keep(fn, e) {
    var _this = this;

    if (e && e.target) {
        e.persist();
        var delayer = new TaskRunner();
        var keeper = new TaskRunner();
        var event = new EventManager(e.target);
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
export default function keepRunning(target, key, descriptor) {
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

        set: createDefaultSetter(key)
    };
}