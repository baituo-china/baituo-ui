'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _TriggerField2 = require('../trigger-field/TriggerField');

var _TriggerField3 = _interopRequireDefault(_TriggerField2);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _EventManager = require('../_util/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getNodeRect(node) {
    return node.getBoundingClientRect();
}
var ColorPicker = function (_TriggerField) {
    (0, _inherits3['default'])(ColorPicker, _TriggerField);

    function ColorPicker() {
        (0, _classCallCheck3['default'])(this, ColorPicker);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).apply(this, arguments));

        _this.eventManager = new _EventManager2['default'](typeof window !== 'undefined' && document);
        _this.HSV = {
            h: 0,
            s: 1,
            v: 1,
            a: 1
        };
        _this.saveGradientRef = function (node) {
            return _this.gradient = node;
        };
        _this.saveSelectPointerRef = function (node) {
            return _this.selectPointer = node;
        };
        _this.saveHuePointerRef = function (node) {
            return _this.huePointer = node;
        };
        _this.saveHueRef = function (node) {
            return _this.hue = node;
        };
        _this.saveOpacityRef = function (node) {
            return _this.opacity = node;
        };
        _this.saveOpacityPointerRef = function (node) {
            return _this.opacityPointer = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(ColorPicker, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var popup = this.popup;

            if (popup) {
                var _HSV = this.HSV,
                    h = _HSV.h,
                    s = _HSV.s,
                    v = _HSV.v;
                var huePointer = this.huePointer,
                    selectPointer = this.selectPointer,
                    hue = this.hue,
                    gradient = this.gradient;

                if (huePointer && hue) {
                    var _getNodeRect = getNodeRect(hue),
                        width = _getNodeRect.width;

                    this.setHuePointer(width * h / 360, huePointer, hue, false);
                }
                if (selectPointer && gradient) {
                    var _getNodeRect2 = getNodeRect(gradient),
                        _width = _getNodeRect2.width,
                        height = _getNodeRect2.height;

                    var left = s * _width;
                    var top = height - v * height;
                    this.setGradientPointer(left, top, selectPointer, gradient, false);
                }
            }
        }
    }, {
        key: 'syncValueOnBlur',
        value: function syncValueOnBlur(value) {
            if (value[0] !== '#' && !value.startsWith('rgb') && !value.startsWith('hls')) {
                value = '#' + value;
            }
            (0, _get3['default'])(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'syncValueOnBlur', this).call(this, value);
        }
    }, {
        key: 'getFieldType',
        value: function getFieldType() {
            return "color" /* color */;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return (0, _get3['default'])(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'getValue', this).call(this) || this.hueColor;
        }
    }, {
        key: 'getPrefix',
        value: function getPrefix() {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-prefix' },
                _react2['default'].createElement('span', { className: prefixCls + '-color', style: { backgroundColor: this.getValue() } })
            );
        }
    }, {
        key: 'getPopupFooter',
        value: function getPopupFooter() {
            var prefixCls = this.prefixCls;

            var huePointerProps = {
                onMouseDown: this.handleHPMouseDown,
                ref: this.saveHuePointerRef,
                className: prefixCls + '-popup-footer-slider-pointer'
            };
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-popup-footer' },
                _react2['default'].createElement(
                    'div',
                    { ref: this.saveHueRef, className: prefixCls + '-popup-footer-slider' },
                    _react2['default'].createElement('div', { onClick: this.handleHueClick, className: 'hue' }),
                    _react2['default'].createElement('div', huePointerProps)
                ),
                _react2['default'].createElement(
                    'div',
                    { ref: this.saveOpacityRef, className: prefixCls + '-popup-footer-slider opacity' },
                    _react2['default'].createElement('div', { ref: this.saveOpacityPointerRef, className: prefixCls + '-popup-footer-slider-pointer' })
                )
            );
        }
    }, {
        key: 'getPopupContent',
        value: function getPopupContent() {
            var prefixCls = this.prefixCls;

            var gradientProps = {
                className: prefixCls + '-popup-body-gradient',
                onClick: this.handleGPClick,
                ref: this.saveGradientRef
            };
            var gradientPointerProps = {
                onMouseDown: this.handleGPMouseDown,
                ref: this.saveSelectPointerRef,
                className: prefixCls + '-popup-body-selector'
            };
            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-popup-view' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-popup-body', style: { backgroundColor: this.getValue() } },
                    _react2['default'].createElement('div', gradientProps),
                    _react2['default'].createElement('div', gradientPointerProps)
                ),
                this.getPopupFooter()
            );
        }
    }, {
        key: 'setHSV',
        value: function setHSV(h, s, v, a) {
            var HSV = this.HSV;

            if (h !== void 0 && h !== HSV.h) {
                HSV.h = h;
            }
            if (v !== void 0 && v !== HSV.v) {
                HSV.v = v;
            }
            if (s !== void 0 && s !== HSV.s) {
                HSV.s = s;
            }
            if (a !== void 0 && a !== HSV.a) {
                HSV.a = a;
            }
        }
    }, {
        key: 'setHueColor',
        value: function setHueColor(color) {
            if (color !== this.hueColor) {
                this.hueColor = color;
            }
        }
    }, {
        key: 'setColor',
        value: function setColor(color) {
            if (color !== void 0 && color.slice(0, 1) === '#' && color.length > 3) {
                var gradient = this.gradient,
                    selectPointer = this.selectPointer,
                    hue = this.hue,
                    huePointer = this.huePointer;

                var _hexToRGB = this.hexToRGB(color),
                    r = _hexToRGB.r,
                    g = _hexToRGB.g,
                    b = _hexToRGB.b,
                    a = _hexToRGB.a;

                var _rgbToHSV = this.rgbToHSV(r / 255, g / 255, b / 255, a),
                    h = _rgbToHSV.h,
                    s = _rgbToHSV.s,
                    v = _rgbToHSV.v;

                this.setHSV(h, s, v, a);

                var _hsvToRGB = this.hsvToRGB(h, 1, 1, 1),
                    hr = _hsvToRGB.r,
                    hg = _hsvToRGB.g,
                    hb = _hsvToRGB.b,
                    ha = _hsvToRGB.a;

                var hueColor = this.rgbToHEX(hr, hg, hb, ha);
                this.setHueColor(hueColor);

                var _getNodeRect3 = getNodeRect(gradient),
                    height = _getNodeRect3.height,
                    width = _getNodeRect3.width;

                var left = s * width;
                var top = height - v * height;

                var _getNodeRect4 = getNodeRect(hue),
                    hueWidth = _getNodeRect4.width;

                var hueLeft = h / 360 * hueWidth;
                this.setHuePointer(hueLeft, huePointer, hue, false);
                this.setGradientPointer(left, top, selectPointer, gradient, false);
            }
        }
    }, {
        key: 'positionToHSV',
        value: function positionToHSV(left, top, width, height) {
            var _HSV2 = this.HSV,
                h = _HSV2.h,
                a = _HSV2.a;

            if (width < 0) {
                width = 0;
            }
            var s = left / width;
            var v = 1 - top / height;
            return { h: h, s: s, v: v, a: a };
        }
    }, {
        key: 'rgbToHEX',
        value: function rgbToHEX(r, g, b, a) {
            function hex(num) {
                var hexNum = num.toString(16);
                return hexNum.length === 1 ? '0' + hexNum : hexNum;
            }
            if (a !== 1) {
                return '#' + hex(r) + hex(g) + hex(b) + hex(a * 255 / 10);
            }
            return '#' + hex(r) + hex(g) + hex(b);
        }
    }, {
        key: 'hexToRGB',
        value: function hexToRGB(hex) {
            hex = hex.split('#')[1] || hex.split('#')[0];
            var length = hex.length;
            var results = '';
            var hexArray = hex.split('');
            if (length === 3 || length === 4) {
                for (var i = 0; i < length; i++) {
                    results = '' + results + hexArray[i] + hexArray[i];
                }
            } else if (length === 5) {
                results = '' + hex + hexArray[length - 1];
            } else {
                results = hex;
            }
            results = results.slice(0, 6);
            var result = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(results);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                a: 1
            } : {
                r: 255,
                g: 0,
                b: 0,
                a: 1
            };
        }
    }, {
        key: 'rgbToHSV',
        value: function rgbToHSV(r, g, b, a) {
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var v = max;
            var s = void 0;
            var h = void 0;
            if (v === 0) {
                s = 0;
            } else {
                s = (max - min) / max;
            }
            if (max === min) {
                h = 0;
            } else {
                var d = r === min ? g - b : b === min ? r - g : b - r;
                var m = r === min ? 3 : b === min ? 1 : 5;
                h = 60 * (m - d / (max - min));
            }
            if (h < 0) {
                h = h + 360;
            }
            return { h: h, s: s, v: v, a: a };
        }
    }, {
        key: 'hsvToRGB',
        value: function hsvToRGB(h, s, v, a) {
            h = h / 60;
            var h1 = Math.floor(h);
            var f = h - h1;
            var p = v * (1 - s);
            var q = v * (1 - f * s);
            var t = v * (1 - (1 - f) * s);
            var rgb = void 0;
            switch (h1) {
                case 0:
                    rgb = { r: v, g: t, b: p, a: a };
                    break;
                case 1:
                    rgb = { r: q, g: v, b: p, a: a };
                    break;
                case 2:
                    rgb = { r: p, g: v, b: t, a: a };
                    break;
                case 3:
                    rgb = { r: p, g: q, b: v, a: a };
                    break;
                case 4:
                    rgb = { r: t, g: p, b: v, a: a };
                    break;
                default:
                    rgb = { r: v, g: p, b: q, a: a };
                    break;
            }
            rgb.r = Math.floor(rgb.r * 255);
            rgb.g = Math.floor(rgb.g * 255);
            rgb.b = Math.floor(rgb.b * 255);
            return rgb;
        }
    }, {
        key: 'setGradientPointer',
        value: function setGradientPointer(x, y, pointer, wrap, isClient) {
            var _getNodeRect5 = getNodeRect(wrap),
                wrapX = _getNodeRect5.left,
                wrapY = _getNodeRect5.top,
                wrapW = _getNodeRect5.width,
                wrapH = _getNodeRect5.height;

            var _getNodeRect6 = getNodeRect(pointer),
                pointerH = _getNodeRect6.height,
                pointerW = _getNodeRect6.width;

            var left = void 0;
            var top = void 0;
            if (isClient) {
                left = x - wrapX < 0 ? 0 : x - wrapX > wrapW ? wrapW : x - wrapX;
                top = y - wrapY < 0 ? 0 : y - wrapY > wrapH ? wrapH : y - wrapY;
            } else {
                left = x;
                top = y;
            }
            pointer.style.left = left - pointerH / 2 + 'px';
            pointer.style.top = top - pointerW / 2 + 'px';
            return { left: left, top: top };
        }
    }, {
        key: 'handleGPClick',
        value: function handleGPClick(e) {
            var gradient = this.gradient,
                selectPointer = this.selectPointer,
                setGradientPointer = this.setGradientPointer;

            if (gradient && selectPointer) {
                var positionToHSV = this.positionToHSV,
                    rgbToHEX = this.rgbToHEX,
                    hsvToRGB = this.hsvToRGB;

                var _setGradientPointer = setGradientPointer(e.clientX, e.clientY, selectPointer, gradient, true),
                    left = _setGradientPointer.left,
                    top = _setGradientPointer.top;

                var _getNodeRect7 = getNodeRect(gradient),
                    height = _getNodeRect7.height,
                    width = _getNodeRect7.width;

                var _positionToHSV = positionToHSV(left, top, width, height),
                    h = _positionToHSV.h,
                    s = _positionToHSV.s,
                    v = _positionToHSV.v,
                    opacity = _positionToHSV.a;

                this.setHSV(undefined, s, v, undefined);

                var _hsvToRGB2 = hsvToRGB(h, s, v, opacity),
                    r = _hsvToRGB2.r,
                    g = _hsvToRGB2.g,
                    b = _hsvToRGB2.b,
                    a = _hsvToRGB2.a;

                var hexColor = rgbToHEX(r, g, b, a);
                this.setValue(hexColor);
            }
        }
    }, {
        key: 'setHuePointer',
        value: function setHuePointer(x, pointer, wrap, isClient) {
            var _getNodeRect8 = getNodeRect(wrap),
                wrapX = _getNodeRect8.left,
                wrapW = _getNodeRect8.width;

            var _getNodeRect9 = getNodeRect(pointer),
                pointerW = _getNodeRect9.width;

            var left = void 0;
            if (isClient) {
                left = x - wrapX < 0 ? 0 : x - wrapX > wrapW ? wrapW : x - wrapX;
            } else {
                left = x;
            }
            pointer.style.left = left - pointerW / 2 + 'px';
            if (left === wrapW) {
                return { left: 0, wrapW: wrapW };
            }
            return { left: left, wrapW: wrapW };
        }
    }, {
        key: 'handleHueClick',
        value: function handleHueClick(e) {
            var hue = this.hue,
                huePointer = this.huePointer,
                setHuePointer = this.setHuePointer,
                hsvToRGB = this.hsvToRGB,
                rgbToHEX = this.rgbToHEX;

            if (hue && huePointer) {
                var _setHuePointer = setHuePointer(e.clientX, huePointer, hue, true),
                    left = _setHuePointer.left,
                    wrapW = _setHuePointer.wrapW;

                var h = Math.floor(left / wrapW * 360);
                var _HSV3 = this.HSV,
                    s = _HSV3.s,
                    v = _HSV3.v,
                    opacity = _HSV3.a;

                this.setHSV(h, undefined, undefined, undefined);

                var _hsvToRGB3 = hsvToRGB(h, 1, 1, 1),
                    r = _hsvToRGB3.r,
                    g = _hsvToRGB3.g,
                    b = _hsvToRGB3.b,
                    a = _hsvToRGB3.a;

                var _hsvToRGB4 = hsvToRGB(h, s, v, opacity),
                    valueR = _hsvToRGB4.r,
                    valueG = _hsvToRGB4.g,
                    valueB = _hsvToRGB4.b,
                    valueA = _hsvToRGB4.a;

                var hueColor = rgbToHEX(r, g, b, a);
                var valueColor = rgbToHEX(valueR, valueG, valueB, valueA);
                this.setHueColor(hueColor);
                this.setValue(valueColor);
            }
        }
    }, {
        key: 'handleGPMouseDown',
        value: function handleGPMouseDown() {
            this.eventManager.addEventListener('mousemove', this.handleGPClick).addEventListener('mouseup', this.onGPMouseUp);
        }
    }, {
        key: 'onGPMouseUp',
        value: function onGPMouseUp() {
            this.eventManager.removeEventListener('mousemove', this.handleGPClick).removeEventListener('mouseup', this.onGPMouseUp);
        }
    }, {
        key: 'handleHPMouseDown',
        value: function handleHPMouseDown() {
            this.eventManager.addEventListener('mousemove', this.handleHueClick).addEventListener('mouseup', this.onHPMouseUp);
        }
    }, {
        key: 'onHPMouseUp',
        value: function onHPMouseUp() {
            this.eventManager.removeEventListener('mousemove', this.handleHueClick).removeEventListener('mouseup', this.onHPMouseUp);
        }
    }, {
        key: 'handlePopupAnimateAppear',
        value: function handlePopupAnimateAppear() {
            this.setColor(this.getValue());
        }
    }, {
        key: 'handlePopupAnimateEnd',
        value: function handlePopupAnimateEnd() {}
    }, {
        key: 'getPopupStyleFromAlign',
        value: function getPopupStyleFromAlign() {
            return;
        }
    }, {
        key: 'getTriggerIconFont',
        value: function getTriggerIconFont() {
            return 'palette';
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: (0, _localeContext.$l)('ColorPicker', label ? 'value_missing_with_label' : 'value_missing', { label: label }),
                typeMismatch: (0, _localeContext.$l)('ColorPicker', 'type_mismatch')
            };
        }
    }]);
    return ColorPicker;
}(_TriggerField3['default']);
ColorPicker.displayName = 'ColorPicker';
ColorPicker.defaultProps = (0, _extends3['default'])({}, _TriggerField3['default'].defaultProps, {
    suffixCls: 'color-picker',
    clearButton: false
});
tslib_1.__decorate([_mobx.observable], ColorPicker.prototype, "hueColor", void 0);
tslib_1.__decorate([_mobx.computed], ColorPicker.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([_mobx.action], ColorPicker.prototype, "setHueColor", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "setColor", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "positionToHSV", null);
tslib_1.__decorate([_mobx.action], ColorPicker.prototype, "hexToRGB", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "setGradientPointer", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "handleGPClick", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "setHuePointer", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "handleHueClick", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "handleGPMouseDown", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "onGPMouseUp", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "handleHPMouseDown", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "onHPMouseUp", null);
tslib_1.__decorate([_autobind2['default']], ColorPicker.prototype, "handlePopupAnimateAppear", null);
ColorPicker = tslib_1.__decorate([_mobxReact.observer], ColorPicker);
exports['default'] = ColorPicker;
module.exports = exports['default'];