import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import Icon from '../icon';
import Ripple from '../ripple';
import { getPrefixCls } from '../configure';

var Button = function (_Component) {
    _inherits(Button, _Component);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

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

    _createClass(Button, [{
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
                others = _objectWithoutProperties(_props, ['prefixCls', 'type', 'shape', 'size', 'className', 'htmlType', 'children', 'icon', 'ghost', 'funcType']);

            var _state = this.state,
                loading = _state.loading,
                clicked = _state.clicked;

            var prefixCls = getPrefixCls('btn', customizePrefixCls);
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
            var classes = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + type, type), _defineProperty(_classNames, prefixCls + '-' + shape, shape), _defineProperty(_classNames, prefixCls + '-' + sizeCls, sizeCls), _defineProperty(_classNames, prefixCls + '-icon-only', !children && icon), _defineProperty(_classNames, prefixCls + '-loading', loading), _defineProperty(_classNames, prefixCls + '-clicked', clicked), _defineProperty(_classNames, prefixCls + '-background-ghost', ghost), _defineProperty(_classNames, prefixCls + '-' + funcType, funcType), _classNames));
            var iconNode = icon ? React.createElement(Icon, { type: icon }) : null;
            iconNode = loading ? React.createElement(
                'div',
                { className: 'btn-loading' },
                React.createElement('span', { className: 'dot1' }),
                React.createElement('span', { className: 'dot2' }),
                React.createElement('span', { className: 'dot3' })
            ) : iconNode;
            var kids = children || children === 0 ? Children.map(children, function (child) {
                if (typeof child === 'string') {
                    return React.createElement(
                        'span',
                        null,
                        child
                    );
                }
                return child;
            }) : null;
            return React.createElement(
                Ripple,
                { disabled: others.disabled },
                React.createElement(
                    ComponentProp,
                    _extends({}, omit(others, ['loading']), {
                        // 如果没有href属性，则表示组件使用button标签，type为'submit' | 'reset' | 'button'
                        type: others.href ? undefined : htmlType || 'button', className: classes, onClick: this.handleClick }),
                    iconNode,
                    kids
                )
            );
        }
    }]);

    return Button;
}(Component);

export default Button;

Button.displayName = 'Button';
Button.__ANT_BUTTON = true;
Button.defaultProps = {
    loading: false,
    ghost: false,
    funcType: 'flat'
};
Button.propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'circle-outline']),
    size: PropTypes.oneOf(["large" /* large */, "default" /* default */, "small" /* small */]),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    icon: PropTypes.string,
    funcType: PropTypes.oneOf(['raised', 'flat'])
};