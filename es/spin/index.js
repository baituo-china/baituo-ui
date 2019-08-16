import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';
import omit from 'lodash/omit';
import Animate from '../animate';
import Progress from '../progress/progress';
import { getPrefixCls } from '../configure';

var Spin = function (_Component) {
    _inherits(Spin, _Component);

    function Spin(props) {
        _classCallCheck(this, Spin);

        var _this = _possibleConstructorReturn(this, (Spin.__proto__ || Object.getPrototypeOf(Spin)).call(this, props));

        var spinning = props.spinning;
        _this.state = {
            spinning: spinning
        };
        return _this;
    }

    _createClass(Spin, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!isCssAnimationSupported()) {
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
            if (isValidElement(indicator)) {
                return cloneElement(indicator, {
                    className: classNames(indicator.props.className, dotClassName)
                });
            }
            return React.createElement(Progress, { width: this.getIndicatorWidth(size), className: dotClassName, type: "loading" /* loading */ });
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
                restProps = _objectWithoutProperties(_props2, ['className', 'size', 'prefixCls', 'tip', 'wrapperClassName', 'children', 'style']);

            var _state = this.state,
                spinning = _state.spinning,
                notCssAnimationSupported = _state.notCssAnimationSupported;

            var prefixCls = getPrefixCls('spin', customizePrefixCls);
            var spinClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-sm', size === "small"), _defineProperty(_classNames, prefixCls + '-lg', size === "large"), _defineProperty(_classNames, prefixCls + '-spinning', spinning), _defineProperty(_classNames, prefixCls + '-show-text', !!tip || notCssAnimationSupported), _classNames), className);
            // fix https://fb.me/react-unknown-prop
            var divProps = omit(restProps, ['spinning', 'delay', 'indicator']);
            var spinElement = React.createElement(
                'div',
                _extends({}, divProps, { className: spinClassName, style: style, key: 'loading' }),
                this.renderIndicator(prefixCls),
                tip ? React.createElement(
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
                var containerClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-container', true), _defineProperty(_classNames2, prefixCls + '-blur', spinning), _classNames2));
                return React.createElement(
                    Animate,
                    _extends({}, divProps, { component: 'div', className: animateClassName, transitionName: 'fade' }),
                    spinning && spinElement,
                    React.createElement(
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
}(Component);

export default Spin;

Spin.displayName = 'Spin';
Spin.defaultProps = {
    spinning: true,
    size: "default" /* default */
    , wrapperClassName: ''
};
Spin.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(["small" /* small */, "default" /* default */, "large" /* large */]),
    wrapperClassName: PropTypes.string,
    indicator: PropTypes.node
};