import { Component } from 'react';
import { ColumnProps } from './interface';
export interface ColumnFilterProps<T> {
    prefixCls?: string;
    columns?: ColumnProps<T>[];
    onColumnFilterChange?: (item?: any) => void;
    getPopupContainer?: (triggerNode?: Element) => HTMLElement;
}
export interface ColumnFilterState {
    open: boolean;
}
export default class ColumnFilter<T> extends Component<ColumnFilterProps<T>, ColumnFilterState> {
    static displayName: string;
    state: {
        open: boolean;
    };
    render(): JSX.Element;
    onMenuSelect: (item: any) => void;
    onMenuDeselect: (item: any) => void;
    onDropdownVisibleChange: (open: boolean) => void;
    fireChange(item?: any): void;
    getOptions(): any;
    getVisibleColumns(): ColumnProps<T>[];
}
