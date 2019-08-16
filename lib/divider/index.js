'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports['default'] = Divider;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Divider(_ref) {
    var _classNames;

    var customizePrefixCls = _ref.prefixCls,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? 'horizontal' : _ref$type,
        _ref$orientation = _ref.orientation,
        orientation = _ref$orientation === undefined ? '' : _ref$orientation,
        className = _ref.className,
        children = _ref.children,
        dashed = _ref.dashed,
        restProps = (0, _objectWithoutProperties3['default'])(_ref, ['prefixCls', 'type', 'orientation', 'className', 'children', 'dashed']);

    var prefixCls = (0, _configure.getPrefixCls)('divider', customizePrefixCls);
    var orientationPrefix = orientation.length > 0 ? '-' + orientation : orientation;
    var classString = (0, _classnames2['default'])(className, prefixCls, prefixCls + '-' + type, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-with-text' + orientationPrefix, children), (0, _defineProperty3['default'])(_classNames, prefixCls + '-dashed', !!dashed), _classNames));
    return _react2['default'].createElement(
        'div',
        (0, _extends3['default'])({ className: classString }, restProps),
        children && _react2['default'].createElement(
            'span',
            { className: prefixCls + '-inner-text' },
            children
        )
    );
}
module.exports = exports['default'];