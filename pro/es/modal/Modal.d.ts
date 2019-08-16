import React, { Key, ReactNode } from 'react';
import PropTypes from 'prop-types';
import ViewComponent, { ViewComponentProps } from '../core/ViewComponent';
import Button, { ButtonProps } from '../button/Button';
import EventManager from '../_util/EventManager';
export interface ModalProps extends ViewComponentProps {
    closable?: boolean;
    movable?: boolean;
    fullScreen?: boolean;
    maskClosable?: boolean;
    keyboardClosable?: boolean;
    header?: boolean;
    footer?: ((okBtn: ReactNode, cancelBtn: ReactNode) => ReactNode) | ReactNode | boolean;
    destroyOnClose?: boolean;
    okText?: ReactNode;
    cancelText?: ReactNode;
    okProps?: ButtonProps;
    cancelProps?: ButtonProps;
    onClose?: () => Promise<boolean | undefined>;
    onOk?: () => Promise<boolean | undefined>;
    onCancel?: () => Promise<boolean | undefined>;
    afterClose?: () => void;
    close?: () => void;
    update?: (props?: ModalProps) => void;
    okCancel?: boolean;
    drawer?: boolean;
    key?: Key;
    border?: boolean;
    okFirst?: boolean;
}
export default class Modal extends ViewComponent<ModalProps> {
    static displayName: string;
    static propTypes: {
        closable: PropTypes.Requireable<boolean>;
        movable: PropTypes.Requireable<boolean>;
        fullScreen: PropTypes.Requireable<boolean>;
        maskClosable: PropTypes.Requireable<boolean>;
        keyboardClosable: PropTypes.Requireable<boolean>;
        header: PropTypes.Requireable<boolean>;
        footer: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        destroyOnClose: PropTypes.Requireable<boolean>;
        okText: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        cancelText: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        okProps: PropTypes.Requireable<object>;
        cancelProps: PropTypes.Requireable<object>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        onOk: PropTypes.Requireable<(...args: any[]) => any>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        afterClose: PropTypes.Requireable<(...args: any[]) => any>;
        okCancel: PropTypes.Requireable<boolean>;
        drawer: PropTypes.Requireable<boolean>;
        title: PropTypes.Requireable<string>;
        okFirst: PropTypes.Requireable<boolean>;
        id: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<import("../core/enum").Size>;
        suffixCls: PropTypes.Requireable<string>;
        prefixCls: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        hidden: PropTypes.Requireable<boolean>;
        autoFocus: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        tabIndex: PropTypes.Requireable<number>;
        lang: PropTypes.Requireable<string>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseUp: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseMove: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseOver: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseOut: PropTypes.Requireable<(...args: any[]) => any>;
        onContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        suffixCls: string;
        header: boolean;
        closable: boolean;
        movable: boolean;
        maskClosable: boolean;
        keyboardClosable: boolean;
        okCancel: boolean;
        destroyOnClose: boolean;
        fullScreen: boolean;
        drawer: boolean;
        autoFocus: boolean;
    };
    static key: any;
    static open: any;
    static confirm: any;
    static info: any;
    static success: any;
    static error: any;
    static warning: any;
    moveEvent: EventManager;
    okCancelEvent: EventManager;
    offset?: [number | string | undefined, number | string | undefined];
    cancelButton: Button | null;
    saveCancelRef: (node: any) => any;
    handleKeyDown: (e: any) => void;
    getOtherProps(): Pick<any, string | number | symbol>;
    getClassName(): string | undefined;
    render(): JSX.Element;
    componentWillUpdate({ hidden }: {
        hidden: any;
    }): void;
    componentWillUnmount(): void;
    handleHeaderMouseDown(downEvent: MouseEvent): void;
    handleOk(): Promise<void>;
    handleCancel(): Promise<void>;
    getTitle(): ReactNode;
    getHeader(): ReactNode;
    getHeaderButtons(): ReactNode;
    getCloseButton(): ReactNode;
    registerOk: (ok: any) => void;
    registerCancel: (cancel: any) => void;
    renderChildren(children: ReactNode): ReactNode;
    getBody(): ReactNode;
    getFooter(): ReactNode;
    getWrappedFooter(footer: ReactNode): JSX.Element;
    getDefaultFooter: (okBtn: React.ReactNode, cancelBtn: React.ReactNode) => JSX.Element;
    close(): void;
}