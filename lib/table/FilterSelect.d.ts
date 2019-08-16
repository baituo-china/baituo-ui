import React, { Component, MouseEventHandler } from 'react';
import { ColumnProps, TableStateFilters } from './interface';
import { LabeledValue, OptionProps } from '../select';
export declare const VALUE_OR = "OR";
export interface FilterSelectProps<T> {
    prefixCls?: string;
    placeholder?: string;
    dataSource?: T[];
    filters?: string[];
    columnFilters?: TableStateFilters;
    columns?: ColumnProps<T>[];
    onFilter?: (column: ColumnProps<T>, nextFilters: string[]) => void;
    onChange?: (filters?: any[]) => void;
    onClear?: () => void;
    multiple?: boolean;
    getPopupContainer?: (triggerNode?: Element) => HTMLElement;
}
export interface FilterSelectState<T> {
    columns: ColumnProps<T>[];
    filters: string[];
    columnFilters: TableStateFilters;
    selectColumn?: ColumnProps<T>;
    inputValue: string;
    checked: any[];
}
export default class FilterSelect<T> extends Component<FilterSelectProps<T>, FilterSelectState<T>> {
    state: FilterSelectState<T>;
    rcSelect: any;
    columnRefs: any;
    componentWillReceiveProps(nextProps: FilterSelectProps<T>): void;
    getPrefixCls(): string;
    handleDropdownMouseDown: MouseEventHandler<any>;
    render(): JSX.Element;
    renderColumnsTitle(): JSX.Element[];
    isMultiple(): boolean | undefined;
    saveRef: (node: any) => void;
    saveColumnRef: (key: string | number, node: any) => void;
    handleInputKeyDown: (e: any) => void;
    handleInput: (value: string) => void;
    handleChoiceItemClick: ({ key }: LabeledValue) => void;
    handleSelect: ({ key }: LabeledValue) => boolean;
    handleMultiCheckConfirm: () => void;
    handleClear: () => void;
    handleChange: (changedValue: LabeledValue[]) => void;
    fireChange(filters: any[]): void;
    fireColumnFilterChange(columnKey: string | number, value: any[]): void;
    changeValue(changedValue: LabeledValue[], oldValue: any[]): string[];
    getColumnFiltersValues(): any[];
    getValue(): ("" | {
        key: string;
        label: ({} | null | undefined)[];
    })[];
    getInputFilterOptions(inputValue: string): React.ReactElement<OptionProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    getOptions(): any[] | null | undefined;
    getColumnsWidthFilters(props?: Readonly<FilterSelectProps<T>> & Readonly<{
        children?: React.ReactNode;
    }>): ColumnProps<T>[];
    findColumn(myKey: string | number): ColumnProps<T> | undefined;
    toValueString: (item: any) => "" | {
        key: string;
        label: ({} | null | undefined)[];
    };
    getRootDomNode: () => HTMLElement;
    getColumnTitle(column: ColumnProps<T>): string;
}
