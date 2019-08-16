import { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
export interface AffixProps {
    /**
     * 距离窗口顶部达到指定偏移量后触发
     */
    offsetTop?: number;
    offset?: number;
    /** 距离窗口底部达到指定偏移量后触发 */
    offsetBottom?: number;
    style?: CSSProperties;
    /** 固定状态改变时触发的回调函数 */
    onChange?: (affixed?: boolean) => void;
    /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
    target?: () => Window | HTMLElement | null;
    prefixCls?: string;
    className?: string;
}
export interface AffixState {
    affixStyle: CSSProperties | undefined;
    placeholderStyle: CSSProperties | undefined;
}
export default class Affix extends Component<AffixProps, AffixState> {
    static displayName: string;
    static propTypes: {
        offsetTop: PropTypes.Requireable<number>;
        offsetBottom: PropTypes.Requireable<number>;
        target: PropTypes.Requireable<(...args: any[]) => any>;
    };
    state: AffixState;
    private timeout;
    private eventHandlers;
    private fixedNode;
    private placeholderNode;
    private readonly events;
    setAffixStyle(e: Event, affixStyle: CSSProperties | null): void;
    setPlaceholderStyle(placeholderStyle: CSSProperties | null): void;
    syncPlaceholderStyle(e: Event): void;
    updatePosition(e: Event): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: AffixProps): void;
    componentWillUnmount(): void;
    setTargetEventListeners(getTarget: () => HTMLElement | Window | null): void;
    clearEventListeners(): void;
    saveFixedNode: (node: HTMLDivElement) => void;
    savePlaceholderNode: (node: HTMLDivElement) => void;
    render(): JSX.Element;
}
