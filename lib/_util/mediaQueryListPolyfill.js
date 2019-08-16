"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var matchMediaPolifill = exports.matchMediaPolifill = function matchMediaPolifill(mediaQuery) {
    // console.warn('`matchMedia` is not supported!');
    return {
        media: mediaQuery,
        matches: false,
        addListener: function addListener() {},
        removeListener: function removeListener() {}
    };
};