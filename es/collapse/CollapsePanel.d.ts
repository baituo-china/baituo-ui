import { Component, CSSProperties, ReactNode } from 'react';
export interface CollapsePanelProps {
    key: string;
    header: ReactNode;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    showArrow?: boolean;
    prefixCls?: string;
    forceRender?: boolean;
}
export default class CollapsePanel extends Component<CollapsePanelProps, {}> {
    render(): JSX.Element;
}
