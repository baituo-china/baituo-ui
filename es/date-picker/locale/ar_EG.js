import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/ar_EG';
import TimePickerLocale from '../../time-picker/locale/ar_EG';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'اختيار التاريخ',
        rangePlaceholder: ['البداية', 'النهاية']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;