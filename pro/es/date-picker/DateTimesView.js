import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import moment from 'moment';
import DaysView from './DaysView';
import TimesView from './TimesView';
import autobind from '../_util/autobind';
import { getDateFormatByFieldType } from '../data-set/utils';
import { $l } from '../locale-context';

var DateTimesView = function (_DaysView) {
    _inherits(DateTimesView, _DaysView);

    function DateTimesView() {
        _classCallCheck(this, DateTimesView);

        return _possibleConstructorReturn(this, (DateTimesView.__proto__ || Object.getPrototypeOf(DateTimesView)).apply(this, arguments));
    }

    _createClass(DateTimesView, [{
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

            return React.createElement(
                'div',
                { className: prefixCls + '-footer' },
                React.createElement(
                    'a',
                    { className: prefixCls + '-footer-now-btn', onClick: this.choose.bind(this, moment()) },
                    $l('DatePicker', 'now')
                ),
                React.createElement(
                    'a',
                    { className: prefixCls + '-footer-view-select', onClick: this.handleTimeSelect },
                    date.format(getDateFormatByFieldType(TimesView.type))
                )
            );
        }
    }]);

    return DateTimesView;
}(DaysView);

export default DateTimesView;

DateTimesView.displayName = 'DateTimesView';
DateTimesView.type = "dateTime" /* dateTime */;
tslib_1.__decorate([autobind], DateTimesView.prototype, "handleTimeSelect", null);