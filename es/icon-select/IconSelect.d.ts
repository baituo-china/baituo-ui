import React, { Component, ReactNode } from 'react';
import { SelectProps } from '../select';
export interface IconSelectProps extends SelectProps {
    prefixCls?: string;
    showAll?: boolean;
}
export interface IconSelectState {
    current: number;
    total: number;
    pageSize: number;
    filterValue: string;
    data: any;
}
export default class IconSelect extends Component<IconSelectProps, IconSelectState> {
    static displayName: string;
    static defaultProps: {
        filter: boolean;
        showArrow: boolean;
        showCheckAll: boolean;
        showAll: boolean;
    };
    icons: any;
    rcSelect: ReactNode | null;
    constructor(props: IconSelectProps);
    componentDidMount(): void;
    initIcon(current?: number, pageSize?: number, filterValue?: string): void;
    renderOption(): any;
    handleRender: (label: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>) => JSX.Element | null;
    handlePageChange: (current: number, pageSize: number) => void;
    handleFilter: (value: string) => void;
    saveRef: (node: React.ReactNode) => void;
    renderFooter(): JSX.Element;
    render(): JSX.Element;
}
