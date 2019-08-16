'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _DaysView2 = require('./DaysView');

var _DaysView3 = _interopRequireDefault(_DaysView2);

var _TimesView = require('./TimesView');

var _TimesView2 = _interopRequireDefault(_TimesView);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _utils = require('../data-set/utils');

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DateTimesView = function (_DaysView) {
    (0, _inherits3['default'])(DateTimesView, _DaysView);

    function DateTimesView() {
        (0, _classCallCheck3['default'])(this, DateTimesView);
        return (0, _possibleConstructorReturn3['default'])(this, (DateTimesView.__proto__ || Object.getPrototypeOf(DateTimesView)).apply(this, arguments));
    }

    (0, _createClass3['default'])(DateTimesView, [{
        key: 'handleTimeSelect',
        value: function handleTimeSelect() {
            this.changeViewMode("time" /* time */);
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight(e) {
            if (e.altKey) {
                this.changeViewMode("time" /* time */);
            } else {
                this.changeSelectedDate(this.getCloneDate().add(1, 'd'));
            }
        }
    }, {
        key: 'getFirstDay',
        value: function getFirstDay(date) {
            var firstDay = date.clone().subtract(1, 'M');
            var hour = firstDay.hour();
            var minute = firstDay.minute();
            var second = firstDay.second();
            firstDay.date(firstDay.daysInMonth()).startOf('w');
            firstDay.hour(hour);
            firstDay.minute(minute);
            firstDay.second(second);
            return firstDay;
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var prefixCls = this.prefixCls,
                date = this.props.date;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-footer' },
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-footer-now-btn', onClick: this.choose.bind(this, (0, _moment2['default'])()) },
                    (0, _localeContext.$l)('DatePicker', 'now')
                ),
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-footer-view-select', onClick: this.handleTimeSelect },
                    date.format((0, _utils.getDateFormatByFieldType)(_TimesView2['default'].type))
                )
            );
        }
    }]);
    return DateTimesView;
}(_DaysView3['default']);

exports['default'] = DateTimesView;

DateTimesView.displayName = 'DateTimesView';
DateTimesView.type = "dateTime" /* dateTime */;
tslib_1.__decorate([_autobind2['default']], DateTimesView.prototype, "handleTimeSelect", null);
module.exports = exports['default'];