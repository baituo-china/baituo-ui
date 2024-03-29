import React, { Component, CSSProperties, ReactNode } from 'react';
import { TransferItem } from './index';
export interface TransferListProps {
    prefixCls: string;
    titleText: string;
    dataSource: TransferItem[];
    filter: string;
    filterOption?: (filterText: any, item: any) => boolean;
    style?: CSSProperties;
    checkedKeys: string[];
    handleFilter: (e: any) => void;
    handleSelect: (selectedItem: any, checked: boolean) => void;
    handleSelectAll: (dataSource: any[], checkAll: boolean) => void;
    handleClear: () => void;
    render?: (item: any) => any;
    showSearch?: boolean;
    searchPlaceholder: string;
    notFoundContent: ReactNode;
    itemUnit: string;
    itemsUnit: string;
    body?: (props: any) => any;
    footer?: (props: any) => void;
    lazy?: boolean | {};
    onScroll: Function;
}
export default class TransferList extends Component<TransferListProps, any> {
    static displayName: string;
    static defaultProps: {
        dataSource: never[];
        titleText: string;
        showSearch: boolean;
        render: (...args: any[]) => any;
        lazy: {};
    };
    timer: number;
    triggerScrollTimer: number;
    state: {
        mounted: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(...args: any[]): any;
    getCheckStatus(filteredDataSource: TransferItem[]): "all" | "none" | "part";
    handleSelect: (selectedItem: TransferItem) => void;
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear: () => void;
    matchFilter: (text: string, item: TransferItem) => boolean;
    renderItem: (item: TransferItem) => {
        renderedText: any;
        renderedEl: any;
    };
    render(): JSX.Element;
}
