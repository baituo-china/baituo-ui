import { Component } from 'react';
export interface ActionButtonProps {
    okProps?: any;
    cancelProps?: any;
    autoFocus?: boolean;
}
export interface ActionButtonState {
    loading: boolean;
}
export default class ActionButton extends Component<ActionButtonProps, ActionButtonState> {
    timeoutId: number;
    constructor(props: ActionButtonProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onClick: (props: any) => void;
    render(): JSX.Element;
}
