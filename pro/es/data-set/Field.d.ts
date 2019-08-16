/// <reference types="react" />
import { ObservableMap } from 'mobx';
import { MomentInput } from 'moment';
import DataSet from './DataSet';
import Record from './Record';
import Validator, { CustomValidator } from '../validator/Validator';
import { FieldIgnore, FieldType, SortOrder } from './enum';
import Validity from '../validator/Validity';
import ValidationResult from '../validator/ValidationResult';
import { LovConfig } from '../lov/Lov';
import { AxiosRequestConfig } from 'axios';
import { ValidatorProps } from '../validator/rules';
export declare type Fields = ObservableMap<string, Field>;
export declare type FieldProps = {
    /**
     * 字段名
     */
    name?: string;
    /**
     * 字段类型
     */
    type?: FieldType;
    /**
     * 排序类型
     * 可选值： asc | desc
     */
    order?: SortOrder;
    /**
     * 字段标签
     */
    label?: string;
    /**
     * 日期类型字段值格式化
     */
    format?: string;
    /**
     * 正则
     */
    pattern?: string | RegExp;
    /**
     * 最小长度
     */
    minLength?: number;
    /**
     * 最大长度
     */
    maxLength?: number;
    /**
     * 步距
     */
    step?: number;
    /**
     * 最大值
     */
    max?: MomentInput;
    /**
     * 最小值
     */
    min?: MomentInput;
    /**
     * 校验器
     */
    validator?: CustomValidator;
    /**
     * 是否必选
     * @default false
     */
    required?: boolean;
    /**
     * 是否只读
     * @default false
     */
    readOnly?: boolean;
    /**
     * 1.当type为object时需要显示的字段名
     * 2.值列表的文本字段，当有lookupCode时，默认值为`meaning`
     */
    textField?: string;
    /**
     * 值列表的值字段，当有lookupCode时，默认值为`value`
     */
    valueField?: string;
    /**
     *  类型为boolean时，true对应的值
     */
    trueValue?: string | number | boolean;
    /**
     *  类型为boolean时，false对应的值
     */
    falseValue?: string | number | boolean;
    /**
     * 下拉框组件的菜单数据集
     */
    options?: DataSet | string;
    /**
     * 是否分组
     * 如果是number，则为分组的顺序
     */
    group?: number | boolean;
    /**
     * 默认值
     */
    defaultValue?: any;
    /**
     * 是否为值数组
     * 当为字符串时，作为数据分隔符，查询时会将字符串分割成数组，提交时会将数组拼接成字符串
     * @default false
     */
    multiple?: boolean | string;
    /**
     * 唯一索引或联合唯一索引组名
     */
    unique?: boolean | string;
    /**
     * LOV代码
     */
    lovCode?: string;
    /**
     * LOV查询参数
     */
    lovPara?: object;
    /**
     * 值列表代码
     */
    lookupCode?: string;
    /**
     * 值列表请求的Url
     */
    lookupUrl?: string | ((code: string) => string);
    /**
     * 值列表请求的axiosConfig
     */
    lookupAxiosConfig?: AxiosRequestConfig | ((props: {
        params?: any;
        dataSet?: DataSet;
        record?: Record;
        lookupCode?: string;
    }) => AxiosRequestConfig);
    /**
     * 内部字段别名绑定
     */
    bind?: string;
    /**
     * 动态属性
     */
    dynamicProps?: (props: {
        dataSet: DataSet;
        record: Record;
        name: string;
    }) => any;
    /**
     * 快码和LOV查询时的级联参数映射
     * @example
     * cascadeMap: { parentCodeValue: 'city' }
     * 其中'city'是当前所在数据源的其他字段名，parentCodeValue是关联父级的查询字段
     */
    cascadeMap?: object;
    /**
     * 货币代码
     */
    currency?: string;
    /**
     * 忽略提交
     * 可选值: always - 总是忽略 clean - 值未变化时忽略 never - 从不忽略
     * @default never
     */
    ignore?: FieldIgnore;
    /**
     * 在发送请求之前对数据进行处理
     */
    transformRequest?: (data: object) => object;
    /**
     * 在获得响应之后对数据进行处理
     */
    transformResponse?: (data: object) => object;
};
export default class Field {
    static defaultProps: FieldProps;
    dataSet?: DataSet;
    record?: Record;
    pristineProps: FieldProps;
    validator: Validator;
    lookUpPending?: Promise<object[] | undefined>;
    lovPending?: Promise<LovConfig | undefined>;
    lastDynamicProps: any;
    props: FieldProps & {
        [key: string]: any;
    };
    modified: boolean;
    isDirtyComputing: boolean;
    isBinding: boolean;
    dirty: boolean;
    readonly name: string;
    order: string | undefined;
    constructor(props?: FieldProps, dataSet?: DataSet, record?: Record);
    /**
     * 获取所有属性
     * @return 属性对象
     */
    getProps(): FieldProps & {
        [key: string]: any;
    };
    /**
     * 根据属性名获取属性值
     * @param propsName 属性名
     * @return {any}
     */
    get(propsName: string): any;
    /**
     * 设置属性值
     * @param propsName 属性名
     * @param value 属性值
     * @return {any}
     */
    set(propsName: string, value: any): void;
    /**
     * 根据lookup值获取lookup对象
     * @param value lookup值
     * @return {object}
     */
    getLookupData(value?: any): object;
    getValue(): any;
    /**
     * 根据lookup值获取lookup含义
     * @param value lookup值
     * @param boolean showValueIfNotFound
     * @return {string}
     */
    getText(value?: any, showValueIfNotFound?: boolean): string | undefined;
    setOptions(options: DataSet): void;
    getOptions(): DataSet | undefined;
    /**
     * 重置设置的属性
     */
    reset(): void;
    commit(): void;
    /**
     * 是否必选
     * @return true | false
     */
    /**
    * 设置是否必选
    * @param required 是否必选
    */
    required: boolean;
    /**
     * 是否只读
     * @return true | false
     */
    /**
    * 设置是否只读
    * @param readOnly 是否只读
    */
    readOnly: boolean;
    /**
     * 获取字段类型
     * @return 获取字段类型
     */
    /**
    * 设置字段类型
    * @param type 字段类型
    */
    type: FieldType;
    /**
     * 设置Lov的查询参数
     * @param {String} name
     * @param {Object} value
     */
    setLovPara(name: any, value: any): void;
    getValidatorProps(): ValidatorProps | undefined;
    /**
     * 校验字段值
     * 只有通过record.getField()获取的field才能校验
     * @return true | false
     */
    checkValidity(): Promise<boolean>;
    fetchLookup(): Promise<void>;
    fetchLovConfig(): Promise<void>;
    isValid(): boolean;
    getValidationMessage(): import("react").ReactNode;
    getValidityState(): Validity;
    getValidationErrorValues(): ValidationResult[];
    ready(): Promise<any>;
    private findDataSetField;
    private checkDynamicProp;
    private handlePropChange;
}
