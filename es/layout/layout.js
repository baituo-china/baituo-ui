import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';
function generator(props) {
    return function (BasicComponent) {
        var _a;
        return _a = function (_Component) {
            _inherits(Adapter, _Component);

            function Adapter() {
                _classCallCheck(this, Adapter);

                return _possibleConstructorReturn(this, (Adapter.__proto__ || Object.getPrototypeOf(Adapter)).apply(this, arguments));
            }

            _createClass(Adapter, [{
                key: 'render',
                value: function render() {
                    var customizePrefixCls = this.props.prefixCls;
                    var suffixCls = props.suffixCls;

                    return React.createElement(BasicComponent, _extends({}, this.props, { prefixCls: getPrefixCls(suffixCls, customizePrefixCls) }));
                }
            }]);

            return Adapter;
        }(Component), _a.displayName = props.displayName, _a;
    };
}

var Basic = function (_Component2) {
    _inherits(Basic, _Component2);

    function Basic() {
        _classCallCheck(this, Basic);

        return _possibleConstructorReturn(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).apply(this, arguments));
    }

    _createClass(Basic, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                children = _props.children,
                others = _objectWithoutProperties(_props, ['prefixCls', 'className', 'children']);

            var divCls = classNames(className, prefixCls);
            return React.createElement(
                'div',
                _extends({ className: divCls }, others),
                children
            );
        }
    }]);

    return Basic;
}(Component);

var BasicLayout = function (_Component3) {
    _inherits(BasicLayout, _Component3);

    function BasicLayout() {
        _classCallCheck(this, BasicLayout);

        var _this3 = _possibleConstructorReturn(this, (BasicLayout.__proto__ || Object.getPrototypeOf(BasicLayout)).apply(this, arguments));

        _this3.state = { siders: [] };
        return _this3;
    }

    _createClass(BasicLayout, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _this4 = this;

            return {
                siderHook: {
                    addSider: function addSider(id) {
                        _this4.setState({
                            siders: [].concat(_toConsumableArray(_this4.state.siders), [id])
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
                others = _objectWithoutProperties(_props2, ['prefixCls', 'className', 'children', 'hasSider']);

            var divCls = classNames(className, prefixCls, _defineProperty({}, prefixCls + '-has-sider', hasSider || this.state.siders.length > 0));
            return React.createElement(
                'div',
                _extends({ className: divCls }, others),
                children
            );
        }
    }]);

    return BasicLayout;
}(Component);

BasicLayout.childContextTypes = {
    siderHook: PropTypes.object
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
export default Layout;