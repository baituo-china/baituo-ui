import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Children, Component } from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import Grid from './Grid';
import Meta from './Meta';
import Tabs from '../tabs';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
import warning from '../_util/warning';
import addEventListener from '../_util/addEventListener';
import { getPrefixCls } from '../configure';

var Card = function (_Component) {
    _inherits(Card, _Component);

    function Card() {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));

        _this.state = {
            widerPadding: false
        };
        _this.onTabChange = function (key) {
            if (_this.props.onTabChange) {
                _this.props.onTabChange(key);
            }
        };
        _this.saveRef = function (node) {
            _this.container = node;
        };
        return _this;
    }

    _createClass(Card, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateWiderPadding();
            this.resizeEvent = addEventListener(window, 'resize', this.updateWiderPadding);
            if ('noHovering' in this.props) {
                warning(!this.props.noHovering, '`noHovering` of Card is deperated, you can remove it safely or use `hoverable` instead.');
                warning(!!this.props.noHovering, '`noHovering={false}` of Card is deperated, use `hoverable` instead.');
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.resizeEvent) {
                this.resizeEvent.remove();
            }
            this.updateWiderPadding.cancel();
        }
    }, {
        key: 'updateWiderPadding',
        value: function updateWiderPadding() {
            var _this2 = this;

            if (!this.container) {
                return;
            }
            // 936 is a magic card width pixer number indicated by designer
            var WIDTH_BOUDARY_PX = 936;
            if (this.container.offsetWidth >= WIDTH_BOUDARY_PX && !this.state.widerPadding) {
                this.setState({ widerPadding: true }, function () {
                    _this2.updateWiderPaddingCalled = true; // first render without css transition
                });
            }
            if (this.container.offsetWidth < WIDTH_BOUDARY_PX && this.state.widerPadding) {
                this.setState({ widerPadding: false }, function () {
                    _this2.updateWiderPaddingCalled = true; // first render without css transition
                });
            }
        }
    }, {
        key: 'isContainGrid',
        value: function isContainGrid() {
            var containGrid = void 0;
            Children.forEach(this.props.children, function (element) {
                if (element && element.type && element.type === Grid) {
                    containGrid = true;
                }
            });
            return containGrid;
        }
    }, {
        key: 'getAction',
        value: function getAction(actions) {
            if (!actions || !actions.length) {
                return null;
            }
            var actionList = actions.map(function (action, index) {
                return React.createElement(
                    'li',
                    { style: { width: 100 / actions.length + '%' }, key: 'action-' + index },
                    React.createElement(
                        'span',
                        null,
                        action
                    )
                );
            });
            return actionList;
        }
        // For 2.x compatible

    }, {
        key: 'getCompatibleHoverable',
        value: function getCompatibleHoverable() {
            var _props = this.props,
                noHovering = _props.noHovering,
                hoverable = _props.hoverable;

            if ('noHovering' in this.props) {
                return !noHovering || hoverable;
            }
            return !!hoverable;
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props2 = this.props,
                customizePrefixCls = _props2.prefixCls,
                className = _props2.className,
                extra = _props2.extra,
                bodyStyle = _props2.bodyStyle,
                noHovering = _props2.noHovering,
                hoverable = _props2.hoverable,
                title = _props2.title,
                loading = _props2.loading,
                _props2$bordered = _props2.bordered,
                bordered = _props2$bordered === undefined ? true : _props2$bordered,
                type = _props2.type,
                cover = _props2.cover,
                actions = _props2.actions,
                tabList = _props2.tabList,
                children = _props2.children,
                activeTabKey = _props2.activeTabKey,
                defaultActiveTabKey = _props2.defaultActiveTabKey,
                onHeadClick = _props2.onHeadClick,
                others = _objectWithoutProperties(_props2, ['prefixCls', 'className', 'extra', 'bodyStyle', 'noHovering', 'hoverable', 'title', 'loading', 'bordered', 'type', 'cover', 'actions', 'tabList', 'children', 'activeTabKey', 'defaultActiveTabKey', 'onHeadClick']);

            var prefixCls = getPrefixCls('card', customizePrefixCls);
            var classString = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-loading', loading), _defineProperty(_classNames, prefixCls + '-bordered', bordered), _defineProperty(_classNames, prefixCls + '-hoverable', this.getCompatibleHoverable()), _defineProperty(_classNames, prefixCls + '-wider-padding', this.state.widerPadding), _defineProperty(_classNames, prefixCls + '-padding-transition', this.updateWiderPaddingCalled), _defineProperty(_classNames, prefixCls + '-contain-grid', this.isContainGrid()), _defineProperty(_classNames, prefixCls + '-contain-tabs', tabList && tabList.length), _defineProperty(_classNames, prefixCls + '-type-' + type, !!type), _classNames));
            var loadingBlock = React.createElement(
                'div',
                { className: prefixCls + '-loading-content' },
                React.createElement('p', { className: prefixCls + '-loading-block', style: { width: '94%' } }),
                React.createElement(
                    'p',
                    null,
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '28%' } }),
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '62%' } })
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '22%' } }),
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '66%' } })
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '56%' } }),
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '39%' } })
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '21%' } }),
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '15%' } }),
                    React.createElement('span', { className: prefixCls + '-loading-block', style: { width: '40%' } })
                )
            );
            var hasActiveTabKey = activeTabKey !== undefined;
            var extraProps = _defineProperty({}, hasActiveTabKey ? 'activeKey' : 'defaultActiveKey', hasActiveTabKey ? activeTabKey : defaultActiveTabKey);
            var head = void 0;
            var tabs = tabList && tabList.length ? React.createElement(
                Tabs,
                _extends({}, extraProps, { className: prefixCls + '-head-tabs', size: "large" /* large */, onChange: this.onTabChange }),
                tabList.map(function (item) {
                    return React.createElement(Tabs.TabPane, { tab: item.tab, key: item.key });
                })
            ) : null;
            if (title || extra || tabs) {
                head = React.createElement(
                    'div',
                    { className: prefixCls + '-head', onClick: onHeadClick },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-head-wrapper' },
                        title && React.createElement(
                            'div',
                            { className: prefixCls + '-head-title' },
                            title
                        ),
                        extra && React.createElement(
                            'div',
                            { className: prefixCls + '-extra' },
                            extra
                        )
                    ),
                    tabs
                );
            }
            var coverDom = cover ? React.createElement(
                'div',
                { className: prefixCls + '-cover' },
                cover
            ) : null;
            var body = React.createElement(
                'div',
                { className: prefixCls + '-body', style: bodyStyle },
                loading ? loadingBlock : children
            );
            var actionDom = actions && actions.length ? React.createElement(
                'ul',
                { className: prefixCls + '-actions' },
                this.getAction(actions)
            ) : null;
            var divProps = omit(others, ['onTabChange']);
            return React.createElement(
                'div',
                _extends({}, divProps, { className: classString, ref: this.saveRef }),
                head,
                coverDom,
                body,
                actionDom
            );
        }
    }]);

    return Card;
}(Component);

export default Card;

Card.displayName = 'Card';
Card.Grid = Grid;
Card.Meta = Meta;
tslib_1.__decorate([throttleByAnimationFrameDecorator()], Card.prototype, "updateWiderPadding", null);