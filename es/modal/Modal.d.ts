import { Component, CSSProperties, MouseEvent, ReactInstance, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ButtonFuncType, ButtonType } from '../button/Button';
import Sidebar from './Sidebar';
export interface ModalProps {
    prefixCls?: string;
    /** 对话框是否可见*/
    visible?: boolean;
    /** 确定按钮 loading*/
    confirmLoading?: boolean;
    /** ok按钮是否禁用 loading*/
    disableOk?: boolean;
    /** Cancel按钮是否禁用 loading*/
    disableCancel?: boolean;
    /** 标题*/
    title?: ReactNode;
    /** 是否显示右上角的关闭按钮*/
    closable?: boolean;
    /** 点击确定回调*/
    onOk?: (e: MouseEvent<any>) => void;
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
    onCancel?: (e: MouseEvent<any>) => void;
    afterClose?: () => void;
    animationEnd?: () => void;
    /** 宽度*/
    width?: string | number;
    /** 底部内容*/
    footer?: ReactNode;
    /** 确认按钮文字*/
    okText?: string;
    /** 确认按钮类型*/
    okType?: ButtonType;
    /** 取消按钮文字*/
    cancelText?: string;
    /** 点击蒙层是否允许关闭*/
    maskClosable?: boolean;
    destroyOnClose?: boolean;
    style?: CSSProperties;
    wrapClassName?: string;
    maskTransitionName?: string;
    transitionName?: string;
    className?: string;
    getContainer?: (instance: ReactInstance) => HTMLElement;
    zIndex?: number;
    bodyStyle?: CSSProperties;
    maskStyle?: CSSProperties;
    mask?: boolean;
    keyboard?: boolean;
    funcType?: ButtonFuncType;
    center?: boolean;
}
export interface ModalFuncProps {
    prefixCls?: string;
    className?: string;
    visible?: boolean;
    title?: ReactNode;
    content?: ReactNode;
    onOk?: (...args: any[]) => any | PromiseLike<any>;
    onCancel?: (...args: any[]) => any | PromiseLike<any>;
    width?: string | number;
    iconClassName?: string;
    okText?: string;
    okType?: ButtonType;
    cancelText?: string;
    iconType?: string;
    maskClosable?: boolean;
    zIndex?: number;
    okCancel?: boolean;
    style?: CSSProperties;
    type?: string;
    keyboard?: boolean;
    transitionName?: string;
    funcType?: ButtonFuncType;
    confirmLoading?: boolean;
    disableOk?: boolean;
    disableCancel?: boolean;
    footer?: ReactNode;
}
export declare type ModalFunc = (props: ModalFuncProps) => {
    destroy: () => void;
};
export interface ModalLocale {
    okText: string;
    cancelText: string;
    justOkText: string;
}
export default class Modal extends Component<ModalProps, {}> {
    static displayName: string;
    static info: ModalFunc;
    static success: ModalFunc;
    static error: ModalFunc;
    static warn: ModalFunc;
    static warning: ModalFunc;
    static confirm: ModalFunc;
    static Sidebar: typeof Sidebar;
    static defaultProps: {
        width: number;
        transitionName: string;
        maskTransitionName: string;
        confirmLoading: boolean;
        disableOk: boolean;
        disableCancel: boolean;
        visible: boolean;
        okType: string;
        center: boolean;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        onOk: PropTypes.Requireable<(...args: any[]) => any>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        okText: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        cancelText: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        width: PropTypes.Requireable<string | number>;
        confirmLoading: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        align: PropTypes.Requireable<object>;
        footer: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        closable: PropTypes.Requireable<boolean>;
        transitionName: PropTypes.Requireable<string>;
        funcType: PropTypes.Requireable<string>;
        center: PropTypes.Requireable<boolean>;
    };
    handleCancel: (e: any) => void;
    handleOk: (e: any) => void;
    componentDidMount(): void;
    renderFooter: (locale: ModalLocale) => JSX.Element;
    render(): JSX.Element;
}
