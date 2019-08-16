import { CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IReactionDisposer } from 'mobx';
import Menu from '../../../es/rc-components/menu';
import TriggerField, { TriggerFieldProps } from '../trigger-field/TriggerField';
import { ValidationMessages } from '../validator/Validator';
import Option from '../option/Option';
import OptGroup from '../option/OptGroup';
import DataSet from '../data-set/DataSet';
import Record from '../data-set/Record';
export declare function getItemKey(record: Record, text: ReactNode, value: any): string;
declare type OptionRendererArg = {
    record: Record;
    text: string;
    value: any;
};
export interface SelectProps extends TriggerFieldProps {
    /**
     * 复合输入值
     * @default false
     */
    combo?: boolean;
    /**
     * 可搜索
     * @default false
     */
    searchable?: boolean;
    /**
     * 选项过滤
     * @param {Record} record
     * @return {boolean}
     */
    optionsFilter?: (record: Record, index: number, records: Record[]) => boolean;
    /**
     * 当选项改变时，检查并清除不在选项中的值
     * @default true
     */
    checkValueOnOptionsChange?: boolean;
    /**
     * 下拉框匹配输入框宽度
     * @default true
     */
    dropdownMatchSelectWidth?: boolean;
    /**
     * 下拉框菜单样式名
     */
    dropdownMenuStyle?: CSSProperties;
    /**
     * 选项数据源
     */
    options?: DataSet;
    /**
     * 是否为原始值
     * true - 选项中valueField对应的值
     * false - 选项值对象
     */
    primitiveValue?: boolean;
    /**
     * 渲染Option文本的钩子
     * @example
     * ```js
     * <Select
     *   {...props}
     *   optionRenderer={({ record, text, value }) => text + '$'}
     * />
     * ```
     */
    optionRenderer?: (arg: OptionRendererArg) => ReactNode;
}
export declare class Select<T extends SelectProps> extends TriggerField<T> {
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
        restrict: PropTypes.Requireable<string>; /**
         * 是否为原始值
         * true - 选项中valueField对应的值
         * false - 选项值对象
         */
        popupContent: PropTypes.Requireable<PropTypes.ReactElementLike>;
        popupCls: PropTypes.Requireable<string>;
        popupStyle: PropTypes.Requireable<object>;
        trigger: PropTypes.Requireable<any>;
        triggerShowDelay: PropTypes.Requireable<number>; /**
         * 可搜索
         * @default false
         */
        triggerHiddenDelay: PropTypes.Requireable<number>;
        /**
         * 复合输入值
         * @default false
         */
        combo: PropTypes.Requireable<boolean>;
        /**
         * 过滤器
         * @default false
         */
        searchable: PropTypes.Requireable<boolean>;
        /**
         * 是否为原始值
         * true - 选项中valueField对应的值
         * false - 选项值对象
         */
        primitiveValue: PropTypes.Requireable<boolean>;
        /**
         * 渲染Option文本的钩子
         * @example
         * ```js
         * <Select
         *   {...props}
         *   optionRenderer={({ record, text, value }) => text + '$'}
         * />
         * ```
         */
        optionRenderer: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        suffixCls: string;
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
    comboOptions: DataSet;
    menu?: Menu | null;
    readonly defaultValidationMessages: ValidationMessages | null;
    readonly textField: string;
    readonly valueField: string;
    readonly disabledField: string;
    readonly currentComboOption: Record | undefined;
    readonly filteredOptions: Record[];
    readonly cascadeOptions: Record[];
    readonly editable: boolean;
    readonly searchable: boolean;
    readonly multiple: boolean;
    readonly menuMultiple: boolean;
    readonly options: DataSet;
    readonly popup: boolean;
    readonly primitive: boolean;
    checkValueReaction?: IReactionDisposer;
    checkComboReaction?: IReactionDisposer;
    saveMenu: (node: any) => any;
    checkValue(): void;
    checkCombo(): void;
    clearCheckValue(): void;
    clearCheckCombo(): void;
    clearReaction(): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any, nextContext: any): void;
    componentDidUpdate(): void;
    getOtherProps(): Pick<Pick<Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getObservableProps(props: any, context: any): {
        children: any;
        options: any;
        combo: any;
        primitiveValue: any;
        record: any;
        dataSet: any;
        dataIndex: any;
        value: any;
    };
    getMenuPrefixCls(): string;
    renderMultipleHolder(): JSX.Element;
    getMenu(menuProps?: object): ReactNode;
    getPopupProps(): {
        dataSet: DataSet;
        textField: string;
        valueField: string;
    };
    getPopupContent(): JSX.Element | null;
    getPopupStyleFromAlign(target: any): CSSProperties | undefined;
    getTriggerIconFont(): string;
    handleKeyDown(e: any): void;
    handleKeyDownFirstLast(e: any, menu: Menu, direction: number): void;
    handleKeyDownPrevNext(e: any, menu: Menu, direction: number): void;
    handleKeyDownEnter(_e: any): void;
    handleKeyDownEsc(e: any): void;
    handleKeyDownSpace(e: any): void;
    handleBlur(e: any): void;
    expand(): void;
    syncValueOnBlur(value: any): void;
    findByTextWithValue(text: any): Record | undefined;
    findByText(text: any): Record | undefined;
    findByValue(value: any): Record | undefined;
    isSelected(record: Record): boolean;
    generateComboOption(value: string | any[], callback?: (text: string) => void): void;
    createComboOption(value: any): void;
    removeComboOptions(): void;
    removeComboOption(record?: Record): void;
    handlePopupAnimateAppear(): void;
    handlePopupAnimateEnd(key: any, exists: any): void;
    handleMenuClick({ item: { props: { value } } }: {
        item: {
            props: {
                value: any;
            };
        };
    }): void;
    handleOptionSelect(record: Record): void;
    handleOptionUnSelect(record: Record): void;
    handleChange(e: any): void;
    generateLookupValue(record: Record): any;
    processRecordToObject(record: Record): any;
    processObjectValue(value: any, textField: any): any;
    processLookupValue(value: any): any;
    processValue(value: any): any;
    clear(): void;
    resetFilter(): void;
    reset(): void;
    unChoose(record?: Record | null): void;
    choose(record?: Record | null): void;
    handlePopupHiddenChange(hidden: boolean): Promise<void>;
    processSelectedData(): Promise<void>;
    filterData(data: Record[], text?: string): Record[];
}
export default class ObserverSelect extends Select<SelectProps> {
    static defaultProps: {
        suffixCls: string;
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
}
export {};
