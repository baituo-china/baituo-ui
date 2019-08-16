import React from 'react';
import PropTypes from 'prop-types';
import { Cancelable } from 'lodash';
import { ButtonColor, ButtonType, ButtonWaitType, FuncType } from './enum';
import { Size } from '../core/enum';
import DataSetComponent, { DataSetComponentProps } from '../data-set/DataSetComponent';
export interface ButtonProps extends DataSetComponentProps {
    /**
     * 按钮展现形式
     * @default 'raised'
     */
    funcType?: FuncType;
    /**
     * 按钮颜色风格
     * @default 'default'
     */
    color?: ButtonColor;
    /**
     * 按钮类型
     * @default 'button'
     */
    type?: ButtonType;
    /**
     * 按钮是否是加载状态
     */
    loading?: boolean;
    /**
     * 按钮图标
     */
    icon?: string;
    /**
     * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
     */
    href?: string;
    /**
     * 相当于 a 链接的 target 属性，href 存在时生效
     */
    target?: string;
    /**
     * 点击间隔时间
     */
    wait?: number;
    /**
     * 点击间隔类型，可选值：throttle | debounce
     * @default throttle
     */
    waitType?: ButtonWaitType;
}
export default class Button extends DataSetComponent<ButtonProps> {
    static displayName: string;
    static contextType: React.Context<{}>;
    static propTypes: {
        id: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<Size>;
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
        /**
         * 按钮展现模式
         * 可选值：'flat' | 'raised'
         * @default raised
         */
        funcType: PropTypes.Requireable<FuncType>;
        /**
         * 按钮颜色风格
         * 可选值：'default' | 'gray' | 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'dark'
         * @default 'default'
         */
        color: PropTypes.Requireable<ButtonColor>;
        /**
         * 按钮类型
         * 可选值：'button' | 'submit' | 'reset'
         * @default 'button'
         */
        type: PropTypes.Requireable<ButtonType>;
        /**
         * 按钮是否是加载状态
         */
        loading: PropTypes.Requireable<boolean>;
        /**
         * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
         */
        href: PropTypes.Requireable<string>;
        /**
         * 相当于 a 链接的 target 属性，href 存在时生效
         */
        target: PropTypes.Requireable<string>;
        /**
         * 点击等待时间
         */
        wait: PropTypes.Requireable<number>;
        /**
         * 点击间隔类型，可选值：throttle | debounce
         * @default throttle
         */
        waitType: PropTypes.Requireable<ButtonWaitType>;
    };
    static defaultProps: {
        suffixCls: string;
        type: ButtonType;
        color: ButtonColor;
        loading: boolean;
        waitType: ButtonWaitType;
    };
    loading: boolean;
    handleClickWait: any;
    constructor(props: any, context: any);
    getObservableProps(props: any, context: any): {
        dataSet: any;
        loading: any;
        type: any;
    };
    componentWillReceiveProps(nextProps: any, nextContext: any): void;
    componentWillUnmount(): void;
    getHandleClick(props: any): Cancelable;
    handleClick(e: any): Promise<void>;
    isDisabled(): any;
    getOtherProps(): Pick<Pick<any, string | number | symbol>, string | number | symbol>;
    getClassName(...props: any[]): string | undefined;
    render(): JSX.Element;
}
