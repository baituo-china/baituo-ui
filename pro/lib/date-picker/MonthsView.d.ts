import { ReactNode } from 'react';
import { Moment } from 'moment';
import DaysView from './DaysView';
import { FieldType } from '../data-set/enum';
export default class MonthsView extends DaysView {
    static displayName: string;
    static type: FieldType;
    handleKeyDownHome(): void;
    handleKeyDownEnd(): void;
    handleKeyDownLeft(e: any): void;
    handleKeyDownRight(e: any): void;
    handleKeyDownUp(): void;
    handleKeyDownDown(): void;
    handleKeyDownPageUp(e: any): void;
    handleKeyDownPageDown(e: any): void;
    renderHeader(): ReactNode;
    renderPanelHead(): ReactNode;
    renderPanelBody(): ReactNode;
    renderFooter(): ReactNode;
    getPanelClass(): string;
    choose(date: Moment): void;
}
