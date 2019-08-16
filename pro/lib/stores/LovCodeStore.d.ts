import { ObservableMap } from 'mobx';
import { AxiosInstance } from 'axios';
import DataSet from '../data-set/DataSet';
import { LovConfig } from '../lov/Lov';
export declare class LovCodeStore {
    lovCodes: ObservableMap<string, LovConfig>;
    lovDS: ObservableMap<string, DataSet>;
    pendings: {};
    readonly axios: AxiosInstance;
    constructor();
    init(): void;
    getConfig(code: string): LovConfig | undefined;
    fetchConfig(code: string): Promise<LovConfig | undefined>;
    getLovDataSet(code: string): DataSet | undefined;
    getConfigUrl(code: string): string;
    getQueryUrl(code: string): string;
    clearCache(codes?: string[]): void;
}
declare const _default: LovCodeStore;
export default _default;
