import { Component, ComponentState, CSSProperties, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import DataSet from '../data-set/DataSet';
import Record from '../data-set/Record';
import { FormFieldProps, Renderer } from '../field/FormField';
import { ElementProps } from '../core/ViewComponent';
import { ColumnAlign, ColumnLock } from './enum';
import { ShowHelp } from '../field/enum';
import { Commands } from './Table';
export declare const defaultMinWidth = 100;
export declare type onCellProps = {
    dataSet: DataSet;
    record: Record;
    column: ColumnProps;
};
export interface ColumnProps extends ElementProps {
    /**
     * 列对照的字段名
     */
    name?: string;
    /**
     * 列宽
     * 不推荐给所有列设置宽度，而是给某一列不设置宽度达到自动宽度的效果
     */
    width?: number;
    /**
     * 最小列宽
     */
    minWidth?: number;
    /**
     * 列头
     */
    header?: ReactNode | ((dataSet: DataSet, name?: string) => ReactNode);
    /**
     * 列脚
     */
    footer?: ReactNode | ((dataSet: DataSet, name?: string) => ReactNode);
    /**
     * 单元格渲染回调
     */
    renderer?: Renderer;
    /**
     * 编辑器
     */
    editor?: ReactElement<FormFieldProps> | ((record: Record, name?: string) => ReactElement<FormFieldProps>) | true;
    /**
     * 是否锁定
     * 可选值： false | true | 'left' | 'right'
     * @default false
     */
    lock?: ColumnLock | boolean;
    /**
     * 文字对齐方式
     * 可选值： 'left' | 'center' | 'right'
     */
    align?: ColumnAlign;
    /**
     * 是否可调整宽度
     * @default true
     */
    resizable?: boolean;
    /**
     * 是否可排序
     * @default false
     */
    sortable?: boolean;
    /**
     * 是否可隐藏，设为false时不会出现在列过滤选项中
     * @default true
     */
    hideable?: boolean;
    /**
     * 列头内链样式
     */
    headerStyle?: CSSProperties;
    /**
     * 列头样式名
     */
    headerClassName?: string;
    /**
     * 列脚内链样式
     */
    footerStyle?: CSSProperties;
    /**
     * 列脚样式名
     */
    footerClassName?: string;
    /**
     * 列头提示信息
     */
    help?: string;
    /**
     * 显示提示信息的方式
     *
     */
    showHelp?: ShowHelp;
    /**
     * 设置单元格属性
     * @param {onCellProps} props
     * @return {Object} 单元格属性
     */
    onCell?: (props: onCellProps) => object;
    /**
     * 行操作按钮
     * 可选值：`edit` `delete` 或 自定义按钮
     * 给内置按钮加属性：command={[['edit', { color: 'red' }], ...]}
     */
    command?: Commands[];
    children?: ColumnProps[];
}
export default class Column extends Component<ColumnProps, ComponentState> {
    static propTypes: {
        /**
         * 列对照的字段名
         */
        name: PropTypes.Requireable<string>;
        /**
         * 列宽
         * 不推荐给所有列设置宽度，而是给某一列不设置宽度达到自动宽度的效果
         */
        width: PropTypes.Requireable<number>;
        /**
         * 最小列宽
         */
        minWidth: PropTypes.Requireable<number>;
        /**
         * 列头
         */
        header: PropTypes.Requireable<string | PropTypes.ReactElementLike | ((...args: any[]) => any)>;
        /**
         * 列脚
         */
        footer: PropTypes.Requireable<string | PropTypes.ReactElementLike | ((...args: any[]) => any)>;
        /**
         * 单元格渲染回调
         */
        renderer: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 编辑器
         */
        editor: PropTypes.Requireable<boolean | PropTypes.ReactElementLike | ((...args: any[]) => any)>;
        /**
         * 是否锁定
         * 可选值： false | true | 'left' | 'right'
         * @default false
         */
        lock: PropTypes.Requireable<boolean | ColumnLock>;
        /**
         * 文字对齐方式
         * 可选值： 'left' | 'center' | 'right'
         */
        align: PropTypes.Requireable<ColumnAlign>;
        /**
         * 是否可调整宽度
         * @default true
         */
        resizable: PropTypes.Requireable<boolean>;
        /**
         * 是否可排序
         * @default false
         */
        sortable: PropTypes.Requireable<boolean>;
        /**
         * 是否可隐藏，设为false时不会出现在列过滤选项中
         * @default true
         */
        hideable: PropTypes.Requireable<boolean>;
        /**
         * 是否可排序
         * @default false
         */
        /**
         * 列头提示信息
         */
        help: PropTypes.Requireable<string>;
        /**
         * 显示提示信息的方式
         *
         */
        showHelp: PropTypes.Requireable<ShowHelp>;
        colSpan: PropTypes.Requireable<number>;
        rowSpan: PropTypes.Requireable<number>;
        children: PropTypes.Requireable<any[]>;
    };
    static defaultProps: {
        hidden: boolean;
        lock: boolean;
        resizable: boolean;
        sortable: boolean;
        hideable: boolean;
        minWidth: number;
        showHelp: ShowHelp;
    };
}
export declare function minColumnWidth(col: any): any;
export declare function columnWidth(col: any): any;
