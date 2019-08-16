import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'lodash/isEqual';
import Radio from './radio';
import { getPrefixCls } from '../configure';
function getCheckedValue(children) {
    var value = null;
    var matched = false;
    Children.forEach(children, function (radio) {
        if (radio && radio.props && radio.props.checked) {
            value = radio.props.value;
            matched = true;
        }
    });
    return matched ? { value: value } : undefined;
}

var RadioGroup = function (_Component) {
    _inherits(RadioGroup, _Component);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _this.onRadioChange = function (ev) {
            var lastValue = _this.state.value;
            var value = ev.target.value;

            if (!('value' in _this.props)) {
                _this.setState({
                    value: value
                });
            }
            var onChange = _this.props.onChange;
            if (onChange && value !== lastValue) {
                onChange(ev);
            }
        };
        var value = void 0;
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            var checkedValue = getCheckedValue(props.children);
            value = checkedValue && checkedValue.value;
        }
        _this.state = {
            value: value
        };
        return _this;
    }

    _createClass(RadioGroup, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                radioGroup: {
                    onChange: this.onRadioChange,
                    value: this.state.value,
                    disabled: this.props.disabled,
                    name: this.props.name
                }
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            } else {
                var checkedValue = getCheckedValue(nextProps.children);
                if (checkedValue) {
                    this.setState({
                        value: checkedValue.value
                    });
                }
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames2,
                _this2 = this;

            var props = this.props;
            var customizePrefixCls = props.prefixCls,
                _props$className = props.className,
                className = _props$className === undefined ? '' : _props$className,
                options = props.options;

            var prefixCls = getPrefixCls('radio-group', customizePrefixCls);
            var classString = classNames(prefixCls, _defineProperty({}, prefixCls + '-' + props.size, props.size), className);
            var wrapperClassString = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-wrapper', true), _defineProperty(_classNames2, prefixCls + '-has-label', props.label), _classNames2));
            var labelClassString = classNames(prefixCls + '-label', {
                'label-disabled': props.disabled
            });
            var children = props.children;
            // 如果存在 options, 优先使用
            if (options && options.length > 0) {
                children = options.map(function (option, index) {
                    if (typeof option === 'string') {
                        // 此处类型自动推导为 string
                        return React.createElement(
                            Radio,
                            { key: index, disabled: _this2.props.disabled, value: option, onChange: _this2.onRadioChange, checked: _this2.state.value === option },
                            option
                        );
                    } else {
                        // 此处类型自动推导为 { label: string value: string }
                        return React.createElement(
                            Radio,
                            { key: index, disabled: option.disabled || _this2.props.disabled, value: option.value, onChange: _this2.onRadioChange, checked: _this2.state.value === option.value },
                            option.label
                        );
                    }
                });
            }
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
                    { className: classString, style: props.style, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave, id: props.id },
                    children
                )
            );
        }
    }]);

    return RadioGroup;
}(Component);

export default RadioGroup;

RadioGroup.displayName = 'RadioGroup';
RadioGroup.defaultProps = {
    disabled: false
};
RadioGroup.childContextTypes = {
    radioGroup: PropTypes.any
};