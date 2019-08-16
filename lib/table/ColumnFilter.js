'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _SelectTrigger = require('../rc-components/select/SelectTrigger');

var _SelectTrigger2 = _interopRequireDefault(_SelectTrigger);

var _menu = require('../rc-components/menu');

var _util = require('../rc-components/select/util');

var _util2 = require('./util');

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ColumnFilter = function (_Component) {
    (0, _inherits3['default'])(ColumnFilter, _Component);

    function ColumnFilter() {
        (0, _classCallCheck3['default'])(this, ColumnFilter);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ColumnFilter.__proto__ || Object.getPrototypeOf(ColumnFilter)).apply(this, arguments));

        _this.state = {
            open: false
        };
        _this.onMenuSelect = function (item) {
            item.item.props.value.hidden = false;
            _this.fireChange(item);
        };
        _this.onMenuDeselect = function (item) {
            item.item.props.value.hidden = true;
            _this.fireChange(item);
        };
        _this.onDropdownVisibleChange = function (open) {
            if (_this.state.open !== open) {
                _this.setState({
                    open: open
                });
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(ColumnFilter, [{
        key: 'render',
        value: function render() {
            var prefixCls = this.props.prefixCls;
            var open = this.state.open;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-columns-chooser' },
                _react2['default'].createElement(
                    _SelectTrigger2['default'],
                    { prefixCls: (0, _configure.getPrefixCls)('select'), showAction: ['click'], options: this.getOptions(), value: this.getVisibleColumns(), getPopupContainer: this.props.getPopupContainer, multiple: true, onDropdownVisibleChange: this.onDropdownVisibleChange, onMenuSelect: this.onMenuSelect, onMenuDeselect: this.onMenuDeselect, visible: open, popupPlacement: 'bottomRight', dropdownMatchSelectWidth: false, dropdownStyle: { minWidth: 187 } },
                    _react2['default'].createElement(_Button2['default'], { shape: 'circle', icon: 'view_column', size: "small" /* small */ })
                )
            );
        }
    }, {
        key: 'fireChange',
        value: function fireChange(item) {
            var onColumnFilterChange = this.props.onColumnFilterChange;

            if (onColumnFilterChange) {
                onColumnFilterChange(item);
            }
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            var options = [];
            (this.props.columns || []).filter(function (column) {
                return !column.notDisplay;
            }).map(function (column, i) {
                var item = column.title ? _react2['default'].createElement(
                    _menu.Item,
                    { disabled: column.disableClick, style: _util.UNSELECTABLE_STYLE, attribute: _util.UNSELECTABLE_ATTRIBUTE, value: column, key: (0, _util2.getColumnKey)(column, i) },
                    column.title
                ) : null;
                if (item) {
                    options.push(item);
                }
            });
            return options;
        }
    }, {
        key: 'getVisibleColumns',
        value: function getVisibleColumns() {
            return (this.props.columns || []).filter(function (column) {
                return !column.hidden;
            });
        }
    }]);
    return ColumnFilter;
}(_react.Component);

exports['default'] = ColumnFilter;

ColumnFilter.displayName = 'ColumnFilter';
module.exports = exports['default'];