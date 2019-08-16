import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { FormField, FormFieldProps } from '../field/FormField';
import { ValidationMessages } from '../validator/Validator';
import { ViewMode } from './enum';
export interface RadioProps extends FormFieldProps {
    /**
     * <受控>是否选中
     */
    checked?: boolean;
    /**
     * 初始是否选中
     */
    defaultChecked?: boolean;
    /**
     * 显示模式
     * 可选值： button | box
     * @default box
     */
    mode?: ViewMode;
}
export declare class Radio<T extends RadioProps> extends FormField<T & RadioProps> {
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
        /**
         * <受控>是否选中
         */
        checked: PropTypes.Requireable<boolean>;
        /**
         * 初始是否选中
         */
        defaultChecked: PropTypes.Requireable<boolean>;
        /**
         * 显示模式
         * 可选值： button | box
         * @default box
         */
        mode: PropTypes.Requireable<ViewMode>;
    };
    static defaultProps: {
        suffixCls: string;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    type: string;
    readonly defaultValidationMessages: ValidationMessages | null;
    readonly checkedValue: (T & RadioProps)["value"];
    readonly isControlled: boolean;
    getOtherProps(): Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    renderWrapper(): ReactNode;
    renderInner(): ReactNode;
    /**
     * 当使用label代替children时，不需要展示float label
     *
     * @readonly
     * @memberof Radio
     */
    readonly hasFloatLabel: boolean;
    /**
     * 没有children时，使用label替代children
     *
     * @returns {ReactNode} label
     * @memberof Radio
     */
    getLabelChildren(): ReactNode;
    getChildrenText(): React.ReactNode;
    getText(): JSX.Element | undefined;
    getWrapperClassNames(...args: any[]): string;
    isChecked(): (T & RadioProps)["checked"];
    handleMouseDown(e: any): void;
    handleChange(e: any): void;
    setChecked(checked: boolean): void;
    getOldValue(): any;
}
export default class ObserverRadio extends Radio<RadioProps> {
    static defaultProps: {
        suffixCls: string;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
}
