'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.flatArray = flatArray;
exports.treeMap = treeMap;
exports.flatFilter = flatFilter;
exports.normalizeColumns = normalizeColumns;
exports.getLeafColumns = getLeafColumns;
exports.findColumnByFilterValue = findColumnByFilterValue;
exports.filterByInputValue = filterByInputValue;
exports.removeHiddenColumns = removeHiddenColumns;
exports.getColumnKey = getColumnKey;

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function flatArray() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var childrenName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';

    var result = [];
    var loop = function loop(array) {
        array.forEach(function (item) {
            if (item[childrenName]) {
                var newItem = (0, _extends3['default'])({}, item);
                delete newItem[childrenName];
                result.push(newItem);
                if (item[childrenName].length > 0) {
                    loop(item[childrenName]);
                }
            } else {
                result.push(item);
            }
        });
    };
    loop(data);
    return result;
}
function treeMap(tree, mapper) {
    var childrenName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

    return tree.map(function (node, index) {
        var extra = {};
        if (node[childrenName]) {
            extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
        }
        return (0, _extends3['default'])({}, mapper(node, index), extra);
    });
}
function flatFilter(tree, callback) {
    return tree.reduce(function (acc, node) {
        if (callback(node)) {
            acc.push(node);
        }
        if (node.children) {
            var children = flatFilter(node.children, callback);
            acc.push.apply(acc, (0, _toConsumableArray3['default'])(children));
        }
        return acc;
    }, []);
}
function normalizeColumns(elements) {
    var columns = [];
    _react.Children.forEach(elements, function (element) {
        if (!(0, _react.isValidElement)(element)) {
            return;
        }
        var column = (0, _extends3['default'])({}, element.props);
        if (element.key) {
            column.key = element.key;
        }
        if (element.type && element.type.__ANT_TABLE_COLUMN_GROUP) {
            column.children = normalizeColumns(column.children);
        }
        columns.push(column);
    });
    return columns;
}
function getLeafColumns(columns) {
    return flatFilter(columns, function (c) {
        return !c.children;
    });
}
function findColumnByFilterValue(record, columns, inputValue) {
    return columns.find(function (col) {
        var key = getColumnKey(col);
        if (key) {
            var value = record[key];
            if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3['default'])(value)) !== 'object') {
                value = value.toString();
                if (value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
                    return true;
                }
            }
        }
        return false;
    });
}
function filterByInputValue(dataSource, columns, inputValue, cb) {
    dataSource.forEach(function (data) {
        var column = findColumnByFilterValue(data, columns, inputValue);
        if (column) {
            cb(data, column);
        }
    });
}
function removeHiddenColumns(columns) {
    return columns.filter(function (c) {
        if (c.hidden) {
            return false;
        } else if (c.children) {
            var children = removeHiddenColumns(c.children);
            if (children.length) {
                c.children = children;
            } else {
                return false;
            }
        }
        return true;
    });
}
function getColumnKey(column, index) {
    return column.key || column.dataIndex || index;
}