import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import DatePicker from '../date-picker/DatePicker';

var TimePicker = function (_DatePicker) {
    _inherits(TimePicker, _DatePicker);

    function TimePicker() {
        _classCallCheck(this, TimePicker);

        return _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).apply(this, arguments));
    }

    return TimePicker;
}(DatePicker);

export default TimePicker;

TimePicker.displayName = 'TimePicker';
TimePicker.defaultProps = _extends({}, DatePicker.defaultProps, {
    mode: "time" /* time */
});