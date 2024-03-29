'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _interopDefault = require('../_util/interopDefault');

var _interopDefault2 = _interopRequireDefault(_interopDefault);

var _en_US = require('./locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _FullCalendar = require('../rc-components/calendar/FullCalendar');

var _FullCalendar2 = _interopRequireDefault(_FullCalendar);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function zerofixed(v) {
    if (v < 10) {
        return '0' + v;
    }
    return '' + v;
}

var Calendar = function (_Component) {
    (0, _inherits3['default'])(Calendar, _Component);

    function Calendar(props) {
        (0, _classCallCheck3['default'])(this, Calendar);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.monthCellRender = function (value) {
            var _this$props$monthCell = _this.props.monthCellRender,
                monthCellRender = _this$props$monthCell === undefined ? _noop2['default'] : _this$props$monthCell;

            var prefixCls = _this.getPrefixCls();
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-month' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-value' },
                    value.localeData().monthsShort(value)
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    monthCellRender(value)
                )
            );
        };
        _this.dateCellRender = function (value) {
            var _this$props$dateCellR = _this.props.dateCellRender,
                dateCellRender = _this$props$dateCellR === undefined ? _noop2['default'] : _this$props$dateCellR;

            var prefixCls = _this.getPrefixCls();
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-date' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-value' },
                    zerofixed(value.date())
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    dateCellRender(value)
                )
            );
        };
        _this.setValue = function (value, way) {
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            if (way === 'select') {
                if (_this.props.onSelect) {
                    _this.props.onSelect(value);
                }
            } else if (way === 'changePanel') {
                _this.onPanelChange(value, _this.state.mode);
            }
        };
        _this.setType = function (type) {
            var mode = type === 'date' ? 'month' : 'year';
            if (_this.state.mode !== mode) {
                _this.setState({ mode: mode });
                _this.onPanelChange(_this.state.value, mode);
            }
        };
        _this.onHeaderValueChange = function (value) {
            _this.setValue(value, 'changePanel');
        };
        _this.onHeaderTypeChange = function (type) {
            _this.setType(type);
        };
        _this.onSelect = function (value) {
            _this.setValue(value, 'select');
        };
        _this.getDateRange = function (validRange, disabledDate) {
            return function (current) {
                if (!current) {
                    return false;
                }

                var _validRange = (0, _slicedToArray3['default'])(validRange, 2),
                    startDate = _validRange[0],
                    endDate = _validRange[1];

                var inRange = !current.isBetween(startDate, endDate, 'days', '[]');
                if (disabledDate) {
                    return disabledDate(current) || inRange;
                }
                return inRange;
            };
        };
        _this.renderCalendar = function (locale, localeCode) {
            var state = _this.state,
                props = _this.props;
            var value = state.value,
                mode = state.mode;

            if (value && localeCode) {
                value.locale(localeCode);
            }
            var style = props.style,
                className = props.className,
                fullscreen = props.fullscreen,
                dateFullCellRender = props.dateFullCellRender,
                monthFullCellRender = props.monthFullCellRender;

            var prefixCls = _this.getPrefixCls();
            var type = mode === 'year' ? 'month' : 'date';
            var cls = className || '';
            if (fullscreen) {
                cls += ' ' + prefixCls + '-fullscreen';
            }
            var monthCellRender = monthFullCellRender || _this.monthCellRender;
            var dateCellRender = dateFullCellRender || _this.dateCellRender;
            var disabledDate = props.disabledDate;
            if (props.validRange) {
                disabledDate = _this.getDateRange(props.validRange, disabledDate);
            }
            return _react2['default'].createElement(
                'div',
                { className: cls, style: style },
                _react2['default'].createElement(_Header2['default'], { fullscreen: fullscreen, type: type, value: value, locale: locale.lang, prefixCls: prefixCls, onTypeChange: _this.onHeaderTypeChange, onValueChange: _this.onHeaderValueChange, validRange: props.validRange }),
                _react2['default'].createElement(_FullCalendar2['default'], (0, _extends3['default'])({}, props, { disabledDate: disabledDate, Select: _noop2['default'], locale: locale.lang, type: type, prefixCls: prefixCls, showHeader: false, value: value, monthCellRender: monthCellRender, dateCellRender: dateCellRender, onSelect: _this.onSelect }))
            );
        };
        var value = props.value || props.defaultValue || (0, _interopDefault2['default'])(_moment2['default'])();
        if (!(0, _interopDefault2['default'])(_moment2['default']).isMoment(value)) {
            throw new Error('The value/defaultValue of Calendar must be a moment object');
        }
        _this.state = {
            value: value,
            mode: props.mode
        };
        return _this;
    }

    (0, _createClass3['default'])(Calendar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            }
            if ('mode' in nextProps && nextProps.mode !== this.props.mode) {
                this.setState({
                    mode: nextProps.mode
                });
            }
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('fullcalendar', this.props.prefixCls);
        }
    }, {
        key: 'onPanelChange',
        value: function onPanelChange(value, mode) {
            var onPanelChange = this.props.onPanelChange;

            if (onPanelChange) {
                onPanelChange(value, mode);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _LocaleReceiver2['default'],
                { componentName: 'Calendar', defaultLocale: _en_US2['default'] },
                this.renderCalendar
            );
        }
    }]);
    return Calendar;
}(_react.Component);

exports['default'] = Calendar;

Calendar.displayName = 'Calendar';
Calendar.defaultProps = {
    locale: {},
    fullscreen: true,
    mode: 'month',
    onSelect: _noop2['default'],
    onPanelChange: _noop2['default']
};
Calendar.propTypes = {
    monthCellRender: _propTypes2['default'].func,
    dateCellRender: _propTypes2['default'].func,
    monthFullCellRender: _propTypes2['default'].func,
    dateFullCellRender: _propTypes2['default'].func,
    fullscreen: _propTypes2['default'].bool,
    locale: _propTypes2['default'].object,
    prefixCls: _propTypes2['default'].string,
    className: _propTypes2['default'].string,
    style: _propTypes2['default'].object,
    onPanelChange: _propTypes2['default'].func,
    value: _propTypes2['default'].object,
    onSelect: _propTypes2['default'].func
};
module.exports = exports['default'];