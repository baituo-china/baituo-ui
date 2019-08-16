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

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _interopDefault = require('../_util/interopDefault');

var _interopDefault2 = _interopRequireDefault(_interopDefault);

var _RangeCalendar = require('../rc-components/calendar/RangeCalendar');

var _RangeCalendar2 = _interopRequireDefault(_RangeCalendar);

var _Picker = require('../rc-components/calendar/Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* tslint:disable jsx-no-multiline-js */
function getShowDateFromValue(value) {
    var _value = (0, _slicedToArray3['default'])(value, 2),
        start = _value[0],
        end = _value[1];
    // value could be an empty array, then we should not reset showDate


    if (!start && !end) {
        return;
    }
    var newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
    return [start, newEnd];
}
function formatValue(value, format) {
    return value && value.format(format) || '';
}
function pickerValueAdapter(value) {
    if (!value) {
        return;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [value, value.clone().add(1, 'month')];
}
function isEmptyArray(arr) {
    if (Array.isArray(arr)) {
        return arr.length === 0 || arr.every(function (i) {
            return !i;
        });
    }
    return false;
}
function fixLocale(value, localeCode) {
    if (!localeCode) {
        return;
    }
    if (!value || value.length === 0) {
        return;
    }
    if (value[0]) {
        value[0].locale(localeCode);
    }
    if (value[1]) {
        value[1].locale(localeCode);
    }
}

var RangePicker = function (_Component) {
    (0, _inherits3['default'])(RangePicker, _Component);

    function RangePicker(props) {
        (0, _classCallCheck3['default'])(this, RangePicker);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (RangePicker.__proto__ || Object.getPrototypeOf(RangePicker)).call(this, props));

        _this.clearSelection = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.setState({ value: [] });
            _this.handleChange([]);
        };
        _this.clearHoverValue = function () {
            return _this.setState({ hoverValue: [] });
        };
        _this.handleChange = function (value) {
            var props = _this.props;
            if (!('value' in props)) {
                _this.setState(function (_ref) {
                    var showDate = _ref.showDate;
                    return {
                        value: value,
                        showDate: getShowDateFromValue(value) || showDate
                    };
                });
            }
            props.onChange(value, [formatValue(value[0], props.format), formatValue(value[1], props.format)]);
        };
        _this.handleOpenChange = function (open) {
            if (!('open' in _this.props)) {
                _this.setState({ open: open });
            }
            if (open === false) {
                _this.clearHoverValue();
            }
            var onOpenChange = _this.props.onOpenChange;

            if (onOpenChange) {
                onOpenChange(open);
            }
        };
        _this.handleShowDateChange = function (showDate) {
            return _this.setState({ showDate: showDate });
        };
        _this.handleHoverChange = function (hoverValue) {
            return _this.setState({ hoverValue: hoverValue });
        };
        _this.handleRangeMouseLeave = function () {
            if (_this.state.open) {
                _this.clearHoverValue();
            }
        };
        _this.handleCalendarInputSelect = function (value) {
            if (!value[0]) {
                return;
            }
            _this.setState(function (_ref2) {
                var showDate = _ref2.showDate;
                return {
                    value: value,
                    showDate: getShowDateFromValue(value) || showDate
                };
            });
        };
        _this.handleRangeClick = function (value) {
            if (typeof value === 'function') {
                value = value();
            }
            _this.setValue(value, true);
            var onOk = _this.props.onOk;

            if (onOk) {
                onOk(value);
            }
        };
        _this.savePicker = function (node) {
            _this.picker = node;
        };
        _this.renderFooter = function () {
            var _this$props = _this.props,
                ranges = _this$props.ranges,
                renderExtraFooter = _this$props.renderExtraFooter;

            var prefixCls = _this.getPrefixCls();
            if (!ranges && !renderExtraFooter) {
                return null;
            }
            var customFooter = renderExtraFooter ? _react2['default'].createElement(
                'div',
                { className: prefixCls + '-footer-extra', key: 'extra' },
                renderExtraFooter.apply(undefined, arguments)
            ) : null;
            var operations = Object.keys(ranges || {}).map(function (range) {
                var value = ranges[range];
                return _react2['default'].createElement(
                    'a',
                    { key: range, onClick: function onClick() {
                            return _this.handleRangeClick(value);
                        }, onMouseEnter: function onMouseEnter() {
                            return _this.setState({ hoverValue: value });
                        }, onMouseLeave: _this.handleRangeMouseLeave },
                    range
                );
            });
            var rangeNode = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-footer-extra ' + prefixCls + '-range-quick-selector', key: 'range' },
                operations
            );
            return [rangeNode, customFooter];
        };
        var value = props.value || props.defaultValue || [];
        if (value[0] && !(0, _interopDefault2['default'])(_moment2['default']).isMoment(value[0]) || value[1] && !(0, _interopDefault2['default'])(_moment2['default']).isMoment(value[1])) {
            throw new Error('The value/defaultValue of RangePicker must be a moment object array');
        }
        var pickerValue = !value || isEmptyArray(value) ? props.defaultPickerValue : value;
        _this.state = {
            value: value,
            showDate: pickerValueAdapter(pickerValue || (0, _interopDefault2['default'])(_moment2['default'])()),
            open: props.open,
            hoverValue: []
        };
        return _this;
    }

    (0, _createClass3['default'])(RangePicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                var state = this.state;
                var value = nextProps.value || [];
                this.setState({
                    value: value,
                    showDate: getShowDateFromValue(value) || state.showDate
                });
            }
            if ('open' in nextProps) {
                this.setState({
                    open: nextProps.open
                });
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value, hidePanel) {
            this.handleChange(value);
            if ((hidePanel || !this.props.showTime) && !('open' in this.props)) {
                this.setState({ open: false });
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.picker.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.picker.blur();
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

            var state = this.state,
                props = this.props;
            var value = state.value,
                showDate = state.showDate,
                hoverValue = state.hoverValue,
                open = state.open;
            var popupStyle = props.popupStyle,
                style = props.style,
                disabledDate = props.disabledDate,
                disabledTime = props.disabledTime,
                showTime = props.showTime,
                showToday = props.showToday,
                ranges = props.ranges,
                onOk = props.onOk,
                locale = props.locale,
                localeCode = props.localeCode,
                format = props.format,
                dateRender = props.dateRender,
                onCalendarChange = props.onCalendarChange;

            fixLocale(value, localeCode);
            fixLocale(showDate, localeCode);
            (0, _warning2['default'])(!('onOK' in props), 'It should be `RangePicker[onOk]`, instead of `onOK`!');
            var prefixCls = this.getPrefixCls();
            var calendarClassName = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-time', showTime), (0, _defineProperty3['default'])(_classNames, prefixCls + '-range-with-ranges', ranges), _classNames));
            // 需要选择时间时，点击 ok 时才触发 onChange
            var pickerChangeHandler = {
                onChange: this.handleChange
            };
            var calendarProps = {
                onOk: this.handleChange
            };
            if (props.timePicker) {
                pickerChangeHandler.onChange = function (changedValue) {
                    return _this2.handleChange(changedValue);
                };
            } else {
                calendarProps = {};
            }
            if ('mode' in props) {
                calendarProps.mode = props.mode;
            }
            var startPlaceholder = 'placeholder' in props ? props.placeholder[0] : locale.lang.rangePlaceholder[0];
            var endPlaceholder = 'placeholder' in props ? props.placeholder[1] : locale.lang.rangePlaceholder[1];
            var calendar = _react2['default'].createElement(_RangeCalendar2['default'], (0, _extends3['default'])({}, calendarProps, { onChange: onCalendarChange, format: format, prefixCls: prefixCls, className: calendarClassName, renderFooter: this.renderFooter, timePicker: props.timePicker, disabledDate: disabledDate, disabledTime: disabledTime, dateInputPlaceholder: [startPlaceholder, endPlaceholder], locale: locale.lang, onOk: onOk, dateRender: dateRender, value: showDate, onValueChange: this.handleShowDateChange, hoverValue: hoverValue, onHoverChange: this.handleHoverChange, onPanelChange: props.onPanelChange, showToday: showToday, onInputSelect: this.handleCalendarInputSelect }));
            // default width for showTime
            var pickerStyle = {};
            if (props.showTime) {
                pickerStyle.width = style && style.width || 350;
            }
            var clearIcon = !props.disabled && props.allowClear && value && (value[0] || value[1]) ? _react2['default'].createElement(_button2['default'], { shape: 'circle', size: "small" /* small */, onClick: this.clearSelection, className: prefixCls + '-picker-clear', icon: 'close' }) : null;
            var input = function input(_ref3) {
                var inputValue = _ref3.value;

                var start = inputValue[0];
                var end = inputValue[1];
                return _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-range-picker ' + props.pickerWrapperInputClass },
                    _react2['default'].createElement(
                        'span',
                        { className: props.pickerInputClass },
                        _react2['default'].createElement('input', { disabled: props.disabled, readOnly: true, value: start && start.format(props.format) || '', placeholder: startPlaceholder, className: prefixCls + '-range-picker-input', tabIndex: -1 }),
                        _react2['default'].createElement(
                            'span',
                            { className: prefixCls + '-range-picker-separator' },
                            ' ~ '
                        ),
                        _react2['default'].createElement('input', { disabled: props.disabled, readOnly: true, value: end && end.format(props.format) || '', placeholder: endPlaceholder, className: prefixCls + '-range-picker-input', tabIndex: -1 }),
                        clearIcon,
                        _react2['default'].createElement(
                            'span',
                            { className: props.inputPrefixCls + '-suffix' },
                            _react2['default'].createElement(_icon2['default'], { type: 'date_range', className: prefixCls + '-picker-icon' })
                        )
                    )
                );
            };
            return _react2['default'].createElement(
                'span',
                { ref: this.savePicker, id: props.id, className: (0, _classnames2['default'])(props.className, props.pickerClass), style: (0, _extends3['default'])({}, style, pickerStyle), tabIndex: props.disabled ? -1 : 0, onFocus: props.onFocus, onBlur: props.onBlur },
                _react2['default'].createElement(
                    _Picker2['default'],
                    (0, _extends3['default'])({}, props, pickerChangeHandler, { calendar: calendar, value: value, open: open, onOpenChange: this.handleOpenChange, prefixCls: prefixCls + '-picker-container', style: popupStyle }),
                    input
                )
            );
        }
    }]);
    return RangePicker;
}(_react.Component);

exports['default'] = RangePicker;

RangePicker.displayName = 'RangePicker';
RangePicker.defaultProps = {
    allowClear: true,
    showToday: false
};
module.exports = exports['default'];