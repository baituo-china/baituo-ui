import { TextField, TextFieldProps } from '../text-field/TextField';
import { ValidationMessages } from '../validator/Validator';
import { FieldType } from '../data-set/enum';
export interface UrlFieldProps extends TextFieldProps {
}
export default class UrlField extends TextField<UrlFieldProps> {
    static displayName: string;
    type: string;
    readonly defaultValidationMessages: ValidationMessages | null;
    getFieldType(): FieldType;
}
