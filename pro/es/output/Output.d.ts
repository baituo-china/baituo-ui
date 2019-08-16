import { ReactNode } from 'react';
import { FormField, FormFieldProps } from '../field/FormField';
export interface OutputProps extends FormFieldProps {
}
export default class Output extends FormField<OutputProps> {
    static displayName: string;
    static defaultProps: {
        suffixCls: string;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    readonly editable: boolean;
    handleChange(): void;
    getOtherProps(): Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getText(): ReactNode;
    processValue(value: any): any;
    getRenderedValue(): ReactNode;
    renderWrapper(): ReactNode;
}
