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

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Button = function (_Component) {
    (0, _inherits3['default'])(Button, _Component);

    function Button(props) {
        (0, _classCallCheck3['default'])(this, Button);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.handleClick = function (e) {
            clearTimeout(_this.timeout);
            _this.timeout = window.setTimeout(function () {
                return _this.setState({ clicked: false });
            }, 500);
            var onClick = _this.props.onClick;
            if (onClick) {
                onClick(e);
            }
        };
        _this.state = {
            loading: props.loading,
            clicked: false
        };
        return _this;
    }

    (0, _createClass3['default'])(Button, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var currentLoading = this.props.loading;
            var loading = nextProps.loading;
            if (currentLoading) {
                clearTimeout(this.delayTimeout);
            }
            if (typeof loading !== 'boolean' && loading && loading.delay) {
                this.delayTimeout = window.setTimeout(function () {
                    return _this2.setState({ loading: loading });
                }, loading.delay);
            } else {
                this.setState({ loading: loading });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                type = _props.type,
                shape = _props.shape,
                size = _props.size,
                className = _props.className,
                htmlType = _props.htmlType,
                children = _props.children,
                icon = _props.icon,
                ghost = _props.ghost,
                funcType = _props.funcType,
                others = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'type', 'shape', 'size', 'className', 'htmlType', 'children', 'icon', 'ghost', 'funcType']);
            var _state = this.state,
                loading = _state.loading,
                clicked = _state.clicked;

            var prefixCls = (0, _configure.getPrefixCls)('btn', customizePrefixCls);
            // large => lg
            // small => sm
            var sizeCls = '';
            switch (size) {
                case "large" /* large */:
                    sizeCls = 'lg';
                    break;
                case "small" /* small */:
                    sizeCls = 'sm';
                default:
                    break;
            }
            var ComponentProp = others.href ? 'a' : 'button';
            var classes = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + type, type), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + shape, shape), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + sizeCls, sizeCls), (0, _defineProperty3['default'])(_classNames, prefixCls + '-icon-only', !children && icon), (0, _defineProperty3['default'])(_classNames, prefixCls + '-loading', loading), (0, _defineProperty3['default'])(_classNames, prefixCls + '-clicked', clicked), (0, _defineProperty3['default'])(_classNames, prefixCls + '-background-ghost', ghost), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + funcType, funcType), _classNames));
            var iconNode = icon ? _react2['default'].createElement(_icon2['default'], { type: icon }) : null;
            iconNode = loading ? _react2['default'].createElement(
                'div',
                { className: 'btn-loading' },
                _react2['default'].createElement('span', { className: 'dot1' }),
                _react2['default'].createElement('span', { className: 'dot2' }),
                _react2['default'].createElement('span', { className: 'dot3' })
            ) : iconNode;
            var kids = children || children === 0 ? _react.Children.map(children, function (child) {
                if (typeof child === 'string') {
                    return _react2['default'].createElement(
                        'span',
                        null,
                        child
                    );
                }
                return child;
            }) : null;
            return _react2['default'].createElement(
                _ripple2['default'],
                { disabled: others.disabled },
                _react2['default'].createElement(
                    ComponentProp,
                    (0, _extends3['default'])({}, (0, _omit2['default'])(others, ['loading']), {
                        // 如果没有href属性，则表示组件使用button标签，type为'submit' | 'reset' | 'button'
                        type: others.href ? undefined : htmlType || 'button', className: classes, onClick: this.handleClick }),
                    iconNode,
                    kids
                )
            );
        }
    }]);
    return Button;
}(_react.Component);

exports['default'] = Button;

Button.displayName = 'Button';
Button.__ANT_BUTTON = true;
Button.defaultProps = {
    loading: false,
    ghost: false,
    funcType: 'flat'
};
Button.propTypes = {
    type: _propTypes2['default'].string,
    shape: _propTypes2['default'].oneOf(['circle', 'circle-outline']),
    size: _propTypes2['default'].oneOf(["large" /* large */, "default" /* default */, "small" /* small */]),
    htmlType: _propTypes2['default'].oneOf(['submit', 'button', 'reset']),
    onClick: _propTypes2['default'].func,
    loading: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
    className: _propTypes2['default'].string,
    icon: _propTypes2['default'].string,
    funcType: _propTypes2['default'].oneOf(['raised', 'flat'])
};
module.exports = exports['default'];