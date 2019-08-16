'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _checkbox = require('../rc-components/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Checkbox = function (_Component) {
    (0, _inherits3['default'])(Checkbox, _Component);

    function Checkbox() {
        (0, _classCallCheck3['default'])(this, Checkbox);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));

        _this.saveCheckbox = function (node) {
            _this.rcCheckbox = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Checkbox, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !(0, _isEqual2['default'])(this.props, nextProps) || !(0, _isEqual2['default'])(this.state, nextState) || !(0, _isEqual2['default'])(this.context.checkboxGroup, nextContext.checkboxGroup);
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
            var props = this.props,
                context = this.context;
            var customizePrefixCls = props.prefixCls,
                className = props.className,
                children = props.children,
                indeterminate = props.indeterminate,
                style = props.style,
                onMouseEnter = props.onMouseEnter,
                onMouseLeave = props.onMouseLeave,
                restProps = (0, _objectWithoutProperties3['default'])(props, ['prefixCls', 'className', 'children', 'indeterminate', 'style', 'onMouseEnter', 'onMouseLeave']);

            var prefixCls = (0, _configure.getPrefixCls)('checkbox', customizePrefixCls);
            var checkboxGroup = context.checkboxGroup;

            var checkboxProps = (0, _extends3['default'])({}, restProps);
            if (checkboxGroup) {
                checkboxProps.onChange = function () {
                    return checkboxGroup.toggleOption({ label: children, value: props.value });
                };
                checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
                checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
            }
            var classString = (0, _classnames2['default'])(className, (0, _defineProperty3['default'])({}, prefixCls + '-wrapper', true));
            var checkboxClass = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-indeterminate', indeterminate));
            return _react2['default'].createElement(
                'label',
                { className: classString, style: style, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
                _react2['default'].createElement(_checkbox2['default'], (0, _extends3['default'])({}, checkboxProps, { prefixCls: prefixCls, className: checkboxClass, ref: this.saveCheckbox })),
                children !== undefined ? _react2['default'].createElement(
                    'span',
                    null,
                    children
                ) : null
            );
        }
    }]);
    return Checkbox;
}(_react.Component);

exports['default'] = Checkbox;

Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
    indeterminate: false
};
Checkbox.contextTypes = {
    checkboxGroup: _propTypes2['default'].any
};
module.exports = exports['default'];