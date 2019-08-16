import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';

var TaskRunner = function () {
    function TaskRunner(fn) {
        _classCallCheck(this, TaskRunner);

        this.callbacks = [];
        if (fn) {
            this.fn = fn;
        }
    }

    _createClass(TaskRunner, [{
        key: 'delay',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_delay, fn, callback) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', this.start(true, _delay, fn, callback));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function delay(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return delay;
        }()
    }, {
        key: 'run',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(interval, fn, callback) {
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', this.start(false, interval, fn, callback));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function run(_x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
            }

            return run;
        }()
    }, {
        key: 'start',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(once, interval, fn, callback) {
                var _this = this;

                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                this.cancel();
                                if (fn) {
                                    this.fn = fn;
                                }
                                if (typeof callback === 'function') {
                                    this.callbacks.push(callback);
                                }

                                if (!this.fn) {
                                    _context3.next = 5;
                                    break;
                                }

                                return _context3.abrupt('return', new Promise(function (resolve) {
                                    _this.id = setInterval(function () {
                                        if (once) {
                                            _this.cancel();
                                        }
                                        resolve(_this.fn());
                                        _this.callbacks.forEach(function (cb) {
                                            return cb();
                                        });
                                        _this.callbacks = [];
                                    }, interval);
                                }));

                            case 5:
                                return _context3.abrupt('return', Promise.reject('no caller'));

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function start(_x7, _x8, _x9, _x10) {
                return _ref3.apply(this, arguments);
            }

            return start;
        }()
    }, {
        key: 'cancel',
        value: function cancel() {
            if (this.id) {
                clearInterval(this.id);
                delete this.id;
            }
            return this;
        }
    }]);

    return TaskRunner;
}();

export default TaskRunner;