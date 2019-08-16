import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioProps } from '../radio/Radio';
export interface CheckBoxProps extends RadioProps {
    /**
     * 中间状态
     */
    indeterminate?: boolean;
    /**
     * 未选中时的值
     */
    unCheckedValue?: any;
    /**
     * 非选中时的内容
     */
    unCheckedChildren?: ReactNode;
    defaultChecked?: boolean;
}
export declare class CheckBox<T extends CheckBoxProps> extends Radio<T & CheckBoxProps> {
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
        checked: PropTypes.Requireable<boolean>;
        defaultChecked: PropTypes.Requireable<boolean>;
        mode: PropTypes.Requireable<import("../radio/enum").ViewMode>;
        /**
         * 中间状态
         */
        indeterminate: PropTypes.Requireable<boolean>;
        /**
         * 未选中时的值
         */
        unCheckedValue: PropTypes.Requireable<any>;
        /**
         * 未选中时的内容
         */
        unCheckedChildren: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        suffixCls: string;
        indeterminate: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    type: string;
    readonly unCheckedValue: any;
    readonly checkedValue: any;
    constructor(props: any, context: any);
    getOtherProps(): Pick<Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    renderInner(): ReactNode;
    getChildrenText(): (T & CheckBoxProps & RadioProps)["unCheckedChildren"];
    getWrapperClassNames(): string;
    isChecked(): (T & CheckBoxProps & RadioProps)["checked"];
    getDataSetValues(): any[];
    setValue(value: any): void;
    setChecked(checked: any): void;
    getOldValue(): any;
}
export default class ObserverCheckBox extends CheckBox<CheckBoxProps> {
    static defaultProps: {
        suffixCls: string;
        indeterminate: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
}
