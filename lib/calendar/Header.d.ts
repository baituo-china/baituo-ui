import { Component } from 'react';
import { Moment } from 'moment';
import { RadioChangeEvent } from '../radio';
export interface HeaderProps {
    prefixCls?: string;
    locale?: any;
    fullscreen?: boolean;
    yearSelectOffset?: number;
    yearSelectTotal?: number;
    type?: string;
    onValueChange?: (value: Moment) => void;
    onTypeChange?: (type: string) => void;
    value: any;
    validRange?: [Moment, Moment];
}
export default class Header extends Component<HeaderProps, any> {
    static displayName: string;
    static defaultProps: {
        yearSelectOffset: number;
        yearSelectTotal: number;
    };
    private calenderHeaderNode;
    getPrefixCls(): string;
    getYearSelectElement(year: number): JSX.Element;
    getMonthsLocale(value: Moment): any[];
    getMonthSelectElement(month: number, months: number[]): JSX.Element;
    onYearChange: (year: string) => void;
    onMonthChange: (month: string) => void;
    onTypeChange: (e: RadioChangeEvent) => void;
    getCalenderHeaderNode: (node: HTMLDivElement) => void;
    render(): JSX.Element;
}
