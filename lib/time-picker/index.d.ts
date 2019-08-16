import { Component, CSSProperties } from 'react';
import moment, { Moment } from 'moment';
import { Size } from '../_util/enum';
export declare function generateShowHourMinuteSecond(format: string): {
    showHour: boolean;
    showMinute: boolean;
    showSecond: boolean;
};
export interface TimePickerProps {
    className?: string;
    size?: Size;
    value?: Moment;
    defaultValue?: Moment | Moment[];
    open?: boolean;
    format?: string;
    onChange?: (time: Moment, timeString: string) => void;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    placeholder?: string;
    prefixCls?: string;
    hideDisabledOptions?: boolean;
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: number) => number[];
    disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
    style?: CSSProperties;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    addon?: Function;
    use12Hours?: boolean;
    focusOnOpen?: boolean;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    allowEmpty?: boolean;
    inputReadOnly?: boolean;
    clearText?: string;
    defaultOpenValue?: Moment;
    popupClassName?: string;
    label?: any;
}
export interface TimePickerLocale {
    placeholder: string;
}
export default class TimePicker extends Component<TimePickerProps, any> {
    static displayName: string;
    static defaultProps: {
        align: {
            offset: number[];
        };
        disabled: boolean;
        disabledHours: undefined;
        disabledMinutes: undefined;
        disabledSeconds: undefined;
        hideDisabledOptions: boolean;
        placement: string;
        transitionName: string;
        focusOnOpen: boolean;
    };
    private timePickerRef;
    constructor(props: TimePickerProps);
    componentWillReceiveProps(nextProps: TimePickerProps): void;
    handleChange: (value: moment.Moment) => void;
    handleOpenClose: ({ open }: {
        open: boolean;
    }) => void;
    saveTimePicker: (timePickerRef: any) => void;
    focus(): void;
    blur(): void;
    getDefaultFormat(): string;
    renderTimePicker: (locale: TimePickerLocale) => JSX.Element;
    render(): JSX.Element;
}
