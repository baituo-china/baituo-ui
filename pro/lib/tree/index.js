'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _set = require('core-js/library/fn/set');

var _set2 = _interopRequireDefault(_set);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _tree = require('../../../lib/tree');

var _tree2 = _interopRequireDefault(_tree);

var _util = require('./util');

var _spin = require('../spin');

var _spin2 = _interopRequireDefault(_spin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function defaultRenderer(_ref) {
    var text = _ref.text;

    return text;
}
var Tree = function (_Component) {
    (0, _inherits3['default'])(Tree, _Component);

    function Tree(props, context) {
        (0, _classCallCheck3['default'])(this, Tree);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props, context));

        _this.stateForceRenderKeys = [];
        _this.handleExpand = function (expandedKeys, eventObj) {
            if (_this.setExpand(eventObj)) {
                (0, _mobx.runInAction)(function () {
                    _this.stateExpandedKeys = expandedKeys;
                });
            }
            var _this$props$onExpand = _this.props.onExpand,
                onExpand = _this$props$onExpand === undefined ? _noop2['default'] : _this$props$onExpand;

            onExpand(expandedKeys, eventObj);
        };
        _this.handleCheck = function (checkedKeys, eventObj) {
            if (_this.setCheck(eventObj)) {
                (0, _mobx.runInAction)(function () {
                    _this.stateCheckedKeys = checkedKeys;
                });
            }
            var _this$props$onCheck = _this.props.onCheck,
                onCheck = _this$props$onCheck === undefined ? _noop2['default'] : _this$props$onCheck;

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
        (0, _mobx.runInAction)(function () {
            _this.stateCheckedKeys = [];
            _this.stateExpandedKeys = [];
        });
        return _this;
    }

    (0, _createClass3['default'])(Tree, [{
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
                        return eventKey === (0, _util.getKey)(record, idField);
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
                otherProps = (0, _objectWithoutProperties3['default'])(_props, ['dataSet', 'renderer', 'titleField']);

            if (dataSet) {
                var props = {};
                props.children = (0, _util.getTreeNodes)(dataSet, dataSet.treeData, this.forceRenderKeys, renderer, titleField);
                props.onExpand = this.handleExpand;
                props.onCheck = this.handleCheck;
                props.onSelect = this.handleSelect;
                props.expandedKeys = this.expandedKeys.slice();
                props.checkedKeys = this.checkedKeys.slice();
                props.multiple = dataSet.props.selection === "multiple" /* multiple */;
                props.selectedKeys = this.selectedKeys.slice();
                return _react2['default'].createElement(
                    _spin2['default'],
                    { dataSet: dataSet },
                    _react2['default'].createElement(_tree2['default'], (0, _extends3['default'])({}, otherProps, props))
                );
            }
            return _react2['default'].createElement(_tree2['default'], otherProps);
        }
    }, {
        key: 'forceRenderKeys',
        get: function get() {
            return this.stateForceRenderKeys = [].concat((0, _toConsumableArray3['default'])(new _set2['default']([].concat((0, _toConsumableArray3['default'])(this.stateForceRenderKeys), (0, _toConsumableArray3['default'])(this.expandedKeys)))));
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
                            keys.push((0, _util.getKey)(record, idField));
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
                            keys.push((0, _util.getKey)(record, idField));
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
                    return (0, _util.getKey)(record, idField);
                });
            }
            return [];
        }
    }]);
    return Tree;
}(_react.Component);
Tree.displayName = 'Tree<PRO>';
Tree.propTypes = {
    prefixCls: _propTypes2['default'].string,
    className: _propTypes2['default'].string,
    tabIndex: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    children: _propTypes2['default'].any,
    treeData: _propTypes2['default'].array,
    showLine: _propTypes2['default'].bool,
    showIcon: _propTypes2['default'].bool,
    icon: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func]),
    focusable: _propTypes2['default'].bool,
    selectable: _propTypes2['default'].bool,
    disabled: _propTypes2['default'].bool,
    multiple: _propTypes2['default'].bool,
    checkable: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].node]),
    checkStrictly: _propTypes2['default'].bool,
    draggable: _propTypes2['default'].bool,
    defaultExpandParent: _propTypes2['default'].bool,
    autoExpandParent: _propTypes2['default'].bool,
    defaultExpandAll: _propTypes2['default'].bool,
    defaultExpandedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    expandedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    defaultCheckedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    checkedKeys: _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(_propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])), _propTypes2['default'].object]),
    defaultSelectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    selectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    onClick: _propTypes2['default'].func,
    onDoubleClick: _propTypes2['default'].func,
    onExpand: _propTypes2['default'].func,
    onCheck: _propTypes2['default'].func,
    onSelect: _propTypes2['default'].func,
    onLoad: _propTypes2['default'].func,
    loadData: _propTypes2['default'].func,
    loadedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    onMouseEnter: _propTypes2['default'].func,
    onMouseLeave: _propTypes2['default'].func,
    onRightClick: _propTypes2['default'].func,
    onDragStart: _propTypes2['default'].func,
    onDragEnter: _propTypes2['default'].func,
    onDragOver: _propTypes2['default'].func,
    onDragLeave: _propTypes2['default'].func,
    onDragEnd: _propTypes2['default'].func,
    onDrop: _propTypes2['default'].func,
    filterTreeNode: _propTypes2['default'].func,
    openTransitionName: _propTypes2['default'].string,
    openAnimation: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
    switcherIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func])
};
Tree.TreeNode = _tree.TreeNode;
tslib_1.__decorate([_mobx.observable], Tree.prototype, "stateCheckedKeys", void 0);
tslib_1.__decorate([_mobx.observable], Tree.prototype, "stateExpandedKeys", void 0);
tslib_1.__decorate([_mobx.computed], Tree.prototype, "forceRenderKeys", null);
tslib_1.__decorate([_mobx.computed], Tree.prototype, "expandedKeys", null);
tslib_1.__decorate([_mobx.computed], Tree.prototype, "checkedKeys", null);
tslib_1.__decorate([_mobx.computed], Tree.prototype, "selectedKeys", null);
Tree = tslib_1.__decorate([_mobxReact.observer], Tree);
exports['default'] = Tree;
module.exports = exports['default'];