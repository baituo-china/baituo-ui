'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = mapSelf;

var _react = require('react');

function mirror(o) {
  return o;
}

function mapSelf(children) {
  // return ReactFragment
  return _react.Children.map(children, mirror);
}
module.exports = exports['default'];