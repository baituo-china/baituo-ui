import { Component } from 'react';
import { ColumnProps, TableStateFilters } from './interface';
export interface FilterBarProps<T> {
    prefixCls?: string;
    placeholder?: string;
    dataSource?: T[];
    filters?: string[];
    columnFilters?: TableStateFilters;
    multiple?: boolean;
    columns?: ColumnProps<T>[];
    onFilterSelectChange?: (filters?: any[]) => void;
    onFilterSelectClear?: () => void;
    onColumnFilterChange?: (columns?: ColumnProps<T>[]) => void;
    onFilter?: (column: ColumnProps<T>, nextFilters: string[]) => void;
    getPopupContainer?: (triggerNode?: Element) => HTMLElement;
}
export default class FilterBar<T> extends Component<FilterBarProps<T>, any> {
    render(): JSX.Element;
}
