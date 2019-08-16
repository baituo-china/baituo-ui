import React, { FormEventHandler, ReactInstance, ReactNode } from 'react';
import PropTypes from 'prop-types';
import DataSet from '../data-set/DataSet';
import Record from '../data-set/Record';
import Field from '../data-set/Field';
import Validator, { CustomValidator, ValidationMessages } from '../validator/Validator';
import Validity from '../validator/Validity';
import DataSetComponent, { DataSetComponentProps } from '../data-set/DataSetComponent';
import { FieldType } from '../data-set/enum';
import ValidationResult from '../validator/ValidationResult';
import { ShowHelp } from './enum';
import { ValidatorProps } from '../validator/rules';
import { LabelLayout } from '../form/enum';
export declare type RenderProps = {
    value?: any;
    text?: any;
    record?: Record | null;
    name?: string;
    dataSet?: DataSet | null;
    repeat?: number;
};
export declare type Renderer = (props: RenderProps) => ReactNode;
export declare function getFieldsById(id: any): FormField<FormFieldProps>[];
export interface FormFieldProps extends DataSetComponentProps {
    /**
     * 标签名
     */
    label?: string;
    labelLayout?: LabelLayout;
    /**
     * 字段名
     */
    name?: string;
    /**
     * <受控>当前值
     */
    value?: any;
    /**
     * 默认值
     */
    defaultValue?: any;
    /**
     * 是否必输
     */
    required?: boolean;
    /**
     * 是否只读
     */
    readOnly?: boolean;
    /**
     * 对照表单id
     */
    form?: string;
    /**
     * 对照record在DataSet中的index
     * @default dataSet.currentIndex
     */
    dataIndex?: number;
    /**
     * 对照record
     * 优先级高于dataSet和dataIndex
     */
    record?: Record;
    /**
     * 是否是多值
     * @default false
     */
    multiple?: boolean;
    /**
     * 校验器
     */
    validator?: CustomValidator;
    /**
     * 不校验
     */
    noValidate?: boolean;
    /**
     * 额外信息，常用作提示
     *
     * @type {string}
     * @memberof FormFieldProps
     */
    help?: string;
    /**
     * 显示提示信息的方式
     *
     * @type {ShowHelp}
     * @memberof FormFieldProps
     */
    showHelp?: ShowHelp;
    /**
     * 渲染器
     */
    renderer?: Renderer;
    /**
     * 多值标签超出最大数量时的占位描述
     */
    maxTagPlaceholder?: ReactNode | ((omittedValues: any[]) => ReactNode);
    /**
     * 多值标签最大数量
     */
    maxTagCount?: number;
    /**
     * 多值标签文案最大长度
     */
    maxTagTextLength?: number;
    /**
     * 显示原始值
     */
    pristine?: boolean;
    /**
     * 校验失败回调
     */
    onInvalid?: (validationResults: ValidationResult[], validity: Validity, name?: string) => void;
    /**
     * 值变化回调
     */
    onChange?: (value: any, oldValue: any, form?: ReactInstance) => void;
    /**
     * 输入回调
     */
    onInput?: FormEventHandler<any>;
    /**
     * 键盘回车回调
     */
    onEnterDown?: FormEventHandler<any>;
    /**
     * 值清空回调
     */
    onClear?: () => void;
}
export declare class FormField<T extends FormFieldProps> extends DataSetComponent<T> {
    static contextType: React.Context<{}>;
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
        onFocus: PropTypes.Requireable<(...args: any[]) => any>; /**
         * <受控>当前值
         */
        onBlur: PropTypes.Requireable<(...args: any[]) => any>; /**
         * 默认值
         */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 是否必输
         */
        onDoubleClick: PropTypes.Requireable<(...args: any[]) => any>; /**
         * 是否只读
         */
        onMouseUp: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseMove: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>; /**
         * 表单下控件跨越的行数
         */
        onMouseOver: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseOut: PropTypes.Requireable<(...args: any[]) => any>;
        onContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
        dataSet: PropTypes.Requireable<object>;
        type: PropTypes.Requireable<string>;
        /**
         * 字段名
         */
        name: PropTypes.Requireable<string>;
        /**
         * <受控>当前值
         */
        value: PropTypes.Requireable<any>;
        /**
         * 默认值
         */
        defaultValue: PropTypes.Requireable<any>;
        /**
         * 是否必输
         */
        required: PropTypes.Requireable<boolean>;
        /**
         * 是否只读
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * 对照表单id
         */
        form: PropTypes.Requireable<string>;
        /**
         * 对照record在DataSet中的index
         * @default dataSet.currentIndex
         */
        dataIndex: PropTypes.Requireable<number>;
        /**
         * 是否是多值
         * @default false
         */
        multiple: PropTypes.Requireable<boolean>;
        /**
         * 表单下控件跨越的行数
         */
        rowSpan: PropTypes.Requireable<number>;
        /**
         * 表单下控件跨越的列数
         */
        colSpan: PropTypes.Requireable<number>;
        /**
         * 校验器
         * (value: any, name?: string, form?: ReactInstance) => string | boolean | Promise<string | boolean>
         */
        validator: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 校验提示渲染器
         * (validationMessage: string, validity: Validity, name?: string) => ReactNode
         */
        validationRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 校验失败回调
         * (validationMessage: ReactNode, validity: Validity, name?: string) => void
         */
        onInvalid: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 额外信息，常用作提示
         */
        help: PropTypes.Requireable<string>;
        /**
         * 显示提示信息的方式
         */
        showHelp: PropTypes.Requireable<ShowHelp>;
        renderer: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 值变化回调
         * (value: any, oldValue: any, form?: ReactInstance) => void
         */
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 输入回调
         */
        onInput: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 键盘回车回调
         */
        onEnterDown: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    emptyValue?: any;
    readonly validator: Validator;
    name?: string;
    value: any | undefined;
    readonly labelLayout: any;
    readonly hasFloatLabel: boolean;
    readonly isControlled: boolean;
    readonly pristine: boolean;
    readonly defaultValidationMessages: ValidationMessages | null;
    readonly editable: boolean;
    readonly dataSet: DataSet | undefined;
    readonly record: Record | undefined;
    readonly field: Field | undefined;
    constructor(props: any, context: any);
    defaultRenderer({ text }: RenderProps): any;
    /**
     * 判断是否应该显示验证信息, 作为属性传给Tooltip
     *
     * @readonly
     * @type {(undefined | boolean)}
     * @memberof FormField
     */
    isValidationMessageHidden(message?: ReactNode): undefined | boolean;
    isEmpty(): boolean;
    getObservableProps(props: any, context: any): {
        record: any;
        dataSet: any;
        dataIndex: any;
        value: any;
    };
    getOtherProps(): Pick<Pick<any, string | number | symbol>, string | number | symbol>;
    render(): JSX.Element | ({} | null | undefined)[];
    getWrapperClassNames(...args: any[]): string;
    renderWrapper(): ReactNode;
    renderHelpMessage(): ReactNode;
    getLabel(): any;
    renderFloatLabel(): ReactNode;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: T, nextContext: any): void;
    setName(name: any): void;
    componentWillUnmount(): void;
    addToForm(props: any, context: any): void;
    removeFromForm(props: any, context: any): void;
    renderValidationMessage(validationResult?: ValidationResult): ReactNode;
    getValidatorProps(): ValidatorProps;
    readonly isValid: boolean;
    readonly multiple: boolean;
    getValidationMessage(validationResult?: ValidationResult): ReactNode;
    getValidationErrorValues(): any[];
    handleChange(e: any): void;
    handleKeyDown(e: any): void;
    handleEnterDown(e: any): void;
    handleMutipleValueRemove(e: any, value: any, index: number): void;
    getDateFormat(): string;
    processValue(value: any): any;
    isReadOnly(): boolean;
    getDataSetValue(): any;
    getText(): ReactNode;
    processText(text?: any, value?: any, repeat?: number): any;
    getOldValue(): any;
    getValue(): any;
    getValues(): any[];
    addValues(values: any[]): void;
    addValue(value: any): void;
    removeValues(values: any[], index?: number): void;
    removeValue(value: any, index?: number): void;
    afterRemoveValue(_value: any, _repeat: number): void;
    setValue(value: any): void;
    renderMultipleValues(readOnly?: boolean): (JSX.Element | undefined)[];
    clear(): void;
    checkValidity(): Promise<boolean>;
    validate(value?: any): Promise<boolean>;
    isDisabled(): any;
    reset(): void;
    getFieldType(): FieldType;
    getProp(propName: string): any;
}
export default class ObserverFormField<T extends FormFieldProps> extends FormField<T & FormFieldProps> {
    static defaultProps: {
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
}
