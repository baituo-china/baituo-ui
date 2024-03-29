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

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getNumberArray(num) {
    return num ? num.toString().split('').reverse().map(function (i) {
        return Number(i);
    }) : [];
}

var ScrollNumber = function (_Component) {
    (0, _inherits3['default'])(ScrollNumber, _Component);

    function ScrollNumber(props) {
        (0, _classCallCheck3['default'])(this, ScrollNumber);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ScrollNumber.__proto__ || Object.getPrototypeOf(ScrollNumber)).call(this, props));

        _this.renderCurrentNumber = function (num, i) {
            var position = _this.getPositionByNum(num, i);
            var removeTransition = _this.state.animateStarted || getNumberArray(_this.lastCount)[i] === undefined;
            return (0, _react.createElement)('span', {
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

    (0, _createClass3['default'])(ScrollNumber, [{
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
            return (0, _configure.getPrefixCls)('scroll-number', this.props.prefixCls);
        }
    }, {
        key: 'renderNumberList',
        value: function renderNumberList(position) {
            var childrenToReturn = [];
            for (var i = 0; i < 30; i++) {
                var currentClassName = position === i ? 'current' : '';
                childrenToReturn.push(_react2['default'].createElement(
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

            var restProps = (0, _omit2['default'])(this.props, ['count', 'onAnimated', 'component', 'prefixCls']);
            var newProps = (0, _extends3['default'])({}, restProps, {
                className: (0, _classnames2['default'])(this.getPrefixCls(), className)
            });
            if (style && style.borderColor) {
                newProps.style.boxShadow = '0 0 0 1px ' + style.borderColor + ' inset';
            }
            return (0, _react.createElement)(component, newProps, this.renderNumberElement());
        }
    }]);
    return ScrollNumber;
}(_react.Component);

exports['default'] = ScrollNumber;

ScrollNumber.displayName = 'ScrollNumber';
ScrollNumber.defaultProps = {
    count: null,
    onAnimated: function onAnimated() {}
};
module.exports = exports['default'];