import { Component, CSSProperties, ReactNode } from 'react';
import { Size } from '../_util/enum';
declare function itemRender(page: number, type: string, item: ReactNode, disabled: boolean, size?: Size): JSX.Element | undefined;
export interface PaginationProps {
    total?: number;
    defaultCurrent?: number;
    current?: number;
    defaultPageSize?: number;
    pageSize?: number;
    onChange?: (page: number, pageSize?: number) => void;
    hideOnSinglePage?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    onShowSizeChange?: (current: number, size: number) => void;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => ReactNode;
    size?: Size;
    simple?: boolean;
    style?: CSSProperties;
    locale?: Object;
    className?: string;
    prefixCls?: string;
    selectPrefixCls?: string;
    itemRender?: (page: number, type: 'page' | 'first' | 'last' | 'prev' | 'next' | 'jump-prev' | 'jump-next') => ReactNode;
}
export declare type PaginationLocale = any;
export default class Pagination extends Component<PaginationProps, {}> {
    static displayName: string;
    static defaultProps: {
        showSizeChanger: boolean;
        showSizeChangerLabel: boolean;
        tiny: boolean;
        pageSizeOptions: string[];
        showTotal: (total: number, range: number[]) => string;
        sizeChangerOptionText: (value: string) => string;
        itemRender: typeof itemRender;
    };
    renderPagination: (locale: any) => JSX.Element;
    render(): JSX.Element;
}
export {};
