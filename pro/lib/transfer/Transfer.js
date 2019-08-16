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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _Select2 = require('../select/Select');

var _Option = require('../option/Option');

var _Option2 = _interopRequireDefault(_Option);

var _OptGroup = require('../option/OptGroup');

var _OptGroup2 = _interopRequireDefault(_OptGroup);

var _TransferList = require('./TransferList');

var _TransferList2 = _interopRequireDefault(_TransferList);

var _utils = require('../data-set/utils');

var _TransferOperation = require('./TransferOperation');

var _TransferOperation2 = _interopRequireDefault(_TransferOperation);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Transfer = function (_Select) {
    (0, _inherits3['default'])(Transfer, _Select);

    function Transfer(props, context) {
        (0, _classCallCheck3['default'])(this, Transfer);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props, context));

        (0, _mobx.runInAction)(function () {
            _this.sourceSelected = [];
            _this.targetSelected = [];
        });
        return _this;
    }

    (0, _createClass3['default'])(Transfer, [{
        key: 'sourceFilter',
        value: function sourceFilter(record, index, array) {
            var valueField = this.valueField,
                optionsFilter = this.props.optionsFilter;

            if (optionsFilter && !optionsFilter(record, index, array)) {
                return false;
            }
            var values = this.getValues();
            if (values.length) {
                return values.every(function (v) {
                    return !(0, _utils.isSameLike)(record.get(valueField), v);
                });
            }
            return true;
        }
    }, {
        key: 'targetFilter',
        value: function targetFilter(record, index, array) {
            var valueField = this.valueField,
                optionsFilter = this.props.optionsFilter;

            if (optionsFilter && !optionsFilter(record, index, array)) {
                return false;
            }
            var values = this.getValues();
            if (values.length) {
                return values.some(function (v) {
                    return (0, _utils.isSameLike)(record.get(valueField), v);
                });
            }
            return false;
        }
    }, {
        key: 'handleMenuClick',
        value: function handleMenuClick(_ref) {
            var value = _ref.item.props.value;

            if (this.multiple) {
                this.selectRecord(value, this.sourceSelected);
            } else {
                this.addValue(this.processRecordToObject(value));
            }
        }
    }, {
        key: 'handleTargetMenuClick',
        value: function handleTargetMenuClick(_ref2) {
            var value = _ref2.item.props.value;

            if (this.multiple) {
                this.selectRecord(value, this.targetSelected);
            } else {
                this.removeValue(value);
            }
        }
    }, {
        key: 'handleMoveToLeft',
        value: function handleMoveToLeft() {
            var valueField = this.valueField;

            this.removeValues(this.targetSelected.map(function (record) {
                return record.get(valueField);
            }));
            this.targetSelected = [];
        }
    }, {
        key: 'handleMoveToRight',
        value: function handleMoveToRight() {
            var valueField = this.valueField;

            this.addValues(this.sourceSelected.map(function (record) {
                return record.get(valueField);
            }));
            this.sourceSelected = [];
        }
    }, {
        key: 'handleSourceSelectAllChange',
        value: function handleSourceSelectAllChange(selected) {
            this.sourceSelected = selected;
        }
    }, {
        key: 'handleTargetSelectAllChange',
        value: function handleTargetSelectAllChange(selected) {
            this.targetSelected = selected;
        }
    }, {
        key: 'selectRecord',
        value: function selectRecord(value, selected) {
            var index = selected.indexOf(value);
            if (index !== -1) {
                selected.splice(index, 1);
            } else {
                selected.push(value);
            }
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            var prefixCls = this.prefixCls,
                targetSelected = this.targetSelected,
                sourceSelected = this.sourceSelected,
                multiple = this.multiple,
                _props$titles = this.props.titles,
                titles = _props$titles === undefined ? [] : _props$titles;

            var disabled = this.isDisabled();
            return _react2['default'].createElement(
                'span',
                { key: 'wrapper', className: prefixCls + '-wrapper' },
                _react2['default'].createElement(_TransferList2['default'], (0, _extends3['default'])({}, this.props, { options: this.options, selected: sourceSelected, header: titles[0], onSelectAll: this.handleSourceSelectAllChange, onSelect: this.handleMenuClick, optionsFilter: this.sourceFilter })),
                _react2['default'].createElement(_TransferOperation2['default'], { className: prefixCls + '-operation', leftActive: !(!targetSelected.length || disabled), rightActive: !(!sourceSelected.length || disabled), moveToLeft: this.handleMoveToLeft, moveToRight: this.handleMoveToRight, multiple: multiple }),
                _react2['default'].createElement(_TransferList2['default'], (0, _extends3['default'])({}, this.props, { options: this.options, selected: targetSelected, header: titles[1], onSelectAll: this.handleTargetSelectAllChange, onSelect: this.handleTargetMenuClick, optionsFilter: this.targetFilter }))
            );
        }
    }]);
    return Transfer;
}(_Select2.Select);
Transfer.displayName = 'Transfer';
Transfer.propTypes = (0, _extends3['default'])({}, _Select2.Select.propTypes, {
    titles: _propTypes2['default'].arrayOf(_propTypes2['default'].node)
});
Transfer.defaultProps = (0, _extends3['default'])({}, _Select2.Select.defaultProps, {
    suffixCls: 'transfer',
    multiple: true
});
Transfer.Option = _Option2['default'];
Transfer.OptGroup = _OptGroup2['default'];
tslib_1.__decorate([_mobx.observable], Transfer.prototype, "sourceSelected", void 0);
tslib_1.__decorate([_mobx.observable], Transfer.prototype, "targetSelected", void 0);
tslib_1.__decorate([_autobind2['default']], Transfer.prototype, "sourceFilter", null);
tslib_1.__decorate([_autobind2['default']], Transfer.prototype, "targetFilter", null);
tslib_1.__decorate([_autobind2['default']], Transfer.prototype, "handleMenuClick", null);
tslib_1.__decorate([_autobind2['default']], Transfer.prototype, "handleTargetMenuClick", null);
tslib_1.__decorate([_autobind2['default'], _mobx.action], Transfer.prototype, "handleMoveToLeft", null);
tslib_1.__decorate([_autobind2['default'], _mobx.action], Transfer.prototype, "handleMoveToRight", null);
tslib_1.__decorate([_autobind2['default'], _mobx.action], Transfer.prototype, "handleSourceSelectAllChange", null);
tslib_1.__decorate([_autobind2['default'], _mobx.action], Transfer.prototype, "handleTargetSelectAllChange", null);
tslib_1.__decorate([_mobx.action], Transfer.prototype, "selectRecord", null);
Transfer = tslib_1.__decorate([_mobxReact.observer], Transfer);
exports['default'] = Transfer;
module.exports = exports['default'];