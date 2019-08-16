import { isValidElement } from 'react';
import isString from 'lodash/isString';
export function normalizeProps(props) {
    if (isString(props) || isValidElement(props)) {
        return {
            children: props
        };
    }
    return props;
}