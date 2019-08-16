import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/it_IT';
import TimePickerLocale from '../../time-picker/locale/it_IT';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Selezionare la data',
        rangePlaceholder: ['Data d\'inizio', 'Data di fine']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;