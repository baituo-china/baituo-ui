import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/fi_FI';
import TimePickerLocale from '../../time-picker/locale/fi_FI';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Valitse päivä',
        rangePlaceholder: ['Alku päivä', 'Loppu päivä']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;