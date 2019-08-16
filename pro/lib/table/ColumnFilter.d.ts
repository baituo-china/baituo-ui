import React, { Component, Key, ReactElement, ReactNode } from 'react';
import Menu from '../../../lib/rc-components/menu';
import { ColumnProps } from './Column';
export interface ColumnFilterProps {
    prefixCls?: string;
    onColumnFilterChange?: (item?: any) => void;
    getPopupContainer?: (triggerNode?: Element) => HTMLElement;
}
export default class ColumnFilter extends Component<ColumnFilterProps> {
    static displayName: string;
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    hidden: any;
    menu?: Menu | null;
    constructor(props: any, context: any);
    saveMenu: (node: any) => any;
    handleHiddenChange(hidden: any): void;
    handleKeyDown(e: any): void;
    setDropDownHidden(hidden: any): void;
    render(): JSX.Element;
    handleMenuSelect({ item: { props: { value } } }: {
        item: {
            props: {
                value: any;
            };
        };
    }): void;
    handleMenuUnSelect({ item: { props: { value } } }: {
        item: {
            props: {
                value: any;
            };
        };
    }): void;
    handleMenuClick({ domEvent }: {
        domEvent: any;
    }): void;
    getMenu(prefixCls: any): JSX.Element;
    getOptions(columns: [ColumnProps, ReactNode, Key][]): ReactElement<any>[];
}
