import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, cloneElement, Component } from 'react';
import classNames from 'classnames';
import warning from '../_util/warning';
import RcDropdown from '../rc-components/dropdown';
import { getPrefixCls } from '../configure';

var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
        _classCallCheck(this, Dropdown);

        return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
    }

    _createClass(Dropdown, [{
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
            warning(!overlayProps.mode || overlayProps.mode === 'vertical', 'mode="' + overlayProps.mode + '" is not supported for Dropdown\'s Menu.');
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

            var prefixCls = getPrefixCls('dropdown', customizePrefixCls);
            var child = Children.only(children);
            var overlay = Children.only(overlayElements);
            var dropdownTrigger = cloneElement(child, {
                className: classNames(child.props.className, prefixCls + '-trigger'),
                disabled: disabled
            });
            // menu cannot be selectable in dropdown defaultly
            var selectable = overlay.props.selectable || false;
            var fixedModeOverlay = cloneElement(overlay, {
                mode: 'vertical',
                selectable: selectable
            });
            return React.createElement(
                RcDropdown,
                _extends({}, this.props, { prefixCls: prefixCls, transitionName: this.getTransitionName(), trigger: disabled ? [] : trigger, overlay: fixedModeOverlay }),
                dropdownTrigger
            );
        }
    }]);

    return Dropdown;
}(Component);

export default Dropdown;

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft'
};