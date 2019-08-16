'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Grid = function Grid(props) {
    var customizePrefixCls = props.prefixCls,
        className = props.className,
        others = (0, _objectWithoutProperties3['default'])(props, ['prefixCls', 'className']);

    var prefixCls = (0, _configure.getPrefixCls)('card', customizePrefixCls);
    var classString = (0, _classnames2['default'])(prefixCls + '-grid', className);
    return _react2['default'].createElement('div', (0, _extends3['default'])({}, others, { className: classString }));
};
Grid.displayName = 'CardGrid';
exports['default'] = Grid;
module.exports = exports['default'];