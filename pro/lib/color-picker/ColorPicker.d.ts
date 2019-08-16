import { CSSProperties, ReactNode } from 'react';
import TriggerField, { TriggerFieldProps } from '../trigger-field/TriggerField';
import EventManager from '../_util/EventManager';
import { FieldType } from '../data-set/enum';
import { ValidationMessages } from '../validator/Validator';
export interface ColorPickerProps extends TriggerFieldProps {
}
export default class ColorPicker extends TriggerField<ColorPickerProps> {
    static displayName: string;
    static defaultProps: {
        suffixCls: string;
        clearButton: boolean;
        trigger: string[];
        triggerShowDelay: number;
        triggerHiddenDelay: number;
        autoComplete: string;
        multiple: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    gradient: HTMLDivElement | null;
    selectPointer: HTMLDivElement | null;
    eventManager: EventManager;
    hue: HTMLDivElement | null;
    huePointer: HTMLDivElement | null;
    opacity: HTMLDivElement | null;
    opacityPointer: HTMLDivElement | null;
    HSV: {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    hueColor?: string;
    readonly defaultValidationMessages: ValidationMessages | null;
    saveGradientRef: (node: any) => any;
    saveSelectPointerRef: (node: any) => any;
    saveHuePointerRef: (node: any) => any;
    saveHueRef: (node: any) => any;
    saveOpacityRef: (node: any) => any;
    saveOpacityPointerRef: (node: any) => any;
    componentDidUpdate(): void;
    syncValueOnBlur(value: any): void;
    getFieldType(): FieldType;
    getValue(): any;
    getPrefix(): ReactNode;
    getPopupFooter(): JSX.Element;
    getPopupContent(): JSX.Element;
    setHSV(h: any, s: any, v: any, a: any): void;
    setHueColor(color: any): void;
    setColor(color: any): void;
    positionToHSV(left: any, top: any, width: any, height: any): {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    rgbToHEX(r: any, g: any, b: any, a: any): string;
    hexToRGB(hex: any): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    rgbToHSV(r: any, g: any, b: any, a: any): {
        h: any;
        s: any;
        v: number;
        a: any;
    };
    hsvToRGB(h: any, s: any, v: any, a: any): any;
    setGradientPointer(x: any, y: any, pointer: any, wrap: any, isClient: boolean): {
        left: any;
        top: any;
    };
    handleGPClick(e: any): void;
    setHuePointer(x: any, pointer: any, wrap: any, isClient: any): {
        left: any;
        wrapW: number;
    };
    handleHueClick(e: any): void;
    handleGPMouseDown(): void;
    onGPMouseUp(): void;
    handleHPMouseDown(): void;
    onHPMouseUp(): void;
    handlePopupAnimateAppear(): void;
    handlePopupAnimateEnd(): void;
    getPopupStyleFromAlign(): CSSProperties | undefined;
    getTriggerIconFont(): string;
}
