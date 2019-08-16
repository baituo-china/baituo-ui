import { ColumnProps } from './Column';
export declare class ColumnGroup {
    column: ColumnProps;
    children?: ColumnGroups;
    parent: ColumnGroups;
    readonly rowSpan: number;
    readonly colSpan: number;
    readonly deep: number;
    readonly hidden: boolean;
    readonly lastLeaf: ColumnProps;
    constructor(column: ColumnProps, parent: ColumnGroups);
}
export default class ColumnGroups {
    columns: ColumnGroup[];
    readonly wide: number;
    readonly deep: number;
    readonly hidden: boolean;
    readonly lastLeaf: ColumnProps;
    constructor(columns: ColumnProps[]);
}
