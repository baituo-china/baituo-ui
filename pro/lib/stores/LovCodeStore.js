'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LovCodeStore = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _mobx = require('mobx');

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _DataSet = require('../data-set/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _axios = require('../axios');

var _axios2 = _interopRequireDefault(_axios);

var _configure = require('../../../lib/configure');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getFieldType(conditionFieldType) {
    switch (conditionFieldType) {
        case "INT" /* INT */:
            return "number" /* number */;
        case "TEXT" /* TEXT */:
            return "string" /* string */;
        case "DATE" /* DATE */:
            return "date" /* date */;
        case "DATETIME" /* DATETIME */:
            return "dateTime" /* dateTime */;
        case "POPUP" /* POPUP */:
            return "object" /* object */;
        default:
            return conditionFieldType || "string" /* string */;
    }
}
function generateConditionField(fields, _ref) {
    var conditionField = _ref.conditionField,
        conditionFieldType = _ref.conditionFieldType,
        conditionFieldName = _ref.conditionFieldName,
        gridFieldName = _ref.gridFieldName,
        display = _ref.display,
        conditionFieldLovCode = _ref.conditionFieldLovCode,
        conditionFieldSelectCode = _ref.conditionFieldSelectCode,
        conditionFieldSelectUrl = _ref.conditionFieldSelectUrl,
        conditionFieldSelectTf = _ref.conditionFieldSelectTf,
        conditionFieldSelectVf = _ref.conditionFieldSelectVf;

    if (conditionField === 'Y') {
        var name = conditionFieldName || gridFieldName;
        var field = {
            name: name,
            type: getFieldType(conditionFieldType),
            label: display,
            lovCode: conditionFieldLovCode || void 0,
            lookupCode: conditionFieldSelectCode || void 0,
            lookupUrl: conditionFieldSelectUrl || void 0,
            textField: conditionFieldSelectTf || void 0,
            valueField: conditionFieldSelectVf || void 0
        };
        fields.push(field);
        if (conditionFieldType === "POPUP" /* POPUP */) {
                var aliasName = '__lov__' + name;
                field.name = aliasName;
                fields.push({
                    name: name,
                    bind: aliasName + '.' + conditionFieldSelectVf
                });
            }
    }
}
function generateGridField(fields, _ref2, valueField) {
    var gridField = _ref2.gridField,
        gridFieldName = _ref2.gridFieldName,
        display = _ref2.display;

    if (gridField === 'Y') {
        fields.push({
            name: gridFieldName,
            label: display,
            unique: valueField === gridFieldName
        });
    }
}

var LovCodeStore = exports.LovCodeStore = function () {
    function LovCodeStore() {
        (0, _classCallCheck3['default'])(this, LovCodeStore);

        this.pendings = {};
        this.init();
    }

    (0, _createClass3['default'])(LovCodeStore, [{
        key: 'init',
        value: function init() {
            this.lovCodes = _mobx.observable.map();
            this.lovDS = _mobx.observable.map();
        }
    }, {
        key: 'getConfig',
        value: function getConfig(code) {
            return this.lovCodes.get(code);
        }
    }, {
        key: 'fetchConfig',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(code) {
                var _this = this;

                var config, lovDefineAxiosConfig, pending;
                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                config = this.getConfig(code);
                                // SSR do not fetch the lookup

                                if (!(!config && typeof window !== 'undefined')) {
                                    _context.next = 12;
                                    break;
                                }

                                _context.prev = 2;
                                lovDefineAxiosConfig = (0, _configure.getConfig)('lovDefineAxiosConfig');
                                pending = this.pendings[code] = this.pendings[code] || (lovDefineAxiosConfig ? this.axios(lovDefineAxiosConfig(code)) : this.axios.post(this.getConfigUrl(code)));
                                _context.next = 7;
                                return pending;

                            case 7:
                                config = _context.sent;

                                (0, _mobx.runInAction)(function () {
                                    if (config) {
                                        _this.lovCodes.set(code, config);
                                    }
                                });

                            case 9:
                                _context.prev = 9;

                                delete this.pendings[code];
                                return _context.finish(9);

                            case 12:
                                return _context.abrupt('return', config);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2,, 9, 12]]);
            }));

            function fetchConfig(_x) {
                return _ref3.apply(this, arguments);
            }

            return fetchConfig;
        }()
    }, {
        key: 'getLovDataSet',
        value: function getLovDataSet(code) {
            var _this2 = this;

            var ds = this.lovDS.get(code);
            if (!ds) {
                var config = this.getConfig(code);
                if (config) {
                    var lovPageSize = config.lovPageSize,
                        lovItems = config.lovItems,
                        parentIdField = config.parentIdField,
                        idField = config.idField,
                        valueField = config.valueField,
                        treeFlag = config.treeFlag;

                    var lovQueryAxiosConfig = (0, _configure.getConfig)('lovQueryAxiosConfig');
                    var dataSetProps = {
                        queryUrl: lovQueryAxiosConfig ? undefined : this.getQueryUrl(code),
                        transport: lovQueryAxiosConfig && {
                            read: lovQueryAxiosConfig(code, config)
                        },
                        cacheSelection: true
                    };
                    if (!(0, _isNil2['default'])(lovPageSize) && !isNaN(Number(lovPageSize))) {
                        dataSetProps.pageSize = Number(lovPageSize);
                    } else {
                        dataSetProps.paging = false;
                    }
                    if (treeFlag === 'Y' && parentIdField && idField) {
                        dataSetProps.parentField = parentIdField;
                        dataSetProps.idField = idField;
                    }
                    if (lovItems && lovItems.length) {
                        var _lovItems$sort$reduce = lovItems.sort(function (_ref4, _ref5) {
                            var conditionFieldSequence = _ref4.conditionFieldSequence;
                            var conditionFieldSequence2 = _ref5.conditionFieldSequence;
                            return conditionFieldSequence - conditionFieldSequence2;
                        }).reduce(function (obj, configItem) {
                            return generateConditionField(obj.querys, configItem), generateGridField(obj.fields, configItem, valueField), obj;
                        }, { querys: [], fields: [] }),
                            querys = _lovItems$sort$reduce.querys,
                            fields = _lovItems$sort$reduce.fields;

                        if (querys.length) {
                            dataSetProps.queryFields = querys;
                        }
                        if (fields.length) {
                            dataSetProps.fields = fields;
                        }
                    }
                    (0, _mobx.runInAction)(function () {
                        _this2.lovDS.set(code, ds = new _DataSet2['default'](dataSetProps));
                    });
                } else {
                    (0, _warning2['default'])(false, 'LOV: code<' + code + '> is not exists');
                }
            }
            return ds;
        }
    }, {
        key: 'getConfigUrl',
        value: function getConfigUrl(code) {
            var lovDefineUrl = (0, _configure.getConfig)('lovDefineUrl');
            if (typeof lovDefineUrl === 'function') {
                return lovDefineUrl(code);
            } else {
                return lovDefineUrl;
            }
        }
    }, {
        key: 'getQueryUrl',
        value: function getQueryUrl(code) {
            var config = this.getConfig(code);
            if (config) {
                var customUrl = config.customUrl;

                if (customUrl) {
                    return customUrl;
                }
            }
            var lovQueryUrl = (0, _configure.getConfig)('lovQueryUrl');
            if (typeof lovQueryUrl === 'function') {
                return lovQueryUrl(code, config);
            } else {
                return lovQueryUrl;
            }
        }
    }, {
        key: 'clearCache',
        value: function clearCache(codes) {
            var _this3 = this;

            if (codes) {
                codes.forEach(function (code) {
                    return _this3.lovCodes['delete'](code), _this3.lovDS['delete'](code);
                });
            } else {
                this.lovCodes.clear();
                this.lovDS.clear();
            }
        }
    }, {
        key: 'axios',
        get: function get() {
            return (0, _configure.getConfig)('axios') || _axios2['default'];
        }
    }]);
    return LovCodeStore;
}();

tslib_1.__decorate([_mobx.observable], LovCodeStore.prototype, "lovCodes", void 0);
tslib_1.__decorate([_mobx.observable], LovCodeStore.prototype, "lovDS", void 0);
tslib_1.__decorate([_mobx.action], LovCodeStore.prototype, "init", null);
tslib_1.__decorate([_mobx.action], LovCodeStore.prototype, "clearCache", null);
exports['default'] = new LovCodeStore();