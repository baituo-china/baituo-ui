import { Component, HTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
export declare type CollapseType = 'clickTrigger' | 'responsive';
export interface SiderProps extends HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    reverseArrow?: boolean;
    onCollapse?: (collapsed: boolean, type: CollapseType) => void;
    trigger?: ReactNode;
    width?: number | string;
    collapsedWidth?: number | string;
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}
export interface SiderState {
    collapsed?: boolean;
    below: boolean;
    belowShow?: boolean;
}
export interface SiderContext {
    siderCollapsed: boolean;
}
export default class Sider extends Component<SiderProps, SiderState> {
    static displayName: string;
    static __ANT_LAYOUT_SIDER: any;
    static defaultProps: {
        collapsible: boolean;
        defaultCollapsed: boolean;
        reverseArrow: boolean;
        width: number;
        collapsedWidth: number;
        style: {};
    };
    static childContextTypes: {
        siderCollapsed: PropTypes.Requireable<boolean>;
        collapsedWidth: PropTypes.Requireable<string | number>;
    };
    static contextTypes: {
        siderHook: PropTypes.Requireable<object>;
    };
    private mql;
    private uniqueId;
    constructor(props: SiderProps);
    getChildContext(): {
        siderCollapsed: boolean | undefined;
        collapsedWidth: string | number | undefined;
    };
    componentWillReceiveProps(nextProps: SiderProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    responsiveHandler: (event: MediaQueryListEvent) => void;
    setCollapsed: (collapsed: boolean, type: CollapseType) => void;
    toggle: () => void;
    belowShowChange: () => void;
    render(): JSX.Element;
}
