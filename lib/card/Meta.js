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

var Meta = function Meta(props) {
    var customizePrefixCls = props.prefixCls,
        className = props.className,
        avatar = props.avatar,
        title = props.title,
        description = props.description,
        others = (0, _objectWithoutProperties3['default'])(props, ['prefixCls', 'className', 'avatar', 'title', 'description']);

    var prefixCls = (0, _configure.getPrefixCls)('card', customizePrefixCls);
    var classString = (0, _classnames2['default'])(prefixCls + '-meta', className);
    var avatarDom = avatar ? _react2['default'].createElement(
        'div',
        { className: prefixCls + '-meta-avatar' },
        avatar
    ) : null;
    var titleDom = title ? _react2['default'].createElement(
        'div',
        { className: prefixCls + '-meta-title' },
        title
    ) : null;
    var descriptionDom = description ? _react2['default'].createElement(
        'div',
        { className: prefixCls + '-meta-description' },
        description
    ) : null;
    var MetaDetail = titleDom || descriptionDom ? _react2['default'].createElement(
        'div',
        { className: prefixCls + '-meta-detail' },
        titleDom,
        descriptionDom
    ) : null;
    return _react2['default'].createElement(
        'div',
        (0, _extends3['default'])({}, others, { className: classString }),
        avatarDom,
        MetaDetail
    );
};
Meta.displayName = 'CardMeta';
exports['default'] = Meta;
module.exports = exports['default'];