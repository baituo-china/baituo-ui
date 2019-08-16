import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { SpinProps } from '../spin';
import { Size } from '../_util/enum';
import Item from './Item';
export { ListItemProps, ListItemMetaProps } from './Item';
export declare type ColumnCount = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
export declare type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export interface ListGridType {
    gutter?: number;
    column?: ColumnCount;
    xs?: ColumnCount;
    sm?: ColumnCount;
    md?: ColumnCount;
    lg?: ColumnCount;
    xl?: ColumnCount;
    xxl?: ColumnCount;
}
export interface ListProps {
    bordered?: boolean;
    className?: string;
    children?: ReactNode;
    dataSource: any;
    extra?: ReactNode;
    grid?: ListGridType;
    id?: string;
    itemLayout?: string;
    loading?: boolean | SpinProps;
    loadMore?: ReactNode;
    pagination?: any;
    prefixCls?: string;
    rowKey?: any;
    renderItem: any;
    size?: Size;
    split?: boolean;
    header?: ReactNode;
    footer?: ReactNode;
    empty?: ReactNode;
    locale?: Object;
}
export interface ListLocale {
    emptyText: string;
}
export default class List extends Component<ListProps> {
    static displayName: string;
    static Item: typeof Item;
    static childContextTypes: {
        grid: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        dataSource: never[];
        bordered: boolean;
        split: boolean;
        loading: boolean;
        pagination: boolean;
    };
    private keys;
    getChildContext(): {
        grid: ListGridType | undefined;
    };
    renderItem: (item: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, index: number) => any;
    isSomethingAfterLastTtem(): boolean;
    renderEmpty: (contextLocale: ListLocale) => JSX.Element;
    getPrefixCls(): string;
    render(): JSX.Element;
}
