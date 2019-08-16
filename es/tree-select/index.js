import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import warning from '../_util/warning';
import RcTreeSelect, { SHOW_ALL, SHOW_CHILD, SHOW_PARENT, TreeNode } from '../rc-components/tree-select';
import { getPrefixCls } from '../configure';

var TreeSelect = function (_Component) {
    _inherits(TreeSelect, _Component);

    function TreeSelect(props) {
        _classCallCheck(this, TreeSelect);

        var _this = _possibleConstructorReturn(this, (TreeSelect.__proto__ || Object.getPrototypeOf(TreeSelect)).call(this, props));

        _this.saveTreeSelect = function (node) {
            _this.rcTreeSelect = node;
        };
        _this.renderTreeSelect = function (locale) {
            var _classNames;

            var _this$props = _this.props,
                customizePrefixCls = _this$props.prefixCls,
                className = _this$props.className,
                size = _this$props.size,
                notFoundContent = _this$props.notFoundContent,
                dropdownStyle = _this$props.dropdownStyle,
                dropdownClassName = _this$props.dropdownClassName,
                restProps = _objectWithoutProperties(_this$props, ['prefixCls', 'className', 'size', 'notFoundContent', 'dropdownStyle', 'dropdownClassName']);

            var prefixCls = getPrefixCls('select', customizePrefixCls);
            var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === "large"), _defineProperty(_classNames, prefixCls + '-sm', size === "small"), _classNames), className);
            var checkable = restProps.treeCheckable;
            if (checkable) {
                checkable = React.createElement('span', { className: prefixCls + '-tree-checkbox-inner' });
            }
            return React.createElement(RcTreeSelect, _extends({}, restProps, { dropdownClassName: classNames(dropdownClassName, prefixCls + '-tree-dropdown'), prefixCls: prefixCls, className: cls, dropdownStyle: _extends({ maxHeight: '100vh', overflow: 'auto' }, dropdownStyle), treeCheckable: checkable, notFoundContent: notFoundContent || locale.notFoundContent, ref: _this.saveTreeSelect }));
        };
        warning(props.multiple !== false || !props.treeCheckable, '`multiple` will alway be `true` when `treeCheckable` is true');
        return _this;
    }

    _createClass(TreeSelect, [{
        key: 'focus',
        value: function focus() {
            this.rcTreeSelect.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcTreeSelect.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                LocaleReceiver,
                { componentName: 'Select', defaultLocale: {} },
                this.renderTreeSelect
            );
        }
    }]);

    return TreeSelect;
}(Component);

export default TreeSelect;

TreeSelect.displayName = 'TreeSelect';
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
TreeSelect.defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false
};