import { Children, isValidElement } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
function isElementEqual(el, other) {
    if (el === other) {
        return true;
    }
    return isValidElement(el) && isValidElement(other) && el.type === other.type && isEqual(omit(el.props, 'children'), omit(other.props, 'children')) && isChildrenEqual(el.props.children, other.props.children);
}
export default function isChildrenEqual(value, other) {
    if (!value && !other) {
        return true;
    }
    var valueArray = Children.toArray(value);
    var otherArray = Children.toArray(other);
    if (valueArray.length !== otherArray.length) {
        return false;
    }
    return valueArray.every(function (child, index) {
        return isElementEqual(child, otherArray[index]);
    });
}