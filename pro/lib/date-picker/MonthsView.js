'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _DaysView2 = require('./DaysView');

var _DaysView3 = _interopRequireDefault(_DaysView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var MonthsView = function (_DaysView) {
    (0, _inherits3['default'])(MonthsView, _DaysView);

    function MonthsView() {
        (0, _classCallCheck3['default'])(this, MonthsView);
        return (0, _possibleConstructorReturn3['default'])(this, (MonthsView.__proto__ || Object.getPrototypeOf(MonthsView)).apply(this, arguments));
    }

    (0, _createClass3['default'])(MonthsView, [{
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
                    { className: prefixCls + '-view-select', onClick: this.handleYearSelect },
                    date.year()
                ),
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-next-year' },
                    _react2['default'].createElement(_icon2['default'], { type: 'last_page', onClick: this.handleNextYearClick })
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
                isValidDate = _props$isValidDate === undefined ? _DaysView2.alwaysValidDate : _props$isValidDate;

            var selected = date.clone();
            var prevMonth = date.clone().startOf('y');
            var lastMonth = prevMonth.clone().add(12, 'M');
            var rows = [];
            var cells = [];
            while (prevMonth.isBefore(lastMonth)) {
                var _classNames;

                var currentMonth = prevMonth.clone();
                var isDisabled = !isValidDate(currentMonth, selected);
                var className = (0, _classnames2['default'])(prefixCls + '-cell', (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-selected', prevMonth.isSame(selected, 'M')), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
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
                    rows.push(_react2['default'].createElement(
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
                (0, _get3['default'])(MonthsView.prototype.__proto__ || Object.getPrototypeOf(MonthsView.prototype), 'choose', this).call(this, date);
            }
        }
    }]);
    return MonthsView;
}(_DaysView3['default']);

exports['default'] = MonthsView;

MonthsView.displayName = 'MonthsView';
MonthsView.type = "month" /* month */;
module.exports = exports['default'];