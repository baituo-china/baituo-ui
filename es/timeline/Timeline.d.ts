import React, { Component, CSSProperties, ReactNode } from 'react';
import { TimeLineItemProps } from './TimelineItem';
export interface TimelineProps {
    prefixCls?: string;
    className?: string;
    /** 指定最后一个幽灵节点是否存在或内容 */
    pending?: ReactNode;
    pendingDot?: ReactNode;
    style?: CSSProperties;
}
export default class Timeline extends Component<TimelineProps, any> {
    static displayName: string;
    static Item: React.ClassicComponentClass<TimeLineItemProps>;
    render(): JSX.Element;
}
