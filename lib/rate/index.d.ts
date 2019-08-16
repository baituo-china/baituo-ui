import { Component, CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
export interface RateProps {
    prefixCls?: string;
    count?: number;
    value?: number;
    defaultValue?: number;
    allowHalf?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    onChange?: (value: number) => any;
    onHoverChange?: (value: number) => any;
    character?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export default class Rate extends Component<RateProps, any> {
    static displayName: string;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        character: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        character: JSX.Element;
    };
    private rcRate;
    focus(): void;
    blur(): void;
    saveRate: (node: any) => void;
    render(): JSX.Element;
}
