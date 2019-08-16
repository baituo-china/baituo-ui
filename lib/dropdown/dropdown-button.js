'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ButtonGroup = _button2['default'].Group;

var DropdownButton = function (_Component) {
    (0, _inherits3['default'])(DropdownButton, _Component);

    function DropdownButton() {
        (0, _classCallCheck3['default'])(this, DropdownButton);
        return (0, _possibleConstructorReturn3['default'])(this, (DropdownButton.__proto__ || Object.getPrototypeOf(DropdownButton)).apply(this, arguments));
    }

    (0, _createClass3['default'])(DropdownButton, [{
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
                restProps = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'type', 'disabled', 'onClick', 'children', 'className', 'overlay', 'trigger', 'align', 'visible', 'onVisibleChange', 'placement', 'getPopupContainer']);

            var prefixCls = (0, _configure.getPrefixCls)('dropdown-button', customizePrefixCls);
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
            return _react2['default'].createElement(
                ButtonGroup,
                (0, _extends3['default'])({}, restProps, { className: (0, _classnames2['default'])(prefixCls, className) }),
                _react2['default'].createElement(
                    _button2['default'],
                    { type: type, disabled: disabled, onClick: onClick },
                    children
                ),
                _react2['default'].createElement(
                    _dropdown2['default'],
                    dropdownProps,
                    _react2['default'].createElement(
                        _button2['default'],
                        { type: type },
                        _react2['default'].createElement(_icon2['default'], { type: 'arrow_drop_down' })
                    )
                )
            );
        }
    }]);
    return DropdownButton;
}(_react.Component);

exports['default'] = DropdownButton;

DropdownButton.displayName = 'DropdownButton';
DropdownButton.defaultProps = {
    placement: 'bottomRight',
    type: 'default'
};
module.exports = exports['default'];