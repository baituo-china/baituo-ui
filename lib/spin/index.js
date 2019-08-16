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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isCssAnimationSupported = require('../_util/isCssAnimationSupported');

var _isCssAnimationSupported2 = _interopRequireDefault(_isCssAnimationSupported);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _progress = require('../progress/progress');

var _progress2 = _interopRequireDefault(_progress);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Spin = function (_Component) {
    (0, _inherits3['default'])(Spin, _Component);

    function Spin(props) {
        (0, _classCallCheck3['default'])(this, Spin);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Spin.__proto__ || Object.getPrototypeOf(Spin)).call(this, props));

        var spinning = props.spinning;
        _this.state = {
            spinning: spinning
        };
        return _this;
    }

    (0, _createClass3['default'])(Spin, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!(0, _isCssAnimationSupported2['default'])()) {
                // Show text in IE9
                this.setState({
                    notCssAnimationSupported: true
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var currentSpinning = this.props.spinning;
            var spinning = nextProps.spinning;
            var delay = this.props.delay;

            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            if (currentSpinning && !spinning) {
                this.debounceTimeout = window.setTimeout(function () {
                    return _this2.setState({ spinning: spinning });
                }, 200);
                if (this.delayTimeout) {
                    clearTimeout(this.delayTimeout);
                }
            } else {
                if (spinning && delay && !isNaN(Number(delay))) {
                    if (this.delayTimeout) {
                        clearTimeout(this.delayTimeout);
                    }
                    this.delayTimeout = window.setTimeout(function () {
                        return _this2.setState({ spinning: spinning });
                    }, delay);
                } else {
                    this.setState({ spinning: spinning });
                }
            }
        }
    }, {
        key: 'getIndicatorWidth',
        value: function getIndicatorWidth(size) {
            switch (size) {
                case "small" /* small */:
                    return 20;
                case "large" /* large */:
                    return 50;
                default:
                    return 30;
            }
        }
    }, {
        key: 'renderIndicator',
        value: function renderIndicator(prefixCls) {
            var _props = this.props,
                indicator = _props.indicator,
                size = _props.size;

            var dotClassName = prefixCls + '-dot';
            if ((0, _react.isValidElement)(indicator)) {
                return (0, _react.cloneElement)(indicator, {
                    className: (0, _classnames2['default'])(indicator.props.className, dotClassName)
                });
            }
            return _react2['default'].createElement(_progress2['default'], { width: this.getIndicatorWidth(size), className: dotClassName, type: "loading" /* loading */ });
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props2 = this.props,
                className = _props2.className,
                size = _props2.size,
                customizePrefixCls = _props2.prefixCls,
                tip = _props2.tip,
                wrapperClassName = _props2.wrapperClassName,
                children = _props2.children,
                style = _props2.style,
                restProps = (0, _objectWithoutProperties3['default'])(_props2, ['className', 'size', 'prefixCls', 'tip', 'wrapperClassName', 'children', 'style']);
            var _state = this.state,
                spinning = _state.spinning,
                notCssAnimationSupported = _state.notCssAnimationSupported;

            var prefixCls = (0, _configure.getPrefixCls)('spin', customizePrefixCls);
            var spinClassName = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === "small"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === "large"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-spinning', spinning), (0, _defineProperty3['default'])(_classNames, prefixCls + '-show-text', !!tip || notCssAnimationSupported), _classNames), className);
            // fix https://fb.me/react-unknown-prop
            var divProps = (0, _omit2['default'])(restProps, ['spinning', 'delay', 'indicator']);
            var spinElement = _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({}, divProps, { className: spinClassName, style: style, key: 'loading' }),
                this.renderIndicator(prefixCls),
                tip ? _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-text' },
                    tip
                ) : null
            );
            if (children) {
                var _classNames2;

                var animateClassName = prefixCls + '-nested-loading';
                if (wrapperClassName) {
                    animateClassName += ' ' + wrapperClassName;
                }
                var containerClassName = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-container', true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-blur', spinning), _classNames2));
                return _react2['default'].createElement(
                    _animate2['default'],
                    (0, _extends3['default'])({}, divProps, { component: 'div', className: animateClassName, transitionName: 'fade' }),
                    spinning && spinElement,
                    _react2['default'].createElement(
                        'div',
                        { className: containerClassName, key: 'container' },
                        children
                    )
                );
            }
            return spinElement;
        }
    }]);
    return Spin;
}(_react.Component);

exports['default'] = Spin;

Spin.displayName = 'Spin';
Spin.defaultProps = {
    spinning: true,
    size: "default" /* default */
    , wrapperClassName: ''
};
Spin.propTypes = {
    prefixCls: _propTypes2['default'].string,
    className: _propTypes2['default'].string,
    spinning: _propTypes2['default'].bool,
    size: _propTypes2['default'].oneOf(["small" /* small */, "default" /* default */, "large" /* large */]),
    wrapperClassName: _propTypes2['default'].string,
    indicator: _propTypes2['default'].node
};
module.exports = exports['default'];