import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/fa_IR';
import TimePickerLocale from '../../time-picker/locale/fa_IR';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'انتخاب تاریخ',
        rangePlaceholder: ['تاریخ شروع', 'تاریخ پایان']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;