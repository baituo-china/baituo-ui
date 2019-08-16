import { Component, CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
export interface Route {
    path: string;
    breadcrumbName: string;
}
export interface BreadcrumbProps {
    prefixCls?: string;
    routes?: Route[];
    params?: any;
    separator?: ReactNode;
    itemRender?: (route: any, params: any, routes: Array<any>, paths: Array<string>) => ReactNode;
    style?: CSSProperties;
    className?: string;
}
export default class Breadcrumb extends Component<BreadcrumbProps, any> {
    static displayName: string;
    static Item: any;
    static defaultProps: {
        separator: string;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        separator: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        routes: PropTypes.Requireable<any[]>;
        params: PropTypes.Requireable<object>;
        linkRender: PropTypes.Requireable<(...args: any[]) => any>;
        nameRender: PropTypes.Requireable<(...args: any[]) => any>;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
