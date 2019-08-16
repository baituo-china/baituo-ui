'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = addEventListenerWrap;

var _addDomEventListener = require('add-dom-event-listener');

var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function addEventListenerWrap(target, eventType, cb) {
    /* eslint camelcase: 2 */
    var callback = _reactDom.unstable_batchedUpdates ? function run(e) {
        (0, _reactDom.unstable_batchedUpdates)(cb, e);
    } : cb;
    return (0, _addDomEventListener2['default'])(target, eventType, callback);
}
module.exports = exports['default'];