import { Component, CSSProperties, KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';
import PropTypes from 'prop-types';
import CheckboxGroup, { CheckboxGroupContext } from './Group';
export interface AbstractCheckboxProps<T> {
    prefixCls?: string;
    className?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    style?: CSSProperties;
    disabled?: boolean;
    onChange?: (e: T) => void;
    onMouseEnter?: MouseEventHandler<any>;
    onMouseLeave?: MouseEventHandler<any>;
    onKeyPress?: KeyboardEventHandler<any>;
    onKeyDown?: KeyboardEventHandler<any>;
    value?: any;
    tabIndex?: number;
    name?: string;
    children?: ReactNode;
}
export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
    indeterminate?: boolean;
}
export interface CheckboxChangeEventTarget extends CheckboxProps {
    checked: boolean;
}
export interface CheckboxChangeEvent {
    target: CheckboxChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
}
export default class Checkbox extends Component<CheckboxProps, {}> {
    static displayName: string;
    static Group: typeof CheckboxGroup;
    static defaultProps: {
        indeterminate: boolean;
    };
    static contextTypes: {
        checkboxGroup: PropTypes.Requireable<any>;
    };
    private rcCheckbox;
    shouldComponentUpdate(nextProps: CheckboxProps, nextState: {}, nextContext: CheckboxGroupContext): boolean;
    focus(): void;
    blur(): void;
    saveCheckbox: (node: any) => void;
    render(): JSX.Element;
}
