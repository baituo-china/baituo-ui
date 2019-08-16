import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SubMenu as RcSubMenu } from '../rc-components/menu';

var SubMenu = function (_Component) {
    _inherits(SubMenu, _Component);

    function SubMenu() {
        _classCallCheck(this, SubMenu);

        var _this = _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).apply(this, arguments));

        _this.onKeyDown = function (e) {
            _this.subMenu.onKeyDown(e);
        };
        _this.saveSubMenu = function (subMenu) {
            _this.subMenu = subMenu;
        };
        return _this;
    }

    _createClass(SubMenu, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                rootPrefixCls = _props.rootPrefixCls,
                className = _props.className;

            var theme = this.context.menuTheme;
            return React.createElement(RcSubMenu, _extends({}, this.props, { ref: this.saveSubMenu, popupClassName: classNames(rootPrefixCls + '-' + theme, className) }));
        }
    }]);

    return SubMenu;
}(Component);

SubMenu.contextTypes = {
    menuTheme: PropTypes.string
};
export default SubMenu;