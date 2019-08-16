'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _notification = require('../rc-components/notification');

var _notification2 = _interopRequireDefault(_notification);

var _util = require('./util');

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var defaultDuration = 3;
var defaultTop = 24;
var defaultBottom = 24;
var messageInstance = void 0;
var key = 1;
var customizePrefixCls = void 0;
var transitionName = 'move-up';
var defaultPlacement = 'leftBottom';
var getContainer = void 0;
function getCustomizePrefixCls() {
    return (0, _configure.getPrefixCls)('message', customizePrefixCls);
}
function getMessageInstance(placement, callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    _notification2['default'].newInstance({
        prefixCls: getCustomizePrefixCls(),
        style: (0, _util.getPlacementStyle)(placement, defaultTop, defaultBottom),
        transitionName: (0, _util.getPlacementTransitionName)(placement, transitionName),
        getContainer: getContainer
    }, function (instance) {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
}
function notice(content) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDuration;
    var type = arguments[2];
    var onClose = arguments[3];
    var placement = arguments[4];

    var iconType = {
        info: 'info',
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        loading: 'loading'
    }[type];
    if ((0, _isString2['default'])(onClose)) {
        placement = onClose;
        onClose = _noop2['default'];
    }
    if (typeof duration === 'function') {
        onClose = duration;
        duration = defaultDuration;
    } else if ((0, _isString2['default'])(duration)) {
        placement = duration;
    }
    var target = key++;
    var prefixCls = getCustomizePrefixCls();
    getMessageInstance(placement || defaultPlacement, function (instance) {
        instance.notice({
            key: target,
            duration: duration,
            style: {},
            content: _react2['default'].createElement(
                'div',
                { className: prefixCls + '-custom-content ' + prefixCls + '-' + type },
                _react2['default'].createElement(_icon2['default'], { type: iconType }),
                _react2['default'].createElement(
                    'span',
                    null,
                    content
                )
            ),
            onClose: onClose
        });
    });
    return function () {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
}
exports['default'] = {
    info: function info(content, duration, onClose, placement) {
        return notice(content, duration, 'info', onClose, placement);
    },
    success: function success(content, duration, onClose, placement) {
        return notice(content, duration, 'success', onClose, placement);
    },
    error: function error(content, duration, onClose, placement) {
        return notice(content, duration, 'error', onClose, placement);
    },

    // Departed usage, please use warning()
    warn: function warn(content, duration, onClose, placement) {
        return notice(content, duration, 'warning', onClose, placement);
    },
    warning: function warning(content, duration, onClose, placement) {
        return notice(content, duration, 'warning', onClose, placement);
    },
    loading: function loading(content, duration, onClose, placement) {
        return notice(content, duration, 'loading', onClose, placement);
    },
    config: function config(options) {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
        if (options.bottom !== undefined) {
            defaultBottom = options.bottom;
            messageInstance = null; // delete messageInstance for new defaultBottom
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.prefixCls !== undefined) {
            customizePrefixCls = options.prefixCls;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
        if (options.transitionName !== undefined) {
            transitionName = options.transitionName;
            messageInstance = null; // delete messageInstance for new transitionName
        }
        if (options.placement !== undefined) {
            defaultPlacement = options.placement;
        }
    },
    destroy: function destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
module.exports = exports['default'];