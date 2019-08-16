import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/pl_PL';
import TimePickerLocale from '../../time-picker/locale/pl_PL';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Wybierz datę',
        rangePlaceholder: ['Data początkowa', 'Data końcowa']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;