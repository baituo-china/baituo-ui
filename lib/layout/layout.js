'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function generator(props) {
    return function (BasicComponent) {
        var _a;
        return _a = function (_Component) {
            (0, _inherits3['default'])(Adapter, _Component);

            function Adapter() {
                (0, _classCallCheck3['default'])(this, Adapter);
                return (0, _possibleConstructorReturn3['default'])(this, (Adapter.__proto__ || Object.getPrototypeOf(Adapter)).apply(this, arguments));
            }

            (0, _createClass3['default'])(Adapter, [{
                key: 'render',
                value: function render() {
                    var customizePrefixCls = this.props.prefixCls;
                    var suffixCls = props.suffixCls;

                    return _react2['default'].createElement(BasicComponent, (0, _extends3['default'])({}, this.props, { prefixCls: (0, _configure.getPrefixCls)(suffixCls, customizePrefixCls) }));
                }
            }]);
            return Adapter;
        }(_react.Component), _a.displayName = props.displayName, _a;
    };
}

var Basic = function (_Component2) {
    (0, _inherits3['default'])(Basic, _Component2);

    function Basic() {
        (0, _classCallCheck3['default'])(this, Basic);
        return (0, _possibleConstructorReturn3['default'])(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Basic, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                children = _props.children,
                others = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'className', 'children']);

            var divCls = (0, _classnames2['default'])(className, prefixCls);
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({ className: divCls }, others),
                children
            );
        }
    }]);
    return Basic;
}(_react.Component);

var BasicLayout = function (_Component3) {
    (0, _inherits3['default'])(BasicLayout, _Component3);

    function BasicLayout() {
        (0, _classCallCheck3['default'])(this, BasicLayout);

        var _this3 = (0, _possibleConstructorReturn3['default'])(this, (BasicLayout.__proto__ || Object.getPrototypeOf(BasicLayout)).apply(this, arguments));

        _this3.state = { siders: [] };
        return _this3;
    }

    (0, _createClass3['default'])(BasicLayout, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _this4 = this;

            return {
                siderHook: {
                    addSider: function addSider(id) {
                        _this4.setState({
                            siders: [].concat((0, _toConsumableArray3['default'])(_this4.state.siders), [id])
                        });
                    },
                    removeSider: function removeSider(id) {
                        _this4.setState({
                            siders: _this4.state.siders.filter(function (currentId) {
                                return currentId !== id;
                            })
                        });
                    }
                }
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                className = _props2.className,
                children = _props2.children,
                hasSider = _props2.hasSider,
                others = (0, _objectWithoutProperties3['default'])(_props2, ['prefixCls', 'className', 'children', 'hasSider']);

            var divCls = (0, _classnames2['default'])(className, prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-has-sider', hasSider || this.state.siders.length > 0));
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({ className: divCls }, others),
                children
            );
        }
    }]);
    return BasicLayout;
}(_react.Component);

BasicLayout.childContextTypes = {
    siderHook: _propTypes2['default'].object
};
var Layout = generator({
    suffixCls: 'layout',
    displayName: 'Layout'
})(BasicLayout);
var Header = generator({
    suffixCls: 'layout-header',
    displayName: 'Header'
})(Basic);
var Footer = generator({
    suffixCls: 'layout-footer',
    displayName: 'Footer'
})(Basic);
var Content = generator({
    suffixCls: 'layout-content',
    displayName: 'Content'
})(Basic);
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
exports['default'] = Layout;
module.exports = exports['default'];