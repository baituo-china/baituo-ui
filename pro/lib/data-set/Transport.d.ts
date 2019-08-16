import { AxiosRequestConfig } from 'axios';
import DataSet from './DataSet';
export declare type TransportAdapter = (config: AxiosRequestConfig, type: string) => AxiosRequestConfig;
export declare type TransportHook = (props: {
    data?: any;
    params?: any;
    dataSet: DataSet;
}) => AxiosRequestConfig;
export declare type TransportType = AxiosRequestConfig | TransportHook | string;
export declare type TransportProps = {
    create?: TransportType;
    read?: TransportType;
    update?: TransportType;
    destroy?: TransportType;
    validate?: TransportType;
    submit?: TransportType;
    adapter?: TransportAdapter;
};
export default class Transport {
    props: TransportProps;
    dataSet: DataSet;
    create: TransportType | undefined;
    read: TransportType | undefined;
    update: TransportType | undefined;
    destroy: TransportType | undefined;
    validate: TransportType | undefined;
    submit: TransportType | undefined;
    adapter: TransportAdapter;
    constructor(props: TransportProps | undefined, dataSet: DataSet);
}
