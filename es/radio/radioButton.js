import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';
import { getPrefixCls } from '../configure';

var RadioButton = function (_Component) {
    _inherits(RadioButton, _Component);

    function RadioButton() {
        _classCallCheck(this, RadioButton);

        return _possibleConstructorReturn(this, (RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).apply(this, arguments));
    }

    _createClass(RadioButton, [{
        key: 'render',
        value: function render() {
            var radioProps = _extends({}, this.props);
            if (this.context.radioGroup) {
                radioProps.onChange = this.context.radioGroup.onChange;
                radioProps.checked = this.props.value === this.context.radioGroup.value;
                radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
            }
            return React.createElement(Radio, _extends({ prefixCls: getPrefixCls('radio-button') }, radioProps));
        }
    }]);

    return RadioButton;
}(Component);

export default RadioButton;

RadioButton.displayName = 'RadioButton';
RadioButton.contextTypes = {
    radioGroup: PropTypes.any
};