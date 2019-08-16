import { ReactNode } from 'react';
import { Moment } from 'moment';
import DaysView from './DaysView';
export default class DecadeYearsView extends DaysView {
    static displayName: string;
    handlePrevYearClick(): void;
    handleNextYearClick(): void;
    handleKeyDownHome(): void;
    handleKeyDownEnd(): void;
    handleKeyDownLeft(e: any): void;
    handleKeyDownRight(e: any): void;
    handleKeyDownUp(): void;
    handleKeyDownDown(): void;
    handleKeyDownPageUp(): void;
    handleKeyDownPageDown(): void;
    renderHeader(): ReactNode;
    renderPanelHead(): ReactNode;
    renderPanelBody(): ReactNode;
    renderFooter(): ReactNode;
    getPanelClass(): string;
    choose(date: Moment): void;
}
