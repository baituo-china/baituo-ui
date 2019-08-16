import React from 'react';
import noop from 'lodash/noop';
import isString from 'lodash/isString';
import Icon from '../icon';
import Notification from '../rc-components/notification';
import { getPlacementStyle, getPlacementTransitionName } from './util';
import { getPrefixCls } from '../configure';
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
    return getPrefixCls('message', customizePrefixCls);
}
function getMessageInstance(placement, callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    Notification.newInstance({
        prefixCls: getCustomizePrefixCls(),
        style: getPlacementStyle(placement, defaultTop, defaultBottom),
        transitionName: getPlacementTransitionName(placement, transitionName),
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
    if (isString(onClose)) {
        placement = onClose;
        onClose = noop;
    }
    if (typeof duration === 'function') {
        onClose = duration;
        duration = defaultDuration;
    } else if (isString(duration)) {
        placement = duration;
    }
    var target = key++;
    var prefixCls = getCustomizePrefixCls();
    getMessageInstance(placement || defaultPlacement, function (instance) {
        instance.notice({
            key: target,
            duration: duration,
            style: {},
            content: React.createElement(
                'div',
                { className: prefixCls + '-custom-content ' + prefixCls + '-' + type },
                React.createElement(Icon, { type: iconType }),
                React.createElement(
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
export default {
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