import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import _defineProperty from 'babel-runtime/helpers/defineProperty';

var _viewComponents;

import * as tslib_1 from "tslib";
import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import moment, { isMoment } from 'moment';
import isString from 'lodash/isString';
import omit from 'lodash/omit';
import { observer } from 'mobx-react';
import { action, computed, observable, runInAction } from 'mobx';
import KeyCode from '../../../es/_util/KeyCode';
import noop from 'lodash/noop';
import TriggerField from '../trigger-field/TriggerField';
import DaysView from './DaysView';
import DateTimesView from './DateTimesView';
import WeeksView from './WeeksView';
import TimesView from './TimesView';
import MonthsView from './MonthsView';
import YearsView from './YearsView';
import DecadeYearsView from './DecadeYearsView';
import autobind from '../_util/autobind';
import { stopEvent } from '../_util/EventManager';
import warning from '../../../es/_util/warning';
import { $l } from '../locale-context';
var viewComponents = (_viewComponents = {}, _defineProperty(_viewComponents, "decade" /* decade */, DecadeYearsView), _defineProperty(_viewComponents, "year" /* year */, YearsView), _defineProperty(_viewComponents, "month" /* month */, MonthsView), _defineProperty(_viewComponents, "date" /* date */, DaysView), _defineProperty(_viewComponents, "dateTime" /* dateTime */, DateTimesView), _defineProperty(_viewComponents, "week" /* week */, WeeksView), _defineProperty(_viewComponents, "time" /* time */, TimesView), _viewComponents);
var DatePicker = function (_TriggerField) {
    _inherits(DatePicker, _TriggerField);

    function DatePicker() {
        _classCallCheck(this, DatePicker);

        return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));
    }

    _createClass(DatePicker, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(DatePicker.prototype.__proto__ || Object.getPrototypeOf(DatePicker.prototype), 'getOtherProps', this).call(this), ['mode', 'filter', 'cellRenderer']);
        }
    }, {
        key: 'getDefaultViewMode',
        value: function getDefaultViewMode() {
            var mode = this.props.mode;

            if (mode === "decade" /* decade */ || mode === void 0) {
                return "date" /* date */;
            }
            return mode;
        }
    }, {
        key: 'getEditor',
        value: function getEditor() {
            return React.createElement('input', _extends({}, this.getOtherProps(), { placeholder: this.hasFloatLabel ? void 0 : this.getPlaceholder(), value: this.getText() || '', readOnly: !this.editable }));
        }
    }, {
        key: 'getPopupContent',
        value: function getPopupContent() {
            var _this2 = this;

            var mode = this.getViewMode();
            return createElement(viewComponents[mode], {
                ref: function ref(node) {
                    return _this2.view = node;
                },
                date: this.getSelectedDate(),
                mode: this.getDefaultViewMode(),
                renderer: this.getCellRenderer(mode),
                onSelect: this.handleSelect,
                onSelectedDateChange: this.handleSelectedDateChange,
                onViewModeChange: this.handelViewModeChange,
                isValidDate: this.isValidDate
            });
        }
    }, {
        key: 'getCellRenderer',
        value: function getCellRenderer(mode) {
            var _props$cellRenderer = this.props.cellRenderer,
                cellRenderer = _props$cellRenderer === undefined ? noop : _props$cellRenderer;

            return cellRenderer(mode);
        }
    }, {
        key: 'getTriggerIconFont',
        value: function getTriggerIconFont() {
            return 'date_range';
        }
    }, {
        key: 'getFieldType',
        value: function getFieldType() {
            return viewComponents[this.getDefaultViewMode()].type;
        }
    }, {
        key: 'getViewMode',
        value: function getViewMode() {
            var _mode = this.mode,
                mode = _mode === undefined ? this.getDefaultViewMode() : _mode;

            return mode;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var value = _get(DatePicker.prototype.__proto__ || Object.getPrototypeOf(DatePicker.prototype), 'getValue', this).call(this);
            if (value) {
                if (!isMoment(value)) {
                    var fieldMsg = this.record ? ' Please check the field<' + this.props.name + '> of DataSet.' : '';
                    warning(false, 'DatePicker: The value of DatePicker is not moment.' + fieldMsg);
                    return moment(value, this.getDateFormat());
                }
            }
            return value;
        }
    }, {
        key: 'getSelectedDate',
        value: function getSelectedDate() {
            var _selectedDate = this.selectedDate,
                selectedDate = _selectedDate === undefined ? this.getValue() || this.getValidDate(moment().startOf('d')) : _selectedDate;

            return selectedDate.clone();
        }
    }, {
        key: 'getLimit',
        value: function getLimit(type) {
            var limit = this.getProp(type);
            if (limit !== void 0) {
                var record = this.record;

                if (record && isString(limit) && record.getField(limit)) {
                    return record.get(limit);
                }
                return moment(limit);
            }
        }
    }, {
        key: 'getPopupStyleFromAlign',
        value: function getPopupStyleFromAlign() {
            return;
        }
    }, {
        key: 'handleSelectedDateChange',
        value: function handleSelectedDateChange(selectedDate, mode) {
            if (this.isUnderRange(selectedDate, mode)) {
                this.changeSelectedDate(selectedDate);
            }
        }
    }, {
        key: 'handelViewModeChange',
        value: function handelViewModeChange(mode) {
            var _this3 = this;

            runInAction(function () {
                _this3.mode = mode;
            });
        }
    }, {
        key: 'handlePopupAnimateAppear',
        value: function handlePopupAnimateAppear() {}
    }, {
        key: 'handlePopupAnimateEnd',
        value: function handlePopupAnimateEnd(key, exists) {
            var _this4 = this;

            if (!exists && key === 'align') {
                runInAction(function () {
                    _this4.selectedDate = void 0;
                    _this4.mode = void 0;
                });
            }
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(date) {
            this.choose(date);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (!this.isDisabled() && !this.isReadOnly()) {
                var el = this.popup ? this.view || this : this;
                switch (e.keyCode) {
                    case KeyCode.RIGHT:
                        stopEvent(e);
                        el.handleKeyDownRight(e);
                        break;
                    case KeyCode.LEFT:
                        stopEvent(e);
                        el.handleKeyDownLeft(e);
                        break;
                    case KeyCode.DOWN:
                        stopEvent(e);
                        el.handleKeyDownDown(e);
                        break;
                    case KeyCode.UP:
                        stopEvent(e);
                        el.handleKeyDownUp(e);
                        break;
                    case KeyCode.END:
                        stopEvent(e);
                        el.handleKeyDownEnd(e);
                        break;
                    case KeyCode.HOME:
                        stopEvent(e);
                        el.handleKeyDownHome(e);
                        break;
                    case KeyCode.PAGE_UP:
                        stopEvent(e);
                        el.handleKeyDownPageUp(e);
                        break;
                    case KeyCode.PAGE_DOWN:
                        stopEvent(e);
                        el.handleKeyDownPageDown(e);
                        break;
                    case KeyCode.ENTER:
                        if (this.popup) {
                            e.preventDefault();
                        }
                        el.handleKeyDownEnter(e);
                        break;
                    case KeyCode.TAB:
                        this.handleKeyDownTab();
                        break;
                    case KeyCode.ESC:
                        this.handleKeyDownEsc(e);
                        break;
                    case KeyCode.SPACE:
                        this.handleKeyDownSpace(e);
                        break;
                    default:
                }
            }
            _get(DatePicker.prototype.__proto__ || Object.getPrototypeOf(DatePicker.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleKeyDownHome',
        value: function handleKeyDownHome() {
            this.choose(this.getSelectedDate().startOf('M'));
        }
    }, {
        key: 'handleKeyDownEnd',
        value: function handleKeyDownEnd() {
            this.choose(this.getSelectedDate().endOf('M'));
        }
    }, {
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft() {
            this.choose(this.getSelectedDate().subtract(1, 'd'));
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight() {
            this.choose(this.getSelectedDate().add(1, 'd'));
        }
    }, {
        key: 'handleKeyDownUp',
        value: function handleKeyDownUp() {
            this.choose(this.getSelectedDate().subtract(1, 'w'));
        }
    }, {
        key: 'handleKeyDownDown',
        value: function handleKeyDownDown() {
            this.choose(this.getSelectedDate().add(1, 'w'));
        }
    }, {
        key: 'handleKeyDownPageUp',
        value: function handleKeyDownPageUp(e) {
            this.choose(this.getSelectedDate().subtract(1, e.altKey ? 'y' : 'M'));
        }
    }, {
        key: 'handleKeyDownPageDown',
        value: function handleKeyDownPageDown(e) {
            this.choose(this.getSelectedDate().add(1, e.altKey ? 'y' : 'M'));
        }
    }, {
        key: 'handleKeyDownEnter',
        value: function handleKeyDownEnter() {
            this.choose(this.getSelectedDate());
        }
    }, {
        key: 'handleKeyDownEsc',
        value: function handleKeyDownEsc(e) {
            if (this.popup) {
                e.preventDefault();
                this.collapse();
            }
        }
    }, {
        key: 'handleKeyDownTab',
        value: function handleKeyDownTab() {
            this.collapse();
        }
    }, {
        key: 'handleKeyDownSpace',
        value: function handleKeyDownSpace(e) {
            e.preventDefault();
            if (!this.popup) {
                this.expand();
            }
        }
    }, {
        key: 'changeSelectedDate',
        value: function changeSelectedDate(selectedDate) {
            this.selectedDate = this.getValidDate(selectedDate);
        }
    }, {
        key: 'choose',
        value: function choose(date) {
            date = this.getValidDate(date);
            this.setValue(date);
            this.changeSelectedDate(date);
            this.collapse();
        }
    }, {
        key: 'getValidDate',
        value: function getValidDate(date) {
            var min = this.min,
                max = this.max;

            if (min && date.isBefore(min)) {
                date = min;
            } else if (max && date.isAfter(max)) {
                date = max;
            }
            return date;
        }
    }, {
        key: 'isUnderRange',
        value: function isUnderRange(date, mode) {
            var min = this.min,
                max = this.max;

            if (min || max) {
                var start = (min || date).clone();
                var end = (max || date).clone();
                switch (mode || this.getViewMode()) {
                    case "month" /* month */:
                        start = start.startOf('M');
                        end = end.endOf('M');
                        break;
                    case "year" /* year */:
                        start = start.startOf('y');
                        end = end.endOf('y');
                        break;
                    case "decade" /* decade */:
                        start = start.startOf('y').subtract(start.year() % 10, 'y');
                        end = end.endOf('y').add(9 - end.year() % 10, 'y');
                    case "dateTime" /* dateTime */:
                        start = start.startOf('d');
                        end = end.endOf('d');
                    default:
                }
                return date.isBetween(start, end, void 0, '[]');
            }
            return true;
        }
    }, {
        key: 'isValidDate',
        value: function isValidDate(currentDate, selected) {
            var filter = this.props.filter;

            var isValid = this.isUnderRange(currentDate);
            if (isValid && filter) {
                return filter(currentDate, selected);
            }
            return isValid;
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: $l('DatePicker', label ? 'value_missing_with_label' : 'value_missing', { label: label })
            };
        }
    }, {
        key: 'editable',
        get: function get() {
            return false;
        }
    }, {
        key: 'min',
        get: function get() {
            return this.getLimit('min');
        }
    }, {
        key: 'max',
        get: function get() {
            return this.getLimit('max');
        }
    }]);

    return DatePicker;
}(TriggerField);
DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = _extends({
    /**
     * 日期格式，如 `YYYY-MM-DD HH:mm:ss`
     */
    format: PropTypes.string,
    /**
     * 显示模式date|dateTime|time|year|month|week
     */
    mode: PropTypes.string,
    /**
     * 单元格渲染
     */
    cellRenderer: PropTypes.func,
    /**
     * 日期过滤
     */
    filter: PropTypes.func,
    /**
     * 最小日期
     */
    min: PropTypes.any,
    /**
     * 最大日期
     */
    max: PropTypes.any
}, TriggerField.propTypes);
DatePicker.defaultProps = _extends({}, TriggerField.defaultProps, {
    suffixCls: 'calendar-picker',
    mode: "date" /* date */
});
tslib_1.__decorate([computed], DatePicker.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([computed], DatePicker.prototype, "editable", null);
tslib_1.__decorate([observable], DatePicker.prototype, "selectedDate", void 0);
tslib_1.__decorate([observable], DatePicker.prototype, "mode", void 0);
tslib_1.__decorate([autobind], DatePicker.prototype, "handleSelectedDateChange", null);
tslib_1.__decorate([autobind], DatePicker.prototype, "handelViewModeChange", null);
tslib_1.__decorate([autobind], DatePicker.prototype, "handlePopupAnimateEnd", null);
tslib_1.__decorate([autobind], DatePicker.prototype, "handleSelect", null);
tslib_1.__decorate([autobind], DatePicker.prototype, "handleKeyDown", null);
tslib_1.__decorate([action], DatePicker.prototype, "changeSelectedDate", null);
tslib_1.__decorate([autobind], DatePicker.prototype, "isUnderRange", null);
tslib_1.__decorate([autobind], DatePicker.prototype, "isValidDate", null);
DatePicker = tslib_1.__decorate([observer], DatePicker);
export default DatePicker;