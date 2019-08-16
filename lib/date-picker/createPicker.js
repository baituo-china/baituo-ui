'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports['default'] = createPicker;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _interopDefault = require('../_util/interopDefault');

var _interopDefault2 = _interopRequireDefault(_interopDefault);

var _MonthCalendar = require('../rc-components/calendar/MonthCalendar');

var _MonthCalendar2 = _interopRequireDefault(_MonthCalendar);

var _Picker = require('../rc-components/calendar/Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function createPicker(TheCalendar) {
    var _a;
    return _a = function (_Component) {
        (0, _inherits3['default'])(CalenderWrapper, _Component);

        function CalenderWrapper(props) {
            (0, _classCallCheck3['default'])(this, CalenderWrapper);

            var _this = (0, _possibleConstructorReturn3['default'])(this, (CalenderWrapper.__proto__ || Object.getPrototypeOf(CalenderWrapper)).call(this, props));

            _this.renderFooter = function () {
                var renderExtraFooter = _this.props.renderExtraFooter;

                var prefixCls = _this.getPrefixCls();
                return renderExtraFooter ? _react2['default'].createElement(
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
            if (value && !(0, _interopDefault2['default'])(_moment2['default']).isMoment(value)) {
                throw new Error('The value/defaultValue of DatePicker or MonthPicker must be a moment object');
            }
            _this.state = {
                value: value,
                showDate: value,
                focused: false
            };
            return _this;
        }

        (0, _createClass3['default'])(CalenderWrapper, [{
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
                return (0, _configure.getPrefixCls)('calendar', this.props.prefixCls);
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

                var props = (0, _omit2['default'])(this.props, ['onChange']);
                var label = props.label,
                    disabled = props.disabled,
                    pickerInputClass = props.pickerInputClass,
                    locale = props.locale,
                    localeCode = props.localeCode;

                var prefixCls = this.getPrefixCls();
                var placeholder = 'placeholder' in props ? props.placeholder : locale.lang.placeholder;
                var disabledTime = props.showTime ? props.disabledTime : null;
                var calendarClassName = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-time', props.showTime), (0, _defineProperty3['default'])(_classNames, prefixCls + '-month', _MonthCalendar2['default'] === TheCalendar), _classNames));
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
                (0, _warning2['default'])(!('onOK' in props), 'It should be `DatePicker[onOk]` or `MonthPicker[onOk]`, instead of `onOK`!');
                var calendar = _react2['default'].createElement(TheCalendar, (0, _extends3['default'])({}, calendarProps, { disabledDate: props.disabledDate, disabledTime: disabledTime, locale: locale.lang, timePicker: props.timePicker, defaultValue: props.defaultPickerValue || (0, _interopDefault2['default'])(_moment2['default'])(), dateInputPlaceholder: placeholder, prefixCls: prefixCls, className: calendarClassName, onOk: props.onOk, dateRender: props.dateRender, format: props.format, showToday: props.showToday, monthCellContentRender: props.monthCellContentRender, renderFooter: this.renderFooter, onPanelChange: props.onPanelChange, onChange: this.handleCalendarChange, value: showDate }));
                var clearIcon = !props.disabled && props.allowClear && value ? _react2['default'].createElement(_button2['default'], { className: prefixCls + '-picker-clear', onClick: this.clearSelection, shape: 'circle', icon: 'close', size: "small" /* small */ }) : null;
                var suffix = _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-picker-icon-wrapper', onClick: this.onPickerIconClick },
                    clearIcon,
                    _react2['default'].createElement(_icon2['default'], { type: 'date_range', className: prefixCls + '-picker-icon' })
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
                    return _react2['default'].createElement(_input2['default'], (0, _extends3['default'])({}, inputProps, { ref: _this2.saveInput, value: inputValue && inputValue.format(props.format) || '', className: pickerInputClass, readOnly: true }));
                };
                return _react2['default'].createElement(
                    'span',
                    { id: props.id, className: (0, _classnames2['default'])(props.className, props.pickerClass), style: props.style, onFocus: props.onFocus, onBlur: props.onBlur },
                    _react2['default'].createElement(
                        _Picker2['default'],
                        (0, _extends3['default'])({}, props, pickerProps, { onOpenChange: this.handleOpenChange, calendar: calendar, value: value, prefixCls: prefixCls + '-picker-container', style: props.popupStyle, ref: this.savePicker }),
                        input
                    )
                );
            }
        }]);
        return CalenderWrapper;
    }(_react.Component), _a.displayName = 'CalenderWrapper', _a.defaultProps = {
        allowClear: true,
        showToday: true
    }, _a;
}
module.exports = exports['default'];