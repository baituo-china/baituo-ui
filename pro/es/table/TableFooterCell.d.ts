import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ColumnProps } from './Column';
import { ElementProps } from '../core/ViewComponent';
import DataSet from '../data-set/DataSet';
export interface TableFooterCellProps extends ElementProps {
    dataSet: DataSet;
    column: ColumnProps;
}
export default class TableFooterCell extends Component<TableFooterCellProps, any> {
    static displayName: string;
    static propTypes: {
        column: PropTypes.Validator<object>;
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    getFooter(footer: any, dataSet: any): ReactNode;
    render(): JSX.Element;
}
