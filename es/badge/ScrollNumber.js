import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, createElement } from 'react';
import omit from 'lodash/omit';
import classNames from 'classnames';
import { getPrefixCls as _getPrefixCls } from '../configure';
function getNumberArray(num) {
    return num ? num.toString().split('').reverse().map(function (i) {
        return Number(i);
    }) : [];
}

var ScrollNumber = function (_Component) {
    _inherits(ScrollNumber, _Component);

    function ScrollNumber(props) {
        _classCallCheck(this, ScrollNumber);

        var _this = _possibleConstructorReturn(this, (ScrollNumber.__proto__ || Object.getPrototypeOf(ScrollNumber)).call(this, props));

        _this.renderCurrentNumber = function (num, i) {
            var position = _this.getPositionByNum(num, i);
            var removeTransition = _this.state.animateStarted || getNumberArray(_this.lastCount)[i] === undefined;
            return createElement('span', {
                className: _this.getPrefixCls() + '-only',
                style: {
                    transition: removeTransition && 'none',
                    msTransform: 'translateY(' + -position * 100 + '%)',
                    WebkitTransform: 'translateY(' + -position * 100 + '%)',
                    transform: 'translateY(' + -position * 100 + '%)'
                },
                key: i
            }, _this.renderNumberList(position));
        };
        _this.state = {
            animateStarted: true,
            count: props.count
        };
        return _this;
    }

    _createClass(ScrollNumber, [{
        key: 'getPositionByNum',
        value: function getPositionByNum(num, i) {
            if (this.state.animateStarted) {
                return 10 + num;
            }
            var currentDigit = getNumberArray(this.state.count)[i];
            var lastDigit = getNumberArray(this.lastCount)[i];
            // 同方向则在同一侧切换数字
            if (this.state.count > this.lastCount) {
                if (currentDigit >= lastDigit) {
                    return 10 + num;
                }
                return 20 + num;
            }
            if (currentDigit <= lastDigit) {
                return 10 + num;
            }
            return num;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if ('count' in nextProps) {
                if (this.state.count === nextProps.count) {
                    return;
                }
                this.lastCount = this.state.count;
                // 复原数字初始位置
                this.setState({
                    animateStarted: true
                }, function () {
                    // 等待数字位置复原完毕
                    // 开始设置完整的数字
                    setTimeout(function () {
                        _this2.setState({
                            animateStarted: false,
                            count: nextProps.count
                        }, function () {
                            var onAnimated = _this2.props.onAnimated;
                            if (onAnimated) {
                                onAnimated();
                            }
                        });
                    }, 5);
                });
            }
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return _getPrefixCls('scroll-number', this.props.prefixCls);
        }
    }, {
        key: 'renderNumberList',
        value: function renderNumberList(position) {
            var childrenToReturn = [];
            for (var i = 0; i < 30; i++) {
                var currentClassName = position === i ? 'current' : '';
                childrenToReturn.push(React.createElement(
                    'p',
                    { key: i.toString(), className: currentClassName },
                    i % 10
                ));
            }
            return childrenToReturn;
        }
    }, {
        key: 'renderNumberElement',
        value: function renderNumberElement() {
            var state = this.state;
            if (!state.count || isNaN(state.count)) {
                return state.count;
            }
            return getNumberArray(state.count).map(this.renderCurrentNumber).reverse();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                style = _props.style,
                _props$component = _props.component,
                component = _props$component === undefined ? 'sup' : _props$component;

            var restProps = omit(this.props, ['count', 'onAnimated', 'component', 'prefixCls']);
            var newProps = _extends({}, restProps, {
                className: classNames(this.getPrefixCls(), className)
            });
            if (style && style.borderColor) {
                newProps.style.boxShadow = '0 0 0 1px ' + style.borderColor + ' inset';
            }
            return createElement(component, newProps, this.renderNumberElement());
        }
    }]);

    return ScrollNumber;
}(Component);

export default ScrollNumber;

ScrollNumber.displayName = 'ScrollNumber';
ScrollNumber.defaultProps = {
    count: null,
    onAnimated: function onAnimated() {}
};