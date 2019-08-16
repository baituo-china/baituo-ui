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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _radio = require('../radio');

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Option = _select2['default'].Option;

var Header = function (_Component) {
    (0, _inherits3['default'])(Header, _Component);

    function Header() {
        (0, _classCallCheck3['default'])(this, Header);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));

        _this.onYearChange = function (year) {
            var _this$props = _this.props,
                value = _this$props.value,
                validRange = _this$props.validRange;

            var newValue = value.clone();
            newValue.year(parseInt(year, 10));
            // switch the month so that it remains within range when year changes
            if (validRange) {
                var _validRange = (0, _slicedToArray3['default'])(validRange, 2),
                    start = _validRange[0],
                    end = _validRange[1];

                var newYear = newValue.get('year');
                var newMonth = newValue.get('month');
                if (newYear === end.get('year') && newMonth > end.get('month')) {
                    newValue.month(end.get('month'));
                }
                if (newYear === start.get('year') && newMonth < start.get('month')) {
                    newValue.month(start.get('month'));
                }
            }
            var onValueChange = _this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        _this.onMonthChange = function (month) {
            var newValue = _this.props.value.clone();
            newValue.month(parseInt(month, 10));
            var onValueChange = _this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        _this.onTypeChange = function (e) {
            var onTypeChange = _this.props.onTypeChange;
            if (onTypeChange) {
                onTypeChange(e.target.value);
            }
        };
        _this.getCalenderHeaderNode = function (node) {
            _this.calenderHeaderNode = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Header, [{
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('fullcalendar-header', this.props.prefixCls);
        }
    }, {
        key: 'getYearSelectElement',
        value: function getYearSelectElement(year) {
            var _this2 = this;

            var _props = this.props,
                yearSelectOffset = _props.yearSelectOffset,
                yearSelectTotal = _props.yearSelectTotal,
                locale = _props.locale,
                fullscreen = _props.fullscreen,
                validRange = _props.validRange;

            var prefixCls = this.getPrefixCls();
            var start = year - yearSelectOffset;
            var end = start + yearSelectTotal;
            if (validRange) {
                start = validRange[0].get('year');
                end = validRange[1].get('year') + 1;
            }
            var suffix = locale.year === '年' ? '年' : '';
            var options = [];
            for (var index = start; index < end; index++) {
                options.push(_react2['default'].createElement(
                    Option,
                    { key: '' + index },
                    index + suffix
                ));
            }
            return _react2['default'].createElement(
                _select2['default'],
                { size: fullscreen ? "default" /* default */ : "small" /* small */, dropdownMatchSelectWidth: false, className: prefixCls + '-year-select', onChange: this.onYearChange, value: String(year), getPopupContainer: function getPopupContainer() {
                        return _this2.calenderHeaderNode;
                    } },
                options
            );
        }
    }, {
        key: 'getMonthsLocale',
        value: function getMonthsLocale(value) {
            var current = value.clone();
            var localeData = value.localeData();
            var months = [];
            for (var i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
            }
            return months;
        }
    }, {
        key: 'getMonthSelectElement',
        value: function getMonthSelectElement(month, months) {
            var _this3 = this;

            var props = this.props;
            var fullscreen = props.fullscreen,
                validRange = props.validRange,
                value = props.value;

            var prefixCls = this.getPrefixCls();
            var options = [];
            var start = 0;
            var end = 12;
            if (validRange) {
                var _validRange2 = (0, _slicedToArray3['default'])(validRange, 2),
                    rangeStart = _validRange2[0],
                    rangeEnd = _validRange2[1];

                var currentYear = value.get('year');
                if (rangeEnd.get('year') === currentYear) {
                    end = rangeEnd.get('month') + 1;
                } else {
                    start = rangeStart.get('month');
                }
            }
            for (var index = start; index < end; index++) {
                options.push(_react2['default'].createElement(
                    Option,
                    { key: '' + index },
                    months[index]
                ));
            }
            return _react2['default'].createElement(
                _select2['default'],
                { size: fullscreen ? "default" /* default */ : "small" /* small */, dropdownMatchSelectWidth: false, className: prefixCls + '-month-select', value: String(month), onChange: this.onMonthChange, getPopupContainer: function getPopupContainer() {
                        return _this3.calenderHeaderNode;
                    } },
                options
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                type = _props2.type,
                value = _props2.value,
                locale = _props2.locale,
                fullscreen = _props2.fullscreen;

            var prefixCls = this.getPrefixCls();
            var yearSelect = this.getYearSelectElement(value.year());
            var monthSelect = type === 'date' ? this.getMonthSelectElement(value.month(), this.getMonthsLocale(value)) : null;
            var typeSwitch = _react2['default'].createElement(
                _radio.Group,
                { onChange: this.onTypeChange, value: type, size: fullscreen ? "default" /* default */ : "small" /* small */ },
                _react2['default'].createElement(
                    _radio.Button,
                    { value: 'date' },
                    locale.month
                ),
                _react2['default'].createElement(
                    _radio.Button,
                    { value: 'month' },
                    locale.year
                )
            );
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-header', ref: this.getCalenderHeaderNode },
                yearSelect,
                monthSelect,
                typeSwitch
            );
        }
    }]);
    return Header;
}(_react.Component);

exports['default'] = Header;

Header.displayName = 'Header';
Header.defaultProps = {
    yearSelectOffset: 10,
    yearSelectTotal: 20
};
module.exports = exports['default'];