import React, { Component, Key, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ColumnProps } from './Column';
import Record from '../data-set/Record';
import { ElementProps } from '../core/ViewComponent';
import { ColumnLock } from './enum';
export interface TableRowProps extends ElementProps {
    lock?: ColumnLock | boolean;
    columns: ColumnProps[];
    record: Record;
    indentSize: number;
    index: number;
}
export default class TableRow extends Component<TableRowProps, any> {
    static displayName: string;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        lock: PropTypes.Requireable<boolean | ColumnLock>;
        columns: PropTypes.Validator<any[]>;
        record: PropTypes.Validator<Record>;
        indentSize: PropTypes.Validator<number>;
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    rowKey: Key;
    rowExternalProps: any;
    childrenRendered: boolean;
    node: HTMLTableRowElement | null;
    readonly expandable: boolean;
    isExpanded: boolean;
    isHover: boolean;
    private saveRef;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleSelectionByClick: () => void;
    handleSelectionByDblClick: () => void;
    handleExpandChange: () => void;
    handleClick: () => void;
    getCell: (column: ColumnProps, index: number) => React.ReactNode;
    focusRow(row: HTMLTableRowElement | null): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    handleSelection(): void;
    hasExpandIcon(columnIndex: any): boolean;
    renderExpandIcon(): JSX.Element;
    renderExpandRow(): ReactNode[];
    render(): ({} | null | undefined)[];
}
