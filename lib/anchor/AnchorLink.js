'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnchorLink = function (_Component) {
    (0, _inherits3['default'])(AnchorLink, _Component);

    function AnchorLink() {
        (0, _classCallCheck3['default'])(this, AnchorLink);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (AnchorLink.__proto__ || Object.getPrototypeOf(AnchorLink)).apply(this, arguments));

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

    (0, _createClass3['default'])(AnchorLink, [{
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

            var prefixCls = (0, _configure.getPrefixCls)('anchor', customizePrefixCls);
            var active = this.context.c7nAnchor.activeLink === href;
            var wrapperClassName = (0, _classnames2['default'])(className, prefixCls + '-link', (0, _defineProperty3['default'])({}, prefixCls + '-link-active', active));
            var titleClassName = (0, _classnames2['default'])(prefixCls + '-link-title', (0, _defineProperty3['default'])({}, prefixCls + '-link-title-active', active));
            return _react2['default'].createElement(
                'div',
                { className: wrapperClassName },
                _react2['default'].createElement(
                    'a',
                    { className: titleClassName, href: href, title: typeof title === 'string' ? title : '', onClick: this.handleClick },
                    title
                ),
                children
            );
        }
    }]);
    return AnchorLink;
}(_react.Component);

exports['default'] = AnchorLink;

AnchorLink.displayName = 'AnchorLink';
AnchorLink.defaultProps = {
    href: '#'
};
AnchorLink.contextTypes = {
    c7nAnchor: _propTypes2['default'].object
};
module.exports = exports['default'];