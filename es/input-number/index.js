import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';
import RcInputNumber from '../rc-components/input-number';
import { getPrefixCls } from '../configure';

var InputNumber = function (_Component) {
    _inherits(InputNumber, _Component);

    function InputNumber() {
        _classCallCheck(this, InputNumber);

        return _possibleConstructorReturn(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).apply(this, arguments));
    }

    _createClass(InputNumber, [{
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var _props = this.props,
                className = _props.className,
                size = _props.size,
                customizePrefixCls = _props.prefixCls,
                others = _objectWithoutProperties(_props, ['className', 'size', 'prefixCls']);

            var prefixCls = getPrefixCls('input-number', customizePrefixCls);
            var inputNumberClass = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === "large"), _defineProperty(_classNames, prefixCls + '-sm', size === "small"), _classNames), className);
            return React.createElement(RcInputNumber, _extends({ ref: function ref(c) {
                    return _this2.inputNumberRef = c;
                }, className: inputNumberClass, prefixCls: prefixCls }, others));
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.inputNumberRef.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.inputNumberRef.blur();
        }
    }]);

    return InputNumber;
}(Component);

export default InputNumber;

InputNumber.displayName = 'InputNumber';
InputNumber.defaultProps = {
    step: 1
};