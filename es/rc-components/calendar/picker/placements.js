import _typeof from 'babel-runtime/helpers/typeof';
import cloneDeep from 'lodash/cloneDeep';

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

export var getPlacements = function getPlacements(placement) {
  var copyPlacements = cloneDeep(placements);
  if ((typeof placement === 'undefined' ? 'undefined' : _typeof(placement)) === 'object') {
    for (var offset in placement) {
      if (copyPlacements[offset]) {
        copyPlacements[offset].targetOffset = placement[offset];
      }
    }
  }
  return copyPlacements;
};

export default placements;