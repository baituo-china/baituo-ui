import React from 'react';
import CheckBox from '../check-box/CheckBox';
import { formatCurrency, formatNumber } from '../number-field/utils';
export default function processFieldValue(value, field, lang, showValueIfNotFound) {
    var type = field.type;

    if (type === "boolean" /* boolean */) {
            return React.createElement(CheckBox, { disabled: true, checked: value === field.get("trueValue" /* trueValue */) });
        } else if (type === "number" /* number */) {
            return formatNumber(value, lang);
        } else if (type === "currency" /* currency */) {
            return formatCurrency(value, lang, {
                currency: this.getProp('currency')
            });
        }
    return field.getText(value, showValueIfNotFound);
}