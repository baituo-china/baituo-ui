import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/de_DE';
import TimePickerLocale from '../../time-picker/locale/de_DE';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Datum auswählen',
        rangePlaceholder: ['Startdatum', 'Enddatum']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;