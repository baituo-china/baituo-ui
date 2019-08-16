import { Component, CSSProperties, FormEventHandler } from 'react';
import { AbstractInputProps } from '../input/Input';
import { Size } from '../_util/enum';
export interface InputNumberProps extends AbstractInputProps {
    prefixCls?: string;
    min?: number;
    max?: number;
    value?: number;
    step?: number | string;
    defaultValue?: number;
    tabIndex?: number;
    onKeyDown?: FormEventHandler<any>;
    onChange?: (value: number | string | undefined) => void;
    disabled?: boolean;
    size?: Size;
    formatter?: (value: number | string | undefined) => string;
    parser?: (displayValue: string | undefined) => number;
    placeholder?: string;
    style?: CSSProperties;
    className?: string;
    name?: string;
    id?: string;
    precision?: number;
}
export default class InputNumber extends Component<InputNumberProps, any> {
    static displayName: string;
    static defaultProps: {
        step: number;
    };
    private inputNumberRef;
    render(): JSX.Element;
    focus(): void;
    blur(): void;
}
