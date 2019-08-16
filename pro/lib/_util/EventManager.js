'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopEvent = exports.stopPropagation = exports.preventDefault = undefined;

var _EventManager = require('../../../lib/_util/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _EventManager2['default'];
exports.preventDefault = _EventManager.preventDefault;
exports.stopPropagation = _EventManager.stopPropagation;
exports.stopEvent = _EventManager.stopEvent;