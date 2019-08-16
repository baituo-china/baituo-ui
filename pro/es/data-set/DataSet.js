import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import { action, computed, get as _get, isArrayLike, observable, runInAction, set as _set, toJS } from 'mobx';
import axiosStatic from 'axios';
import isNumber from 'lodash/isNumber';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import defer from 'lodash/defer';
import debounce from 'lodash/debounce';
import axios from '../axios';
import Record from './Record';
import Field from './Field';
import warning from '../../../es/_util/warning';
import { append, axiosAdapter, checkParentByInsert, doExport, findBindFieldBy, generateJSONData, generateResponseData, getFieldSorter, getOrderFields, prepareForSubmit, prepareSubmitData, sortTree } from './utils';
import EventManager from '../_util/EventManager';
import DataSetSnapshot from './DataSetSnapshot';
import confirm from '../modal/confirm';
import Message from '../message';
import exception from '../_util/exception';
import { $l } from '../locale-context';
import isEmpty from '../_util/isEmpty';
import * as ObjectChainValue from '../_util/ObjectChainValue';
import { getConfig } from '../../../es/configure';
import Transport from './Transport';

var DataSet = function (_EventManager) {
    _inherits(DataSet, _EventManager);

    function DataSet(props) {
        _classCallCheck(this, DataSet);

        var _this = _possibleConstructorReturn(this, (DataSet.__proto__ || Object.getPrototypeOf(DataSet)).call(this));

        _this.children = {};
        _this.originalData = [];
        _this.isFilteredByQueryFields = false;
        _this.inBatchSelection = false;
        _this.syncChildrenRemote = debounce(function (remoteKeys, current) {
            var children = _this.children;

            remoteKeys.forEach(function (childName) {
                return _this.syncChild(children[childName], current, childName);
            });
        }, 300);
        runInAction(function () {
            _this.props = props = _extends({}, DataSet.defaultProps, { dataKey: getConfig('dataKey'), totalKey: getConfig('totalKey') }, props);
            var _props = props,
                data = _props.data,
                fields = _props.fields,
                queryFields = _props.queryFields,
                queryDataSet = _props.queryDataSet,
                autoQuery = _props.autoQuery,
                autoCreate = _props.autoCreate,
                pageSize = _props.pageSize,
                selection = _props.selection,
                events = _props.events,
                id = _props.id,
                name = _props.name,
                children = _props.children,
                _props$queryParameter = _props.queryParameter,
                queryParameter = _props$queryParameter === undefined ? {} : _props$queryParameter;

            _this.name = name;
            _this.data = [];
            _this.fields = observable.map();
            _this.totalCount = 0;
            _this.status = "ready" /* ready */;
            _this.currentPage = 1;
            _this.destroyed = [];
            _this.cachedSelected = [];
            _this.queryParameter = queryParameter;
            _this.pageSize = pageSize;
            _this.selection = selection;
            _this.processListener();
            if (id) {
                _this.id = id;
            }
            if (children) {
                _this.initChildren(children);
            }
            if (events) {
                _this.initEvents(events);
            }
            if (fields) {
                _this.initFields(fields);
            }
            _this.initQueryDataSet(queryDataSet, queryFields);
            if (data) {
                var length = data.length;

                if (length) {
                    _this.loadData(data, length);
                }
            }
            // ssr do not auto query
            if (autoQuery && typeof window !== 'undefined') {
                _this.query();
            } else if (autoCreate && _this.length === 0) {
                _this.create();
            }
        });
        return _this;
    }

    _createClass(DataSet, [{
        key: 'processListener',
        value: function processListener() {
            this.addEventListener("indexChange" /* indexChange */, this.handleCascade);
            // let previous;
            // this.reaction = reaction(
            //   () => this.current,
            //   record => (this.fireEvent(DataSetEvents.indexChange, { dataSet: this, record, previous }, previous = record)),
            // );
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            // this.reaction();
            this.clear();
        }
    }, {
        key: 'snapshot',
        value: function snapshot() {
            return new DataSetSnapshot(this);
        }
    }, {
        key: 'restore',
        value: function restore(snapshot) {
            _extends(this, snapshot);
            return this;
        }
    }, {
        key: 'toData',
        value: function toData() {
            return this.data.map(function (record) {
                return record.toData();
            });
        }
    }, {
        key: 'toJSONData',
        value: function toJSONData(isSelected, noCascade) {
            var data = [];
            (isSelected ? this.selected : this.data.concat(this.destroyed)).forEach(function (record) {
                return generateJSONData(data, record, noCascade);
            });
            return data;
        }
        /**
         * 等待选中或者所有记录准备就绪
         * @param isSelect 如果为true，则只等待选中的记录
         * @returns Promise
         */

    }, {
        key: 'ready',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(isSelect) {
                var pending, result;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                pending = this.pending;
                                _context.next = 3;
                                return Promise.all([pending].concat(_toConsumableArray((isSelect ? this.selected : this.data).map(function (record) {
                                    return record.ready();
                                })), _toConsumableArray(Array.from(this.fields.values()).map(function (field) {
                                    return field.ready();
                                }))));

                            case 3:
                                result = _context.sent;

                                if (!(this.pending && this.pending !== pending)) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return', this.ready(isSelect));

                            case 6:
                                return _context.abrupt('return', result);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function ready(_x) {
                return _ref.apply(this, arguments);
            }

            return ready;
        }()
        /**
         * 查询记录
         * @param page 页码
         * @return Promise
         */

    }, {
        key: 'query',
        value: function query(page) {
            var _this2 = this;

            this.pending = new Promise(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(resolve, reject) {
                    var data;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return _this2.read(page);

                                case 3:
                                    data = _context2.sent;

                                    _this2.loadDataFromResponse(data);
                                    resolve(data);
                                    _context2.next = 11;
                                    break;

                                case 8:
                                    _context2.prev = 8;
                                    _context2.t0 = _context2['catch'](0);

                                    reject(_context2.t0);

                                case 11:
                                    _context2.prev = 11;

                                    _this2.pending = void 0;
                                    return _context2.finish(11);

                                case 14:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this2, [[0, 8, 11, 14]]);
                }));

                return function (_x2, _x3) {
                    return _ref2.apply(this, arguments);
                };
            }());
            return this.pending;
        }
        /**
         * 将数据集中的增删改的记录进行远程提交
         * @param isSelect 如果为true，则只提交选中记录
         * @param noCascade 如果为true，则不提交级联数据
         * @return Promise
         */

    }, {
        key: 'submit',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(isSelect, noCascade) {
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.ready(isSelect);

                            case 2:
                                _context3.next = 4;
                                return this.validate(isSelect, noCascade);

                            case 4:
                                if (!_context3.sent) {
                                    _context3.next = 6;
                                    break;
                                }

                                return _context3.abrupt('return', this.write(isSelect ? this.selected : this.data.concat(this.destroyed), noCascade));

                            case 6:
                                return _context3.abrupt('return', false);

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function submit(_x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return submit;
        }()
        /**
         * 导出数据
         * @param object columns 导出的列
         */

    }, {
        key: 'export',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
                var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var parent, exportUrl, params;
                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                parent = this.parent, exportUrl = this.exportUrl;
                                _context4.t0 = exportUrl && this.checkReadable(parent);

                                if (!_context4.t0) {
                                    _context4.next = 6;
                                    break;
                                }

                                _context4.next = 5;
                                return this.ready();

                            case 5:
                                _context4.t0 = _context4.sent;

                            case 6:
                                if (!_context4.t0) {
                                    _context4.next = 13;
                                    break;
                                }

                                _context4.next = 9;
                                return this.generateQueryParameter();

                            case 9:
                                params = _context4.sent;

                                params._HAP_EXCEL_EXPORT_COLUMNS = columns;
                                this.fireEvent("export" /* export */, { dataSet: this, params: params });
                                doExport(append(exportUrl, _extends({ total: this.totalCount, _r: Date.now() }, this.generateOrderQueryString())), JSON.stringify(params));

                            case 13:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function _export() {
                return _ref4.apply(this, arguments);
            }

            return _export;
        }()
        /**
         * 重置更改
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.data = this.originalData.map(function (record) {
                return record.reset();
            });
            this.destroyed = [];
            return this;
        }
        /**
         * 定位到指定页码，如果paging为true或`server`，则做远程查询
         * @param page 页码
         * @return Promise
         */

    }, {
        key: 'page',
        value: function page(_page) {
            if (_page > 0 && this.paging) {
                return this.locate((_page - 1) * this.pageSize + this.created.length - this.destroyed.length);
            }
            return Promise.reject('page rejected');
        }
        /**
         * 定位记录
         * @param index 索引
         * @return Promise
         */

    }, {
        key: 'locate',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(index) {
                var paging, pageSize, totalCount, modifiedCheck, currentRecord;
                return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                paging = this.paging, pageSize = this.pageSize, totalCount = this.totalCount;
                                modifiedCheck = this.props.modifiedCheck;
                                currentRecord = this.findInAllPage(index);

                                if (!currentRecord) {
                                    _context5.next = 8;
                                    break;
                                }

                                this.current = currentRecord;
                                return _context5.abrupt('return', currentRecord);

                            case 8:
                                if (!(paging === true)) {
                                    _context5.next = 23;
                                    break;
                                }

                                if (!(index >= 0 && index < totalCount + this.created.length - this.destroyed.length)) {
                                    _context5.next = 23;
                                    break;
                                }

                                _context5.t0 = !modifiedCheck || !this.isModified();

                                if (_context5.t0) {
                                    _context5.next = 16;
                                    break;
                                }

                                _context5.next = 14;
                                return confirm($l('DataSet', 'unsaved_data_confirm'));

                            case 14:
                                _context5.t1 = _context5.sent;
                                _context5.t0 = _context5.t1 !== 'cancel';

                            case 16:
                                if (!_context5.t0) {
                                    _context5.next = 23;
                                    break;
                                }

                                _context5.next = 19;
                                return this.query(Math.floor(index / pageSize) + 1);

                            case 19:
                                currentRecord = this.findInAllPage(index);

                                if (!currentRecord) {
                                    _context5.next = 23;
                                    break;
                                }

                                this.current = currentRecord;
                                return _context5.abrupt('return', currentRecord);

                            case 23:
                                return _context5.abrupt('return', Promise.reject('locate canceled'));

                            case 24:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function locate(_x7) {
                return _ref5.apply(this, arguments);
            }

            return locate;
        }()
        /**
         * 定位到第一条记录
         * @return Promise
         */

    }, {
        key: 'first',
        value: function first() {
            return this.locate(0);
        }
        /**
         * 定位到最后一条记录
         * @return Promise
         */

    }, {
        key: 'last',
        value: function last() {
            return this.locate((this.paging ? this.totalCount : this.length) - 1);
        }
        /**
         * 定位到当前记录的上一条记录
         * 若当前页中当前记录为第一条记录且有上一页，则会查询上一页并定位到上一页的最后一条记录
         * @return Promise
         */

    }, {
        key: 'pre',
        value: function pre() {
            return this.locate(this.currentIndex - 1);
        }
        /**
         * 定位到当前记录的下一条记录
         * 若当前页中当前记录为最后一条记录且有下一页，则会查询下一页并定位到下一页的第一条记录
         * @return Promise
         */

    }, {
        key: 'next',
        value: function next() {
            return this.locate(this.currentIndex + 1);
        }
        /**
         * 定位到首页
         * @return Promise
         */

    }, {
        key: 'firstPage',
        value: function firstPage() {
            return this.page(1);
        }
        /**
         * 定位到上一页
         * @return Promise
         */

    }, {
        key: 'prePage',
        value: function prePage() {
            return this.page(this.currentPage - 1);
        }
        /**
         * 定位到下一页
         * @return Promise
         */

    }, {
        key: 'nextPage',
        value: function nextPage() {
            return this.page(this.currentPage + 1);
        }
        /**
         * 定位到尾页
         * @return Promise
         */

    }, {
        key: 'lastPage',
        value: function lastPage() {
            return this.page(this.totalPage);
        }
        /**
         * 创建一条记录
         * @param data 数据对象
         * @param dataIndex 记录所在的索引
         * @return 新建的记录
         */

    }, {
        key: 'create',
        value: function create() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var dataIndex = arguments[1];

            if (data === null) {
                data = {};
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.fields.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref6 = _step.value;

                    var _ref7 = _slicedToArray(_ref6, 2);

                    var name = _ref7[0];
                    var field = _ref7[1];

                    var defaultValue = field.get('defaultValue');
                    var value = ObjectChainValue.get(data, name);
                    if (value === void 0 && defaultValue !== void 0) {
                        ObjectChainValue.set(data, name, toJS(defaultValue));
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var record = this.current = new Record(data, this);
            if (isNumber(dataIndex)) {
                this.splice(dataIndex, 0, record);
            } else {
                this.push(record);
            }
            this.fireEvent("create" /* create */, { dataSet: this, record: record });
            return record;
        }
        /**
         * 立即删除记录
         * @param records 记录或者记录数组，默认当前记录
         * @return Promise
         */

    }, {
        key: 'delete',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(records) {
                return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!records) {
                                    _context6.next = 11;
                                    break;
                                }

                                records = [].concat(records);
                                _context6.t0 = records.length > 0;

                                if (!_context6.t0) {
                                    _context6.next = 8;
                                    break;
                                }

                                _context6.next = 6;
                                return confirm($l('DataSet', 'delete_selected_row_confirm'));

                            case 6:
                                _context6.t1 = _context6.sent;
                                _context6.t0 = _context6.t1 !== 'cancel';

                            case 8:
                                if (!_context6.t0) {
                                    _context6.next = 11;
                                    break;
                                }

                                this.remove(records);
                                return _context6.abrupt('return', this.write(this.destroyed));

                            case 11:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function _delete(_x9) {
                return _ref8.apply(this, arguments);
            }

            return _delete;
        }()
        /**
         * 临时删除记录
         * @param records 记录或者记录数组
         */

    }, {
        key: 'remove',
        value: function remove(records) {
            var _this3 = this;

            if (records) {
                var current = this.current,
                    currentIndex = this.currentIndex;

                [].concat(records).forEach(function (record) {
                    var index = _this3.indexOf(record);
                    if (index !== -1) {
                        _this3.splice(index, 1);
                    }
                });
                if (!this.current) {
                    var record = this.get(currentIndex) || this.get(this.length - 1);
                    if (record) {
                        record.isCurrent = true;
                    }
                    if (current !== record) {
                        this.fireEvent("indexChange" /* indexChange */, { dataSet: this, record: record, previous: current });
                    }
                }
            }
        }
        /**
         * 临时删除所有记录
         */

    }, {
        key: 'removeAll',
        value: function removeAll() {
            var current = this.current,
                length = this.length;

            if (length) {
                this.forEach(this.deleteRecord, this);
                this.data = [];
                if (current) {
                    this.fireEvent("indexChange" /* indexChange */, { dataSet: this, previous: current });
                }
            }
        }
        /**
         * 删除所有记录
         */

    }, {
        key: 'deleteAll',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
                return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.t0 = this.length > 0;

                                if (!_context7.t0) {
                                    _context7.next = 6;
                                    break;
                                }

                                _context7.next = 4;
                                return confirm($l('DataSet', 'delete_all_row_confirm'));

                            case 4:
                                _context7.t1 = _context7.sent;
                                _context7.t0 = _context7.t1 !== 'cancel';

                            case 6:
                                if (!_context7.t0) {
                                    _context7.next = 9;
                                    break;
                                }

                                this.removeAll();
                                return _context7.abrupt('return', this.write(this.destroyed));

                            case 9:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function deleteAll() {
                return _ref9.apply(this, arguments);
            }

            return deleteAll;
        }()
        /**
         * 将若干数据记录插入记录堆栈顶部
         * @param records 数据集
         * @return 堆栈数量
         */

    }, {
        key: 'push',
        value: function push() {
            var _data;

            checkParentByInsert(this);

            for (var _len = arguments.length, records = Array(_len), _key = 0; _key < _len; _key++) {
                records[_key] = arguments[_key];
            }

            return (_data = this.data).push.apply(_data, _toConsumableArray(this.transferRecords(records)));
        }
        /**
         * 将若干数据记录插入记录堆栈底部
         * @param records 数据集
         * @return 堆栈数量
         */

    }, {
        key: 'unshift',
        value: function unshift() {
            var _data2;

            checkParentByInsert(this);

            for (var _len2 = arguments.length, records = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                records[_key2] = arguments[_key2];
            }

            return (_data2 = this.data).unshift.apply(_data2, _toConsumableArray(this.transferRecords(records)));
        }
        /**
         * 从记录堆栈顶部获取记录
         * @return 记录
         */

    }, {
        key: 'pop',
        value: function pop() {
            return this.deleteRecord(this.data.pop());
        }
        /**
         * 从记录堆栈底部获取记录
         * @return 记录
         */

    }, {
        key: 'shift',
        value: function shift() {
            return this.deleteRecord(this.data.shift());
        }
        /**
         * 删除指定索引的若干记录，并可插入若干新记录
         * @param from 索引开始的位置
         * @default 0
         * @param deleteCount 删除的数量
         * @default 0
         * @param records 插入的若干新记录
         * @return 被删除的记录集
         */

    }, {
        key: 'splice',
        value: function splice(from, deleteCount) {
            var _data3;

            for (var _len3 = arguments.length, records = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                records[_key3 - 2] = arguments[_key3];
            }

            if (records.length) {
                checkParentByInsert(this);
            }
            return (_data3 = this.data).splice.apply(_data3, [from, deleteCount].concat(_toConsumableArray(this.transferRecords(records)))).map(this.deleteRecord, this);
        }
        /**
         * 截取指定索引范围的记录集，不改变原记录堆栈
         * @param start 开始索引
         * @default 0
         * @param end 结束索引
         * @default 记录堆栈长度
         * @return 被删除的记录集
         */

    }, {
        key: 'slice',
        value: function slice() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;

            return this.data.slice(start, end);
        }
        /**
         * 获取记录所在的索引
         * @param record 记录
         * @param fromIndex 开始检索的索引
         * @return 索引
         */

    }, {
        key: 'indexOf',
        value: function indexOf(record, fromIndex) {
            return this.data.indexOf(record, fromIndex);
        }
        /**
         * 根据函数查找记录
         * @param fn 查询函数
         * @returns 记录
         */

    }, {
        key: 'find',
        value: function find(fn) {
            return this.data.find(fn);
        }
        /**
         * 根据函数查找记录所在的索引
         * @param fn 查询函数
         * @returns 索引
         */

    }, {
        key: 'findIndex',
        value: function findIndex(fn) {
            return this.data.findIndex(fn);
        }
        /**
         * 根据函数遍历
         * @param fn 遍历函数
         * @param thisArg this对象
         */

    }, {
        key: 'forEach',
        value: function forEach(fn, thisArg) {
            this.data.forEach(fn, thisArg);
        }
        /**
         * 根据函数遍历并输出新数组
         * @param fn 遍历函数
         * @param thisArg this对象
         * @returns 输出新数组
         */

    }, {
        key: 'map',
        value: function map(fn, thisArg) {
            return this.data.map(fn, thisArg);
        }
        /**
         * 根据函数遍历，当有返回值为true时，输出true
         * @param fn 遍历函数
         * @param thisArg this对象
         * @returns boolean
         */

    }, {
        key: 'some',
        value: function some(fn, thisArg) {
            return this.data.some(fn, thisArg);
        }
        /**
         * 根据函数遍历，当有返回值为false时，输出false
         * @param fn 遍历函数
         * @param thisArg this对象
         * @returns boolean
         */

    }, {
        key: 'every',
        value: function every(fn, thisArg) {
            return this.data.every(fn, thisArg);
        }
        /**
         * 根据函数过滤并返回记录集
         * @param fn 过滤函数
         * @param thisArg this对象
         * @returns {Record[]}
         */

    }, {
        key: 'filter',
        value: function filter(fn, thisArg) {
            return this.data.filter(fn, thisArg);
        }
        /**
         * 为数组中的所有元素调用指定的回调函数。 回调函数的返回值是累计结果，并在下次调用回调函数时作为参数提供。
         * @param fn 累计函数
         * @param initialValue 初始值
         * @returns {U}
         */

    }, {
        key: 'reduce',
        value: function reduce(fn, initialValue) {
            return this.data.reduce(fn, initialValue);
        }
        /**
         * 按降序调用数组中所有元素的指定回调函数。 回调函数的返回值是累计结果，并在下次调用回调函数时作为参数提供。
         * @param fn 累计函数
         * @param initialValue 初始值
         * @returns {U}
         */

    }, {
        key: 'reduceRight',
        value: function reduceRight(fn, initialValue) {
            return this.data.reduceRight(fn, initialValue);
        }
        /**
         * 反转记录的顺序。
         */

    }, {
        key: 'reverse',
        value: function reverse() {
            return this.data = this.data.reverse();
        }
        /**
         * 服务端排序
         * @param fieldName
         */

    }, {
        key: 'sort',
        value: function sort(fieldName) {
            var field = this.getField(fieldName);
            if (field) {
                var currents = getOrderFields(this.fields);
                currents.forEach(function (current) {
                    if (current !== field) {
                        current.order = void 0;
                    }
                });
                if (!field.order || field.order === "desc" /* desc */) {
                        field.order = "asc" /* asc */;
                    } else {
                    field.order = "desc" /* desc */;
                }
                if (this.paging && this.transport.read) {
                    this.query();
                } else {
                    this.data = this.data.sort(getFieldSorter(field));
                }
            }
        }
        /**
         * 选中记录
         * @param recordOrIndex 记录或记录索引
         */

    }, {
        key: 'select',
        value: function select(recordOrIndex) {
            var _this4 = this;

            var selection = this.selection;

            if (selection) {
                var record = recordOrIndex;
                if (isNumber(recordOrIndex)) {
                    record = this.get(recordOrIndex);
                }
                if (record && record.selectable && !record.isSelected) {
                    var previous = void 0;
                    runInAction(function () {
                        if (selection === "single" /* single */) {
                                _this4.selected.forEach(function (selected) {
                                    return selected.isSelected = false, previous = selected;
                                });
                            }
                        if (record) {
                            record.isSelected = true;
                        }
                    });
                    if (!this.inBatchSelection) {
                        this.fireEvent("select" /* select */, { dataSet: this, record: record, previous: previous });
                    }
                }
            }
        }
        /**
         * 取消选中记录
         * @param recordOrIndex 记录或记录索引
         */

    }, {
        key: 'unSelect',
        value: function unSelect(recordOrIndex) {
            if (this.selection) {
                var record = recordOrIndex;
                if (isNumber(recordOrIndex)) {
                    record = this.get(recordOrIndex);
                }
                if (record && record.selectable && record.isSelected) {
                    record.isSelected = false;
                    if (!this.inBatchSelection) {
                        var cachedIndex = this.cachedSelected.indexOf(record);
                        if (cachedIndex !== -1) {
                            this.cachedSelected.splice(cachedIndex, 1);
                        }
                        this.fireEvent("unSelect" /* unSelect */, { dataSet: this, record: record });
                    }
                }
            }
        }
        /**
         * 全选
         */

    }, {
        key: 'selectAll',
        value: function selectAll(filter) {
            var _this5 = this;

            var selection = this.selection;

            if (selection) {
                this.inBatchSelection = true;
                if (selection === "single" /* single */) {
                        if (!this.currentSelected.length) {
                            this.select(filter ? this.filter(filter)[0] : 0);
                        }
                    } else {
                    this.data.forEach(function (record) {
                        if (!filter || filter(record) !== false) {
                            _this5.select(record);
                        }
                    });
                }
                this.fireEvent("selectAll" /* selectAll */, { dataSet: this });
                this.inBatchSelection = false;
            }
        }
        /**
         * 取消全选
         */

    }, {
        key: 'unSelectAll',
        value: function unSelectAll() {
            var _this6 = this;

            if (this.selection) {
                this.inBatchSelection = true;
                this.currentSelected.forEach(function (record) {
                    _this6.unSelect(record);
                });
                this.fireEvent("unSelectAll" /* unSelectAll */, { dataSet: this });
                this.inBatchSelection = false;
            }
        }
    }, {
        key: 'clearCachedSelected',
        value: function clearCachedSelected() {
            this.cachedSelected = [];
        }
        /**
         * 获取指定索引的记录
         * @param index 索引
         * @returns {Record}
         */

    }, {
        key: 'get',
        value: function get(index) {
            return this.data.length ? this.data[index] : void 0;
        }
        /**
         * 判断是否有新增、变更或者删除的记录
         * @return true | false
         */

    }, {
        key: 'isModified',
        value: function isModified() {
            return this.destroyed.length !== 0 || this.data.some(function (record) {
                return record.status === "update" /* update */ || record.status === "add";
            } /* add */);
        }
        /**
         * 获取指定分页的记录集
         * @param page 如果page为空或者paging为server，则获取当前分页的记录集
         * @return 记录集
         */
        /**
         * 根据记录ID查找记录
         * @param id 记录ID
         * @return 记录
         */

    }, {
        key: 'findRecordById',
        value: function findRecordById(id) {
            return this.data.concat(this.destroyed).find(function (record) {
                return String(record.id) === String(id);
            });
        }
        /**
         * 校验数据记录是否有效
         * @param isSelected 是否只校验选中记录
         * @param noCascade 是否级联校验
         * @return true | false
         */

    }, {
        key: 'validate',
        value: function validate(isSelected, noCascade) {
            return Promise.all((isSelected ? this.selected : this.data).map(function (record) {
                return record.validate(noCascade);
            })).then(function (results) {
                return results.every(function (result) {
                    return result;
                });
            });
        }
        /**
         * 根据字段名获取字段
         * @param fieldName 字段名
         * @returns 字段
         */

    }, {
        key: 'getField',
        value: function getField(fieldName) {
            if (fieldName) {
                return this.fields.get(fieldName);
            }
        }
        /**
         * 获取分组字段名
         * @returns 字段名列表
         */

    }, {
        key: 'getGroups',
        value: function getGroups() {
            return Array.from(this.fields.entries()).reduce(function (arr, _ref10) {
                var _ref11 = _slicedToArray(_ref10, 2),
                    name = _ref11[0],
                    field = _ref11[1];

                var group = field.get('group');
                if (isNumber(group)) {
                    arr[group] = name;
                } else if (group === true && !arr[0]) {
                    arr[0] = name;
                }
                return arr;
            }, []).filter(function (group) {
                return group !== void 0;
            });
        }
    }, {
        key: 'initFields',
        value: function initFields(fields) {
            var _this7 = this;

            fields.forEach(function (field) {
                var name = field.name;

                if (name) {
                    _this7.addField(name, field);
                } else {
                    warning(false, 'DataSet create field failed. Please check if property name is exists on field.');
                }
            });
        }
        /*
         * 增加新字段
         * @param fieldName 字段名
         * @param props 字段属性
         * @return 新增字段
         */

    }, {
        key: 'addField',
        value: function addField(fieldName) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var field = new Field(props, this);
            this.fields.set(fieldName, field);
            return field;
        }
    }, {
        key: 'commitData',
        value: function commitData(allData, total) {
            var _this8 = this;

            if (allData.length) {
                allData.forEach(function (data) {
                    var record = _this8.findRecordById(data.__id);
                    if (record) {
                        record.commit(data, _this8);
                    }
                });
                if (isNumber(total)) {
                    this.totalCount = total;
                }
                this.originalData = this.data.slice();
            } else if (this.length || this.destroyed.length) {
                warning(false, 'The primary key which generated by database is not exists in each created records,\nbecause of no data `' + this.props.dataKey + '` from the response by `submit` or `delete` method.\nThen the query method will be auto invoke.');
                this.query();
            }
            return this;
        }
        /**
         * 数据集头行级联绑定
         * @param ds 头数据集
         * @param name 头数据集字段名
         */

    }, {
        key: 'bind',
        value: function bind(ds, name) {
            if (!name) {
                warning(false, 'DataSet: cascade binding need a name');
                return;
            }
            if (ds.children[name]) {
                warning(false, 'DataSet: duplicate cascade binding of name<' + name + '>');
                return;
            }
            ds.children[name] = this;
            this.parent = ds;
            var current = ds.current;

            if (current) {
                ds.syncChild(this, current, name);
            }
        }
        /**
         * 设置查询的参数.
         * @param {string} para 参数名.
         * @param {any} value 参数值.
         */

    }, {
        key: 'setQueryParameter',
        value: function setQueryParameter(para, value) {
            this.queryParameter[para] = value;
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this9 = this;

            var allData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var total = arguments[1];

            this.storeSelected();
            var paging = this.paging,
                pageSize = this.pageSize,
                autoLocateFirst = this.props.autoLocateFirst;

            allData = paging ? allData.slice(0, pageSize) : allData;
            this.fireEvent("beforeLoad" /* beforeLoad */, { dataSet: this, data: allData });
            this.data = this.originalData = allData.map(function (data) {
                var record = new Record(data, _this9);
                record.status = "sync" /* sync */;
                return record;
            });
            this.destroyed = [];
            if (total !== void 0 && paging === true) {
                this.totalCount = total;
            } else {
                this.totalCount = allData.length;
            }
            this.releaseCachedSelected();
            var nextRecord = autoLocateFirst && this.get(0);
            if (nextRecord) {
                nextRecord.isCurrent = true;
            }
            this.fireEvent("indexChange" /* indexChange */, { dataSet: this, record: nextRecord });
            this.fireEvent("load" /* load */, { dataSet: this });
            return this;
        }
    }, {
        key: 'deleteRecord',
        value: function deleteRecord(record) {
            if (record) {
                record.isSelected = false;
                record.isCurrent = false;
                var selected = this.selected,
                    destroyed = this.destroyed;

                var index = selected.indexOf(record);
                if (index !== -1) {
                    selected.splice(index, 1);
                }
                if (record.status !== "add" /* add */ && record.status !== "delete" /* delete */) {
                        record.status = "delete" /* delete */;
                        destroyed.push(record);
                    }
            }
            return record;
        }
    }, {
        key: 'findInAllPage',
        value: function findInAllPage(index) {
            var paging = this.paging;

            if (paging === true) {
                index = this.getIndexInCurrentPage(index);
            }
            return this.data[index];
        }
    }, {
        key: 'getIndexInCurrentPage',
        value: function getIndexInCurrentPage() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentIndex;
            var currentPage = this.currentPage,
                pageSize = this.pageSize;

            return index - (currentPage - 1) * pageSize;
        }
    }, {
        key: 'transferRecords',
        value: function transferRecords(records) {
            var _this10 = this;

            return records.map(function (record) {
                var _record = record,
                    dataSet = _record.dataSet;

                if (dataSet === _this10) {
                    var data = _this10.data;

                    var index = data.indexOf(record);
                    if (index !== -1) {
                        data.splice(index, 1);
                    }
                    return record;
                } else {
                    if (dataSet) {
                        dataSet.remove(record);
                        record = new Record(record.data, _this10);
                    }
                    record.dataSet = _this10;
                    record.status = "add" /* add */;
                    return record;
                }
            });
        }
    }, {
        key: 'initChildren',
        value: function initChildren(children) {
            var _this11 = this;

            if (isArray(children)) {
                children.forEach(function (childDs) {
                    if (childDs instanceof DataSet) {
                        var name = childDs.name;

                        if (name) {
                            childDs.bind(_this11, name);
                        } else {
                            warning(false, 'cascade DataSet need a name');
                        }
                    }
                });
            } else {
                Object.keys(children).forEach(function (childName) {
                    var child = children[childName];
                    if (child instanceof DataSet) {
                        child.bind(_this11, childName);
                    } else {
                        warning(false, 'cascade child<' + childName + '> must be instance of DataSet.');
                    }
                });
            }
        }
    }, {
        key: 'initQueryDataSet',
        value: function initQueryDataSet(queryDataSet, queryFields) {
            if (queryFields) {
                queryDataSet = new DataSet({
                    fields: queryFields
                });
            }
            if (queryDataSet) {
                this.queryDataSet = queryDataSet;
            }
        }
    }, {
        key: 'initEvents',
        value: function initEvents(events) {
            var _this12 = this;

            Object.keys(events).forEach(function (event) {
                return _this12.addEventListener(event, events[event]);
            });
        }
    }, {
        key: 'loadDataFromResponse',
        value: function loadDataFromResponse(resp) {
            if (resp) {
                var _props2 = this.props,
                    dataKey = _props2.dataKey,
                    totalKey = _props2.totalKey;

                var data = generateResponseData(resp, dataKey);
                var total = resp[totalKey];
                this.loadData(data, total);
            }
            return this;
        }
        // private groupData(allData: object[]): object[] {
        //   return this.getGroups().reverse()
        //     .reduce((arr, name) => arr.sort(
        //       (item1, item2) => String(item1[name]).localeCompare(String(item2[name])),
        //     ), allData);
        // }

    }, {
        key: 'write',
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(records, noCascade) {
                var _this13 = this;

                var _prepareSubmitData, _prepareSubmitData2, created, updated, destroyed, cascade, transport, axiosConfigs, submitData, submitEventResult, result;

                return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (!records.length) {
                                    _context8.next = 28;
                                    break;
                                }

                                _prepareSubmitData = prepareSubmitData(records, noCascade), _prepareSubmitData2 = _slicedToArray(_prepareSubmitData, 4), created = _prepareSubmitData2[0], updated = _prepareSubmitData2[1], destroyed = _prepareSubmitData2[2], cascade = _prepareSubmitData2[3];
                                transport = this.transport;
                                axiosConfigs = [];
                                submitData = [].concat(_toConsumableArray(prepareForSubmit('create', created, transport, axiosConfigs, this)), _toConsumableArray(prepareForSubmit('update', updated, transport, axiosConfigs, this)), _toConsumableArray(prepareForSubmit('destroy', destroyed, transport, axiosConfigs, this)), _toConsumableArray(cascade));

                                prepareForSubmit('submit', submitData, transport, axiosConfigs, this);

                                if (!axiosConfigs.length) {
                                    _context8.next = 28;
                                    break;
                                }

                                _context8.prev = 7;

                                this.changeSubmitStatus("submitting" /* submitting */);
                                _context8.next = 11;
                                return this.fireEvent("submit" /* submit */, {
                                    dataSet: this,
                                    data: [].concat(_toConsumableArray(created), _toConsumableArray(updated), _toConsumableArray(destroyed), _toConsumableArray(cascade))
                                });

                            case 11:
                                submitEventResult = _context8.sent;

                                if (!submitEventResult) {
                                    _context8.next = 18;
                                    break;
                                }

                                this.pending = axiosStatic.all(axiosConfigs.map(function (config) {
                                    return _this13.axios(config);
                                }));
                                _context8.next = 16;
                                return this.pending;

                            case 16:
                                result = _context8.sent;
                                return _context8.abrupt('return', this.handleSubmitSuccess(result));

                            case 18:
                                _context8.next = 24;
                                break;

                            case 20:
                                _context8.prev = 20;
                                _context8.t0 = _context8['catch'](7);

                                this.handleSubmitFail(_context8.t0);
                                throw _context8.t0;

                            case 24:
                                _context8.prev = 24;

                                this.changeSubmitStatus("ready" /* ready */);
                                this.pending = void 0;
                                return _context8.finish(24);

                            case 28:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[7, 20, 24, 28]]);
            }));

            function write(_x15, _x16) {
                return _ref12.apply(this, arguments);
            }

            return write;
        }()
    }, {
        key: 'read',
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
                var _this14 = this;

                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

                var _transport, _transport$read, _read, adapter, data, newConfig, adapterConfig, queryEventResult, result;

                return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                if (!this.checkReadable(this.parent)) {
                                    _context9.next = 28;
                                    break;
                                }

                                _context9.prev = 1;
                                _transport = this.transport, _transport$read = _transport.read, _read = _transport$read === undefined ? {} : _transport$read, adapter = _transport.adapter;

                                this.changeStatus("loading" /* loading */);
                                _context9.next = 6;
                                return this.generateQueryParameter();

                            case 6:
                                data = _context9.sent;
                                newConfig = axiosAdapter(_read, this, data, this.generateQueryString(page));
                                adapterConfig = adapter(newConfig, 'read') || newConfig;

                                if (!adapterConfig.url) {
                                    _context9.next = 19;
                                    break;
                                }

                                _context9.next = 12;
                                return this.fireEvent("query" /* query */, {
                                    dataSet: this, params: adapterConfig.params, data: adapterConfig.data
                                });

                            case 12:
                                queryEventResult = _context9.sent;

                                if (!queryEventResult) {
                                    _context9.next = 19;
                                    break;
                                }

                                _context9.next = 16;
                                return this.axios(adapterConfig);

                            case 16:
                                result = _context9.sent;

                                runInAction(function () {
                                    _this14.currentPage = page;
                                });
                                return _context9.abrupt('return', result);

                            case 19:
                                _context9.next = 25;
                                break;

                            case 21:
                                _context9.prev = 21;
                                _context9.t0 = _context9['catch'](1);

                                this.handleLoadFail(_context9.t0);
                                throw _context9.t0;

                            case 25:
                                _context9.prev = 25;

                                this.changeStatus("ready" /* ready */);
                                return _context9.finish(25);

                            case 28:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[1, 21, 25, 28]]);
            }));

            function read() {
                return _ref13.apply(this, arguments);
            }

            return read;
        }()
    }, {
        key: 'storeSelected',
        value: function storeSelected() {
            if (this.cacheSelectionKeys) {
                this.cachedSelected = [].concat(_toConsumableArray(this.cachedSelected.filter(function (record) {
                    return record.isSelected;
                })), _toConsumableArray(this.currentSelected.map(function (record) {
                    return record.isCurrent = false, record.isCached = true, record;
                })));
            }
        }
    }, {
        key: 'releaseCachedSelected',
        value: function releaseCachedSelected() {
            var cacheSelectionKeys = this.cacheSelectionKeys,
                cachedSelected = this.cachedSelected;

            if (cacheSelectionKeys) {
                this.data.forEach(function (record) {
                    var index = cachedSelected.findIndex(function (cached) {
                        return cacheSelectionKeys.every(function (key) {
                            return record.get(key) === cached.get(key);
                        });
                    });
                    if (index !== -1) {
                        record.isSelected = true;
                        cachedSelected.splice(index, 1);
                    }
                });
            }
        }
    }, {
        key: 'changeStatus',
        value: function changeStatus(status) {
            this.status = status;
        }
    }, {
        key: 'changeSubmitStatus',
        value: function changeSubmitStatus(status) {
            this.status = status;
            Object.values(this.children).forEach(function (ds) {
                if (ds instanceof DataSet) {
                    ds.changeSubmitStatus(status);
                }
            });
        }
    }, {
        key: 'handleCascade',
        value: function handleCascade(_ref14) {
            var dataSet = _ref14.dataSet,
                record = _ref14.record,
                previous = _ref14.previous;

            if (dataSet.hasChildren) {
                dataSet.syncChildren(record, previous);
            }
        }
    }, {
        key: 'handleLoadFail',
        value: function handleLoadFail(e) {
            this.fireEvent("loadFailed" /* loadFailed */, { dataSet: this });
            Message.error(exception(e, $l('DataSet', 'query_failure')));
        }
    }, {
        key: 'handleSubmitSuccess',
        value: function handleSubmitSuccess(resp) {
            var _ref15;

            var _props3 = this.props,
                dataKey = _props3.dataKey,
                totalKey = _props3.totalKey;

            var data = [];
            var total = void 0;
            resp.forEach(function (item) {
                data.push.apply(data, _toConsumableArray(generateResponseData(item, dataKey)));
                if (totalKey && isObject(item) && totalKey in item) {
                    total = item[totalKey];
                }
            });
            var result = dataKey ? (_ref15 = {}, _defineProperty(_ref15, dataKey, data), _defineProperty(_ref15, totalKey, total), _defineProperty(_ref15, 'success', true), _ref15) : data;
            this.fireEvent("submitSuccess" /* submitSuccess */, { dataSet: this, data: result });
            this.commitData(data, total);
            Message.success($l('DataSet', 'submit_success'));
            return result;
        }
    }, {
        key: 'handleSubmitFail',
        value: function handleSubmitFail(e) {
            this.fireEvent("submitFailed" /* submitFailed */, { dataSet: this });
            Message.error(exception(e, $l('DataSet', 'submit_failure')));
        }
    }, {
        key: 'syncChildren',
        value: function syncChildren(current, previous) {
            var _this15 = this;

            var children = this.children;

            var keys = Object.keys(children);
            var remoteKeys = [];
            keys.forEach(function (childName) {
                var ds = children[childName];
                if (previous && ds.status === "ready" /* ready */ && previous.dataSetSnapshot[childName]) {
                    previous.dataSetSnapshot[childName] = ds.snapshot();
                }
                if (current) {
                    var snapshot = current.dataSetSnapshot[childName];
                    if (snapshot instanceof DataSetSnapshot) {
                        ds.restore(snapshot);
                    } else {
                        if (!_this15.syncChild(ds, current, childName, true)) {
                            ds.loadData([]);
                            remoteKeys.push(childName);
                        }
                    }
                } else {
                    ds.loadData([]);
                }
            });
            if (current && remoteKeys.length) {
                this.syncChildrenRemote(remoteKeys, current);
            }
        }
    }, {
        key: 'syncChild',
        value: function syncChild(ds, currentRecord, childName, onlyClient) {
            var _this16 = this;

            var childRecords = currentRecord.get(childName);
            if (currentRecord.status === "add" /* add */ || isArrayLike(childRecords)) {
                ds.clearCachedSelected();
                ds.loadData(childRecords ? childRecords.slice() : []);
                if (currentRecord.status === "add" /* add */) {
                        ds.forEach(function (record) {
                            return record.status = "add";
                        } /* add */);
                    }
                currentRecord.dataSetSnapshot[childName] = ds.snapshot();
                return true;
            } else if (!onlyClient) {
                var oldSnapshot = ds.snapshot();
                ds.read(1).then(function (resp) {
                    var current = _this16.current;

                    if (current !== currentRecord) {
                        ds = new DataSet().restore(oldSnapshot);
                    }
                    ds.clearCachedSelected();
                    currentRecord.dataSetSnapshot[childName] = ds.loadDataFromResponse(resp).snapshot();
                });
            }
            return false;
        }
    }, {
        key: 'checkReadable',
        value: function checkReadable(parent) {
            if (parent) {
                var current = parent.current;

                if (!current || current.status === "add" /* add */) {
                        return false;
                    }
            }
            return true;
        }
    }, {
        key: 'generatePageQueryString',
        value: function generatePageQueryString(page) {
            var paging = this.paging,
                pageSize = this.pageSize;

            if (paging === true) {
                return { page: page, pagesize: pageSize };
            }
            return {};
        }
    }, {
        key: 'generateOrderQueryString',
        value: function generateOrderQueryString() {
            var fields = this.fields;

            var orderField = getOrderFields(fields)[0];
            if (orderField) {
                var param = { sortname: orderField.name, sortorder: orderField.order };
                if (orderField.type === "object" /* object */) {
                        var bindField = findBindFieldBy(orderField, this.fields, 'valueField');
                        if (bindField) {
                            param.sortname = bindField.name;
                        }
                    }
                return param;
            }
            return {};
        }
    }, {
        key: 'generateQueryString',
        value: function generateQueryString(page) {
            var order = this.generateOrderQueryString();
            var pageQuery = this.generatePageQueryString(page);
            var generatePageQuery = getConfig('generatePageQuery');
            if (typeof generatePageQuery === 'function') {
                return generatePageQuery({ sortName: order.sortname, sortOrder: order.sortorder, pageSize: pageQuery.pagesize, page: pageQuery.page });
            }
            return _extends({}, pageQuery, order);
        }
    }, {
        key: 'generateQueryParameter',
        value: function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10() {
                var parent, queryDataSet, parentParam, primaryKey, current, data, _current;

                return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                parent = this.parent, queryDataSet = this.queryDataSet;
                                parentParam = {};

                                if (parent) {
                                    primaryKey = parent.props.primaryKey, current = parent.current;

                                    if (current) {
                                        if (primaryKey) {
                                            parentParam[primaryKey] = current.get(primaryKey);
                                        } else {
                                            parentParam = current.toData();
                                        }
                                    }
                                }

                                if (!queryDataSet) {
                                    _context10.next = 10;
                                    break;
                                }

                                _context10.next = 6;
                                return queryDataSet.ready();

                            case 6:
                                _context10.next = 8;
                                return queryDataSet.validate();

                            case 8:
                                if (_context10.sent) {
                                    _context10.next = 10;
                                    break;
                                }

                                throw new Error($l('DataSet', 'invalid_query_dataset'));

                            case 10:
                                data = {};

                                this.isFilteredByQueryFields = false;
                                if (queryDataSet) {
                                    _current = queryDataSet.current;

                                    if (_current) {
                                        data = _current.toJSONData();
                                        this.isFilteredByQueryFields = data.__dirty;
                                        delete data.__dirty;
                                        delete data.__id;
                                        delete data.__status;
                                    }
                                }
                                data = _extends({}, data, this.queryParameter, parentParam);
                                return _context10.abrupt('return', Object.keys(data).reduce(function (p, key) {
                                    var value = data[key];
                                    if (!isEmpty(value)) {
                                        p[key] = value;
                                    }
                                    return p;
                                }, {}));

                            case 15:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function generateQueryParameter() {
                return _ref16.apply(this, arguments);
            }

            return generateQueryParameter;
        }()
    }, {
        key: 'axios',
        get: function get() {
            return this.props.axios || getConfig('axios') || axios;
        }
    }, {
        key: 'lang',
        get: function get() {
            return _get(this.props, 'lang');
        },
        set: function set(lang) {
            var _this17 = this;

            runInAction(function () {
                _set(_this17.props, 'lang', lang);
            });
        }
    }, {
        key: 'queryDataSet',
        get: function get() {
            return _get(this.props, 'queryDataSet');
        }
        /**
         * 设置查询的DataSet.
         * @param {DataSet} ds DataSet.
         */
        ,
        set: function set(ds) {
            var _this18 = this;

            runInAction(function () {
                _set(_this18.props, 'queryDataSet', ds);
                if (ds) {
                    defer(function () {
                        if (ds.length === 0) {
                            ds.create();
                        } else if (!ds.current) {
                            ds.currentIndex = 0;
                        }
                    });
                }
            });
        }
    }, {
        key: 'queryUrl',
        get: function get() {
            return _get(this.props, 'queryUrl') || this.name && '/dataset/' + this.name + '/queries';
        }
        /**
         * 设置提交的Url.
         * @param {String} url 提交的Url.
         */
        ,
        set: function set(url) {
            var _this19 = this;

            runInAction(function () {
                _set(_this19.props, 'queryUrl', url);
            });
        }
    }, {
        key: 'submitUrl',
        get: function get() {
            return _get(this.props, 'submitUrl') || this.name && '/dataset/' + this.name + '/mutations';
        }
        /**
         * 设置查询的Url.
         * @param {String} url 查询的Url.
         */
        ,
        set: function set(url) {
            var _this20 = this;

            runInAction(function () {
                _set(_this20.props, 'submitUrl', url);
            });
        }
    }, {
        key: 'tlsUrl',
        get: function get() {
            return _get(this.props, 'tlsUrl') || this.name && '/dataset/' + this.name + '/languages';
        }
        /**
         * 设置多语言的Url.
         * @param {String} url 多语言的Url.
         */
        ,
        set: function set(url) {
            var _this21 = this;

            runInAction(function () {
                _set(_this21.props, 'tlsUrl', url);
            });
        }
    }, {
        key: 'validateUrl',
        get: function get() {
            return _get(this.props, 'validateUrl') || this.name && '/dataset/' + this.name + '/validate';
        }
        /**
         * 设置远程校验查询请求的url.
         * @param {String} url 远程校验查询请求的url.
         */
        ,
        set: function set(url) {
            var _this22 = this;

            runInAction(function () {
                _set(_this22.props, 'validateUrl', url);
            });
        }
    }, {
        key: 'exportUrl',
        get: function get() {
            return _get(this.props, 'exportUrl') || this.name && '/dataset/' + this.name + '/export';
        }
        /**
         * 设置导出请求的url.
         * @param {String} url 远程校验查询请求的url.
         */
        ,
        set: function set(url) {
            var _this23 = this;

            runInAction(function () {
                _set(_this23.props, 'exportUrl', url);
            });
        }
    }, {
        key: 'transport',
        set: function set(transport) {
            var _this24 = this;

            runInAction(function () {
                _this24.props.transport = transport instanceof Transport ? transport.props : transport;
            });
        },
        get: function get() {
            return new Transport(this.props.transport, this);
        }
        /**
         * 获取新建的记录集
         * @return 记录集
         */

    }, {
        key: 'created',
        get: function get() {
            return this.data.filter(function (record) {
                return record.status === "add";
            } /* add */);
        }
        /**
         * 获取变更的记录集
         * @return 记录集
         */

    }, {
        key: 'updated',
        get: function get() {
            return this.data.filter(function (record) {
                return record.status === "update";
            } /* update */);
        }
        /**
         * 获取选中的记录集
         * @return 记录集
         */

    }, {
        key: 'selected',
        get: function get() {
            return this.currentSelected.concat(this.cachedSelected.filter(function (record) {
                return record.isSelected;
            }));
        }
    }, {
        key: 'currentSelected',
        get: function get() {
            return this.data.filter(function (record) {
                return record.isSelected;
            });
        }
    }, {
        key: 'totalPage',
        get: function get() {
            return this.paging ? Math.ceil(this.totalCount / this.pageSize) : 1;
        }
    }, {
        key: 'currentIndex',
        get: function get() {
            var current = this.current,
                pageSize = this.pageSize,
                currentPage = this.currentPage;

            if (current) {
                var index = this.indexOf(current);
                if (index !== -1) {
                    return index + (currentPage - 1) * pageSize;
                }
            }
            return -1;
        },
        set: function set(index) {
            this.locate(index);
        }
        /**
         * 记录数
         */

    }, {
        key: 'length',
        get: function get() {
            return this.data.length;
        }
    }, {
        key: 'hasChildren',
        get: function get() {
            return Object.keys(this.children).length > 0;
        }
    }, {
        key: 'treeData',
        get: function get() {
            // const { data } = this;
            // const { idField, parentField } = this.props;
            // if (idField !== void 0 && parentField !== void 0) {
            //   const array: Record[] = [];
            //   const map1: { [key: string]: Record } = {};
            //   const map2: { [key: string]: Record } = {};
            //   data.forEach((record) => {
            //     const id = record.get(idField) || record.id;
            //     map1[id] = map2[id] = record;
            //   });
            //   runInAction(() => {
            //     for (const key of Object.keys(map2)) {
            //       const record = map2[key];
            //       const parent = map2[record.get(parentField)];
            //       if (parent) {
            //         record.parent = parent;
            //         if (!parent.children) {
            //           parent.children = [record];
            //         } else if (!~parent.children.indexOf(record)) {
            //           parent.children.push(record);
            //         }
            //         delete map1[key];
            //       }
            //     }
            //   });
            //   for (const key of Object.keys(map1)) {
            //     array.push(map2[key]);
            //   }
            //   const orderField = getOrderFields(this.fields)[0];
            //   if (orderField) {
            //     sortTree(array, orderField);
            //   }
            //   return array;
            // } else {
            //   return data;
            // }
            return sortTree(this.filter(function (record) {
                return !record.parent;
            }), getOrderFields(this.fields)[0]);
        }
    }, {
        key: 'paging',
        get: function get() {
            var _props4 = this.props,
                idField = _props4.idField,
                parentField = _props4.parentField,
                paging = _props4.paging;

            return (parentField === void 0 || idField === void 0) && paging;
        },
        set: function set(paging) {
            var _this25 = this;

            runInAction(function () {
                _this25.props.paging = paging;
            });
        }
        /**
         * 获取当前索引的记录
         * @return record 记录
         */

    }, {
        key: 'current',
        get: function get() {
            return this.data.find(function (record) {
                return record.isCurrent;
            }) || this.cachedSelected.find(function (record) {
                return record.isCurrent;
            });
        }
        /**
         * 将记录设定为当前索引
         * @param record 记录
         */
        ,
        set: function set(record) {
            var _this26 = this;

            var currentRecord = this.current;
            if (currentRecord !== record && (!record || !record.isCached)) {
                runInAction(function () {
                    if (currentRecord) {
                        currentRecord.isCurrent = false;
                    }
                    if (record && record.dataSet === _this26) {
                        record.isCurrent = true;
                    }
                    _this26.fireEvent("indexChange" /* indexChange */, { dataSet: _this26, record: record, previous: currentRecord });
                });
            }
        }
    }, {
        key: 'uniqueKeys',
        get: function get() {
            var primaryKey = this.props.primaryKey;

            if (primaryKey) {
                return [primaryKey];
            } else {
                var keys = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.fields.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _ref17 = _step2.value;

                        var _ref18 = _slicedToArray(_ref17, 2);

                        var key = _ref18[0];
                        var field = _ref18[1];

                        if (field.get('unique')) {
                            keys.push(key);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                if (keys.length) {
                    return keys;
                }
            }
        }
    }, {
        key: 'cacheSelectionKeys',
        get: function get() {
            var _props5 = this.props,
                cacheSelection = _props5.cacheSelection,
                selection = _props5.selection;

            if (cacheSelection && selection === "multiple" /* multiple */) {
                    return this.uniqueKeys;
                }
        }
        /**
         * 获取所有记录包括缓存的选择记录
         * @param index 索引
         * @returns {Record}
         */

    }, {
        key: 'all',
        get: function get() {
            return this.data.concat(this.cachedSelected.slice()).concat(this.destroyed.slice());
        }
    }]);

    return DataSet;
}(EventManager);

