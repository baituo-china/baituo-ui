import { Component } from 'react';
import { CheckboxChangeEvent } from '../checkbox';
import { SelectionCheckboxAllProps, SelectionCheckboxAllState, SelectionItem } from './interface';
export default class SelectionCheckboxAll<T> extends Component<SelectionCheckboxAllProps<T>, SelectionCheckboxAllState> {
    unsubscribe: () => void;
    defaultSelections: SelectionItem[];
    constructor(props: SelectionCheckboxAllProps<T>);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SelectionCheckboxAllProps<T>): void;
    componentWillUnmount(): void;
    subscribe(): void;
    checkSelection(data: T[], type: string, byDefaultChecked: boolean): boolean;
    setCheckState(props: SelectionCheckboxAllProps<T>): void;
    getCheckState(props: SelectionCheckboxAllProps<T>): any;
    getIndeterminateState(props: SelectionCheckboxAllProps<T>): any;
    handleSelectAllChagne: (e: CheckboxChangeEvent) => void;
    renderMenus(selections: SelectionItem[]): JSX.Element[];
    render(): JSX.Element;
}
