import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import DaysView, { alwaysValidDate } from './DaysView';

var MonthsView = function (_DaysView) {
    _inherits(MonthsView, _DaysView);

    function MonthsView() {
        _classCallCheck(this, MonthsView);

        return _possibleConstructorReturn(this, (MonthsView.__proto__ || Object.getPrototypeOf(MonthsView)).apply(this, arguments));
    }

    _createClass(MonthsView, [{
        key: 'handleKeyDownHome',
        value: function handleKeyDownHome() {
            this.changeSelectedDate(this.getCloneDate().startOf('y'));
        }
    }, {
        key: 'handleKeyDownEnd',
        value: function handleKeyDownEnd() {
            this.changeSelectedDate(this.getCloneDate().endOf('y'));
        }
    }, {
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft(e) {
            if (e.altKey) {
                this.changeViewMode("year" /* year */);
            } else {
                this.changeSelectedDate(this.getCloneDate().subtract(1, 'M'));
            }
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight(e) {
            if (e.altKey) {
                var mode = this.props.mode;

                if (mode !== "month" /* month */) {
                        this.changeViewMode(mode);
                    }
            } else {
                this.changeSelectedDate(this.getCloneDate().add(1, 'M'));
            }
        }
    }, {
        key: 'handleKeyDownUp',
        value: function handleKeyDownUp() {
            this.changeSelectedDate(this.getCloneDate().subtract(3, 'M'));
        }
    }, {
        key: 'handleKeyDownDown',
        value: function handleKeyDownDown() {
            this.changeSelectedDate(this.getCloneDate().add(3, 'M'));
        }
    }, {
        key: 'handleKeyDownPageUp',
        value: function handleKeyDownPageUp(e) {
            this.changeSelectedDate(this.getCloneDate().subtract(e.altKey ? 10 : 1, 'y'));
        }
    }, {
        key: 'handleKeyDownPageDown',
        value: function handleKeyDownPageDown(e) {
            this.changeSelectedDate(this.getCloneDate().add(e.altKey ? 10 : 1, 'y'));
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
                    { className: prefixCls + '-view-select', onClick: this.handleYearSelect },
                    date.year()
                ),
                React.createElement(
                    'a',
                    { className: prefixCls + '-next-year' },
                    React.createElement(Icon, { type: 'last_page', onClick: this.handleNextYearClick })
                )
            );
        }
    }, {
        key: 'renderPanelHead',
        value: function renderPanelHead() {
            return;
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
            var prevMonth = date.clone().startOf('y');
            var lastMonth = prevMonth.clone().add(12, 'M');
            var rows = [];
            var cells = [];
            while (prevMonth.isBefore(lastMonth)) {
                var _classNames;

                var currentMonth = prevMonth.clone();
                var isDisabled = !isValidDate(currentMonth, selected);
                var className = classNames(prefixCls + '-cell', (_classNames = {}, _defineProperty(_classNames, prefixCls + '-selected', prevMonth.isSame(selected, 'M')), _defineProperty(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
                var text = prevMonth.localeData().monthsShort(prevMonth);
                var monthProps = {
                    key: text,
                    className: className,
                    children: this.renderInner(text)
                };
                if (!isDisabled) {
                    monthProps.onClick = this.handleCellClick.bind(this, currentMonth);
                }
                cells.push(renderer(monthProps, text, currentMonth, selected));
                if (cells.length === 3) {
                    rows.push(React.createElement(
                        'tr',
                        { key: text },
                        cells
                    ));
                    cells = [];
                }
                prevMonth.add(1, 'M');
            }
            return rows;
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            return;
        }
    }, {
        key: 'getPanelClass',
        value: function getPanelClass() {
            return this.prefixCls + '-month-panel';
        }
    }, {
        key: 'choose',
        value: function choose(date) {
            var mode = this.props.mode;

            if (mode !== "month" /* month */) {
                    this.changeSelectedDate(date);
                    this.changeViewMode(mode);
                } else {
                _get(MonthsView.prototype.__proto__ || Object.getPrototypeOf(MonthsView.prototype), 'choose', this).call(this, date);
            }
        }
    }]);

    return MonthsView;
}(DaysView);

export default MonthsView;

MonthsView.displayName = 'MonthsView';
MonthsView.type = "month" /* month */;