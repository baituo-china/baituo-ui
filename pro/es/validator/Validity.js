import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import * as tslib_1 from "tslib";
import { action, computed, observable } from 'mobx';

var Validity = function () {
    function Validity() {
        _classCallCheck(this, Validity);

        this.init();
    }

    _createClass(Validity, [{
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

export default Validity;

tslib_1.__decorate([observable], Validity.prototype, "badInput", void 0);
tslib_1.__decorate([observable], Validity.prototype, "customError", void 0);
tslib_1.__decorate([observable], Validity.prototype, "patternMismatch", void 0);
tslib_1.__decorate([observable], Validity.prototype, "rangeOverflow", void 0);
tslib_1.__decorate([observable], Validity.prototype, "rangeUnderflow", void 0);
tslib_1.__decorate([observable], Validity.prototype, "stepMismatch", void 0);
tslib_1.__decorate([observable], Validity.prototype, "tooLong", void 0);
tslib_1.__decorate([observable], Validity.prototype, "tooShort", void 0);
tslib_1.__decorate([observable], Validity.prototype, "typeMismatch", void 0);
tslib_1.__decorate([observable], Validity.prototype, "valueMissing", void 0);
tslib_1.__decorate([observable], Validity.prototype, "uniqueError", void 0);
tslib_1.__decorate([computed], Validity.prototype, "valid", null);
tslib_1.__decorate([action], Validity.prototype, "init", null);