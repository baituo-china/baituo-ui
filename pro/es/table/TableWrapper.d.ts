import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ElementProps } from '../core/ViewComponent';
import { ColumnProps } from './Column';
import { ColumnLock } from './enum';
export interface TableWrapperProps extends ElementProps {
    lock?: ColumnLock | boolean;
    hasBody?: boolean;
    hasHeader?: boolean;
    hasFooter?: boolean;
}
export default class TableWrapper extends Component<TableWrapperProps, any> {
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    static propTypes: {
        lock: PropTypes.Requireable<boolean | ColumnLock>;
        hasBody: PropTypes.Requireable<boolean>;
        hasHeader: PropTypes.Requireable<boolean>;
        hasFooter: PropTypes.Requireable<boolean>;
    };
    tableWrapper: HTMLTableElement | null;
    readonly leafColumnsWidth: number | undefined;
    readonly leafEditorColumns: ColumnProps[];
    readonly leafColumns: ColumnProps[];
    handleResizeEnd: () => void;
    getCol(column: any, width: any): ReactNode;
    getColGroup(): ReactNode;
    getEditors(): JSX.Element[];
    saveRef: (node: any) => void;
    readonly tableWidth: string | undefined;
    render(): (false | JSX.Element | JSX.Element[] | undefined)[];
    syncFixedTableRowHeight(): void;
}
