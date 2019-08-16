"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _tslib = require("tslib");

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobx = require("mobx");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function defaultAxiosAdapter(config) {
    return config;
}

var Transport = function () {
    function Transport() {
        var _this = this;

        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var dataSet = arguments[1];
        (0, _classCallCheck3["default"])(this, Transport);

        (0, _mobx.runInAction)(function () {
            _this.props = props;
            _this.dataSet = dataSet;
        });
    }

    (0, _createClass3["default"])(Transport, [{
        key: "create",
        set: function set(create) {
            var _this2 = this;

            (0, _mobx.runInAction)(function () {
                _this2.props.create = create;
            });
        },
        get: function get() {
            return this.props.create;
        }
    }, {
        key: "read",
        set: function set(read) {
            var _this3 = this;

            (0, _mobx.runInAction)(function () {
                _this3.props.read = read;
            });
        },
        get: function get() {
            return this.props.read || this.dataSet.queryUrl;
        }
    }, {
        key: "update",
        set: function set(update) {
            var _this4 = this;

            (0, _mobx.runInAction)(function () {
                _this4.props.update = update;
            });
        },
        get: function get() {
            return this.props.update;
        }
    }, {
        key: "destroy",
        set: function set(destroy) {
            var _this5 = this;

            (0, _mobx.runInAction)(function () {
                _this5.props.destroy = destroy;
            });
        },
        get: function get() {
            return this.props.destroy;
        }
    }, {
        key: "validate",
        set: function set(validate) {
            var _this6 = this;

            (0, _mobx.runInAction)(function () {
                _this6.props.validate = validate;
            });
        },
        get: function get() {
            return this.props.validate || this.dataSet.validateUrl;
        }
    }, {
        key: "submit",
        set: function set(submit) {
            var _this7 = this;

            (0, _mobx.runInAction)(function () {
                _this7.props.submit = submit;
            });
        },
        get: function get() {
            return this.props.submit || this.dataSet.submitUrl;
        }
    }, {
        key: "adapter",
        set: function set(adapter) {
            var _this8 = this;

            (0, _mobx.runInAction)(function () {
                _this8.props.adapter = adapter;
            });
        },
        get: function get() {
            return this.props.adapter || defaultAxiosAdapter;
        }
    }]);
    return Transport;
}();

exports["default"] = Transport;

tslib_1.__decorate([_mobx.observable], Transport.prototype, "props", void 0);
tslib_1.__decorate([_mobx.computed], Transport.prototype, "create", null);
tslib_1.__decorate([_mobx.computed], Transport.prototype, "read", null);
tslib_1.__decorate([_mobx.computed], Transport.prototype, "update", null);
tslib_1.__decorate([_mobx.computed], Transport.prototype, "destroy", null);
tslib_1.__decorate([_mobx.computed], Transport.prototype, "validate", null);
tslib_1.__decorate([_mobx.computed], Transport.prototype, "submit", null);
tslib_1.__decorate([_mobx.computed], Transport.prototype, "adapter", null);
module.exports = exports["default"];