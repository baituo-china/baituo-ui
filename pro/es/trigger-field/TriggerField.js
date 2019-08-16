import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import noop from 'lodash/noop';
import { action, computed, observable } from 'mobx';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import Trigger from '../trigger/Trigger';
import { TextField } from '../text-field/TextField';
import autobind from '../_util/autobind';
import Icon from '../icon';
import TaskRunner from '../_util/TaskRunner';
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
    _inherits(TriggerField, _TextField);

    function TriggerField(props, context) {
        _classCallCheck(this, TriggerField);

        var _this = _possibleConstructorReturn(this, (TriggerField.__proto__ || Object.getPrototypeOf(TriggerField)).call(this, props, context));

        _this.popupTask = new TaskRunner();
        _this.setPopup(false);
        return _this;
    }

    _createClass(TriggerField, [{
        key: 'setPopup',
        value: function setPopup(statePopup) {
            this.statePopup = statePopup;
        }
    }, {
        key: 'getRootDomNode',
        value: function getRootDomNode() {
            return findDOMNode(this);
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(TriggerField.prototype.__proto__ || Object.getPrototypeOf(TriggerField.prototype), 'getOtherProps', this).call(this), ['popupContent', 'popupCls', 'editable', 'trigger', 'triggerShowDelay', 'triggerHiddenDelay']);
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
            return React.createElement(
                Trigger,
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

            return (_get2 = _get(TriggerField.prototype.__proto__ || Object.getPrototypeOf(TriggerField.prototype), 'getWrapperClassNames', this)).call.apply(_get2, [this].concat(args, [(_ref = {}, _defineProperty(_ref, prefixCls + '-expand', this.popup), _defineProperty(_ref, prefixCls + '-not-editable', !this.isDisabled() && !this.editable), _ref)]));
        }
    }, {
        key: 'getDefaultSuffix',
        value: function getDefaultSuffix() {
            var prefixCls = this.prefixCls;

            return React.createElement(Icon, { type: this.getTriggerIconFont(), className: prefixCls + '-trigger' });
        }
    }, {
        key: 'handlePopupMouseDown',
        value: function handlePopupMouseDown(e) {
            e.preventDefault();
            var _props$onMouseDown = this.props.onMouseDown,
                onMouseDown = _props$onMouseDown === undefined ? noop : _props$onMouseDown;

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
}(TextField);

export default TriggerField;

TriggerField.displayName = 'TriggerField';
TriggerField.propTypes = _extends({
    /**
     * 下拉框的自定义内容
     */
    popupContent: PropTypes.element,
    /**
     * 下拉框的自定义样式名
     */
    popupCls: PropTypes.string,
    /**
     * 下拉框的内链样式
     */
    popupStyle: PropTypes.object,
    /**
     * 触发下拉框的方式
     * 可选值：click | focus | hover | contextMenu
     */
    trigger: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.string),
    /**
     * 下拉框显示延迟
     * @defualt 150
     */
    triggerShowDelay: PropTypes.number,
    /**
     * 下拉框隐藏延迟
     * @defualt 50
     */
    triggerHiddenDelay: PropTypes.number
}, TextField.propTypes);
TriggerField.defaultProps = _extends({}, TextField.defaultProps, {
    suffixCls: 'trigger',
    clearButton: true,
    trigger: ['focus', 'click'],
    triggerShowDelay: 150,
    triggerHiddenDelay: 50
});
tslib_1.__decorate([observable], TriggerField.prototype, "statePopup", void 0);
tslib_1.__decorate([computed], TriggerField.prototype, "popup", null);
tslib_1.__decorate([action], TriggerField.prototype, "setPopup", null);
tslib_1.__decorate([autobind], TriggerField.prototype, "getRootDomNode", null);
tslib_1.__decorate([autobind], TriggerField.prototype, "handlePopupMouseDown", null);
tslib_1.__decorate([autobind], TriggerField.prototype, "handlePopupHiddenChange", null);