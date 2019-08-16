import { Component, MouseEventHandler } from 'react';
import { RangePickerPresetRange, RangePickerValue } from './interface';
export interface RangePickerState {
    value?: RangePickerValue;
    showDate?: RangePickerValue;
    open?: boolean;
    hoverValue?: RangePickerValue;
}
export default class RangePicker extends Component<any, RangePickerState> {
    static displayName: string;
    static defaultProps: {
        allowClear: boolean;
        showToday: boolean;
    };
    private picker;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    clearSelection: MouseEventHandler<HTMLElement>;
    clearHoverValue: () => void;
    handleChange: (value: RangePickerValue) => void;
    handleOpenChange: (open: boolean) => void;
    handleShowDateChange: (showDate: RangePickerValue) => void;
    handleHoverChange: (hoverValue: any) => void;
    handleRangeMouseLeave: () => void;
    handleCalendarInputSelect: (value: RangePickerValue) => void;
    handleRangeClick: (value: RangePickerPresetRange) => void;
    setValue(value: RangePickerValue, hidePanel?: boolean): void;
    focus(): void;
    blur(): void;
    savePicker: (node: HTMLSpanElement) => void;
    renderFooter: (...args: any[]) => (JSX.Element | null)[] | null;
    getPrefixCls(): string;
    render(): JSX.Element;
}
