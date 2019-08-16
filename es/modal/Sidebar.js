import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _typeof from 'babel-runtime/helpers/typeof';
import React, { Component } from 'react';
import classNames from 'classnames';
import Dialog from './Modal';
import Button from '../button';
import { getConfirmLocale } from './locale';
import { getPrefixCls as _getPrefixCls } from '../configure';
function isFixedWidth(width) {
    switch (typeof width === 'undefined' ? 'undefined' : _typeof(width)) {
        case 'undefined':
            return false;
        case 'number':
            return true;
        case 'string':
            // width: 100%不是固定宽度
            return width.indexOf('%') === -1;
        default:
            return false;
    }
}

var Sidebar = function (_Component) {
    _inherits(Sidebar, _Component);

    function Sidebar(props) {
        _classCallCheck(this, Sidebar);

        var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

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
        _this.renderFooter = function () {
            var props = _this.props;
            var onCancel = props.onCancel,
                onOk = props.onOk,
                okType = props.okType,
                funcType = props.funcType,
                confirmLoading = props.confirmLoading,
                alwaysCanCancel = props.alwaysCanCancel;

            var prefixCls = _this.getPrefixCls();
            var okCancel = 'okCancel' in props ? props.okCancel : true;
            var runtimeLocale = getConfirmLocale();
            var okText = props.okText || (okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
            var cancelText = props.cancelText || runtimeLocale.cancelText;
            var cancalBtn = okCancel ? React.createElement(
                Button,
                { className: prefixCls + '-btn-cancel', disabled: !alwaysCanCancel && confirmLoading, funcType: funcType, onClick: onCancel },
                cancelText
            ) : null;
            return React.createElement(
                'div',
                { className: prefixCls + '-btns' },
                React.createElement(
                    Button,
                    { className: prefixCls + '-btn-ok', loading: confirmLoading, funcType: funcType, type: okType, onClick: onOk },
                    okText
                ),
                cancalBtn
            );
        };
        _this.handleStatus = function () {
            var open = _this.state.open;

            _this.setState({
                open: !open
            });
        };
        _this.state = {
            open: false
        };
        return _this;
    }

    _createClass(Sidebar, [{
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return _getPrefixCls('modal', this.props.prefixCls);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var props = this.props;
            var zIndex = props.zIndex,
                visible = props.visible,
                keyboard = props.keyboard,
                footer = props.footer,
                width = props.width;

            var prefixCls = this.getPrefixCls();
            var open = this.state.open;

            var fixedWidth = isFixedWidth(width);
            var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-sidebar', true), _defineProperty(_classNames, prefixCls + '-sidebar-open', open), _defineProperty(_classNames, prefixCls + '-sidebar-fixed-width', fixedWidth), _classNames), props.className);
            return React.createElement(
                Dialog,
                _extends({}, this.props, { prefixCls: prefixCls, animationEnd: this.handleStatus, className: classString, visible: visible, title: props.title, transitionName: props.transitionName, footer: footer === undefined ? this.renderFooter() : footer, zIndex: zIndex, keyboard: keyboard, closable: false }),
                this.props.children
            );
        }
    }]);

    return Sidebar;
}(Component);

export default Sidebar;

Sidebar.displayName = 'Sidebar';
Sidebar.defaultProps = {
    width: '100%',
    transitionName: 'slide-right',
    maskTransitionName: 'fade',
    confirmLoading: false,
    alwaysCanCancel: false,
    visible: false,
    okType: 'primary',
    funcType: 'raised'
};