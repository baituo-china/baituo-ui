import { Component, CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
import moment, { Moment } from 'moment';
export { HeaderProps } from './Header';
export declare type CalendarMode = 'month' | 'year';
export interface CalendarProps {
    prefixCls?: string;
    className?: string;
    value?: Moment;
    defaultValue?: Moment;
    mode?: CalendarMode;
    fullscreen?: boolean;
    dateCellRender?: (date: Moment) => ReactNode;
    monthCellRender?: (date: Moment) => ReactNode;
    dateFullCellRender?: (date: Moment) => ReactNode;
    monthFullCellRender?: (date: Moment) => ReactNode;
    locale?: any;
    style?: CSSProperties;
    onPanelChange?: (date?: Moment, mode?: CalendarMode) => void;
    onSelect?: (date?: Moment) => void;
    disabledDate?: (current: Moment) => boolean;
    validRange?: [Moment, Moment];
}
export interface CalendarState {
    value: Moment;
    mode?: CalendarMode;
}
export default class Calendar extends Component<CalendarProps, CalendarState> {
    static displayName: string;
    static defaultProps: {
        locale: {};
        fullscreen: boolean;
        mode: string;
        onSelect: (...args: any[]) => any;
        onPanelChange: (...args: any[]) => any;
    };
    static propTypes: {
        monthCellRender: PropTypes.Requireable<(...args: any[]) => any>;
        dateCellRender: PropTypes.Requireable<(...args: any[]) => any>;
        monthFullCellRender: PropTypes.Requireable<(...args: any[]) => any>;
        dateFullCellRender: PropTypes.Requireable<(...args: any[]) => any>;
        fullscreen: PropTypes.Requireable<boolean>;
        locale: PropTypes.Requireable<object>;
        prefixCls: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        onPanelChange: PropTypes.Requireable<(...args: any[]) => any>;
        value: PropTypes.Requireable<object>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
    };
    constructor(props: CalendarProps);
    componentWillReceiveProps(nextProps: CalendarProps): void;
    getPrefixCls(): string;
    monthCellRender: (value: moment.Moment) => JSX.Element;
    dateCellRender: (value: moment.Moment) => JSX.Element;
    setValue: (value: moment.Moment, way: "select" | "changePanel") => void;
    setType: (type: string) => void;
    onHeaderValueChange: (value: moment.Moment) => void;
    onHeaderTypeChange: (type: string) => void;
    onPanelChange(value: Moment, mode: CalendarMode | undefined): void;
    onSelect: (value: moment.Moment) => void;
    getDateRange: (validRange: [moment.Moment, moment.Moment], disabledDate?: ((current: moment.Moment) => boolean) | undefined) => (current: moment.Moment) => boolean;
    renderCalendar: (locale: any, localeCode: string) => JSX.Element;
    render(): JSX.Element;
}
