import DataSet from '../data-set/DataSet';
import Record from '../data-set/Record';
import { LabelLayout } from './enum';
export declare const defaultLabelWidth: number;
export declare const defaultLabelLayout: LabelLayout;
export declare const defaultColumns: number;
export declare const FIELD_SUFFIX = "field";
export declare function normalizeLabelWidth(labelWidth: any, columns: any): any[];
export declare function getProperty(props: any, key: string, dataSet?: DataSet, record?: Record): string | undefined;
