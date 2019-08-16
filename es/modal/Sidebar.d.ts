import { Component } from 'react';
import { ModalFuncProps } from './Modal';
export interface SidebarState {
    open: boolean;
}
export interface SidebarProps extends ModalFuncProps {
    close?: (...args: any[]) => void;
    alwaysCanCancel?: boolean;
}
export default class Sidebar extends Component<SidebarProps, {}> {
    static displayName: string;
    static defaultProps: {
        width: string;
        transitionName: string;
        maskTransitionName: string;
        confirmLoading: boolean;
        alwaysCanCancel: boolean;
        visible: boolean;
        okType: string;
        funcType: string;
    };
    state: SidebarState;
    constructor(props: any);
    handleCancel: (e: any) => void;
    handleOk: (e: any) => void;
    renderFooter: () => JSX.Element;
    handleStatus: () => void;
    getPrefixCls(): string;
    render(): JSX.Element;
}
