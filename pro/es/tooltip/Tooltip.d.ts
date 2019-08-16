import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Action } from '../trigger/enum';
import { AdjustOverflow } from './placements';
export declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export declare type TooltipTheme = 'light' | 'dark';
export declare type RenderFunction = () => React.ReactNode;
export interface TooltipProps {
    prefixCls?: string;
    suffixCls?: string;
    overlayClassName?: string;
    style?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    placement?: TooltipPlacement;
    builtinPlacements?: Object;
    hidden?: boolean;
    defaultHidden?: boolean;
    onHiddenChange?: (hidden: boolean) => void;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    transitionName?: string;
    trigger?: Action[];
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    title?: React.ReactNode | RenderFunction;
    overlay?: React.ReactNode | RenderFunction;
    theme?: TooltipTheme;
}
export default class Tooltip extends Component<TooltipProps, any> {
    static displayName: string;
    static propTypes: {
        title: PropTypes.Requireable<any>;
        arrowPointAtCenter: PropTypes.Requireable<boolean>;
        autoAdjustOverflow: PropTypes.Requireable<boolean>;
        defaultHidden: PropTypes.Requireable<boolean>;
        mouseEnterDelay: PropTypes.Requireable<number>;
        mouseLeaveDelay: PropTypes.Requireable<number>;
        placement: PropTypes.Requireable<string>;
        trigger: PropTypes.Requireable<(Action | null)[]>;
        hidden: PropTypes.Requireable<boolean>;
        onHiddenChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        suffixCls: string;
        placement: string;
        transitionName: string;
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        arrowPointAtCenter: boolean;
        autoAdjustOverflow: boolean;
        theme: string;
        defaultHidden: boolean;
        trigger: Action[];
    };
    state: {
        hidden: boolean;
    };
    readonly prefixCls: string;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: TooltipProps): void;
    handlePopupHiddenChange: (hidden: boolean) => void;
    readonly popupContent: JSX.Element | null;
    readonly placements: any;
    /**
     * FIXME: Tooltip首次渲染错位
     * placement === 'bottom* / right*'时没有错位，其他情况有
     *
     * @returns
     * @memberof Tooltip
     */
    render(): JSX.Element;
}
