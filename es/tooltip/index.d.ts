import { Component, CSSProperties, ReactElement, ReactNode } from 'react';
import { AdjustOverflow, PlacementsConfig } from './placements';
export { AdjustOverflow, PlacementsConfig };
export declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export interface AbstractTooltipProps {
    prefixCls?: string;
    overlayClassName?: string;
    style?: CSSProperties;
    overlayStyle?: CSSProperties;
    placement?: TooltipPlacement;
    builtinPlacements?: Object;
    defaultVisible?: boolean;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    transitionName?: string;
    trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    getTooltipContainer?: (triggerNode: Element) => HTMLElement;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    children?: ReactNode;
}
export declare type RenderFunction = () => ReactNode;
export interface TooltipProps extends AbstractTooltipProps {
    title?: ReactNode | RenderFunction;
    overlay?: ReactNode | RenderFunction;
}
export default class Tooltip extends Component<TooltipProps, any> {
    static displayName: string;
    static defaultProps: {
        placement: string;
        transitionName: string;
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        arrowPointAtCenter: boolean;
        autoAdjustOverflow: boolean;
    };
    private tooltip;
    constructor(props: TooltipProps);
    componentWillReceiveProps(nextProps: TooltipProps): void;
    onVisibleChange: (visible: boolean) => void;
    getPopupDomNode(): any;
    getPlacements(): any;
    isHoverTrigger(): boolean;
    getDisabledCompatibleChildren(element: ReactElement<any>): JSX.Element;
    isNoTitle(): boolean;
    onPopupAlign: (domNode: HTMLElement, align: any) => void;
    saveTooltip: (node: any) => void;
    render(): JSX.Element;
}
