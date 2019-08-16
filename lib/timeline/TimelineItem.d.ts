import { Component, CSSProperties, ReactNode } from 'react';
export interface TimeLineItemProps {
    prefixCls?: string;
    className?: string;
    color?: string;
    dot?: ReactNode;
    pending?: boolean;
    last?: boolean;
    style?: CSSProperties;
}
export default class TimelineItem extends Component<TimeLineItemProps, any> {
    static displayName: string;
    static defaultProps: {
        color: string;
        last: boolean;
        pending: boolean;
    };
    render(): JSX.Element;
}
