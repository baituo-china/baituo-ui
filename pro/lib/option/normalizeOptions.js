'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports['default'] = normalizeOptions;

var _DataSet = require('../data-set/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _react = require('react');

var _OptGroup = require('./OptGroup');

var _OptGroup2 = _interopRequireDefault(_OptGroup);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _LookupCodeStore = require('../stores/LookupCodeStore');

var _LookupCodeStore2 = _interopRequireDefault(_LookupCodeStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function normalizeOptions(_ref) {
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
            var axiosConfig = _LookupCodeStore2['default'].getAxiosConfig(field);
            var lookupKey = _LookupCodeStore2['default'].getKey(axiosConfig);
            if (lookupKey) {
                data = _LookupCodeStore2['default'].get(lookupKey);
                if (!data) {
                    fetch = _LookupCodeStore2['default'].fetchLookupData(axiosConfig);
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
    var ds = new _DataSet2['default']({
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
        _react.Children.forEach(elements, function (child) {
            if ((0, _react.isValidElement)(child)) {
                var type = child.type;

                if (type === _OptGroup2['default']) {
                    var props = child.props;
                    getOptionsFromChildren(props.children, data, fields, textField, valueField, groups.concat(props.label || ''));
                } else if (type === _Option2['default']) {
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
                    }, (_groups$reduce = {}, (0, _defineProperty3['default'])(_groups$reduce, textField, children), (0, _defineProperty3['default'])(_groups$reduce, valueField, value === void 0 ? children : value), _groups$reduce)));
                }
            }
        });
    }
}
module.exports = exports['default'];