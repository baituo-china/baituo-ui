'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.normalizeProps = normalizeProps;

var _react = require('react');

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function normalizeProps(props) {
    if ((0, _isString2['default'])(props) || (0, _react.isValidElement)(props)) {
        return {
            children: props
        };
    }
    return props;
}