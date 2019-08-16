import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { createElement, Fragment, isValidElement } from 'react';
import format from 'string-template';
import isString from 'lodash/isString';
import flatMap from 'lodash/flatMap';
export default function formatReactTemplate(template, map) {
    var result = [template];
    Object.keys(map).forEach(function (key) {
        var node = map[key];
        if (node) {
            result = flatMap(result, function (text) {
                if (isString(text)) {
                    var stringText = text;
                    if (isValidElement(node)) {
                        var placeholder = '{' + key + '}';
                        var length = placeholder.length;

                        var textArr = [];
                        var index = stringText.indexOf(placeholder);
                        while (index > -1) {
                            if (index > 0) {
                                textArr.push(stringText.slice(0, index));
                            }
                            textArr.push(node);
                            stringText = stringText.slice(index + length);
                            index = stringText.indexOf(placeholder);
                        }
                        if (stringText) {
                            textArr.push(stringText);
                        }
                        return textArr;
                    } else {
                        return format(text, _defineProperty({}, key, node));
                    }
                }
                return text;
            });
        }
    });
    if (result.every(isString)) {
        return result.join('');
    }
    return createElement.apply(undefined, [Fragment, {}].concat(_toConsumableArray(result)));
}