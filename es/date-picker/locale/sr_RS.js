import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/sr_RS';
import TimePickerLocale from '../../time-picker/locale/sr_RS';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Izaberite datum',
        rangePlaceholder: ['Početni datum', 'Krajnji datum']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;