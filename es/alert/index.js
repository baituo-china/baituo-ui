import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import noop from 'lodash/noop';
import Icon from '../icon';
import Animate from '../animate';
import { getPrefixCls } from '../configure';

var Alert = function (_Component) {
    _inherits(Alert, _Component);

    function Alert() {
        _classCallCheck(this, Alert);

        var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));

        _this.state = {
            closing: true,
            closed: false
        };
        _this.handleClose = function (e) {
            e.preventDefault();
            var dom = findDOMNode(_this);
            dom.style.height = dom.offsetHeight + 'px';
            // Magic code
            // 重复一次后才能正确设置 height
            dom.style.height = dom.offsetHeight + 'px';
            _this.setState({
                closing: false
            });
            (_this.props.onClose || noop)(e);
        };
        _this.animationEnd = function () {
            _this.setState({
                closed: true,
                closing: true
            });
            (_this.props.afterClose || noop)();
        };
        return _this;
    }

    _createClass(Alert, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                closable = _props.closable,
                description = _props.description,
                type = _props.type,
                customizePrefixCls = _props.prefixCls,
                message = _props.message,
                closeText = _props.closeText,
                showIcon = _props.showIcon,
                banner = _props.banner,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                style = _props.style,
                iconType = _props.iconType;

            var prefixCls = getPrefixCls('alert', customizePrefixCls);
            // banner模式默认有 Icon
            showIcon = banner && showIcon === undefined ? true : showIcon;
            // banner模式默认为警告
            type = banner && type === undefined ? 'warning' : type || 'info';
            if (!iconType) {
                switch (type) {
                    case 'success':
                        iconType = 'check-circle';
                        break;
                    case 'info':
                        iconType = 'info-circle';
                        break;
                    case 'error':
                        iconType = 'cross-circle';
                        break;
                    case 'warning':
                        iconType = 'exclamation-circle';
                        break;
                    default:
                        iconType = 'default';
                }
                // use outline icon in alert with description
                if (!!description) {
                    iconType += '-o';
                }
            }
            var alertCls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + type, true), _defineProperty(_classNames, prefixCls + '-close', !this.state.closing), _defineProperty(_classNames, prefixCls + '-with-description', !!description), _defineProperty(_classNames, prefixCls + '-no-icon', !showIcon), _defineProperty(_classNames, prefixCls + '-banner', !!banner), _classNames), className);
            // closeable when closeText is assigned
            if (closeText) {
                closable = true;
            }
            var closeIcon = closable ? React.createElement(
                'a',
                { onClick: this.handleClose, className: prefixCls + '-close-icon' },
                closeText || React.createElement(Icon, { type: 'cross' })
            ) : null;
            return this.state.closed ? null : React.createElement(
                Animate,
                { component: '', hiddenProp: 'hidden', transitionName: prefixCls + '-slide-up', onEnd: this.animationEnd },
                React.createElement(
                    'div',
                    { hidden: !this.state.closing, className: alertCls, style: style },
                    showIcon ? React.createElement(Icon, { className: prefixCls + '-icon', type: iconType }) : null,
                    React.createElement(
                        'span',
                        { className: prefixCls + '-message' },
                        message
                    ),
                    React.createElement(
                        'span',
                        { className: prefixCls + '-description' },
                        description
                    ),
                    closeIcon
                )
            );
        }
    }]);

    return Alert;
}(Component);

export default Alert;

Alert.displayName = 'Alert';