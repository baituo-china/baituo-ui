import { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { Size } from '../_util/enum';
export interface StepsProps {
    prefixCls?: string;
    iconPrefix?: string;
    current?: number;
    status?: 'wait' | 'process' | 'finish' | 'error';
    size?: Size;
    direction?: 'horizontal' | 'vertical';
    progressDot?: boolean | Function;
    style?: CSSProperties;
}
export default class Steps extends Component<StepsProps, any> {
    static displayName: string;
    static Step: any;
    static defaultProps: {
        iconPrefix: string;
        current: number;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        iconPrefix: PropTypes.Requireable<string>;
        current: PropTypes.Requireable<number>;
    };
    render(): JSX.Element;
}
