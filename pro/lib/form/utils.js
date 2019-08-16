'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FIELD_SUFFIX = exports.defaultColumns = exports.defaultLabelLayout = exports.defaultLabelWidth = undefined;
exports.normalizeLabelWidth = normalizeLabelWidth;
exports.getProperty = getProperty;

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var defaultLabelWidth = exports.defaultLabelWidth = 100;
var defaultLabelLayout = exports.defaultLabelLayout = "horizontal" /* horizontal */;
var defaultColumns = exports.defaultColumns = 1;
var FIELD_SUFFIX = exports.FIELD_SUFFIX = 'field';
function normalizeLabelWidth(labelWidth, columns) {
    if ((0, _isNumber2['default'])(labelWidth)) {
        return new Array(columns).fill(labelWidth);
    }
    var labelWidths = new Array(columns).fill(defaultLabelWidth);
    labelWidth.slice(0, columns).forEach(function (width, index) {
        return labelWidths[index] = width;
    });
    return labelWidths;
}
function getProperty(props, key, dataSet, record) {
    if (props[key]) {
        return props[key];
    }
    var name = props.name,
        dataIndex = props.dataIndex;

    record = record || dataSet && (dataIndex === void 0 ? dataSet.current : dataSet.get(dataIndex));
    var field = record ? record.getField(name) : dataSet && dataSet.getField(name);
    if (field) {
        var fieldProperty = field.get(key);
        if (fieldProperty) {
            return fieldProperty;
        }
    }
}