import { Component, CSSProperties, FocusEventHandler, Key, KeyboardEventHandler, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { Size } from './enum';
import { Lang } from '../locale-context/enum';
export interface ViewComponentProps extends MouseEventComponentProps, KeyboardEventComponentProps, ElementProps {
    /**
     * 组件id
     */
    id?: string;
    /**
     *  是否禁用
     */
    disabled?: boolean;
    /**
     * 键盘Tab键焦点序号，设为-1时不会获得焦点，设为0时为节点树的顺序。
     */
    tabIndex?: number;
    /**
     * 悬浮提示，建议用ToolTip组件
     */
    title?: string;
    /**
     * 自动获取焦点，多个组件同时设置该参数时，以节点树的顺序最末的组件获取焦点
     */
    autoFocus?: boolean;
    /**
     * 组件大小<未实现>
     * 可选值 `default` `small` `big`
     */
    size?: Size;
    /**
     * 获取焦点回调
     */
    onFocus?: FocusEventHandler<any>;
    /**
     * 失去焦点回调
     */
    onBlur?: FocusEventHandler<any>;
}
export interface ElementProps {
    /**
     * 组件key
     */
    key?: Key;
    /**
     * 样式后缀
     */
    suffixCls?: string;
    /**
     * 样式前缀
     */
    prefixCls?: string;
    /**
     * 外层自定义样式名
     */
    className?: string;
    /**
     * 实际元素自定义样式名
     */
    elementClassName?: string;
    /**
     * 内链样式
     */
    style?: CSSProperties;
    /**
     * 是否隐藏
     */
    hidden?: boolean;
    /**
     * 语言
     */
    lang?: Lang;
}
/** 响应鼠标事件组件 */
export interface MouseEventComponentProps {
    /**
     * 单击回调
     */
    onClick?: MouseEventHandler<any>;
    /**
     * 双击回调
     */
    onDoubleClick?: MouseEventHandler<any>;
    /**
     * 右点击回调
     */
    onContextMenu?: MouseEventHandler<any>;
    /**
     * 鼠标抬起回调
     */
    onMouseUp?: MouseEventHandler<any>;
    /**
     * 鼠标点下回调
     */
    onMouseDown?: MouseEventHandler<any>;
    /**
     * 鼠标移动回调
     */
    onMouseMove?: MouseEventHandler<any>;
    /**
     * 鼠标进入回调
     */
    onMouseEnter?: MouseEventHandler<any>;
    /**
     * 鼠标离开回调
     */
    onMouseLeave?: MouseEventHandler<any>;
    /**
     * 鼠标进入回调，与onMouseEnter区别在于鼠标进入子节点时会触发onMouseOut
     */
    onMouseOver?: MouseEventHandler<any>;
    /**
     * 鼠标离开回调，与onMouseLeave区别在于子节点的onMouseout会冒泡触发本回调
     */
    onMouseOut?: MouseEventHandler<any>;
}
/** 响应键盘事件组件 */
export interface KeyboardEventComponentProps {
    /**
     * 键盘按下时的回调
     */
    onKeyDown?: KeyboardEventHandler<any>;
    /**
     * 键盘抬起时的回调
     */
    onKeyUp?: KeyboardEventHandler<any>;
    /**
     * 键盘敲击后的回调
     */
    onKeyPress?: KeyboardEventHandler<any>;
}
export default class ViewComponent<P extends ViewComponentProps> extends Component<P, any> {
    static propTypes: {
        /**
         * 组件id
         */
        id: PropTypes.Requireable<string>;
        /**
         * 组件大小<未实现>
         * 可选值 `default` `small` `big`
         */
        size: PropTypes.Requireable<Size>;
        /**
         * 样式后缀
         */
        suffixCls: PropTypes.Requireable<string>;
        /**
         * 样式前缀
         */
        prefixCls: PropTypes.Requireable<string>;
        /**
         * 悬浮提示，建议用ToolTip组件
         */
        title: PropTypes.Requireable<string>;
        /**
         *  是否禁用
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * 是否隐藏
         */
        hidden: PropTypes.Requireable<boolean>;
        /**
         * 自动获取焦点，多个组件同时设置该参数时，以节点树的顺序最末的组件获取焦点
         */
        autoFocus: PropTypes.Requireable<boolean>;
        /**
         * 内链样式
         */
        style: PropTypes.Requireable<object>;
        /**
         * 自定义样式名
         */
        className: PropTypes.Requireable<string>;
        /**
         * 键盘Tab键焦点序号，设为-1时不会获得焦点，设为0时为节点树的顺序。
         */
        tabIndex: PropTypes.Requireable<number>;
        /**
         * 语言
         */
        lang: PropTypes.Requireable<string>;
        /**
         * 获取焦点回调
         */
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 失去焦点回调
         */
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 单击回调
         */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 双击回调
         */
        onDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 鼠标抬起回调
         */
        onMouseUp: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 鼠标点下回调
         */
        onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 鼠标移动回调
         */
        onMouseMove: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 鼠标进入回调
         */
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 鼠标离开回调
         */
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 鼠标进入回调，与onMouseEnter区别在于鼠标进入子节点时会触发onMouseOut
         */
        onMouseOver: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 鼠标离开回调，与onMouseLeave区别在于子节点的onMouseout会冒泡触发本回调
         */
        onMouseOut: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 鼠标右击后的回调
         */
        onContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 键盘按下时的回调
         */
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 键盘抬起时的回调
         */
        onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 键盘敲击后的回调
         */
        onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
    };
    element: any;
    wrapper: any;
    isFocus: boolean;
    isFocused: boolean;
    observableProps: any;
    readonly prefixCls: string;
    readonly lang: Lang;
    constructor(props: any, context: any);
    getMergedClassNames(...props: any[]): string;
    getMergedProps(props?: {}): any;
    getObservableProps(_props: any, _context: any): {};
    setObservableProps(props: any, context: any): void;
    updateObservableProps(props: any, context: any): void;
    getOtherProps(): any;
    getClassName(...props: any[]): string | undefined;
    getWrapperProps(props?: {}): any;
    getWrapperClassNames(...args: any[]): string;
    isDisabled(): P["disabled"];
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    focus(): void;
    blur(): void;
    elementReference(node: any): void;
    wrapperReference(node: any): void;
    componentWillReceiveProps(nextProps: any, nextContext: any): void;
    componentWillMount(): void;
}
