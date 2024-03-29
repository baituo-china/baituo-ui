import _extends from 'babel-runtime/helpers/extends';
import CalendarLocale from '../../rc-components/calendar/locale/pt_PT';
import TimePickerLocale from '../../time-picker/locale/pt_PT';
// Merge into a locale object
var locale = {
    lang: _extends({}, CalendarLocale, {
        placeholder: 'Data',
        rangePlaceholder: ['Data inicial', 'Data final'],
        today: 'Hoje',
        now: 'Agora',
        backToToday: 'Hoje',
        ok: 'Ok',
        clear: 'Limpar',
        month: 'Mês',
        year: 'Ano',
        timeSelect: 'Hora',
        dateSelect: 'Selecionar data',
        monthSelect: 'Selecionar mês',
        yearSelect: 'Selecionar ano',
        decadeSelect: 'Selecionar década',
        yearFormat: 'YYYY',
        dateFormat: 'D/M/YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'D/M/YYYY HH:mm:ss',
        monthFormat: 'MMMM',
        monthBeforeYear: false,
        previousMonth: 'Mês anterior (PageUp)',
        nextMonth: 'Mês seguinte (PageDown)',
        previousYear: 'Ano anterior (Control + left)',
        nextYear: 'Ano seguinte (Control + right)',
        previousDecade: 'Última década',
        nextDecade: 'Próxima década',
        previousCentury: 'Último século',
        nextCentury: 'Próximo século'
    }),
    timePickerLocale: _extends({}, TimePickerLocale, {
        placeholder: 'Hora'
    })
};
// All settings at:
export default locale;