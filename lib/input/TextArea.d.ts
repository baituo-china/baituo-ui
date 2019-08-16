import React, { Component, CSSProperties, FormEventHandler, ReactNode, TextareaHTMLAttributes } from 'react';
import { AbstractInputProps } from './Input';
export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}
export interface TextAreaProps extends AbstractInputProps {
    autosize?: boolean | AutoSizeType;
    onPressEnter?: FormEventHandler<any>;
    autoFocus?: boolean;
    border?: boolean;
}
export interface TextAreaState {
    textareaStyles?: CSSProperties;
    inputLength?: number;
    focused?: boolean;
}
export declare type HTMLTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export default class TextArea extends Component<TextAreaProps & HTMLTextareaProps, TextAreaState> {
    static displayName: string;
    static defaultProps: {
        showLengthInfo: boolean;
        border: boolean;
    };
    nextFrameActionId: number;
    state: {
        textareaStyles: {};
        inputLength: number;
        focused: boolean;
    };
    private textAreaRef;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: TextAreaProps): void;
    focus(): void;
    blur(): void;
    resizeTextarea: () => void;
    getPrefixCls(): string;
    getTextAreaClassName(): string;
    handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    handleInput: () => void;
    saveTextAreaRef: (textArea: HTMLTextAreaElement) => void;
    getWrapperClassName(): string;
    handleFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    getLengthInfo(): JSX.Element | null;
    getLabel(): {} | null | undefined;
    renderFloatLabel(): ReactNode;
    render(): JSX.Element;
}
