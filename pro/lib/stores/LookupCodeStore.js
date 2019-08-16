'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LookupCodeStore = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobx = require('mobx');

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _axios = require('../axios');

var _axios2 = _interopRequireDefault(_axios);

var _Field = require('../data-set/Field');

var _Field2 = _interopRequireDefault(_Field);

var _LovCodeStore = require('./LovCodeStore');

var _LovCodeStore2 = _interopRequireDefault(_LovCodeStore);

var _utils = require('../data-set/utils');

var _configure = require('../../../lib/configure');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LookupCodeStore = exports.LookupCodeStore = function () {
    function LookupCodeStore() {
        (0, _classCallCheck3['default'])(this, LookupCodeStore);

        this.pendings = {};
        this.init();
    }

    (0, _createClass3['default'])(LookupCodeStore, [{
        key: 'init',
        value: function init() {
            this.lookupCodes = _mobx.observable.map();
        }
    }, {
        key: 'get',
        value: function get(lookupKey) {
            return this.lookupCodes.get(lookupKey);
        }
    }, {
        key: 'set',
        value: function set(lookupKey, data) {
            if (data) {
                this.lookupCodes.set(lookupKey, data);
            }
        }
    }, {
        key: 'getByValue',
        value: function getByValue(lookupKey, value, valueField) {
            var lookup = this.get(lookupKey);
            if (lookup) {
                return lookup.find(function (obj) {
                    return (0, _utils.isSameLike)((0, _mobx.get)(obj, valueField), value);
                });
            }
        }
    }, {
        key: 'getText',
        value: function getText(lookupKey, value, valueField, textField) {
            var found = this.getByValue(lookupKey, value, valueField);
            if (found) {
                return (0, _mobx.get)(found, textField);
            }
        }
    }, {
        key: 'fetchLookupData',
        value: function () {
            var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(key) {
                var axiosConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var lookupKey, config, data, pending, result;
                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                lookupKey = void 0;
                                config = {};

                                if ((0, _isString2['default'])(key)) {
                                    lookupKey = key;
                                    config = (0, _extends3['default'])({}, axiosConfig, {
                                        url: key,
                                        method: axiosConfig.method || (0, _configure.getConfig)('lookupAxiosMethod') || 'post'
                                    });
                                } else {
                                    config = key;
                                    lookupKey = this.getKey(config);
                                }

                                if (!lookupKey) {
                                    _context.next = 17;
                                    break;
                                }

                                data = this.get(lookupKey);
                                // SSR do not fetch the lookup

                                if (!(!data && typeof window !== 'undefined')) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.prev = 6;
                                pending = this.pendings[lookupKey] = this.pendings[lookupKey] || this.axios(config);
                                _context.next = 10;
                                return pending;

                            case 10:
                                result = _context.sent;

                                if (result) {
                                    data = (0, _utils.generateResponseData)(result, (0, _configure.getConfig)('dataKey'));
                                    this.set(lookupKey, data);
                                }
                                (0, _warning2['default'])(!!data, 'Lookup<' + lookupKey + '> is not exists');

                            case 13:
                                _context.prev = 13;

                                delete this.pendings[lookupKey];
                                return _context.finish(13);

                            case 16:
                                return _context.abrupt('return', data);

                            case 17:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6,, 13, 16]]);
            }));

            function fetchLookupData(_x2) {
                return _ref.apply(this, arguments);
            }

            return fetchLookupData;
        }()
    }, {
        key: 'getAxiosConfig',
        value: function getAxiosConfig(field) {
            var lookupAxiosConfig = field.get('lookupAxiosConfig');
            var config = {};
            if (typeof lookupAxiosConfig === 'function') {
                var lookupCode = field.get('lookupCode');
                var cascadeMap = field.get('cascadeMap');
                var record = field.record;

                var params = {};
                if (cascadeMap && record) {
                    Object.keys(cascadeMap).forEach(function (key) {
                        params[key] = record.get(cascadeMap[key]);
                    });
                }
                config = lookupAxiosConfig({ dataSet: field.dataSet, record: record, params: params, lookupCode: lookupCode });
            } else if (lookupAxiosConfig) {
                config = lookupAxiosConfig;
            }
            return (0, _extends3['default'])({}, config, {
                url: config.url || this.getUrl(field),
                method: config.method || (0, _configure.getConfig)('lookupAxiosMethod') || 'post'
            });
        }
    }, {
        key: 'getKey',
        value: function getKey(field) {
            if (field instanceof _Field2['default']) {
                return this.getKey(this.getAxiosConfig(field));
            }
            var url = field.url,
                params = field.params,
                data = field.data;

            if (url) {
                return (0, _utils.append)(url, (0, _extends3['default'])({}, params, data));
            }
        }
    }, {
        key: 'getUrl',
        value: function getUrl(field) {
            var type = field.get('type');
            var lovCode = field.get('lovCode');
            var lookupUrl = field.get('lookupUrl');
            var lookupCode = field.get('lookupCode');
            if (typeof lookupUrl === 'function' && lookupCode) {
                return lookupUrl(lookupCode);
            } else if ((0, _isString2['default'])(lookupUrl)) {
                return lookupUrl;
            }
            if (lovCode && type !== "object" /* object */) {
                    return _LovCodeStore2['default'].getQueryUrl(lovCode);
                }
        }
    }, {
        key: 'clearCache',
        value: function clearCache(codes) {
            var _this = this;

            if (codes) {
                var lookupUrl = (0, _configure.getConfig)('lookupUrl');
                if (typeof lookupUrl === 'function') {
                    codes.forEach(function (code) {
                        return _this.lookupCodes['delete'](lookupUrl(code)), _this.lookupCodes['delete'](code);
                    });
                } else {
                    codes.forEach(function (code) {
                        return _this.lookupCodes['delete'](code);
                    });
                }
            } else {
                this.lookupCodes.clear();
            }
        }
    }, {
        key: 'axios',
        get: function get() {
            return (0, _configure.getConfig)('axios') || _axios2['default'];
        }
    }]);
    return LookupCodeStore;
}();

tslib_1.__decorate([_mobx.observable], LookupCodeStore.prototype, "lookupCodes", void 0);
tslib_1.__decorate([_mobx.action], LookupCodeStore.prototype, "init", null);
tslib_1.__decorate([_mobx.action], LookupCodeStore.prototype, "set", null);
tslib_1.__decorate([_mobx.action], LookupCodeStore.prototype, "clearCache", null);
exports['default'] = new LookupCodeStore();