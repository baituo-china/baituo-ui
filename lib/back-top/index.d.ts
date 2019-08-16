import React, { Component, CSSProperties, MouseEventHandler } from 'react';
export interface BackTopProps {
    visibilityHeight?: number;
    onClick?: MouseEventHandler<any>;
    target?: () => HTMLElement | Window;
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
}
export default class BackTop extends Component<BackTopProps, any> {
    static displayName: string;
    static defaultProps: {
        visibilityHeight: number;
    };
    scrollEvent: any;
    state: {
        visible: boolean;
    };
    getCurrentScrollTop: () => number;
    scrollToTop: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    setScrollTop(value: number): void;
    handleScroll: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
