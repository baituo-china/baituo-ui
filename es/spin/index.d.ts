import { Component, CSSProperties, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Size } from '../_util/enum';
export declare type SpinIndicator = ReactElement<any>;
export interface SpinProps {
    prefixCls?: string;
    className?: string;
    spinning?: boolean;
    style?: CSSProperties;
    size?: Size;
    tip?: string;
    delay?: number;
    wrapperClassName?: string;
    indicator?: SpinIndicator;
}
export interface SpinState {
    spinning?: boolean;
    notCssAnimationSupported?: boolean;
}
export default class Spin extends Component<SpinProps, SpinState> {
    static displayName: string;
    static defaultProps: {
        spinning: boolean;
        size: Size;
        wrapperClassName: string;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        spinning: PropTypes.Requireable<boolean>;
        size: PropTypes.Requireable<Size>;
        wrapperClassName: PropTypes.Requireable<string>;
        indicator: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    debounceTimeout: number;
    delayTimeout: number;
    constructor(props: SpinProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: SpinProps): void;
    getIndicatorWidth(size?: Size): 20 | 50 | 30;
    renderIndicator(prefixCls: any): JSX.Element;
    render(): JSX.Element;
}
