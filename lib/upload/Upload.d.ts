import React, { Component } from 'react';
import Dragger from './Dragger';
import { UploadChangeParam, UploadFile, UploadLocale, UploadProps, UploadState } from './interface';
import { T } from './utils';
export { UploadProps };
export default class Upload extends Component<UploadProps, UploadState> {
    static displayName: string;
    static Dragger: typeof Dragger;
    static defaultProps: {
        type: string;
        multiple: boolean;
        action: string;
        data: {};
        accept: string;
        beforeUpload: typeof T;
        showUploadList: boolean;
        listType: string;
        className: string;
        disabled: boolean;
        supportServerRender: boolean;
    };
    recentUploadStatus: boolean | PromiseLike<any>;
    progressTimer: any;
    private upload;
    constructor(props: UploadProps);
    componentWillUnmount(): void;
    onStart: (file: UploadFile) => void;
    autoUpdateProgress(_: any, file: UploadFile): void;
    onSuccess: (response: any, file: UploadFile) => void;
    onProgress: (e: {
        percent: number;
    }, file: UploadFile) => void;
    onError: (error: Error, response: any, file: UploadFile) => void;
    handleRemove(file: UploadFile): void;
    handleManualRemove: (file: UploadFile) => void;
    onChange: (info: UploadChangeParam) => void;
    componentWillReceiveProps(nextProps: UploadProps): void;
    onFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    beforeUpload: (file: UploadFile, fileList: UploadFile[]) => boolean | PromiseLike<any>;
    clearProgressTimer(): void;
    saveUpload: (node: any) => void;
    renderUploadList: (locale: UploadLocale) => JSX.Element;
    render(): JSX.Element;
}
