'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _DaysView2 = require('./DaysView');

var _DaysView3 = _interopRequireDefault(_DaysView2);

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _utils = require('../data-set/utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TimesView_1;

var TimeUnitQueue = ["h" /* hour */
, "m" /* minute */
, "s" /* second */
];
var TimesView = TimesView_1 = function (_DaysView) {
    (0, _inherits3['default'])(TimesView, _DaysView);

    function TimesView() {
        (0, _classCallCheck3['default'])(this, TimesView);
        return (0, _possibleConstructorReturn3['default'])(this, (TimesView.__proto__ || Object.getPrototypeOf(TimesView)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TimesView, [{
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
            var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(e) {
                return _regenerator2['default'].wrap(function _callee$(_context) {
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
                    return _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-header' },
                        _react2['default'].createElement(
                            'span',
                            { className: prefixCls + '-view-select' },
                            date.format((0, _utils.getDateFormatByFieldType)(TimesView_1.type))
                        )
                    );
                } else {
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    _react2['default'].createElement(
                        'a',
                        { className: prefixCls + '-view-select', onClick: this.handleMonthSelect },
                        date.localeData().monthsShort(date)
                    ),
                    _react2['default'].createElement(
                        'a',
                        { className: prefixCls + '-view-select', onClick: this.handleDateTimeSelect },
                        date.date()
                    ),
                    _react2['default'].createElement(
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
                    viewSelect = _react2['default'].createElement(
                        'a',
                        { className: prefixCls + '-footer-view-select', onClick: this.handleDateTimeSelect },
                        'Select date'
                    );
                }
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-footer' },
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-footer-now-btn', onClick: this.choose.bind(this, (0, _moment2['default'])()) },
                    'Now'
                ),
                _react2['default'].createElement(
                    _Button2['default'],
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
            return _react2['default'].createElement(
                'div',
                { className: className + ' ' + this.prefixCls + '-' + this.getCurrentUnit(), onWheel: this.handleWheel },
                _react2['default'].createElement(
                    'div',
                    { className: className + '-inner' },
                    this.renderPanelBody()
                )
            );
        }
    }, {
        key: 'renderPanelBody',
        value: function renderPanelBody() {
            return [this.getTimeBar("h" /* hour */), this.getTimeBar("m" /* minute */), this.getTimeBar("s" /* second */), _react2['default'].createElement('div', { key: 'active', className: this.prefixCls + '-time-focus-active' })];
        }
    }, {
        key: 'renderCell',
        value: function renderCell(props) {
            return _react2['default'].createElement('li', props);
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
                isValidDate = _props2$isValidDate === undefined ? _DaysView2.alwaysValidDate : _props2$isValidDate;

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
                var className = (0, _classnames2['default'])(prefixCls + '-cell', (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-selected', pre.isSame(selected, unit)), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', isDisabled), _classNames));
                var props = {
                    key: text,
                    className: className,
                    children: _react2['default'].createElement(
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
            return _react2['default'].createElement(
                'div',
                { key: unit, className: prefixCls + '-time-list', onMouseEnter: this.changeUnit.bind(this, unit) },
                _react2['default'].createElement(
                    'ul',
                    { style: { top: (-selected.get(unit) + 4.5) * 100 + '%' } },
                    items
                ),
                _react2['default'].createElement('div', { className: prefixCls + '-time-focus' })
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
                (0, _get3['default'])(TimesView.prototype.__proto__ || Object.getPrototypeOf(TimesView.prototype), 'choose', this).call(this, date);
            }
        }
    }]);
    return TimesView;
}(_DaysView3['default']);
TimesView.displayName = 'TimesView';
TimesView.type = "time" /* time */;
tslib_1.__decorate([_mobx.observable], TimesView.prototype, "currentUnit", void 0);
tslib_1.__decorate([_autobind2['default']], TimesView.prototype, "handleDateTimeSelect", null);
tslib_1.__decorate([_autobind2['default']], TimesView.prototype, "handleWheel", null);
tslib_1.__decorate([_autobind2['default']], TimesView.prototype, "renderCell", null);
tslib_1.__decorate([_mobx.action], TimesView.prototype, "changeUnit", null);
TimesView = TimesView_1 = tslib_1.__decorate([_mobxReact.observer], TimesView);
exports['default'] = TimesView;
module.exports = exports['default'];