import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/uk_UA';
import TimePickerLocale from '../../time-picker/locale/uk_UA';
var locale = {
    lang: _extends({
        placeholder: 'Оберіть дату',
        rangePlaceholder: ['Початкова дата', 'Кінцева дата']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;