import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, PureComponent } from 'react';
import RippleChild from './RippleChild';
import { getConfig, getPrefixCls } from '../configure';

var Ripple = function (_PureComponent) {
    _inherits(Ripple, _PureComponent);

    function Ripple() {
        _classCallCheck(this, Ripple);

        var _this = _possibleConstructorReturn(this, (Ripple.__proto__ || Object.getPrototypeOf(Ripple)).apply(this, arguments));

        _this.rippleChild = function (child) {
            return React.createElement(
                RippleChild,
                { prefixCls: getPrefixCls('ripple', _this.props.prefixCls) },
                child
            );
        };
        return _this;
    }

    _createClass(Ripple, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                disabled = _props.disabled,
                children = _props.children;

            if (disabled || !children || !getConfig('ripple')) {
                return children;
            }
            return Children.map(children, this.rippleChild);
        }
    }]);

    return Ripple;
}(PureComponent);

export default Ripple;

Ripple.displayName = 'Ripple';