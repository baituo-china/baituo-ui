import { Component, ReactNode } from 'react';
import Input, { InputProps } from './Input';
import { Size } from '../_util/enum';
export interface SearchProps extends InputProps {
    inputPrefixCls?: string;
    onSearch?: (value: string) => any;
    enterButton?: boolean | ReactNode;
}
export default class Search extends Component<SearchProps, any> {
    static displayName: string;
    static defaultProps: {
        enterButton: boolean;
        size: Size;
    };
    private input;
    onSearch: () => void;
    focus(): void;
    blur(): void;
    saveInput: (node: Input) => void;
    getPrefixCls(): string;
    getButtonOrIcon(): JSX.Element;
    render(): JSX.Element;
}
