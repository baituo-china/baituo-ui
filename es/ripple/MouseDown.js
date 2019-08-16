import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';

var MouseDown = function (_PureComponent) {
    _inherits(MouseDown, _PureComponent);

    function MouseDown() {
        _classCallCheck(this, MouseDown);

        var _this = _possibleConstructorReturn(this, (MouseDown.__proto__ || Object.getPrototypeOf(MouseDown)).apply(this, arguments));

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

    _createClass(MouseDown, [{
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
                _extends(newProps, {
                    onMouseUp: wrapEvent(element, 'onMouseUp', this.hide),
                    onMouseLeave: wrapEvent(element, 'onMouseLeave', this.hide),
                    onDragEnd: wrapEvent(element, 'onDragEnd', this.hide)
                });
            }
            return cloneElement(element, newProps);
        }
    }]);

    return MouseDown;
}(PureComponent);

export default MouseDown;

MouseDown.displayName = 'MouseDown';
MouseDown.propTypes = { rippleChild: PropTypes.node };
function wrapEvent(element, eventName, callback) {
    return function (e) {
        var originalEvent = element.props[eventName];
        if (originalEvent) {
            originalEvent(e);
        }
        callback(e);
    };
}