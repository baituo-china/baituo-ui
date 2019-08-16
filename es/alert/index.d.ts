import React, { Component, CSSProperties, MouseEventHandler, ReactNode } from 'react';
export interface AlertProps {
    /**
     * Type of Alert styles, options:`success`, `info`, `warning`, `error`
     */
    type?: 'success' | 'info' | 'warning' | 'error';
    /** Whether Alert can be closed */
    closable?: boolean;
    /** Close text to show */
    closeText?: ReactNode;
    /** Content of Alert */
    message: ReactNode;
    /** Additional content of Alert */
    description?: ReactNode;
    /** Callback when close Alert */
    onClose?: MouseEventHandler<HTMLAnchorElement>;
    /** Trigger when animation ending of Alert */
    afterClose?: () => void;
    /** Whether to show icon */
    showIcon?: boolean;
    iconType?: string;
    style?: CSSProperties;
    prefixCls?: string;
    className?: string;
    banner?: boolean;
}
export default class Alert extends Component<AlertProps, any> {
    static displayName: string;
    state: {
        closing: boolean;
        closed: boolean;
    };
    handleClose: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    animationEnd: () => void;
    render(): JSX.Element | null;
}
