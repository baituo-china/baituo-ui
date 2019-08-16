import { Component, CSSProperties, MouseEventHandler } from 'react';
import CheckableTag from './CheckableTag';
export { CheckableTagProps } from './CheckableTag';
export interface TagProps {
    prefixCls?: string;
    className?: string;
    color?: string;
    /** 标签是否可以关闭 */
    closable?: boolean;
    /** 关闭时的回调 */
    onClose?: Function;
    /** 动画关闭后的回调 */
    afterClose?: Function;
    style?: CSSProperties;
}
export interface TagState {
    closing: boolean;
    closed: boolean;
}
export default class Tag extends Component<TagProps, TagState> {
    static displayName: string;
    static CheckableTag: typeof CheckableTag;
    static defaultProps: {
        closable: boolean;
    };
    state: {
        closing: boolean;
        closed: boolean;
    };
    close: MouseEventHandler<HTMLElement>;
    animationEnd: (_: string, existed: boolean) => void;
    isPresetColor(color?: string): boolean;
    render(): JSX.Element;
}
