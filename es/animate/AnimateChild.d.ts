import { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
export interface AnimateChildProps {
    transitionName?: string | object;
    animation?: {
        [key: string]: (node: Element | Text, end: () => void) => void;
    };
    style?: CSSProperties;
}
export default class AnimateChild extends Component<AnimateChildProps, any> {
    static displayName: string;
    static propTypes: {
        children: PropTypes.Requireable<any>;
        transitionName: PropTypes.Requireable<string | object>;
        animation: PropTypes.Requireable<any>;
    };
    stopper: any;
    componentWillUnmount(): void;
    componentWillEnter(done: () => void): void;
    componentWillAppear(done: () => void): void;
    componentWillLeave(done: () => void): void;
    transition(animationType: string, finishCallback: () => void): void;
    stop(): void;
    render(): {} | null | undefined;
}
