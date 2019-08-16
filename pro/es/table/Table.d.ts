import { ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import Column, { ColumnProps } from './Column';
import DataSet from '../data-set/DataSet';
import Record from '../data-set/Record';
import TableStore from './TableStore';
import { PaginationProps } from '../pagination/Pagination';
import DataSetComponent, { DataSetComponentProps } from '../data-set/DataSetComponent';
import { ColumnLock, ScrollPosition, SelectionMode, TableButtonType, TableCommandType, TableEditMode, TableMode, TablePaginationPosition, TableQueryBar } from './enum';
import { ButtonProps } from '../button/Button';
export declare type expandedRowRendererProps = {
    dataSet: DataSet;
    record: Record;
};
export declare type onRowProps = {
    dataSet: DataSet;
    record: Record;
    index: number;
    expandedRow: boolean;
};
export declare type Buttons = TableButtonType | [TableButtonType, ButtonProps] | ReactElement<ButtonProps>;
export declare type Commands = TableCommandType | [TableCommandType, ButtonProps] | ReactElement<ButtonProps>;
export declare const buttonsEnumType: PropTypes.Requireable<TableButtonType>;
export interface TablePaginationConfig extends PaginationProps {
    position?: TablePaginationPosition;
}
export interface TableProps extends DataSetComponentProps {
    columns?: ColumnProps[];
    /**
     * 表头
     */
    header?: ReactNode | ((records: Record[]) => ReactNode);
    /**
     * 表脚
     */
    footer?: ReactNode | ((records: Record[]) => ReactNode);
    /**
     * 是否显示边框
     * @default true
     */
    border?: boolean;
    /**
     * 数据源
     */
    dataSet: DataSet;
    /**
     * 选择记录的模式
     */
    selectionMode?: SelectionMode;
    /**
     * 设置行属性
     * @param {onRowProps} props
     * @return {Object} 行属性
     */
    onRow?: (props: onRowProps) => object;
    /**
     * @deprecated
     * 请使用 onRow
     */
    rowRenderer?: (record: Record, index: number) => object;
    /**
     * 功能按钮
     * 可选值：`add` `delete` `remove` `save` `query` `reset` `expandAll` `collapseAll` `export` 或 自定义按钮
     * 给内置按钮加属性：buttons={[['add', { color: 'red' }], ...]}
     */
    buttons?: Buttons[];
    /**
     * 自定义查询字段组件
     * @example
     * { age: <NumberField /> }
     *
     * 默认会根据queryDataSet中定义的field类型自动匹配组件， 匹配类型如下
     * lovCode => Lov
     * lookupCode => Select
     * type:number => NumberField
     * type:date => DatePicker
     * type:dateTime => DatePicker[mode=dateTime]
     * type:week => DatePicker[mode=week]
     * default => TextField
     */
    queryFields?: {
        [key: string]: ReactElement<any>;
    };
    /**
     * 头部显示的查询字段的数量，超出限制的查询字段放入弹出窗口
     * @default 1
     */
    queryFieldsLimit?: number;
    /**
     * 显示查询条
     * 可选值: `advancedBar` `normal` `bar` `none`
     * @default 'normal'
     */
    queryBar?: TableQueryBar;
    /**
     * @deprecated
     * 请使用 queryBar="none"
     */
    showQueryBar?: boolean;
    /**
     * 行高
     * @default 31
     */
    rowHeight?: number | 'auto';
    /**
     * 默认行是否展开，当dataSet没有设置expandField时才有效
     * @default false;
     */
    defaultRowExpanded?: boolean;
    /**
     * 通过点击行来展开子行
     */
    expandRowByClick?: boolean;
    /**
     * 展开行渲染器
     */
    expandedRowRenderer?: (props: expandedRowRendererProps) => ReactNode;
    /**
     * 展开图标所在列索引
     */
    expandIconColumnIndex?: number;
    /**
     * 展示树形数据时，每层缩进的宽度
     */
    indentSize?: number;
    /**
     * 数据过滤
     * 返回值 true - 显示 false - 不显示
     * @param {Record} record 记录
     * @return {boolean}
     */
    filter?: (record: Record) => boolean;
    /**
     * 表格展示的模式
     * tree需要配合dataSet的`idField`和`parentField`来展示
     * 可选值: `list` `tree`
     */
    mode?: TableMode;
    /**
     * 表格编辑的模式
     * 可选值: `cell` `inline`
     * @default cell
     */
    editMode?: TableEditMode;
    /**
     * queryBar为bar时，直接输入的过滤条件的字段名
     */
    filterBarFieldName?: string;
    /**
     * queryBar为bar时输入框的占位符
     */
    filterBarPlaceholder?: string;
    /**
     * 分页导航条属性
     */
    pagination?: TablePaginationConfig | false;
    /**
     * 高亮行
     */
    highLightRow?: boolean;
    /**
     * 可调整列宽
     */
    columnResizable?: boolean;
    /**
     * 显示原始值
     */
    pristine?: boolean;
}
export default class Table extends DataSetComponent<TableProps> {
    static displayName: string;
    static Column: typeof Column;
    static propTypes: {
        id: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<import("../core/enum").Size>;
        suffixCls: PropTypes.Requireable<string>;
        prefixCls: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
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
        /**
         * queryBar为bar时，直接输入的过滤条件的字段名
         */
        onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
        dataSet: PropTypes.Requireable<object>;
        columns: PropTypes.Requireable<any[]>;
        /**
         * 表头
         */
        header: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        /**
         * 表脚
         */
        footer: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        /**
         * 是否显示边框
         * @default true
         */
        border: PropTypes.Requireable<boolean>;
        /**
         * 功能按钮
         * 可选值：`add` `delete` `remove` `save` `query` `expandAll` `collapseAll` 或 自定义按钮
         */
        buttons: PropTypes.Requireable<(string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray | null)[]>;
        /**
         * 自定义查询字段组件
         * 默认会根据queryDataSet中定义的field类型自动匹配组件， 匹配类型如下
         * lovCode => Lov
         * lookupCode => Select
         * type:number => NumberField
         * type:date => DatePicker
         * type:dateTime => DatePicker[mode=dateTime]
         * type:week => DatePicker[mode=week]
         * default => TextField
         */
        queryFields: PropTypes.Requireable<object>;
        /**
         * 头部显示的查询字段的数量，超出限制的查询字段放入弹出窗口
         * @default 1
         */
        queryFieldsLimit: PropTypes.Requireable<number>;
        /**
         * 显示查询条
         * @default true
         */
        queryBar: PropTypes.Requireable<TableQueryBar>;
        /**
         * 行高
         * @default 30
         */
        rowHeight: PropTypes.Requireable<string | number>;
        defaultRowExpanded: PropTypes.Requireable<boolean>;
        expandRowByClick: PropTypes.Requireable<boolean>;
        indentSize: PropTypes.Requireable<number>;
        filter: PropTypes.Requireable<(...args: any[]) => any>;
        mode: PropTypes.Requireable<TableMode>;
        editMode: PropTypes.Requireable<TableEditMode>;
        filterBarFieldName: PropTypes.Requireable<string>;
        filterBarPlaceholder: PropTypes.Requireable<string>;
        highLightRow: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        suffixCls: string;
        tabIndex: number;
        selectionMode: SelectionMode;
        queryFields: {};
        queryFieldsLimit: number;
        defaultRowExpanded: boolean;
        expandRowByClick: boolean;
        indentSize: number;
        filterBarFieldName: string;
    };
    tableStore: TableStore;
    resizeObserver?: ResizeObserver;
    oldWidth?: number;
    isHidden?: boolean;
    resizeLine: HTMLDivElement | null;
    tableHeadWrap: HTMLDivElement | null;
    tableBodyWrap: HTMLDivElement | null;
    tableFootWrap: HTMLDivElement | null;
    fixedColumnsBodyLeft: HTMLDivElement | null;
    fixedColumnsBodyRight: HTMLDivElement | null;
    lastScrollLeft: number;
    lastScrollTop: number;
    scrollPosition: ScrollPosition;
    readonly currentRow: HTMLTableRowElement | null;
    readonly firstRow: HTMLTableRowElement | null;
    readonly lastRow: HTMLTableRowElement | null;
    private handleSwitchChange;
    private handleResize;
    saveResizeRef: (node: HTMLDivElement | null) => void;
    handleDataSetLoad: () => void;
    handleDataSetCreate: ({ record }: {
        record: any;
    }) => void;
    handleKeyDown: (e: any) => void;
    focusRow(row: HTMLTableRowElement | null): void;
    handleKeyDownHome(e: any): Promise<void>;
    handleKeyDownEnd(e: any): Promise<void>;
    handleKeyDownUp(e: any): Promise<void>;
    handleKeyDownDown(e: any): Promise<void>;
    handleKeyDownRight(e: any): void;
    handleKeyDownLeft(e: any): void;
    getOtherProps(): Pick<Pick<any, string | number | symbol>, string | number | symbol>;
    getClassName(): string | undefined;
    getWrapperProps(props?: {}): any;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any, nextContext: any): void;
    componentWillUnmount(): void;
    processDataSetListener(flag: boolean): void;
    renderBar(): JSX.Element;
    renderAdvancedQueryBar(): JSX.Element;
    render(): JSX.Element;
    handleBodyScroll(e: any): void;
    handleBodyScrollTop(e: any): void;
    handleBodyScrollLeft(e: any): void;
    setScrollPositionClassName(target?: any): void;
    setScrollPosition(position: ScrollPosition): void;
    renderTable(hasHeader: boolean, hasBody: boolean, hasFooter: boolean, lock?: ColumnLock | boolean): ReactNode;
    getHeader(): ReactNode;
    getFooter(): ReactNode | undefined;
    getPagination(position: TablePaginationPosition): ReactNode;
    getCacheSelectionSwitch(): JSX.Element | undefined;
    getTable(lock?: ColumnLock | boolean): ReactNode;
    getLeftFixedTable(): ReactNode;
    getRightFixedTable(): ReactNode | undefined;
    getTableBody(lock?: ColumnLock | boolean): ReactNode;
    getTableHeader(lock?: ColumnLock | boolean): ReactNode;
    getTableFooter(lock?: ColumnLock | boolean): ReactNode;
    getStyleHeight(): number | undefined;
    syncSize(): void;
    initDefaultExpandedRows(): void;
}
