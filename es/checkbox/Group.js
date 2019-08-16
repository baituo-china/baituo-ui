import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'lodash/isEqual';
import Checkbox from './Checkbox';
import { getPrefixCls } from '../configure';

var CheckboxGroup = function (_Component) {
    _inherits(CheckboxGroup, _Component);

    function CheckboxGroup(props) {
        _classCallCheck(this, CheckboxGroup);

        var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

        _this.toggleOption = function (option) {
            var optionIndex = _this.state.value.indexOf(option.value);
            var value = [].concat(_toConsumableArray(_this.state.value));
            if (optionIndex === -1) {
                value.push(option.value);
            } else {
                value.splice(optionIndex, 1);
            }
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(value);
            }
        };
        _this.state = {
            value: props.value || props.defaultValue || []
        };
        return _this;
    }

    _createClass(CheckboxGroup, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                checkboxGroup: {
                    toggleOption: this.toggleOption,
                    value: this.state.value,
                    disabled: this.props.disabled
                }
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value || []
                });
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            var options = this.props.options;
            // https://github.com/Microsoft/TypeScript/issues/7960

            return options.map(function (option) {
                if (typeof option === 'string') {
                    return {
                        label: option,
                        value: option
                    };
                }
                return option;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this,
                _classNames;

            var props = this.props,
                state = this.state;
            var customizePrefixCls = props.prefixCls,
                className = props.className,
                style = props.style,
                options = props.options;

            var prefixCls = getPrefixCls('checkbox-group', customizePrefixCls);
            var children = props.children;
            if (options && options.length > 0) {
                children = this.getOptions().map(function (option) {
                    return React.createElement(
                        Checkbox,
                        { key: option.value, disabled: 'disabled' in option ? option.disabled : props.disabled, value: option.value, checked: state.value.indexOf(option.value) !== -1, onChange: function onChange() {
                                return _this2.toggleOption(option);
                            }, className: prefixCls + '-item' },
                        option.label
                    );
                });
            }
            var classString = classNames(prefixCls, className);
            var wrapperClassString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-wrapper', true), _defineProperty(_classNames, prefixCls + '-has-label', props.label), _classNames));
            var labelClassString = classNames(prefixCls + '-label', {
                'label-disabled': props.disabled
            });
            return React.createElement(
                'div',
                { className: wrapperClassString },
                props.label ? React.createElement(
                    'span',
                    { className: labelClassString },
                    props.label
                ) : null,
                React.createElement(
                    'div',
                    { className: classString, style: style },
                    children
                )
            );
        }
    }]);

    return CheckboxGroup;
}(Component);

export default CheckboxGroup;

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.defaultProps = {
    options: []
};
CheckboxGroup.propTypes = {
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func
};
CheckboxGroup.childContextTypes = {
    checkboxGroup: PropTypes.any
};