'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlacements = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var targetOffset = [0, 0];

var placements = {
  bottomLeft: {
    points: ['tl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  },
  topLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  }
};

var getPlacements = exports.getPlacements = function getPlacements(placement) {
  var copyPlacements = (0, _cloneDeep2['default'])(placements);
  if ((typeof placement === 'undefined' ? 'undefined' : (0, _typeof3['default'])(placement)) === 'object') {
    for (var offset in placement) {
      if (copyPlacements[offset]) {
        copyPlacements[offset].targetOffset = placement[offset];
      }
    }
  }
  return copyPlacements;
};

exports['default'] = placements;