'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocaleContext = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobx = require('mobx');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _supports = require('./supports');

var _supports2 = _interopRequireDefault(_supports);

var _normalizeLanguage = require('../_util/normalizeLanguage');

var _normalizeLanguage2 = _interopRequireDefault(_normalizeLanguage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function setMomentLocale(locale) {
    _moment2['default'].locale((0, _normalizeLanguage2['default'])(locale ? locale.lang : _locale2['default'].lang));
}

var LocaleContext = exports.LocaleContext = function () {
    function LocaleContext() {
        var _this = this;

        (0, _classCallCheck3['default'])(this, LocaleContext);

        (0, _mobx.runInAction)(function () {
            _this.locale = _locale2['default'];
            _this.supports = _supports2['default'];
        });
    }

    (0, _createClass3['default'])(LocaleContext, [{
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
            var cmp = (0, _mobx.get)(this.locale, component);
            return cmp && (0, _mobx.get)(cmp, key) || component + '.' + key;
        }
    }]);
    return LocaleContext;
}();

tslib_1.__decorate([_mobx.observable], LocaleContext.prototype, "locale", void 0);
tslib_1.__decorate([_mobx.observable], LocaleContext.prototype, "supports", void 0);
tslib_1.__decorate([_mobx.action], LocaleContext.prototype, "setLocale", null);
exports['default'] = new LocaleContext();