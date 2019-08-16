'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.filterBindField = filterBindField;

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _DataSet = require('../data-set/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _enum = require('./enum');

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _utils = require('./utils');

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _Form = require('../form/Form');

var _Form2 = _interopRequireDefault(_Form);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _localeContext = require('../locale-context');

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

var _utils2 = require('../data-set/utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * 去除级联字段
 *
 * @export
 * @param {Fields} fields 待筛选的字段数组
 * @returns {{ [key: string]: Field }} 不含级联字段的字段数组
 */
function filterBindField(fields) {
    return Array.from(fields.entries()).reduce(function (newFields, _ref) {
        var _ref2 = (0, _slicedToArray3['default'])(_ref, 2),
            key = _ref2[0],
            field = _ref2[1];

        if (!field.get('bind')) {
            newFields[key] = field;
        }
        return newFields;
    }, {});
}
var TableToolBar = function (_Component) {
    (0, _inherits3['default'])(TableToolBar, _Component);

    function TableToolBar() {
        var _this2 = this;

        (0, _classCallCheck3['default'])(this, TableToolBar);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableToolBar.__proto__ || Object.getPrototypeOf(TableToolBar)).apply(this, arguments));

        _this.handleFieldEnter = function () {
            _this.handleQuery();
            if (_this.modal) {
                _this.modal.close();
            }
        };
        _this.handleButtonCreate = function () {
            var dataSet = _this.context.tableStore.dataSet;

            dataSet.create({}, 0);
        };
        _this.handleButtonSubmit = function () {
            return _this.context.tableStore.dataSet.submit();
        };
        _this.handleButtonDelete = function () {
            var dataSet = _this.context.tableStore.dataSet;

            dataSet['delete'](dataSet.selected);
        };
        _this.handleButtonRemove = function () {
            var dataSet = _this.context.tableStore.dataSet;

            dataSet.remove(dataSet.selected);
        };
        _this.handleButtonReset = function () {
            return _this.context.tableStore.dataSet.reset();
        };
        _this.handleQueryReset = function () {
            var current = _this.context.tableStore.dataSet.queryDataSet.current;

            if (current) {
                current.reset();
            }
            _this.handleQuery();
        };
        _this.handleExpandAll = function () {
            return _this.context.tableStore.expandAll();
        };
        _this.handleCollapseAll = function () {
            return _this.context.tableStore.collapseAll();
        };
        _this.handleButtonExport = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
            var columnHeaders;
            return _regenerator2['default'].wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _this.context.tableStore.getColumnHeaders();

                        case 2:
                            columnHeaders = _context.sent;

                            _this.exportDataSet = new _DataSet2['default']({ data: columnHeaders, paging: false });
                            _this.exportDataSet.selectAll();
                            _this.exportModal = _modal2['default'].open({
                                title: (0, _localeContext.$l)('Table', 'choose_export_columns'),
                                children: _react2['default'].createElement(
                                    _Table2['default'],
                                    { dataSet: _this.exportDataSet, style: { height: (0, _UnitConvertor.pxToRem)(300) } },
                                    _react2['default'].createElement(_Column2['default'], { header: (0, _localeContext.$l)('Table', 'column_name'), name: 'label', resizable: false })
                                ),
                                okText: (0, _localeContext.$l)('Table', 'export_button'),
                                onOk: _this.handleExport,
                                style: {
                                    width: (0, _UnitConvertor.pxToRem)(400)
                                }
                            });

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        _this.handleQuery = function () {
            _this.context.tableStore.dataSet.query();
        };
        _this.handleExport = function () {
            var selected = _this.exportDataSet.selected;

            if (selected.length) {
                var dataSet = _this.context.tableStore.dataSet;

                dataSet['export'](selected.reduce(function (columns, record) {
                    var myName = record.get('name');
                    var myField = dataSet.getField(myName);
                    if (myField && myField.type === "object" /* object */) {
                            var bindField = (0, _utils2.findBindFieldBy)(myField, dataSet.fields, 'textField');
                            if (bindField) {
                                myName = bindField.name;
                            }
                        }
                    columns[myName] = record.get('label');
                    return columns;
                }, {}));
            } else {
                return false;
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(TableToolBar, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.modal) {
                this.modal.close(true);
            }
            if (this.exportModal) {
                this.exportModal.close(true);
            }
        }
    }, {
        key: 'getButtonProps',
        value: function getButtonProps(type) {
            var tableStore = this.context.tableStore;
            var dataSet = tableStore.dataSet,
                isTree = tableStore.isTree;

            var disabled = dataSet.parent ? !dataSet.parent.current : false;
            var submitting = dataSet.status === "submitting" /* submitting */;
            var canRemove = !submitting && dataSet.selected.length > 0;
            switch (type) {
                case _enum.TableButtonType.add:
                    return { icon: 'playlist_add', onClick: this.handleButtonCreate, children: (0, _localeContext.$l)('Table', 'create_button'), disabled: disabled };
                case _enum.TableButtonType.save:
                    return {
                        icon: 'save',
                        onClick: this.handleButtonSubmit,
                        children: (0, _localeContext.$l)('Table', 'save_button'),
                        type: "submit" /* submit */, disabled: submitting
                    };
                case _enum.TableButtonType['delete']:
                    return {
                        icon: 'delete',
                        onClick: this.handleButtonDelete,
                        children: (0, _localeContext.$l)('Table', 'delete_button'),
                        disabled: !canRemove
                    };
                case _enum.TableButtonType.remove:
                    return {
                        icon: 'remove_circle',
                        onClick: this.handleButtonRemove,
                        children: (0, _localeContext.$l)('Table', 'remove_button'),
                        disabled: !canRemove
                    };
                case _enum.TableButtonType.reset:
                    return { icon: 'undo', onClick: this.handleButtonReset, children: (0, _localeContext.$l)('Table', 'reset_button'), type: "reset" /* reset */ };
                case _enum.TableButtonType.query:
                    return { icon: 'search', onClick: this.handleQuery, children: (0, _localeContext.$l)('Table', 'query_button') };
                case _enum.TableButtonType['export']:
                    return { icon: 'export', onClick: this.handleButtonExport, children: (0, _localeContext.$l)('Table', 'export_button') };
                case _enum.TableButtonType.expandAll:
                    return isTree && { icon: 'add_box', onClick: this.handleExpandAll, children: (0, _localeContext.$l)('Table', 'expand_button') };
                case _enum.TableButtonType.collapseAll:
                    return isTree && { icon: 'short_text', onClick: this.handleCollapseAll, children: (0, _localeContext.$l)('Table', 'collapse_button') };
                default:
            }
        }
    }, {
        key: 'getButtons',
        value: function getButtons() {
            var _this3 = this;

            var _props = this.props,
                buttons = _props.buttons,
                prefixCls = _props.prefixCls;

            if (buttons) {
                var children = [];
                buttons.forEach(function (button) {
                    var props = {};
                    if ((0, _mobx.isArrayLike)(button)) {
                        props = button[1];
                        button = button[0];
                    }
                    if ((0, _isString2['default'])(button) && button in _enum.TableButtonType) {
                        var defaultButtonProps = _this3.getButtonProps(button);
                        if (defaultButtonProps) {
                            children.push(_react2['default'].createElement(_Button2['default'], (0, _extends3['default'])({ color: "blue" /* blue */, funcType: "flat" /* flat */, key: button }, defaultButtonProps, props)));
                        }
                    } else if ((0, _react.isValidElement)(button)) {
                        children.push(button);
                    }
                });
                if (children.length) {
                    return _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-toolbar-button-group' },
                        children
                    );
                }
            }
        }
    }, {
        key: 'getQueryBar',
        value: function getQueryBar() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                showQueryBar = _props2.showQueryBar,
                queryFieldsLimit = _props2.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;

            if (showQueryBar && queryDataSet) {
                var fields = filterBindField(queryDataSet.fields);
                var keys = Object.keys(fields);
                if (keys.length) {
                    var currentFields = keys.slice(0, queryFieldsLimit).map(function (name) {
                        return fields[name];
                    });
                    var moreKeys = keys.slice(queryFieldsLimit);
                    var more = void 0;
                    var dirtyInfo = void 0;
                    if (moreKeys.length) {
                        var moreFields = keys.slice(queryFieldsLimit).map(function (name) {
                            return fields[name];
                        });
                        more = this.getMoreButton(moreFields, queryDataSet);
                        dirtyInfo = this.getDirtyInfo(queryDataSet.current, moreKeys);
                    }
                    return _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-query-bar' },
                        dirtyInfo,
                        this.getCurrentFields(currentFields, queryDataSet),
                        _react2['default'].createElement(
                            _Button2['default'],
                            { color: "blue" /* blue */, onClick: this.handleQuery },
                            (0, _localeContext.$l)('Table', 'query_button')
                        ),
                        more
                    );
                }
            }
        }
    }, {
        key: 'getDirtyInfo',
        value: function getDirtyInfo(current, moreKeys) {
            if (current && moreKeys.some(function (key) {
                var field = current.getField(key);
                return field ? field.dirty : false;
            })) {
                var prefixCls = this.props.prefixCls;

                return _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-query-bar-dirty-info' },
                    _react2['default'].createElement(_icon2['default'], { type: 'info' }),
                    _react2['default'].createElement(
                        'span',
                        null,
                        (0, _localeContext.$l)('Table', 'dirty_info')
                    ),
                    _react2['default'].createElement(
                        'a',
                        { onClick: this.handleQueryReset },
                        (0, _localeContext.$l)('Table', 'restore')
                    )
                );
            }
        }
    }, {
        key: 'getCurrentFields',
        value: function getCurrentFields(fields, dataSet) {
            return this.createFields(fields, dataSet, false);
        }
    }, {
        key: 'getMoreButton',
        value: function getMoreButton(fields, dataSet) {
            var _this4 = this;

            if (fields.length) {
                var moreFields = this.createFields(fields, dataSet, true);
                return _react2['default'].createElement(
                    _Button2['default'],
                    { color: "blue" /* blue */, funcType: "flat" /* flat */, onClick: function onClick() {
                            return _this4.openMore(moreFields);
                        } },
                    (0, _localeContext.$l)('Table', 'advanced_search')
                );
            }
        }
    }, {
        key: 'createFields',
        value: function createFields(fields, dataSet, isMore) {
            var _this5 = this;

            var queryFields = this.props.queryFields;

            return fields.map(function (field, index) {
                var name = field.name;

                var props = (0, _extends3['default'])({
                    key: name,
                    name: name,
                    dataSet: dataSet,
                    autoFocus: isMore && index === 0,
                    onEnterDown: _this5.handleFieldEnter,
                    style: { width: (0, _UnitConvertor.pxToRem)(isMore ? 250 : 130) }
                }, isMore ? { label: field.get('label') } : { placeholder: field.get('label') });
                var label = field.get('label');
                if (label) {
                    if (isMore) {
                        props.label = label;
                    } else {
                        props.placeholder = label;
                    }
                }
                var element = queryFields[name];
                return (0, _react.isValidElement)(element) ? (0, _react.cloneElement)(element, props) : (0, _react.cloneElement)((0, _utils.getEditorByField)(field), (0, _extends3['default'])({}, props, element));
            });
        }
    }, {
        key: 'openMore',
        value: function openMore(children) {
            this.modal = _modal2['default'].open({
                title: (0, _localeContext.$l)('Table', 'advanced_search'),
                children: _react2['default'].createElement(
                    _Form2['default'],
                    null,
                    children
                ),
                okText: (0, _localeContext.$l)('Table', 'query_button'),
                onOk: this.handleQuery,
                style: {
                    width: (0, _UnitConvertor.pxToRem)(400)
                },
                drawer: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.props.prefixCls;

            var buttons = this.getButtons();
            var queryBar = this.getQueryBar();
            if (buttons || queryBar) {
                var className = prefixCls + '-toolbar';
                return _react2['default'].createElement(
                    'div',
                    { className: className },
                    buttons,
                    queryBar
                );
            }
            return null;
        }
    }]);
    return TableToolBar;
}(_react.Component);
TableToolBar.displayName = 'TableToolBar';
TableToolBar.contextType = _TableContext2['default'];
TableToolBar = tslib_1.__decorate([_mobxReact.observer], TableToolBar);
exports['default'] = TableToolBar;