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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var MouseDown = function (_PureComponent) {
    (0, _inherits3['default'])(MouseDown, _PureComponent);

    function MouseDown() {
        (0, _classCallCheck3['default'])(this, MouseDown);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (MouseDown.__proto__ || Object.getPrototypeOf(MouseDown)).apply(this, arguments));

        _this.state = {};
        _this.show = function (e) {
            var currentTarget = e.currentTarget;

            var pos = currentTarget.getBoundingClientRect();
            _this.setState({
                size: {
                    x: e.clientX - pos.left,
                    y: e.clientY - pos.top,
                    width: currentTarget.clientWidth,
                    height: currentTarget.clientHeight,
                    position: document.defaultView && document.defaultView.getComputedStyle(currentTarget).position
                }
            });
        };
        _this.hide = function () {
            _this.setState({
                size: void 0
            });
        };
        return _this;
    }

    (0, _createClass3['default'])(MouseDown, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                rippleChild = _props.rippleChild;
            var size = this.state.size;

            var element = children(rippleChild, size);
            var newProps = {
                onMouseDown: wrapEvent(element, 'onMouseDown', this.show)
            };
            if (size) {
                (0, _extends3['default'])(newProps, {
                    onMouseUp: wrapEvent(element, 'onMouseUp', this.hide),
                    onMouseLeave: wrapEvent(element, 'onMouseLeave', this.hide),
                    onDragEnd: wrapEvent(element, 'onDragEnd', this.hide)
                });
            }
            return (0, _react.cloneElement)(element, newProps);
        }
    }]);
    return MouseDown;
}(_react.PureComponent);

exports['default'] = MouseDown;

MouseDown.displayName = 'MouseDown';
MouseDown.propTypes = { rippleChild: _propTypes2['default'].node };
function wrapEvent(element, eventName, callback) {
    return function (e) {
        var originalEvent = element.props[eventName];
        if (originalEvent) {
            originalEvent(e);
        }
        callback(e);
    };
}
module.exports = exports['default'];