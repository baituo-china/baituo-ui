import { TextField, TextFieldProps } from '../text-field/TextField';
import { ValidationMessages } from '../validator/Validator';
import { FieldType } from '../data-set/enum';
export interface EmailFieldProps extends TextFieldProps {
}
export default class EmailField extends TextField<EmailFieldProps> {
    static displayName: string;
    type: string;
    getFieldType(): FieldType;
    readonly defaultValidationMessages: ValidationMessages | null;
}
