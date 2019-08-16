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

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Avatar = function (_Component) {
    (0, _inherits3['default'])(Avatar, _Component);

    function Avatar(props) {
        (0, _classCallCheck3['default'])(this, Avatar);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

        _this.setScale = function () {
            var childrenNode = _this.avatarChildren;
            if (childrenNode) {
                var childrenWidth = childrenNode.offsetWidth;
                var avatarNode = (0, _reactDom.findDOMNode)(_this);
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

    (0, _createClass3['default'])(Avatar, [{
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
                others = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'shape', 'size', 'src', 'icon', 'className', 'alt']);

            var prefixCls = (0, _configure.getPrefixCls)('avatar', customizePrefixCls);
            var _state = this.state,
                isImgExist = _state.isImgExist,
                scale = _state.scale;

            var sizeCls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === "large"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === "small"), _classNames));
            var classString = (0, _classnames2['default'])(prefixCls, className, sizeCls, (_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-' + shape, shape), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-image', src && isImgExist), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-icon', icon), _classNames2));
            var sizeStyle = (0, _isNumber2['default'])(size) ? {
                width: size,
                height: size,
                lineHeight: size + 'px',
                fontSize: icon ? size / 2 : 18
            } : {};
            var children = this.props.children;
            if (src && isImgExist) {
                children = _react2['default'].createElement('img', { src: src, onError: this.handleImgLoadError, alt: alt });
            } else if (icon) {
                children = _react2['default'].createElement(_icon2['default'], { type: icon });
            } else {
                var childrenNode = this.avatarChildren;
                if (childrenNode || scale !== 1) {
                    var transformString = 'scale(' + scale + ') translateX(-50%)';
                    var childrenStyle = {
                        msTransform: transformString,
                        WebkitTransform: transformString,
                        transform: transformString
                    };
                    var sizeChildrenStyle = (0, _isNumber2['default'])(size) ? {
                        lineHeight: size + 'px'
                    } : {};
                    children = _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-string', ref: function ref(span) {
                                return _this2.avatarChildren = span;
                            }, style: (0, _extends3['default'])({}, sizeChildrenStyle, childrenStyle) },
                        children
                    );
                } else {
                    children = _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-string', ref: function ref(span) {
                                return _this2.avatarChildren = span;
                            } },
                        children
                    );
                }
            }
            return _react2['default'].createElement(
                'span',
                (0, _extends3['default'])({}, others, { style: (0, _extends3['default'])({}, sizeStyle, others.style), className: classString }),
                children
            );
        }
    }]);
    return Avatar;
}(_react.Component);

exports['default'] = Avatar;

Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
    shape: 'circle',
    size: "default" /* default */
};
module.exports = exports['default'];