import React, { Component } from 'react';
import { ModalProps } from '../modal/Modal';
export interface ModalContainerState {
    modals: ModalProps[];
}
export default class ModalContainer extends Component<any> {
    static displayName: string;
    state: ModalContainerState;
    constructor(props: any, context: any);
    handleAnimationEnd: (modalKey: any, isEnter: any) => void;
    handleMaskClick: () => Promise<void>;
    componentWillUpdate(nextProps: any): void;
    componentWillUnmount(): void;
    findIndex(modalKey: any): number;
    open(props: ModalProps): void;
    close(props: ModalProps): void;
    update(props: ModalProps): void;
    clear(): void;
    getOffset(modals: any, idx: any): any;
    getModalWidth(modal: any): any;
    getComponent(): JSX.Element;
    render(): React.ReactPortal | null;
}
export declare function getContainer(loop?: boolean): any;
export declare function open(props: ModalProps & {
    children: any;
}): {
    close: (destroy?: boolean | undefined) => Promise<void>;
    open: () => void;
    update: (newProps: any) => void;
};
export declare function getKey(): string;
