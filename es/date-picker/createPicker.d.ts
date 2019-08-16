import { ComponentClass } from 'react';
import { Moment } from 'moment';
export interface PickerProps {
    value?: Moment;
    prefixCls: string;
}
export default function createPicker(TheCalendar: ComponentClass): any;
