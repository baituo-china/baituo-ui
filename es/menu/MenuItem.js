import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
import { Item } from '../rc-components/menu';

var MenuItem = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));

        _this.onKeyDown = function (e) {
            _this.menuItem.onKeyDown(e);
        };
        _this.saveMenuItem = function (menuItem) {
            _this.menuItem = menuItem;
        };
        return _this;
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var inlineCollapsed = this.context.inlineCollapsed;

            var props = this.props;
            var item = React.createElement(Item, _extends({}, props, { ref: this.saveMenuItem }));
            if (inlineCollapsed && props.level === 1) {
                return React.createElement(
                    Tooltip,
                    { title: props.children, placement: 'right', overlayClassName: props.rootPrefixCls + '-inline-collapsed-tooltip' },
                    item
                );
            }
            return item;
        }
    }]);

    return MenuItem;
}(Component);

MenuItem.contextTypes = {
    inlineCollapsed: PropTypes.bool
};
MenuItem.isMenuItem = 1;
export default MenuItem;