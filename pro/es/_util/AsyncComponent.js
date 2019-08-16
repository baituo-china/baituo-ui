import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Spin from '../spin';
import exception from './exception';
var asyncComponent = function asyncComponent(importComponent) {
    var AsyncComponent = function (_Component) {
        _inherits(AsyncComponent, _Component);

        function AsyncComponent() {
            _classCallCheck(this, AsyncComponent);

            var _this = _possibleConstructorReturn(this, (AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).apply(this, arguments));

            _this.state = {};
            return _this;
        }

        _createClass(AsyncComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                importComponent().then(function (_ref) {
                    var component = _ref['default'];

                    _this2.setState({ component: component });
                }, exception);
            }
        }, {
            key: 'render',
            value: function render() {
                var Cmp = this.state.component;

                return Cmp ? React.createElement(Cmp, this.props) : React.createElement(Spin, null);
            }
        }]);

        return AsyncComponent;
    }(Component);

    return AsyncComponent;
};
export default asyncComponent;