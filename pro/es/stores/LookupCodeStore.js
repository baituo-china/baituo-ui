import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import * as tslib_1 from "tslib";
import { action, get, observable } from 'mobx';
import isString from 'lodash/isString';
import warning from '../../../es/_util/warning';
import axios from '../axios';
import Field from '../data-set/Field';
import lovCodeStore from './LovCodeStore';
import { append, generateResponseData, isSameLike } from '../data-set/utils';
import { getConfig } from '../../../es/configure';
export var LookupCodeStore = function () {
    function LookupCodeStore() {
        _classCallCheck(this, LookupCodeStore);

        this.pendings = {};
        this.init();
    }

    _createClass(LookupCodeStore, [{
        key: 'init',
        value: function init() {
            this.lookupCodes = observable.map();
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
                    return isSameLike(get(obj, valueField), value);
                });
            }
        }
    }, {
        key: 'getText',
        value: function getText(lookupKey, value, valueField, textField) {
            var found = this.getByValue(lookupKey, value, valueField);
            if (found) {
                return get(found, textField);
            }
        }
    }, {
        key: 'fetchLookupData',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(key) {
                var axiosConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var lookupKey, config, data, pending, result;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                lookupKey = void 0;
                                config = {};

                                if (isString(key)) {
                                    lookupKey = key;
                                    config = _extends({}, axiosConfig, {
                                        url: key,
                                        method: axiosConfig.method || getConfig('lookupAxiosMethod') || 'post'
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
                                    data = generateResponseData(result, getConfig('dataKey'));
                                    this.set(lookupKey, data);
                                }
                                warning(!!data, 'Lookup<' + lookupKey + '> is not exists');

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
            return _extends({}, config, {
                url: config.url || this.getUrl(field),
                method: config.method || getConfig('lookupAxiosMethod') || 'post'
            });
        }
    }, {
        key: 'getKey',
        value: function getKey(field) {
            if (field instanceof Field) {
                return this.getKey(this.getAxiosConfig(field));
            }
            var url = field.url,
                params = field.params,
                data = field.data;

            if (url) {
                return append(url, _extends({}, params, data));
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
            } else if (isString(lookupUrl)) {
                return lookupUrl;
            }
            if (lovCode && type !== "object" /* object */) {
                    return lovCodeStore.getQueryUrl(lovCode);
                }
        }
    }, {
        key: 'clearCache',
        value: function clearCache(codes) {
            var _this = this;

            if (codes) {
                var lookupUrl = getConfig('lookupUrl');
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
            return getConfig('axios') || axios;
        }
    }]);

    return LookupCodeStore;
}();
tslib_1.__decorate([observable], LookupCodeStore.prototype, "lookupCodes", void 0);
tslib_1.__decorate([action], LookupCodeStore.prototype, "init", null);
tslib_1.__decorate([action], LookupCodeStore.prototype, "set", null);
tslib_1.__decorate([action], LookupCodeStore.prototype, "clearCache", null);
export default new LookupCodeStore();