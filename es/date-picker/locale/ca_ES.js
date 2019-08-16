import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/ca_ES';
import TimePickerLocale from '../../time-picker/locale/ca_ES';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Seleccionar data',
        rangePlaceholder: ['Data inicial', 'Data final']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;