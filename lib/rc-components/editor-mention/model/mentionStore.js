'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('core-js/library/fn/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var offset = new _map2['default']();
var mentionStore = {
  offset: offset,
  getOffset: function getOffset() {
    return offset;
  },
  getTrigger: function getTrigger(offsetKey) {
    var currentOffset = offset.get(offsetKey);
    return currentOffset && currentOffset.trigger;
  },
  activeSuggestion: function activeSuggestion(_ref) {
    var offsetKey = _ref.offsetKey;

    offset.set(offsetKey, {
      offsetKey: offsetKey
    });
  },
  inActiveSuggestion: function inActiveSuggestion(_ref2) {
    var offsetKey = _ref2.offsetKey;

    offset['delete'](offsetKey);
  },
  updateSuggestion: function updateSuggestion(_ref3) {
    var offsetKey = _ref3.offsetKey,
        position = _ref3.position,
        trigger = _ref3.trigger;

    offset.set(offsetKey, {
      offsetKey: offsetKey,
      position: position,
      trigger: trigger
    });
  }
};

exports['default'] = mentionStore;
module.exports = exports['default'];