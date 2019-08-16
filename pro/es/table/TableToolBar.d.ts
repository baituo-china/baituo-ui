import React, { Component, ReactElement, ReactNode } from 'react';
import DataSet from '../data-set/DataSet';
import Record from '../data-set/Record';
import { TableButtonType } from './enum';
import { ElementProps } from '../core/ViewComponent';
import { ButtonProps } from '../button/Button';
import Field, { Fields } from '../data-set/Field';
import { Buttons } from './Table';
/**
 * 去除级联字段
 *
 * @export
 * @param {Fields} fields 待筛选的字段数组
 * @returns {{ [key: string]: Field }} 不含级联字段的字段数组
 */
export declare function filterBindField(fields: Fields): {
    [key: string]: Field;
};
export interface TabelToolBarProps extends ElementProps {
    header?: ReactNode | ((records: Record[]) => ReactNode);
    buttons?: Buttons[];
    queryFields: {
        [key: string]: ReactElement<any> | object;
    };
    queryFieldsLimit: number;
    showQueryBar: boolean;
}
export default class TableToolBar extends Component<TabelToolBarProps, any> {
    static displayName: string;
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    modal: any;
    exportModal: any;
    exportDataSet: DataSet;
    handleFieldEnter: () => void;
    handleButtonCreate: () => void;
    handleButtonSubmit: () => any;
    handleButtonDelete: () => void;
    handleButtonRemove: () => void;
    handleButtonReset: () => any;
    handleQueryReset: () => void;
    handleExpandAll: () => any;
    handleCollapseAll: () => any;
    handleButtonExport: () => Promise<void>;
    handleQuery: () => void;
    handleExport: () => false | undefined;
    componentWillUnmount(): void;
    getButtonProps(type: TableButtonType): ButtonProps & {
        children?: ReactNode;
    } | undefined;
    getButtons(): ReactNode;
    getQueryBar(): ReactNode;
    getDirtyInfo(current: Record | undefined, moreKeys: string[]): JSX.Element | undefined;
    getCurrentFields(fields: Field[], dataSet: DataSet): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    getMoreButton(fields: Field[], dataSet: DataSet): JSX.Element | undefined;
    createFields(fields: Field[], dataSet: DataSet, isMore: boolean): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    openMore(children: ReactNode): void;
    render(): JSX.Element | null;
}
