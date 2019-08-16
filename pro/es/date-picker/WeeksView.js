import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import DaysView from './DaysView';
import { $l } from '../locale-context';

var WeeksView = function (_DaysView) {
    _inherits(WeeksView, _DaysView);

    function WeeksView() {
        _classCallCheck(this, WeeksView);

        return _possibleConstructorReturn(this, (WeeksView.__proto__ || Object.getPrototypeOf(WeeksView)).apply(this, arguments));
    }

    _createClass(WeeksView, [{
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
                var className = classNames(prefixCls + '-cell', _defineProperty({}, prefixCls + '-selected', firstDay.isSame(selected, 'w')));
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
                    rows.push(React.createElement(
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
            _get(WeeksView.prototype.__proto__ || Object.getPrototypeOf(WeeksView.prototype), 'choose', this).call(this, date.startOf('W'));
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

            return React.createElement(
                'div',
                { className: prefixCls + '-footer' },
                React.createElement(
                    'a',
                    { onClick: this.choose.bind(this, moment()) },
                    $l('DatePicker', 'this_week')
                )
            );
        }
    }, {
        key: 'getWeekCell',
        value: function getWeekCell(props, text) {
            var prefixCls = this.prefixCls;

            return React.createElement(
                'td',
                props,
                React.createElement(
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
            return [React.createElement('th', { key: 'null' })].concat(_toConsumableArray(_get(WeeksView.prototype.__proto__ || Object.getPrototypeOf(WeeksView.prototype), 'getDaysOfWeek', this).call(this)));
        }
    }]);

    return WeeksView;
}(DaysView);

export default WeeksView;

WeeksView.displayName = 'WeeksView';
WeeksView.type = "week" /* week */;