/// <reference types="react" />
import { ProgressProps as C7NProgressProps } from '../../../lib/progress';
import DataSet from '../data-set/DataSet';
import { FormField } from '../field/FormField';
export interface ProgressProps extends C7NProgressProps {
    dataSet?: DataSet;
    name?: string;
}
export default class Progress extends FormField<ProgressProps> {
    static displayName: string;
    getValue(): number | undefined;
    render(): JSX.Element;
}
