'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _ModalContainer = require('../modal-container/ModalContainer');

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _localeContext = require('../locale-context');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Modal2['default'].key = _ModalContainer.getKey;
_Modal2['default'].open = _ModalContainer.open;
_Modal2['default'].confirm = _confirm2['default'];
_Modal2['default'].info = function (props) {
    return (0, _confirm2['default'])((0, _extends3['default'])({
        type: 'info',
        iconType: 'info',
        okCancel: false
    }, (0, _utils.normalizeProps)(props)));
};
_Modal2['default'].success = function (props) {
    return (0, _confirm2['default'])((0, _extends3['default'])({
        type: 'success',
        title: (0, _localeContext.$l)('Modal', 'success_modal_title'),
        iconType: 'check_circle',
        okCancel: false
    }, (0, _utils.normalizeProps)(props)));
};
_Modal2['default'].error = function (props) {
    return (0, _confirm2['default'])((0, _extends3['default'])({
        type: 'error',
        title: (0, _localeContext.$l)('Modal', 'error_modal_title'),
        iconType: 'cancel',
        okCancel: false
    }, (0, _utils.normalizeProps)(props)));
};
_Modal2['default'].warning = function (props) {
    return (0, _confirm2['default'])((0, _extends3['default'])({
        type: 'warning',
        title: (0, _localeContext.$l)('Modal', 'warning_modal_title'),
        iconType: 'warning',
        okCancel: false
    }, (0, _utils.normalizeProps)(props)));
};
exports['default'] = _Modal2['default'];
module.exports = exports['default'];