import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import LazyRenderBox from './LazyRenderBox';
import Icon from '../../icon';
import Animate from '../../animate';
import getScrollBarSize from '../util/getScrollBarSize';
import KeyCode from '../../_util/KeyCode';
import addEventListener from '../../_util/addEventListener';
var uuid = 0;
var openCount = 0;
/* eslint react/no-is-mounted:0 */
function getScroll(w, top) {
    var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
    var method = 'scroll' + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
        var d = w.document;
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            ret = d.body[method];
        }
    }
    return ret;
}
function setTransformOrigin(node, value) {
    var style = node.style;
    ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
        style[prefix + 'TransformOrigin'] = value;
    });
    style['transformOrigin'] = value;
}
function offset(el) {
    var rect = el.getBoundingClientRect();
    var pos = {
        left: rect.left,
        top: rect.top
    };
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScroll(w);
    pos.top += getScroll(w, true);
    return pos;
}

var Dialog = function (_Component) {
    _inherits(Dialog, _Component);

    function Dialog() {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));

        _this.center = function () {
            var center = _this.props.center;

            var dialogNode = findDOMNode(_this.dialog);
            if (center && dialogNode && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
                var _window$document$docu = window.document.documentElement,
                    docWidth = _window$document$docu.clientWidth,
                    docHeight = _window$document$docu.clientHeight;
                var width = dialogNode.offsetWidth,
                    height = dialogNode.offsetHeight,
                    style = dialogNode.style;

                style.left = Math.max((docWidth - width) / 2, 0) + 'px';
                style.top = Math.max((docHeight - height) / 2, 0) + 'px';
            }
        };
        _this.onEventListener = function () {
            if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
                _this.resizeEvent = addEventListener(window, 'resize', _this.center);
            }
        };
        _this.removeEventListener = function () {
            if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
                _this.resizeEvent.remove();
            }
        };
        _this.onAnimateLeave = function () {
            var afterClose = _this.props.afterClose;
            // need demo?
            // https://github.com/react-component/dialog/pull/28

            if (_this.wrap) {
                _this.wrap.style.display = 'none';
            }
            _this.inTransition = false;
            _this.removeScrollingEffect();
            if (afterClose) {
                afterClose();
            }
        };
        _this.onAnimateEnd = function () {
            var animationEnd = _this.props.animationEnd;

            if (animationEnd) {
                animationEnd();
            }
        };
        _this.onMaskClick = function (e) {
            // android trigger click on open (fastclick??)
            if (Date.now() - _this.openTime < 300) {
                return;
            }
            if (e.target === e.currentTarget) {
                _this.close(e);
            }
        };
        _this.onKeyDown = function (e) {
            var props = _this.props;
            if (props.keyboard && e.keyCode === KeyCode.ESC) {
                _this.close(e);
            }
            // keep focus inside dialog
            if (props.visible) {
                if (e.keyCode === KeyCode.TAB) {
                    var activeElement = document.activeElement;
                    var dialogRoot = _this.wrap;
                    if (e.shiftKey) {
                        if (activeElement === dialogRoot) {
                            _this.sentinel.focus();
                        }
                    } else if (activeElement === _this.sentinel) {
                        dialogRoot.focus();
                    }
                }
            }
        };
        _this.getDialogElement = function () {
            var props = _this.props;
            var closable = props.closable;
            var prefixCls = props.prefixCls;
            var dest = {};
            if (props.width !== undefined) {
                dest.width = props.width;
            }
            if (props.height !== undefined) {
                dest.height = props.height;
            }
            var footer = void 0;
            if (props.footer) {
                footer = React.createElement(
                    'div',
                    { className: prefixCls + '-footer', ref: 'footer' },
                    props.footer
                );
            }
            var header = void 0;
            if (props.title) {
                header = React.createElement(
                    'div',
                    { className: prefixCls + '-header', ref: 'header' },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-title', id: _this.titleId },
                        props.title
                    )
                );
            }
            var closer = void 0;
            if (closable) {
                closer = React.createElement(
                    'button',
                    { onClick: _this.close, 'aria-label': 'Close', className: prefixCls + '-close' },
                    React.createElement(Icon, { className: prefixCls + '-close-x', type: 'close' })
                );
            }
            var style = _extends({}, props.style, dest);
            var transitionName = _this.getTransitionName();
            var dialogElement = React.createElement(
                LazyRenderBox,
                { key: 'dialog-element', role: 'document', ref: _this.saveRef('dialog'), style: style, className: prefixCls + ' ' + (props.className || ''), hidden: !props.visible },
                React.createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    closer,
                    header,
                    React.createElement(
                        'div',
                        _extends({ className: prefixCls + '-body', style: props.bodyStyle, ref: 'body' }, props.bodyProps),
                        props.children
                    ),
                    footer
                ),
                React.createElement(
                    'div',
                    { tabIndex: 0, ref: _this.saveRef('sentinel'), style: { width: 0, height: 0, overflow: 'hidden' } },
                    'sentinel'
                )
            );
            return React.createElement(
                Animate,
                { key: 'dialog', hiddenProp: 'hidden', onEnd: _this.onAnimateEnd, onLeave: _this.onAnimateLeave, transitionName: transitionName, component: '', transitionAppear: true },
                props.visible || !props.destroyOnClose ? dialogElement : null
            );
        };
        _this.getZIndexStyle = function () {
            var style = {};
            var props = _this.props;
            if (props.zIndex !== undefined) {
                style.zIndex = props.zIndex;
            }
            return style;
        };
        _this.getWrapStyle = function () {
            return _extends({}, _this.getZIndexStyle(), _this.props.wrapStyle);
        };
        _this.getMaskStyle = function () {
            return _extends({}, _this.getZIndexStyle(), _this.props.maskStyle);
        };
        _this.getMaskElement = function () {
            var props = _this.props;
            var maskElement = void 0;
            if (props.mask) {
                var maskTransition = _this.getMaskTransitionName();
                maskElement = React.createElement(LazyRenderBox, _extends({ style: _this.getMaskStyle(), key: 'mask', className: props.prefixCls + '-mask', hiddenClassName: props.prefixCls + '-mask-hidden', hidden: !props.visible }, props.maskProps));
                if (maskTransition) {
                    maskElement = React.createElement(
                        Animate,
                        { key: 'mask', hiddenProp: 'hidden', transitionAppear: true, component: '', transitionName: maskTransition },
                        maskElement
                    );
                }
            }
            return maskElement;
        };
        _this.getMaskTransitionName = function () {
            var props = _this.props;
            var transitionName = props.maskTransitionName;
            var animation = props.maskAnimation;
            if (!transitionName && animation) {
                transitionName = props.prefixCls + '-' + animation;
            }
            return transitionName;
        };
        _this.getTransitionName = function () {
            var props = _this.props;
            var transitionName = props.transitionName;
            var animation = props.animation;
            if (!transitionName && animation) {
                transitionName = props.prefixCls + '-' + animation;
            }
            return transitionName;
        };
        _this.setScrollbar = function () {
            if (_this.bodyIsOverflowing && _this.scrollbarWidth !== undefined) {
                document.body.style.paddingRight = _this.scrollbarWidth + 'px';
            }
        };
        _this.addScrollingEffect = function () {
            openCount++;
            if (openCount !== 1) {
                return;
            }
            _this.checkScrollbar();
            _this.setScrollbar();
            document.body.style.overflow = 'hidden';
            // this.adjustDialog();
        };
        _this.removeScrollingEffect = function () {
            openCount--;
            if (openCount !== 0) {
                return;
            }
            document.body.style.overflow = '';
            _this.resetScrollbar();
            // this.resetAdjustments();
        };
        _this.close = function (e) {
            var onClose = _this.props.onClose;

            if (onClose) {
                onClose(e);
            }
        };
        _this.checkScrollbar = function () {
            var fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) {
                // workaround for missing window.innerWidth in IE8
                var documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
            }
            _this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            if (_this.bodyIsOverflowing) {
                _this.scrollbarWidth = getScrollBarSize();
            }
        };
        _this.resetScrollbar = function () {
            document.body.style.paddingRight = '';
        };
        _this.adjustDialog = function () {
            if (_this.wrap && _this.scrollbarWidth !== undefined) {
                var modalIsOverflowing = _this.wrap.scrollHeight > document.documentElement.clientHeight;
                _this.wrap.style.paddingLeft = (!_this.bodyIsOverflowing && modalIsOverflowing ? _this.scrollbarWidth : '') + 'px';
                _this.wrap.style.paddingRight = (_this.bodyIsOverflowing && !modalIsOverflowing ? _this.scrollbarWidth : '') + 'px';
            }
        };
        _this.resetAdjustments = function () {
            if (_this.wrap) {
                _this.wrap.style.paddingLeft = _this.wrap.style.paddingLeft = '';
            }
        };
        _this.saveRef = function (name) {
            return function (node) {
                _this[name] = node;
            };
        };
        return _this;
    }

    _createClass(Dialog, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.inTransition = false;
            this.titleId = 'rcDialogTitle' + uuid++;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var center = this.props.center;

            var dialogNode = findDOMNode(this.dialog);
            if (center && dialogNode) {
                var style = dialogNode.style;

                this.center();
                style.margin = '0';
                style.padding = '0';
                this.onEventListener();
            }
            this.componentDidUpdate({});
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var props = this.props;
            var mousePosition = this.props.mousePosition;
            if (props.visible) {
                // first show
                if (!prevProps.visible) {
                    this.center();
                    this.openTime = Date.now();
                    this.lastOutSideFocusNode = document.activeElement;
                    this.addScrollingEffect();
                    this.wrap.focus();
                    var dialogNode = findDOMNode(this.dialog);
                    if (mousePosition) {
                        var elOffset = offset(dialogNode);
                        setTransformOrigin(dialogNode, mousePosition.x - elOffset.left + 'px ' + (mousePosition.y - elOffset.top) + 'px');
                    } else {
                        setTransformOrigin(dialogNode, '');
                    }
                }
            } else if (prevProps.visible) {
                this.inTransition = true;
                if (props.mask && this.lastOutSideFocusNode) {
                    try {
                        this.lastOutSideFocusNode.focus();
                    } catch (e) {
                        this.lastOutSideFocusNode = null;
                    }
                    this.lastOutSideFocusNode = null;
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.visible || this.inTransition) {
                this.removeScrollingEffect();
            }
            if (this.props.center) {
                this.removeEventListener();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var prefixCls = props.prefixCls,
                maskClosable = props.maskClosable;

            var style = this.getWrapStyle();
            // clear hide display
            // and only set display after async anim, not here for hide
            if (props.visible) {
                style.display = null;
            }
            return React.createElement(
                'div',
                null,
                this.getMaskElement(),
                React.createElement(
                    'div',
                    _extends({ tabIndex: -1, onKeyDown: this.onKeyDown, className: prefixCls + '-wrap ' + (props.wrapClassName || ''), ref: this.saveRef('wrap'), onClick: maskClosable ? this.onMaskClick : undefined, role: 'dialog', 'aria-labelledby': props.title ? this.titleId : null, style: style }, props.wrapProps),
                    this.getDialogElement()
                )
            );
        }
    }]);

    return Dialog;
}(Component);

export default Dialog;

Dialog.defaultProps = {
    className: '',
    mask: true,
    visible: false,
    keyboard: true,
    closable: true,
    maskClosable: true,
    destroyOnClose: false,
    prefixCls: 'rc-dialog',
    center: false
};