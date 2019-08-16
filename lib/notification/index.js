'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _notification = require('../rc-components/notification');

var _notification2 = _interopRequireDefault(_notification);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var notificationInstance = {};
var defaultDuration = 4.5;
var defaultTop = 24;
var defaultBottom = 24;
var defaultPlacement = 'topRight';
var defaultGetContainer = void 0;
function setNotificationConfig(options) {
    var duration = options.duration,
        placement = options.placement,
        bottom = options.bottom,
        top = options.top,
        getContainer = options.getContainer;

    if (duration !== undefined) {
        defaultDuration = duration;
    }
    if (placement !== undefined) {
        defaultPlacement = placement;
    }
    if (bottom !== undefined) {
        defaultBottom = bottom;
    }
    if (top !== undefined) {
        defaultTop = top;
    }
    if (getContainer !== undefined) {
        defaultGetContainer = getContainer;
    }
}
function getPlacementStyle(placement) {
    var style = void 0;
    switch (placement) {
        case 'topLeft':
            style = {
                left: 0,
                top: defaultTop,
                bottom: 'auto'
            };
            break;
        case 'topRight':
            style = {
                right: 0,
                top: defaultTop,
                bottom: 'auto'
            };
            break;
        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
        default:
            style = {
                right: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
    }
    return style;
}
function getNotificationInstance(prefixCls, placement, callback) {
    var cacheKey = prefixCls + '-' + placement;
    if (notificationInstance[cacheKey]) {
        callback(notificationInstance[cacheKey]);
        return;
    }
    _notification2['default'].newInstance({
        prefixCls: prefixCls,
        className: prefixCls + '-' + placement,
        style: getPlacementStyle(placement),
        getContainer: defaultGetContainer
    }, function (notification) {
        notificationInstance[cacheKey] = notification;
        callback(notification);
    });
}
var typeToIcon = {
    success: 'check',
    info: 'info',
    error: 'error',
    warning: 'warning'
};
function notice(args) {
    var outerPrefixCls = (0, _configure.getPrefixCls)('notification', args.prefixCls);
    var prefixCls = outerPrefixCls + '-notice';
    var duration = args.duration === undefined ? defaultDuration : args.duration;
    var iconNode = null;
    if (args.icon) {
        iconNode = _react2['default'].createElement(
            'span',
            { className: prefixCls + '-icon' },
            args.icon
        );
    } else if (args.type) {
        var iconType = typeToIcon[args.type];
        iconNode = _react2['default'].createElement(_icon2['default'], { className: prefixCls + '-icon ' + prefixCls + '-icon-' + args.type, type: iconType });
    }
    var autoMarginTag = !args.description && iconNode ? _react2['default'].createElement('span', { className: prefixCls + '-message-single-line-auto-margin' }) : null;
    getNotificationInstance(outerPrefixCls, args.placement || defaultPlacement, function (notification) {
        notification.notice({
            content: _react2['default'].createElement(
                'div',
                { className: iconNode ? prefixCls + '-with-icon' : '' },
                iconNode,
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-message' },
                    autoMarginTag,
                    args.message
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-description' },
                    args.description
                ),
                args.btn ? _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-btn' },
                    args.btn
                ) : null
            ),
            duration: duration,
            closable: true,
            onClose: args.onClose,
            key: args.key,
            style: args.style || {},
            className: args.className
        });
    });
}
var api = {
    open: notice,
    close: function close(key) {
        Object.keys(notificationInstance).forEach(function (cacheKey) {
            return notificationInstance[cacheKey].removeNotice(key);
        });
    },

    config: setNotificationConfig,
    destroy: function destroy() {
        Object.keys(notificationInstance).forEach(function (cacheKey) {
            notificationInstance[cacheKey].destroy();
            delete notificationInstance[cacheKey];
        });
    }
};
['success', 'info', 'warning', 'error'].forEach(function (type) {
    api[type] = function (args) {
        return api.open((0, _extends3['default'])({}, args, {
            type: type
        }));
    };
});
api.warn = api.warning;
exports['default'] = api;
module.exports = exports['default'];