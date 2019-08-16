import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/is_IS';
import TimePickerLocale from '../../time-picker/locale/is_IS';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Veldu dag',
        rangePlaceholder: ['Upphafsdagur', 'Lokadagur']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;