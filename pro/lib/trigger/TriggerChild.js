'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TriggerChild = function (_PureComponent) {
    (0, _inherits3['default'])(TriggerChild, _PureComponent);

    function TriggerChild(props, context) {
        (0, _classCallCheck3['default'])(this, TriggerChild);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TriggerChild.__proto__ || Object.getPrototypeOf(TriggerChild)).call(this, props, context));

        var createChains = function createChains(eventName) {
            return function (e) {
                var _this$props = _this.props,
                    handle = _this$props['on' + eventName],
                    children = _this$props.children;

                var child = _react.Children.only(children);
                if (handle) {
                    handle(eventName, child, e);
                } else if (child) {
                    var childHandle = child.props['on' + eventName];

                    if (childHandle) {
                        childHandle(e);
                    }
                }
            };
        };
        _this.handleContextMenu = createChains('ContextMenu');
        _this.handleClick = createChains('Click');
        _this.handleMouseDown = createChains('MouseDown');
        _this.handleMouseEnter = createChains('MouseEnter');
        _this.handleMouseLeave = createChains('MouseLeave');
        _this.handleFocus = createChains('Focus');
        _this.handleBlur = createChains('Blur');
        return _this;
    }

    (0, _createClass3['default'])(TriggerChild, [{
        key: 'render',
        value: function render() {
            return (0, _react.cloneElement)(_react.Children.only(this.props.children), {
                onContextMenu: this.handleContextMenu,
                onClick: this.handleClick,
                onMouseDown: this.handleMouseDown,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur
            });
        }
    }]);
    return TriggerChild;
}(_react.PureComponent);

exports['default'] = TriggerChild;

TriggerChild.displayName = 'TriggerChild';
TriggerChild.propTypes = {
    onContextMenu: _propTypes2['default'].func,
    onClick: _propTypes2['default'].func,
    onMouseDown: _propTypes2['default'].func,
    onMouseEnter: _propTypes2['default'].func,
    onMouseLeave: _propTypes2['default'].func,
    onFocus: _propTypes2['default'].func,
    onBlur: _propTypes2['default'].func
};
module.exports = exports['default'];