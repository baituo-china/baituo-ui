import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { TextField, TextFieldProps } from '../text-field/TextField';
import { formatNumber } from './utils';
import { ValidationMessages } from '../validator/Validator';
import { FieldType } from '../data-set/enum';
import { ValidatorProps } from '../validator/rules';
export interface NumberFieldProps extends TextFieldProps {
    /**
     * 最小值
     */
    min?: number;
    /**
     * 最大值
     */
    max?: number;
    /**
     * 步距
     */
    step?: number;
}
export declare class NumberField<T extends NumberFieldProps> extends TextField<T & NumberFieldProps> {
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
        placeholder: PropTypes.Requireable<string>;
        minLength: PropTypes.Requireable<number>;
        maxLength: PropTypes.Requireable<number>;
        pattern: PropTypes.Requireable<string | object>;
        autoComplete: PropTypes.Requireable<string>;
        prefix: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        suffix: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        clearButton: PropTypes.Requireable<boolean>;
        addonBefore: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        addonAfter: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        restrict: PropTypes.Requireable<string>;
        /**
         * 最小值
         */
        min: PropTypes.Requireable<number>;
        /**
         * 最大值
         */
        max: PropTypes.Requireable<number>;
        /**
         * 步距
         */
        step: PropTypes.Requireable<number>;
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
    static format: typeof formatNumber;
    readonly defaultValidationMessages: ValidationMessages | null;
    readonly allowDecimal: boolean;
    readonly allowNegative: boolean;
    readonly min: number | undefined;
    readonly max: number | undefined;
    getFieldType(): FieldType;
    getLimit(type: string): number | undefined;
    getValidatorProps(): ValidatorProps;
    getInnerSpanButton(): ReactNode;
    handleKeyDown(e: any): void;
    handleKeyDownUp(e: any): void;
    handleKeyDownDown(e: any): void;
    handlePlus(): void;
    handleMinus(): void;
    step(isPlus: boolean): void;
    addValue(value: any): void;
    restrictInput(value: string): string;
    getFormatOptions(): Intl.NumberFormatOptions | undefined;
    getFormatter(): typeof formatNumber;
    processText(text?: any, value?: any, repeat?: number): any;
}
export default class ObserverNumberField extends NumberField<NumberFieldProps> {
    static defaultProps: {
        suffixCls: string;
        autoComplete: string;
        clearButton: boolean;
        multiple: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    static format: typeof formatNumber;
}
