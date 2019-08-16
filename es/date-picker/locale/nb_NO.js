import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/nb_NO';
import TimePickerLocale from '../../time-picker/locale/nb_NO';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Velg dato',
        rangePlaceholder: ['Startdato', 'Sluttdato']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;