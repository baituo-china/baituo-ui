import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import * as tslib_1 from "tslib";
import { action, get as _get, observable, runInAction } from 'mobx';
import moment from 'moment';
import defaultLocale from './locale';
import defaultSupports from './supports';
import normalizeLanguage from '../_util/normalizeLanguage';
function setMomentLocale(locale) {
    moment.locale(normalizeLanguage(locale ? locale.lang : defaultLocale.lang));
}
export var LocaleContext = function () {
    function LocaleContext() {
        var _this = this;

        _classCallCheck(this, LocaleContext);

        runInAction(function () {
            _this.locale = defaultLocale;
            _this.supports = defaultSupports;
        });
    }

    _createClass(LocaleContext, [{
        key: 'setLocale',
        value: function setLocale(locale) {
            setMomentLocale(locale);
            this.locale = locale;
        }
    }, {
        key: 'setSupports',
        value: function setSupports(supports) {
            this.supports = supports;
        }
    }, {
        key: 'get',
        value: function get(component, key) {
            var cmp = _get(this.locale, component);
            return cmp && _get(cmp, key) || component + '.' + key;
        }
    }]);

    return LocaleContext;
}();
tslib_1.__decorate([observable], LocaleContext.prototype, "locale", void 0);
tslib_1.__decorate([observable], LocaleContext.prototype, "supports", void 0);
tslib_1.__decorate([action], LocaleContext.prototype, "setLocale", null);
export default new LocaleContext();