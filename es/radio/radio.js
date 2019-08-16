import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'lodash/isEqual';
import RcCheckbox from '../rc-components/checkbox';
import { getPrefixCls } from '../configure';

var Radio = function (_Component) {
    _inherits(Radio, _Component);

    function Radio() {
        _classCallCheck(this, Radio);

        var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));

        _this.saveCheckbox = function (node) {
            _this.rcCheckbox = node;
        };
        return _this;
    }

    _createClass(Radio, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.rcCheckbox.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcCheckbox.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var props = this.props,
                context = this.context;

            var customizePrefixCls = props.prefixCls,
                className = props.className,
                children = props.children,
                style = props.style,
                restProps = _objectWithoutProperties(props, ['prefixCls', 'className', 'children', 'style']);

            var prefixCls = getPrefixCls('radio', customizePrefixCls);
            var radioGroup = context.radioGroup;

            var radioProps = _extends({}, restProps);
            if (radioGroup) {
                radioProps.name = radioGroup.name;
                radioProps.onChange = radioGroup.onChange;
                radioProps.checked = props.value === radioGroup.value;
                radioProps.disabled = props.disabled || radioGroup.disabled;
            }
            var wrapperClassString = classNames(className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-wrapper', true), _defineProperty(_classNames, prefixCls + '-wrapper-checked', radioProps.checked), _defineProperty(_classNames, prefixCls + '-wrapper-disabled', radioProps.disabled), _classNames));
            return React.createElement(
                'label',
                { className: wrapperClassString, style: style, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave },
                React.createElement(RcCheckbox, _extends({}, radioProps, { prefixCls: prefixCls, ref: this.saveCheckbox })),
                children !== undefined ? React.createElement(
                    'span',
                    null,
                    children
                ) : null
            );
        }
    }]);

    return Radio;
}(Component);

export default Radio;

Radio.displayName = 'Radio';
Radio.defaultProps = {
    type: 'radio'
};
Radio.contextTypes = {
    radioGroup: PropTypes.any
};