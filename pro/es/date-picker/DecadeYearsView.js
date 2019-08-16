import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import classNames from 'classnames';
import autobind from '../_util/autobind';
import Icon from '../icon';
import DaysView, { alwaysValidDate } from './DaysView';

var DecadeYearsView = function (_DaysView) {
    _inherits(DecadeYearsView, _DaysView);

    function DecadeYearsView() {
        _classCallCheck(this, DecadeYearsView);

        return _possibleConstructorReturn(this, (DecadeYearsView.__proto__ || Object.getPrototypeOf(DecadeYearsView)).apply(this, arguments));
    }

    _createClass(DecadeYearsView, [{
        key: 'handlePrevYearClick',
        value: function handlePrevYearClick() {
            this.changeSelectedDate(this.getCloneDate().subtract(100, 'y'));
        }
    }, {
        key: 'handleNextYearClick',
        value: function handleNextYearClick() {
            this.changeSelectedDate(this.getCloneDate().add(100, 'y'));
        }
    }, {
        key: 'handleKeyDownHome',
        value: function handleKeyDownHome() {
            var date = this.getCloneDate();
            this.changeSelectedDate(date.subtract(date.year() % 100, 'y'));
        }
    }, {
        key: 'handleKeyDownEnd',
        value: function handleKeyDownEnd() {
            var date = this.getCloneDate();
            this.changeSelectedDate(date.add(90 - date.year() % 100, 'y'));
        }
    }, {
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft(e) {
            if (!e.altKey) {
                this.changeSelectedDate(this.getCloneDate().subtract(10, 'y'));
            }
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight(e) {
            if (e.altKey) {
                this.changeViewMode("year" /* year */);
            } else {
                this.changeSelectedDate(this.getCloneDate().add(10, 'y'));
            }
        }
    }, {
        key: 'handleKeyDownUp',
        value: function handleKeyDownUp() {
            this.changeSelectedDate(this.getCloneDate().subtract(30, 'y'));
        }
    }, {
        key: 'handleKeyDownDown',
        value: function handleKeyDownDown() {
            this.changeSelectedDate(this.getCloneDate().add(30, 'y'));
        }
    }, {
        key: 'handleKeyDownPageUp',
        value: function handleKeyDownPageUp() {
            this.changeSelectedDate(this.getCloneDate().subtract(100, 'y'));
        }
    }, {
        key: 'handleKeyDownPageDown',
        value: function handleKeyDownPageDown() {
            this.changeSelectedDate(this.getCloneDate().add(100, 'y'));
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var prefixCls = this.prefixCls,
                date = this.props.date;

            var year = date.year() % 100;
            var from = date.clone().subtract(year, 'y');
            var to = from.clone().add(99, 'y');
            return React.createElement(
                'div',
                { className: prefixCls + '-header' },
                React.createElement(
                    'a',
                    { className: prefixCls + '-prev-year', onClick: this.handlePrevYearClick },
                    React.createElement(Icon, { type: 'first_page' })
                ),
                React.createElement(
                    'span',
                    { className: prefixCls + '-view-select' },
                    from.year(),
                    ' - ',
                    to.year()
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

            var selected = date.clone().subtract(date.year() % 10, 'y');
            var from = date.clone().startOf('y').subtract(date.year() % 100, 'y');
            var to = from.clone().add(100, 'y');
            var prevYear = from.clone().subtract(10, 'y');
            var lastYear = to.clone().add(10, 'y');
            var rows = [];
            var cells = [];
            while (prevYear.isBefore(lastYear)) {
                var _classNames;

                var currentYear = prevYear.clone();
                var isDisabled = !isValidDate(currentYear, selected);
                var className = classNames(prefixCls + '-cell', (_classNames = {}, _defineProperty(_classNames, prefixCls + '-old', currentYear.isBefore(from, 'y')), _defineProperty(_classNames, prefixCls + '-new', currentYear.isSame(to, 'y')), _defineProperty(_classNames, prefixCls + '-selected', prevYear.isSame(selected, 'y')), _defineProperty(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
                var text = prevYear.year() + '-' + prevYear.clone().add(9, 'y').year();
                var decadeProps = {
                    key: text,
                    className: className
                };
                if (!isDisabled) {
                    decadeProps.onClick = this.handleCellClick.bind(this, currentYear);
                }
                cells.push(renderer(decadeProps, text, currentYear, selected));
                if (cells.length === 3) {
                    rows.push(React.createElement(
                        'tr',
                        { key: text },
                        cells
                    ));
                    cells = [];
                }
                prevYear.add(10, 'y');
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
            return this.prefixCls + '-year-panel';
        }
    }, {
        key: 'choose',
        value: function choose(date) {
            this.changeSelectedDate(date);
            this.changeViewMode("year" /* year */);
        }
    }]);

    return DecadeYearsView;
}(DaysView);

export default DecadeYearsView;

DecadeYearsView.displayName = 'DecadeYearView';
tslib_1.__decorate([autobind], DecadeYearsView.prototype, "handlePrevYearClick", null);
tslib_1.__decorate([autobind], DecadeYearsView.prototype, "handleNextYearClick", null);