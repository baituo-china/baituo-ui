import DataSet from './DataSet';
import Record from './Record';
export default class DataSetSnapshot {
    data: Record[];
    originalData: Record[];
    destroyed: Record[];
    cachedSelected: Record[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    constructor({ data, originalData, totalCount, currentPage, pageSize, destroyed, cachedSelected }: DataSet);
}
