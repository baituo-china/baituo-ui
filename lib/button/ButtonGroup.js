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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ButtonGroup = function ButtonGroup(props) {
    var customizePrefixCls = props.prefixCls,
        size = props.size,
        className = props.className,
        others = (0, _objectWithoutProperties3['default'])(props, ['prefixCls', 'size', 'className']);

    var prefixCls = (0, _configure.getPrefixCls)('btn-group', customizePrefixCls);
    // large => lg
    // small => sm
    var sizeCls = '';
    switch (size) {
        case "large" /* large */:
            sizeCls = 'lg';
            break;
        case "small" /* small */:
            sizeCls = 'sm';
        default:
            break;
    }
    var classes = (0, _classnames2['default'])(prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-' + sizeCls, sizeCls), className);
    return _react2['default'].createElement('div', (0, _extends3['default'])({}, others, { className: classes }));
};
ButtonGroup.displayName = 'ButtonGroup';
exports['default'] = ButtonGroup;
module.exports = exports['default'];