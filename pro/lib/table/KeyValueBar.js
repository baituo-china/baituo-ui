'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _localeContext = require('../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var KeyValueBar = function KeyValueBar(props) {
    var handleCloseBtnClick = function handleCloseBtnClick(key) {
        var onCloseBtnClick = props.onCloseBtnClick;

        if (onCloseBtnClick) {
            onCloseBtnClick(key);
        }
    };
    function renderItems(items) {
        if (items.length === 0) {
            return null;
        }
        return items.map(function (item) {
            var isReactNode = false;
            var key = item.key,
                value = item.value;

            if ((0, _react.isValidElement)(value) || typeof value === 'string' || typeof value === 'number') {
                isReactNode = true; // FIXME: 暂时没想到更好的方法去判断value能否渲染
            }
            return _react2['default'].createElement(
                'div',
                { key: key, className: 'pair-container' },
                _react2['default'].createElement(
                    'div',
                    { className: 'd-flex' },
                    _react2['default'].createElement(
                        'span',
                        null,
                        key,
                        ': ',
                        isReactNode ? value : '不支持的值'
                    ),
                    _react2['default'].createElement(_icon2['default'], { type: 'close', onClick: function onClick() {
                            return handleCloseBtnClick(key);
                        } })
                )
            );
        });
    }
    function getClassName() {
        var prefixCls = props.prefixCls;

        return (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-advanced-query-bar-key-value-bar', !!prefixCls));
    }
    return _react2['default'].createElement(
        'div',
        { className: getClassName() },
        _react2['default'].createElement(
            'span',
            null,
            (0, _localeContext.$l)('Table', 'advanced_query_conditions'),
            ': '
        ),
        renderItems(props.items)
    );
};
exports['default'] = KeyValueBar;
module.exports = exports['default'];