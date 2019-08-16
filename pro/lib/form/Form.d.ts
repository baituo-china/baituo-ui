import React, { FormEvent, FormEventHandler, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { AxiosInstance } from 'axios';
import { FormField, FormFieldProps } from '../field/FormField';
import DataSetComponent, { DataSetComponentProps } from '../data-set/DataSetComponent';
import DataSet from '../data-set/DataSet';
import Record from '../data-set/Record';
import { LabelAlign, LabelLayout, ResponsiveKeys } from './enum';
import EventManager from '../_util/EventManager';
export declare type LabelWidth = number | number[];
export declare type LabelWidthType = LabelWidth | {
    [key in ResponsiveKeys]: LabelWidth;
};
export declare type LabelAlignType = LabelAlign | {
    [key in ResponsiveKeys]: LabelAlign;
};
export declare type LabelLayoutType = LabelLayout | {
    [key in ResponsiveKeys]: LabelLayout;
};
export declare type ColumnsType = number | {
    [key in ResponsiveKeys]: number;
};
export interface FormProps extends DataSetComponentProps {
    /**
     * 表单提交请求地址
     */
    action?: string;
    /**
     * 表单提交的HTTP Method
     * 可选值：POST | GET
     * @default POST
     */
    method?: string;
    /**
     * 表单提交的目标
     * 当表单设置了设置target且没有dataSet时作浏览器默认提交，否则作Ajax提交
     */
    target?: string;
    /**
     * Ajax提交时的参数回调
     */
    processParams?: (e: FormEvent<any>) => any;
    /**
     * 内部控件的标签的宽度
     */
    labelWidth?: LabelWidthType;
    /**
     * 标签文字对齐方式
     * 可选值： 'left' | 'center' | 'right'
     * @default right;
     */
    labelAlign?: LabelAlignType;
    /**
     * 标签位置
     * 可选值： 'horizontal' | 'vertical' | 'placeholder' | 'none'
     */
    labelLayout?: LabelLayoutType;
    /**
     * 表单列数
     */
    columns?: ColumnsType;
    /**
     * 表单头，若提供则同时显示表单头和表单头下方的分隔线
     *
     * @type {string} 暂定为string方便写样式
     * @memberof FormProps
     */
    header?: string;
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
     * 提交回调
     */
    onSubmit?: FormEventHandler<any>;
    /**
     * 重置回调
     */
    onReset?: FormEventHandler<any>;
    /**
     * 提交成功回调
     */
    onSuccess?: (resp: any) => void;
    /**
     * 提交失败回调
     */
    onError?: (error: Error) => void;
    axios?: AxiosInstance;
}
export default class Form extends DataSetComponent<FormProps> {
    static displayName: string;
    static propTypes: {
        id: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<import("../core/enum").Size>;
        suffixCls: PropTypes.Requireable<string>;
        prefixCls: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>; /**
         * 表单提交请求地址
         */
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
        /**
         * 表单提交请求地址
         */
        action: PropTypes.Requireable<string>;
        /**
         * 表单提交的HTTP Method
         * 可选值：POST | GET
         * @default POST
         */
        method: PropTypes.Requireable<string>;
        /**
         * 表单提交的目标
         * 当表单设置了设置target且没有dataSet时作浏览器默认提交，否则作Ajax提交
         */
        target: PropTypes.Requireable<string>;
        /**
         * Ajax提交时的参数回调
         */
        processParams: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 内部控件的标签的宽度
         */
        labelWidth: PropTypes.Requireable<number | (number | null)[] | PropTypes.InferProps<{
            [ResponsiveKeys.xs]: PropTypes.Requireable<number | (number | null)[]>;
            [ResponsiveKeys.sm]: PropTypes.Requireable<number | (number | null)[]>;
            [ResponsiveKeys.md]: PropTypes.Requireable<number | (number | null)[]>;
            [ResponsiveKeys.lg]: PropTypes.Requireable<number | (number | null)[]>;
            [ResponsiveKeys.xl]: PropTypes.Requireable<number | (number | null)[]>;
            [ResponsiveKeys.xxl]: PropTypes.Requireable<number | (number | null)[]>;
        }>>;
        /**
         * 标签文字对齐方式
         * 可选值： 'left' | 'center' | 'right'
         */
        labelAlign: PropTypes.Requireable<LabelAlign | PropTypes.InferProps<{
            [ResponsiveKeys.xs]: PropTypes.Requireable<LabelAlign>;
            [ResponsiveKeys.sm]: PropTypes.Requireable<LabelAlign>;
            [ResponsiveKeys.md]: PropTypes.Requireable<LabelAlign>;
            [ResponsiveKeys.lg]: PropTypes.Requireable<LabelAlign>;
            [ResponsiveKeys.xl]: PropTypes.Requireable<LabelAlign>;
            [ResponsiveKeys.xxl]: PropTypes.Requireable<LabelAlign>;
        }>>;
        /**
         * 标签位置
         * 可选值： 'horizontal' | 'vertical' | 'placeholder' | 'float' | 'none'
         */
        labelLayout: PropTypes.Requireable<LabelLayout | PropTypes.InferProps<{
            [ResponsiveKeys.xs]: PropTypes.Requireable<LabelLayout>;
            [ResponsiveKeys.sm]: PropTypes.Requireable<LabelLayout>;
            [ResponsiveKeys.md]: PropTypes.Requireable<LabelLayout>;
            [ResponsiveKeys.lg]: PropTypes.Requireable<LabelLayout>;
            [ResponsiveKeys.xl]: PropTypes.Requireable<LabelLayout>;
            [ResponsiveKeys.xxl]: PropTypes.Requireable<LabelLayout>;
        }>>;
        /**
         * 表单列数
         */
        columns: PropTypes.Requireable<number | PropTypes.InferProps<{
            [ResponsiveKeys.xs]: PropTypes.Requireable<number>;
            [ResponsiveKeys.sm]: PropTypes.Requireable<number>;
            [ResponsiveKeys.md]: PropTypes.Requireable<number>;
            [ResponsiveKeys.lg]: PropTypes.Requireable<number>;
            [ResponsiveKeys.xl]: PropTypes.Requireable<number>;
            [ResponsiveKeys.xxl]: PropTypes.Requireable<number>;
        }>>;
        /**
         * 表单头
         */
        header: PropTypes.Requireable<string>;
        /**
         * 提交回调
         */
        onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 重置回调
         */
        onReset: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 提交成功回调
         */
        onSuccess: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 提交失败回调
         */
        onError: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        suffixCls: string;
        columns: number;
        labelWidth: number;
    };
    static contextType: React.Context<{}>;
    fields: FormField<FormFieldProps>[];
    responsiveKey: ResponsiveKeys;
    resizeEvent: EventManager;
    name: string;
    readonly axios: AxiosInstance;
    readonly dataSet: DataSet | undefined;
    readonly record: Record | undefined;
    readonly dataIndex: number | undefined;
    readonly columns: number;
    readonly labelWidth: LabelWidth;
    readonly labelAlign: LabelAlign;
    readonly labelLayout: LabelLayout;
    readonly pristine: boolean;
    constructor(props: any, context: any);
    isDisabled(): any;
    getObservableProps(props: any, context: any): {
        dataSet: any;
        record: any;
        dataIndex: any;
        labelLayout: any;
        labelAlign: any;
        labelWidth: any;
        pristine: any;
        columns: any;
    };
    handleResize: () => void;
    componentDidMount(): void;
    componentWillReceiveProps(props: any, context: any): void;
    componentWillUnmount(): void;
    clear(): void;
    setResponsiveKey(): void;
    initResponsive(): void;
    getOtherProps(): Pick<Pick<any, string | number | symbol>, string | number | symbol>;
    getHeader(): ReactNode;
    getClassName(...props: any[]): string | undefined;
    rasterizedChildren(): ({} | null | undefined)[];
    render(): JSX.Element;
    handleSubmit(e: any): Promise<void>;
    handleReset(e: any): void;
    checkValidity(): Promise<boolean>;
    getFields(): FormField<FormFieldProps>[];
    getField(name: string): FormField<FormFieldProps> | undefined;
    addField(field: FormField<FormFieldProps>): void;
    removeField(field: any): void;
}
