import { CSSProperties, ReactElement, ReactNode } from 'react';
import Field from '../data-set/Field';
import { TextField, TextFieldProps } from '../text-field/TextField';
import DataSet from '../data-set/DataSet';
import Record from '../data-set/Record';
import { FormFieldProps, RenderProps } from '../field/FormField';
import { SelectProps } from '../select/Select';
import { OptionProps } from '../option/Option';
export interface FilterSelectProps extends TextFieldProps {
    paramName?: string;
    optionDataSet: DataSet;
    dropdownMenuStyle?: CSSProperties;
}
export default class FilterSelect extends TextField<FilterSelectProps> {
    static defaultProps: {
        optionDataSet: typeof DataSet;
        multiple: boolean;
        clearButton: boolean;
        prefix: JSX.Element;
        dropdownMenuStyle: {
            minWidth: string | undefined;
        };
        suffixCls: string;
        autoComplete: string;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    selectField?: Field;
    filterText?: string;
    private setFilterText;
    componentWillUnmount(): void;
    setText(text: any): void;
    getPlaceholder(): string | undefined;
    getOtherProps(): Pick<Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getRootDomNode(): any;
    defaultRenderer({ value, repeat }: RenderProps): any;
    getQueryRecord(): Record | undefined;
    getQueryField(fieldName: any): Field | undefined;
    addQueryParams(value: any): void;
    afterRemoveValue(value: any, repeat: number): void;
    getQueryFieldMultiple(value: any): boolean;
    handleFieldChange(value: any, oldValue: any): void;
    handleInput(e: any): void;
    handleFieldEnterDown(): void;
    handleKeyDown(e: any): void;
    handleEnterDown(): void;
    setSelectField(value: any): void;
    getQueryValues(fieldName: any): never[];
    syncValueOnBlur(): void;
    setQueryValue(fieldName: string, value: any): void;
    getFieldLabel(field: Field): ReactNode;
    multipleFieldExistsValue(field: Field, current?: Record): boolean;
    getInputFilterOptions(filterText: string): ReactElement<OptionProps>[];
    getFieldSelectOptions(): ReactElement<OptionProps>[];
    getFieldEditor(props: any, selectField: Field): ReactElement<FormFieldProps>;
    getFieldSelect(props: any): ReactElement<SelectProps>;
    clear(): void;
    renderMultipleEditor(props: FilterSelectProps): JSX.Element;
}
