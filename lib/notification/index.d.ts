import { CSSProperties, ReactNode } from 'react';
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type IconType = 'success' | 'info' | 'error' | 'warning';
export interface ConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    placement?: NotificationPlacement;
    getContainer?: () => HTMLElement;
}
export interface ArgsProps {
    message: ReactNode;
    description: ReactNode;
    btn?: ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number | null;
    icon?: ReactNode;
    placement?: NotificationPlacement;
    style?: CSSProperties;
    prefixCls?: string;
    className?: string;
    readonly type?: IconType;
}
export interface NotificationApi {
    success(args: ArgsProps): void;
    error(args: ArgsProps): void;
    info(args: ArgsProps): void;
    warn(args: ArgsProps): void;
    warning(args: ArgsProps): void;
    open(args: ArgsProps): void;
    close(key: string): void;
    config(options: ConfigProps): void;
    destroy(): void;
}
declare const _default: NotificationApi;
export default _default;
