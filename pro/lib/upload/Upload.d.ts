import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { FormField, FormFieldProps } from '../field/FormField';
import { UploadFile } from './interface';
export interface UploadProps extends FormFieldProps {
    /**
     *  可接受的上传文件类型
     */
    accept?: string[];
    /**
     * 上传文件路径
     */
    action: string;
    /**
     * 上传所需参数或者返回上传参数的方法
     */
    data?: object | Function;
    /**
     * 设置上传的请求头部
     */
    headers?: any;
    /**
     * 是否支持多选文件
     */
    multiple?: boolean;
    /**
     * 是否在选择文件后立即上传
     *
     * @type {boolean}
     * @memberof UploadProps
     */
    uploadImmediately?: boolean;
    /**
     * 组件右上角的帮助信息
     *
     * @type {ReactNode}
     * @memberof UploadProps
     */
    extra?: ReactNode;
    /**
     * input元素内已选择文件变化的回调
     *
     * @memberof UploadProps
     */
    onFileChange?: (fileList: UploadFile[]) => void;
    /**
     * 上传进度变化的回调
     *
     * @memberof UploadProps
     */
    onUploadProgress?: (percent: number, file: UploadFile) => void;
    /**
     * 上传成功的回调
     *
     * @memberof UploadProps
     */
    onUploadSuccess?: (response: any, file: UploadFile) => void;
    /**
     * 上传出错的回调
     *
     * @memberof UploadProps
     */
    onUploadError?: (error: Error, response: any, file: UploadFile) => void;
    /**
     * 文件上传队列的最大长度，0表示不限制
     *
     * @type {number}
     * @memberof UploadProps
     */
    fileListMaxLength?: number;
    /**
     * 控制图片预览的配置对象
     *
     * @type {boolean}
     * @memberof UploadProps
     */
    showPreviewImage?: boolean;
    /**
     * 预览图片的宽度
     *
     * @type {number}
     * @memberof UploadProps
     */
    previewImageWidth?: number;
    /**
     * 是否显示上传按钮
     *
     * @type {boolean}
     * @memberof UploadProps
     */
    showUploadBtn?: boolean;
}
export default class Upload extends FormField<UploadProps> {
    static displayName: string;
    static propTypes: {
        id: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<import("../core/enum").Size>;
        suffixCls: PropTypes.Requireable<string>;
        prefixCls: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        /**
         * 保存上传的文件对象
         *
         * 若直接传递，浏览器会认为它是Mobx对象，因此有时需要手动复制并传值调用
         *
         * @type {UploadFile[]}
         * @memberof Upload
         */
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
        onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
        dataSet: PropTypes.Requireable<object>;
        type: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<any>;
        defaultValue: PropTypes.Requireable<any>;
        required: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
        form: PropTypes.Requireable<string>;
        dataIndex: PropTypes.Requireable<number>;
        multiple: PropTypes.Requireable<boolean>;
        rowSpan: PropTypes.Requireable<number>;
        colSpan: PropTypes.Requireable<number>;
        validator: PropTypes.Requireable<(...args: any[]) => any>;
        validationRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        onInvalid: PropTypes.Requireable<(...args: any[]) => any>;
        help: PropTypes.Requireable<string>;
        showHelp: PropTypes.Requireable<import("../field/enum").ShowHelp>;
        renderer: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onInput: PropTypes.Requireable<(...args: any[]) => any>;
        onEnterDown: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 可接受的上传文件类型
         * 可选值: MIME类型字符串组成的数组
         */
        accept: PropTypes.Requireable<(string | null)[]>;
        /**
         * 上传文件路径
         */
        action: PropTypes.Requireable<string>;
        /**
         * 上传所需参数或者返回上传参数的方法
         * @default
         * {}
         */
        data: PropTypes.Requireable<object>;
        /**
         * 设置上传的请求头部
         * @default
         * {}
         */
        headers: PropTypes.Requireable<object>;
        uploadImmediately: PropTypes.Requireable<boolean>;
        fileListMaxLength: PropTypes.Requireable<number>;
        showPreviewImage: PropTypes.Requireable<boolean>;
        previewImageWidth: PropTypes.Requireable<number>;
        extra: PropTypes.Requireable<any>;
        onFileChange: PropTypes.Requireable<(...args: any[]) => any>;
        onUploadProgress: PropTypes.Requireable<(...args: any[]) => any>;
        onUploadSuccess: PropTypes.Requireable<(...args: any[]) => any>;
        onUploadError: PropTypes.Requireable<(...args: any[]) => any>;
        showUploadBtn: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        suffixCls: string;
        multiple: boolean;
        headers: {};
        data: {};
        action: string;
        name: string;
        uploadImmediately: boolean;
        fileListMaxLength: number;
        showPreviewImage: boolean;
        previewImageWidth: number;
        showUploadBtn: boolean;
        onUploadSuccess: () => () => void;
        onUploadError: () => () => void;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    /**
     * 保存上传的文件对象
     *
     * 若直接传递，浏览器会认为它是Mobx对象，因此有时需要手动复制并传值调用
     *
     * @type {UploadFile[]}
     * @memberof Upload
     */
    fileList: UploadFile[];
    /**
     * 原生<input>元素的引用
     *
     * @private
     * @type {HTMLInputElement}
     * @memberof Upload
     */
    private nativeInputElement;
    constructor(props: any, context: any);
    getOtherProps(): Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    saveNativeInputElement: (elem: any) => any;
    /**
     * 传递包装按钮的点击事件
     *
     */
    handleWrapperBtnClick: () => void;
    render(): JSX.Element;
    handleUploadBtnClick: () => void;
    startUpload: () => void;
    /**
     * 处理<input type="file">元素的change事件，
     * 主要是取出事件对象中的files对象并传递给uploadFiles方法
     *
     * @param {*} e <input>元素的change事件对象
     * @memberof Upload
     */
    handleChange(e: any): void;
    /**
     * 分别上传fileList中的每个文件对象
     *
     * @param {UploadFile[]} fileList 文件对象数组
     * @returns {void}
     * @memberof Upload
     */
    uploadFiles(fileList: UploadFile[]): void;
    /**
     * 上传每个文件对象
     *
     * @param {*} file
     * @returns {void}
     * @memberof Upload
     */
    upload(file: any): void;
    /**
     * 处理上传成功的函数，根据结果设置文件对象的状态，
     * 用于在UploadList中的展示
     *
     * @param {number} status HTTP状态码
     * @param {string} response 响应对象
     * @param {UploadFile} file 文件对象
     * @returns
     */
    handleSuccess: (status: number, response: any, file: UploadFile) => void;
    /**
     * 处理上传进度变化的函数，更新文件对象中的percent值，
     * 用于在UploadList中展示
     *
     * @param {number} percent 上传百分比
     * @param {UploadFile} file 文件对象
     * @returns
     */
    handleProgress: (percent: number, file: UploadFile) => void;
    /**
     * 处理上传出错的函数，用于设置文件对象的status值，
     *
     * @param {Error} error 错误对象
     * @param {string} responseText 处理成字符串的响应对象
     * @param {UploadFile} file 文件对象
     * @returns
     */
    handleError: (error: Error, responseText: string, response: any, file: UploadFile) => void;
    handleRemove: (file: UploadFile) => void;
    /**
     * 判断文件后缀名是否合格
     * this.props.accept值为falsy时返回true，否则正常判断
     *
     * @param {UploadFile[]} fileList 文件对象数组
     * @returns {boolean}
     * @memberof Upload
     */
    isAcceptFiles(fileList: UploadFile[]): boolean;
    /**
     * 把XMLHttpRequest对象的返回信息转化为字符串
     *
     * @param {XMLHttpRequest} xhr
     * @returns {string}
     * @memberof Upload
     */
    getResponse(xhr: XMLHttpRequest): string;
    /**
     * 使用日期获取一个uid
     *
     * @param {number} index 索引
     * @returns {string}
     * @memberof Upload
     */
    getUid(index: number): string;
    /**
     * 从文件对象数组中获取一个文件对象的引用，
     * 首先尝试通过uid属性匹配文件对象，若失败则尝试name
     *
     * @param {UploadFile} file
     * @param {UploadFile[]} fileList 文件对象数组
     * @returns {UploadFile}
     * @memberof Upload
     */
    getFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile;
    /**
     * 从文件对象数组中移除一个文件对象，
     * 首先尝试通过uid属性匹配文件对象，若失败则尝试name
     *
     * @param {UploadFile} file
     * @param {UploadFile[]} fileList
     * @returns {UploadFile[]}
     * @memberof Upload
     */
    removeFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile[];
}
