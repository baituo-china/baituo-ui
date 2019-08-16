import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColumnProps } from './Column';
import { ElementProps } from '../core/ViewComponent';
import { ColumnLock } from './enum';
import DataSet from '../data-set/DataSet';
export interface TableFooterProps extends ElementProps {
    dataSet: DataSet;
    lock?: ColumnLock | boolean;
}
export default class TableFooter extends Component<TableFooterProps, any> {
    static displayName: string;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        lock: PropTypes.Requireable<boolean | ColumnLock>;
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    render(): JSX.Element;
    readonly leafColumns: ColumnProps[];
}
