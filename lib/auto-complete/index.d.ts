import React, { Component, FormEventHandler, ReactElement } from 'react';
import { AbstractSelectProps, OptGroupProps, OptionProps, SelectValue } from '../select';
export interface DataSourceItemObject {
    value: string;
    text: string;
}
export declare type DataSourceItemType = string | DataSourceItemObject;
export interface AutoCompleteInputProps {
    onChange?: FormEventHandler<any>;
    value: any;
}
export declare type ValidInputElement = HTMLInputElement | HTMLTextAreaElement | ReactElement<AutoCompleteInputProps>;
export interface AutoCompleteProps extends AbstractSelectProps {
    value?: SelectValue;
    defaultValue?: SelectValue;
    dataSource: DataSourceItemType[];
    optionLabelProp?: string;
    onChange?: (value: SelectValue) => void;
    onSelect?: (value: SelectValue, option: Object) => any;
    children?: ValidInputElement | ReactElement<OptionProps> | ReactElement<OptionProps>[];
}
export default class AutoComplete extends Component<AutoCompleteProps, {}> {
    static displayName: string;
    static Option: React.ClassicComponentClass<OptionProps>;
    static OptGroup: React.ClassicComponentClass<OptGroupProps>;
    static defaultProps: {
        transitionName: string;
        optionLabelProp: string;
        choiceTransitionName: string;
        showSearch: boolean;
        filterOption: boolean;
    };
    private select;
    getInputElement: () => JSX.Element;
    focus(): void;
    blur(): void;
    saveSelect: (node: any) => void;
    render(): JSX.Element;
}
