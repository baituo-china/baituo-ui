import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColumnProps } from './Column';
import { ElementProps } from '../core/ViewComponent';
import DataSet from '../data-set/DataSet';
import EventManager from '../_util/EventManager';
export interface TableHeaderCellProps extends ElementProps {
    dataSet: DataSet;
    prevColumn?: ColumnProps;
    column: ColumnProps;
    resizeColumn?: ColumnProps;
    rowSpan?: number;
    colSpan?: number;
    getHeaderNode: () => HTMLTableSectionElement | null;
}
export default class TableHeaderCell extends Component<TableHeaderCellProps, any> {
    static displayName: string;
    static propTypes: {
        column: PropTypes.Validator<object>;
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    resizeEvent: EventManager;
    resizeBoundary: number;
    resizePosition?: number;
    resizeColumn?: ColumnProps;
    handleClick: () => void;
    getNode(column: any): Element | null | undefined;
    setResizeColumn(column: any): void;
    handleLeftResize: (e: any) => void;
    handleRightResize: (e: any) => void;
    resizeStart(e: any): void;
    resize: (e: any) => void;
    resizeEnd: () => void;
    setSplitLinePosition(left: number): number | undefined;
    renderResizer(): (false | JSX.Element | undefined)[];
    render(): JSX.Element;
    componentWillUnmount(): void;
}
