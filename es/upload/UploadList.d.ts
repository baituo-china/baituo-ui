import React, { Component } from 'react';
import { UploadFile, UploadListProps } from './interface';
export default class UploadList extends Component<UploadListProps, any> {
    static displayName: string;
    static defaultProps: {
        listType: string;
        progressAttr: {
            strokeWidth: number;
            showInfo: boolean;
        };
        showRemoveIcon: boolean;
        showPreviewIcon: boolean;
    };
    handleClose: (file: UploadFile) => void;
    handlePreview: (file: UploadFile, e: React.SyntheticEvent<HTMLElement, Event>) => void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
