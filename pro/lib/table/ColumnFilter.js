'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _menu = require('../../../lib/rc-components/menu');

var _menu2 = _interopRequireDefault(_menu);

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dropdown = require('../dropdown/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _utils = require('./utils');

var _EventManager = require('../_util/EventManager');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ColumnFilter = function (_Component) {
    (0, _inherits3['default'])(ColumnFilter, _Component);

    function ColumnFilter(props, context) {
        (0, _classCallCheck3['default'])(this, ColumnFilter);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ColumnFilter.__proto__ || Object.getPrototypeOf(ColumnFilter)).call(this, props, context));

        _this.saveMenu = function (node) {
            return _this.menu = node;
        };
        _this.setDropDownHidden(true);
        return _this;
    }

    (0, _createClass3['default'])(ColumnFilter, [{
        key: 'handleHiddenChange',
        value: function handleHiddenChange(hidden) {
            this.setDropDownHidden(hidden);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (this.menu && this.menu.onKeyDown(e)) {
                (0, _EventManager.stopEvent)(e);
            }
        }
    }, {
        key: 'setDropDownHidden',
        value: function setDropDownHidden(hidden) {
            this.hidden = hidden;
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.props.prefixCls + '-columns-chooser';
            return _react2['default'].createElement(
                'div',
                { className: prefixCls, onFocus: _EventManager.stopPropagation, onMouseDown: _EventManager.stopPropagation, tabIndex: -1 },
                _react2['default'].createElement(
                    _Dropdown2['default'],
                    { placement: "bottomRight" /* bottomRight */, overlay: this.getMenu(prefixCls), hidden: this.hidden, onHiddenChange: this.handleHiddenChange },
                    _react2['default'].createElement(_Button2['default'], { funcType: "flat" /* flat */, icon: 'view_column', size: "small" /* small */, onKeyDown: this.handleKeyDown })
                )
            );
        }
    }, {
        key: 'handleMenuSelect',
        value: function handleMenuSelect(_ref) {
            var value = _ref.item.props.value;

            value.hidden = false;
        }
    }, {
        key: 'handleMenuUnSelect',
        value: function handleMenuUnSelect(_ref2) {
            var value = _ref2.item.props.value;

            value.hidden = true;
        }
    }, {
        key: 'handleMenuClick',
        value: function handleMenuClick(_ref3) {
            var domEvent = _ref3.domEvent;

            domEvent.preventDefault();
        }
    }, {
        key: 'getMenu',
        value: function getMenu(prefixCls) {
            var _context$tableStore = this.context.tableStore,
                leafColumns = _context$tableStore.leafColumns,
                dataSet = _context$tableStore.dataSet;

            var selectedKeys = [];
            var columns = [];
            leafColumns.forEach(function (column) {
                if (column.hideable) {
                    var header = (0, _utils.getHeader)(column, dataSet);
                    if (header) {
                        var key = (0, _utils.getColumnKey)(column);
                        if (!column.hidden) {
                            selectedKeys.push(key);
                        }
                        columns.push([column, header, key]);
                    }
                }
            });
            return _react2['default'].createElement(
                _menu2['default'],
                { ref: this.saveMenu, multiple: true, defaultActiveFirst: true, prefixCls: prefixCls + '-dropdown-menu', selectedKeys: selectedKeys, onSelect: this.handleMenuSelect, onDeselect: this.handleMenuUnSelect, onClick: this.handleMenuClick },
                this.getOptions(columns)
            );
        }
    }, {
        key: 'getOptions',
        value: function getOptions(columns) {
            return columns.map(function (_ref4) {
                var _ref5 = (0, _slicedToArray3['default'])(_ref4, 3),
                    column = _ref5[0],
                    header = _ref5[1],
                    key = _ref5[2];

                return _react2['default'].createElement(
                    _menu.Item,
                    { key: key, value: column },
                    _react2['default'].createElement(
                        'span',
                        null,
                        header
                    )
                );
            });
        }
    }]);
    return ColumnFilter;
}(_react.Component);
ColumnFilter.displayName = 'ColumnFilter';
ColumnFilter.contextType = _TableContext2['default'];
tslib_1.__decorate([_mobx.observable], ColumnFilter.prototype, "hidden", void 0);
tslib_1.__decorate([_autobind2['default']], ColumnFilter.prototype, "handleHiddenChange", null);
tslib_1.__decorate([_autobind2['default']], ColumnFilter.prototype, "handleKeyDown", null);
tslib_1.__decorate([_mobx.action], ColumnFilter.prototype, "setDropDownHidden", null);
tslib_1.__decorate([_mobx.action], ColumnFilter.prototype, "handleMenuSelect", null);
tslib_1.__decorate([_mobx.action], ColumnFilter.prototype, "handleMenuUnSelect", null);
ColumnFilter = tslib_1.__decorate([_mobxReact.observer], ColumnFilter);
exports['default'] = ColumnFilter;
module.exports = exports['default'];