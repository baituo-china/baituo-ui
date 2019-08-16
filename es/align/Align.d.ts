import { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import EventManager from '../_util/EventManager';
import TaskRunner from '../_util/TaskRunner';
declare type FirstParam<T extends (...args: any) => any> = T extends (arg1: infer A, ...rest: any) => any ? A : never;
export interface AlignProps {
    childrenProps?: object;
    align: object;
    target?: () => Node | Window;
    onAlign?: (source: Element | Text | null, align: object, target: Node | Window) => void;
    monitorBufferTime?: number;
    monitorWindowResize?: boolean;
    hidden?: boolean;
    children: FirstParam<typeof cloneElement>;
}
export default class Align extends Component<AlignProps, any> {
    static displayName: string;
    static propTypes: {
        childrenProps: PropTypes.Requireable<object>;
        align: PropTypes.Validator<object>;
        target: PropTypes.Requireable<(...args: any[]) => any>;
        onAlign: PropTypes.Requireable<(...args: any[]) => any>;
        monitorBufferTime: PropTypes.Requireable<number>;
        monitorWindowResize: PropTypes.Requireable<boolean>;
        hidden: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        monitorBufferTime: number;
        monitorWindowResize: boolean;
        hidden: boolean;
    };
    resizeHandler: EventManager | null;
    bufferMonitor: TaskRunner | null;
    forceAlign(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    startMonitorWindowResize(): void;
    stopMonitorWindowResize(): void;
    render(): import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)>;
}
export {};
