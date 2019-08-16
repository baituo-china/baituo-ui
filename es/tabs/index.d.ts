import React, { Component, CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Size } from '../_util/enum';
import { TabsPosition, TabsType } from './enum';
export interface TabsProps {
    activeKey?: string;
    defaultActiveKey?: string;
    hideAdd?: boolean;
    onChange?: (activeKey: string) => void;
    onTabClick?: Function;
    onPrevClick?: MouseEventHandler<any>;
    onNextClick?: MouseEventHandler<any>;
    tabBarExtraContent?: ReactNode | null;
    tabBarStyle?: CSSProperties;
    type?: TabsType;
    tabPosition?: TabsPosition;
    onEdit?: (targetKey: string | React.MouseEvent<HTMLElement>, action: any) => void;
    size?: Size;
    style?: CSSProperties;
    prefixCls?: string;
    className?: string;
    animated?: boolean | {
        inkBar: boolean;
        tabPane: boolean;
    };
    tabBarGutter?: number;
}
export interface TabPaneProps {
    /** 选项卡头显示文字 */
    tab?: ReactNode | string;
    style?: CSSProperties;
    closable?: boolean;
    className?: string;
    disabled?: boolean;
    forceRender?: boolean;
}
export default class Tabs extends Component<TabsProps, any> {
    static displayName: string;
    static TabPane: React.ClassicComponentClass<TabPaneProps>;
    static defaultProps: {
        hideAdd: boolean;
    };
    createNewTab: MouseEventHandler<HTMLElement>;
    removeTab: (targetKey: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    handleChange: (activeKey: string) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
