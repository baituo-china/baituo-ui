import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/ku_IQ';
import TimePickerLocale from '../../time-picker/locale/ku_IQ';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Dîrok hilbijêre',
        rangePlaceholder: ['Dîroka destpêkê', 'Dîroka dawîn']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;