import _regeneratorRuntime from 'babel-runtime/regenerator';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import defer from 'lodash/defer';
import noop from 'lodash/noop';
import classNames from 'classnames';
import classes from 'component-classes';
import ViewComponent from '../core/ViewComponent';
import Icon from '../icon';
import autobind from '../_util/autobind';
import Button from '../button/Button';
import EventManager from '../_util/EventManager';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import isEmpty from '../_util/isEmpty';
import asyncComponent from '../_util/AsyncComponent';
import KeyCode from '../../../es/_util/KeyCode';
import Message from '../message';
import exception from '../_util/exception';
import { $l } from '../locale-context';
import { getConfig } from '../../../es/configure';

var Modal = function (_ViewComponent) {
    _inherits(Modal, _ViewComponent);

    function Modal() {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));

        _this.moveEvent = new EventManager(typeof window === 'undefined' ? void 0 : document);
        _this.okCancelEvent = new EventManager();
        _this.saveCancelRef = function (node) {
            return _this.cancelButton = node;
        };
        _this.handleKeyDown = function (e) {
            var cancelButton = _this.cancelButton;

            if (cancelButton && !cancelButton.isDisabled() && e.keyCode === KeyCode.ESC) {
                cancelButton.handleClickWait(e);
            }
        };
        _this.registerOk = function (ok) {
            _this.okCancelEvent.removeEventListener('ok');
            _this.okCancelEvent.addEventListener('ok', ok);
        };
        _this.registerCancel = function (cancel) {
            _this.okCancelEvent.removeEventListener('cancel');
            _this.okCancelEvent.addEventListener('cancel', cancel);
        };
        _this.getDefaultFooter = function (okBtn, cancelBtn) {
            var _this$props = _this.props,
                okCancel = _this$props.okCancel,
                _this$props$okFirst = _this$props.okFirst,
                okFirst = _this$props$okFirst === undefined ? getConfig('modalOkFirst') : _this$props$okFirst,
                drawer = _this$props.drawer;

            var buttons = [okBtn];
            if (okCancel) {
                if (okFirst || drawer) {
                    buttons.push(cancelBtn);
                } else {
                    buttons.unshift(cancelBtn);
                }
            }
            return React.createElement(
                'div',
                null,
                buttons
            );
        };
        return _this;
    }

    _createClass(Modal, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'getOtherProps', this).call(this), ['closable', 'movable', 'maskClosable', 'keyboardClosable', 'fullScreen', 'title', 'header', 'footer', 'close', 'update', 'okText', 'cancelText', 'okCancel', 'onClose', 'onOk', 'onCancel', 'destroyOnClose', 'drawer', 'afterClose', 'okProps', 'cancelProps', 'border', 'okFirst']);
            if (this.props.keyboardClosable) {
                otherProps.autoFocus = true;
                otherProps.tabIndex = -1;
                otherProps.onKeyDown = this.handleKeyDown;
            }
            return otherProps;
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var _get$call;

            var prefixCls = this.prefixCls,
                _props = this.props,
                _props$style = _props.style,
                style = _props$style === undefined ? {} : _props$style,
                fullScreen = _props.fullScreen,
                drawer = _props.drawer,
                _props$border = _props.border,
                border = _props$border === undefined ? getConfig('modalSectionBorder') : _props$border;

            return _get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'getClassName', this).call(this, (_get$call = {}, _defineProperty(_get$call, prefixCls + '-center', !drawer && !('left' in style || 'right' in style) && !this.offset), _defineProperty(_get$call, prefixCls + '-fullscreen', fullScreen), _defineProperty(_get$call, prefixCls + '-drawer', drawer), _defineProperty(_get$call, prefixCls + '-border', border), _get$call));
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.prefixCls;

            var header = this.getHeader();
            var body = this.getBody();
            var footer = this.getFooter();
            return React.createElement(
                'div',
                this.getMergedProps(),
                React.createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    header,
                    body,
                    footer
                )
            );
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(_ref) {
            var _this2 = this;

            var hidden = _ref.hidden;

            if (hidden === false && hidden !== this.props.hidden) {
                defer(function () {
                    return _this2.focus();
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.moveEvent.clear();
            this.okCancelEvent.clear();
        }
    }, {
        key: 'handleHeaderMouseDown',
        value: function handleHeaderMouseDown(downEvent) {
            var _this3 = this;

            var element = this.element;

            if (element) {
                var prefixCls = this.prefixCls;
                var clientX = downEvent.clientX,
                    clientY = downEvent.clientY;
                var offsetLeft = element.offsetLeft,
                    offsetTop = element.offsetTop;

                this.moveEvent.addEventListener('mousemove', function (moveEvent) {
                    var moveX = moveEvent.clientX,
                        moveY = moveEvent.clientY;

                    classes(element).remove(prefixCls + '-center');
                    var left = pxToRem(Math.max(offsetLeft + moveX - clientX, 0));
                    var top = pxToRem(Math.max(offsetTop + moveY - clientY, 0));
                    _this3.offset = [left, top];
                    _extends(element.style, {
                        left: left,
                        top: top
                    });
                }).addEventListener('mouseup', function () {
                    _this3.moveEvent.clear();
                });
            }
        }
    }, {
        key: 'handleOk',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                var _props$onOk, onOk, promise, _ref3, _ref4, ret1, ret2;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _props$onOk = this.props.onOk, onOk = _props$onOk === undefined ? noop : _props$onOk;
                                promise = Promise.all([onOk(), this.okCancelEvent.fireEvent('ok')]);
                                _context.prev = 2;
                                _context.next = 5;
                                return promise;

                            case 5:
                                _ref3 = _context.sent;
                                _ref4 = _slicedToArray(_ref3, 2);
                                ret1 = _ref4[0];
                                ret2 = _ref4[1];

                                if (ret1 !== false && ret2) {
                                    this.close();
                                }
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](2);

                                Message.error(exception(_context.t0));

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 12]]);
            }));

            function handleOk() {
                return _ref2.apply(this, arguments);
            }

            return handleOk;
        }()
    }, {
        key: 'handleCancel',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                var _props$onCancel, onCancel, promise, _ref6, _ref7, ret1, ret2;

                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _props$onCancel = this.props.onCancel, onCancel = _props$onCancel === undefined ? noop : _props$onCancel;
                                promise = Promise.all([onCancel(), this.okCancelEvent.fireEvent('cancel')]);
                                _context2.prev = 2;
                                _context2.next = 5;
                                return promise;

                            case 5:
                                _ref6 = _context2.sent;
                                _ref7 = _slicedToArray(_ref6, 2);
                                ret1 = _ref7[0];
                                ret2 = _ref7[1];

                                if (ret1 !== false && ret2) {
                                    this.close();
                                }
                                _context2.next = 15;
                                break;

                            case 12:
                                _context2.prev = 12;
                                _context2.t0 = _context2['catch'](2);

                                Message.error(exception(_context2.t0));

                            case 15:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 12]]);
            }));

            function handleCancel() {
                return _ref5.apply(this, arguments);
            }

            return handleCancel;
        }()
    }, {
        key: 'getTitle',
        value: function getTitle() {
            var title = this.props.title,
                prefixCls = this.prefixCls;

            if (title) {
                return React.createElement(
                    'div',
                    { className: prefixCls + '-title' },
                    title
                );
            }
        }
    }, {
        key: 'getHeader',
        value: function getHeader() {
            var prefixCls = this.prefixCls,
                _props2 = this.props,
                closable = _props2.closable,
                movable = _props2.movable,
                fullScreen = _props2.fullScreen,
                drawer = _props2.drawer,
                header = _props2.header;

            if (!!header) {
                var title = this.getTitle();
                var buttons = this.getHeaderButtons();
                if (title || closable || movable) {
                    var headerProps = {
                        className: classNames(prefixCls + '-header', _defineProperty({}, prefixCls + '-movable', movable && !fullScreen && !drawer))
                    };
                    if (movable && !fullScreen && !drawer) {
                        headerProps.onMouseDown = this.handleHeaderMouseDown;
                    }
                    return React.createElement(
                        'div',
                        headerProps,
                        title,
                        buttons
                    );
                }
            }
        }
    }, {
        key: 'getHeaderButtons',
        value: function getHeaderButtons() {
            var prefixCls = this.prefixCls;

            var closeButton = this.getCloseButton();
            if (closeButton) {
                return React.createElement(
                    'div',
                    { className: prefixCls + '-header-buttons' },
                    closeButton
                );
            }
        }
    }, {
        key: 'getCloseButton',
        value: function getCloseButton() {
            var prefixCls = this.prefixCls,
                closable = this.props.closable;

            if (closable) {
                return React.createElement(
                    'button',
                    { className: prefixCls + '-header-button', onClick: this.close },
                    React.createElement(Icon, { type: 'close' })
                );
            }
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(children) {
            if (children) {
                var prefixCls = this.prefixCls,
                    props = this.props;
                var _props$close = props.close,
                    close = _props$close === undefined ? noop : _props$close,
                    _props$update = props.update,
                    update = _props$update === undefined ? noop : _props$update;

                var modal = {
                    close: close,
                    update: update,
                    props: props,
                    handleOk: this.registerOk,
                    handleCancel: this.registerCancel
                };
                return React.createElement(
                    'div',
                    { className: prefixCls + '-body' },
                    isValidElement(children) ? cloneElement(children, { modal: modal }) : children
                );
            }
        }
    }, {
        key: 'getBody',
        value: function getBody() {
            var children = this.props.children;

            return this.renderChildren(typeof children === 'function' ? asyncComponent(children) : children);
        }
    }, {
        key: 'getFooter',
        value: function getFooter() {
            var _props3 = this.props,
                okProps = _props3.okProps,
                cancelProps = _props3.cancelProps,
                drawer = _props3.drawer,
                _props3$okText = _props3.okText,
                okText = _props3$okText === undefined ? $l('Modal', 'ok') : _props3$okText,
                _props3$cancelText = _props3.cancelText,
                cancelText = _props3$cancelText === undefined ? $l('Modal', 'cancel') : _props3$cancelText,
                _props3$footer = _props3.footer,
                footer = _props3$footer === undefined ? this.getDefaultFooter : _props3$footer;

            var funcType = drawer ? "raised" /* raised */ : getConfig('buttonFuncType');
            var okBtn = React.createElement(Button, _extends({ key: 'ok', funcType: funcType, color: "blue" /* blue */, onClick: this.handleOk, children: okText }, okProps));
            var cancelBtn = React.createElement(Button, _extends({ key: 'cancel', ref: this.saveCancelRef, funcType: funcType, onClick: this.handleCancel, children: cancelText }, cancelProps));
            if (typeof footer === 'function') {
                return this.getWrappedFooter(footer(okBtn, cancelBtn));
            }
            if (!isEmpty(footer, true)) {
                return this.getWrappedFooter(footer);
            }
        }
    }, {
        key: 'getWrappedFooter',
        value: function getWrappedFooter(footer) {
            var prefixCls = this.prefixCls;
            var drawer = this.props.drawer;

            var className = classNames(prefixCls + '-footer', _defineProperty({}, prefixCls + '-footer-drawer', !!drawer));
            return React.createElement(
                'div',
                { className: className },
                footer
            );
        }
    }, {
        key: 'close',
        value: function close() {
            var _props$close2 = this.props.close,
                close = _props$close2 === undefined ? noop : _props$close2;

            close();
        }
    }]);

    return Modal;
}(ViewComponent);

