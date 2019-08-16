import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { C7NAnchor } from './Anchor';
export interface AnchorLinkProps {
    prefixCls?: string;
    href: string;
    title: ReactNode;
    children?: any;
    className?: string;
}
export default class AnchorLink extends Component<AnchorLinkProps, any> {
    static displayName: string;
    static defaultProps: {
        href: string;
    };
    static contextTypes: {
        c7nAnchor: PropTypes.Requireable<object>;
    };
    context: {
        c7nAnchor: C7NAnchor;
    };
    componentDidMount(): void;
    componentDidUpdate({ href: prevHref }: AnchorLinkProps): void;
    componentWillUnmount(): void;
    handleClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    render(): JSX.Element;
}
