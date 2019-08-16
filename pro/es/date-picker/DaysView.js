import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import noop from 'lodash/noop';
import ViewComponent from '../core/ViewComponent';
import autobind from '../_util/autobind';
import Icon from '../icon';
import { $l } from '../locale-context';

var DaysView = function (_ViewComponent) {
    _inherits(DaysView, _ViewComponent);

    function DaysView() {
        _classCallCheck(this, DaysView);

        return _possibleConstructorReturn(this, (DaysView.__proto__ || Object.getPrototypeOf(DaysView)).apply(this, arguments));
    }

    _createClass(DaysView, [{
        key: 'render',
        value: function render() {
            var prefixCls = this.prefixCls,
                className = this.props.className;

            var classString = classNames(prefixCls + '-view', className);
            return React.createElement(
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
                onSelect = _props$onSelect === undefined ? noop : _props$onSelect;

            onSelect(date);
        }
    }, {
        key: 'changeSelectedDate',
        value: function changeSelectedDate(selectedDate, mode) {
            var _props$onSelectedDate = this.props.onSelectedDateChange,
                onSelectedDateChange = _props$onSelectedDate === undefined ? noop : _props$onSelectedDate;

            onSelectedDateChange(selectedDate, mode);
        }
    }, {
        key: 'changeViewMode',
        value: function changeViewMode(mode) {
            var _props$onViewModeChan = this.props.onViewModeChange,
                onViewModeChange = _props$onViewModeChan === undefined ? noop : _props$onViewModeChan;

            onViewModeChange(mode);
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var prefixCls = this.prefixCls,
                date = this.props.date;

            return React.createElement(
                'div',
                { className: prefixCls + '-header' },
                React.createElement(
                    'a',
                    { className: prefixCls + '-prev-year', onClick: this.handlePrevYearClick },
                    React.createElement(Icon, { type: 'first_page' })
                ),
                React.createElement(
                    'a',
                    { className: prefixCls + '-prev-month', onClick: this.handlePrevMonthClick },
                    React.createElement(Icon, { type: 'navigate_before' })
                ),
                React.createElement(
                    'a',
                    { className: prefixCls + '-view-select', onClick: this.handleMonthSelect },
                    date.localeData().monthsShort(date)
                ),
                React.createElement(
                    'a',
                    { className: prefixCls + '-view-select', onClick: this.handleYearSelect },
                    date.year()
                ),
                React.createElement(
                    'a',
                    { className: prefixCls + '-next-year' },
                    React.createElement(Icon, { type: 'last_page', onClick: this.handleNextYearClick })
                ),
                React.createElement(
                    'a',
                    { className: prefixCls + '-next-month', onClick: this.handleNextMonthClick },
                    React.createElement(Icon, { type: 'navigate_next' })
                )
            );
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            return React.createElement(
                'div',
                { className: this.prefixCls + '-body' },
                this.renderPanel()
            );
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel() {
            return React.createElement(
                'table',
                { className: this.getPanelClass(), cellSpacing: 0 },
                this.renderPanelHead(),
                React.createElement(
                    'tbody',
                    null,
                    this.renderPanelBody()
                )
            );
        }
    }, {
        key: 'renderPanelHead',
        value: function renderPanelHead() {
            return React.createElement(
                'thead',
                null,
                React.createElement(
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

            return React.createElement(
                'div',
                { className: prefixCls + '-footer' },
                React.createElement(
                    'a',
                    { onClick: this.choose.bind(this, moment().startOf('d')) },
                    $l('DatePicker', 'today')
                )
            );
        }
    }, {
        key: 'renderCell',
        value: function renderCell(props) {
            return React.createElement('td', props);
        }
    }, {
        key: 'renderInner',
        value: function renderInner(text) {
            var prefixCls = this.prefixCls;

            return React.createElement(
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
                var className = classNames(prefixCls + '-cell', (_classNames = {}, _defineProperty(_classNames, prefixCls + '-old', prevMonth.year() < currentYear || prevMonth.year() === currentYear && prevMonth.month() < currentMonth), _defineProperty(_classNames, prefixCls + '-new', prevMonth.year() > currentYear || prevMonth.year() === currentYear && prevMonth.month() > currentMonth), _defineProperty(_classNames, prefixCls + '-selected', prevMonth.isSame(selected, 'd')), _defineProperty(_classNames, prefixCls + '-today', prevMonth.isSame(moment(), 'd')), _defineProperty(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
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
                    rows.push(React.createElement(
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
                dow[(7 + i++ - first) % 7] = React.createElement(
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
}(ViewComponent);

export default DaysView;

DaysView.displayName = 'DaysView';
DaysView.propTypes = _extends({
    date: PropTypes.object,
    renderer: PropTypes.func,
    isValidDate: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectedDateChange: PropTypes.func,
    onViewModeChange: PropTypes.func
}, ViewComponent.propTypes);
DaysView.defaultProps = {
    suffixCls: 'calendar'
};
DaysView.type = "date" /* date */;
tslib_1.__decorate([autobind], DaysView.prototype, "handlePrevYearClick", null);
tslib_1.__decorate([autobind], DaysView.prototype, "handlePrevMonthClick", null);
tslib_1.__decorate([autobind], DaysView.prototype, "handleMonthSelect", null);
tslib_1.__decorate([autobind], DaysView.prototype, "handleYearSelect", null);
tslib_1.__decorate([autobind], DaysView.prototype, "handleNextYearClick", null);
tslib_1.__decorate([autobind], DaysView.prototype, "handleNextMonthClick", null);
tslib_1.__decorate([autobind], DaysView.prototype, "renderCell", null);
export function alwaysValidDate() {
    return true;
}