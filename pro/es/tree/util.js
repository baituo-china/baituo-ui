import React from 'react';
import { TreeNode } from '../../../es/tree';
export function getTreeNodes(dataSet) {
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
export function getKey(record, idField) {
    return String(idField ? record.get(idField) : record.id);
}
function getTreeNode(record, children, idField, text) {
    var key = getKey(record, idField);
    return React.createElement(
        TreeNode,
        { title: text, key: key, eventKey: key, hasChildren: !!record.children, selectable: record.selectable },
        children
    );
}