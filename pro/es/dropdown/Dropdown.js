import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, isValidElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Trigger from '../trigger/Trigger';
import placements from './placements';
import { getProPrefixCls } from '../../../es/configure';

var Dropdown = function (_PureComponent) {
    _inherits(Dropdown, _PureComponent);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        /**
         * 调用传入的onHiddenChange方法
         *
         * @param {boolean} hidden
         */
        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.handlePopupHiddenChange = function (hidden) {
            var _this$props = _this.props,
                onHiddenChange = _this$props.onHiddenChange,
                onVisibleChange = _this$props.onVisibleChange,
                propsHidden = _this$props.hidden,
                propsVisible = _this$props.visible;

            if (propsHidden === void 0 && propsVisible === void 0) {
                _this.setState({
                    hidden: hidden
                });
            }
            if (onHiddenChange) {
                onHiddenChange(hidden);
            }
            if (onVisibleChange) {
                onVisibleChange(!hidden);
            }
        };
        _this.handleClick = function (e) {
            var _this$props2 = _this.props,
                onOverlayClick = _this$props2.onOverlayClick,
                overlay = _this$props2.overlay,
                hidden = _this$props2.hidden,
                visible = _this$props2.visible;

            var _ref = isValidElement(overlay) && overlay.props || {},
                onClick = _ref.onClick;

            if (onOverlayClick) {
                onOverlayClick(e);
            }
            if (onClick) {
                onClick(e);
            }
            if (hidden === void 0 && visible === void 0) {
                _this.setState({
                    hidden: true
                });
            }
        };
        if ('hidden' in props) {
            _this.state = {
                hidden: props.hidden
            };
        } else if ('visible' in props) {
            _this.state = {
                hidden: !props.visible
            };
        } else if ('defaultHidden' in props) {
            _this.state = {
                hidden: props.defaultHidden
            };
        } else {
            _this.state = {
                hidden: !props.defaultVisible
            };
        }
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'getMenuElement',
        value: function getMenuElement() {
            var overlay = this.props.overlay;

            if (isValidElement(overlay)) {
                return cloneElement(overlay, {
                    onClick: this.handleClick
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref2) {
            var hidden = _ref2.hidden,
                visible = _ref2.visible;

            if (hidden !== void 0) {
                this.setState({
                    hidden: hidden
                });
            } else if (visible !== void 0) {
                this.setState({
                    hidden: !visible
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                children = _props.children,
                placement = _props.placement;

            return React.createElement(
                Trigger,
                { prefixCls: prefixCls, action: this.triggerAction, builtinPlacements: placements, popupPlacement: placement, popupContent: this.getMenuElement(), popupStyle: { whiteSpace: 'nowrap' }, onPopupHiddenChange: this.handlePopupHiddenChange, popupHidden: this.state.hidden },
                children
            );
        }
    }, {
        key: 'triggerAction',
        get: function get() {
            var trigger = this.props.trigger;

            return trigger;
        }
    }, {
        key: 'transitionName',
        get: function get() {
            var placement = this.props.placement;

            var result = 'slide-up';
            if (placement && placement.startsWith('top')) {
                result = 'slide-down';
            }
            return result;
        }
    }, {
        key: 'prefixCls',
        get: function get() {
            var _props2 = this.props,
                suffixCls = _props2.suffixCls,
                prefixCls = _props2.prefixCls;

            return getProPrefixCls(suffixCls, prefixCls);
        }
    }]);

    return Dropdown;
}(PureComponent);

export default Dropdown;

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
    trigger: PropTypes.arrayOf(PropTypes.oneOf(["focus" /* focus */
    , "hover" /* hover */
    , "click" /* click */
    , "contextMenu" /* contextMenu */
    ])),
    overlay: PropTypes.any,
    placement: PropTypes.oneOf(["bottomLeft" /* bottomLeft */
    , "bottomCenter" /* bottomCenter */
    , "bottomRight" /* bottomRight */
    , "topLeft" /* topLeft */
    , "topCenter" /* topCenter */
    , "topRight" /* topRight */
    ]),
    hidden: PropTypes.bool,
    visible: PropTypes.bool,
    onHiddenChange: PropTypes.func,
    onVisibleChange: PropTypes.func,
    onOverlayClick: PropTypes.func,
    suffixCls: PropTypes.string,
    prefixCls: PropTypes.string,
    defaultHidden: PropTypes.bool,
    defaultVisible: PropTypes.bool
};
Dropdown.defaultProps = {
    suffixCls: 'dropdown',
    placement: "bottomLeft" /* bottomLeft */
    , trigger: ["hover" /* hover */, "focus" /* focus */],
    defaultHidden: true
};