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

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _DaysView2 = require('./DaysView');

var _DaysView3 = _interopRequireDefault(_DaysView2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var YearsView = function (_DaysView) {
    (0, _inherits3['default'])(YearsView, _DaysView);

    function YearsView() {
        (0, _classCallCheck3['default'])(this, YearsView);
        return (0, _possibleConstructorReturn3['default'])(this, (YearsView.__proto__ || Object.getPrototypeOf(YearsView)).apply(this, arguments));
    }

    (0, _createClass3['default'])(YearsView, [{
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
                    from.year(),
                    ' - ',
                    to.year()
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
                var className = (0, _classnames2['default'])(prefixCls + '-cell', (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-old', currentYear.isBefore(from, 'y')), (0, _defineProperty3['default'])(_classNames, prefixCls + '-new', currentYear.isSame(to, 'y')), (0, _defineProperty3['default'])(_classNames, prefixCls + '-selected', prevYear.isSame(selected, 'y')), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
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
                    rows.push(_react2['default'].createElement(
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
                (0, _get3['default'])(YearsView.prototype.__proto__ || Object.getPrototypeOf(YearsView.prototype), 'choose', this).call(this, date);
            }
        }
    }]);
    return YearsView;
}(_DaysView3['default']);

exports['default'] = YearsView;

YearsView.displayName = 'YearsView';
YearsView.type = "year" /* year */;
tslib_1.__decorate([_autobind2['default']], YearsView.prototype, "handlePrevYearClick", null);
tslib_1.__decorate([_autobind2['default']], YearsView.prototype, "handleYearSelect", null);
tslib_1.__decorate([_autobind2['default']], YearsView.prototype, "handleNextYearClick", null);
module.exports = exports['default'];