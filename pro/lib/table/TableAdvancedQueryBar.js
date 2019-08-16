'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _moment = require('moment');

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _utils = require('./utils');

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _TableToolBar = require('./TableToolBar');

var _KeyValueBar = require('./KeyValueBar');

var _KeyValueBar2 = _interopRequireDefault(_KeyValueBar);

var _utils2 = require('../data-set/utils');

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isFieldEmpty(field) {
    var value = field.getValue();
    return (0, _mobx.isArrayLike)(value) ? value.length === 0 : !value;
}
function processFieldValue(field) {
    var value = field.getValue();
    if ((0, _moment.isMoment)(value)) {
        value = value.format((0, _utils2.getDateFormatByField)(field, field.get('type')));
    }
    if ((0, _mobx.isArrayLike)(value)) {
        value = value.join(',');
    }
    return value;
}
var TableAdvancedQueryBar = function (_Component) {
    (0, _inherits3['default'])(TableAdvancedQueryBar, _Component);

    function TableAdvancedQueryBar() {
        (0, _classCallCheck3['default'])(this, TableAdvancedQueryBar);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableAdvancedQueryBar.__proto__ || Object.getPrototypeOf(TableAdvancedQueryBar)).apply(this, arguments));

        _this.state = {
            showMoreFieldsPanel: false
        };
        _this.handleFieldEnter = function () {
            _this.handleQuery();
        };
        _this.handleFieldChange = function () {
            _this.handleQuery();
        };
        _this.handleQuery = function () {
            _this.context.tableStore.dataSet.query();
        };
        _this.handleMoreFieldsButtonClick = function () {
            // toggle state
            _this.setState(function (prevState) {
                return (0, _extends3['default'])({}, prevState, {
                    showMoreFieldsPanel: !prevState.showMoreFieldsPanel
                });
            });
        };
        _this.handleKeyValueItemClose = function (label) {
            var queryDataSet = _this.context.tableStore.dataSet.queryDataSet;

            if (queryDataSet) {
                var fields = (0, _TableToolBar.filterBindField)(queryDataSet.fields);
                Object.keys(fields).map(function (fieldKey) {
                    return fields[fieldKey];
                }).filter(function (field) {
                    return field.get('label') === label;
                }).forEach(function (field) {
                    var record = field.record || queryDataSet.current;
                    record.set(field.name, null);
                    _this.handleQuery();
                });
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(TableAdvancedQueryBar, [{
        key: 'getMoreFieldsButton',
        value: function getMoreFieldsButton(fields) {
            var showMoreFieldsPanel = this.state.showMoreFieldsPanel;

            if (fields.length) {
                return _react2['default'].createElement(
                    _button2['default'],
                    { icon: 'filter_list', color: "blue" /* blue */, funcType: "flat" /* flat */, onClick: this.handleMoreFieldsButtonClick },
                    !showMoreFieldsPanel ? (0, _localeContext.$l)('Table', 'advanced_query') : (0, _localeContext.$l)('Table', 'hide_advanced_query')
                );
            }
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var prefixCls = this.props.prefixCls;

            return (0, _classnames2['default'])(prefixCls + '-advanced-query-bar-container');
        }
    }, {
        key: 'getCurrentFields',
        value: function getCurrentFields(fields, dataSet) {
            return this.createFields(fields, dataSet, false);
        }
    }, {
        key: 'getQueryBar',
        value: function getQueryBar() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                queryFieldsLimit = _props.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;

            if (queryDataSet) {
                var fields = (0, _TableToolBar.filterBindField)(queryDataSet.fields);
                var keys = Object.keys(fields);
                if (keys.length) {
                    var currentFields = keys.slice(0, queryFieldsLimit).map(function (name) {
                        return fields[name];
                    });
                    var moreKeys = keys.slice(queryFieldsLimit);
                    var moreFieldsButton = void 0;
                    // let dirtyInfo;
                    if (moreKeys.length) {
                        var moreFields = keys.slice(queryFieldsLimit).map(function (name) {
                            return fields[name];
                        });
                        moreFieldsButton = this.getMoreFieldsButton(moreFields);
                        // dirtyInfo = this.getDirtyInfo(queryDataSet.current, moreKeys);
                    }
                    return _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-advanced-query-bar' },
                        this.getCurrentFields(currentFields, queryDataSet),
                        moreFieldsButton
                    );
                }
            }
        }
    }, {
        key: 'renderMoreFields',
        value: function renderMoreFields(fields) {
            return fields.map(function (field, index) {
                var label = field.props.label;

                return _react2['default'].createElement(
                    'div',
                    { className: 'more-field-container', key: field.key + '-' + index },
                    _react2['default'].createElement(
                        'label',
                        { className: 'more-field-label' },
                        label
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'more-field-wrapper' },
                        field
                    )
                );
            });
        }
    }, {
        key: 'renderMoreFieldsPanel',
        value: function renderMoreFieldsPanel(fields, dataSet) {
            var prefixCls = this.props.prefixCls;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-advanced-query-bar-more-fields-panel' },
                this.renderMoreFields(this.createFields(fields, dataSet, true))
            );
        }
    }, {
        key: 'createFields',
        value: function createFields(fields, dataSet, isMore) {
            var _this2 = this;

            var queryFields = this.props.queryFields;

            return fields.map(function (field, index) {
                var name = field.name;

                var props = (0, _extends3['default'])({
                    key: name,
                    name: name,
                    dataSet: dataSet,
                    autoFocus: isMore && index === 0,
                    onEnterDown: _this2.handleFieldEnter,
                    onChange: isMore ? _this2.handleFieldChange : undefined,
                    style: {
                        width: (0, _UnitConvertor.pxToRem)(isMore ? 250 : 260),
                        marginRight: !isMore ? (0, _UnitConvertor.pxToRem)(16) : 0
                    }
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
        key: 'getMoreFields',
        value: function getMoreFields() {
            var queryFieldsLimit = this.props.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;

            if (queryDataSet) {
                var fields = (0, _TableToolBar.filterBindField)(queryDataSet.fields);
                var keys = Object.keys(fields);
                if (keys.length) {
                    var moreFields = keys.slice(queryFieldsLimit).map(function (name) {
                        return fields[name];
                    });
                    return moreFields;
                }
            }
            return [];
        }
    }, {
        key: 'renderKeyValueBar',
        value: function renderKeyValueBar() {
            var prefixCls = this.props.prefixCls;

            var items = [];
            this.getMoreFields().forEach(function (field) {
                if (!isFieldEmpty(field)) {
                    items.push({
                        key: field.get('label'),
                        value: processFieldValue(field)
                    });
                }
            });
            return _react2['default'].createElement(_KeyValueBar2['default'], { prefixCls: prefixCls, items: items, onCloseBtnClick: this.handleKeyValueItemClose });
        }
    }, {
        key: 'getMoreFieldKeys',
        value: function getMoreFieldKeys() {
            var queryFieldsLimit = this.props.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;

            if (queryDataSet) {
                var fields = (0, _TableToolBar.filterBindField)(queryDataSet.fields);
                var keys = Object.keys(fields);
                return keys.slice(queryFieldsLimit);
            }
            return [];
        }
    }, {
        key: 'render',
        value: function render() {
            var queryFieldsLimit = this.props.queryFieldsLimit;
            var queryDataSet = this.context.tableStore.dataSet.queryDataSet;
            var showMoreFieldsPanel = this.state.showMoreFieldsPanel;

            if (queryDataSet) {
                var fields = (0, _TableToolBar.filterBindField)(queryDataSet.fields);
                var keys = Object.keys(fields);
                if (keys.length) {
                    var moreFields = keys.slice(queryFieldsLimit).map(function (name) {
                        return fields[name];
                    });
                    return _react2['default'].createElement(
                        'div',
                        { className: this.getClassName() },
                        this.getQueryBar(),
                        showMoreFieldsPanel ? this.renderMoreFieldsPanel(moreFields, queryDataSet) : null,
                        this.renderKeyValueBar()
                    );
                }
            }
            // invalid advanced query bar
            console.warn('queryBar = \'advancedBar\' doesn\'t work, invalid queryDataSet');
            return null;
        }
    }]);
    return TableAdvancedQueryBar;
}(_react.Component);
TableAdvancedQueryBar.defaultProps = {
    queryFields: []
};
TableAdvancedQueryBar.contextType = _TableContext2['default'];
tslib_1.__decorate([_mobx.action], TableAdvancedQueryBar.prototype, "handleKeyValueItemClose", void 0);
TableAdvancedQueryBar = tslib_1.__decorate([_mobxReact.observer], TableAdvancedQueryBar);
exports['default'] = TableAdvancedQueryBar;
module.exports = exports['default'];