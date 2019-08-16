'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _default = require('../locale-provider/default');

var _default2 = _interopRequireDefault(_default);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Popconfirm = function (_Component) {
    (0, _inherits3['default'])(Popconfirm, _Component);

    function Popconfirm(props) {
        (0, _classCallCheck3['default'])(this, Popconfirm);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Popconfirm.__proto__ || Object.getPrototypeOf(Popconfirm)).call(this, props));

        _this.onConfirm = function (e) {
            _this.setVisible(false);
            var onConfirm = _this.props.onConfirm;

            if (onConfirm) {
                onConfirm.call(_this, e);
            }
        };
        _this.onCancel = function (e) {
            _this.setVisible(false);
            var onCancel = _this.props.onCancel;

            if (onCancel) {
                onCancel.call(_this, e);
            }
        };
        _this.onVisibleChange = function (visible) {
            _this.setVisible(visible);
        };
        _this.saveTooltip = function (node) {
            _this.tooltip = node;
        };
        _this.renderOverlay = function (popconfirmLocale) {
            var _this$props = _this.props,
                title = _this$props.title,
                cancelText = _this$props.cancelText,
                okText = _this$props.okText,
                okType = _this$props.okType;

            var prefixCls = _this.getPrefixCls();
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-inner-content' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-message' },
                        _react2['default'].createElement(_icon2['default'], { type: 'warning' }),
                        _react2['default'].createElement(
                            'div',
                            { className: prefixCls + '-message-title' },
                            title
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-buttons' },
                        _react2['default'].createElement(
                            _button2['default'],
                            { onClick: _this.onCancel, size: "small" /* small */ },
                            cancelText || popconfirmLocale.cancelText
                        ),
                        _react2['default'].createElement(
                            _button2['default'],
                            { onClick: _this.onConfirm, type: okType, size: "small" /* small */ },
                            okText || popconfirmLocale.okText
                        )
                    )
                )
            );
        };
        _this.state = {
            visible: props.visible
        };
        return _this;
    }

    (0, _createClass3['default'])(Popconfirm, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('visible' in nextProps) {
                this.setState({ visible: nextProps.visible });
            }
        }
    }, {
        key: 'getPopupDomNode',
        value: function getPopupDomNode() {
            return this.tooltip.getPopupDomNode();
        }
    }, {
        key: 'setVisible',
        value: function setVisible(visible) {
            var props = this.props;
            if (!('visible' in props)) {
                this.setState({ visible: visible });
            }
            var onVisibleChange = props.onVisibleChange;

            if (onVisibleChange) {
                onVisibleChange(visible);
            }
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('popover', this.props.prefixCls);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                placement = _props.placement,
                restProps = (0, _objectWithoutProperties3['default'])(_props, ['placement']);

            var overlay = _react2['default'].createElement(
                _LocaleReceiver2['default'],
                { componentName: 'Popconfirm', defaultLocale: _default2['default'].Popconfirm },
                this.renderOverlay
            );
            return _react2['default'].createElement(_tooltip2['default'], (0, _extends3['default'])({}, restProps, { prefixCls: this.getPrefixCls(), placement: placement, onVisibleChange: this.onVisibleChange, visible: this.state.visible, overlay: overlay, ref: this.saveTooltip }));
        }
    }]);
    return Popconfirm;
}(_react.Component);

exports['default'] = Popconfirm;

Popconfirm.displayName = 'Popconfirm';
Popconfirm.defaultProps = {
    transitionName: 'zoom-big',
    placement: 'top',
    trigger: 'click',
    okType: 'primary'
};
module.exports = exports['default'];