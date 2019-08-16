import { Component, MouseEventHandler } from 'react';
import moment from 'moment';
export default class WeekPicker extends Component<any, any> {
    static defaultProps: {
        format: string;
        allowClear: boolean;
    };
    private input;
    private picker;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    weekDateRender: (current: any) => JSX.Element;
    handleOpenChange: (status: boolean) => void;
    handleChange: (value: moment.Moment | null) => void;
    clearSelection: MouseEventHandler<HTMLElement>;
    onPickerIconClick: MouseEventHandler<HTMLElement>;
    focus(): void;
    blur(): void;
    saveInput: (node: any) => void;
    savePicker: (node: any) => void;
    render(): JSX.Element;
}
