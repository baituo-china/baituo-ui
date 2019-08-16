import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/fr_FR';
import TimePickerLocale from '../../time-picker/locale/fr_FR';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Sélectionner une date',
        rangePlaceholder: ['Date de début', 'Date de fin']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;