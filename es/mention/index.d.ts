import React, { Component, CSSProperties, FocusEventHandler } from 'react';
export declare type MentionPlacement = 'top' | 'bottom';
export interface MentionProps {
    prefixCls?: string;
    suggestionStyle?: CSSProperties;
    suggestions?: Array<any>;
    onSearchChange?: Function;
    onChange?: Function;
    notFoundContent?: any;
    loading?: Boolean;
    style?: CSSProperties;
    defaultValue?: any;
    value?: any;
    className?: string;
    multiLines?: Boolean;
    prefix?: string;
    placeholder?: string;
    getSuggestionContainer?: (triggerNode: Element) => HTMLElement;
    onFocus?: FocusEventHandler<HTMLElement>;
    onBlur?: FocusEventHandler<HTMLElement>;
    readOnly?: boolean;
    disabled?: boolean;
    placement?: MentionPlacement;
}
export interface MentionState {
    suggestions?: Array<any>;
    focus?: Boolean;
}
export default class Mention extends Component<MentionProps, MentionState> {
    static displayName: string;
    static getMentions: any;
    static defaultProps: {
        notFoundContent: string;
        loading: boolean;
        multiLines: boolean;
        placement: string;
    };
    static Nav: any;
    static toString: any;
    static toContentState: any;
    private mentionEle;
    constructor(props: MentionProps);
    componentWillReceiveProps(nextProps: MentionProps): void;
    onSearchChange: (value: string, prefix: string) => any;
    onChange: (editorState: any) => void;
    defaultSearchChange(value: String): void;
    onFocus: (ev: React.FocusEvent<HTMLElement>) => void;
    onBlur: (ev: React.FocusEvent<HTMLElement>) => void;
    focus: () => void;
    mentionRef: (ele: any) => void;
    render(): JSX.Element;
}
