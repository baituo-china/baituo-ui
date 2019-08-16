import { Component, CSSProperties, MouseEventHandler, ReactElement, ReactNode } from 'react';
import { TreeNode, TreeNodeAttribute } from '../rc-components/tree';
import { TreeEvent } from '../tree/enum';
export { TreeNode };
export interface TreeNodeEvent {
    event: TreeEvent;
    node: TreeNode;
    checked?: boolean;
    checkedNodes?: TreeNode[];
    selected?: boolean;
    selectedNodes?: TreeNode[];
}
export interface TreeNodeExpandEvent {
    node: TreeNode;
    expanded: boolean;
}
export interface TreeNodeMouseEvent {
    node: TreeNode;
    event: MouseEventHandler<any>;
}
export interface TreeProps {
    showLine?: boolean;
    className?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否自动展开父节点 */
    autoExpandParent?: boolean;
    /** checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
    checkStrictly?: boolean;
    /** 是否支持选中 */
    checkable?: boolean;
    /** 默认展开所有树节点 */
    defaultExpandAll?: boolean;
    /** 默认展开指定的树节点 */
    defaultExpandedKeys?: string[];
    /** （受控）展开指定的树节点 */
    expandedKeys?: string[];
    /** （受控）选中复选框的树节点 */
    checkedKeys?: string[] | {
        checked: string[];
        halfChecked: string[];
    };
    /** 默认选中复选框的树节点 */
    defaultCheckedKeys?: string[];
    /** （受控）设置选中的树节点 */
    selectedKeys?: string[];
    /** 默认选中的树节点 */
    defaultSelectedKeys?: string[];
    /** 展开/收起节点时触发 */
    onExpand?: (expandedKeys: string[], e: TreeNodeExpandEvent) => void | PromiseLike<any>;
    /** 点击复选框触发 */
    onCheck?: (checkedKeys: string[], e: TreeNodeEvent) => void;
    /** 点击树节点触发 */
    onSelect?: (selectedKeys: string[], e: TreeNodeEvent) => void;
    /** filter some AntTreeNodes as you need. it should return true */
    filterAntTreeNode?: (node: TreeNode) => boolean;
    /** 异步加载数据 */
    loadData?: (node: TreeNode) => PromiseLike<any>;
    /** 响应右键点击 */
    onRightClick?: (options: TreeNodeMouseEvent) => void;
    /** 设置节点可拖拽（IE>8）*/
    draggable?: boolean;
    /** 开始拖拽时调用 */
    onDragStart?: (options: TreeNodeMouseEvent) => void;
    /** dragenter 触发时调用 */
    onDragEnter?: (options: TreeNodeMouseEvent) => void;
    /** dragover 触发时调用 */
    onDragOver?: (options: TreeNodeMouseEvent) => void;
    /** dragleave 触发时调用 */
    onDragLeave?: (options: TreeNodeMouseEvent) => void;
    /** drop 触发时调用 */
    onDrop?: (options: TreeNodeMouseEvent) => void;
    style?: CSSProperties;
    showIcon?: boolean;
    icon?: (nodeProps: TreeNodeAttribute) => ReactNode;
    switcherIcon?: ReactElement<any>;
    prefixCls?: string;
    filterTreeNode?: (node: TreeNode) => boolean;
    focusable?: boolean;
    tabIndex?: string | number;
    openTransitionName?: string;
    openAnimation?: string | object;
    selectable?: boolean;
    defaultExpandParent?: boolean;
    children?: any;
}
export default class Tree extends Component<TreeProps, any> {
    static displayName: string;
    static TreeNode: any;
    static defaultProps: {
        checkable: boolean;
        showIcon: boolean;
        openAnimation: {
            enter(node: HTMLElement, done: () => void): any;
            leave(node: HTMLElement, done: () => void): any;
            appear(node: HTMLElement, done: () => void): any;
        };
    };
    renderSwitcherIcon: ({ isLeaf, loading }: any) => JSX.Element | null;
    getPrefixCls(): string;
    render(): JSX.Element;
}
