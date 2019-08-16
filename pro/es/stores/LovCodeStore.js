import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import * as tslib_1 from "tslib";
import isNil from 'lodash/isNil';
import { action, observable, runInAction } from 'mobx';
import warning from '../../../es/_util/warning';
import DataSet from '../data-set/DataSet';
import axios from '../axios';
import { getConfig } from '../../../es/configure';
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
export var LovCodeStore = function () {
    function LovCodeStore() {
        _classCallCheck(this, LovCodeStore);

        this.pendings = {};
        this.init();
    }

    _createClass(LovCodeStore, [{
        key: 'init',
        value: function init() {
            this.lovCodes = observable.map();
            this.lovDS = observable.map();
        }
    }, {
        key: 'getConfig',
        value: function getConfig(code) {
            return this.lovCodes.get(code);
        }
    }, {
        key: 'fetchConfig',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(code) {
                var _this = this;

                var config, lovDefineAxiosConfig, pending;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                                lovDefineAxiosConfig = getConfig('lovDefineAxiosConfig');
                                pending = this.pendings[code] = this.pendings[code] || (lovDefineAxiosConfig ? this.axios(lovDefineAxiosConfig(code)) : this.axios.post(this.getConfigUrl(code)));
                                _context.next = 7;
                                return pending;

                            case 7:
                                config = _context.sent;

                                runInAction(function () {
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

                    var lovQueryAxiosConfig = getConfig('lovQueryAxiosConfig');
                    var dataSetProps = {
                        queryUrl: lovQueryAxiosConfig ? undefined : this.getQueryUrl(code),
                        transport: lovQueryAxiosConfig && {
                            read: lovQueryAxiosConfig(code, config)
                        },
                        cacheSelection: true
                    };
                    if (!isNil(lovPageSize) && !isNaN(Number(lovPageSize))) {
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
                    runInAction(function () {
                        _this2.lovDS.set(code, ds = new DataSet(dataSetProps));
                    });
                } else {
                    warning(false, 'LOV: code<' + code + '> is not exists');
                }
            }
            return ds;
        }
    }, {
        key: 'getConfigUrl',
        value: function getConfigUrl(code) {
            var lovDefineUrl = getConfig('lovDefineUrl');
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
            var lovQueryUrl = getConfig('lovQueryUrl');
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
            return getConfig('axios') || axios;
        }
    }]);

    return LovCodeStore;
}();
tslib_1.__decorate([observable], LovCodeStore.prototype, "lovCodes", void 0);
tslib_1.__decorate([observable], LovCodeStore.prototype, "lovDS", void 0);
tslib_1.__decorate([action], LovCodeStore.prototype, "init", null);
tslib_1.__decorate([action], LovCodeStore.prototype, "clearCache", null);
export default new LovCodeStore();