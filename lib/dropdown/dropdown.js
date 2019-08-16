'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _dropdown = require('../rc-components/dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Dropdown = function (_Component) {
    (0, _inherits3['default'])(Dropdown, _Component);

    function Dropdown() {
        (0, _classCallCheck3['default'])(this, Dropdown);
        return (0, _possibleConstructorReturn3['default'])(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Dropdown, [{
        key: 'getTransitionName',
        value: function getTransitionName() {
            var _props = this.props,
                _props$placement = _props.placement,
                placement = _props$placement === undefined ? '' : _props$placement,
                transitionName = _props.transitionName;

            if (transitionName !== undefined) {
                return transitionName;
            }
            if (placement.indexOf('top') >= 0) {
                return 'slide-down';
            }
            return 'slide-up';
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var overlay = this.props.overlay;

            var overlayProps = overlay.props;
            (0, _warning2['default'])(!overlayProps.mode || overlayProps.mode === 'vertical', 'mode="' + overlayProps.mode + '" is not supported for Dropdown\'s Menu.');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                customizePrefixCls = _props2.prefixCls,
                overlayElements = _props2.overlay,
                trigger = _props2.trigger,
                disabled = _props2.disabled;

            var prefixCls = (0, _configure.getPrefixCls)('dropdown', customizePrefixCls);
            var child = _react.Children.only(children);
            var overlay = _react.Children.only(overlayElements);
            var dropdownTrigger = (0, _react.cloneElement)(child, {
                className: (0, _classnames2['default'])(child.props.className, prefixCls + '-trigger'),
                disabled: disabled
            });
            // menu cannot be selectable in dropdown defaultly
            var selectable = overlay.props.selectable || false;
            var fixedModeOverlay = (0, _react.cloneElement)(overlay, {
                mode: 'vertical',
                selectable: selectable
            });
            return _react2['default'].createElement(
                _dropdown2['default'],
                (0, _extends3['default'])({}, this.props, { prefixCls: prefixCls, transitionName: this.getTransitionName(), trigger: disabled ? [] : trigger, overlay: fixedModeOverlay }),
                dropdownTrigger
            );
        }
    }]);
    return Dropdown;
}(_react.Component);

exports['default'] = Dropdown;

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft'
};
module.exports = exports['default'];