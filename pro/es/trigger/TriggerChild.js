import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';

var TriggerChild = function (_PureComponent) {
    _inherits(TriggerChild, _PureComponent);

    function TriggerChild(props, context) {
        _classCallCheck(this, TriggerChild);

        var _this = _possibleConstructorReturn(this, (TriggerChild.__proto__ || Object.getPrototypeOf(TriggerChild)).call(this, props, context));

        var createChains = function createChains(eventName) {
            return function (e) {
                var _this$props = _this.props,
                    handle = _this$props['on' + eventName],
                    children = _this$props.children;

                var child = Children.only(children);
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

    _createClass(TriggerChild, [{
        key: 'render',
        value: function render() {
            return cloneElement(Children.only(this.props.children), {
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
}(PureComponent);

export default TriggerChild;

TriggerChild.displayName = 'TriggerChild';
TriggerChild.propTypes = {
    onContextMenu: PropTypes.func,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};