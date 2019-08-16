import { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
export declare type CheckboxValueType = string | number;
export interface CheckboxOptionType {
    label: string;
    value: CheckboxValueType;
    disabled?: boolean;
}
export interface AbstractCheckboxGroupProps {
    prefixCls?: string;
    className?: string;
    options?: Array<CheckboxOptionType | string>;
    disabled?: boolean;
    style?: CSSProperties;
}
export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
    defaultValue?: Array<CheckboxValueType>;
    value?: Array<CheckboxValueType>;
    onChange?: (checkedValue: Array<CheckboxValueType>) => void;
    label?: string;
}
export interface CheckboxGroupState {
    value: any;
}
export interface CheckboxGroupContext {
    checkboxGroup: {
        toggleOption: (option: CheckboxOptionType) => void;
        value: any;
        disabled: boolean;
    };
}
export default class CheckboxGroup extends Component<CheckboxGroupProps, CheckboxGroupState> {
    static displayName: string;
    static defaultProps: {
        options: never[];
    };
    static propTypes: {
        defaultValue: PropTypes.Requireable<any[]>;
        value: PropTypes.Requireable<any[]>;
        options: PropTypes.Validator<any[]>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static childContextTypes: {
        checkboxGroup: PropTypes.Requireable<any>;
    };
    constructor(props: CheckboxGroupProps);
    getChildContext(): {
        checkboxGroup: {
            toggleOption: (option: CheckboxOptionType) => void;
            value: any;
            disabled: boolean | undefined;
        };
    };
    componentWillReceiveProps(nextProps: CheckboxGroupProps): void;
    shouldComponentUpdate(nextProps: CheckboxGroupProps, nextState: CheckboxGroupState): boolean;
    getOptions(): CheckboxOptionType[];
    toggleOption: (option: CheckboxOptionType) => void;
    render(): JSX.Element;
}
