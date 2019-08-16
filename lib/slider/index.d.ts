import { Component, CSSProperties, ReactElement, ReactNode } from 'react';
export interface SliderMarks {
    [key: number]: ReactNode | {
        style: CSSProperties;
        label: ReactNode;
    };
}
export declare type SliderValue = number | [number, number];
export declare type HandleGeneratorFn = (info: {
    value: number;
    dragging: boolean;
    index: number;
    rest: any[];
}) => ReactElement<any>;
export interface SliderProps {
    prefixCls?: string;
    tooltipPrefixCls?: string;
    range?: boolean;
    min?: number;
    max?: number;
    step?: number | null;
    marks?: SliderMarks;
    dots?: boolean;
    value?: SliderValue;
    defaultValue?: SliderValue;
    included?: boolean;
    disabled?: boolean;
    vertical?: boolean;
    onChange?: (value: SliderValue) => void;
    onAfterChange?: (value: SliderValue) => void;
    tipFormatter?: null | ((value: number) => ReactNode);
    className?: string;
    id?: string;
}
export interface SliderState {
    visibles: {
        [index: number]: boolean;
    };
}
export default class Slider extends Component<SliderProps, SliderState> {
    static displayName: string;
    static defaultProps: {
        tipFormatter(value: number): string;
    };
    private rcSlider;
    constructor(props: SliderProps);
    toggleTooltipVisible: (index: number, visible: boolean) => void;
    handleWithTooltip: HandleGeneratorFn;
    focus(): void;
    blur(): void;
    saveSlider: (node: any) => void;
    render(): JSX.Element;
}
