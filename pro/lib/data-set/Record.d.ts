import DataSet from './DataSet';
import Field, { Fields } from './Field';
import DataSetSnapshot from './DataSetSnapshot';
import { RecordStatus } from './enum';
import { Supports } from '../locale-context/supports';
export default class Record {
    id: number;
    readonly key: string | number;
    dataSet?: DataSet;
    fields: Fields;
    initData?: object;
    pristineData: object;
    dataSetSnapshot: {
        [key: string]: DataSetSnapshot;
    };
    localeSupports?: Supports;
    tlsDataSet?: DataSet;
    pending?: Promise<boolean>;
    data: object;
    status: RecordStatus;
    selectable: boolean;
    isSelected: boolean;
    isCurrent: boolean;
    isCached: boolean;
    editing?: boolean;
    readonly index: number;
    readonly isIndeterminate: boolean;
    isExpanded: boolean;
    readonly previousRecord: Record | undefined;
    readonly nextRecord: Record | undefined;
    readonly children: Record[] | undefined;
    readonly parent: Record | undefined;
    readonly level: number;
    readonly dirty: boolean;
    readonly cascadeParent: Record | undefined;
    constructor(data?: object, dataSet?: DataSet);
    toData(): object;
    toJSONData(noCascade?: boolean): object & {
        __dirty: any;
        __id: any;
        __status: any;
    };
    validate(all?: boolean, noCascade?: boolean): Promise<boolean>;
    getField(fieldName?: string): Field | undefined;
    getCascadeRecords(fieldName?: string): Record[] | undefined;
    get(fieldName?: string): any;
    getPristineValue(fieldName?: string): any;
    set(item: string | object, value: any): Record;
    clone(): Record;
    ready(): Promise<any>;
    mergeLocaleData(record: any): void;
    tls(name?: string): Promise<any>;
    reset(): Record;
    commit(data?: object, dataSet?: DataSet): Record;
    private initFields;
    private addField;
    private processData;
    private normalizeData;
    private normalizeTls;
    private normalizeCascadeData;
}