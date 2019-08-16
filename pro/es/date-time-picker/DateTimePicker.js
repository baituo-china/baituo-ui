import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import DatePicker from '../date-picker/DatePicker';

var DateTimePicker = function (_DatePicker) {
    _inherits(DateTimePicker, _DatePicker);

    function DateTimePicker() {
        _classCallCheck(this, DateTimePicker);

        return _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).apply(this, arguments));
    }

    return DateTimePicker;
}(DatePicker);

export default DateTimePicker;

DateTimePicker.displayName = 'DateTimePicker';
DateTimePicker.defaultProps = _extends({}, DatePicker.defaultProps, {
    mode: "dateTime" /* dateTime */
});