import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import DatePicker from '../date-picker/DatePicker';

var MonthPicker = function (_DatePicker) {
    _inherits(MonthPicker, _DatePicker);

    function MonthPicker() {
        _classCallCheck(this, MonthPicker);

        return _possibleConstructorReturn(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).apply(this, arguments));
    }

    return MonthPicker;
}(DatePicker);

export default MonthPicker;

MonthPicker.displayName = 'MonthPicker';
MonthPicker.defaultProps = _extends({}, DatePicker.defaultProps, {
    mode: "month" /* month */
});