'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _affix = require('../affix');

var _affix2 = _interopRequireDefault(_affix);

var _getScroll = require('../_util/getScroll');

var _getScroll2 = _interopRequireDefault(_getScroll);

var _getRequestAnimationFrame = require('../_util/getRequestAnimationFrame');

var _getRequestAnimationFrame2 = _interopRequireDefault(_getRequestAnimationFrame);

var _addEventListener = require('../_util/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getDefaultContainer() {
    return window;
}
function getOffsetTop(element, container) {
    if (!element) {
        return 0;
    }
    if (!element.getClientRects().length) {
        return 0;
    }
    var rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
        if (container === window && element.ownerDocument) {
            container = element.ownerDocument.documentElement;
            return rect.top - container.clientTop;
        }
        return rect.top - container.getBoundingClientRect().top;
    }
    return rect.top;
}
function easeInOutCubic(t, b, c, d) {
    var cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return cc / 2 * t * t * t + b;
    }
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
}
var reqAnimFrame = (0, _getRequestAnimationFrame2['default'])();
var sharpMatcherRegx = /#([^#]+)$/;
function scrollTo(href) {
    var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var getContainer = arguments[2];
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _noop2['default'];

    var container = getContainer();
    var scrollTop = (0, _getScroll2['default'])(container, true);
    var sharpLinkMatch = sharpMatcherRegx.exec(href);
    if (!sharpLinkMatch) {
        return;
    }
    var targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
        return;
    }
    var eleOffsetTop = getOffsetTop(targetElement, container);
    var targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
    var startTime = Date.now();
    var frameFunc = function frameFunc() {
        var timestamp = Date.now();
        var time = timestamp - startTime;
        var nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
        if (container === window) {
            window.scrollTo(window.pageXOffset, nextScrollTop);
        } else {
            container.scrollTop = nextScrollTop;
        }
        if (time < 450) {
            reqAnimFrame(frameFunc);
        } else {
            callback();
        }
    };
    reqAnimFrame(frameFunc);
}

var Anchor = function (_Component) {
    (0, _inherits3['default'])(Anchor, _Component);

    function Anchor() {
        (0, _classCallCheck3['default'])(this, Anchor);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).apply(this, arguments));

        _this.state = {
            activeLink: null
        };
        _this.links = [];
        _this.handleScroll = function () {
            if (_this.animating) {
                return;
            }
            var _this$props = _this.props,
                offsetTop = _this$props.offsetTop,
                bounds = _this$props.bounds;

            _this.setState({
                activeLink: _this.getCurrentAnchor(offsetTop, bounds)
            });
        };
        _this.handleScrollTo = function (link) {
            var _this$props2 = _this.props,
                offsetTop = _this$props2.offsetTop,
                getContainer = _this$props2.getContainer;

            _this.animating = true;
            _this.setState({ activeLink: link });
            scrollTo(link, offsetTop, getContainer, function () {
                _this.animating = false;
            });
        };
        _this.updateInk = function () {
            if (typeof document === 'undefined') {
                return;
            }
            var prefixCls = _this.getPrefixCls();
            var linkNode = (0, _reactDom.findDOMNode)(_this).getElementsByClassName(prefixCls + '-link-title-active')[0];
            if (linkNode) {
                _this.inkNode.style.top = linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5 + 'px';
            }
        };
        _this.saveInkNode = function (node) {
            _this.inkNode = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Anchor, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _this2 = this;

            var c7nAnchor = {
                registerLink: function registerLink(link) {
                    if (!_this2.links.includes(link)) {
                        _this2.links.push(link);
                    }
                },
                unregisterLink: function unregisterLink(link) {
                    var index = _this2.links.indexOf(link);
                    if (index !== -1) {
                        _this2.links.splice(index, 1);
                    }
                },
                activeLink: this.state.activeLink,
                scrollTo: this.handleScrollTo,
                onClick: this.props.onClick
            };
            return { c7nAnchor: c7nAnchor };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var getContainer = this.props.getContainer;

            this.scrollEvent = (0, _addEventListener2['default'])(getContainer(), 'scroll', this.handleScroll);
            this.handleScroll();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.scrollEvent) {
                this.scrollEvent.remove();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateInk();
        }
    }, {
        key: 'getCurrentAnchor',
        value: function getCurrentAnchor() {
            var offsetTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

            var activeLink = '';
            if (typeof document === 'undefined') {
                return activeLink;
            }
            var linkSections = [];
            var getContainer = this.props.getContainer;

            var container = getContainer();
            this.links.forEach(function (link) {
                var sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
                if (!sharpLinkMatch) {
                    return;
                }
                var target = document.getElementById(sharpLinkMatch[1]);
                if (target) {
                    var top = getOffsetTop(target, container);
                    if (top < offsetTop + bounds) {
                        linkSections.push({
                            link: link,
                            top: top
                        });
                    }
                }
            });
            if (linkSections.length) {
                var maxSection = linkSections.reduce(function (prev, curr) {
                    return curr.top > prev.top ? curr : prev;
                });
                return maxSection.link;
            }
            return '';
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('anchor', this.props.prefixCls);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                style = _props.style,
                offsetTop = _props.offsetTop,
                affix = _props.affix,
                showInkInFixed = _props.showInkInFixed,
                children = _props.children,
                getContainer = _props.getContainer;
            var activeLink = this.state.activeLink;

            var prefixCls = this.getPrefixCls();
            var inkClass = (0, _classnames2['default'])(prefixCls + '-ink-ball', {
                visible: activeLink
            });
            var wrapperClass = (0, _classnames2['default'])(className, prefixCls + '-wrapper');
            var anchorClass = (0, _classnames2['default'])(prefixCls, {
                fixed: !affix && !showInkInFixed
            });
            var wrapperStyle = (0, _extends3['default'])({
                maxHeight: offsetTop ? 'calc(100vh - ' + offsetTop + 'px)' : '100vh'
            }, style);
            var anchorContent = _react2['default'].createElement(
                'div',
                { className: wrapperClass, style: wrapperStyle },
                _react2['default'].createElement(
                    'div',
                    { className: anchorClass },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-ink' },
                        _react2['default'].createElement('span', { className: inkClass, ref: this.saveInkNode })
                    ),
                    children
                )
            );
            return !affix ? anchorContent : _react2['default'].createElement(
                _affix2['default'],
                { offsetTop: offsetTop, target: getContainer },
                anchorContent
            );
        }
    }]);
    return Anchor;
}(_react.Component);

exports['default'] = Anchor;

Anchor.displayName = 'Anchor';
Anchor.defaultProps = {
    affix: true,
    showInkInFixed: false,
    getContainer: getDefaultContainer
};
Anchor.childContextTypes = {
    c7nAnchor: _propTypes2['default'].object
};
module.exports = exports['default'];