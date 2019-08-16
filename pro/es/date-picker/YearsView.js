import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import classNames from 'classnames';
import autobind from '../_util/autobind';
import Icon from '../icon';
import DaysView, { alwaysValidDate } from './DaysView';

var YearsView = function (_DaysView) {
    _inherits(YearsView, _DaysView);

    function YearsView() {
        _classCallCheck(this, YearsView);

        return _possibleConstructorReturn(this, (YearsView.__proto__ || Object.getPrototypeOf(YearsView)).apply(this, arguments));
    }

    _createClass(YearsView, [{
        key: 'handlePrevYearClick',
        value: function handlePrevYearClick() {
            this.changeSelectedDate(this.getCloneDate().subtract(10, 'y'));
        }
    }, {
        key: 'handleYearSelect',
        value: function handleYearSelect() {
            this.changeViewMode("decade" /* decade */);
        }
    }, {
        key: 'handleNextYearClick',
        value: function handleNextYearClick() {
            this.changeSelectedDate(this.getCloneDate().add(10, 'y'));
        }
    }, {
        key: 'handleKeyDownHome',
        value: function handleKeyDownHome() {
            var date = this.getCloneDate();
            this.changeSelectedDate(date.subtract(date.year() % 10, 'y'));
        }
    }, {
        key: 'handleKeyDownEnd',
        value: function handleKeyDownEnd() {
            var date = this.getCloneDate();
            this.changeSelectedDate(date.add(9 - date.year() % 10, 'y'));
        }
    }, {
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft(e) {
            if (e.altKey) {
                this.changeViewMode("decade" /* decade */);
            } else {
                this.changeSelectedDate(this.getCloneDate().subtract(1, 'y'));
            }
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight(e) {
            if (e.altKey) {
                if (this.props.mode !== "year" /* year */) {
                        this.changeViewMode("month" /* month */);
                    }
            } else {
                this.changeSelectedDate(this.getCloneDate().add(1, 'y'));
            }
        }
    }, {
        key: 'handleKeyDownUp',
        value: function handleKeyDownUp() {
            this.changeSelectedDate(this.getCloneDate().subtract(3, 'y'));
        }
    }, {
        key: 'handleKeyDownDown',
        value: function handleKeyDownDown() {
            this.changeSelectedDate(this.getCloneDate().add(3, 'y'));
        }
    }, {
        key: 'handleKeyDownPageUp',
        value: function handleKeyDownPageUp(e) {
            this.changeSelectedDate(this.getCloneDate().subtract(e.altKey ? 100 : 10, 'y'));
        }
    }, {
        key: 'handleKeyDownPageDown',
        value: function handleKeyDownPageDown(e) {
            this.changeSelectedDate(this.getCloneDate().add(e.altKey ? 100 : 10, 'y'));
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var prefixCls = this.prefixCls,
                date = this.props.date;

            var year = date.year() % 10;
            var from = date.clone().subtract(year, 'y');
            var to = from.clone().add(9, 'y');
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

            var selected = date.clone();
            var from = date.clone().startOf('y').subtract(date.year() % 10, 'y');
            var to = from.clone().add(10, 'y');
            var prevYear = from.clone().subtract(1, 'y');
            var lastYear = to.clone().add(1, 'y');
            var rows = [];
            var cells = [];
            while (prevYear.isBefore(lastYear)) {
                var _classNames;

                var currentYear = prevYear.clone();
                var isDisabled = !isValidDate(currentYear, selected);
                var className = classNames(prefixCls + '-cell', (_classNames = {}, _defineProperty(_classNames, prefixCls + '-old', currentYear.isBefore(from, 'y')), _defineProperty(_classNames, prefixCls + '-new', currentYear.isSame(to, 'y')), _defineProperty(_classNames, prefixCls + '-selected', prevYear.isSame(selected, 'y')), _defineProperty(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
                var text = String(prevYear.year());
                var yearProps = {
                    key: text,
                    className: className,
                    children: this.renderInner(text)
                };
                if (!isDisabled) {
                    yearProps.onClick = this.handleCellClick.bind(this, currentYear);
                }
                cells.push(renderer(yearProps, text, currentYear, selected));
                if (cells.length === 3) {
                    rows.push(React.createElement(
                        'tr',
                        { key: text },
                        cells
                    ));
                    cells = [];
                }
                prevYear.add(1, 'y');
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
            var mode = this.props.mode;

            if (mode !== "year" /* year */) {
                    this.changeSelectedDate(date);
                    this.changeViewMode("month" /* month */);
                } else {
                _get(YearsView.prototype.__proto__ || Object.getPrototypeOf(YearsView.prototype), 'choose', this).call(this, date);
            }
        }
    }]);

    return YearsView;
}(DaysView);

export default YearsView;

YearsView.displayName = 'YearsView';
YearsView.type = "year" /* year */;
tslib_1.__decorate([autobind], YearsView.prototype, "handlePrevYearClick", null);
tslib_1.__decorate([autobind], YearsView.prototype, "handleYearSelect", null);
tslib_1.__decorate([autobind], YearsView.prototype, "handleNextYearClick", null);