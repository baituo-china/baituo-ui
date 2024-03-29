import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/en_GB';
import TimePickerLocale from '../../time-picker/locale/en_GB';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Select date',
        rangePlaceholder: ['Start date', 'End date']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;