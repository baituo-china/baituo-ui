import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import omit from 'lodash/omit';
import Button from '../button';
import Icon from '../icon';
import Input from '../input';
import warning from '../_util/warning';
import interopDefault from '../_util/interopDefault';
import MonthCalendar from '../rc-components/calendar/MonthCalendar';
import RcDatePicker from '../rc-components/calendar/Picker';
import { getPrefixCls as _getPrefixCls } from '../configure';
export default function createPicker(TheCalendar) {
    var _a;
    return _a = function (_Component) {
        _inherits(CalenderWrapper, _Component);

        function CalenderWrapper(props) {
            _classCallCheck(this, CalenderWrapper);

            var _this = _possibleConstructorReturn(this, (CalenderWrapper.__proto__ || Object.getPrototypeOf(CalenderWrapper)).call(this, props));

            _this.renderFooter = function () {
                var renderExtraFooter = _this.props.renderExtraFooter;

                var prefixCls = _this.getPrefixCls();
                return renderExtraFooter ? React.createElement(
                    'div',
                    { className: prefixCls + '-footer-extra' },
                    renderExtraFooter.apply(undefined, arguments)
                ) : null;
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
            _this.handleChange = function (value) {
                var props = _this.props;
                if (!('value' in props)) {
                    _this.setState({
                        value: value,
                        showDate: value
                    });
                }
                props.onChange(value, value && value.format(props.format) || '');
            };
            _this.handleCalendarChange = function (value) {
                _this.setState({ showDate: value });
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
                showDate: value,
                focused: false
            };
            return _this;
        }

        _createClass(CalenderWrapper, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if ('value' in nextProps) {
                    this.setState({
                        value: nextProps.value,
                        showDate: nextProps.value
                    });
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
            key: 'getPrefixCls',
            value: function getPrefixCls() {
                return _getPrefixCls('calendar', this.props.prefixCls);
            }
        }, {
            key: 'render',
            value: function render() {
                var _classNames,
                    _this2 = this;

                var _state = this.state,
                    value = _state.value,
                    showDate = _state.showDate,
                    focused = _state.focused;

                var props = omit(this.props, ['onChange']);
                var label = props.label,
                    disabled = props.disabled,
                    pickerInputClass = props.pickerInputClass,
                    locale = props.locale,
                    localeCode = props.localeCode;

                var prefixCls = this.getPrefixCls();
                var placeholder = 'placeholder' in props ? props.placeholder : locale.lang.placeholder;
                var disabledTime = props.showTime ? props.disabledTime : null;
                var calendarClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-time', props.showTime), _defineProperty(_classNames, prefixCls + '-month', MonthCalendar === TheCalendar), _classNames));
                if (value && localeCode) {
                    value.locale(localeCode);
                }
                var pickerProps = {};
                var calendarProps = {};
                if (props.showTime) {
                    calendarProps = {
                        onSelect: this.handleChange
                    };
                } else {
                    pickerProps = {
                        onChange: this.handleChange
                    };
                }
                if ('mode' in props) {
                    calendarProps.mode = props.mode;
                }
                warning(!('onOK' in props), 'It should be `DatePicker[onOk]` or `MonthPicker[onOk]`, instead of `onOK`!');
                var calendar = React.createElement(TheCalendar, _extends({}, calendarProps, { disabledDate: props.disabledDate, disabledTime: disabledTime, locale: locale.lang, timePicker: props.timePicker, defaultValue: props.defaultPickerValue || interopDefault(moment)(), dateInputPlaceholder: placeholder, prefixCls: prefixCls, className: calendarClassName, onOk: props.onOk, dateRender: props.dateRender, format: props.format, showToday: props.showToday, monthCellContentRender: props.monthCellContentRender, renderFooter: this.renderFooter, onPanelChange: props.onPanelChange, onChange: this.handleCalendarChange, value: showDate }));
                var clearIcon = !props.disabled && props.allowClear && value ? React.createElement(Button, { className: prefixCls + '-picker-clear', onClick: this.clearSelection, shape: 'circle', icon: 'close', size: "small" /* small */ }) : null;
                var suffix = React.createElement(
                    'span',
                    { className: prefixCls + '-picker-icon-wrapper', onClick: this.onPickerIconClick },
                    clearIcon,
                    React.createElement(Icon, { type: 'date_range', className: prefixCls + '-picker-icon' })
                );
                var inputProps = {
                    label: label,
                    disabled: disabled,
                    placeholder: placeholder,
                    suffix: suffix,
                    focused: focused
                };
                var input = function input(_ref) {
                    var inputValue = _ref.value;
                    return React.createElement(Input, _extends({}, inputProps, { ref: _this2.saveInput, value: inputValue && inputValue.format(props.format) || '', className: pickerInputClass, readOnly: true }));
                };
                return React.createElement(
                    'span',
                    { id: props.id, className: classNames(props.className, props.pickerClass), style: props.style, onFocus: props.onFocus, onBlur: props.onBlur },
                    React.createElement(
                        RcDatePicker,
                        _extends({}, props, pickerProps, { onOpenChange: this.handleOpenChange, calendar: calendar, value: value, prefixCls: prefixCls + '-picker-container', style: props.popupStyle, ref: this.savePicker }),
                        input
                    )
                );
            }
        }]);

        return CalenderWrapper;
    }(Component), _a.displayName = 'CalenderWrapper', _a.defaultProps = {
        allowClear: true,
        showToday: true
    }, _a;
}