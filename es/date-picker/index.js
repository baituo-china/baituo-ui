import _extends from 'babel-runtime/helpers/extends';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import WeekPicker from './WeekPicker';
import RcCalendar from '../rc-components/calendar';
import MonthCalendar from '../rc-components/calendar/MonthCalendar';
var DatePicker = wrapPicker(createPicker(RcCalendar));
var MonthPicker = wrapPicker(createPicker(MonthCalendar), 'YYYY-MM');
_extends(DatePicker, {
    RangePicker: wrapPicker(RangePicker),
    MonthPicker: MonthPicker,
    WeekPicker: wrapPicker(WeekPicker, 'gggg-wo')
});
export default DatePicker;