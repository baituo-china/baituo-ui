import React, { Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ColumnProps } from './Column';
import { ElementProps } from '../core/ViewComponent';
import { FormField, FormFieldProps } from '../field/FormField';
export interface TableEditorProps extends ElementProps {
    column: ColumnProps;
}
export default class TableEditor extends Component<TableEditorProps> {
    static displayName: string;
    static propTypes: {
        column: PropTypes.Validator<object>;
    };
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    editorProps?: any;
    editor: FormField<FormFieldProps> | null;
    editing: boolean;
    currentEditorName?: string;
    saveRef: (node: any) => any;
    handleEditorKeyEnterDown: (e: any) => void;
    handleEditorKeyDown: (e: any) => void;
    handleEditorFocus: () => void;
    handleEditorBlur: (e: any) => void;
    hideEditor(): void;
    showNextEditor(reserve: boolean): void;
    renderEditor(): ReactElement<FormFieldProps> | undefined;
    render(): JSX.Element | null;
    componentDidUpdate(): void;
}
