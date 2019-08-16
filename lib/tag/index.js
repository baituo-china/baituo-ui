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

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _CheckableTag = require('./CheckableTag');

var _CheckableTag2 = _interopRequireDefault(_CheckableTag);

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Tag = function (_Component) {
    (0, _inherits3['default'])(Tag, _Component);

    function Tag() {
        (0, _classCallCheck3['default'])(this, Tag);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).apply(this, arguments));

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
            var dom = (0, _reactDom.findDOMNode)(_this);
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

    (0, _createClass3['default'])(Tag, [{
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
                otherProps = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'closable', 'color', 'className', 'children', 'style']);

            var prefixCls = (0, _configure.getPrefixCls)('tag', customizePrefixCls);
            var _state = this.state,
                closing = _state.closing,
                closed = _state.closed;

            var closeIcon = closable ? _react2['default'].createElement(_icon2['default'], { type: 'close', onClick: this.close }) : '';
            var isPresetColor = this.isPresetColor(color);
            var classString = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + color, isPresetColor), (0, _defineProperty3['default'])(_classNames, prefixCls + '-has-color', color && !isPresetColor), (0, _defineProperty3['default'])(_classNames, prefixCls + '-close', closing), _classNames), className);
            // fix https://fb.me/react-unknown-prop
            var divProps = (0, _omit2['default'])(otherProps, ['onClose', 'afterClose']);
            var tagStyle = (0, _extends3['default'])({}, style);
            if (color && !isPresetColor) {
                tagStyle.backgroundColor = color;
            }
            var tag = closed ? null : _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({ hidden: closing }, divProps, { className: classString, style: tagStyle }),
                children,
                closeIcon
            );
            return _react2['default'].createElement(
                _animate2['default'],
                { component: '', hiddenProp: 'hidden', transitionName: prefixCls + '-zoom', transitionAppear: true, onEnd: this.animationEnd },
                tag
            );
        }
    }]);
    return Tag;
}(_react.Component);

exports['default'] = Tag;

Tag.displayName = 'Tag';
Tag.CheckableTag = _CheckableTag2['default'];
Tag.defaultProps = {
    closable: false
};
module.exports = exports['default'];