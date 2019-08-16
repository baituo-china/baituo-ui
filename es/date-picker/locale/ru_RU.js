import _extends from 'babel-runtime/helpers/extends';
/**
 * Created by Andrey Gayvoronsky on 13/04/16.
 */
import CalendarLocale from '../../rc-components/calendar/locale/ru_RU';
import TimePickerLocale from '../../time-picker/locale/ru_RU';
var locale = {
    lang: _extends({
        placeholder: 'Выберите дату',
        rangePlaceholder: ['Начальная дата', 'Конечная дата']
    }, CalendarLocale),
    timePickerLocale: _extends({}, TimePickerLocale)
};
// All settings at:
export default locale;