import { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
export interface BreadcrumbItemProps {
    prefixCls?: string;
    separator?: ReactNode;
    href?: string;
}
export default class BreadcrumbItem extends Component<BreadcrumbItemProps, any> {
    static displayName: string;
    static __ANT_BREADCRUMB_ITEM: boolean;
    static defaultProps: {
        separator: string;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        separator: PropTypes.Requireable<string | PropTypes.ReactElementLike>;
        href: PropTypes.Requireable<string>;
    };
    render(): JSX.Element | null;
}
