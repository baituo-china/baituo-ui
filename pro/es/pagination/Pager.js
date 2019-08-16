import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import Button from '../button/Button';

var Pager = function (_PureComponent) {
    _inherits(Pager, _PureComponent);

    function Pager() {
        _classCallCheck(this, Pager);

        var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).apply(this, arguments));

        _this.handleClick = function () {
            var _this$props = _this.props,
                page = _this$props.page,
                onClick = _this$props.onClick;

            if (onClick) {
                onClick(page);
            }
        };
        return _this;
    }

    _createClass(Pager, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                active = _props.active,
                renderer = _props.renderer,
                page = _props.page,
                type = _props.type,
                disabled = _props.disabled,
                className = _props.className;

            return React.createElement(
                Button,
                { className: className, funcType: active ? "raised" /* raised */ : "flat" /* flat */, onClick: this.handleClick, color: active ? "blue" /* blue */ : void 0, disabled: disabled },
                renderer(page, type)
            );
        }
    }]);

    return Pager;
}(PureComponent);

export default Pager;

Pager.displayName = 'Pager';