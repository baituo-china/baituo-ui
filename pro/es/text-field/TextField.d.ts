import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { FormField, FormFieldProps } from '../field/FormField';
import { ValidatorProps } from '../validator/rules';
import { GroupItemCategory } from './enum';
import { ShowHelp } from '../field/enum';
export declare function isPlaceHolderSupport(): boolean;
export interface TextFieldProps extends FormFieldProps {
    /**
     * 占位词
     */
    placeholder?: string;
    /**
     * 最小长度
     */
    minLength?: number;
    /**
     * 最大长度
     */
    maxLength?: number;
    /**
     * 正则校验
     */
    pattern?: string | RegExp;
    /**
     * 自动完成
     */
    autoComplete?: 'on' | 'off';
    /**
     * 前缀
     */
    prefix?: ReactNode;
    /**
     * 后缀
     */
    suffix?: ReactNode;
    /**
     * 是否显示清除按钮
     */
    clearButton?: boolean;
    /**
     * 前置标签
     */
    addonBefore?: ReactNode;
    /**
     * 后置标签
     */
    addonAfter?: ReactNode;
    /**
     * 限制可输入的字符
     */
    restrict?: string;
}
export declare class TextField<T extends TextFieldProps> extends FormField<T> {
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
        showHelp: PropTypes.Requireable<ShowHelp>;
        renderer: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onInput: PropTypes.Requireable<(...args: any[]) => any>;
        onEnterDown: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 占位词
         */
        placeholder: PropTypes.Requireable<string>;
        /**
         * 最小长度
         */
        minLength: PropTypes.Requireable<number>;
        /**
         * 最大长度
         */
        maxLength: PropTypes.Requireable<number>;
        /**
         * 正则校验
         */
        pattern: PropTypes.Requireable<string | object>;
        /**
         * 自动完成
         */
        autoComplete: PropTypes.Requireable<string>;
        /**
         * 前缀
         */
        prefix: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * 后缀
         */
        suffix: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * 是否显示清除按钮
         */
        clearButton: PropTypes.Requireable<boolean>;
        /**
         * 前置标签
         */
        addonBefore: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * 后置标签
         */
        addonAfter: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * 限制可输入的字符
         */
        restrict: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        suffixCls: string;
        autoComplete: string;
        clearButton: boolean;
        multiple: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    text?: string;
    type: string;
    isEmpty(): boolean;
    getOtherProps(): Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getValidatorProps(): ValidatorProps;
    getWrapperClassNames(...args: any[]): string;
    renderWrapper(): ReactNode;
    renderInputElement(): ReactNode;
    renderGroup(): ReactNode;
    renderTooltipHelp(): ReactNode;
    getPlaceholder(): T["placeholder"];
    getLabel(): any;
    wrapGroupItem(node: ReactNode, category: GroupItemCategory): ReactNode;
    renderMultipleEditor(props: T): JSX.Element;
    getWrappedEditor(): ReactNode;
    getEditor(): ReactNode;
    getSuffix(): ReactNode;
    getDefaultSuffix(): ReactNode;
    wrapperSuffix(children: ReactNode, props?: any): ReactNode;
    getPrefix(): ReactNode;
    wrapperPrefix(children: ReactNode): ReactNode;
    renderMultipleHolder(): JSX.Element | undefined;
    getOtherPrevNode(): ReactNode;
    getOtherNextNode(): ReactNode;
    renderPlaceHolder(): ReactNode;
    getPlaceHolderNode(): ReactNode;
    getInnerSpanButton(): ReactNode;
    wrapperInnerSpanButton(children: ReactNode, props?: any): ReactNode;
    removeLastValue(): void;
    handleKeyDown(e: any): void;
    handleMouseDown(e: any): void;
    handleClearButtonClick(): void;
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    syncValueOnBlur(value: any): void;
    setValue(value: any): void;
    getText(): string;
    setText(text?: string): void;
    select(): void;
    handleChange(e: any): void;
    restrictInput(value: string): string;
    toValueString(value: any): string | undefined;
}
export default class ObserverTextField extends TextField<TextFieldProps> {
    static defaultProps: {
        suffixCls: string;
        autoComplete: string;
        clearButton: boolean;
        multiple: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
}
