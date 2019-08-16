import React, { ChangeEvent, Component, CSSProperties, ReactNode, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import List, { TransferListProps } from './list';
import Operation from './operation';
import Search from './search';
import { TransferDirection } from './enum';
export { TransferListProps } from './list';
export { TransferOperationProps } from './operation';
export { TransferSearchProps } from './search';
export interface TransferItem {
    key: string;
    title: string;
    description?: string;
    disabled?: boolean;
}
export interface TransferProps {
    prefixCls?: string;
    className?: string;
    dataSource: TransferItem[];
    targetKeys?: string[];
    selectedKeys?: string[];
    render?: (record: TransferItem) => ReactNode;
    onChange?: (targetKeys: string[], direction: string, moveKeys: any) => void;
    onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
    style?: CSSProperties;
    listStyle?: CSSProperties;
    titles?: string[];
    operations?: string[];
    showSearch?: boolean;
    filterOption?: (inputValue: any, item: any) => boolean;
    searchPlaceholder?: string;
    notFoundContent?: ReactNode;
    footer?: (props: TransferListProps) => ReactNode;
    body?: (props: TransferListProps) => ReactNode;
    rowKey?: (record: TransferItem) => string;
    onSearchChange?: (direction: TransferDirection, e: ChangeEvent<HTMLInputElement>) => void;
    lazy?: {} | boolean;
    onScroll?: (direction: TransferDirection, e: SyntheticEvent<HTMLDivElement>) => void;
}
export interface TransferLocale {
    titles: string[];
    notFoundContent: string;
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
}
export default class Transfer extends Component<TransferProps, any> {
    static displayName: string;
    static List: typeof List;
    static Operation: typeof Operation;
    static Search: typeof Search;
    static defaultProps: {
        dataSource: never[];
        render: (...args: any[]) => any;
        showSearch: boolean;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        dataSource: PropTypes.Requireable<any[]>;
        render: PropTypes.Requireable<(...args: any[]) => any>;
        targetKeys: PropTypes.Requireable<any[]>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        height: PropTypes.Requireable<number>;
        listStyle: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        titles: PropTypes.Requireable<any[]>;
        operations: PropTypes.Requireable<any[]>;
        showSearch: PropTypes.Requireable<boolean>;
        filterOption: PropTypes.Requireable<(...args: any[]) => any>;
        searchPlaceholder: PropTypes.Requireable<string>;
        notFoundContent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        body: PropTypes.Requireable<(...args: any[]) => any>;
        footer: PropTypes.Requireable<(...args: any[]) => any>;
        rowKey: PropTypes.Requireable<(...args: any[]) => any>;
        lazy: PropTypes.Requireable<boolean | object>;
    };
    splitedDataSource: {
        leftDataSource: TransferItem[];
        rightDataSource: TransferItem[];
    } | null;
    constructor(props: TransferProps);
    componentWillReceiveProps(nextProps: TransferProps): void;
    splitDataSource(props: TransferProps): {
        leftDataSource: TransferItem[];
        rightDataSource: TransferItem[];
    };
    moveTo: (direction: TransferDirection) => void;
    moveToLeft: () => void;
    moveToRight: () => void;
    handleSelectChange(direction: TransferDirection, holder: string[]): void;
    handleSelectAll: (direction: TransferDirection, filteredDataSource: TransferItem[], checkAll: boolean) => void;
    handleLeftSelectAll: (filteredDataSource: TransferItem[], checkAll: boolean) => void;
    handleRightSelectAll: (filteredDataSource: TransferItem[], checkAll: boolean) => void;
    handleFilter: (direction: TransferDirection, e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLeftFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRightFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear: (direction: string) => void;
    handleLeftClear: () => void;
    handleRightClear: () => void;
    handleSelect: (direction: TransferDirection, selectedItem: TransferItem, checked: boolean) => void;
    handleLeftSelect: (selectedItem: TransferItem, checked: boolean) => void;
    handleRightSelect: (selectedItem: TransferItem, checked: boolean) => void;
    handleScroll: (direction: TransferDirection, e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
    handleLeftScroll: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
    handleRightScroll: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
    getTitles(transferLocale: TransferLocale): string[];
    getSelectedKeysName(direction: TransferDirection): "sourceSelectedKeys" | "targetSelectedKeys";
    renderTransfer: (locale: TransferLocale) => JSX.Element;
    render(): JSX.Element;
}
