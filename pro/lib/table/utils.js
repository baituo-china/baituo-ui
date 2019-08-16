'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEditorByField = getEditorByField;
exports.getAlignByField = getAlignByField;
exports.getEditorByColumnAndRecord = getEditorByColumnAndRecord;
exports.isRadio = isRadio;
exports.findCell = findCell;
exports.findFirstFocusableElement = findFirstFocusableElement;
exports.findIndexedSibling = findIndexedSibling;
exports.isDisabledRow = isDisabledRow;
exports.getHeader = getHeader;
exports.getColumnKey = getColumnKey;
exports.getPaginationPosition = getPaginationPosition;
exports.getHeight = getHeight;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _CheckBox = require('../check-box/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _Switch = require('../switch/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Radio = require('../radio/Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Select = require('../select/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Lov = require('../lov/Lov');

var _Lov2 = _interopRequireDefault(_Lov);

var _NumberField = require('../number-field/NumberField');

var _NumberField2 = _interopRequireDefault(_NumberField);

var _Currency = require('../currency/Currency');

var _Currency2 = _interopRequireDefault(_Currency);

var _DatePicker = require('../date-picker/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _DateTimePicker = require('../date-time-picker/DateTimePicker');

var _DateTimePicker2 = _interopRequireDefault(_DateTimePicker);

var _WeekPicker = require('../week-picker/WeekPicker');

var _WeekPicker2 = _interopRequireDefault(_WeekPicker);

var _MonthPicker = require('../month-picker/MonthPicker');

var _MonthPicker2 = _interopRequireDefault(_MonthPicker);

var _YearPicker = require('../year-picker/YearPicker');

var _YearPicker2 = _interopRequireDefault(_YearPicker);

var _TextField = require('../text-field/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _IntlField = require('../intl-field/IntlField');

var _IntlField2 = _interopRequireDefault(_IntlField);

var _UrlField = require('../url-field/UrlField');

var _UrlField2 = _interopRequireDefault(_UrlField);

var _EmailField = require('../email-field/EmailField');

var _EmailField2 = _interopRequireDefault(_EmailField);

var _ColorPicker = require('../color-picker/ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getEditorByField(field) {
    var lookupCode = field.get('lookupCode');
    var lookupUrl = field.get('lookupUrl');
    var lovCode = field.get('lovCode');
    var type = field.type,
        name = field.name;

    if (lookupCode || (0, _isString2['default'])(lookupUrl) || lovCode && type !== "object" /* object */ || field.getOptions()) {
        return _react2['default'].createElement(_Select2['default'], null);
    }
    if (lovCode) {
        return _react2['default'].createElement(_Lov2['default'], null);
    }
    switch (type) {
        case "boolean" /* boolean */:
            return _react2['default'].createElement(_CheckBox2['default'], null);
        case "number" /* number */:
            return _react2['default'].createElement(_NumberField2['default'], null);
        case "currency" /* currency */:
            return _react2['default'].createElement(_Currency2['default'], null);
        case "date" /* date */:
            return _react2['default'].createElement(_DatePicker2['default'], null);
        case "dateTime" /* dateTime */:
            return _react2['default'].createElement(_DateTimePicker2['default'], null);
        case "week" /* week */:
            return _react2['default'].createElement(_WeekPicker2['default'], null);
        case "month" /* month */:
            return _react2['default'].createElement(_MonthPicker2['default'], null);
        case "year" /* year */:
            return _react2['default'].createElement(_YearPicker2['default'], null);
        case "intl" /* intl */:
            return _react2['default'].createElement(_IntlField2['default'], null);
        case "email" /* email */:
            return _react2['default'].createElement(_EmailField2['default'], null);
        case "url" /* url */:
            return _react2['default'].createElement(_UrlField2['default'], null);
        case "color" /* color */:
            return _react2['default'].createElement(_ColorPicker2['default'], null);
        case "string" /* string */:
            return _react2['default'].createElement(_TextField2['default'], null);
        default:
            (0, _warning2['default'])(false, 'Table auto editor: No editor exists on the field<' + name + '>\'s type<' + type + '>, so use the TextField as default editor');
            return _react2['default'].createElement(_TextField2['default'], null);
    }
}
function getAlignByField(field) {
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
function getEditorByColumnAndRecord(column, record) {
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
        } else if ((0, _react.isValidElement)(editor)) {
            return editor;
        }
    }
}
function isRadio(element) {
    if (element) {
        switch (element.type) {
            case _CheckBox2['default']:
            case _Radio2['default']:
            case _Switch2['default']:
                return true;
            default:
        }
    }
    return false;
}
function findCell(tableStore, prefixCls, name, lock) {
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
function findFirstFocusableElement(node) {
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
function findIndexedSibling(element, direction) {
    var sibling = direction > 0 ? element.nextElementSibling : element.previousElementSibling;
    if (!sibling || 'index' in sibling.dataset) {
        return sibling;
    }
    return findIndexedSibling(sibling, direction);
}
function isDisabledRow(record) {
    return record.isCached;
}
function getHeader(column, dataSet) {
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
function getColumnKey(_ref) {
    var name = _ref.name,
        key = _ref.key;

    return key || name;
}
function getPaginationPosition(pagination) {
    if (pagination) {
        var position = pagination.position;

        if (position) {
            return position;
        }
    }
    return "bottom" /* bottom */;
}
function getHeight(el) {
    return el.getBoundingClientRect().height;
}