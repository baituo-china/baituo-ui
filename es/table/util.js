import _typeof from 'babel-runtime/helpers/typeof';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import { Children, isValidElement } from 'react';
export function flatArray() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var childrenName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';

    var result = [];
    var loop = function loop(array) {
        array.forEach(function (item) {
            if (item[childrenName]) {
                var newItem = _extends({}, item);
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
export function treeMap(tree, mapper) {
    var childrenName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

    return tree.map(function (node, index) {
        var extra = {};
        if (node[childrenName]) {
            extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
        }
        return _extends({}, mapper(node, index), extra);
    });
}
export function flatFilter(tree, callback) {
    return tree.reduce(function (acc, node) {
        if (callback(node)) {
            acc.push(node);
        }
        if (node.children) {
            var children = flatFilter(node.children, callback);
            acc.push.apply(acc, _toConsumableArray(children));
        }
        return acc;
    }, []);
}
export function normalizeColumns(elements) {
    var columns = [];
    Children.forEach(elements, function (element) {
        if (!isValidElement(element)) {
            return;
        }
        var column = _extends({}, element.props);
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
export function getLeafColumns(columns) {
    return flatFilter(columns, function (c) {
        return !c.children;
    });
}
export function findColumnByFilterValue(record, columns, inputValue) {
    return columns.find(function (col) {
        var key = getColumnKey(col);
        if (key) {
            var value = record[key];
            if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
                value = value.toString();
                if (value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
                    return true;
                }
            }
        }
        return false;
    });
}
export function filterByInputValue(dataSource, columns, inputValue, cb) {
    dataSource.forEach(function (data) {
        var column = findColumnByFilterValue(data, columns, inputValue);
        if (column) {
            cb(data, column);
        }
    });
}
export function removeHiddenColumns(columns) {
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
export function getColumnKey(column, index) {
    return column.key || column.dataIndex || index;
}