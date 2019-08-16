import { Component, ReactNode, MouseEventHandler } from 'react';
import { AbstractTooltipProps } from '../tooltip';
import { ButtonType } from '../button/Button';
export interface PopconfirmProps extends AbstractTooltipProps {
    title: ReactNode;
    onConfirm?: MouseEventHandler<any>;
    onCancel?: MouseEventHandler<any>;
    okText?: ReactNode;
    okType?: ButtonType;
    cancelText?: ReactNode;
}
export interface PopconfirmState {
    visible?: boolean;
}
export interface PopconfirmLocale {
    okText: string;
    cancelText: string;
}
export default class Popconfirm extends Component<PopconfirmProps, PopconfirmState> {
    static displayName: string;
    static defaultProps: {
        transitionName: string;
        placement: string;
        trigger: string;
        okType: string;
    };
    private tooltip;
    constructor(props: PopconfirmProps);
    componentWillReceiveProps(nextProps: PopconfirmProps): void;
    getPopupDomNode(): any;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    onVisibleChange: (visible: boolean) => void;
    setVisible(visible: boolean): void;
    saveTooltip: (node: any) => void;
    renderOverlay: (popconfirmLocale: PopconfirmLocale) => JSX.Element;
    getPrefixCls(): string;
    render(): JSX.Element;
}
