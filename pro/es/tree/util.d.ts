import { ReactNode } from 'react';
import Record from '../data-set/Record';
import DataSet from '../data-set/DataSet';
export declare type NodeRenderer = (props: {
    record?: Record | null;
    dataSet?: DataSet | null;
    text?: string;
}) => ReactNode;
export declare function getTreeNodes(dataSet: DataSet, records: Record[] | undefined, forceRenderKeys: string[], renderer: NodeRenderer, titleField?: string): any;
export declare function getKey(record: any, idField: any): string;
