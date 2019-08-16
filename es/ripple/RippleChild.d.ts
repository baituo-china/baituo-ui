import React, { PureComponent } from 'react';
import { Size } from './MouseDown';
export interface RippleChildProps {
    prefixCls?: string;
}
export default class RippleChild extends PureComponent<RippleChildProps> {
    static displayName: string;
    currentCircleStyle: any;
    currentStyle: any;
    render(): {} | null | undefined;
    handleMouseDown: (child: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, size?: Size | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    ripple: (child: React.ReactNode) => {} | null | undefined;
}
