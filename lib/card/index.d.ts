import { Component, CSSProperties, MouseEventHandler, ReactNode } from 'react';
import Grid from './Grid';
import Meta from './Meta';
export { CardGridProps } from './Grid';
export { CardMetaProps } from './Meta';
export declare type CardType = 'inner';
export interface CardTabListType {
    key: string;
    tab: ReactNode;
}
export interface CardProps {
    prefixCls?: string;
    title?: ReactNode;
    extra?: ReactNode;
    bordered?: boolean;
    bodyStyle?: CSSProperties;
    style?: CSSProperties;
    loading?: boolean;
    noHovering?: boolean;
    hoverable?: boolean;
    children?: ReactNode;
    id?: string;
    className?: string;
    type?: CardType;
    cover?: ReactNode;
    actions?: ReactNode[];
    tabList?: CardTabListType[];
    onTabChange?: (key: string) => void;
    onHeadClick?: MouseEventHandler<any>;
    activeTabKey?: string;
    defaultActiveTabKey?: string;
}
export default class Card extends Component<CardProps, {}> {
    static displayName: string;
    static Grid: typeof Grid;
    static Meta: typeof Meta;
    resizeEvent: any;
    updateWiderPaddingCalled: boolean;
    state: {
        widerPadding: boolean;
    };
    private container;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateWiderPadding(): void;
    onTabChange: (key: string) => void;
    saveRef: (node: HTMLDivElement) => void;
    isContainGrid(): any;
    getAction(actions: ReactNode[]): JSX.Element[] | null;
    getCompatibleHoverable(): boolean | undefined;
    render(): JSX.Element;
}
