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

var Radio = function (_Component) {
    (0, _inherits3['default'])(Radio, _Component);

    function Radio() {
        (0, _classCallCheck3['default'])(this, Radio);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));

        _this.saveCheckbox = function (node) {
            _this.rcCheckbox = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Radio, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !(0, _isEqual2['default'])(this.props, nextProps) || !(0, _isEqual2['default'])(this.state, nextState) || !(0, _isEqual2['default'])(this.context.radioGroup, nextContext.radioGroup);
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
                restProps = (0, _objectWithoutProperties3['default'])(props, ['prefixCls', 'className', 'children', 'style']);

            var prefixCls = (0, _configure.getPrefixCls)('radio', customizePrefixCls);
            var radioGroup = context.radioGroup;

            var radioProps = (0, _extends3['default'])({}, restProps);
            if (radioGroup) {
                radioProps.name = radioGroup.name;
                radioProps.onChange = radioGroup.onChange;
                radioProps.checked = props.value === radioGroup.value;
                radioProps.disabled = props.disabled || radioGroup.disabled;
            }
            var wrapperClassString = (0, _classnames2['default'])(className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-wrapper', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-wrapper-checked', radioProps.checked), (0, _defineProperty3['default'])(_classNames, prefixCls + '-wrapper-disabled', radioProps.disabled), _classNames));
            return _react2['default'].createElement(
                'label',
                { className: wrapperClassString, style: style, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave },
                _react2['default'].createElement(_checkbox2['default'], (0, _extends3['default'])({}, radioProps, { prefixCls: prefixCls, ref: this.saveCheckbox })),
                children !== undefined ? _react2['default'].createElement(
                    'span',
                    null,
                    children
                ) : null
            );
        }
    }]);
    return Radio;
}(_react.Component);

exports['default'] = Radio;

Radio.displayName = 'Radio';
Radio.defaultProps = {
    type: 'radio'
};
Radio.contextTypes = {
    radioGroup: _propTypes2['default'].any
};
module.exports = exports['default'];