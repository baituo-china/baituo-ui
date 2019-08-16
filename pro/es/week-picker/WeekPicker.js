import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import DatePicker from '../date-picker/DatePicker';

var WeekPicker = function (_DatePicker) {
    _inherits(WeekPicker, _DatePicker);

    function WeekPicker() {
        _classCallCheck(this, WeekPicker);

        return _possibleConstructorReturn(this, (WeekPicker.__proto__ || Object.getPrototypeOf(WeekPicker)).apply(this, arguments));
    }

    return WeekPicker;
}(DatePicker);

export default WeekPicker;

WeekPicker.displayName = 'WeekPicker';
WeekPicker.defaultProps = _extends({}, DatePicker.defaultProps, {
    mode: "week" /* week */
});