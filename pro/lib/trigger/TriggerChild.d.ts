import { PureComponent, ReactElement } from 'react';
import PropTypes from 'prop-types';
export declare type hook = (eventName: string, child: ReactElement<any>, e: any) => void;
export interface TriggerChildProps {
    onContextMenu?: hook;
    onClick?: hook;
    onMouseDown?: hook;
    onMouseEnter?: hook;
    onMouseLeave?: hook;
    onFocus?: hook;
    onBlur?: hook;
}
export default class TriggerChild extends PureComponent<TriggerChildProps> {
    static displayName: string;
    static propTypes: {
        onContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
    };
    handleContextMenu: any;
    handleClick: any;
    handleMouseDown: any;
    handleMouseEnter: any;
    handleMouseLeave: any;
    handleFocus: any;
    handleBlur: any;
    constructor(props: any, context: any);
    render(): ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
}
