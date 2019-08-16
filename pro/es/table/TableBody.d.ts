import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { ColumnProps } from './Column';
import { ElementProps } from '../core/ViewComponent';
import Record from '../data-set/Record';
import { ColumnLock } from './enum';
export interface TableBodyProps extends ElementProps {
    lock?: ColumnLock | boolean;
    indentSize: number;
}
export default class TableBody extends Component<TableBodyProps, any> {
    static displayName: string;
    static propTypes: {
        lock: PropTypes.Requireable<boolean | ColumnLock>;
        prefixCls: PropTypes.Requireable<string>;
        indentSize: PropTypes.Validator<number>;
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    tableBody: HTMLTableSectionElement | null;
    resizeObserver?: ResizeObserver;
    private handleResize;
    saveRef: (node: any) => void;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    getRows(records: Record[], columns: ColumnProps[], expanded?: boolean, lock?: ColumnLock | boolean): JSX.Element[];
    getEmptyRow(columns: ColumnProps[], lock?: ColumnLock | boolean): ReactNode | undefined;
    renderExpandedRows: (columns: ColumnProps[], record: Record, isExpanded?: boolean | undefined, lock?: boolean | ColumnLock | undefined) => JSX.Element[];
    getRow(columns: ColumnProps[], record: Record, index: number, expanded?: boolean, lock?: ColumnLock | boolean): JSX.Element;
    readonly leafColumns: ColumnProps[];
    syncBodyHeight(): void;
}
