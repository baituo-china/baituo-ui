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

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Trigger = require('../trigger/Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _placements = require('./placements');

var _placements2 = _interopRequireDefault(_placements);

var _configure = require('../../../lib/configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Dropdown = function (_PureComponent) {
    (0, _inherits3['default'])(Dropdown, _PureComponent);

    function Dropdown(props) {
        (0, _classCallCheck3['default'])(this, Dropdown);

        /**
         * 调用传入的onHiddenChange方法
         *
         * @param {boolean} hidden
         */
        var _this = (0, _possibleConstructorReturn3['default'])(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

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

            var _ref = (0, _react.isValidElement)(overlay) && overlay.props || {},
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

    (0, _createClass3['default'])(Dropdown, [{
        key: 'getMenuElement',
        value: function getMenuElement() {
            var overlay = this.props.overlay;

            if ((0, _react.isValidElement)(overlay)) {
                return (0, _react.cloneElement)(overlay, {
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

            return _react2['default'].createElement(
                _Trigger2['default'],
                { prefixCls: prefixCls, action: this.triggerAction, builtinPlacements: _placements2['default'], popupPlacement: placement, popupContent: this.getMenuElement(), popupStyle: { whiteSpace: 'nowrap' }, onPopupHiddenChange: this.handlePopupHiddenChange, popupHidden: this.state.hidden },
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

            return (0, _configure.getProPrefixCls)(suffixCls, prefixCls);
        }
    }]);
    return Dropdown;
}(_react.PureComponent);

exports['default'] = Dropdown;

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
    trigger: _propTypes2['default'].arrayOf(_propTypes2['default'].oneOf(["focus" /* focus */
    , "hover" /* hover */
    , "click" /* click */
    , "contextMenu" /* contextMenu */
    ])),
    overlay: _propTypes2['default'].any,
    placement: _propTypes2['default'].oneOf(["bottomLeft" /* bottomLeft */
    , "bottomCenter" /* bottomCenter */
    , "bottomRight" /* bottomRight */
    , "topLeft" /* topLeft */
    , "topCenter" /* topCenter */
    , "topRight" /* topRight */
    ]),
    hidden: _propTypes2['default'].bool,
    visible: _propTypes2['default'].bool,
    onHiddenChange: _propTypes2['default'].func,
    onVisibleChange: _propTypes2['default'].func,
    onOverlayClick: _propTypes2['default'].func,
    suffixCls: _propTypes2['default'].string,
    prefixCls: _propTypes2['default'].string,
    defaultHidden: _propTypes2['default'].bool,
    defaultVisible: _propTypes2['default'].bool
};
Dropdown.defaultProps = {
    suffixCls: 'dropdown',
    placement: "bottomLeft" /* bottomLeft */
    , trigger: ["hover" /* hover */, "focus" /* focus */],
    defaultHidden: true
};
module.exports = exports['default'];