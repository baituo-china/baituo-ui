import { CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Trigger from '../trigger/Trigger';
import { Action } from '../trigger/enum';
import { TextField, TextFieldProps } from '../text-field/TextField';
import TaskRunner from '../_util/TaskRunner';
export interface TriggerFieldProps extends TextFieldProps {
    /**
     * 下拉框的自定义内容
     */
    popupContent?: ReactNode | ((props: any) => ReactNode);
    /**
     * 下拉框的自定义样式名
     */
    popupCls?: string;
    /**
     * 下拉框的内链样式
     */
    popupStyle?: CSSProperties;
    /**
     * 触发下拉框的方式组
     * 可选值：click | focus | hover | contextMenu
     */
    trigger?: Action[];
    /**
     * 下拉框显示延迟
     * @defualt 150
     */
    triggerShowDelay?: number;
    /**
     * 下拉框隐藏延迟
     * @defualt 50
     */
    triggerHiddenDelay?: number;
}
export default abstract class TriggerField<T extends TriggerFieldProps> extends TextField<T & TriggerFieldProps> {
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
         * 下拉框的自定义内容
         */
        popupContent: PropTypes.Requireable<PropTypes.ReactElementLike>;
        /**
         * 下拉框的自定义样式名
         */
        popupCls: PropTypes.Requireable<string>;
        /**
         * 下拉框的内链样式
         */
        popupStyle: PropTypes.Requireable<object>;
        /**
         * 触发下拉框的方式
         * 可选值：click | focus | hover | contextMenu
         */
        trigger: PropTypes.Requireable<any>;
        /**
         * 下拉框显示延迟
         * @defualt 150
         */
        triggerShowDelay: PropTypes.Requireable<number>;
        /**
         * 下拉框隐藏延迟
         * @defualt 50
         */
        triggerHiddenDelay: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        suffixCls: string;
        clearButton: boolean;
        trigger: string[];
        triggerShowDelay: number;
        triggerHiddenDelay: number;
        autoComplete: string;
        multiple: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    popupTask: TaskRunner;
    trigger: Trigger | null;
    statePopup: boolean;
    readonly popup: boolean;
    constructor(props: any, context: any);
    setPopup(statePopup: boolean): void;
    abstract getTriggerIconFont(): string;
    abstract handlePopupAnimateAppear(key: any): any;
    abstract handlePopupAnimateEnd(key: any, exists: any): any;
    abstract getPopupStyleFromAlign(target: any): CSSProperties | undefined;
    abstract getPopupContent(): any;
    getRootDomNode(): Element | Text | null;
    getOtherProps(): Pick<Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getPopupProps(): {};
    getWrappedEditor(): JSX.Element;
    getWrapperClassNames(...args: any[]): string;
    getDefaultSuffix(): ReactNode;
    handlePopupMouseDown(e: any): void;
    handlePopupHiddenChange(hidden: boolean): void;
    forcePopupAlign(): void;
    expand(): void;
    collapse(): void;
}
