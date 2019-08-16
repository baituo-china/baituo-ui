import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import Set from 'core-js/library/fn/set';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { computed, observable, runInAction } from 'mobx';
import noop from 'lodash/noop';
import C7NTree, { TreeNode } from '../../../es/tree';
import { getKey, getTreeNodes } from './util';
import Spin from '../spin';
function defaultRenderer(_ref) {
    var text = _ref.text;

    return text;
}
var Tree = function (_Component) {
    _inherits(Tree, _Component);

    function Tree(props, context) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props, context));

        _this.stateForceRenderKeys = [];
        _this.handleExpand = function (expandedKeys, eventObj) {
            if (_this.setExpand(eventObj)) {
                runInAction(function () {
                    _this.stateExpandedKeys = expandedKeys;
                });
            }
            var _this$props$onExpand = _this.props.onExpand,
                onExpand = _this$props$onExpand === undefined ? noop : _this$props$onExpand;

            onExpand(expandedKeys, eventObj);
        };
        _this.handleCheck = function (checkedKeys, eventObj) {
            if (_this.setCheck(eventObj)) {
                runInAction(function () {
                    _this.stateCheckedKeys = checkedKeys;
                });
            }
            var _this$props$onCheck = _this.props.onCheck,
                onCheck = _this$props$onCheck === undefined ? noop : _this$props$onCheck;

            onCheck(checkedKeys, eventObj);
        };
        _this.handleSelect = function (_selectedKeys, eventObj) {
            var dataSet = _this.props.dataSet;

            if (dataSet) {
                var idField = dataSet.props.idField;
                var node = eventObj.node,
                    selected = eventObj.selected;
                var eventKey = node.props.eventKey;

                var found = dataSet.find(function (record) {
                    return eventKey === String(idField ? record.get(idField) : record.id);
                });
                if (found) {
                    if (selected) {
                        dataSet.select(found);
                    } else {
                        dataSet.unSelect(found);
                    }
                }
            }
        };
        runInAction(function () {
            _this.stateCheckedKeys = [];
            _this.stateExpandedKeys = [];
        });
        return _this;
    }

    _createClass(Tree, [{
        key: 'setExpand',
        value: function setExpand(eventObj) {
            var dataSet = this.props.dataSet;

            if (dataSet) {
                var _dataSet$props = dataSet.props,
                    expandField = _dataSet$props.expandField,
                    idField = _dataSet$props.idField;

                if (expandField) {
                    var node = eventObj.node,
                        expanded = eventObj.expanded;
                    var eventKey = node.props.eventKey;

                    var found = dataSet.find(function (record) {
                        return eventKey === getKey(record, idField);
                    });
                    if (found) {
                        found.isExpanded = expanded;
                        return false;
                    }
                }
            }
            return true;
        }
    }, {
        key: 'setCheck',
        value: function setCheck(eventObj) {
            var dataSet = this.props.dataSet;

            if (dataSet) {
                var _dataSet$props2 = dataSet.props,
                    checkField = _dataSet$props2.checkField,
                    idField = _dataSet$props2.idField;

                if (checkField) {
                    var node = eventObj.node,
                        checked = eventObj.checked;
                    var eventKey = node.props.eventKey;

                    var found = dataSet.find(function (record) {
                        return eventKey === String(idField ? record.get(idField) : record.id);
                    });
                    if (found) {
                        var field = found.getField(checkField);
                        found.set(checkField, field ? checked ? field.get("trueValue" /* trueValue */) : field.get("falseValue" /* falseValue */) : checked);
                        return false;
                    }
                }
            }
            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                dataSet = _props.dataSet,
                _props$renderer = _props.renderer,
                renderer = _props$renderer === undefined ? defaultRenderer : _props$renderer,
                titleField = _props.titleField,
                otherProps = _objectWithoutProperties(_props, ['dataSet', 'renderer', 'titleField']);

            if (dataSet) {
                var props = {};
                props.children = getTreeNodes(dataSet, dataSet.treeData, this.forceRenderKeys, renderer, titleField);
                props.onExpand = this.handleExpand;
                props.onCheck = this.handleCheck;
                props.onSelect = this.handleSelect;
                props.expandedKeys = this.expandedKeys.slice();
                props.checkedKeys = this.checkedKeys.slice();
                props.multiple = dataSet.props.selection === "multiple" /* multiple */;
                props.selectedKeys = this.selectedKeys.slice();
                return React.createElement(
                    Spin,
                    { dataSet: dataSet },
                    React.createElement(C7NTree, _extends({}, otherProps, props))
                );
            }
            return React.createElement(C7NTree, otherProps);
        }
    }, {
        key: 'forceRenderKeys',
        get: function get() {
            return this.stateForceRenderKeys = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(this.stateForceRenderKeys), _toConsumableArray(this.expandedKeys)))));
        }
    }, {
        key: 'expandedKeys',
        get: function get() {
            var dataSet = this.props.dataSet;

            if (dataSet) {
                var _dataSet$props3 = dataSet.props,
                    expandField = _dataSet$props3.expandField,
                    idField = _dataSet$props3.idField;

                if (expandField) {
                    var keys = [];
                    dataSet.forEach(function (record) {
                        if (record.isExpanded) {
                            keys.push(getKey(record, idField));
                        }
                    });
                    return keys;
                }
            }
            return this.stateExpandedKeys;
        }
    }, {
        key: 'checkedKeys',
        get: function get() {
            var dataSet = this.props.dataSet;

            if (dataSet) {
                var _dataSet$props4 = dataSet.props,
                    checkField = _dataSet$props4.checkField,
                    idField = _dataSet$props4.idField;

                if (checkField) {
                    var keys = [];
                    dataSet.forEach(function (record) {
                        var field = record.getField(checkField);
                        if (record.get(checkField) === (field ? field.get("trueValue" /* trueValue */) : true)) {
                            keys.push(getKey(record, idField));
                        }
                    });
                    return keys;
                }
            }
            return this.stateCheckedKeys;
        }
    }, {
        key: 'selectedKeys',
        get: function get() {
            var dataSet = this.props.dataSet;

            if (dataSet) {
                var idField = dataSet.props.idField;

                return dataSet.selected.map(function (record) {
                    return getKey(record, idField);
                });
            }
            return [];
        }
    }]);

    return Tree;
}(Component);
Tree.displayName = 'Tree<PRO>';
Tree.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any,
    treeData: PropTypes.array,
    showLine: PropTypes.bool,
    showIcon: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    focusable: PropTypes.bool,
    selectable: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    checkable: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    checkStrictly: PropTypes.bool,
    draggable: PropTypes.bool,
    defaultExpandParent: PropTypes.bool,
    autoExpandParent: PropTypes.bool,
    defaultExpandAll: PropTypes.bool,
    defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
    expandedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
    checkedKeys: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), PropTypes.object]),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    onSelect: PropTypes.func,
    onLoad: PropTypes.func,
    loadData: PropTypes.func,
    loadedKeys: PropTypes.arrayOf(PropTypes.string),
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onRightClick: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrop: PropTypes.func,
    filterTreeNode: PropTypes.func,
    openTransitionName: PropTypes.string,
    openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    switcherIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};
Tree.TreeNode = TreeNode;
tslib_1.__decorate([observable], Tree.prototype, "stateCheckedKeys", void 0);
tslib_1.__decorate([observable], Tree.prototype, "stateExpandedKeys", void 0);
tslib_1.__decorate([computed], Tree.prototype, "forceRenderKeys", null);
tslib_1.__decorate([computed], Tree.prototype, "expandedKeys", null);
tslib_1.__decorate([computed], Tree.prototype, "checkedKeys", null);
tslib_1.__decorate([computed], Tree.prototype, "selectedKeys", null);
Tree = tslib_1.__decorate([observer], Tree);
export default Tree;