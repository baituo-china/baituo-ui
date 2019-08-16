import { NumberField, NumberFieldProps } from '../number-field/NumberField';
import { FieldType } from '../data-set/enum';
import { formatCurrency } from '../number-field/utils';
export interface CurrencyProps extends NumberFieldProps {
    currency?: string;
}
export default class Currency extends NumberField<CurrencyProps> {
    static displayName: string;
    static format: typeof formatCurrency;
    getFieldType(): FieldType;
    getFormatter(): typeof formatCurrency;
    getFormatOptions(): Intl.NumberFormatOptions | undefined;
}
