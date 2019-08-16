'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = measureScrollbar;
var scrollbarWidth = void 0;
var rootFontSize = 100;
function getRootFontSize() {
    if (typeof window !== 'undefined' && document.defaultView) {
        var _document$defaultView = document.defaultView.getComputedStyle(document.documentElement),
            fontSize = _document$defaultView.fontSize;

        if (fontSize !== null) {
            return parseFloat(fontSize);
        }
    }
    return 100;
}
function measureScrollbar() {
    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vertical';

    if (typeof window === 'undefined') {
        return 0;
    }
    var fontSize = getRootFontSize();
    if (scrollbarWidth && fontSize === rootFontSize) {
        return scrollbarWidth;
    }
    rootFontSize = fontSize;
    var scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = 'position: absolute;width: 50px;height: 50px;top: -9999px; overflow: scroll';
    document.body.appendChild(scrollDiv);
    var size = 0;
    if (direction === 'vertical') {
        size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    } else if (direction === 'horizontal') {
        size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
    }
    document.body.removeChild(scrollDiv);
    scrollbarWidth = size / fontSize * 100;
    return scrollbarWidth;
}
module.exports = exports['default'];