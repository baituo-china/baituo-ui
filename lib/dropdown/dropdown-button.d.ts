import { Component, MouseEventHandler } from 'react';
import { ButtonGroupProps } from '../button/ButtonGroup';
import { DropDownProps } from './dropdown';
export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
    type?: 'primary' | 'ghost' | 'dashed';
    disabled?: boolean;
    onClick?: MouseEventHandler<any>;
    children?: any;
}
export default class DropdownButton extends Component<DropdownButtonProps, any> {
    static displayName: string;
    static defaultProps: {
        placement: string;
        type: string;
    };
    render(): JSX.Element;
}
