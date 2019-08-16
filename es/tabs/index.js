import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, cloneElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import warning from '../_util/warning';
import isFlexSupported from '../_util/isFlexSupported';
import RcTabs, { TabContent, TabPane } from '../rc-components/tabs';
import ScrollableInkTabBar from '../rc-components/tabs/ScrollableInkTabBar';
import { generateKey } from '../rc-components/tabs/utils';
import { getPrefixCls } from '../configure';

var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));

        _this.createNewTab = function (targetKey) {
            var onEdit = _this.props.onEdit;
            if (onEdit) {
                onEdit(targetKey, 'add');
            }
        };
        _this.removeTab = function (targetKey, e) {
            e.stopPropagation();
            if (!targetKey) {
                return;
            }
            var onEdit = _this.props.onEdit;
            if (onEdit) {
                onEdit(targetKey, 'remove');
            }
        };
        _this.handleChange = function (activeKey) {
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(activeKey);
            }
        };
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var NO_FLEX = ' no-flex';
            var tabNode = findDOMNode(this);
            if (tabNode && !isFlexSupported() && tabNode.className.indexOf(NO_FLEX) === -1) {
                tabNode.className += NO_FLEX;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                size = _props.size,
                _props$type = _props.type,
                type = _props$type === undefined ? "line" : _props$type,
                tabPosition = _props.tabPosition,
                children = _props.children,
                tabBarExtraContent = _props.tabBarExtraContent,
                tabBarStyle = _props.tabBarStyle,
                hideAdd = _props.hideAdd,
                onTabClick = _props.onTabClick,
                onPrevClick = _props.onPrevClick,
                onNextClick = _props.onNextClick,
                _props$animated = _props.animated,
                animated = _props$animated === undefined ? true : _props$animated,
                tabBarGutter = _props.tabBarGutter;

            var prefixCls = getPrefixCls('tabs', customizePrefixCls);

            var _ref = (typeof animated === 'undefined' ? 'undefined' : _typeof(animated)) === 'object' ? {
                inkBarAnimated: animated.inkBar, tabPaneAnimated: animated.tabPane
            } : {
                inkBarAnimated: animated, tabPaneAnimated: animated
            },
                inkBarAnimated = _ref.inkBarAnimated,
                tabPaneAnimated = _ref.tabPaneAnimated;
            // card tabs should not have animation


            if (type !== "line" /* line */) {
                    tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
                }
            var isCard = type === "card" /* card */ || type === "editable-card" /* 'editable-card' */;
            warning(!(isCard && (size === "small" /* small */ || size === "large" /* large */)), 'Tabs[type=card|editable-card] doesn\'t have small or large size, it\'s by designed.');
            var cls = classNames(className, prefixCls + '-' + type, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-vertical', tabPosition === "left" /* left */ || tabPosition === "right"), _defineProperty(_classNames, prefixCls + '-' + size, !!size), _defineProperty(_classNames, prefixCls + '-card', isCard), _defineProperty(_classNames, prefixCls + '-no-animation', !tabPaneAnimated), _classNames));
            // only card type tabs can be added and closed
            var childrenWithClose = [];
            if (type === "editable-card" /* 'editable-card' */) {
                    childrenWithClose = [];
                    Children.forEach(children, function (child, index) {
                        var closable = child.props.closable;
                        closable = typeof closable === 'undefined' ? true : closable;
                        var closeIcon = closable ? React.createElement(Icon, { type: 'close', onClick: function onClick(e) {
                                return _this2.removeTab(child.key, e);
                            } }) : null;
                        childrenWithClose.push(cloneElement(child, {
                            tab: React.createElement(
                                'div',
                                { className: closable ? undefined : prefixCls + '-tab-unclosable' },
                                child.props.tab,
                                closeIcon
                            ),
                            key: generateKey(child.key, index)
                        }));
                    });
                    // Add new tab handler
                    if (!hideAdd) {
                        tabBarExtraContent = React.createElement(
                            'span',
                            null,
                            React.createElement(Icon, { type: 'plus', className: prefixCls + '-new-tab', onClick: this.createNewTab }),
                            tabBarExtraContent
                        );
                    }
                }
            tabBarExtraContent = tabBarExtraContent ? React.createElement(
                'div',
                { className: prefixCls + '-extra-content' },
                tabBarExtraContent
            ) : null;
            var renderTabBar = function renderTabBar() {
                return React.createElement(ScrollableInkTabBar, { inkBarAnimated: inkBarAnimated, extraContent: tabBarExtraContent, onTabClick: onTabClick, onPrevClick: onPrevClick, onNextClick: onNextClick, style: tabBarStyle, tabBarGutter: tabBarGutter });
            };
            return React.createElement(
                RcTabs,
                _extends({}, this.props, { prefixCls: prefixCls, className: cls, tabBarPosition: tabPosition, renderTabBar: renderTabBar, renderTabContent: function renderTabContent() {
                        return React.createElement(TabContent, { animated: tabPaneAnimated, animatedWithMargin: true });
                    }, onChange: this.handleChange }),
                childrenWithClose.length > 0 ? childrenWithClose : children
            );
        }
    }]);

    return Tabs;
}(Component);

export default Tabs;

Tabs.displayName = 'Tabs';
Tabs.TabPane = TabPane;
Tabs.defaultProps = {
    hideAdd: false
};