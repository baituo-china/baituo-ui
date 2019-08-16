import { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Size } from '../_util/enum';
export interface SwitchProps {
    prefixCls?: string;
    size?: Size;
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => any;
    checkedChildren?: ReactNode;
    unCheckedChildren?: ReactNode;
    disabled?: boolean;
    loading?: boolean;
}
export default class Switch extends Component<SwitchProps, {}> {
    static displayName: string;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<Size>;
        className: PropTypes.Requireable<string>;
    };
    private rcSwitch;
    focus(): void;
    blur(): void;
    saveSwitch: (node: any) => void;
    render(): JSX.Element;
}
