import React from 'react';
declare type Placement = 'top' | 'left' | 'right' | 'bottom' | 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'rightTop' | 'leftTop' | 'rightBottom' | 'leftBottom';
export declare type ConfigOnClose = (() => void) | Placement;
export interface ConfigOptions {
    top?: number;
    duration?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement;
    transitionName?: string;
    /**
     * 消息距离视窗位置
     */
    bottom?: number;
    placement?: Placement;
}
declare const _default: {
    info(content: React.ReactNode, duration?: number | "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, onClose?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, placement?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined): () => void;
    success(content: React.ReactNode, duration?: number | "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, onClose?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, placement?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined): () => void;
    error(content: React.ReactNode, duration?: number | "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, onClose?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, placement?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined): () => void;
    warn(content: React.ReactNode, duration?: number | "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, onClose?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, placement?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined): () => void;
    warning(content: React.ReactNode, duration?: number | "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, onClose?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, placement?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined): () => void;
    loading(content: React.ReactNode, duration?: number | "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, onClose?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | (() => void) | undefined, placement?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined): () => void;
    config(options: ConfigOptions): void;
    destroy(): void;
};
export default _default;
