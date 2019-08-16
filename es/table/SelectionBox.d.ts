import { Component } from 'react';
import { SelectionBoxProps, SelectionBoxState } from './interface';
export default class SelectionBox extends Component<SelectionBoxProps, SelectionBoxState> {
    unsubscribe: () => void;
    constructor(props: SelectionBoxProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    subscribe(): void;
    getCheckState(props: SelectionBoxProps): boolean;
    render(): JSX.Element;
}
