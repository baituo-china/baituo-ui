import { Component } from 'react';
export interface CheckableTagProps {
    prefixCls?: string;
    className?: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
}
export default class CheckableTag extends Component<CheckableTagProps> {
    static displayName: string;
    handleClick: () => void;
    render(): JSX.Element;
}
