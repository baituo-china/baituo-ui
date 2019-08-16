'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var jsonMimeType = 'application/json';
var instance = _axios2['default'].create({
    timeout: 30000,
    headers: {
        'Content-Type': jsonMimeType,
        Accept: jsonMimeType,
        'X-Requested-With': 'XMLHttpRequest'
    }
});
// http response 拦截器
instance.interceptors.response.use(function (response) {
    var status = response.status,
        data = response.data;

    if (status === 204) {
        return response;
    }
    if (data.success === false) {
        throw data;
    } else {
        return data;
    }
});
exports['default'] = instance;
module.exports = exports['default'];