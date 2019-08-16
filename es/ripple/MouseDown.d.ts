import { MouseEventHandler, PureComponent, ReactElement } from 'react';
import PropTypes from 'prop-types';
export declare type Size = {
    x: number;
    y: number;
    width: number;
    height: number;
    position: string;
};
export interface MouseDownProps {
    children: (child: ReactElement<any>, size?: Size) => ReactElement<any>;
    rippleChild: ReactElement<any>;
}
export interface MouseDownState {
    size?: Size;
}
export default class MouseDown extends PureComponent<MouseDownProps> {
    static displayName: string;
    static propTypes: {
        rippleChild: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    state: MouseDownState;
    render(): ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
    show: MouseEventHandler<HTMLElement>;
    hide: () => void;
}
