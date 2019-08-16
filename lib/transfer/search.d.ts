import React, { Component, FormEvent, MouseEventHandler } from 'react';
export interface TransferSearchProps {
    prefixCls?: string;
    placeholder?: string;
    onChange?: (e: FormEvent<any>) => void;
    handleClear?: MouseEventHandler<any>;
    value?: any;
}
export default class Search extends Component<TransferSearchProps, any> {
    static defaultProps: {
        placeholder: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear: MouseEventHandler<HTMLAnchorElement>;
    render(): JSX.Element;
}
