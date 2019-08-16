import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/sv_SE';
import TimePickerLocale from '../../time-picker/locale/sv_SE';
var locale = {
    lang: _extends({
        placeholder: 'Välj datum',
        rangePlaceholder: ['Startdatum', 'Slutdatum']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;