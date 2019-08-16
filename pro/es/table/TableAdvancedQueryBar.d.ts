import React, { Component, ContextType, ReactElement, ReactNode } from 'react';
import Field from '../data-set/Field';
import DataSet from '../data-set';
import TableContext from './TableContext';
import { ElementProps } from '../core/ViewComponent';
export interface TableAdvancedQueryBarProps extends ElementProps {
    queryFields: {
        [key: string]: ReactElement<any> | object;
    };
    queryFieldsLimit: number;
}
export interface TableAdvancedQueryBarState {
    showMoreFieldsPanel: boolean;
}
export default class TableAdvancedQueryBar extends Component<TableAdvancedQueryBarProps, TableAdvancedQueryBarState> {
    static defaultProps: {
        queryFields: never[];
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    context: ContextType<typeof TableContext>;
    state: {
        showMoreFieldsPanel: boolean;
    };
    moreFields: Field[];
    handleFieldEnter: () => void;
    handleFieldChange: () => void;
    handleQuery: () => void;
    getMoreFieldsButton(fields: Field[]): JSX.Element | undefined;
    getClassName(): string;
    handleMoreFieldsButtonClick: () => void;
    getCurrentFields(fields: Field[], dataSet: DataSet): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    getQueryBar(): ReactNode;
    renderMoreFields(fields: ReactElement[]): JSX.Element[];
    renderMoreFieldsPanel(fields: Field[], dataSet: DataSet): JSX.Element;
    createFields(fields: Field[], dataSet: DataSet, isMore: boolean): ReactElement[];
    handleKeyValueItemClose: (label: string) => void;
    getMoreFields(): Field[];
    renderKeyValueBar(): JSX.Element;
    getMoreFieldKeys(): string[];
    render(): JSX.Element | null;
}