export default DataSet;

DataSet.defaultProps = {
    autoCreate: false,
    autoQuery: false,
    autoLocateFirst: true,
    selection: "multiple" /* multiple */
    , modifiedCheck: true,
    pageSize: 10,
    paging: true
};
tslib_1.__decorate([observable], DataSet.prototype, "name", void 0);
tslib_1.__decorate([computed], DataSet.prototype, "axios", null);
tslib_1.__decorate([observable], DataSet.prototype, "fields", void 0);
tslib_1.__decorate([computed], DataSet.prototype, "lang", null);
tslib_1.__decorate([computed], DataSet.prototype, "queryUrl", null);
tslib_1.__decorate([computed], DataSet.prototype, "submitUrl", null);
tslib_1.__decorate([computed], DataSet.prototype, "tlsUrl", null);
tslib_1.__decorate([computed], DataSet.prototype, "validateUrl", null);
tslib_1.__decorate([computed], DataSet.prototype, "exportUrl", null);
tslib_1.__decorate([computed], DataSet.prototype, "transport", null);
tslib_1.__decorate([observable], DataSet.prototype, "props", void 0);
tslib_1.__decorate([observable], DataSet.prototype, "data", void 0);
tslib_1.__decorate([observable], DataSet.prototype, "pageSize", void 0);
tslib_1.__decorate([observable], DataSet.prototype, "totalCount", void 0);
tslib_1.__decorate([observable], DataSet.prototype, "status", void 0);
tslib_1.__decorate([observable], DataSet.prototype, "currentPage", void 0);
tslib_1.__decorate([observable], DataSet.prototype, "selection", void 0);
tslib_1.__decorate([observable], DataSet.prototype, "destroyed", void 0);
tslib_1.__decorate([observable], DataSet.prototype, "cachedSelected", void 0);
tslib_1.__decorate([computed], DataSet.prototype, "created", null);
tslib_1.__decorate([computed], DataSet.prototype, "updated", null);
tslib_1.__decorate([computed], DataSet.prototype, "selected", null);
tslib_1.__decorate([computed], DataSet.prototype, "currentSelected", null);
tslib_1.__decorate([computed], DataSet.prototype, "totalPage", null);
tslib_1.__decorate([computed], DataSet.prototype, "currentIndex", null);
tslib_1.__decorate([computed], DataSet.prototype, "length", null);
tslib_1.__decorate([computed], DataSet.prototype, "treeData", null);
tslib_1.__decorate([computed], DataSet.prototype, "paging", null);
tslib_1.__decorate([computed], DataSet.prototype, "current", null);
tslib_1.__decorate([computed], DataSet.prototype, "uniqueKeys", null);
tslib_1.__decorate([computed], DataSet.prototype, "cacheSelectionKeys", null);
tslib_1.__decorate([computed], DataSet.prototype, "all", null);
tslib_1.__decorate([action], DataSet.prototype, "restore", null);
tslib_1.__decorate([action], DataSet.prototype, "reset", null);
tslib_1.__decorate([action], DataSet.prototype, "remove", null);
tslib_1.__decorate([action], DataSet.prototype, "removeAll", null);
tslib_1.__decorate([action], DataSet.prototype, "deleteAll", null);
tslib_1.__decorate([action], DataSet.prototype, "push", null);
tslib_1.__decorate([action], DataSet.prototype, "unshift", null);
tslib_1.__decorate([action], DataSet.prototype, "pop", null);
tslib_1.__decorate([action], DataSet.prototype, "shift", null);
tslib_1.__decorate([action], DataSet.prototype, "splice", null);
tslib_1.__decorate([action], DataSet.prototype, "reverse", null);
tslib_1.__decorate([action], DataSet.prototype, "sort", null);
tslib_1.__decorate([action], DataSet.prototype, "select", null);
tslib_1.__decorate([action], DataSet.prototype, "unSelect", null);
tslib_1.__decorate([action], DataSet.prototype, "selectAll", null);
tslib_1.__decorate([action], DataSet.prototype, "unSelectAll", null);
tslib_1.__decorate([action], DataSet.prototype, "clearCachedSelected", null);
tslib_1.__decorate([action], DataSet.prototype, "addField", null);
tslib_1.__decorate([action], DataSet.prototype, "commitData", null);
tslib_1.__decorate([action], DataSet.prototype, "loadData", null);
tslib_1.__decorate([action], DataSet.prototype, "storeSelected", null);
tslib_1.__decorate([action], DataSet.prototype, "releaseCachedSelected", null);
tslib_1.__decorate([action], DataSet.prototype, "changeStatus", null);
tslib_1.__decorate([action], DataSet.prototype, "changeSubmitStatus", null);
tslib_1.__decorate([action], DataSet.prototype, "syncChild", null);