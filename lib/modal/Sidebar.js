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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _locale = require('./locale');

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isFixedWidth(width) {
    switch (typeof width === 'undefined' ? 'undefined' : (0, _typeof3['default'])(width)) {
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
    (0, _inherits3['default'])(Sidebar, _Component);

    function Sidebar(props) {
        (0, _classCallCheck3['default'])(this, Sidebar);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

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
            var runtimeLocale = (0, _locale.getConfirmLocale)();
            var okText = props.okText || (okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
            var cancelText = props.cancelText || runtimeLocale.cancelText;
            var cancalBtn = okCancel ? _react2['default'].createElement(
                _button2['default'],
                { className: prefixCls + '-btn-cancel', disabled: !alwaysCanCancel && confirmLoading, funcType: funcType, onClick: onCancel },
                cancelText
            ) : null;
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-btns' },
                _react2['default'].createElement(
                    _button2['default'],
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

    (0, _createClass3['default'])(Sidebar, [{
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('modal', this.props.prefixCls);
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
            var classString = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-sidebar', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sidebar-open', open), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sidebar-fixed-width', fixedWidth), _classNames), props.className);
            return _react2['default'].createElement(
                _Modal2['default'],
                (0, _extends3['default'])({}, this.props, { prefixCls: prefixCls, animationEnd: this.handleStatus, className: classString, visible: visible, title: props.title, transitionName: props.transitionName, footer: footer === undefined ? this.renderFooter() : footer, zIndex: zIndex, keyboard: keyboard, closable: false }),
                this.props.children
            );
        }
    }]);
    return Sidebar;
}(_react.Component);

exports['default'] = Sidebar;

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
module.exports = exports['default'];