import React, { isValidElement } from 'react';
import isString from 'lodash/isString';
import CheckBox from '../check-box/CheckBox';
import Switch from '../switch/Switch';
import Radio from '../radio/Radio';
import Select from '../select/Select';
import Lov from '../lov/Lov';
import NumberField from '../number-field/NumberField';
import Currency from '../currency/Currency';
import DatePicker from '../date-picker/DatePicker';
import DateTimePicker from '../date-time-picker/DateTimePicker';
import WeekPicker from '../week-picker/WeekPicker';
import MonthPicker from '../month-picker/MonthPicker';
import YearPicker from '../year-picker/YearPicker';
import TextField from '../text-field/TextField';
import IntlField from '../intl-field/IntlField';
import UrlField from '../url-field/UrlField';
import EmailField from '../email-field/EmailField';
import ColorPicker from '../color-picker/ColorPicker';
import warning from '../../../es/_util/warning';
export function getEditorByField(field) {
    var lookupCode = field.get('lookupCode');
    var lookupUrl = field.get('lookupUrl');
    var lovCode = field.get('lovCode');
    var type = field.type,
        name = field.name;

    if (lookupCode || isString(lookupUrl) || lovCode && type !== "object" /* object */ || field.getOptions()) {
        return React.createElement(Select, null);
    }
    if (lovCode) {
        return React.createElement(Lov, null);
    }
    switch (type) {
        case "boolean" /* boolean */:
            return React.createElement(CheckBox, null);
        case "number" /* number */:
            return React.createElement(NumberField, null);
        case "currency" /* currency */:
            return React.createElement(Currency, null);
        case "date" /* date */:
            return React.createElement(DatePicker, null);
        case "dateTime" /* dateTime */:
            return React.createElement(DateTimePicker, null);
        case "week" /* week */:
            return React.createElement(WeekPicker, null);
        case "month" /* month */:
            return React.createElement(MonthPicker, null);
        case "year" /* year */:
            return React.createElement(YearPicker, null);
        case "intl" /* intl */:
            return React.createElement(IntlField, null);
        case "email" /* email */:
            return React.createElement(EmailField, null);
        case "url" /* url */:
            return React.createElement(UrlField, null);
        case "color" /* color */:
            return React.createElement(ColorPicker, null);
        case "string" /* string */:
            return React.createElement(TextField, null);
        default:
            warning(false, 'Table auto editor: No editor exists on the field<' + name + '>\'s type<' + type + '>, so use the TextField as default editor');
            return React.createElement(TextField, null);
    }
}
export function getAlignByField(field) {
    if (field) {
        var type = field.type;

        switch (type) {
            case "number" /* number */:
                return "right" /* right */;
            case "boolean" /* boolean */:
                return "center" /* center */;
            default:
        }
    }
}
export function getEditorByColumnAndRecord(column, record) {
    var name = column.name,
        editor = column.editor;

    if (record) {
        if (typeof editor === 'function') {
            return editor(record, name);
        } else if (editor === true) {
            var field = record.getField(name);
            if (field) {
                if (!field.get('unique') || record.status === "add" /* add */) {
                        return getEditorByField(field);
                    }
            }
        } else if (isValidElement(editor)) {
            return editor;
        }
    }
}
export function isRadio(element) {
    if (element) {
        switch (element.type) {
            case CheckBox:
            case Radio:
            case Switch:
                return true;
            default:
        }
    }
    return false;
}
export function findCell(tableStore, prefixCls, name, lock) {
    var node = tableStore.node,
        dataSet = tableStore.dataSet,
        overflowX = tableStore.overflowX,
        currentEditRecord = tableStore.currentEditRecord;

    var current = currentEditRecord || dataSet.current;
    var tableCellPrefixCls = prefixCls + '-cell';
    if (name !== void 0 && current) {
        var wrapperSelector = overflowX && lock ? '.' + prefixCls + '-fixed-' + (lock === true ? "left" /* left */ : lock) + ' ' : '';
        var selector = wrapperSelector + 'tr[data-index="' + current.id + '"] td[data-index="' + name + '"] span.' + tableCellPrefixCls + '-inner';
        return node.element.querySelector(selector);
    }
}
export function findFirstFocusableElement(node) {
    if (node && node.children) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;

                if (child.tabIndex > -1) {
                    return child;
                } else {
                    return findFirstFocusableElement(child);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}
export function findIndexedSibling(element, direction) {
    var sibling = direction > 0 ? element.nextElementSibling : element.previousElementSibling;
    if (!sibling || 'index' in sibling.dataset) {
        return sibling;
    }
    return findIndexedSibling(sibling, direction);
}
export function isDisabledRow(record) {
    return record.isCached;
}
export function getHeader(column, dataSet) {
    var header = column.header,
        name = column.name;

    if (typeof header === 'function') {
        return header(dataSet, name);
    }
    if (header !== void 0) {
        return header;
    }
    var field = dataSet.getField(name);
    if (field) {
        return field.get('label');
    }
}
export function getColumnKey(_ref) {
    var name = _ref.name,
        key = _ref.key;

    return key || name;
}
export function getPaginationPosition(pagination) {
    if (pagination) {
        var position = pagination.position;

        if (position) {
            return position;
        }
    }
    return "bottom" /* bottom */;
}
export function getHeight(el) {
    return el.getBoundingClientRect().height;
}