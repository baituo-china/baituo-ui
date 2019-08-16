'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTreeNodes = getTreeNodes;
exports.getKey = getKey;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tree = require('../../../lib/tree');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getTreeNodes(dataSet) {
    var records = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var forceRenderKeys = arguments[2];
    var renderer = arguments[3];
    var titleField = arguments[4];
    var idField = dataSet.props.idField;

    return records.map(function (record) {
        var children = forceRenderKeys.indexOf(getKey(record, idField)) !== -1 ? getTreeNodes(dataSet, record.children, forceRenderKeys, renderer) : null;
        return getTreeNode(record, children, idField, renderer({ dataSet: dataSet, record: record, text: record.get(titleField) }));
    });
}
function getKey(record, idField) {
    return String(idField ? record.get(idField) : record.id);
}
function getTreeNode(record, children, idField, text) {
    var key = getKey(record, idField);
    return _react2['default'].createElement(
        _tree.TreeNode,
        { title: text, key: key, eventKey: key, hasChildren: !!record.children, selectable: record.selectable },
        children
    );
}