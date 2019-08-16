import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Tooltip from '../tooltip';
import RcSlider, { Handle as RcHandle, Range as RcRange } from '../rc-components/slider';
import { getPrefixCls } from '../configure';

var Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

        _this.toggleTooltipVisible = function (index, visible) {
            _this.setState(function (_ref) {
                var visibles = _ref.visibles;
                return {
                    visibles: _extends({}, visibles, _defineProperty({}, index, visible))
                };
            });
        };
        _this.handleWithTooltip = function (_ref2) {
            var value = _ref2.value,
                dragging = _ref2.dragging,
                index = _ref2.index,
                restProps = _objectWithoutProperties(_ref2, ['value', 'dragging', 'index']);

            var _this$props = _this.props,
                customizeTooltipPrefixCls = _this$props.tooltipPrefixCls,
                tipFormatter = _this$props.tipFormatter;

            var tooltipPrefixCls = getPrefixCls('tooltip', customizeTooltipPrefixCls);
            var visibles = _this.state.visibles;

            var visible = tipFormatter ? visibles[index] || dragging : false;
            return React.createElement(
                Tooltip,
                { prefixCls: tooltipPrefixCls, title: tipFormatter ? tipFormatter(value) : '', visible: visible, placement: 'top', transitionName: 'zoom-down', key: index },
                React.createElement(RcHandle, _extends({}, restProps, { value: value, onMouseEnter: function onMouseEnter() {
                        return _this.toggleTooltipVisible(index, true);
                    }, onMouseLeave: function onMouseLeave() {
                        return _this.toggleTooltipVisible(index, false);
                    } }))
            );
        };
        _this.saveSlider = function (node) {
            _this.rcSlider = node;
        };
        _this.state = {
            visibles: {}
        };
        return _this;
    }

    _createClass(Slider, [{
        key: 'focus',
        value: function focus() {
            this.rcSlider.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcSlider.focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                range = _props.range,
                customizePrefixCls = _props.prefixCls,
                restProps = _objectWithoutProperties(_props, ['range', 'prefixCls']);

            var prefixCls = getPrefixCls('slider', customizePrefixCls);
            if (range) {
                return React.createElement(RcRange, _extends({}, restProps, { ref: this.saveSlider, handle: this.handleWithTooltip, prefixCls: prefixCls }));
            }
            return React.createElement(RcSlider, _extends({}, restProps, { ref: this.saveSlider, handle: this.handleWithTooltip, prefixCls: prefixCls }));
        }
    }]);

    return Slider;
}(Component);

export default Slider;

Slider.displayName = 'Slider';
Slider.defaultProps = {
    tipFormatter: function tipFormatter(value) {
        return value.toString();
    }
};