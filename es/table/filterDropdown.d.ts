import React, { Component, ReactElement } from 'react';
import { ColumnFilterItem, ColumnProps, FilterMenuProps, FilterMenuState } from './interface';
export default class FilterMenu<T> extends Component<FilterMenuProps<T>, FilterMenuState> {
    static defaultProps: {
        handleFilter(): void;
        column: {};
    };
    neverShown: boolean;
    constructor(props: FilterMenuProps<T>);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: FilterMenuProps<T>): void;
    setNeverShown: (column: ColumnProps<T>) => void;
    setSelectedKeys: ({ selectedKeys }: {
        selectedKeys: string[];
    }) => void;
    setVisible(visible: boolean): void;
    handleClearFilters: () => void;
    handleConfirm: () => void;
    onVisibleChange: (visible: boolean) => void;
    confirmFilter(): void;
    renderMenuItem(item: ColumnFilterItem): JSX.Element;
    hasSubMenu(): boolean;
    renderMenus(items: ColumnFilterItem[]): ReactElement<any>[];
    handleFilterDropdownMenuClick: (e: React.SyntheticEvent<any, Event>) => void;
    handleMenuItemClick: (info: {
        keyPath: string;
        key: string;
    }) => void;
    renderFilterIcon: () => JSX.Element;
    render(): JSX.Element;
}
