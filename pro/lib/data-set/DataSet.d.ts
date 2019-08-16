import { IReactionDisposer } from 'mobx';
import { AxiosInstance } from 'axios';
import Record from './Record';
import Field, { FieldProps, Fields } from './Field';
import EventManager from '../_util/EventManager';
import DataSetSnapshot from './DataSetSnapshot';
import { DataSetSelection, DataSetStatus } from './enum';
import { Lang } from '../locale-context/enum';
import Transport, { TransportProps } from './Transport';
export declare type DataSetChildren = {
    [key: string]: DataSet;
};
export declare type Events = {
    [key: string]: Function;
};
export interface DataSetProps {
    /**
     * 唯一标识
     * @see children
     */
    id?: string;
    /**
     * 对应后台ds的name，用于自动生成约定的submitUrl, queryUrl, tlsUrl，也可用于级联
     * @see children
     */
    name?: string;
    /**
     * 主键字段名，一般用作级联行表的查询字段
     */
    primaryKey?: string;
    /**
     * 语言
     */
    lang?: Lang;
    /**
     * 字段组
     */
    fields?: FieldProps[];
    /**
     * 查询字段组
     */
    queryFields?: FieldProps[];
    /**
     * 事件
     */
    events?: Events;
    /**
     * 初始化数据
     */
    data?: object[];
    /**
     * 初始化后自动查询
     * @default false
     */
    autoQuery?: boolean;
    /**
     * 初始化时，如果没有记录且autoQuery为false，则自动创建记录
     * @default false;
     */
    autoCreate?: boolean;
    /**
     * 自动定位到第一条
     * @default true;
     */
    autoLocateFirst?: boolean;
    /**
     * 选择的模式
     * @default "multiple"
     */
    selection?: DataSetSelection | false;
    /**
     * 查询前，当有记录更改过时，是否警告提示
     * @default true
     */
    modifiedCheck?: boolean;
    /**
     * 分页大小
     * @default 10
     */
    pageSize?: number;
    /**
     * 前端分页、后端分页还是不分页
     */
    paging?: boolean;
    /**
     * 查询返回的json中对应的数据的key
     * @default "rows"
     */
    dataKey?: string;
    /**
     * 查询返回的json中对应的总数的key
     * @default "total"
     */
    totalKey?: string;
    /**
     * 查询条件数据源
     */
    queryDataSet?: DataSet;
    /**
     * 查询参数
     */
    queryParameter?: object;
    /**
     * 查询请求的url
     */
    queryUrl?: string;
    /**
     * 记录提交请求的url
     */
    submitUrl?: string;
    /**
     * 多语言查询请求的url
     */
    tlsUrl?: string;
    /**
     * 远程校验查询请求的url。如唯一性校验。
     */
    validateUrl?: string;
    /**
     * 导出请求的url
     */
    exportUrl?: string;
    /**
     * 自定义CRUD的请求配置
     */
    transport?: TransportProps;
    /**
     * 级联行数据集, 当为数组时，数组成员必须是有name属性的DataSet
     * @example
     * { name_1: 'ds-id-1', name_2: 'ds-id-2' }
     * { name_1: ds1, name_2: ds2 }
     * [ds1, ds2]
     */
    children?: {
        [key: string]: (string | DataSet);
    } | DataSet[];
    /**
     * 树形数据当前节点id字段名
     */
    idField?: string;
    /**
     * 树形数据当前父节点id字段名
     */
    parentField?: string;
    /**
     * 树形数据标记节点是否展开的字段名
     */
    expandField?: string;
    /**
     * 树形数据标记节点是否为选中的字段名，在展开按钮后面会显示checkbox
     */
    checkField?: string;
    /**
     * 缓存选中记录，使切换分页时仍保留选中状态。
     * 当设置了primaryKey或有字段设置了unique才起作用。
     * @default true
     */
    cacheSelection?: boolean;
    /**
     * 覆盖默认axios
     */
    axios?: AxiosInstance;
}
export default class DataSet extends EventManager {
    static defaultProps: DataSetProps;
    id?: string;
    name?: string;
    readonly axios: AxiosInstance;
    fields: Fields;
    parent?: DataSet;
    tlsRecord?: Record;
    children: DataSetChildren;
    originalData: Record[];
    queryParameter: object;
    pending?: Promise<any>;
    isFilteredByQueryFields: boolean;
    reaction: IReactionDisposer;
    lang: Lang | undefined;
    /**
    * 设置查询的DataSet.
    * @param {DataSet} ds DataSet.
    */
    queryDataSet: DataSet | undefined;
    /**
    * 设置提交的Url.
    * @param {String} url 提交的Url.
    */
    queryUrl: string | undefined;
    /**
    * 设置查询的Url.
    * @param {String} url 查询的Url.
    */
    submitUrl: string | undefined;
    /**
    * 设置多语言的Url.
    * @param {String} url 多语言的Url.
    */
    tlsUrl: string | undefined;
    /**
    * 设置远程校验查询请求的url.
    * @param {String} url 远程校验查询请求的url.
    */
    validateUrl: string | undefined;
    /**
    * 设置导出请求的url.
    * @param {String} url 远程校验查询请求的url.
    */
    exportUrl: string | undefined;
    transport: Transport;
    props: DataSetProps;
    data: Record[];
    pageSize: number;
    totalCount: number;
    status: DataSetStatus;
    currentPage: number;
    selection: DataSetSelection | false;
    /**
     * 获取删除的记录集
     * @return 记录集
     */
    destroyed: Record[];
    cachedSelected: Record[];
    /**
     * 获取新建的记录集
     * @return 记录集
     */
    readonly created: Record[];
    /**
     * 获取变更的记录集
     * @return 记录集
     */
    readonly updated: Record[];
    /**
     * 获取选中的记录集
     * @return 记录集
     */
    readonly selected: Record[];
    readonly currentSelected: Record[];
    readonly totalPage: number;
    currentIndex: number;
    /**
     * 记录数
     */
    readonly length: number;
    readonly hasChildren: boolean;
    readonly treeData: Record[];
    paging: boolean;
    /**
     * 获取当前索引的记录
     * @return record 记录
     */
    /**
    * 将记录设定为当前索引
    * @param record 记录
    */
    current: Record | undefined;
    readonly uniqueKeys: string[] | undefined;
    readonly cacheSelectionKeys: string[] | undefined;
    /**
     * 获取所有记录包括缓存的选择记录
     * @param index 索引
     * @returns {Record}
     */
    readonly all: Record[];
    private inBatchSelection;
    private syncChildrenRemote;
    constructor(props?: DataSetProps);
    processListener(): void;
    destroy(): void;
    snapshot(): DataSetSnapshot;
    restore(snapshot: DataSetSnapshot): DataSet;
    toData(): object[];
    toJSONData(isSelected?: boolean, noCascade?: boolean): object[];
    /**
     * 等待选中或者所有记录准备就绪
     * @param isSelect 如果为true，则只等待选中的记录
     * @returns Promise
     */
    ready(isSelect?: boolean): Promise<any>;
    /**
     * 查询记录
     * @param page 页码
     * @return Promise
     */
    query(page?: number): Promise<any>;
    /**
     * 将数据集中的增删改的记录进行远程提交
     * @param isSelect 如果为true，则只提交选中记录
     * @param noCascade 如果为true，则不提交级联数据
     * @return Promise
     */
    submit(isSelect?: boolean, noCascade?: boolean): Promise<any>;
    /**
     * 导出数据
     * @param object columns 导出的列
     */
    export(columns?: any): Promise<void>;
    /**
     * 重置更改
     */
    reset(): DataSet;
    /**
     * 定位到指定页码，如果paging为true或`server`，则做远程查询
     * @param page 页码
     * @return Promise
     */
    page(page: number): Promise<any>;
    /**
     * 定位记录
     * @param index 索引
     * @return Promise
     */
    locate(index: number): Promise<Record | undefined>;
    /**
     * 定位到第一条记录
     * @return Promise
     */
    first(): Promise<Record | undefined>;
    /**
     * 定位到最后一条记录
     * @return Promise
     */
    last(): Promise<Record | undefined>;
    /**
     * 定位到当前记录的上一条记录
     * 若当前页中当前记录为第一条记录且有上一页，则会查询上一页并定位到上一页的最后一条记录
     * @return Promise
     */
    pre(): Promise<Record | undefined>;
    /**
     * 定位到当前记录的下一条记录
     * 若当前页中当前记录为最后一条记录且有下一页，则会查询下一页并定位到下一页的第一条记录
     * @return Promise
     */
    next(): Promise<Record | undefined>;
    /**
     * 定位到首页
     * @return Promise
     */
    firstPage(): Promise<any>;
    /**
     * 定位到上一页
     * @return Promise
     */
    prePage(): Promise<any>;
    /**
     * 定位到下一页
     * @return Promise
     */
    nextPage(): Promise<any>;
    /**
     * 定位到尾页
     * @return Promise
     */
    lastPage(): Promise<any>;
    /**
     * 创建一条记录
     * @param data 数据对象
     * @param dataIndex 记录所在的索引
     * @return 新建的记录
     */
    create(data?: object, dataIndex?: number): Record;
    /**
     * 立即删除记录
     * @param records 记录或者记录数组，默认当前记录
     * @return Promise
     */
    delete(records?: Record | Record[]): Promise<any>;
    /**
     * 临时删除记录
     * @param records 记录或者记录数组
     */
    remove(records?: Record | Record[]): void;
    /**
     * 临时删除所有记录
     */
    removeAll(): void;
    /**
     * 删除所有记录
     */
    deleteAll(): Promise<any>;
    /**
     * 将若干数据记录插入记录堆栈顶部
     * @param records 数据集
     * @return 堆栈数量
     */
    push(...records: Record[]): number;
    /**
     * 将若干数据记录插入记录堆栈底部
     * @param records 数据集
     * @return 堆栈数量
     */
    unshift(...records: Record[]): number;
    /**
     * 从记录堆栈顶部获取记录
     * @return 记录
     */
    pop(): Record | undefined;
    /**
     * 从记录堆栈底部获取记录
     * @return 记录
     */
    shift(): Record | undefined;
    /**
     * 删除指定索引的若干记录，并可插入若干新记录
     * @param from 索引开始的位置
     * @default 0
     * @param deleteCount 删除的数量
     * @default 0
     * @param records 插入的若干新记录
     * @return 被删除的记录集
     */
    splice(from: number, deleteCount: number, ...records: Record[]): (Record | undefined)[];
    /**
     * 截取指定索引范围的记录集，不改变原记录堆栈
     * @param start 开始索引
     * @default 0
     * @param end 结束索引
     * @default 记录堆栈长度
     * @return 被删除的记录集
     */
    slice(start?: number, end?: number): Record[];
    /**
     * 获取记录所在的索引
     * @param record 记录
     * @param fromIndex 开始检索的索引
     * @return 索引
     */
    indexOf(record: Record, fromIndex?: number): number;
    /**
     * 根据函数查找记录
     * @param fn 查询函数
     * @returns 记录
     */
    find(fn: (record: Record, index: number, array: Record[]) => boolean): Record | undefined;
    /**
     * 根据函数查找记录所在的索引
     * @param fn 查询函数
     * @returns 索引
     */
    findIndex(fn: (record: Record, index: number, array: Record[]) => boolean): number;
    /**
     * 根据函数遍历
     * @param fn 遍历函数
     * @param thisArg this对象
     */
    forEach(fn: (record: Record, index: number, array: Record[]) => void, thisArg?: any): void;
    /**
     * 根据函数遍历并输出新数组
     * @param fn 遍历函数
     * @param thisArg this对象
     * @returns 输出新数组
     */
    map<U>(fn: (record: Record, index: number, array: Record[]) => U, thisArg?: any): U[];
    /**
     * 根据函数遍历，当有返回值为true时，输出true
     * @param fn 遍历函数
     * @param thisArg this对象
     * @returns boolean
     */
    some(fn: (record: Record, index: number, array: Record[]) => boolean, thisArg?: any): boolean;
    /**
     * 根据函数遍历，当有返回值为false时，输出false
     * @param fn 遍历函数
     * @param thisArg this对象
     * @returns boolean
     */
    every(fn: (record: Record, index: number, array: Record[]) => boolean, thisArg?: any): boolean;
    /**
     * 根据函数过滤并返回记录集
     * @param fn 过滤函数
     * @param thisArg this对象
     * @returns {Record[]}
     */
    filter(fn: (record: Record, index: number, array: Record[]) => boolean, thisArg?: any): Record[];
    /**
     * 为数组中的所有元素调用指定的回调函数。 回调函数的返回值是累计结果，并在下次调用回调函数时作为参数提供。
     * @param fn 累计函数
     * @param initialValue 初始值
     * @returns {U}
     */
    reduce<U>(fn: (previousValue: U, record: Record, index: number, array: Record[]) => U, initialValue: U): U;
    /**
     * 按降序调用数组中所有元素的指定回调函数。 回调函数的返回值是累计结果，并在下次调用回调函数时作为参数提供。
     * @param fn 累计函数
     * @param initialValue 初始值
     * @returns {U}
     */
    reduceRight<U>(fn: (previousValue: U, record: Record, index: number, array: Record[]) => U, initialValue: U): U;
    /**
     * 反转记录的顺序。
     */
    reverse(): Record[];
    /**
     * 服务端排序
     * @param fieldName
     */
    sort(fieldName: string): void;
    /**
     * 选中记录
     * @param recordOrIndex 记录或记录索引
     */
    select(recordOrIndex: Record | number): void;
    /**
     * 取消选中记录
     * @param recordOrIndex 记录或记录索引
     */
    unSelect(recordOrIndex: Record | number): void;
    /**
     * 全选
     */
    selectAll(filter?: (record: Record) => boolean): void;
    /**
     * 取消全选
     */
    unSelectAll(): void;
    clearCachedSelected(): void;
    /**
     * 获取指定索引的记录
     * @param index 索引
     * @returns {Record}
     */
    get(index: number): Record | undefined;
    /**
     * 判断是否有新增、变更或者删除的记录
     * @return true | false
     */
    isModified(): boolean;
    /**
     * 获取指定分页的记录集
     * @param page 如果page为空或者paging为server，则获取当前分页的记录集
     * @return 记录集
     */
    /**
     * 根据记录ID查找记录
     * @param id 记录ID
     * @return 记录
     */
    findRecordById(id: number | string): Record | undefined;
    /**
     * 校验数据记录是否有效
     * @param isSelected 是否只校验选中记录
     * @param noCascade 是否级联校验
     * @return true | false
     */
    validate(isSelected?: boolean, noCascade?: boolean): Promise<boolean>;
    /**
     * 根据字段名获取字段
     * @param fieldName 字段名
     * @returns 字段
     */
    getField(fieldName?: string): Field | undefined;
    /**
     * 获取分组字段名
     * @returns 字段名列表
     */
    getGroups(): string[];
    initFields(fields: FieldProps[]): void;
    addField(fieldName: string, props?: FieldProps): Field;
    commitData(allData: any[], total?: number): DataSet;
    /**
     * 数据集头行级联绑定
     * @param ds 头数据集
     * @param name 头数据集字段名
     */
    bind(ds: DataSet, name: string): void;
    /**
     * 设置查询的参数.
     * @param {string} para 参数名.
     * @param {any} value 参数值.
     */
    setQueryParameter(para: string, value: any): void;
    loadData(allData?: object[], total?: number): DataSet;
    private deleteRecord;
    private findInAllPage;
    private getIndexInCurrentPage;
    private transferRecords;
    private initChildren;
    private initQueryDataSet;
    private initEvents;
    private loadDataFromResponse;
    private write;
    private read;
    private storeSelected;
    private releaseCachedSelected;
    private changeStatus;
    private changeSubmitStatus;
    private handleCascade;
    private handleLoadFail;
    private handleSubmitSuccess;
    private handleSubmitFail;
    private syncChildren;
    private syncChild;
    private checkReadable;
    private generatePageQueryString;
    private generateOrderQueryString;
    private generateQueryString;
    private generateQueryParameter;
}
