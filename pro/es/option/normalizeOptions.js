import _defineProperty from 'babel-runtime/helpers/defineProperty';
import DataSet from '../data-set/DataSet';
import { Children, isValidElement } from 'react';
import OptGroup from './OptGroup';
import Option from './Option';
import lookupStore from '../stores/LookupCodeStore';
export default function normalizeOptions(_ref) {
    var field = _ref.field,
        textField = _ref.textField,
        valueField = _ref.valueField,
        multiple = _ref.multiple,
        children = _ref.children;

    var selectionType = multiple ? "multiple" /* multiple */ : multiple === void 0 ? void 0 : "single" /* single */;
    var data = [];
    var fetch = void 0;
    if (field) {
        var options = field.getOptions();
        if (options) {
            return options;
        } else {
            var axiosConfig = lookupStore.getAxiosConfig(field);
            var lookupKey = lookupStore.getKey(axiosConfig);
            if (lookupKey) {
                data = lookupStore.get(lookupKey);
                if (!data) {
                    fetch = lookupStore.fetchLookupData(axiosConfig);
                }
            }
        }
    }
    var fields = [{
        name: textField,
        type: "reactNode" /* reactNode */
    }, {
        name: valueField
    }];
    if ((!data || !data.length) && children) {
        data = [];
        getOptionsFromChildren(children, data, fields, textField, valueField);
    }
    var ds = new DataSet({
        data: data,
        fields: fields,
        paging: false,
        selection: selectionType || "single" /* single */
        , autoLocateFirst: false
    });
    if (fetch) {
        fetch.then(function (values) {
            return values && ds.loadData(values);
        });
    }
    return ds;
}
function getOptionsFromChildren(elements, data, fields, textField, valueField) {
    var groups = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

    if (elements) {
        Children.forEach(elements, function (child) {
            if (isValidElement(child)) {
                var type = child.type;

                if (type === OptGroup) {
                    var props = child.props;
                    getOptionsFromChildren(props.children, data, fields, textField, valueField, groups.concat(props.label || ''));
                } else if (type === Option) {
                    var _groups$reduce;

                    var _child$props = child.props,
                        value = _child$props.value,
                        children = _child$props.children;

                    data.push(groups.reduce(function (obj, group, index) {
                        var name = 'group-' + index;
                        obj[name] = group;
                        if (!fields.find(function (field) {
                            return field.name === name;
                        })) {
                            fields.push({
                                name: name,
                                type: "reactNode" /* reactNode */
                                , group: groups.length - 1
                            });
                        }
                        return obj;
                    }, (_groups$reduce = {}, _defineProperty(_groups$reduce, textField, children), _defineProperty(_groups$reduce, valueField, value === void 0 ? children : value), _groups$reduce)));
                }
            }
        });
    }
}