import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';
var ButtonGroup = Button.Group;

var DropdownButton = function (_Component) {
    _inherits(DropdownButton, _Component);

    function DropdownButton() {
        _classCallCheck(this, DropdownButton);

        return _possibleConstructorReturn(this, (DropdownButton.__proto__ || Object.getPrototypeOf(DropdownButton)).apply(this, arguments));
    }

    _createClass(DropdownButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                type = _props.type,
                disabled = _props.disabled,
                onClick = _props.onClick,
                children = _props.children,
                className = _props.className,
                overlay = _props.overlay,
                trigger = _props.trigger,
                align = _props.align,
                visible = _props.visible,
                onVisibleChange = _props.onVisibleChange,
                placement = _props.placement,
                getPopupContainer = _props.getPopupContainer,
                restProps = _objectWithoutProperties(_props, ['prefixCls', 'type', 'disabled', 'onClick', 'children', 'className', 'overlay', 'trigger', 'align', 'visible', 'onVisibleChange', 'placement', 'getPopupContainer']);

            var prefixCls = getPrefixCls('dropdown-button', customizePrefixCls);
            var dropdownProps = {
                align: align,
                overlay: overlay,
                disabled: disabled,
                trigger: disabled ? [] : trigger,
                onVisibleChange: onVisibleChange,
                placement: placement,
                getPopupContainer: getPopupContainer
            };
            if ('visible' in this.props) {
                dropdownProps.visible = visible;
            }
            return React.createElement(
                ButtonGroup,
                _extends({}, restProps, { className: classNames(prefixCls, className) }),
                React.createElement(
                    Button,
                    { type: type, disabled: disabled, onClick: onClick },
                    children
                ),
                React.createElement(
                    Dropdown,
                    dropdownProps,
                    React.createElement(
                        Button,
                        { type: type },
                        React.createElement(Icon, { type: 'arrow_drop_down' })
                    )
                )
            );
        }
    }]);

    return DropdownButton;
}(Component);

export default DropdownButton;

DropdownButton.displayName = 'DropdownButton';
DropdownButton.defaultProps = {
    placement: 'bottomRight',
    type: 'default'
};