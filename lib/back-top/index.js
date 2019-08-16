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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _getScroll = require('../_util/getScroll');

var _getScroll2 = _interopRequireDefault(_getScroll);

var _getRequestAnimationFrame = require('../_util/getRequestAnimationFrame');

var _getRequestAnimationFrame2 = _interopRequireDefault(_getRequestAnimationFrame);

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _addEventListener = require('../_util/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var reqAnimFrame = (0, _getRequestAnimationFrame2['default'])();
var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
    var cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return cc / 2 * t * t * t + b;
    } else {
        return cc / 2 * ((t -= 2) * t * t + 2) + b;
    }
};
function getDefaultTarget() {
    return window;
}

var BackTop = function (_Component) {
    (0, _inherits3['default'])(BackTop, _Component);

    function BackTop() {
        (0, _classCallCheck3['default'])(this, BackTop);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (BackTop.__proto__ || Object.getPrototypeOf(BackTop)).apply(this, arguments));

        _this.state = {
            visible: false
        };
        _this.getCurrentScrollTop = function () {
            var getTarget = _this.props.target || getDefaultTarget;
            var targetNode = getTarget();
            if (targetNode === window) {
                return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            }
            return targetNode.scrollTop;
        };
        _this.scrollToTop = function (e) {
            var scrollTop = _this.getCurrentScrollTop();
            var startTime = Date.now();
            var frameFunc = function frameFunc() {
                var timestamp = Date.now();
                var time = timestamp - startTime;
                _this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
                if (time < 450) {
                    reqAnimFrame(frameFunc);
                }
            };
            reqAnimFrame(frameFunc);
            (_this.props.onClick || _noop2['default'])(e);
        };
        _this.handleScroll = function () {
            var _this$props = _this.props,
                visibilityHeight = _this$props.visibilityHeight,
                _this$props$target = _this$props.target,
                target = _this$props$target === undefined ? getDefaultTarget : _this$props$target;

            var scrollTop = (0, _getScroll2['default'])(target(), true);
            _this.setState({
                visible: scrollTop > visibilityHeight
            });
        };
        return _this;
    }

    (0, _createClass3['default'])(BackTop, [{
        key: 'setScrollTop',
        value: function setScrollTop(value) {
            var getTarget = this.props.target || getDefaultTarget;
            var targetNode = getTarget();
            if (targetNode === window) {
                document.body.scrollTop = value;
                document.documentElement.scrollTop = value;
            } else {
                targetNode.scrollTop = value;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var getTarget = this.props.target || getDefaultTarget;
            this.scrollEvent = (0, _addEventListener2['default'])(getTarget(), 'scroll', this.handleScroll);
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
        key: 'render',
        value: function render() {
            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                children = _props.children;

            var prefixCls = (0, _configure.getPrefixCls)('back-top', customizePrefixCls);
            var classString = (0, _classnames2['default'])(prefixCls, className);
            var defaultElement = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-content' },
                _react2['default'].createElement('div', { className: prefixCls + '-icon' })
            );
            // fix https://fb.me/react-unknown-prop
            var divProps = (0, _omit2['default'])(this.props, ['prefixCls', 'className', 'children', 'visibilityHeight', 'target']);
            var backTopBtn = this.state.visible ? _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({}, divProps, { className: classString, onClick: this.scrollToTop }),
                children || defaultElement
            ) : null;
            return _react2['default'].createElement(
                _animate2['default'],
                { component: '', transitionName: 'fade' },
                backTopBtn
            );
        }
    }]);
    return BackTop;
}(_react.Component);

exports['default'] = BackTop;

BackTop.displayName = 'BackTop';
BackTop.defaultProps = {
    visibilityHeight: 400
};
module.exports = exports['default'];