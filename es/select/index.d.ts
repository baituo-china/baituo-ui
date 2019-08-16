import React, { Component, CSSProperties, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Size } from '../_util/enum';
import { SelectMode } from './enum';
export interface AbstractSelectProps {
    prefixCls?: string;
    className?: string;
    size?: Size;
    notFoundContent?: ReactNode | null;
    transitionName?: string;
    choiceTransitionName?: string;
    showSearch?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
    tabIndex?: number;
    placeholder?: string;
    defaultActiveFirstOption?: boolean;
    dropdownClassName?: string;
    dropdownStyle?: CSSProperties;
    dropdownMenuStyle?: CSSProperties;
    onDropdownMouseDown?: (e: MouseEvent<any>) => void;
    onSearch?: (value: string) => any;
    filterOption?: boolean | ((inputValue: string, option: ReactElement<OptionProps>) => any);
}
export interface LabeledValue {
    key: string;
    label: ReactNode;
}
export declare type SelectValue = string | any[] | LabeledValue | LabeledValue[];
export interface SelectProps extends AbstractSelectProps {
    blurChange?: boolean;
    value?: SelectValue;
    defaultValue?: SelectValue;
    mode?: SelectMode;
    optionLabelProp?: string;
    onInput?: (value: SelectValue) => void;
    onChange?: (value: SelectValue, option: ReactElement<any> | ReactElement<any>[]) => void;
    onSelect?: (value: SelectValue, option: ReactElement<any>) => any;
    onDeselect?: (value: SelectValue) => any;
    onBlur?: () => any;
    onFocus?: () => any;
    onPopupScroll?: () => any;
    onInputKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onChoiceItemClick?: (value: SelectValue, option: ReactElement<any>) => void;
    onClear?: () => any;
    maxTagCount?: number;
    maxTagPlaceholder?: ReactNode | ((omittedValues: SelectValue[]) => ReactNode);
    dropdownMatchSelectWidth?: boolean;
    optionFilterProp?: string;
    labelInValue?: boolean;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    tokenSeparators?: string[];
    getInputElement?: () => ReactElement<any>;
    autoFocus?: boolean;
    showNotFindInputItem?: boolean;
    showNotFindSelectedItem?: boolean;
    getRootDomNode?: () => HTMLElement;
    showCheckAll?: boolean;
    filter?: boolean;
    footer?: ReactNode | string;
    choiceRender?: (label: ReactElement<any>, value: SelectValue) => any;
    loading?: boolean | object;
    onFilterChange?: (value: string) => void;
    choiceRemove?: boolean;
    filterValue?: string;
    border?: boolean;
}
export interface OptionProps {
    disabled?: boolean;
    value?: any;
    title?: string;
    children?: ReactNode;
    className?: string;
    style?: object;
}
export interface OptGroupProps {
    label?: ReactNode;
}
export interface SelectLocale {
    notFoundContent?: string;
    filterPlaceholder?: string;
}
export default class Select extends Component<SelectProps, {}> {
    static displayName: string;
    static Option: React.ClassicComponentClass<OptionProps>;
    static OptGroup: React.ClassicComponentClass<OptGroupProps>;
    static defaultProps: {
        blurChange: boolean;
        showSearch: boolean;
        transitionName: string;
        choiceTransitionName: string;
        filter: boolean;
        showCheckAll: boolean;
        choiceRemove: boolean;
        border: boolean;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<Size>;
        combobox: PropTypes.Requireable<boolean>;
        notFoundContent: PropTypes.Requireable<any>;
        showSearch: PropTypes.Requireable<boolean>;
        optionLabelProp: PropTypes.Requireable<string>;
        transitionName: PropTypes.Requireable<string>;
        choiceTransitionName: PropTypes.Requireable<string>;
        showNotFindInputItem: PropTypes.Requireable<boolean>;
        showNotFindSelectedItem: PropTypes.Requireable<boolean>;
        filter: PropTypes.Requireable<boolean>;
        showCheckAll: PropTypes.Requireable<boolean>;
        footer: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        choiceRender: PropTypes.Requireable<(...args: any[]) => any>;
        loading: PropTypes.Requireable<boolean | object>;
        filterValue: PropTypes.Requireable<string>;
        onFilterChange: PropTypes.Requireable<(...args: any[]) => any>;
        choiceRemove: PropTypes.Requireable<boolean | ((...args: any[]) => any)>;
        onChoiceRemove: PropTypes.Requireable<(...args: any[]) => any>;
        onClear: PropTypes.Requireable<(...args: any[]) => any>;
    };
    private rcSelect;
    focus(): void;
    blur(): void;
    saveSelect: (node: any) => void;
    getNotFoundContent(locale: SelectLocale): {} | null | undefined;
    renderSelect: (locale: SelectLocale) => JSX.Element;
    render(): JSX.Element;
}
