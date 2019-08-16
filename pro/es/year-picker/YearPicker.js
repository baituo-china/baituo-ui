import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import DatePicker from '../date-picker/DatePicker';

var YearPicker = function (_DatePicker) {
    _inherits(YearPicker, _DatePicker);

    function YearPicker() {
        _classCallCheck(this, YearPicker);

        return _possibleConstructorReturn(this, (YearPicker.__proto__ || Object.getPrototypeOf(YearPicker)).apply(this, arguments));
    }

    return YearPicker;
}(DatePicker);

export default YearPicker;

YearPicker.displayName = 'YearPicker';
YearPicker.defaultProps = _extends({}, DatePicker.defaultProps, {
    mode: "year" /* year */
});