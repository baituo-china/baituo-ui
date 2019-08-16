'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DaysView2 = require('./DaysView');

var _DaysView3 = _interopRequireDefault(_DaysView2);

var _localeContext = require('../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var WeeksView = function (_DaysView) {
    (0, _inherits3['default'])(WeeksView, _DaysView);

    function WeeksView() {
        (0, _classCallCheck3['default'])(this, WeeksView);
        return (0, _possibleConstructorReturn3['default'])(this, (WeeksView.__proto__ || Object.getPrototypeOf(WeeksView)).apply(this, arguments));
    }

    (0, _createClass3['default'])(WeeksView, [{
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft(e) {
            if (e.altKey) {
                this.changeViewMode("month" /* month */);
            } else {
                this.changeSelectedDate(this.getCloneDate().subtract(1, 'M'));
            }
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight(e) {
            if (!e.altKey) {
                this.changeSelectedDate(this.getCloneDate().add(1, 'M'));
            }
        }
    }, {
        key: 'renderPanelBody',
        value: function renderPanelBody() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                date = _props.date,
                _props$renderer = _props.renderer,
                renderer = _props$renderer === undefined ? this.renderCell : _props$renderer;

            var selected = date.clone();
            var firstDay = this.getFirstDay(date);
            var lastDay = firstDay.clone().add(42, 'd');
            var rows = [];
            var cells = [];
            while (firstDay.isBefore(lastDay)) {
                var currentDate = firstDay.clone();
                var className = (0, _classnames2['default'])(prefixCls + '-cell', (0, _defineProperty3['default'])({}, prefixCls + '-selected', firstDay.isSame(selected, 'w')));
                var text = String(currentDate.date());
                var dayProps = {
                    key: firstDay.format('M_D'),
                    className: className,
                    children: this.renderInner(text)
                };
                if (cells.length === 0) {
                    var weekProps = {
                        key: firstDay.format('Wo'),
                        className: className + ' ' + prefixCls + '-week-cell'
                    };
                    cells.push(this.getWeekCell(weekProps, firstDay.week()));
                }
                cells.push(renderer(dayProps, text, currentDate, selected));
                if (cells.length === 8) {
                    rows.push(_react2['default'].createElement(
                        'tr',
                        { onClick: this.handleCellClick.bind(this, currentDate), key: firstDay.format('M_D') },
                        cells
                    ));
                    cells = [];
                }
                firstDay.add(1, 'd');
            }
            return rows;
        }
    }, {
        key: 'choose',
        value: function choose(date) {
            (0, _get3['default'])(WeeksView.prototype.__proto__ || Object.getPrototypeOf(WeeksView.prototype), 'choose', this).call(this, date.startOf('W'));
        }
    }, {
        key: 'getPanelClass',
        value: function getPanelClass() {
            return this.prefixCls + '-week-panel';
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
                    { onClick: this.choose.bind(this, (0, _moment2['default'])()) },
                    (0, _localeContext.$l)('DatePicker', 'this_week')
                )
            );
        }
    }, {
        key: 'getWeekCell',
        value: function getWeekCell(props, text) {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(
                'td',
                props,
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-cell-inner' },
                    'W',
                    text
                )
            );
        }
    }, {
        key: 'getDaysOfWeek',
        value: function getDaysOfWeek() {
            return [_react2['default'].createElement('th', { key: 'null' })].concat((0, _toConsumableArray3['default'])((0, _get3['default'])(WeeksView.prototype.__proto__ || Object.getPrototypeOf(WeeksView.prototype), 'getDaysOfWeek', this).call(this)));
        }
    }]);
    return WeeksView;
}(_DaysView3['default']);

exports['default'] = WeeksView;

WeeksView.displayName = 'WeeksView';
WeeksView.type = "week" /* week */;
module.exports = exports['default'];