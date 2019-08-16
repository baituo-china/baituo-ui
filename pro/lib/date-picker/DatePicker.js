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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _viewComponents;

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _TriggerField2 = require('../trigger-field/TriggerField');

var _TriggerField3 = _interopRequireDefault(_TriggerField2);

var _DaysView = require('./DaysView');

var _DaysView2 = _interopRequireDefault(_DaysView);

var _DateTimesView = require('./DateTimesView');

var _DateTimesView2 = _interopRequireDefault(_DateTimesView);

var _WeeksView = require('./WeeksView');

var _WeeksView2 = _interopRequireDefault(_WeeksView);

var _TimesView = require('./TimesView');

var _TimesView2 = _interopRequireDefault(_TimesView);

var _MonthsView = require('./MonthsView');

var _MonthsView2 = _interopRequireDefault(_MonthsView);

var _YearsView = require('./YearsView');

var _YearsView2 = _interopRequireDefault(_YearsView);

var _DecadeYearsView = require('./DecadeYearsView');

var _DecadeYearsView2 = _interopRequireDefault(_DecadeYearsView);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _EventManager = require('../_util/EventManager');

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var viewComponents = (_viewComponents = {}, (0, _defineProperty3['default'])(_viewComponents, "decade" /* decade */, _DecadeYearsView2['default']), (0, _defineProperty3['default'])(_viewComponents, "year" /* year */, _YearsView2['default']), (0, _defineProperty3['default'])(_viewComponents, "month" /* month */, _MonthsView2['default']), (0, _defineProperty3['default'])(_viewComponents, "date" /* date */, _DaysView2['default']), (0, _defineProperty3['default'])(_viewComponents, "dateTime" /* dateTime */, _DateTimesView2['default']), (0, _defineProperty3['default'])(_viewComponents, "week" /* week */, _WeeksView2['default']), (0, _defineProperty3['default'])(_viewComponents, "time" /* time */, _TimesView2['default']), _viewComponents);
var DatePicker = function (_TriggerField) {
    (0, _inherits3['default'])(DatePicker, _TriggerField);

    function DatePicker() {
        (0, _classCallCheck3['default'])(this, DatePicker);
        return (0, _possibleConstructorReturn3['default'])(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));
    }

    (0, _createClass3['default'])(DatePicker, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(DatePicker.prototype.__proto__ || Object.getPrototypeOf(DatePicker.prototype), 'getOtherProps', this).call(this), ['mode', 'filter', 'cellRenderer']);
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
            return _react2['default'].createElement('input', (0, _extends3['default'])({}, this.getOtherProps(), { placeholder: this.hasFloatLabel ? void 0 : this.getPlaceholder(), value: this.getText() || '', readOnly: !this.editable }));
        }
    }, {
        key: 'getPopupContent',
        value: function getPopupContent() {
            var _this2 = this;

            var mode = this.getViewMode();
            return (0, _react.createElement)(viewComponents[mode], {
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
                cellRenderer = _props$cellRenderer === undefined ? _noop2['default'] : _props$cellRenderer;

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
            var value = (0, _get3['default'])(DatePicker.prototype.__proto__ || Object.getPrototypeOf(DatePicker.prototype), 'getValue', this).call(this);
            if (value) {
                if (!(0, _moment.isMoment)(value)) {
                    var fieldMsg = this.record ? ' Please check the field<' + this.props.name + '> of DataSet.' : '';
                    (0, _warning2['default'])(false, 'DatePicker: The value of DatePicker is not moment.' + fieldMsg);
                    return (0, _moment2['default'])(value, this.getDateFormat());
                }
            }
            return value;
        }
    }, {
        key: 'getSelectedDate',
        value: function getSelectedDate() {
            var _selectedDate = this.selectedDate,
                selectedDate = _selectedDate === undefined ? this.getValue() || this.getValidDate((0, _moment2['default'])().startOf('d')) : _selectedDate;

            return selectedDate.clone();
        }
    }, {
        key: 'getLimit',
        value: function getLimit(type) {
            var limit = this.getProp(type);
            if (limit !== void 0) {
                var record = this.record;

                if (record && (0, _isString2['default'])(limit) && record.getField(limit)) {
                    return record.get(limit);
                }
                return (0, _moment2['default'])(limit);
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

            (0, _mobx.runInAction)(function () {
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
                (0, _mobx.runInAction)(function () {
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
                    case _KeyCode2['default'].RIGHT:
                        (0, _EventManager.stopEvent)(e);
                        el.handleKeyDownRight(e);
                        break;
                    case _KeyCode2['default'].LEFT:
                        (0, _EventManager.stopEvent)(e);
                        el.handleKeyDownLeft(e);
                        break;
                    case _KeyCode2['default'].DOWN:
                        (0, _EventManager.stopEvent)(e);
                        el.handleKeyDownDown(e);
                        break;
                    case _KeyCode2['default'].UP:
                        (0, _EventManager.stopEvent)(e);
                        el.handleKeyDownUp(e);
                        break;
                    case _KeyCode2['default'].END:
                        (0, _EventManager.stopEvent)(e);
                        el.handleKeyDownEnd(e);
                        break;
                    case _KeyCode2['default'].HOME:
                        (0, _EventManager.stopEvent)(e);
                        el.handleKeyDownHome(e);
                        break;
                    case _KeyCode2['default'].PAGE_UP:
                        (0, _EventManager.stopEvent)(e);
                        el.handleKeyDownPageUp(e);
                        break;
                    case _KeyCode2['default'].PAGE_DOWN:
                        (0, _EventManager.stopEvent)(e);
                        el.handleKeyDownPageDown(e);
                        break;
                    case _KeyCode2['default'].ENTER:
                        if (this.popup) {
                            e.preventDefault();
                        }
                        el.handleKeyDownEnter(e);
                        break;
                    case _KeyCode2['default'].TAB:
                        this.handleKeyDownTab();
                        break;
                    case _KeyCode2['default'].ESC:
                        this.handleKeyDownEsc(e);
                        break;
                    case _KeyCode2['default'].SPACE:
                        this.handleKeyDownSpace(e);
                        break;
                    default:
                }
            }
            (0, _get3['default'])(DatePicker.prototype.__proto__ || Object.getPrototypeOf(DatePicker.prototype), 'handleKeyDown', this).call(this, e);
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
                valueMissing: (0, _localeContext.$l)('DatePicker', label ? 'value_missing_with_label' : 'value_missing', { label: label })
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
}(_TriggerField3['default']);
DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = (0, _extends3['default'])({
    /**
     * 日期格式，如 `YYYY-MM-DD HH:mm:ss`
     */
    format: _propTypes2['default'].string,
    /**
     * 显示模式date|dateTime|time|year|month|week
     */
    mode: _propTypes2['default'].string,
    /**
     * 单元格渲染
     */
    cellRenderer: _propTypes2['default'].func,
    /**
     * 日期过滤
     */
    filter: _propTypes2['default'].func,
    /**
     * 最小日期
     */
    min: _propTypes2['default'].any,
    /**
     * 最大日期
     */
    max: _propTypes2['default'].any
}, _TriggerField3['default'].propTypes);
DatePicker.defaultProps = (0, _extends3['default'])({}, _TriggerField3['default'].defaultProps, {
    suffixCls: 'calendar-picker',
    mode: "date" /* date */
});
tslib_1.__decorate([_mobx.computed], DatePicker.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([_mobx.computed], DatePicker.prototype, "editable", null);
tslib_1.__decorate([_mobx.observable], DatePicker.prototype, "selectedDate", void 0);
tslib_1.__decorate([_mobx.observable], DatePicker.prototype, "mode", void 0);
tslib_1.__decorate([_autobind2['default']], DatePicker.prototype, "handleSelectedDateChange", null);
tslib_1.__decorate([_autobind2['default']], DatePicker.prototype, "handelViewModeChange", null);
tslib_1.__decorate([_autobind2['default']], DatePicker.prototype, "handlePopupAnimateEnd", null);
tslib_1.__decorate([_autobind2['default']], DatePicker.prototype, "handleSelect", null);
tslib_1.__decorate([_autobind2['default']], DatePicker.prototype, "handleKeyDown", null);
tslib_1.__decorate([_mobx.action], DatePicker.prototype, "changeSelectedDate", null);
tslib_1.__decorate([_autobind2['default']], DatePicker.prototype, "isUnderRange", null);
tslib_1.__decorate([_autobind2['default']], DatePicker.prototype, "isValidDate", null);
DatePicker = tslib_1.__decorate([_mobxReact.observer], DatePicker);
exports['default'] = DatePicker;
module.exports = exports['default'];