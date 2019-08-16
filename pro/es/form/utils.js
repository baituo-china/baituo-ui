import isNumber from 'lodash/isNumber';
export var defaultLabelWidth = 100;
export var defaultLabelLayout = "horizontal" /* horizontal */;
export var defaultColumns = 1;
export var FIELD_SUFFIX = 'field';
export function normalizeLabelWidth(labelWidth, columns) {
    if (isNumber(labelWidth)) {
        return new Array(columns).fill(labelWidth);
    }
    var labelWidths = new Array(columns).fill(defaultLabelWidth);
    labelWidth.slice(0, columns).forEach(function (width, index) {
        return labelWidths[index] = width;
    });
    return labelWidths;
}
export function getProperty(props, key, dataSet, record) {
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