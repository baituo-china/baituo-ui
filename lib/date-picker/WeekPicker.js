'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _interopDefault = require('../_util/interopDefault');

var _interopDefault2 = _interopRequireDefault(_interopDefault);

var _calendar = require('../rc-components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _Picker = require('../rc-components/calendar/Picker');

var _Picker2 = _interopRequireDefault(_Picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function formatValue(value, format) {
    return value && value.format(format) || '';
}

var WeekPicker = function (_Component) {
    (0, _inherits3['default'])(WeekPicker, _Component);

    function WeekPicker(props) {
        (0, _classCallCheck3['default'])(this, WeekPicker);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (WeekPicker.__proto__ || Object.getPrototypeOf(WeekPicker)).call(this, props));

        _this.weekDateRender = function (current) {
            var selectedValue = _this.state.value;
            var prefixCls = _this.props.prefixCls;

            if (selectedValue && current.year() === selectedValue.year() && current.week() === selectedValue.week()) {
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-selected-day' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-date' },
                        current.date()
                    )
                );
            }
            return _react2['default'].createElement(
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
        if (value && !(0, _interopDefault2['default'])(_moment2['default']).isMoment(value)) {
            throw new Error('The value/defaultValue of DatePicker or MonthPicker must be a moment object');
        }
        _this.state = {
            value: value,
            focused: false
        };
        return _this;
    }

    (0, _createClass3['default'])(WeekPicker, [{
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
            var calendar = _react2['default'].createElement(_calendar2['default'], { showWeekNumber: true, dateRender: this.weekDateRender, prefixCls: prefixCls, format: format, locale: locale.lang, showDateInput: false, showToday: false, disabledDate: disabledDate });
            var clearIcon = !disabled && allowClear && this.state.value ? _react2['default'].createElement(_button2['default'], { className: prefixCls + '-picker-clear', onClick: this.clearSelection, shape: 'circle', icon: 'close', size: "small" /* small */ }) : null;
            var suffix = _react2['default'].createElement(
                'span',
                { className: prefixCls + '-picker-icon-wrapper', onClick: this.onPickerIconClick },
                clearIcon,
                _react2['default'].createElement(_icon2['default'], { type: 'date_range', className: prefixCls + '-picker-icon' })
            );
            var input = function input(_ref) {
                var value = _ref.value;
                return _react2['default'].createElement(_input2['default'], { ref: _this2.saveInput, disabled: disabled, readOnly: true, value: value && value.format(format) || '', placeholder: placeholder, className: pickerInputClass, onFocus: onFocus, onBlur: onBlur, style: style, suffix: suffix, label: label, focused: focused });
            };
            return _react2['default'].createElement(
                'span',
                { className: (0, _classnames2['default'])(className, pickerClass), id: this.props.id },
                _react2['default'].createElement(
                    _Picker2['default'],
                    (0, _extends3['default'])({}, this.props, { calendar: calendar, prefixCls: prefixCls + '-picker-container', value: pickerValue, onChange: this.handleChange, onOpenChange: this.handleOpenChange, style: popupStyle, ref: this.savePicker }),
                    input
                )
            );
        }
    }]);
    return WeekPicker;
}(_react.Component);

exports['default'] = WeekPicker;

WeekPicker.defaultProps = {
    format: 'gggg-wo',
    allowClear: true
};
module.exports = exports['default'];