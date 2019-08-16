'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _LookupCodeStore = require('./LookupCodeStore');

var _LookupCodeStore2 = _interopRequireDefault(_LookupCodeStore);

var _LovCodeStore = require('./LovCodeStore');

var _LovCodeStore2 = _interopRequireDefault(_LovCodeStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var stores = {
    LovCodeStore: _LovCodeStore2['default'],
    LookupCodeStore: _LookupCodeStore2['default']
};
exports['default'] = stores;
module.exports = exports['default'];