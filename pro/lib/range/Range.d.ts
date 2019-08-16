import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { NumberField, NumberFieldProps } from '../number-field/NumberField';
import EventManager from '../_util/EventManager';
import { FieldType } from '../data-set/enum';
export interface RangeProps extends NumberFieldProps {
    /**
     *  是否垂直方向
     */
    vertical?: boolean;
}
export default class Range extends NumberField<RangeProps> {
    static displayName: string;
    static propTypes: {
        id: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<import("../core/enum").Size>;
        suffixCls: PropTypes.Requireable<string>;
        prefixCls: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        hidden: PropTypes.Requireable<boolean>;
        autoFocus: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        tabIndex: PropTypes.Requireable<number>;
        lang: PropTypes.Requireable<string>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseUp: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseMove: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseOver: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseOut: PropTypes.Requireable<(...args: any[]) => any>;
        onContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
        dataSet: PropTypes.Requireable<object>;
        type: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<any>;
        defaultValue: PropTypes.Requireable<any>;
        required: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
        form: PropTypes.Requireable<string>;
        dataIndex: PropTypes.Requireable<number>;
        multiple: PropTypes.Requireable<boolean>;
        rowSpan: PropTypes.Requireable<number>;
        colSpan: PropTypes.Requireable<number>;
        validator: PropTypes.Requireable<(...args: any[]) => any>;
        validationRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        onInvalid: PropTypes.Requireable<(...args: any[]) => any>;
        help: PropTypes.Requireable<string>;
        showHelp: PropTypes.Requireable<import("../field/enum").ShowHelp>;
        renderer: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onInput: PropTypes.Requireable<(...args: any[]) => any>;
        onEnterDown: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        minLength: PropTypes.Requireable<number>;
        maxLength: PropTypes.Requireable<number>;
        pattern: PropTypes.Requireable<string | object>;
        autoComplete: PropTypes.Requireable<string>;
        prefix: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        suffix: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        clearButton: PropTypes.Requireable<boolean>;
        addonBefore: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        addonAfter: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        restrict: PropTypes.Requireable<string>;
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        step: PropTypes.Requireable<number>;
        /**
         * 是否垂直方向
         * @default
         * false
         */
        vertical: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        suffixCls: string;
        min: number;
        step: number;
        max: number;
        vertical: boolean;
        autoComplete: string;
        clearButton: boolean;
        multiple: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    dragEvent: EventManager;
    track: HTMLDivElement;
    type: string;
    getFieldType(): FieldType;
    getOtherProps(): Pick<Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getValue(): any;
    getWrapperClassNames(): string;
    renderWrapper(): ReactNode;
    renderTrack(): JSX.Element;
    handleTrackClick(e: any): void;
    handleDragStart(): void;
    handleDragEnd(): void;
    handleDrag(e: any): void;
    getPercent(): string | 0;
}
