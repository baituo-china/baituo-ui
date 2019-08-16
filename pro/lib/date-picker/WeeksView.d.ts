import { ReactNode } from 'react';
import { Moment } from 'moment';
import { DatePickerKeyboardEvent } from './DatePicker';
import DaysView from './DaysView';
import { FieldType } from '../data-set/enum';
export default class WeeksView extends DaysView implements DatePickerKeyboardEvent {
    static displayName: string;
    static type: FieldType;
    handleKeyDownLeft(e: any): void;
    handleKeyDownRight(e: any): void;
    renderPanelBody(): ReactNode;
    choose(date: Moment): void;
    getPanelClass(): string;
    renderFooter(): ReactNode;
    getWeekCell(props: object, text: string): JSX.Element;
    getDaysOfWeek(): ReactNode[];
}
