'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rcPlacements = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getOverflowOptions = getOverflowOptions;
exports['default'] = getPlacements;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var rcAutoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};
var targetOffset = [0, 0];
var OFFSET_UNIT = 10;
var rcPlacements = exports.rcPlacements = {
    left: {
        points: ['cr', 'cl'],
        overflow: rcAutoAdjustOverflow,
        offset: [-OFFSET_UNIT, 0],
        targetOffset: targetOffset
    },
    right: {
        points: ['cl', 'cr'],
        overflow: rcAutoAdjustOverflow,
        offset: [OFFSET_UNIT, 0],
        targetOffset: targetOffset
    },
    top: {
        points: ['bc', 'tc'],
        overflow: rcAutoAdjustOverflow,
        offset: [0, -OFFSET_UNIT],
        targetOffset: targetOffset
    },
    bottom: {
        points: ['tc', 'bc'],
        overflow: rcAutoAdjustOverflow,
        offset: [0, OFFSET_UNIT],
        targetOffset: targetOffset
    },
    topLeft: {
        points: ['bl', 'tl'],
        overflow: rcAutoAdjustOverflow,
        offset: [0, -OFFSET_UNIT],
        targetOffset: targetOffset
    },
    leftTop: {
        points: ['tr', 'tl'],
        overflow: rcAutoAdjustOverflow,
        offset: [-OFFSET_UNIT, 0],
        targetOffset: targetOffset
    },
    topRight: {
        points: ['br', 'tr'],
        overflow: rcAutoAdjustOverflow,
        offset: [0, -OFFSET_UNIT],
        targetOffset: targetOffset
    },
    rightTop: {
        points: ['tl', 'tr'],
        overflow: rcAutoAdjustOverflow,
        offset: [OFFSET_UNIT, 0],
        targetOffset: targetOffset
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow: rcAutoAdjustOverflow,
        offset: [0, OFFSET_UNIT],
        targetOffset: targetOffset
    },
    rightBottom: {
        points: ['bl', 'br'],
        overflow: rcAutoAdjustOverflow,
        offset: [OFFSET_UNIT, 0],
        targetOffset: targetOffset
    },
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow: rcAutoAdjustOverflow,
        offset: [0, OFFSET_UNIT],
        targetOffset: targetOffset
    },
    leftBottom: {
        points: ['br', 'bl'],
        overflow: rcAutoAdjustOverflow,
        offset: [-OFFSET_UNIT, 0],
        targetOffset: targetOffset
    }
};
var autoAdjustOverflowEnabled = {
    adjustX: 1,
    adjustY: 1
};
var autoAdjustOverflowDisabled = {
    adjustX: 0,
    adjustY: 0
};
function getOverflowOptions(autoAdjustOverflow) {
    if (typeof autoAdjustOverflow === 'boolean') {
        return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
    }
    return (0, _extends3['default'])({}, autoAdjustOverflowDisabled, autoAdjustOverflow);
}
function getPlacements() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _config$arrowWidth = config.arrowWidth,
        arrowWidth = _config$arrowWidth === undefined ? 5 : _config$arrowWidth,
        _config$horizontalArr = config.horizontalArrowShift,
        horizontalArrowShift = _config$horizontalArr === undefined ? 16 : _config$horizontalArr,
        _config$verticalArrow = config.verticalArrowShift,
        verticalArrowShift = _config$verticalArrow === undefined ? 12 : _config$verticalArrow,
        _config$autoAdjustOve = config.autoAdjustOverflow,
        autoAdjustOverflow = _config$autoAdjustOve === undefined ? true : _config$autoAdjustOve;

    var placementMap = {
        left: {
            points: ['cr', 'cl'],
            offset: [-4, 0]
        },
        right: {
            points: ['cl', 'cr'],
            offset: [4, 0]
        },
        top: {
            points: ['bc', 'tc'],
            offset: [0, -4]
        },
        bottom: {
            points: ['tc', 'bc'],
            offset: [0, 4]
        },
        topLeft: {
            points: ['bl', 'tc'],
            offset: [-(horizontalArrowShift + arrowWidth), -4]
        },
        leftTop: {
            points: ['tr', 'cl'],
            offset: [-4, -(verticalArrowShift + arrowWidth)]
        },
        topRight: {
            points: ['br', 'tc'],
            offset: [horizontalArrowShift + arrowWidth, -4]
        },
        rightTop: {
            points: ['tl', 'cr'],
            offset: [4, -(verticalArrowShift + arrowWidth)]
        },
        bottomRight: {
            points: ['tr', 'bc'],
            offset: [horizontalArrowShift + arrowWidth, 4]
        },
        rightBottom: {
            points: ['bl', 'cr'],
            offset: [4, verticalArrowShift + arrowWidth]
        },
        bottomLeft: {
            points: ['tl', 'bc'],
            offset: [-(horizontalArrowShift + arrowWidth), 4]
        },
        leftBottom: {
            points: ['br', 'cl'],
            offset: [-4, verticalArrowShift + arrowWidth]
        }
    };
    Object.keys(placementMap).forEach(function (key) {
        placementMap[key] = config.arrowPointAtCenter ? (0, _extends3['default'])({}, placementMap[key], {
            overflow: getOverflowOptions(autoAdjustOverflow),
            targetOffset: targetOffset
        }) : (0, _extends3['default'])({}, rcPlacements[key], {
            overflow: getOverflowOptions(autoAdjustOverflow)
        });
    });
    return placementMap;
}