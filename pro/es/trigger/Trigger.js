import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Children, Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { action as mobxAction, observable, runInAction } from 'mobx';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import noop from 'lodash/noop';
import Popup from './Popup';
import autobind from '../_util/autobind';
import TaskRunner from '../_util/TaskRunner';
import EventManager from '../_util/EventManager';
import TriggerChild from './TriggerChild';
var Trigger = function (_Component) {
    _inherits(Trigger, _Component);

    function Trigger(props, context) {
        _classCallCheck(this, Trigger);

        var _this = _possibleConstructorReturn(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this, props, context));

        _this.popupTask = new TaskRunner();
        _this.documentEvent = new EventManager(typeof window !== 'undefined' && document);
        _this.focusTime = 0;
        _this.preClickTime = 0;
        _this.saveRef = function (node) {
            return _this.popup = node;
        };
        _this.handleEvent = function (eventName, child, e) {
            var handle = _this.props['on' + eventName];
            var childHandle = child.props['on' + eventName];

            if (childHandle) {
                childHandle(e);
            }
            if (!e.isDefaultPrevented()) {
                if (handle) {
                    handle(e);
                }
                if (!e.isDefaultPrevented()) {
                    _this['handle' + eventName].call(_this, e);
                }
            }
        };
        runInAction(function () {
            var _this$props$popupHidd = _this.props.popupHidden,
                popupHidden = _this$props$popupHidd === undefined ? true : _this$props$popupHidd;

            _this.popupHidden = popupHidden;
        });
        return _this;
    }

    _createClass(Trigger, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var children = this.props.children;

            var popup = this.getPopup();
            var newChildren = Children.map(children, function (child) {
                if (isValidElement(child)) {
                    var newChildProps = {};
                    if (_this2.isContextMenuToShow()) {
                        newChildProps.onContextMenu = _this2.handleEvent;
                    }
                    if (_this2.isClickToHide() || _this2.isClickToShow()) {
                        newChildProps.onClick = _this2.handleEvent;
                        newChildProps.onMouseDown = _this2.handleEvent;
                    }
                    if (_this2.isMouseEnterToShow()) {
                        newChildProps.onMouseEnter = _this2.handleEvent;
                    }
                    if (_this2.isMouseLeaveToHide()) {
                        newChildProps.onMouseLeave = _this2.handleEvent;
                    }
                    if (_this2.isFocusToShow() || _this2.isBlurToHide()) {
                        newChildProps.onFocus = _this2.handleEvent;
                        newChildProps.onBlur = _this2.handleEvent;
                    }
                    return React.createElement(
                        TriggerChild,
                        newChildProps,
                        child
                    );
                } else {
                    return child;
                }
            });
            return [newChildren, popup];
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var popupHidden = nextProps.popupHidden,
                _nextProps$onPopupHid = nextProps.onPopupHiddenChange,
                onPopupHiddenChange = _nextProps$onPopupHid === undefined ? noop : _nextProps$onPopupHid;

            if (popupHidden !== this.popupHidden && popupHidden !== void 0) {
                this.popupHidden = popupHidden;
                onPopupHiddenChange(popupHidden);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var popupHidden = this.props.popupHidden;

            this.documentEvent.clear();
            if (!popupHidden) {
                this.documentEvent.addEventListener('scroll', this.handleDocumentScroll, true);
                if ((this.isClickToHide() || this.isContextMenuToShow()) && !this.isBlurToHide()) {
                    this.documentEvent.addEventListener('mousedown', this.handleDocumentMouseDown);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.popupTask.cancel();
            this.documentEvent.clear();
        }
    }, {
        key: 'handleContextMenu',
        value: function handleContextMenu(e) {
            e.preventDefault();
            this.setPopupHidden(false);
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            if (this.isFocusToShow()) {
                this.focusTime = Date.now();
                this.delaySetPopupHidden(false, this.props.focusDelay);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            if (this.isBlurToHide()) {
                this.delaySetPopupHidden(true, this.props.blurDelay);
            }
        }
    }, {
        key: 'handleDocumentMouseDown',
        value: function handleDocumentMouseDown(e) {
            if (this.popup) {
                var target = e.target;

                if (!contains(findDOMNode(this), target) && !contains(findDOMNode(this.popup), target)) {
                    this.setPopupHidden(true);
                }
            }
        }
    }, {
        key: 'handleDocumentScroll',
        value: function handleDocumentScroll(_ref) {
            var target = _ref.target;

            if (this.popup && target !== document && !contains(findDOMNode(this.popup), target)) {
                this.forcePopupAlign();
            }
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown() {
            this.preClickTime = Date.now();
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var popupHidden = this.popupHidden;

            if (this.focusTime) {
                if (Math.abs(this.preClickTime - this.focusTime) < 20) {
                    return;
                }
                this.focusTime = 0;
            }
            this.preClickTime = 0;
            if (this.isClickToHide() && !popupHidden || popupHidden && this.isClickToShow()) {
                e.preventDefault();
                this.setPopupHidden(!popupHidden);
            }
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter() {
            this.delaySetPopupHidden(false, this.props.mouseEnterDelay);
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            this.delaySetPopupHidden(true, this.props.mouseLeaveDelay);
        }
    }, {
        key: 'handlePopupMouseEnter',
        value: function handlePopupMouseEnter() {
            this.popupTask.cancel();
        }
    }, {
        key: 'handlePopupMouseLeave',
        value: function handlePopupMouseLeave() {
            this.delaySetPopupHidden(true, this.props.mouseLeaveDelay);
        }
    }, {
        key: 'getPopup',
        value: function getPopup() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                popupCls = _props.popupCls,
                popupStyle = _props.popupStyle,
                onPopupAnimateAppear = _props.onPopupAnimateAppear,
                onPopupAnimateEnter = _props.onPopupAnimateEnter,
                onPopupAnimateLeave = _props.onPopupAnimateLeave,
                onPopupAnimateEnd = _props.onPopupAnimateEnd,
                onPopupAlign = _props.onPopupAlign,
                popupContent = _props.popupContent,
                getPopupStyleFromAlign = _props.getPopupStyleFromAlign,
                _props$getRootDomNode = _props.getRootDomNode,
                getRootDomNode = _props$getRootDomNode === undefined ? this.getRootDomNode : _props$getRootDomNode,
                transitionName = _props.transitionName;

            var visible = !this.popupHidden && popupContent;
            var mouseProps = {};
            if (this.isMouseEnterToShow()) {
                mouseProps.onMouseEnter = this.handlePopupMouseEnter;
            }
            if (this.isMouseLeaveToHide()) {
                mouseProps.onMouseLeave = this.handlePopupMouseLeave;
            }
            return React.createElement(
                Popup,
                _extends({ key: 'popup', ref: this.saveRef, transitionName: transitionName, className: classNames(prefixCls + '-popup', popupCls), style: popupStyle, hidden: !visible, align: this.getPopupAlign(), onAlign: onPopupAlign, onMouseDown: this.handlePopupMouseDown, getRootDomNode: getRootDomNode, onAnimateAppear: onPopupAnimateAppear, onAnimateEnter: onPopupAnimateEnter, onAnimateLeave: onPopupAnimateLeave, onAnimateEnd: onPopupAnimateEnd, getStyleFromAlign: getPopupStyleFromAlign, getClassNameFromAlign: this.getPopupClassNameFromAlign }, mouseProps),
                popupContent
            );
        }
    }, {
        key: 'getPopupAlign',
        value: function getPopupAlign() {
            var _props2 = this.props,
                popupPlacement = _props2.popupPlacement,
                popupAlign = _props2.popupAlign,
                builtinPlacements = _props2.builtinPlacements;

            if (popupPlacement && builtinPlacements) {
                return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
            }
            return popupAlign;
        }
    }, {
        key: 'handlePopupMouseDown',
        value: function handlePopupMouseDown(e) {
            e.preventDefault();
        }
    }, {
        key: 'getRootDomNode',
        value: function getRootDomNode() {
            return findDOMNode(this);
        }
    }, {
        key: 'getPopupClassNameFromAlign',
        value: function getPopupClassNameFromAlign(align) {
            var className = [];
            var _props3 = this.props,
                popupPlacement = _props3.popupPlacement,
                builtinPlacements = _props3.builtinPlacements,
                prefixCls = _props3.prefixCls,
                getCls = _props3.getPopupClassNameFromAlign;

            if (popupPlacement && builtinPlacements) {
                className.push(_getPopupClassNameFromAlign(builtinPlacements, prefixCls, align));
            }
            if (getCls) {
                var cls = getCls(align);
                if (cls) {
                    className.push(cls);
                }
            }
            return className.join(' ');
        }
    }, {
        key: 'forcePopupAlign',
        value: function forcePopupAlign() {
            if (!this.popupHidden && this.popup) {
                this.popup.forceAlign();
            }
        }
    }, {
        key: 'setPopupHidden',
        value: function setPopupHidden(hidden) {
            this.popupTask.cancel();
            if (this.popupHidden !== hidden) {
                var _props4 = this.props,
                    popupHidden = _props4.popupHidden,
                    _props4$onPopupHidden = _props4.onPopupHiddenChange,
                    onPopupHiddenChange = _props4$onPopupHidden === undefined ? noop : _props4$onPopupHidden;

                if (popupHidden === void 0) {
                    this.popupHidden = hidden;
                }
                onPopupHiddenChange(hidden);
            }
        }
    }, {
        key: 'delaySetPopupHidden',
        value: function delaySetPopupHidden(popupHidden, delay) {
            var _this3 = this;

            this.popupTask.cancel();
            if (delay) {
                this.popupTask.delay(delay, function () {
                    _this3.setPopupHidden(popupHidden);
                });
            } else {
                this.setPopupHidden(popupHidden);
            }
        }
    }, {
        key: 'isClickToShow',
        value: function isClickToShow() {
            var _props5 = this.props,
                _props5$action = _props5.action,
                action = _props5$action === undefined ? [] : _props5$action,
                _props5$showAction = _props5.showAction,
                showAction = _props5$showAction === undefined ? [] : _props5$showAction;

            return action.indexOf("click" /* click */) !== -1 || showAction.indexOf("click" /* click */) !== -1;
        }
    }, {
        key: 'isContextMenuToShow',
        value: function isContextMenuToShow() {
            var _props6 = this.props,
                _props6$action = _props6.action,
                action = _props6$action === undefined ? [] : _props6$action,
                _props6$showAction = _props6.showAction,
                showAction = _props6$showAction === undefined ? [] : _props6$showAction;

            return action.indexOf("contextMenu" /* contextMenu */) !== -1 || showAction.indexOf("contextMenu" /* contextMenu */) !== -1;
        }
    }, {
        key: 'isClickToHide',
        value: function isClickToHide() {
            var _props7 = this.props,
                _props7$action = _props7.action,
                action = _props7$action === undefined ? [] : _props7$action,
                _props7$hideAction = _props7.hideAction,
                hideAction = _props7$hideAction === undefined ? [] : _props7$hideAction;

            return action.indexOf("click" /* click */) !== -1 || hideAction.indexOf("click" /* click */) !== -1;
        }
    }, {
        key: 'isMouseEnterToShow',
        value: function isMouseEnterToShow() {
            var _props8 = this.props,
                _props8$action = _props8.action,
                action = _props8$action === undefined ? [] : _props8$action,
                _props8$showAction = _props8.showAction,
                showAction = _props8$showAction === undefined ? [] : _props8$showAction;

            return action.indexOf("hover" /* hover */) !== -1 || showAction.indexOf("mouseEnter" /* mouseEnter */) !== -1;
        }
    }, {
        key: 'isMouseLeaveToHide',
        value: function isMouseLeaveToHide() {
            var _props9 = this.props,
                _props9$action = _props9.action,
                action = _props9$action === undefined ? [] : _props9$action,
                _props9$hideAction = _props9.hideAction,
                hideAction = _props9$hideAction === undefined ? [] : _props9$hideAction;

            return action.indexOf("hover" /* hover */) !== -1 || hideAction.indexOf("mouseLeave" /* mouseLeave */) !== -1;
        }
    }, {
        key: 'isFocusToShow',
        value: function isFocusToShow() {
            var _props10 = this.props,
                _props10$action = _props10.action,
                action = _props10$action === undefined ? [] : _props10$action,
                _props10$showAction = _props10.showAction,
                showAction = _props10$showAction === undefined ? [] : _props10$showAction;

            return action.indexOf("focus" /* focus */) !== -1 || showAction.indexOf("focus" /* focus */) !== -1;
        }
    }, {
        key: 'isBlurToHide',
        value: function isBlurToHide() {
            var _props11 = this.props,
                _props11$action = _props11.action,
                action = _props11$action === undefined ? [] : _props11$action,
                _props11$hideAction = _props11.hideAction,
                hideAction = _props11$hideAction === undefined ? [] : _props11$hideAction;

            return action.indexOf("focus" /* focus */) !== -1 || hideAction.indexOf("blur" /* blur */) !== -1;
        }
    }]);

    return Trigger;
}(Component);
Trigger.displayName = 'Trigger';
Trigger.propTypes = {
    action: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.oneOf(["hover" /* hover */
    , "contextMenu" /* contextMenu */
    , "focus" /* focus */
    , "click" /* click */
    ])),
    showAction: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.oneOf(["mouseEnter" /* mouseEnter */
    , "contextMenu" /* contextMenu */
    , "focus" /* focus */
    , "click" /* click */
    ])),
    hideAction: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.oneOf(["blur" /* blur */
    , "mouseLeave" /* mouseLeave */
    , "click" /* click */
    ])),
    popupContent: PropTypes.node,
    popupCls: PropTypes.string,
    popupStyle: PropTypes.object,
    popupHidden: PropTypes.bool,
    popupPlacement: PropTypes.string,
    popupAlign: PropTypes.object,
    builtinPlacements: PropTypes.any,
    onPopupAnimateAppear: PropTypes.func,
    onPopupAnimateEnter: PropTypes.func,
    onPopupAnimateLeave: PropTypes.func,
    onPopupAnimateEnd: PropTypes.func,
    onPopupAlign: PropTypes.func,
    onPopupHiddenChange: PropTypes.func,
    getPopupStyleFromAlign: PropTypes.func,
    focusDelay: PropTypes.number,
    blurDelay: PropTypes.number,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number
};
Trigger.defaultProps = {
    focusDelay: 150,
    blurDelay: 0,
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
    transitionName: 'slide-up'
};
tslib_1.__decorate([observable], Trigger.prototype, "popupHidden", void 0);
tslib_1.__decorate([mobxAction], Trigger.prototype, "componentWillReceiveProps", null);
tslib_1.__decorate([autobind], Trigger.prototype, "handleDocumentMouseDown", null);
tslib_1.__decorate([autobind], Trigger.prototype, "handleDocumentScroll", null);
tslib_1.__decorate([autobind], Trigger.prototype, "handlePopupMouseEnter", null);
tslib_1.__decorate([autobind], Trigger.prototype, "handlePopupMouseLeave", null);
tslib_1.__decorate([autobind], Trigger.prototype, "handlePopupMouseDown", null);
tslib_1.__decorate([autobind], Trigger.prototype, "getRootDomNode", null);
tslib_1.__decorate([autobind], Trigger.prototype, "getPopupClassNameFromAlign", null);
tslib_1.__decorate([mobxAction], Trigger.prototype, "setPopupHidden", null);
Trigger = tslib_1.__decorate([observer], Trigger);
export default Trigger;
function _getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
    var points = align.points;

    for (var placement in builtinPlacements) {
        if (builtinPlacements.hasOwnProperty(placement)) {
            if (isPointsEq(builtinPlacements[placement].points, points)) {
                return prefixCls + '-popup-placement-' + placement;
            }
        }
    }
    return '';
}
function isPointsEq(a1, a2) {
    return a1[0] === a2[0] && a1[1] === a2[1];
}
function getAlignFromPlacement(builtinPlacements, placementStr, align) {
    var baseAlign = builtinPlacements[placementStr] || {};
    return _extends({}, baseAlign, align);
}
function contains(root, n) {
    var node = n;
    if (root) {
        while (node) {
            if (node === root || root.contains && root.contains(node)) {
                return true;
            }
            node = node.parentNode;
        }
    }
    return false;
}