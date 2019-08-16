import { ReactNode } from 'react';
import Validity from './Validity';
import ValidationResult from './ValidationResult';
import Record from '../data-set/Record';
import Form from '../form/Form';
import { methodReturn, ValidatorProps } from './rules';
export declare type CustomValidator = (value: any, name: string, record: Record | Form) => Promise<boolean | string | undefined>;
export interface ValidationMessages {
    badInput?: string;
    patternMismatch?: string;
    rangeOverflow?: ReactNode;
    rangeUnderflow?: ReactNode;
    stepMismatch?: string;
    tooLong?: string;
    tooShort?: string;
    typeMismatch?: string;
    valueMissing?: ReactNode;
    uniqueError?: string;
    unknown?: string;
}
export default class Validator {
    fieldProps: ValidatorProps;
    controlProps: ValidatorProps;
    validity: Validity;
    validedValue: any;
    injectionOptions: object;
    validationMessage?: ReactNode;
    validationErrorValues: ValidationResult[];
    readonly props: ValidatorProps;
    constructor();
    setProps(props: any): void;
    setControlProps(props: any): void;
    reset(): void;
    report(ret: methodReturn): Promise<void>;
    clearErrors(): void;
    addError(result: ValidationResult): void;
    checkValidity(value?: any): Promise<boolean>;
}
