'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports['default'] = formatReactTemplate;

var _react = require('react');

var _stringTemplate = require('string-template');

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _flatMap = require('lodash/flatMap');

var _flatMap2 = _interopRequireDefault(_flatMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function formatReactTemplate(template, map) {
    var result = [template];
    Object.keys(map).forEach(function (key) {
        var node = map[key];
        if (node) {
            result = (0, _flatMap2['default'])(result, function (text) {
                if ((0, _isString2['default'])(text)) {
                    var stringText = text;
                    if ((0, _react.isValidElement)(node)) {
                        var placeholder = '{' + key + '}';
                        var length = placeholder.length;

                        var textArr = [];
                        var index = stringText.indexOf(placeholder);
                        while (index > -1) {
                            if (index > 0) {
                                textArr.push(stringText.slice(0, index));
                            }
                            textArr.push(node);
                            stringText = stringText.slice(index + length);
                            index = stringText.indexOf(placeholder);
                        }
                        if (stringText) {
                            textArr.push(stringText);
                        }
                        return textArr;
                    } else {
                        return (0, _stringTemplate2['default'])(text, (0, _defineProperty3['default'])({}, key, node));
                    }
                }
                return text;
            });
        }
    });
    if (result.every(_isString2['default'])) {
        return result.join('');
    }
    return _react.createElement.apply(undefined, [_react.Fragment, {}].concat((0, _toConsumableArray3['default'])(result)));
}
module.exports = exports['default'];