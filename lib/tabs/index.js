'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _isFlexSupported = require('../_util/isFlexSupported');

var _isFlexSupported2 = _interopRequireDefault(_isFlexSupported);

var _tabs = require('../rc-components/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _ScrollableInkTabBar = require('../rc-components/tabs/ScrollableInkTabBar');

var _ScrollableInkTabBar2 = _interopRequireDefault(_ScrollableInkTabBar);

var _utils = require('../rc-components/tabs/utils');

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Tabs = function (_Component) {
    (0, _inherits3['default'])(Tabs, _Component);

    function Tabs() {
        (0, _classCallCheck3['default'])(this, Tabs);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));

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

    (0, _createClass3['default'])(Tabs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var NO_FLEX = ' no-flex';
            var tabNode = (0, _reactDom.findDOMNode)(this);
            if (tabNode && !(0, _isFlexSupported2['default'])() && tabNode.className.indexOf(NO_FLEX) === -1) {
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

            var prefixCls = (0, _configure.getPrefixCls)('tabs', customizePrefixCls);

            var _ref = (typeof animated === 'undefined' ? 'undefined' : (0, _typeof3['default'])(animated)) === 'object' ? {
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
            (0, _warning2['default'])(!(isCard && (size === "small" /* small */ || size === "large" /* large */)), 'Tabs[type=card|editable-card] doesn\'t have small or large size, it\'s by designed.');
            var cls = (0, _classnames2['default'])(className, prefixCls + '-' + type, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-vertical', tabPosition === "left" /* left */ || tabPosition === "right"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + size, !!size), (0, _defineProperty3['default'])(_classNames, prefixCls + '-card', isCard), (0, _defineProperty3['default'])(_classNames, prefixCls + '-no-animation', !tabPaneAnimated), _classNames));
            // only card type tabs can be added and closed
            var childrenWithClose = [];
            if (type === "editable-card" /* 'editable-card' */) {
                    childrenWithClose = [];
                    _react.Children.forEach(children, function (child, index) {
                        var closable = child.props.closable;
                        closable = typeof closable === 'undefined' ? true : closable;
                        var closeIcon = closable ? _react2['default'].createElement(_icon2['default'], { type: 'close', onClick: function onClick(e) {
                                return _this2.removeTab(child.key, e);
                            } }) : null;
                        childrenWithClose.push((0, _react.cloneElement)(child, {
                            tab: _react2['default'].createElement(
                                'div',
                                { className: closable ? undefined : prefixCls + '-tab-unclosable' },
                                child.props.tab,
                                closeIcon
                            ),
                            key: (0, _utils.generateKey)(child.key, index)
                        }));
                    });
                    // Add new tab handler
                    if (!hideAdd) {
                        tabBarExtraContent = _react2['default'].createElement(
                            'span',
                            null,
                            _react2['default'].createElement(_icon2['default'], { type: 'plus', className: prefixCls + '-new-tab', onClick: this.createNewTab }),
                            tabBarExtraContent
                        );
                    }
                }
            tabBarExtraContent = tabBarExtraContent ? _react2['default'].createElement(
                'div',
                { className: prefixCls + '-extra-content' },
                tabBarExtraContent
            ) : null;
            var renderTabBar = function renderTabBar() {
                return _react2['default'].createElement(_ScrollableInkTabBar2['default'], { inkBarAnimated: inkBarAnimated, extraContent: tabBarExtraContent, onTabClick: onTabClick, onPrevClick: onPrevClick, onNextClick: onNextClick, style: tabBarStyle, tabBarGutter: tabBarGutter });
            };
            return _react2['default'].createElement(
                _tabs2['default'],
                (0, _extends3['default'])({}, this.props, { prefixCls: prefixCls, className: cls, tabBarPosition: tabPosition, renderTabBar: renderTabBar, renderTabContent: function renderTabContent() {
                        return _react2['default'].createElement(_tabs.TabContent, { animated: tabPaneAnimated, animatedWithMargin: true });
                    }, onChange: this.handleChange }),
                childrenWithClose.length > 0 ? childrenWithClose : children
            );
        }
    }]);
    return Tabs;
}(_react.Component);

exports['default'] = Tabs;

Tabs.displayName = 'Tabs';
Tabs.TabPane = _tabs.TabPane;
Tabs.defaultProps = {
    hideAdd: false
};
module.exports = exports['default'];