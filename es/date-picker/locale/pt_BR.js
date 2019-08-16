import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/pt_BR';
import TimePickerLocale from '../../time-picker/locale/pt_BR';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Selecionar data',
        rangePlaceholder: ['Data de início', 'Data de fim']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;