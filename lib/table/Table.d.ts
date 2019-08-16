import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SpinProps } from '../spin';
import { Store } from './createStore';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import { ColumnProps, SelectionItemSelectFn, TableComponents, TableLocale, TableProps, TableState, TableStateFilters } from './interface';
import { RadioChangeEvent } from '../radio';
import { CheckboxChangeEvent } from '../checkbox';
import { Size } from '../_util/enum';
export default class Table<T> extends Component<TableProps<T>, TableState<T>> {
    static displayName: string;
    static Column: typeof Column;
    static ColumnGroup: typeof ColumnGroup;
    static propTypes: {
        dataSource: PropTypes.Requireable<any[]>;
        empty: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        onColumnFilterChange: PropTypes.Requireable<(...args: any[]) => any>;
        columns: PropTypes.Requireable<any[]>;
        prefixCls: PropTypes.Requireable<string>;
        useFixedHeader: PropTypes.Requireable<boolean>;
        rowSelection: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<Size>;
        loading: PropTypes.Requireable<boolean | object>;
        bordered: PropTypes.Requireable<boolean>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        locale: PropTypes.Requireable<object>;
        dropdownPrefixCls: PropTypes.Requireable<string>;
        filterBar: PropTypes.Requireable<boolean>;
        filters: PropTypes.Requireable<any[]>;
        filterBarPlaceholder: PropTypes.Requireable<string>;
        onFilterSelectChange: PropTypes.Requireable<(...args: any[]) => any>;
        noFilter: PropTypes.Requireable<boolean>;
        autoScroll: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        dataSource: never[];
        empty: null;
        useFixedHeader: boolean;
        rowSelection: null;
        className: string;
        size: Size;
        loading: boolean;
        bordered: boolean;
        indentSize: number;
        locale: {};
        rowKey: string;
        showHeader: boolean;
        filterBar: boolean;
        noFilter: boolean;
        autoScroll: boolean;
    };
    CheckboxPropsCache: {
        [key: string]: any;
    };
    store: Store;
    columns: ColumnProps<T>[];
    components: TableComponents;
    private refTable;
    constructor(props: TableProps<T>);
    saveRef: (ref: any) => void;
    getCheckboxPropsByItem: (item: T, index: number) => any;
    getPrefixCls(): string;
    getDefaultSelection(): any[];
    getDefaultPagination(props: TableProps<T>): {};
    componentWillReceiveProps(nextProps: TableProps<T>): void;
    onRow: (record: T, index: number) => any;
    setSelectedRowKeys(selectedRowKeys: string[], { selectWay, record, checked, changeRowKeys, nativeEvent }: any): void;
    hasPagination(props?: any): boolean;
    isFiltersChanged(filters: TableStateFilters): boolean;
    getSortOrderColumns(columns?: ColumnProps<T>[]): ColumnProps<T>[];
    getFilteredValueColumns(columns?: ColumnProps<T>[]): ColumnProps<T>[];
    getFiltersFromColumns(columns?: ColumnProps<T>[]): any;
    getDefaultSortOrder(columns?: ColumnProps<T>[]): {
        sortColumn: ColumnProps<T>;
        sortOrder: boolean | "ascend" | "descend" | undefined;
    } | {
        sortColumn: null;
        sortOrder: null;
    };
    getSortStateFromColumns(columns?: ColumnProps<T>[]): {
        sortColumn: ColumnProps<T>;
        sortOrder: boolean | "ascend" | "descend" | undefined;
    } | {
        sortColumn: null;
        sortOrder: null;
    };
    getSorterFn(): ((a: T, b: T) => number) | undefined;
    setSortOrder(order: string, column: ColumnProps<T>): void;
    toggleSortOrder(order: string, column: ColumnProps<T>): void;
    setNewFilterState(newState: any): void;
    handleFilterSelectClear: () => void;
    handleFilterSelectChange: (barFilters: any[]) => void;
    handleColumnFilterChange: (e?: any) => void;
    handleFilter: (column: ColumnProps<T>, nextFilters: string[]) => void;
    handleSelect: (record: T, rowIndex: number, e: CheckboxChangeEvent) => void;
    handleRadioSelect: (record: T, rowIndex: number, e: RadioChangeEvent) => void;
    handleSelectRow: (selectionKey: string, index: number, onSelectFunc: SelectionItemSelectFn) => any;
    handlePageChange: (current: number, ...otherArguments: any[]) => void;
    renderSelectionBox: (type: "checkbox" | "radio" | undefined) => (_: any, record: T, index: number) => JSX.Element;
    getRecordKey: (record: T, index: number) => any;
    getPopupContainer: () => HTMLElement;
    renderRowSelection(locale: TableLocale): ColumnProps<T>[];
    getColumnKey(column: ColumnProps<T>, index?: number): string | number | undefined;
    getMaxCurrent(total: number): number | undefined;
    isSortColumn(column: ColumnProps<T>): boolean;
    renderColumnsDropdown(columns: ColumnProps<T>[], locale: TableLocale): any[];
    handleShowSizeChange: (current: number, pageSize: number) => void;
    renderPagination(paginationPosition: string): JSX.Element | null;
    prepareParamsArguments(state: any): [any, string[], Object, any[]];
    findColumn(myKey: string | number): ColumnProps<T> | undefined;
    getCurrentPageData(): T[];
    getFlatData(): any[];
    getFlatCurrentPageData(): any[];
    recursiveSort(data: T[], sorterFn: (a: any, b: any) => number): T[];
    getLocalData(): T[];
    doBarFilter(filter: any, record: T): boolean;
    createComponents(components?: TableComponents, prevComponents?: TableComponents): void;
    renderTable: (contextLocale: TableLocale, loading: SpinProps) => React.ReactNode;
    render(): JSX.Element;
}
