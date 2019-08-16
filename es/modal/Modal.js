import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getConfirmLocale } from './locale';
import Dialog from '../rc-components/dialog';
import addEventListener from '../_util/addEventListener';
import { getPrefixCls } from '../configure';
var mousePosition = void 0;
var mousePositionEventBinded = void 0;

var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal() {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));

        _this.handleCancel = function (e) {
            var onCancel = _this.props.onCancel;
            if (onCancel) {
                onCancel(e);
            }
        };
        _this.handleOk = function (e) {
            var onOk = _this.props.onOk;
            if (onOk) {
                onOk(e);
            }
        };
        _this.renderFooter = function (locale) {
            var _this$props = _this.props,
                okText = _this$props.okText,
                okType = _this$props.okType,
                cancelText = _this$props.cancelText,
                confirmLoading = _this$props.confirmLoading,
                funcType = _this$props.funcType,
                disableOk = _this$props.disableOk,
                disableCancel = _this$props.disableCancel;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Button,
                    { disabled: disableCancel || confirmLoading, onClick: _this.handleCancel, funcType: funcType },
                    cancelText || locale.cancelText
                ),
                React.createElement(
                    Button,
                    { type: okType, funcType: funcType, disabled: disableOk, loading: confirmLoading, onClick: _this.handleOk },
                    okText || locale.okText
                )
            );
        };
        return _this;
    }

    _createClass(Modal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (mousePositionEventBinded) {
                return;
            }
            // 只有点击事件支持从鼠标位置动画展开
            addEventListener(document.documentElement, 'click', function (e) {
                mousePosition = {
                    x: e.pageX,
                    y: e.pageY
                };
                // 100ms 内发生过点击事件，则从点击位置动画展示
                // 否则直接 zoom 展示
                // 这样可以兼容非点击方式展开
                setTimeout(function () {
                    return mousePosition = null;
                }, 100);
            });
            mousePositionEventBinded = true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                footer = _props.footer,
                visible = _props.visible,
                customizePrefixCls = _props.prefixCls;

            var prefixCls = getPrefixCls('modal', customizePrefixCls);
            var defaultFooter = React.createElement(
                LocaleReceiver,
                { componentName: 'Modal', defaultLocale: getConfirmLocale() },
                this.renderFooter
            );
            return React.createElement(Dialog, _extends({}, this.props, { prefixCls: prefixCls, footer: footer === undefined ? defaultFooter : footer, visible: visible, mousePosition: mousePosition, onClose: this.handleCancel }));
        }
    }]);

    return Modal;
}(Component);

export default Modal;

Modal.displayName = 'Modal';
Modal.defaultProps = {
    width: 520,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    confirmLoading: false,
    disableOk: false,
    disableCancel: false,
    visible: false,
    okType: 'primary',
    center: false
};
Modal.propTypes = {
    prefixCls: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool,
    align: PropTypes.object,
    footer: PropTypes.node,
    title: PropTypes.node,
    closable: PropTypes.bool,
    transitionName: PropTypes.string,
    funcType: PropTypes.string,
    center: PropTypes.bool
};