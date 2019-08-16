import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
var TimesView_1;
import * as tslib_1 from "tslib";
import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import autobind from '../_util/autobind';
import DaysView, { alwaysValidDate } from './DaysView';
import Button from '../button/Button';
import { getDateFormatByFieldType } from '../data-set/utils';
var TimeUnitQueue = ["h" /* hour */
, "m" /* minute */
, "s" /* second */
];
var TimesView = TimesView_1 = function (_DaysView) {
    _inherits(TimesView, _DaysView);

    function TimesView() {
        _classCallCheck(this, TimesView);

        return _possibleConstructorReturn(this, (TimesView.__proto__ || Object.getPrototypeOf(TimesView)).apply(this, arguments));
    }

    _createClass(TimesView, [{
        key: 'handleDateTimeSelect',
        value: function handleDateTimeSelect() {
            this.changeViewMode("dateTime" /* dateTime */);
        }
    }, {
        key: 'handleKeyDownHome',
        value: function handleKeyDownHome() {
            this.changeSelectedDate(this.getCloneDate().set(this.getCurrentUnit(), 0));
        }
    }, {
        key: 'handleKeyDownEnd',
        value: function handleKeyDownEnd() {
            var unit = this.getCurrentUnit();
            var size = unit === "h" /* hour */ ? 24 : 60;
            this.changeSelectedDate(this.getCloneDate().set(unit, size - 1));
        }
    }, {
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft(e) {
            if (e.altKey) {
                if (this.props.mode !== "time" /* time */) {
                        this.changeViewMode("dateTime" /* dateTime */);
                    }
            } else {
                this.changeUnit(this.getPrevUnit());
            }
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight(e) {
            if (!e.altKey) {
                this.changeUnit(this.getNextUnit());
            }
        }
    }, {
        key: 'handleKeyDownUp',
        value: function handleKeyDownUp() {
            this.changeSelectedDate(this.getCloneDate().subtract(1, this.getCurrentUnit()));
        }
    }, {
        key: 'handleKeyDownDown',
        value: function handleKeyDownDown() {
            this.changeSelectedDate(this.getCloneDate().add(1, this.getCurrentUnit()));
        }
    }, {
        key: 'handleKeyDownPageUp',
        value: function handleKeyDownPageUp() {
            this.changeSelectedDate(this.getCloneDate().set(this.getCurrentUnit(), 0));
        }
    }, {
        key: 'handleKeyDownPageDown',
        value: function handleKeyDownPageDown() {
            var unit = this.getCurrentUnit();
            var size = unit === "h" /* hour */ ? 24 : 60;
            this.changeSelectedDate(this.getCloneDate().set(unit, size - 1));
        }
    }, {
        key: 'handleKeyDownEnter',
        value: function handleKeyDownEnter() {
            this.choose(this.props.date);
        }
    }, {
        key: 'handleTimeCellClick',
        value: function handleTimeCellClick(date, unit) {
            this.changeUnit(unit);
            this.changeSelectedDate(date);
        }
    }, {
        key: 'handleWheel',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                e.preventDefault();

                                if (!(e.deltaY > 0)) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 4;
                                return this.changeSelectedDate(this.getCloneDate().add(1, this.getCurrentUnit()));

                            case 4:
                                _context.next = 9;
                                break;

                            case 6:
                                if (!(e.deltaY < 0)) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 9;
                                return this.changeSelectedDate(this.getCloneDate().subtract(1, this.getCurrentUnit()));

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function handleWheel(_x) {
                return _ref.apply(this, arguments);
            }

            return handleWheel;
        }()
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                date = _props.date,
                mode = _props.mode;

            if (mode === "time" /* time */) {
                    return React.createElement(
                        'div',
                        { className: prefixCls + '-header' },
                        React.createElement(
                            'span',
                            { className: prefixCls + '-view-select' },
                            date.format(getDateFormatByFieldType(TimesView_1.type))
                        )
                    );
                } else {
                return React.createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    React.createElement(
                        'a',
                        { className: prefixCls + '-view-select', onClick: this.handleMonthSelect },
                        date.localeData().monthsShort(date)
                    ),
                    React.createElement(
                        'a',
                        { className: prefixCls + '-view-select', onClick: this.handleDateTimeSelect },
                        date.date()
                    ),
                    React.createElement(
                        'a',
                        { className: prefixCls + '-view-select', onClick: this.handleYearSelect },
                        date.year()
                    )
                );
            }
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var prefixCls = this.prefixCls,
                mode = this.props.mode;

            var viewSelect = void 0;
            if (mode !== "time" /* time */) {
                    viewSelect = React.createElement(
                        'a',
                        { className: prefixCls + '-footer-view-select', onClick: this.handleDateTimeSelect },
                        'Select date'
                    );
                }
            return React.createElement(
                'div',
                { className: prefixCls + '-footer' },
                React.createElement(
                    'a',
                    { className: prefixCls + '-footer-now-btn', onClick: this.choose.bind(this, moment()) },
                    'Now'
                ),
                React.createElement(
                    Button,
                    { onClick: this.choose.bind(this, this.props.date) },
                    'OK'
                ),
                viewSelect
            );
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel() {
            var className = this.getPanelClass();
            return React.createElement(
                'div',
                { className: className + ' ' + this.prefixCls + '-' + this.getCurrentUnit(), onWheel: this.handleWheel },
                React.createElement(
                    'div',
                    { className: className + '-inner' },
                    this.renderPanelBody()
                )
            );
        }
    }, {
        key: 'renderPanelBody',
        value: function renderPanelBody() {
            return [this.getTimeBar("h" /* hour */), this.getTimeBar("m" /* minute */), this.getTimeBar("s" /* second */), React.createElement('div', { key: 'active', className: this.prefixCls + '-time-focus-active' })];
        }
    }, {
        key: 'renderCell',
        value: function renderCell(props) {
            return React.createElement('li', props);
        }
    }, {
        key: 'getTimeBar',
        value: function getTimeBar(unit) {
            var prefixCls = this.prefixCls,
                _props2 = this.props,
                date = _props2.date,
                _props2$renderer = _props2.renderer,
                renderer = _props2$renderer === undefined ? this.renderCell : _props2$renderer,
                _props2$isValidDate = _props2.isValidDate,
                isValidDate = _props2$isValidDate === undefined ? alwaysValidDate : _props2$isValidDate;

            var size = unit === "h" /* hour */ ? 24 : 60;
            var selected = date.clone();
            var pre = date.clone().set(unit, 0);
            var last = pre.clone().add(size, unit);
            var items = [];
            while (pre.isBefore(last)) {
                var _classNames;

                var current = pre.clone();
                var isDisabled = !isValidDate(current, selected);
                var text = String(pre.get(unit));
                var className = classNames(prefixCls + '-cell', (_classNames = {}, _defineProperty(_classNames, prefixCls + '-selected', pre.isSame(selected, unit)), _defineProperty(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
                var props = {
                    key: text,
                    className: className,
                    children: React.createElement(
                        'div',
                        { className: prefixCls + '-cell-inner' },
                        text
                    )
                };
                if (!isDisabled) {
                    props.onClick = this.handleTimeCellClick.bind(this, current, unit);
                }
                items.push(renderer(props, text, current, selected));
                pre.add(1, unit);
            }
            return React.createElement(
                'div',
                { key: unit, className: prefixCls + '-time-list', onMouseEnter: this.changeUnit.bind(this, unit) },
                React.createElement(
                    'ul',
                    { style: { top: (-selected.get(unit) + 4.5) * 100 + '%' } },
                    items
                ),
                React.createElement('div', { className: prefixCls + '-time-focus' })
            );
        }
    }, {
        key: 'getPanelClass',
        value: function getPanelClass() {
            return this.prefixCls + '-time-panel';
        }
    }, {
        key: 'getCurrentUnit',
        value: function getCurrentUnit() {
            var _currentUnit = this.currentUnit,
                currentUnit = _currentUnit === undefined ? "h" : _currentUnit;

            return currentUnit;
        }
    }, {
        key: 'getPrevUnit',
        value: function getPrevUnit() {
            return TimeUnitQueue[TimeUnitQueue.indexOf(this.getCurrentUnit()) - 1];
        }
    }, {
        key: 'getNextUnit',
        value: function getNextUnit() {
            return TimeUnitQueue[TimeUnitQueue.indexOf(this.getCurrentUnit()) + 1];
        }
    }, {
        key: 'changeUnit',
        value: function changeUnit(unit) {
            if (unit !== void 0 && unit !== this.currentUnit) {
                this.currentUnit = unit;
            }
        }
    }, {
        key: 'choose',
        value: function choose(date) {
            var mode = this.props.mode;

            if (mode !== "time" /* time */) {
                    this.changeSelectedDate(date);
                    this.changeViewMode(mode);
                } else {
                _get(TimesView.prototype.__proto__ || Object.getPrototypeOf(TimesView.prototype), 'choose', this).call(this, date);
            }
        }
    }]);

    return TimesView;
}(DaysView);
TimesView.displayName = 'TimesView';
TimesView.type = "time" /* time */;
tslib_1.__decorate([observable], TimesView.prototype, "currentUnit", void 0);
tslib_1.__decorate([autobind], TimesView.prototype, "handleDateTimeSelect", null);
tslib_1.__decorate([autobind], TimesView.prototype, "handleWheel", null);
tslib_1.__decorate([autobind], TimesView.prototype, "renderCell", null);
tslib_1.__decorate([action], TimesView.prototype, "changeUnit", null);
TimesView = TimesView_1 = tslib_1.__decorate([observer], TimesView);
export default TimesView;