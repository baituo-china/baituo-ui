import { Component, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { Size } from '../_util/enum';
import { ProgressPosition, ProgressStatus, ProgressType } from './enum';
export interface ProgressProps {
    prefixCls?: string;
    className?: string;
    type?: ProgressType;
    percent?: number;
    successPercent?: number;
    format?: (percent: number) => string;
    status?: ProgressStatus;
    showInfo?: boolean;
    strokeWidth?: number;
    trailColor?: string;
    width?: number;
    style?: CSSProperties;
    gapDegree?: number;
    gapPosition?: ProgressPosition;
    size?: Size;
}
export default class Progress extends Component<ProgressProps, {}> {
    static displayName: string;
    static Line: any;
    static Circle: any;
    static Loading: any;
    static defaultProps: {
        type: ProgressType;
        percent: number;
        showInfo: boolean;
        trailColor: string;
        size: Size;
    };
    static propTypes: {
        status: PropTypes.Requireable<ProgressStatus>;
        type: PropTypes.Requireable<ProgressType>;
        showInfo: PropTypes.Requireable<boolean>;
        percent: PropTypes.Requireable<number>;
        width: PropTypes.Requireable<number>;
        strokeWidth: PropTypes.Requireable<number>;
        trailColor: PropTypes.Requireable<string>;
        format: PropTypes.Requireable<(...args: any[]) => any>;
        gapDegree: PropTypes.Requireable<number>;
        default: PropTypes.Requireable<Size>;
    };
    render(): JSX.Element;
}
