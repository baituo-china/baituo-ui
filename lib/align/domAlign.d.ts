declare type overflowType = {
    adjustX?: boolean;
    adjustY?: boolean;
};
export default function (el: any, refNode: any, align: any): {
    points: any;
    offset: any;
    targetOffset: any;
    overflow: overflowType;
};
export {};
