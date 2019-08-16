import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/tr_TR';
import TimePickerLocale from '../../time-picker/locale/tr_TR';
// Merge into a locale object
var locale = {
    lang: _extends({
        placeholder: 'Tarih Seç',
        rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;