import React, { PureComponent } from 'react';
export interface RippleProps {
    prefixCls?: string;
    disabled?: boolean;
}
export default class Ripple extends PureComponent<RippleProps> {
    static displayName: string;
    render(): {} | null | undefined;
    rippleChild: (child: React.ReactChild) => JSX.Element;
}
