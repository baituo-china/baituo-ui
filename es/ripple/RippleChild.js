import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, cloneElement, isValidElement, PureComponent } from 'react';
import Animate from '../animate';
import MouseDown from './MouseDown';

var RippleChild = function (_PureComponent) {
    _inherits(RippleChild, _PureComponent);

    function RippleChild() {
        _classCallCheck(this, RippleChild);

        var _this = _possibleConstructorReturn(this, (RippleChild.__proto__ || Object.getPrototypeOf(RippleChild)).apply(this, arguments));

        _this.handleMouseDown = function (child, size) {
            var prefixCls = _this.props.prefixCls;
            var _child$props = child.props,
                children = _child$props.children,
                style = _child$props.style;

            var componentProps = {
                className: prefixCls + '-wrapper'
            };
            if (size) {
                var x = size.x,
                    y = size.y,
                    width = size.width,
                    height = size.height;

                var maxWidth = Math.max(width - x, x);
                var maxHeight = Math.max(height - y, y);
                var max = Math.sqrt(maxWidth * maxWidth + maxHeight * maxHeight);
                _this.currentCircleStyle = {
                    width: max + max,
                    height: max + max,
                    left: x - max,
                    top: y - max
                };
            }
            var newProps = {
                children: [children, React.createElement(
                    Animate,
                    { key: 'ripple', component: 'div', componentProps: componentProps, transitionName: size ? 'zoom-small-slow' : 'fade', hiddenProp: 'hidden' },
                    _this.currentCircleStyle && React.createElement('div', { hidden: !size, className: prefixCls, key: 'circle', style: _this.currentCircleStyle })
                )],
                style: _this.currentStyle || style
            };
            if (size && size.position === 'static') {
                newProps.style = _this.currentStyle = _extends({}, style, { position: 'relative' });
            }
            return cloneElement(child, newProps);
        };
        _this.ripple = function (child) {
            if (isValidElement(child)) {
                return React.createElement(
                    MouseDown,
                    { rippleChild: child },
                    _this.handleMouseDown
                );
            }
            return child;
        };
        return _this;
    }

    _createClass(RippleChild, [{
        key: 'render',
        value: function render() {
            return this.ripple(Children.only(this.props.children));
        }
    }]);

    return RippleChild;
}(PureComponent);

export default RippleChild;

RippleChild.displayName = 'RippleChild';