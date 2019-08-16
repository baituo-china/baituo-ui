import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Component } from 'react';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import RcTree, { TreeNode } from '../rc-components/tree';
import Icon from '../icon';
import Progress from '../progress';
import { getPrefixCls as _getPrefixCls } from '../configure';
export { TreeNode };

var Tree = function (_Component) {
    _inherits(Tree, _Component);

    function Tree() {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).apply(this, arguments));

        _this.renderSwitcherIcon = function (_ref) {
            var isLeaf = _ref.isLeaf,
                loading = _ref.loading;
            var _this$props = _this.props,
                showLine = _this$props.showLine,
                switcherIcon = _this$props.switcherIcon;

            var prefixCls = _this.getPrefixCls();
            if (loading) {
                return React.createElement(Progress, { type: "loading" /* loading */, className: prefixCls + '-switcher-loading-icon', size: "small" /* small */ });
            }
            var switcherCls = prefixCls + '-switcher-icon';
            if (showLine) {
                if (isLeaf) {
                    return React.createElement(Icon, { type: 'note', className: prefixCls + '-switcher-line-icon' });
                }
                return React.createElement(Icon, { type: 'arrow_drop_down', className: switcherCls });
            } else {
                if (isLeaf) {
                    return null;
                } else if (switcherIcon) {
                    var switcherOriginCls = switcherIcon.props.className || '';
                    return cloneElement(switcherIcon, {
                        className: [switcherOriginCls, switcherCls]
                    });
                } else {
                    return React.createElement(Icon, { type: 'arrow_drop_down', className: switcherCls });
                }
            }
        };
        return _this;
    }

    _createClass(Tree, [{
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return _getPrefixCls('tree', this.props.prefixCls);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var className = props.className,
                showIcon = props.showIcon,
                checkable = props.checkable;

            var prefixCls = this.getPrefixCls();
            return React.createElement(
                RcTree,
                _extends({}, props, { className: classNames(!showIcon && prefixCls + '-icon-hide', className), checkable: checkable ? React.createElement('span', { className: prefixCls + '-checkbox-inner' }) : checkable, switcherIcon: this.renderSwitcherIcon, prefixCls: prefixCls }),
                this.props.children
            );
        }
    }]);

    return Tree;
}(Component);

export default Tree;

Tree.displayName = 'Tree';
Tree.TreeNode = TreeNode;
Tree.defaultProps = {
    checkable: false,
    showIcon: false,
    openAnimation: animation
};