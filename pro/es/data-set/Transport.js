import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import * as tslib_1 from "tslib";
import { computed, observable, runInAction } from 'mobx';
function defaultAxiosAdapter(config) {
    return config;
}

var Transport = function () {
    function Transport() {
        var _this = this;

        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var dataSet = arguments[1];

        _classCallCheck(this, Transport);

        runInAction(function () {
            _this.props = props;
            _this.dataSet = dataSet;
        });
    }

    _createClass(Transport, [{
        key: "create",
        set: function set(create) {
            var _this2 = this;

            runInAction(function () {
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

            runInAction(function () {
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

            runInAction(function () {
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

            runInAction(function () {
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

            runInAction(function () {
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

            runInAction(function () {
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

            runInAction(function () {
                _this8.props.adapter = adapter;
            });
        },
        get: function get() {
            return this.props.adapter || defaultAxiosAdapter;
        }
    }]);

    return Transport;
}();

export default Transport;

tslib_1.__decorate([observable], Transport.prototype, "props", void 0);
tslib_1.__decorate([computed], Transport.prototype, "create", null);
tslib_1.__decorate([computed], Transport.prototype, "read", null);
tslib_1.__decorate([computed], Transport.prototype, "update", null);
tslib_1.__decorate([computed], Transport.prototype, "destroy", null);
tslib_1.__decorate([computed], Transport.prototype, "validate", null);
tslib_1.__decorate([computed], Transport.prototype, "submit", null);
tslib_1.__decorate([computed], Transport.prototype, "adapter", null);