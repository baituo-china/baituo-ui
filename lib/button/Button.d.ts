import { Component, CSSProperties, FormEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import Group from './ButtonGroup';
import { Size } from '../_util/enum';
export declare type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export declare type ButtonShape = 'circle' | 'circle-outline';
export declare type ButtonFuncType = 'raised' | 'flat';
export interface ButtonProps {
    type?: ButtonType;
    htmlType?: string;
    icon?: string;
    shape?: ButtonShape;
    size?: Size;
    onClick?: FormEventHandler<any>;
    onMouseUp?: FormEventHandler<any>;
    onMouseDown?: FormEventHandler<any>;
    onKeyPress?: KeyboardEventHandler<any>;
    onKeyDown?: KeyboardEventHandler<any>;
    tabIndex?: number;
    loading?: boolean | {
        delay?: number;
    };
    disabled?: boolean;
    style?: CSSProperties;
    prefixCls?: string;
    className?: string;
    ghost?: boolean;
    target?: string;
    href?: string;
    download?: string;
    funcType?: ButtonFuncType;
}
export default class Button extends Component<ButtonProps, any> {
    static displayName: string;
    static Group: typeof Group;
    static __ANT_BUTTON: boolean;
    static defaultProps: {
        loading: boolean;
        ghost: boolean;
        funcType: string;
    };
    static propTypes: {
        type: PropTypes.Requireable<string>;
        shape: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<Size>;
        htmlType: PropTypes.Requireable<string>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        loading: PropTypes.Requireable<boolean | object>;
        className: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<string>;
        funcType: PropTypes.Requireable<string>;
    };
    timeout: number;
    delayTimeout: number;
    constructor(props: ButtonProps);
    componentWillReceiveProps(nextProps: ButtonProps): void;
    componentWillUnmount(): void;
    handleClick: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    render(): JSX.Element;
}
