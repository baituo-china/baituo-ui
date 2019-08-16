import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Select, SelectProps } from '../select/Select';
import { ValidationMessages } from '../validator/Validator';
import Option from '../option/Option';
import OptGroup from '../option/OptGroup';
import { ViewMode } from '../radio/enum';
export interface SelectBoxProps extends SelectProps {
    /**
     * 是否垂直显示
     */
    vertical?: boolean;
    mode?: ViewMode;
}
export default class SelectBox extends Select<SelectBoxProps> {
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
        popupContent: PropTypes.Requireable<PropTypes.ReactElementLike>;
        popupCls: PropTypes.Requireable<string>;
        popupStyle: PropTypes.Requireable<object>;
        trigger: PropTypes.Requireable<any>;
        triggerShowDelay: PropTypes.Requireable<number>;
        triggerHiddenDelay: PropTypes.Requireable<number>;
        combo: PropTypes.Requireable<boolean>;
        searchable: PropTypes.Requireable<boolean>;
        primitiveValue: PropTypes.Requireable<boolean>;
        optionRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 是否垂直显示
         */
        vertical: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        suffixCls: string;
        vertical: boolean;
        combo: boolean;
        searchable: boolean;
        dropdownMatchSelectWidth: boolean;
        checkValueOnOptionsChange: boolean;
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
    static Option: typeof Option;
    static OptGroup: typeof OptGroup;
    readonly defaultValidationMessages: ValidationMessages | null;
    setName(name: any): void;
    getOtherProps(): Pick<Pick<Pick<Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getClassName(): string | undefined;
    isEmpty(): boolean;
    renderWrapper(): ReactNode;
    handleItemChange(value: any, oldValue: any): void;
    isChecked(value: any, checkedValue: any): boolean;
    renderItem(props: any): JSX.Element;
}
