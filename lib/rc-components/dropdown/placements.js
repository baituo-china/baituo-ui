'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var targetOffset = [0, 0];

var placements = exports.placements = {
  topLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  topCenter: {
    points: ['bc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  bottomLeft: {
    points: ['tl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  bottomCenter: {
    points: ['tc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  }
};

exports['default'] = placements;