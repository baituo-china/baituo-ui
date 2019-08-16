import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/th_TH';
import TimePickerLocale from '../../time-picker/locale/th_TH';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'เลือกวันที่',
        rangePlaceholder: ['วันเริ่มต้น', 'วันสิ้นสุด']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;