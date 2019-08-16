import { ObservableMap } from 'mobx';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import Field from '../data-set/Field';
export declare type responseData = object[];
export declare type responseType = responseData | undefined;
export declare class LookupCodeStore {
    lookupCodes: ObservableMap<string, responseData>;
    pendings: {
        [key: string]: Promise<responseType>;
    };
    readonly axios: AxiosInstance;
    constructor();
    init(): void;
    get(lookupKey: string): responseData | undefined;
    set(lookupKey: string, data: responseData | undefined): void;
    getByValue(lookupKey: string, value: any, valueField: string): object | undefined;
    getText(lookupKey: string, value: any, valueField: string, textField: string): string | undefined;
    fetchLookupData(key: AxiosRequestConfig | string, axiosConfig?: AxiosRequestConfig): Promise<responseData | undefined>;
    getAxiosConfig(field: Field): AxiosRequestConfig;
    getKey(field: Field | AxiosRequestConfig): string | undefined;
    getUrl(field: Field): string | undefined;
    clearCache(codes?: string[]): void;
}
declare const _default: LookupCodeStore;
export default _default;
