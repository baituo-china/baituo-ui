import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import omit from 'lodash/omit';
import Icon from '../icon';
import CheckableTag from './CheckableTag';
import Animate from '../animate';
import { getPrefixCls } from '../configure';

var Tag = function (_Component) {
    _inherits(Tag, _Component);

    function Tag() {
        _classCallCheck(this, Tag);

        var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).apply(this, arguments));

        _this.state = {
            closing: false,
            closed: false
        };
        _this.close = function (e) {
            var onClose = _this.props.onClose;
            if (onClose) {
                onClose(e);
            }
            if (e.defaultPrevented) {
                return;
            }
            var dom = findDOMNode(_this);
            dom.style.width = dom.getBoundingClientRect().width + 'px';
            // It's Magic Code, don't know why
            dom.style.width = dom.getBoundingClientRect().width + 'px';
            _this.setState({
                closing: true
            });
        };
        _this.animationEnd = function (_, existed) {
            if (!existed && !_this.state.closed) {
                _this.setState({
                    closed: true,
                    closing: false
                });
                var afterClose = _this.props.afterClose;
                if (afterClose) {
                    afterClose();
                }
            }
        };
        return _this;
    }

    _createClass(Tag, [{
        key: 'isPresetColor',
        value: function isPresetColor(color) {
            if (!color) {
                return false;
            }
            return (/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(color)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                closable = _props.closable,
                color = _props.color,
                className = _props.className,
                children = _props.children,
                style = _props.style,
                otherProps = _objectWithoutProperties(_props, ['prefixCls', 'closable', 'color', 'className', 'children', 'style']);

            var prefixCls = getPrefixCls('tag', customizePrefixCls);
            var _state = this.state,
                closing = _state.closing,
                closed = _state.closed;

            var closeIcon = closable ? React.createElement(Icon, { type: 'close', onClick: this.close }) : '';
            var isPresetColor = this.isPresetColor(color);
            var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + color, isPresetColor), _defineProperty(_classNames, prefixCls + '-has-color', color && !isPresetColor), _defineProperty(_classNames, prefixCls + '-close', closing), _classNames), className);
            // fix https://fb.me/react-unknown-prop
            var divProps = omit(otherProps, ['onClose', 'afterClose']);
            var tagStyle = _extends({}, style);
            if (color && !isPresetColor) {
                tagStyle.backgroundColor = color;
            }
            var tag = closed ? null : React.createElement(
                'div',
                _extends({ hidden: closing }, divProps, { className: classString, style: tagStyle }),
                children,
                closeIcon
            );
            return React.createElement(
                Animate,
                { component: '', hiddenProp: 'hidden', transitionName: prefixCls + '-zoom', transitionAppear: true, onEnd: this.animationEnd },
                tag
            );
        }
    }]);

    return Tag;
}(Component);

export default Tag;

Tag.displayName = 'Tag';
Tag.CheckableTag = CheckableTag;
Tag.defaultProps = {
    closable: false
};