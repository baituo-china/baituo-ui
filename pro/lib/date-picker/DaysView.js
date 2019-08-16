'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.alwaysValidDate = alwaysValidDate;

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _ViewComponent2 = require('../core/ViewComponent');

var _ViewComponent3 = _interopRequireDefault(_ViewComponent2);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DaysView = function (_ViewComponent) {
    (0, _inherits3['default'])(DaysView, _ViewComponent);

    function DaysView() {
        (0, _classCallCheck3['default'])(this, DaysView);
        return (0, _possibleConstructorReturn3['default'])(this, (DaysView.__proto__ || Object.getPrototypeOf(DaysView)).apply(this, arguments));
    }

    (0, _createClass3['default'])(DaysView, [{
        key: 'render',
        value: function render() {
            var prefixCls = this.prefixCls,
                className = this.props.className;

            var classString = (0, _classnames2['default'])(prefixCls + '-view', className);
            return _react2['default'].createElement(
                'div',
                { className: classString },
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            );
        }
    }, {
        key: 'handlePrevYearClick',
        value: function handlePrevYearClick() {
            this.changeSelectedDate(this.getCloneDate().subtract(1, 'y'), "year" /* year */);
        }
    }, {
        key: 'handlePrevMonthClick',
        value: function handlePrevMonthClick() {
            this.changeSelectedDate(this.getCloneDate().subtract(1, 'M'), "month" /* month */);
        }
    }, {
        key: 'handleMonthSelect',
        value: function handleMonthSelect() {
            this.changeViewMode("month" /* month */);
        }
    }, {
        key: 'handleYearSelect',
        value: function handleYearSelect() {
            this.changeViewMode("year" /* year */);
        }
    }, {
        key: 'handleNextYearClick',
        value: function handleNextYearClick() {
            this.changeSelectedDate(this.getCloneDate().add(1, 'y'), "year" /* year */);
        }
    }, {
        key: 'handleNextMonthClick',
        value: function handleNextMonthClick() {
            this.changeSelectedDate(this.getCloneDate().add(1, 'M'), "month" /* month */);
        }
    }, {
        key: 'handleKeyDownHome',
        value: function handleKeyDownHome() {
            this.changeSelectedDate(this.getCloneDate().startOf('M'));
        }
    }, {
        key: 'handleKeyDownEnd',
        value: function handleKeyDownEnd() {
            this.changeSelectedDate(this.getCloneDate().endOf('M'));
        }
    }, {
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft(e) {
            if (e.altKey) {
                this.changeViewMode("month" /* month */);
            } else {
                this.changeSelectedDate(this.getCloneDate().subtract(1, 'd'));
            }
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight(e) {
            if (!e.altKey) {
                this.changeSelectedDate(this.getCloneDate().add(1, 'd'));
            }
        }
    }, {
        key: 'handleKeyDownUp',
        value: function handleKeyDownUp() {
            this.changeSelectedDate(this.getCloneDate().subtract(1, 'w'));
        }
    }, {
        key: 'handleKeyDownDown',
        value: function handleKeyDownDown() {
            this.changeSelectedDate(this.getCloneDate().add(1, 'w'));
        }
    }, {
        key: 'handleKeyDownPageUp',
        value: function handleKeyDownPageUp(e) {
            this.changeSelectedDate(this.getCloneDate().subtract(1, e.altKey ? 'y' : 'M'));
        }
    }, {
        key: 'handleKeyDownPageDown',
        value: function handleKeyDownPageDown(e) {
            this.changeSelectedDate(this.getCloneDate().add(1, e.altKey ? 'y' : 'M'));
        }
    }, {
        key: 'handleKeyDownEnter',
        value: function handleKeyDownEnter() {
            this.choose(this.props.date);
        }
    }, {
        key: 'handleCellClick',
        value: function handleCellClick(date) {
            this.choose(date);
        }
    }, {
        key: 'choose',
        value: function choose(date) {
            var _props$onSelect = this.props.onSelect,
                onSelect = _props$onSelect === undefined ? _noop2['default'] : _props$onSelect;

            onSelect(date);
        }
    }, {
        key: 'changeSelectedDate',
        value: function changeSelectedDate(selectedDate, mode) {
            var _props$onSelectedDate = this.props.onSelectedDateChange,
                onSelectedDateChange = _props$onSelectedDate === undefined ? _noop2['default'] : _props$onSelectedDate;

            onSelectedDateChange(selectedDate, mode);
        }
    }, {
        key: 'changeViewMode',
        value: function changeViewMode(mode) {
            var _props$onViewModeChan = this.props.onViewModeChange,
                onViewModeChange = _props$onViewModeChan === undefined ? _noop2['default'] : _props$onViewModeChan;

            onViewModeChange(mode);
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var prefixCls = this.prefixCls,
                date = this.props.date;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-header' },
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-prev-year', onClick: this.handlePrevYearClick },
                    _react2['default'].createElement(_icon2['default'], { type: 'first_page' })
                ),
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-prev-month', onClick: this.handlePrevMonthClick },
                    _react2['default'].createElement(_icon2['default'], { type: 'navigate_before' })
                ),
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-view-select', onClick: this.handleMonthSelect },
                    date.localeData().monthsShort(date)
                ),
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-view-select', onClick: this.handleYearSelect },
                    date.year()
                ),
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-next-year' },
                    _react2['default'].createElement(_icon2['default'], { type: 'last_page', onClick: this.handleNextYearClick })
                ),
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-next-month', onClick: this.handleNextMonthClick },
                    _react2['default'].createElement(_icon2['default'], { type: 'navigate_next' })
                )
            );
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            return _react2['default'].createElement(
                'div',
                { className: this.prefixCls + '-body' },
                this.renderPanel()
            );
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel() {
            return _react2['default'].createElement(
                'table',
                { className: this.getPanelClass(), cellSpacing: 0 },
                this.renderPanelHead(),
                _react2['default'].createElement(
                    'tbody',
                    null,
                    this.renderPanelBody()
                )
            );
        }
    }, {
        key: 'renderPanelHead',
        value: function renderPanelHead() {
            return _react2['default'].createElement(
                'thead',
                null,
                _react2['default'].createElement(
                    'tr',
                    null,
                    this.getDaysOfWeek()
                )
            );
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-footer' },
                _react2['default'].createElement(
                    'a',
                    { onClick: this.choose.bind(this, (0, _moment2['default'])().startOf('d')) },
                    (0, _localeContext.$l)('DatePicker', 'today')
                )
            );
        }
    }, {
        key: 'renderCell',
        value: function renderCell(props) {
            return _react2['default'].createElement('td', props);
        }
    }, {
        key: 'renderInner',
        value: function renderInner(text) {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-cell-inner' },
                text
            );
        }
    }, {
        key: 'getFirstDay',
        value: function getFirstDay(date) {
            var firstDay = date.clone().subtract(1, 'M');
            return firstDay.date(firstDay.daysInMonth()).startOf('w');
        }
    }, {
        key: 'renderPanelBody',
        value: function renderPanelBody() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                date = _props.date,
                _props$renderer = _props.renderer,
                renderer = _props$renderer === undefined ? this.renderCell : _props$renderer,
                _props$isValidDate = _props.isValidDate,
                isValidDate = _props$isValidDate === undefined ? alwaysValidDate : _props$isValidDate;

            var selected = date.clone();
            var prevMonth = this.getFirstDay(date);
            var currentYear = date.year();
            var currentMonth = date.month();
            var lastDay = prevMonth.clone().add(42, 'd');
            var rows = [];
            var cells = [];
            while (prevMonth.isBefore(lastDay)) {
                var _classNames;

                var currentDate = prevMonth.clone();
                var isDisabled = !isValidDate(currentDate, selected);
                var className = (0, _classnames2['default'])(prefixCls + '-cell', (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-old', prevMonth.year() < currentYear || prevMonth.year() === currentYear && prevMonth.month() < currentMonth), (0, _defineProperty3['default'])(_classNames, prefixCls + '-new', prevMonth.year() > currentYear || prevMonth.year() === currentYear && prevMonth.month() > currentMonth), (0, _defineProperty3['default'])(_classNames, prefixCls + '-selected', prevMonth.isSame(selected, 'd')), (0, _defineProperty3['default'])(_classNames, prefixCls + '-today', prevMonth.isSame((0, _moment2['default'])(), 'd')), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
                var text = String(currentDate.date());
                var dayProps = {
                    key: prevMonth.format('M_D'),
                    className: className,
                    children: this.renderInner(text)
                };
                if (!isDisabled) {
                    dayProps.onClick = this.handleCellClick.bind(this, currentDate);
                }
                cells.push(renderer(dayProps, text, currentDate, selected));
                if (cells.length === 7) {
                    rows.push(_react2['default'].createElement(
                        'tr',
                        { key: prevMonth.format('M_D') },
                        cells
                    ));
                    cells = [];
                }
                prevMonth.add(1, 'd');
            }
            return rows;
        }
    }, {
        key: 'getPanelClass',
        value: function getPanelClass() {
            return this.prefixCls + '-day-panel';
        }
    }, {
        key: 'getDaysOfWeek',
        value: function getDaysOfWeek() {
            var locale = this.props.date.localeData();
            var days = locale.weekdaysMin();
            var first = locale.firstDayOfWeek();
            var dow = [];
            var i = 0;
            days.forEach(function (day) {
                dow[(7 + i++ - first) % 7] = _react2['default'].createElement(
                    'th',
                    { key: day, title: day },
                    day
                );
            });
            return dow;
        }
    }, {
        key: 'getCloneDate',
        value: function getCloneDate() {
            return this.props.date.clone();
        }
    }]);
    return DaysView;
}(_ViewComponent3['default']);

