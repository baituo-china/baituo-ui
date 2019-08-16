'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = toArray;

var _react = require('react');

function toArray(children) {
  var ret = [];
  _react.Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}
module.exports = exports['default'];