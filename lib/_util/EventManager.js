"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

exports.preventDefault = preventDefault;
exports.stopPropagation = stopPropagation;
exports.stopEvent = stopEvent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function on(eventName, fn, el, useCapture) {
    if (el) {
        if (el.addEventListener) {
            el.addEventListener(eventName, fn, useCapture);
        } else if (el.attachEvent) {
            el.attachEvent("on" + eventName, fn);
        }
    }
}
function off(eventName, fn, el, useCapture) {
    if (el) {
        if (el.removeEventListener) {
            el.removeEventListener(eventName, fn, useCapture);
        } else if (el.attachEvent) {
            el.detachEvent("on" + eventName, fn);
        }
    }
}

var EventManager = function () {
    function EventManager(el) {
        (0, _classCallCheck3["default"])(this, EventManager);

        this.events = {};
        this.el = el;
    }

    (0, _createClass3["default"])(EventManager, [{
        key: "addEventListener",
        value: function addEventListener(eventName, fn) {
            var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            eventName = eventName.toLowerCase();
            var events = this.events[eventName] || [];
            var index = events.findIndex(function (_ref) {
                var _ref2 = (0, _slicedToArray3["default"])(_ref, 1),
                    event = _ref2[0];

                return event === fn;
            });
            if (index === -1) {
                events.push([fn, useCapture]);
                this.events[eventName] = events;
                on(eventName, fn, this.el, useCapture);
            }
            return this;
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(eventName, fn) {
            var _this = this;

            var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            eventName = eventName.toLowerCase();
            var events = this.events[eventName];
            if (events) {
                if (fn) {
                    var index = events.findIndex(function (_ref3) {
                        var _ref4 = (0, _slicedToArray3["default"])(_ref3, 1),
                            event = _ref4[0];

                        return event === fn;
                    });
                    if (index !== -1) {
                        events.splice(index, 1);
                    }
                    off(eventName, fn, this.el, useCapture);
                } else {
                    this.events[eventName] = this.el ? (this.events[eventName] || []).filter(function (_ref5) {
                        var _ref6 = (0, _slicedToArray3["default"])(_ref5, 2),
                            event = _ref6[0],
                            capture = _ref6[1];

                        return off(eventName, event, _this.el, capture), false;
                    }) : [];
                }
            }
            return this;
        }
    }, {
        key: "fireEvent",
        value: function () {
            var _ref7 = (0, _asyncToGenerator3["default"])( /*#__PURE__*/_regenerator2["default"].mark(function _callee(eventName) {
                for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    rest[_key - 1] = arguments[_key];
                }

                var events;
                return _regenerator2["default"].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                events = this.events[eventName.toLowerCase()];

                                if (!events) {
                                    _context.next = 7;
                                    break;
                                }

                                _context.next = 4;
                                return Promise.all(events.map(function (_ref8) {
                                    var _ref9 = (0, _slicedToArray3["default"])(_ref8, 1),
                                        fn = _ref9[0];

                                    return fn.apply(void 0, rest);
                                })).then(function (all) {
                                    return all.every(function (result) {
                                        return result !== false;
                                    });
                                });

                            case 4:
                                _context.t0 = _context.sent;
                                _context.next = 8;
                                break;

                            case 7:
                                _context.t0 = true;

                            case 8:
                                return _context.abrupt("return", _context.t0);

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function fireEvent(_x3) {
                return _ref7.apply(this, arguments);
            }

            return fireEvent;
        }()
    }, {
        key: "clear",
        value: function clear() {
            var _this2 = this;

            if (this.el) {
                Object.keys(this.events).forEach(function (eventName) {
                    return _this2.removeEventListener(eventName);
                });
            }
            this.events = {};
            return this;
        }
    }]);
    return EventManager;
}();

exports["default"] = EventManager;
function preventDefault(e) {
    e.preventDefault();
}
function stopPropagation(e) {
    e.stopPropagation();
}
function stopEvent(e) {
    preventDefault(e);
    stopPropagation(e);
}