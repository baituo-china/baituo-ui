import { ReactNode } from 'react';
import { DatePickerKeyboardEvent } from './DatePicker';
import DaysView from './DaysView';
import { FieldType } from '../data-set/enum';
export default class DateTimesView extends DaysView implements DatePickerKeyboardEvent {
    static displayName: string;
    static type: FieldType;
    handleTimeSelect(): void;
    handleKeyDownRight(e: any): void;
    getFirstDay(date: any): any;
    renderFooter(): ReactNode;
}
