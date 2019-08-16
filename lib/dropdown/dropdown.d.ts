import { Component, ReactNode } from 'react';
import DropdownButton from './dropdown-button';
export interface DropDownProps {
    trigger?: ('click' | 'hover' | 'contextMenu')[];
    overlay: ReactNode;
    onVisibleChange?: (visible?: boolean) => void;
    visible?: boolean;
    disabled?: boolean;
    align?: Object;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    prefixCls?: string;
    className?: string;
    transitionName?: string;
    placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
    forceRender?: boolean;
}
export default class Dropdown extends Component<DropDownProps, any> {
    static displayName: string;
    static Button: typeof DropdownButton;
    static defaultProps: {
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        placement: string;
    };
    getTransitionName(): string;
    componentDidMount(): void;
    render(): JSX.Element;
}
