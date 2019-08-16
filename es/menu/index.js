import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import RcMenu, { Divider, ItemGroup } from '../rc-components/menu';
import { getPrefixCls as _getPrefixCls } from '../configure';

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.inlineOpenKeys = [];
        _this.handleClick = function (e) {
            _this.handleOpenChange([]);
            var onClick = _this.props.onClick;

            if (onClick) {
                onClick(e);
            }
        };
        _this.handleOpenChange = function (openKeys) {
            _this.setOpenKeys(openKeys);
            var onOpenChange = _this.props.onOpenChange;

            if (onOpenChange) {
                onOpenChange(openKeys);
            }
        };
        warning(!('onOpen' in props || 'onClose' in props), '`onOpen` and `onClose` are removed, please use `onOpenChange` instead');
        warning(!('inlineCollapsed' in props && props.mode !== 'inline'), '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.');
        var openKeys = void 0;
        if ('defaultOpenKeys' in props) {
            openKeys = props.defaultOpenKeys;
        } else if ('openKeys' in props) {
            openKeys = props.openKeys;
        }
        _this.state = {
            openKeys: openKeys || []
        };
        return _this;
    }

    _createClass(Menu, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                inlineCollapsed: this.getInlineCollapsed(),
                menuTheme: this.props.theme
            };
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return _getPrefixCls('menu', this.props.prefixCls);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            var _props = this.props,
                mode = _props.mode,
                inlineCollapsed = _props.inlineCollapsed;

            if (mode === 'inline' && nextProps.mode !== 'inline') {
                this.switchModeFromInline = true;
            }
            if ('openKeys' in nextProps) {
                this.setState({ openKeys: nextProps.openKeys });
                return;
            }
            var openKeys = this.state.openKeys;
            var siderCollapsed = this.context.siderCollapsed;

            if (nextProps.inlineCollapsed && !inlineCollapsed || nextContext.siderCollapsed && !siderCollapsed) {
                this.switchModeFromInline = !!openKeys.length && !!findDOMNode(this).querySelectorAll('.' + this.getPrefixCls() + '-submenu-open').length;
                this.inlineOpenKeys = openKeys;
                this.setState({ openKeys: [] });
            }
            if (!nextProps.inlineCollapsed && inlineCollapsed || !nextContext.siderCollapsed && siderCollapsed) {
                this.setState({ openKeys: this.inlineOpenKeys });
                this.inlineOpenKeys = [];
            }
        }
    }, {
        key: 'setOpenKeys',
        value: function setOpenKeys(openKeys) {
            if (!('openKeys' in this.props)) {
                this.setState({ openKeys: openKeys });
            }
        }
    }, {
        key: 'getRealMenuMode',
        value: function getRealMenuMode() {
            var inlineCollapsed = this.getInlineCollapsed();
            if (this.switchModeFromInline && inlineCollapsed) {
                return 'inline';
            }
            var mode = this.props.mode;

            return inlineCollapsed ? 'vertical' : mode;
        }
    }, {
        key: 'getInlineCollapsed',
        value: function getInlineCollapsed() {
            var inlineCollapsed = this.props.inlineCollapsed;

            if (this.context.siderCollapsed !== undefined) {
                return this.context.siderCollapsed;
            }
            return inlineCollapsed;
        }
    }, {
        key: 'getMenuOpenAnimation',
        value: function getMenuOpenAnimation(menuMode) {
            var _this2 = this;

            var _props2 = this.props,
                openAnimation = _props2.openAnimation,
                openTransitionName = _props2.openTransitionName;

            var menuOpenAnimation = openAnimation || openTransitionName;
            if (openAnimation === undefined && openTransitionName === undefined) {
                switch (menuMode) {
                    case 'horizontal':
                        menuOpenAnimation = 'slide-up';
                        break;
                    case 'vertical':
                    case 'vertical-left':
                    case 'vertical-right':
                        // When mode switch from inline
                        // submenu should hide without animation
                        if (this.switchModeFromInline) {
                            menuOpenAnimation = '';
                            this.switchModeFromInline = false;
                        } else {
                            menuOpenAnimation = 'zoom-big';
                        }
                        break;
                    case 'inline':
                        menuOpenAnimation = _extends({}, animation, {
                            leave: function leave(node, done) {
                                return animation.leave(node, function () {
                                    // Make sure inline menu leave animation finished before mode is switched
                                    _this2.switchModeFromInline = false;
                                    _this2.setState({});
                                    // when inlineCollapsed change false to true, all submenu will be unmounted,
                                    // so that we don't need handle animation leaving.
                                    if (_this2.getRealMenuMode() === 'vertical') {
                                        return;
                                    }
                                    done();
                                });
                            }
                        });
                        break;
                    default:
                }
            }
            return menuOpenAnimation;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                className = _props3.className,
                theme = _props3.theme;

            var prefixCls = this.getPrefixCls();
            var menuMode = this.getRealMenuMode();
            var menuOpenAnimation = this.getMenuOpenAnimation(menuMode);
            var menuClassName = classNames(className, prefixCls + '-' + theme, _defineProperty({}, prefixCls + '-inline-collapsed', this.getInlineCollapsed()));
            var menuProps = {
                openKeys: this.state.openKeys,
                onOpenChange: this.handleOpenChange,
                className: menuClassName,
                mode: menuMode
            };
            if (menuMode !== 'inline') {
                // closing vertical popup submenu after click it
                menuProps.onClick = this.handleClick;
                menuProps.openTransitionName = menuOpenAnimation;
            } else {
                menuProps.openAnimation = menuOpenAnimation;
            }
            var collapsedWidth = this.context.collapsedWidth;

            if (this.getInlineCollapsed() && (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px')) {
                return null;
            }
            return React.createElement(RcMenu, _extends({}, this.props, menuProps, { prefixCls: prefixCls }));
        }
    }]);

    return Menu;
}(Component);

export default Menu;

Menu.displayName = 'Menu';
Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
Menu.defaultProps = {
    className: '',
    theme: 'light',
    focusable: false
};
Menu.childContextTypes = {
    inlineCollapsed: PropTypes.bool,
    menuTheme: PropTypes.string
};
Menu.contextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};