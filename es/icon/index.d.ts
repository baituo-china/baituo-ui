import { Component, CSSProperties, FocusEventHandler, MouseEventHandler } from 'react';
export interface IconProps {
    type: string;
    className?: string;
    title?: string;
    onClick?: MouseEventHandler<any>;
    onFocus?: FocusEventHandler<any>;
    onMouseDown?: MouseEventHandler<any>;
    onMouseUp?: MouseEventHandler<any>;
    onMouseLeave?: MouseEventHandler<any>;
    style?: CSSProperties;
    tabIndex?: number;
}
export default class Icon extends Component<IconProps, {}> {
    static displayName: string;
    static icons: {
        favorite: string[];
        default: string[];
    };
    static categories: {
        whatsNew: string[];
        direction: string[];
        suggestion: string[];
        edit: string[];
        data: string[];
        other: string[];
        series: string[];
    };
    render(): JSX.Element;
}
