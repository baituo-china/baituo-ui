'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

exports['default'] = wrapPicker;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _timePicker = require('../time-picker');

var _en_US = require('./locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _Panel = require('../rc-components/time-picker/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getColumns(_ref) {
    var showHour = _ref.showHour,
        showMinute = _ref.showMinute,
        showSecond = _ref.showSecond,
        use12Hours = _ref.use12Hours;

    var column = 0;
    if (showHour) {
        column += 1;
    }
    if (showMinute) {
        column += 1;
    }
    if (showSecond) {
        column += 1;
    }
    if (use12Hours) {
        column += 1;
    }
    return column;
}
function wrapPicker(Picker, defaultFormat) {
    var _a;
    return _a = function (_Component) {
        (0, _inherits3['default'])(PickerWrapper, _Component);

        function PickerWrapper() {
            (0, _classCallCheck3['default'])(this, PickerWrapper);

            var _this = (0, _possibleConstructorReturn3['default'])(this, (PickerWrapper.__proto__ || Object.getPrototypeOf(PickerWrapper)).apply(this, arguments));

            _this.handleOpenChange = function (open) {
                var onOpenChange = _this.props.onOpenChange;

                onOpenChange(open);
            };
            _this.handleFocus = function (e) {
                var onFocus = _this.props.onFocus;

                if (onFocus) {
                    onFocus(e);
                }
            };
            _this.handleBlur = function (e) {
                var onBlur = _this.props.onBlur;

                if (onBlur) {
                    onBlur(e);
                }
            };
            _this.savePicker = function (node) {
                _this.picker = node;
            };
            _this.getDefaultLocale = function () {
                var result = (0, _extends3['default'])({}, _en_US2['default'], _this.props.locale);
                result.lang = (0, _extends3['default'])({}, result.lang, (_this.props.locale || {}).lang);
                return result;
            };
            _this.renderPicker = function (locale, localeCode) {
                var _classNames2, _classNames3;

                var props = _this.props;
                var prefixCls = props.prefixCls,
                    inputPrefixCls = props.inputPrefixCls;

                var pickerClass = (0, _classnames2['default'])(prefixCls + '-picker', (0, _defineProperty3['default'])({}, prefixCls + '-picker-' + props.size, !!props.size));
                var pickerInputClass = (0, _classnames2['default'])(prefixCls + '-picker-input', inputPrefixCls, (_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, inputPrefixCls + '-lg', props.size === "large"), (0, _defineProperty3['default'])(_classNames2, inputPrefixCls + '-sm', props.size === "small"), (0, _defineProperty3['default'])(_classNames2, inputPrefixCls + '-disabled', props.disabled), _classNames2));
                var pickerWrapperInputClass = (0, _classnames2['default'])(inputPrefixCls + '-wrapper', (_classNames3 = {}, (0, _defineProperty3['default'])(_classNames3, inputPrefixCls + '-disabled', props.disabled), (0, _defineProperty3['default'])(_classNames3, inputPrefixCls + '-has-border', props.border), _classNames3));
                var timeFormat = props.showTime && props.showTime.format || 'HH:mm:ss';
                var rcTimePickerProps = (0, _extends3['default'])({}, (0, _timePicker.generateShowHourMinuteSecond)(timeFormat), {
                    format: timeFormat,
                    use12Hours: props.showTime && props.showTime.use12Hours
                });
                var columns = getColumns(rcTimePickerProps);
                var timePickerCls = prefixCls + '-time-picker-column-' + columns;
                var timePicker = props.showTime ? _react2['default'].createElement(_Panel2['default'], (0, _extends3['default'])({}, rcTimePickerProps, props.showTime, { prefixCls: prefixCls + '-time-picker', className: timePickerCls, placeholder: locale.timePickerLocale.placeholder, transitionName: 'slide-up' })) : null;
                return _react2['default'].createElement(Picker, (0, _extends3['default'])({}, props, { ref: _this.savePicker, pickerClass: pickerClass, pickerInputClass: pickerInputClass, pickerWrapperInputClass: pickerWrapperInputClass, locale: locale, localeCode: localeCode, timePicker: timePicker, onOpenChange: _this.handleOpenChange, onFocus: _this.handleFocus, onBlur: _this.handleBlur }));
            };
            return _this;
        }

        (0, _createClass3['default'])(PickerWrapper, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _props = this.props,
                    autoFocus = _props.autoFocus,
                    disabled = _props.disabled;

                if (autoFocus && !disabled) {
                    this.focus();
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
            key: 'render',
            value: function render() {
                return _react2['default'].createElement(
                    _LocaleReceiver2['default'],
                    { componentName: 'DatePicker', defaultLocale: this.getDefaultLocale },
                    this.renderPicker
                );
            }
        }]);
        return PickerWrapper;
    }(_react.Component), _a.displayName = 'PickerWrapper', _a.defaultProps = {
        format: defaultFormat || 'YYYY-MM-DD',
        transitionName: 'slide-up',
        popupStyle: {},
        onChange: function onChange() {},
        onOk: function onOk() {},
        onOpenChange: function onOpenChange() {},

        locale: {},
        prefixCls: (0, _configure.getPrefixCls)('calendar'),
        inputPrefixCls: (0, _configure.getPrefixCls)('input'),
        border: true
    }, _a;
}
module.exports = exports['default'];