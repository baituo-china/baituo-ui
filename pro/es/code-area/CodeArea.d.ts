import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { EditorConfiguration } from 'codemirror';
import { IInstance } from 'react-codemirror2';
import FormField from '../field';
import { FormFieldProps } from '../field/FormField';
import { CodeAreaFormatter } from './CodeAreaFormatter';
export interface CodeAreaProps extends FormFieldProps {
    options?: EditorConfiguration;
    formatHotKey?: string;
    unFormatHotKey?: string;
    formatter?: CodeAreaFormatter;
}
export default class CodeArea extends FormField<CodeAreaProps> {
    static displayName: string;
    static propTypes: {
        id: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<import("../core/enum").Size>;
        suffixCls: PropTypes.Requireable<string>;
        prefixCls: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        hidden: PropTypes.Requireable<boolean>;
        autoFocus: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        tabIndex: PropTypes.Requireable<number>;
        lang: PropTypes.Requireable<string>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseUp: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseMove: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseOver: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseOut: PropTypes.Requireable<(...args: any[]) => any>;
        onContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
        dataSet: PropTypes.Requireable<object>;
        type: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<any>;
        defaultValue: PropTypes.Requireable<any>;
        required: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
        form: PropTypes.Requireable<string>;
        dataIndex: PropTypes.Requireable<number>;
        multiple: PropTypes.Requireable<boolean>;
        rowSpan: PropTypes.Requireable<number>;
        colSpan: PropTypes.Requireable<number>;
        validator: PropTypes.Requireable<(...args: any[]) => any>;
        validationRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        onInvalid: PropTypes.Requireable<(...args: any[]) => any>;
        help: PropTypes.Requireable<string>;
        showHelp: PropTypes.Requireable<import("../field/enum").ShowHelp>;
        renderer: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onInput: PropTypes.Requireable<(...args: any[]) => any>;
        onEnterDown: PropTypes.Requireable<(...args: any[]) => any>;
        options: PropTypes.Requireable<object>;
        formatHotKey: PropTypes.Requireable<string>;
        unFormatHotKey: PropTypes.Requireable<string>;
        formatter: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        suffixCls: string;
        formatHotKey: string;
        unFormatHotKey: string;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    cmOptions: EditorConfiguration;
    text?: string;
    emptyValue?: any;
    handleBeforeChange(_editor: any, _data: any, value: any): void;
    handleCodeMirrorKeyDown(cm: any, e: any): void;
    getCodeMirrorOptions(options?: EditorConfiguration): EditorConfiguration;
    getOtherProps(): Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    componentWillReceiveProps(nextProps: any): void;
    renderWrapper(): ReactNode;
    setText(text?: string): void;
    getText(): string;
    processValue(value: any): any;
    /**
     * 编辑器失去焦点时，调用父类方法，同步DataSet中的内容
     *
     * @memberof CodeArea
     */
    handleCodeMirrorBlur: (codeMirrorInstance: IInstance) => void;
    /**
     * 在CodeMirror编辑器实例挂载前添加额外配置
     *
     * @memberof CodeArea
     */
    handleCodeMirrorDidMount: (editor: any) => void;
}
