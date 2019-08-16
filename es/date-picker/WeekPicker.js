import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Icon from '../icon';
import Input from '../input';
import Button from '../button';
import interopDefault from '../_util/interopDefault';
import Calendar from '../rc-components/calendar';
import RcDatePicker from '../rc-components/calendar/Picker';
function formatValue(value, format) {
    return value && value.format(format) || '';
}

var WeekPicker = function (_Component) {
    _inherits(WeekPicker, _Component);

    function WeekPicker(props) {
        _classCallCheck(this, WeekPicker);

        var _this = _possibleConstructorReturn(this, (WeekPicker.__proto__ || Object.getPrototypeOf(WeekPicker)).call(this, props));

        _this.weekDateRender = function (current) {
            var selectedValue = _this.state.value;
            var prefixCls = _this.props.prefixCls;

            if (selectedValue && current.year() === selectedValue.year() && current.week() === selectedValue.week()) {
                return React.createElement(
                    'div',
                    { className: prefixCls + '-selected-day' },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-date' },
                        current.date()
                    )
                );
            }
            return React.createElement(
                'div',
                { className: prefixCls + '-calendar-date' },
                current.date()
            );
        };
        _this.handleOpenChange = function (status) {
            var onOpenChange = _this.props.onOpenChange;
            var focused = _this.state.focused;

            if (status !== focused) {
                _this.setState({
                    focused: status
                });
            }
            if (onOpenChange) {
                onOpenChange(status);
            }
        };
        _this.handleChange = function (value) {
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            _this.props.onChange(value, formatValue(value, _this.props.format));
        };
        _this.clearSelection = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.handleChange(null);
        };
        _this.onPickerIconClick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var focused = _this.state.focused;

            _this.picker.setOpen(!focused);
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        _this.savePicker = function (node) {
            _this.picker = node;
        };
        var value = props.value || props.defaultValue;
        if (value && !interopDefault(moment).isMoment(value)) {
            throw new Error('The value/defaultValue of DatePicker or MonthPicker must be a moment object');
        }
        _this.state = {
            value: value,
            focused: false
        };
        return _this;
    }

    _createClass(WeekPicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({ value: nextProps.value });
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var focused = this.state.focused;
            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                disabled = _props.disabled,
                pickerClass = _props.pickerClass,
                popupStyle = _props.popupStyle,
                pickerInputClass = _props.pickerInputClass,
                format = _props.format,
                allowClear = _props.allowClear,
                locale = _props.locale,
                localeCode = _props.localeCode,
                disabledDate = _props.disabledDate,
                style = _props.style,
                onFocus = _props.onFocus,
                onBlur = _props.onBlur,
                label = _props.label;

            var pickerValue = this.state.value;
            if (pickerValue && localeCode) {
                pickerValue.locale(localeCode);
            }
            var placeholder = 'placeholder' in this.props ? this.props.placeholder : locale.lang.placeholder;
            var calendar = React.createElement(Calendar, { showWeekNumber: true, dateRender: this.weekDateRender, prefixCls: prefixCls, format: format, locale: locale.lang, showDateInput: false, showToday: false, disabledDate: disabledDate });
            var clearIcon = !disabled && allowClear && this.state.value ? React.createElement(Button, { className: prefixCls + '-picker-clear', onClick: this.clearSelection, shape: 'circle', icon: 'close', size: "small" /* small */ }) : null;
            var suffix = React.createElement(
                'span',
                { className: prefixCls + '-picker-icon-wrapper', onClick: this.onPickerIconClick },
                clearIcon,
                React.createElement(Icon, { type: 'date_range', className: prefixCls + '-picker-icon' })
            );
            var input = function input(_ref) {
                var value = _ref.value;
                return React.createElement(Input, { ref: _this2.saveInput, disabled: disabled, readOnly: true, value: value && value.format(format) || '', placeholder: placeholder, className: pickerInputClass, onFocus: onFocus, onBlur: onBlur, style: style, suffix: suffix, label: label, focused: focused });
            };
            return React.createElement(
                'span',
                { className: classNames(className, pickerClass), id: this.props.id },
                React.createElement(
                    RcDatePicker,
                    _extends({}, this.props, { calendar: calendar, prefixCls: prefixCls + '-picker-container', value: pickerValue, onChange: this.handleChange, onOpenChange: this.handleOpenChange, style: popupStyle, ref: this.savePicker }),
                    input
                )
            );
        }
    }]);

    return WeekPicker;
}(Component);

export default WeekPicker;

WeekPicker.defaultProps = {
    format: 'gggg-wo',
    allowClear: true
};