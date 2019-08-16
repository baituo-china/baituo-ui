'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Modal2['default'].info = function (props) {
    var config = (0, _extends3['default'])({
        type: 'info',
        okCancel: false
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].success = function (props) {
    var config = (0, _extends3['default'])({
        type: 'success',
        iconType: 'check_circle',
        okCancel: false
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].error = function (props) {
    var config = (0, _extends3['default'])({
        type: 'error',
        iconType: 'error',
        okCancel: false
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].warning = _Modal2['default'].warn = function (props) {
    var config = (0, _extends3['default'])({
        type: 'warning',
        iconType: 'warning',
        okCancel: false
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].confirm = function (props) {
    var config = (0, _extends3['default'])({
        type: 'confirm',
        okCancel: true
    }, props);
    return (0, _confirm2['default'])(config);
};
_Modal2['default'].Sidebar = _Sidebar2['default'];
exports['default'] = _Modal2['default'];
module.exports = exports['default'];