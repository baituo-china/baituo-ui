export declare const rcPlacements: {
    left: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    right: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    top: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    bottom: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    topLeft: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    leftTop: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    topRight: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    rightTop: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    bottomRight: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    rightBottom: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    bottomLeft: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
    leftBottom: {
        points: string[];
        overflow: {
            adjustX: number;
            adjustY: number;
        };
        offset: number[];
        targetOffset: number[];
    };
};
export interface AdjustOverflow {
    adjustX?: 0 | 1;
    adjustY?: 0 | 1;
}
export interface PlacementsConfig {
    arrowWidth?: number;
    horizontalArrowShift?: number;
    verticalArrowShift?: number;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: any;
}
export declare function getOverflowOptions(autoAdjustOverflow: any): any;
export default function getPlacements(config?: PlacementsConfig): any;
