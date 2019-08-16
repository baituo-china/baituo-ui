import { Component, Key, ReactElement } from 'react';
import PropTypes from 'prop-types';
export interface AnimateProps {
    className?: string;
    component?: any;
    componentProps?: object;
    animation?: object;
    transitionName?: string | object;
    transitionEnter?: boolean;
    transitionAppear?: boolean;
    exclusive?: boolean;
    transitionLeave?: boolean;
    onEnd?: (key: Key | null, flag: boolean) => void;
    onEnter?: (key: Key | null) => void;
    onLeave?: (key: Key | null) => void;
    onAppear?: (key: Key | null) => void;
    hiddenProp?: string;
}
export interface AnimateState {
    children: ReactElement<any>[];
}
export default class Animate extends Component<AnimateProps> {
    static displayName: string;
    static propTypes: {
        component: PropTypes.Requireable<any>;
        componentProps: PropTypes.Requireable<object>;
        animation: PropTypes.Requireable<object>;
        transitionName: PropTypes.Requireable<string | object>;
        transitionEnter: PropTypes.Requireable<boolean>;
        transitionAppear: PropTypes.Requireable<boolean>;
        exclusive: PropTypes.Requireable<boolean>;
        transitionLeave: PropTypes.Requireable<boolean>;
        onEnd: PropTypes.Requireable<(...args: any[]) => any>;
        onEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onAppear: PropTypes.Requireable<(...args: any[]) => any>;
        hiddenProp: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        animation: {};
        component: string;
        componentProps: {};
        transitionEnter: boolean;
        transitionLeave: boolean;
        transitionAppear: boolean;
    };
    currentlyAnimatingKeys: {};
    keysToEnter: Key[];
    keysToLeave: Key[];
    state: AnimateState;
    childrenRefs: {};
    nextProps?: object;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentDidUpdate(): void;
    isValidChildByKey(currentChildren: any, key: any): boolean;
    stop(key: any): void;
    render(): ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)>;
    performEnter: (key: string | number) => void;
    performAppear: (key: string | number) => void;
    handleDoneAdding: (key: string | number, type: any) => void;
    performLeave: (key: string | number) => void;
    handleDoneLeaving: (key: string | number) => void;
}
