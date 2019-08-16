'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get3 = require('babel-runtime/helpers/get');

var _get4 = _interopRequireDefault(_get3);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _Trigger = require('../trigger/Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _TextField2 = require('../text-field/TextField');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _TaskRunner = require('../_util/TaskRunner');

var _TaskRunner2 = _interopRequireDefault(_TaskRunner);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var BUILT_IN_PLACEMENTS = {
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    bottomRight: {
        points: ['tr', 'br'],
        offset: [0, 4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    topRight: {
        points: ['br', 'tr'],
        offset: [0, -4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    }
};

var TriggerField = function (_TextField) {
    (0, _inherits3['default'])(TriggerField, _TextField);

    function TriggerField(props, context) {
        (0, _classCallCheck3['default'])(this, TriggerField);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TriggerField.__proto__ || Object.getPrototypeOf(TriggerField)).call(this, props, context));

        _this.popupTask = new _TaskRunner2['default']();
        _this.setPopup(false);
        return _this;
    }

    (0, _createClass3['default'])(TriggerField, [{
        key: 'setPopup',
        value: function setPopup(statePopup) {
            this.statePopup = statePopup;
        }
    }, {
        key: 'getRootDomNode',
        value: function getRootDomNode() {
            return (0, _reactDom.findDOMNode)(this);
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get4['default'])(TriggerField.prototype.__proto__ || Object.getPrototypeOf(TriggerField.prototype), 'getOtherProps', this).call(this), ['popupContent', 'popupCls', 'editable', 'trigger', 'triggerShowDelay', 'triggerHiddenDelay']);
        }
    }, {
        key: 'getPopupProps',
        value: function getPopupProps() {
            return {};
        }
    }, {
        key: 'getWrappedEditor',
        value: function getWrappedEditor() {
            var _this2 = this;

            var prefixCls = this.prefixCls,
                _props = this.props,
                popupCls = _props.popupCls,
                popupStyle = _props.popupStyle,
                popupContent = _props.popupContent,
                hidden = _props.hidden,
                trigger = _props.trigger,
                triggerShowDelay = _props.triggerShowDelay,
                triggerHiddenDelay = _props.triggerHiddenDelay;

            var content = void 0;
            if (popupContent !== void 0) {
                if (popupContent instanceof Function) {
                    content = popupContent(this.getPopupProps());
                } else {
                    content = popupContent;
                }
            } else {
                content = this.getPopupContent();
            }
            return _react2['default'].createElement(
                _Trigger2['default'],
                { ref: function ref(node) {
                        return _this2.trigger = node;
                    }, action: this.isReadOnly() || this.isDisabled() ? [] : trigger, focusDelay: triggerShowDelay, blurDelay: triggerHiddenDelay, mouseEnterDelay: triggerShowDelay, mouseLeaveDelay: triggerHiddenDelay, prefixCls: prefixCls, popupCls: popupCls, popupStyle: popupStyle, popupContent: content, popupPlacement: 'bottomLeft', popupHidden: hidden || !this.popup, builtinPlacements: BUILT_IN_PLACEMENTS, onPopupAnimateAppear: this.handlePopupAnimateAppear, onPopupAnimateEnd: this.handlePopupAnimateEnd, onPopupHiddenChange: this.handlePopupHiddenChange, getPopupStyleFromAlign: this.getPopupStyleFromAlign, getRootDomNode: this.getRootDomNode },
                this.getEditor()
            );
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var _get2, _ref;

            var prefixCls = this.prefixCls;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = (0, _get4['default'])(TriggerField.prototype.__proto__ || Object.getPrototypeOf(TriggerField.prototype), 'getWrapperClassNames', this)).call.apply(_get2, [this].concat(args, [(_ref = {}, (0, _defineProperty3['default'])(_ref, prefixCls + '-expand', this.popup), (0, _defineProperty3['default'])(_ref, prefixCls + '-not-editable', !this.isDisabled() && !this.editable), _ref)]));
        }
    }, {
        key: 'getDefaultSuffix',
        value: function getDefaultSuffix() {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(_icon2['default'], { type: this.getTriggerIconFont(), className: prefixCls + '-trigger' });
        }
    }, {
        key: 'handlePopupMouseDown',
        value: function handlePopupMouseDown(e) {
            e.preventDefault();
            var _props$onMouseDown = this.props.onMouseDown,
                onMouseDown = _props$onMouseDown === undefined ? _noop2['default'] : _props$onMouseDown;

            onMouseDown(e);
        }
    }, {
        key: 'handlePopupHiddenChange',
        value: function handlePopupHiddenChange(hidden) {
            this.setPopup(!hidden);
        }
    }, {
        key: 'forcePopupAlign',
        value: function forcePopupAlign() {
            if (this.trigger) {
                this.trigger.forcePopupAlign();
            }
        }
    }, {
        key: 'expand',
        value: function expand() {
            var _this3 = this;

            this.popupTask.cancel();
            if (!this.isReadOnly() && !this.popup) {
                this.popupTask.delay(this.props.triggerShowDelay, function () {
                    _this3.setPopup(true);
                });
            }
        }
    }, {
        key: 'collapse',
        value: function collapse() {
            var _this4 = this;

            this.popupTask.cancel();
            if (!this.isReadOnly() && this.popup) {
                this.popupTask.delay(this.props.triggerHiddenDelay, function () {
                    _this4.setPopup(false);
                });
            }
        }
    }, {
        key: 'popup',
        get: function get() {
            return this.statePopup;
        }
    }]);
    return TriggerField;
}(_TextField2.TextField);

exports['default'] = TriggerField;

TriggerField.displayName = 'TriggerField';
TriggerField.propTypes = (0, _extends3['default'])({
    /**
     * 下拉框的自定义内容
     */
    popupContent: _propTypes2['default'].element,
    /**
     * 下拉框的自定义样式名
     */
    popupCls: _propTypes2['default'].string,
    /**
     * 下拉框的内链样式
     */
    popupStyle: _propTypes2['default'].object,
    /**
     * 触发下拉框的方式
     * 可选值：click | focus | hover | contextMenu
     */
    trigger: _mobxReact.PropTypes.arrayOrObservableArrayOf(_propTypes2['default'].string),
    /**
     * 下拉框显示延迟
     * @defualt 150
     */
    triggerShowDelay: _propTypes2['default'].number,
    /**
     * 下拉框隐藏延迟
     * @defualt 50
     */
    triggerHiddenDelay: _propTypes2['default'].number
}, _TextField2.TextField.propTypes);
TriggerField.defaultProps = (0, _extends3['default'])({}, _TextField2.TextField.defaultProps, {
    suffixCls: 'trigger',
    clearButton: true,
    trigger: ['focus', 'click'],
    triggerShowDelay: 150,
    triggerHiddenDelay: 50
});
tslib_1.__decorate([_mobx.observable], TriggerField.prototype, "statePopup", void 0);
tslib_1.__decorate([_mobx.computed], TriggerField.prototype, "popup", null);
tslib_1.__decorate([_mobx.action], TriggerField.prototype, "setPopup", null);
tslib_1.__decorate([_autobind2['default']], TriggerField.prototype, "getRootDomNode", null);
tslib_1.__decorate([_autobind2['default']], TriggerField.prototype, "handlePopupMouseDown", null);
tslib_1.__decorate([_autobind2['default']], TriggerField.prototype, "handlePopupHiddenChange", null);
module.exports = exports['default'];