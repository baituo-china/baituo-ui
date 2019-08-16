import { Component, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
export declare type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export declare type BreakpointMap = {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xxl?: string;
};
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    gutter?: number | BreakpointMap;
    type?: 'flex';
    align?: 'top' | 'middle' | 'bottom';
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    prefixCls?: string;
}
export interface RowState {
    screens: BreakpointMap;
}
export default class Row extends Component<RowProps, RowState> {
    static displayName: string;
    static defaultProps: {
        gutter: number;
    };
    static propTypes: {
        type: PropTypes.Requireable<string>;
        align: PropTypes.Requireable<string>;
        justify: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        gutter: PropTypes.Requireable<number | object>;
        prefixCls: PropTypes.Requireable<string>;
    };
    state: RowState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getGutter(): string | number | BreakpointMap | undefined;
    render(): JSX.Element;
}