export default Modal;

Modal.displayName = 'Modal';
Modal.propTypes = _extends({}, ViewComponent.propTypes, {
    closable: PropTypes.bool,
    movable: PropTypes.bool,
    fullScreen: PropTypes.bool,
    maskClosable: PropTypes.bool,
    keyboardClosable: PropTypes.bool,
    header: PropTypes.bool,
    footer: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.bool]),
    destroyOnClose: PropTypes.bool,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    okProps: PropTypes.object,
    cancelProps: PropTypes.object,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    afterClose: PropTypes.func,
    okCancel: PropTypes.bool,
    drawer: PropTypes.bool,
    // title: PropTypes.node,
    // 此处原本允许title传入node，但是类型为PropTypes.node时无法正确继承ViewComponent
    // 父类中的title指的是HTML元素的title属性，此处title指modal标题，产生歧义，暂时设置为string
    // TODO: 添加modalTitle属性替代此处的title
    title: PropTypes.string,
    okFirst: PropTypes.bool
});
Modal.defaultProps = {
    suffixCls: 'modal',
    header: true,
    closable: false,
    movable: true,
    maskClosable: false,
    keyboardClosable: true,
    okCancel: true,
    destroyOnClose: true,
    fullScreen: false,
    drawer: false,
    autoFocus: true
};
tslib_1.__decorate([autobind], Modal.prototype, "handleHeaderMouseDown", null);
tslib_1.__decorate([autobind], Modal.prototype, "handleOk", null);
tslib_1.__decorate([autobind], Modal.prototype, "handleCancel", null);
tslib_1.__decorate([autobind], Modal.prototype, "close", null);