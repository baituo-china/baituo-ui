import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/cs_CZ';
import TimePickerLocale from '../../time-picker/locale/cs_CZ';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Vybrat datum',
        rangePlaceholder: ['Od', 'Do']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;