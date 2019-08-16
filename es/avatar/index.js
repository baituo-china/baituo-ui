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
import isNumber from 'lodash/isNumber';
import Icon from '../icon';
import { getPrefixCls } from '../configure';

var Avatar = function (_Component) {
    _inherits(Avatar, _Component);

    function Avatar(props) {
        _classCallCheck(this, Avatar);

        var _this = _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

        _this.setScale = function () {
            var childrenNode = _this.avatarChildren;
            if (childrenNode) {
                var childrenWidth = childrenNode.offsetWidth;
                var avatarNode = findDOMNode(_this);
                var avatarWidth = avatarNode.getBoundingClientRect().width;
                // add 4px gap for each side to get better performance
                if (avatarWidth - 8 < childrenWidth) {
                    _this.setState({
                        scale: (avatarWidth - 8) / childrenWidth
                    });
                } else {
                    _this.setState({
                        scale: 1
                    });
                }
            }
        };
        _this.handleImgLoadError = function () {
            var onError = _this.props.onError;

            var errorFlag = onError ? onError() : undefined;
            if (errorFlag !== false) {
                _this.setState({ isImgExist: false });
            }
        };
        _this.state = {
            scale: 1,
            isImgExist: true
        };
        return _this;
    }

    _createClass(Avatar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setScale();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevProps.children !== this.props.children || prevState.scale !== this.state.scale && this.state.scale === 1 || prevState.isImgExist !== this.state.isImgExist) {
                this.setScale();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _classNames2,
                _this2 = this;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                shape = _props.shape,
                size = _props.size,
                src = _props.src,
                icon = _props.icon,
                className = _props.className,
                alt = _props.alt,
                others = _objectWithoutProperties(_props, ['prefixCls', 'shape', 'size', 'src', 'icon', 'className', 'alt']);

            var prefixCls = getPrefixCls('avatar', customizePrefixCls);
            var _state = this.state,
                isImgExist = _state.isImgExist,
                scale = _state.scale;

            var sizeCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === "large"), _defineProperty(_classNames, prefixCls + '-sm', size === "small"), _classNames));
            var classString = classNames(prefixCls, className, sizeCls, (_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-' + shape, shape), _defineProperty(_classNames2, prefixCls + '-image', src && isImgExist), _defineProperty(_classNames2, prefixCls + '-icon', icon), _classNames2));
            var sizeStyle = isNumber(size) ? {
                width: size,
                height: size,
                lineHeight: size + 'px',
                fontSize: icon ? size / 2 : 18
            } : {};
            var children = this.props.children;
            if (src && isImgExist) {
                children = React.createElement('img', { src: src, onError: this.handleImgLoadError, alt: alt });
            } else if (icon) {
                children = React.createElement(Icon, { type: icon });
            } else {
                var childrenNode = this.avatarChildren;
                if (childrenNode || scale !== 1) {
                    var transformString = 'scale(' + scale + ') translateX(-50%)';
                    var childrenStyle = {
                        msTransform: transformString,
                        WebkitTransform: transformString,
                        transform: transformString
                    };
                    var sizeChildrenStyle = isNumber(size) ? {
                        lineHeight: size + 'px'
                    } : {};
                    children = React.createElement(
                        'span',
                        { className: prefixCls + '-string', ref: function ref(span) {
                                return _this2.avatarChildren = span;
                            }, style: _extends({}, sizeChildrenStyle, childrenStyle) },
                        children
                    );
                } else {
                    children = React.createElement(
                        'span',
                        { className: prefixCls + '-string', ref: function ref(span) {
                                return _this2.avatarChildren = span;
                            } },
                        children
                    );
                }
            }
            return React.createElement(
                'span',
                _extends({}, others, { style: _extends({}, sizeStyle, others.style), className: classString }),
                children
            );
        }
    }]);

    return Avatar;
}(Component);

export default Avatar;

Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
    shape: 'circle',
    size: "default" /* default */
};