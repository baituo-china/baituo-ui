import ValidationResult from '../ValidationResult';
import { FieldType } from '../../data-set/enum';
import DataSet from '../../data-set/DataSet';
import Record from '../../data-set/Record';
import Form from '../../form/Form';
import { CustomValidator } from '../Validator';
import { ReactNode } from 'react';
export declare type methodReturn = ValidationResult | boolean;
export declare type validationRule = (value: any, props: any) => methodReturn | PromiseLike<methodReturn>;
declare const validationRules: validationRule[];
export default validationRules;
export interface ValidatorProps {
    type?: FieldType;
    required?: boolean;
    pattern?: string | RegExp;
    min?: number;
    max?: number;
    step?: number;
    minLength?: number;
    maxLength?: number;
    dataSet?: DataSet;
    record?: Record;
    name?: string;
    unique?: boolean | string;
    label?: ReactNode;
    customValidator?: CustomValidator;
    form?: Form;
}
