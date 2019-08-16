'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = isChildrenEqual;

var _react = require('react');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isElementEqual(el, other) {
    if (el === other) {
        return true;
    }
    return (0, _react.isValidElement)(el) && (0, _react.isValidElement)(other) && el.type === other.type && (0, _isEqual2['default'])((0, _omit2['default'])(el.props, 'children'), (0, _omit2['default'])(other.props, 'children')) && isChildrenEqual(el.props.children, other.props.children);
}
function isChildrenEqual(value, other) {
    if (!value && !other) {
        return true;
    }
    var valueArray = _react.Children.toArray(value);
    var otherArray = _react.Children.toArray(other);
    if (valueArray.length !== otherArray.length) {
        return false;
    }
    return valueArray.every(function (child, index) {
        return isElementEqual(child, otherArray[index]);
    });
}
module.exports = exports['default'];