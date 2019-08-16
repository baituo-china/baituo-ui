import React, { CSSProperties, KeyboardEventHandler, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Moment, MomentInput } from 'moment';
import TriggerField, { TriggerFieldProps } from '../trigger-field/TriggerField';
import DaysView from './DaysView';
import { ValidationMessages } from '../validator/Validator';
import { ViewMode } from './enum';
import { FieldType } from '../data-set/enum';
export declare type RenderFunction = (props: object, text: string, currentDate: Moment, selected: Moment) => ReactNode;
export interface DatePickerProps extends TriggerFieldProps {
    /**
     * 日期格式，如 `YYYY-MM-DD HH:mm:ss`
     */
    format?: string;
    /**
     * 显示模式date|dateTime|time|year|month|week
     */
    mode?: ViewMode;
    /**
     * 单元格渲染
     */
    cellRenderer?: (mode: ViewMode) => RenderFunction | undefined;
    filter?: (currentDate: Moment, selected: Moment) => boolean;
    min?: MomentInput;
    max?: MomentInput;
}
export interface DatePickerKeyboardEvent {
    handleKeyDownRight: KeyboardEventHandler<any>;
    handleKeyDownLeft: KeyboardEventHandler<any>;
    handleKeyDownDown: KeyboardEventHandler<any>;
    handleKeyDownUp: KeyboardEventHandler<any>;
    handleKeyDownEnd: KeyboardEventHandler<any>;
    handleKeyDownHome: KeyboardEventHandler<any>;
    handleKeyDownPageUp: KeyboardEventHandler<any>;
    handleKeyDownPageDown: KeyboardEventHandler<any>;
    handleKeyDownEnter: KeyboardEventHandler<any>;
}
export default class DatePicker extends TriggerField<DatePickerProps> implements DatePickerKeyboardEvent {
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
        popupContent: PropTypes.Requireable<PropTypes.ReactElementLike>;
        popupCls: PropTypes.Requireable<string>;
        popupStyle: PropTypes.Requireable<object>;
        trigger: PropTypes.Requireable<any>;
        triggerShowDelay: PropTypes.Requireable<number>;
        triggerHiddenDelay: PropTypes.Requireable<number>;
        /**
         * 日期格式，如 `YYYY-MM-DD HH:mm:ss`
         */
        format: PropTypes.Requireable<string>;
        /**
         * 显示模式date|dateTime|time|year|month|week
         */
        mode: PropTypes.Requireable<string>;
        /**
         * 单元格渲染
         */
        cellRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 日期过滤
         */
        filter: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * 最小日期
         */
        min: PropTypes.Requireable<any>;
        /**
         * 最大日期
         */
        max: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        suffixCls: string;
        mode: ViewMode;
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
    readonly defaultValidationMessages: ValidationMessages | null;
    readonly editable: boolean;
    readonly min: Moment | undefined;
    readonly max: Moment | undefined;
    view: DatePickerKeyboardEvent | null;
    selectedDate?: Moment;
    mode?: ViewMode;
    getOtherProps(): Pick<Pick<Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getDefaultViewMode(): ViewMode.time | ViewMode.dateTime | ViewMode.week | ViewMode.date | ViewMode.date | ViewMode.month | ViewMode.year;
    getEditor(): ReactNode;
    getPopupContent(): React.ComponentElement<any, DaysView>;
    getCellRenderer(mode: ViewMode): RenderFunction | undefined;
    getTriggerIconFont(): string;
    getFieldType(): FieldType;
    getViewMode(): ViewMode;
    getValue(): any;
    getSelectedDate(): Moment;
    getLimit(type: string): any;
    getPopupStyleFromAlign(): CSSProperties | undefined;
    handleSelectedDateChange(selectedDate: Moment, mode?: ViewMode): void;
    handelViewModeChange(mode: ViewMode): void;
    handlePopupAnimateAppear(): void;
    handlePopupAnimateEnd(key: any, exists: any): void;
    handleSelect(date: Moment): void;
    handleKeyDown(e: any): void;
    handleKeyDownHome(): void;
    handleKeyDownEnd(): void;
    handleKeyDownLeft(): void;
    handleKeyDownRight(): void;
    handleKeyDownUp(): void;
    handleKeyDownDown(): void;
    handleKeyDownPageUp(e: any): void;
    handleKeyDownPageDown(e: any): void;
    handleKeyDownEnter(): void;
    handleKeyDownEsc(e: any): void;
    handleKeyDownTab(): void;
    handleKeyDownSpace(e: any): void;
    changeSelectedDate(selectedDate: Moment): void;
    choose(date: Moment): void;
    getValidDate(date: Moment): Moment;
    isUnderRange(date: Moment, mode?: ViewMode): boolean;
    isValidDate(currentDate: Moment, selected: Moment): boolean;
}
