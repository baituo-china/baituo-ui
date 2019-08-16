import { Component } from 'react';
import { UploadProps } from './interface';
export declare type DraggerProps = UploadProps & {
    height?: number;
};
export default class Dragger extends Component<DraggerProps, any> {
    render(): JSX.Element;
}
