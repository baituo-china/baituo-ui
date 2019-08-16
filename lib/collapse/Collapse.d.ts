import { Component, CSSProperties } from 'react';
import CollapsePanel from './CollapsePanel';
export interface CollapseProps {
    activeKey?: Array<string> | string;
    defaultActiveKey?: Array<string>;
    /** 手风琴效果 */
    accordion?: boolean;
    onChange?: (key: string | string[]) => void;
    style?: CSSProperties;
    className?: string;
    bordered?: boolean;
    prefixCls?: string;
}
export default class Collapse extends Component<CollapseProps, any> {
    static displayName: string;
    static Panel: typeof CollapsePanel;
    static defaultProps: {
        bordered: boolean;
        openAnimation: {
            appear(): void;
            enter(node: HTMLElement, done: () => void): any;
            leave(node: HTMLElement, done: () => void): any;
        };
    };
    render(): JSX.Element;
}
