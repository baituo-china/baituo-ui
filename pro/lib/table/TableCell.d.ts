import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ColumnProps } from './Column';
import Record from '../data-set/Record';
import { ElementProps } from '../core/ViewComponent';
import { FormFieldProps, Renderer } from '../field/FormField';
import { ColumnLock, TableCommandType } from './enum';
import { ButtonProps } from '../button/Button';
export interface TableCellProps extends ElementProps {
    column: ColumnProps;
    record: Record;
    indentSize: number;
}
export default class TableCell extends Component<TableCellProps> {
    static displayName: string;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        column: PropTypes.Validator<object>;
        record: PropTypes.Validator<Record>;
        indentSize: PropTypes.Validator<number>;
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    readonly cellEditor: React.ReactElement<FormFieldProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    readonly cellEditorInCell: boolean;
    readonly hasEditor: boolean | undefined;
    handleEditorKeyDown: (e: any) => void;
    handleFocus: (e: any) => void;
    handleCommandEdit: () => void;
    handleCommandDelete: () => void;
    handleCommandSave: () => Promise<void>;
    handleCommandCancel: () => void;
    getButtonProps(type: TableCommandType, record: Record): ButtonProps & {
        children?: ReactNode;
    } | undefined;
    renderCommand: Renderer;
    renderEditor: Renderer;
    getCheckBox(): JSX.Element | undefined;
    getCellRenderer(): Renderer | undefined;
    getInnerNode(prefixCls: any): {};
    render(): JSX.Element;
    showEditor(cell: any, lock?: ColumnLock | boolean): void;
}
