'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobx = require('mobx');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Validity = function () {
    function Validity() {
        (0, _classCallCheck3['default'])(this, Validity);

        this.init();
    }

    (0, _createClass3['default'])(Validity, [{
        key: 'reset',
        value: function reset() {
            this.init();
        }
    }, {
        key: 'init',
        value: function init() {
            this.badInput = false;
            this.customError = false;
            this.patternMismatch = false;
            this.rangeOverflow = false;
            this.rangeUnderflow = false;
            this.stepMismatch = false;
            this.tooLong = false;
            this.tooShort = false;
            this.typeMismatch = false;
            this.valueMissing = false;
            this.uniqueError = false;
        }
    }, {
        key: 'valid',
        get: function get() {
            var _this = this;

            return Object.keys(this).filter(function (key) {
                return key !== 'valid';
            }).every(function (key) {
                return !_this[key];
            });
        }
    }]);
    return Validity;
}();

exports['default'] = Validity;

tslib_1.__decorate([_mobx.observable], Validity.prototype, "badInput", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "customError", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "patternMismatch", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "rangeOverflow", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "rangeUnderflow", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "stepMismatch", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "tooLong", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "tooShort", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "typeMismatch", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "valueMissing", void 0);
tslib_1.__decorate([_mobx.observable], Validity.prototype, "uniqueError", void 0);
tslib_1.__decorate([_mobx.computed], Validity.prototype, "valid", null);
tslib_1.__decorate([_mobx.action], Validity.prototype, "init", null);
module.exports = exports['default'];