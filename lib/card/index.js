'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Meta = require('./Meta');

var _Meta2 = _interopRequireDefault(_Meta);

var _tabs = require('../tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _throttleByAnimationFrame = require('../_util/throttleByAnimationFrame');

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _addEventListener = require('../_util/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _configure = require('../configure');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Card = function (_Component) {
    (0, _inherits3['default'])(Card, _Component);

    function Card() {
        (0, _classCallCheck3['default'])(this, Card);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));

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

    (0, _createClass3['default'])(Card, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateWiderPadding();
            this.resizeEvent = (0, _addEventListener2['default'])(window, 'resize', this.updateWiderPadding);
            if ('noHovering' in this.props) {
                (0, _warning2['default'])(!this.props.noHovering, '`noHovering` of Card is deperated, you can remove it safely or use `hoverable` instead.');
                (0, _warning2['default'])(!!this.props.noHovering, '`noHovering={false}` of Card is deperated, use `hoverable` instead.');
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
            _react.Children.forEach(this.props.children, function (element) {
                if (element && element.type && element.type === _Grid2['default']) {
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
                return _react2['default'].createElement(
                    'li',
                    { style: { width: 100 / actions.length + '%' }, key: 'action-' + index },
                    _react2['default'].createElement(
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
                others = (0, _objectWithoutProperties3['default'])(_props2, ['prefixCls', 'className', 'extra', 'bodyStyle', 'noHovering', 'hoverable', 'title', 'loading', 'bordered', 'type', 'cover', 'actions', 'tabList', 'children', 'activeTabKey', 'defaultActiveTabKey', 'onHeadClick']);

            var prefixCls = (0, _configure.getPrefixCls)('card', customizePrefixCls);
            var classString = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-loading', loading), (0, _defineProperty3['default'])(_classNames, prefixCls + '-bordered', bordered), (0, _defineProperty3['default'])(_classNames, prefixCls + '-hoverable', this.getCompatibleHoverable()), (0, _defineProperty3['default'])(_classNames, prefixCls + '-wider-padding', this.state.widerPadding), (0, _defineProperty3['default'])(_classNames, prefixCls + '-padding-transition', this.updateWiderPaddingCalled), (0, _defineProperty3['default'])(_classNames, prefixCls + '-contain-grid', this.isContainGrid()), (0, _defineProperty3['default'])(_classNames, prefixCls + '-contain-tabs', tabList && tabList.length), (0, _defineProperty3['default'])(_classNames, prefixCls + '-type-' + type, !!type), _classNames));
            var loadingBlock = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-loading-content' },
                _react2['default'].createElement('p', { className: prefixCls + '-loading-block', style: { width: '94%' } }),
                _react2['default'].createElement(
                    'p',
                    null,
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '28%' } }),
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '62%' } })
                ),
                _react2['default'].createElement(
                    'p',
                    null,
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '22%' } }),
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '66%' } })
                ),
                _react2['default'].createElement(
                    'p',
                    null,
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '56%' } }),
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '39%' } })
                ),
                _react2['default'].createElement(
                    'p',
                    null,
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '21%' } }),
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '15%' } }),
                    _react2['default'].createElement('span', { className: prefixCls + '-loading-block', style: { width: '40%' } })
                )
            );
            var hasActiveTabKey = activeTabKey !== undefined;
            var extraProps = (0, _defineProperty3['default'])({}, hasActiveTabKey ? 'activeKey' : 'defaultActiveKey', hasActiveTabKey ? activeTabKey : defaultActiveTabKey);
            var head = void 0;
            var tabs = tabList && tabList.length ? _react2['default'].createElement(
                _tabs2['default'],
                (0, _extends3['default'])({}, extraProps, { className: prefixCls + '-head-tabs', size: "large" /* large */, onChange: this.onTabChange }),
                tabList.map(function (item) {
                    return _react2['default'].createElement(_tabs2['default'].TabPane, { tab: item.tab, key: item.key });
                })
            ) : null;
            if (title || extra || tabs) {
                head = _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-head', onClick: onHeadClick },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-head-wrapper' },
                        title && _react2['default'].createElement(
                            'div',
                            { className: prefixCls + '-head-title' },
                            title
                        ),
                        extra && _react2['default'].createElement(
                            'div',
                            { className: prefixCls + '-extra' },
                            extra
                        )
                    ),
                    tabs
                );
            }
            var coverDom = cover ? _react2['default'].createElement(
                'div',
                { className: prefixCls + '-cover' },
                cover
            ) : null;
            var body = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-body', style: bodyStyle },
                loading ? loadingBlock : children
            );
            var actionDom = actions && actions.length ? _react2['default'].createElement(
                'ul',
                { className: prefixCls + '-actions' },
                this.getAction(actions)
            ) : null;
            var divProps = (0, _omit2['default'])(others, ['onTabChange']);
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({}, divProps, { className: classString, ref: this.saveRef }),
                head,
                coverDom,
                body,
                actionDom
            );
        }
    }]);
    return Card;
}(_react.Component);

exports['default'] = Card;

Card.displayName = 'Card';
Card.Grid = _Grid2['default'];
Card.Meta = _Meta2['default'];
tslib_1.__decorate([(0, _throttleByAnimationFrame.throttleByAnimationFrameDecorator)()], Card.prototype, "updateWiderPadding", null);
module.exports = exports['default'];