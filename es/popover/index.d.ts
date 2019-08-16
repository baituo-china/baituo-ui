import { Component, ReactNode } from 'react';
import { AbstractTooltipProps } from '../tooltip';
export interface PopoverProps extends AbstractTooltipProps {
    title?: ReactNode;
    content?: ReactNode;
}
export default class Popover extends Component<PopoverProps, {}> {
    static displayName: string;
    static defaultProps: {
        placement: string;
        transitionName: string;
        trigger: string;
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        overlayStyle: {};
    };
    private tooltip;
    getPopupDomNode(): any;
    getOverlay(): JSX.Element;
    saveTooltip: (node: any) => void;
    getPrefixCls(): string;
    render(): JSX.Element;
}
