import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/et_EE';
import TimePickerLocale from '../../time-picker/locale/et_EE';
// 统一合并为完整的 Locale
var locale = {
    lang: _extends({
        placeholder: 'Vali kuupäev',
        rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;