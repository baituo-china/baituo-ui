import React, { Component, CSSProperties, MouseEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import AnchorLink from './AnchorLink';
declare function getDefaultContainer(): Window;
export declare type AnchorContainer = HTMLElement | Window;
export interface AnchorProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    offsetTop?: number;
    bounds?: number;
    affix?: boolean;
    showInkInFixed?: boolean;
    getContainer?: () => AnchorContainer;
    onClick?: (e: MouseEvent<HTMLElement>, link: {
        title: ReactNode;
        href: string;
    }) => void;
}
export interface AnchorState {
    activeLink: null | string;
}
export interface AnchorDefaultProps extends AnchorProps {
    prefixCls: string;
    affix: boolean;
    showInkInFixed: boolean;
    getContainer: () => AnchorContainer;
}
export interface C7NAnchor {
    registerLink: (link: string) => void;
    unregisterLink: (link: string) => void;
    activeLink: string | null;
    scrollTo: (link: string) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>, link: {
        title: React.ReactNode;
        href: string;
    }) => void;
}
export default class Anchor extends Component<AnchorProps, AnchorState> {
    static displayName: string;
    static Link: typeof AnchorLink;
    static defaultProps: {
        affix: boolean;
        showInkInFixed: boolean;
        getContainer: typeof getDefaultContainer;
    };
    static childContextTypes: {
        c7nAnchor: PropTypes.Requireable<object>;
    };
    state: {
        activeLink: null;
    };
    private inkNode;
    private links;
    private scrollEvent;
    private animating;
    getChildContext(): {
        c7nAnchor: C7NAnchor;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    handleScroll: () => void;
    handleScrollTo: (link: string) => void;
    getCurrentAnchor(offsetTop?: number, bounds?: number): string;
    updateInk: () => void;
    saveInkNode: (node: HTMLSpanElement) => void;
    getPrefixCls(): string;
    render(): JSX.Element;
}
export {};