exports['default'] = DaysView;

DaysView.displayName = 'DaysView';
DaysView.propTypes = (0, _extends3['default'])({
    date: _propTypes2['default'].object,
    renderer: _propTypes2['default'].func,
    isValidDate: _propTypes2['default'].func,
    onSelect: _propTypes2['default'].func,
    onSelectedDateChange: _propTypes2['default'].func,
    onViewModeChange: _propTypes2['default'].func
}, _ViewComponent3['default'].propTypes);
DaysView.defaultProps = {
    suffixCls: 'calendar'
};
DaysView.type = "date" /* date */;
tslib_1.__decorate([_autobind2['default']], DaysView.prototype, "handlePrevYearClick", null);
tslib_1.__decorate([_autobind2['default']], DaysView.prototype, "handlePrevMonthClick", null);
tslib_1.__decorate([_autobind2['default']], DaysView.prototype, "handleMonthSelect", null);
tslib_1.__decorate([_autobind2['default']], DaysView.prototype, "handleYearSelect", null);
tslib_1.__decorate([_autobind2['default']], DaysView.prototype, "handleNextYearClick", null);
tslib_1.__decorate([_autobind2['default']], DaysView.prototype, "handleNextMonthClick", null);
tslib_1.__decorate([_autobind2['default']], DaysView.prototype, "renderCell", null);
function alwaysValidDate() {
    return true;
}