import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ElementProps } from '../core/ViewComponent';
import { ColumnLock } from './enum';
import DataSet from '../data-set/DataSet';
import { ColumnGroup } from './ColumnGroups';
export interface TableHeaderProps extends ElementProps {
    dataSet: DataSet;
    lock?: ColumnLock | boolean;
}
export default class TableHeader extends Component<TableHeaderProps, any> {
    static displayName: string;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        lock: PropTypes.Requireable<boolean | ColumnLock>;
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    node: HTMLTableSectionElement | null;
    saveRef: (node: any) => any;
    getHeaderNode: () => HTMLTableSectionElement | null;
    render(): JSX.Element;
    getTableHeaderRows(columns: ColumnGroup[], currentRow?: number, rows?: ColumnGroup[][]): ColumnGroup[][];
    getHeaderRowStyle(rows: ColumnGroup[][], rowIndex: number): string | number | undefined;
    getRowHeight(index: any): number;
    readonly groupedColumns: ColumnGroup[];
}
