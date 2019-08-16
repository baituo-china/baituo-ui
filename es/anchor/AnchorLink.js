import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';

var AnchorLink = function (_Component) {
    _inherits(AnchorLink, _Component);

    function AnchorLink() {
        _classCallCheck(this, AnchorLink);

        var _this = _possibleConstructorReturn(this, (AnchorLink.__proto__ || Object.getPrototypeOf(AnchorLink)).apply(this, arguments));

        _this.handleClick = function (e) {
            var _this$context$c7nAnch = _this.context.c7nAnchor,
                scrollTo = _this$context$c7nAnch.scrollTo,
                onClick = _this$context$c7nAnch.onClick;
            var _this$props = _this.props,
                href = _this$props.href,
                title = _this$props.title;

            if (onClick) {
                onClick(e, { title: title, href: href });
            }
            scrollTo(href);
        };
        return _this;
    }

    _createClass(AnchorLink, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.context.c7nAnchor.registerLink(this.props.href);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_ref) {
            var prevHref = _ref.href;
            var href = this.props.href;

            if (prevHref !== href) {
                this.context.c7nAnchor.unregisterLink(prevHref);
                this.context.c7nAnchor.registerLink(href);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.c7nAnchor.unregisterLink(this.props.href);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                href = _props.href,
                title = _props.title,
                children = _props.children,
                className = _props.className;

            var prefixCls = getPrefixCls('anchor', customizePrefixCls);
            var active = this.context.c7nAnchor.activeLink === href;
            var wrapperClassName = classNames(className, prefixCls + '-link', _defineProperty({}, prefixCls + '-link-active', active));
            var titleClassName = classNames(prefixCls + '-link-title', _defineProperty({}, prefixCls + '-link-title-active', active));
            return React.createElement(
                'div',
                { className: wrapperClassName },
                React.createElement(
                    'a',
                    { className: titleClassName, href: href, title: typeof title === 'string' ? title : '', onClick: this.handleClick },
                    title
                ),
                children
            );
        }
    }]);

    return AnchorLink;
}(Component);

export default AnchorLink;

AnchorLink.displayName = 'AnchorLink';
AnchorLink.defaultProps = {
    href: '#'
};
AnchorLink.contextTypes = {
    c7nAnchor: PropTypes.object
};