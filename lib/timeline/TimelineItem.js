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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TimelineItem = function (_Component) {
    (0, _inherits3['default'])(TimelineItem, _Component);

    function TimelineItem() {
        (0, _classCallCheck3['default'])(this, TimelineItem);
        return (0, _possibleConstructorReturn3['default'])(this, (TimelineItem.__proto__ || Object.getPrototypeOf(TimelineItem)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TimelineItem, [{
        key: 'render',
        value: function render() {
            var _classNames, _classNames2;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                className = _props.className,
                _props$color = _props.color,
                color = _props$color === undefined ? '' : _props$color,
                last = _props.last,
                children = _props.children,
                pending = _props.pending,
                dot = _props.dot,
                restProps = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'className', 'color', 'last', 'children', 'pending', 'dot']);

            var prefixCls = (0, _configure.getPrefixCls)('timeline', customizePrefixCls);
            var itemClassName = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-item', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-item-last', last), (0, _defineProperty3['default'])(_classNames, prefixCls + '-item-pending', pending), _classNames), className);
            var dotClassName = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-item-head', true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-item-head-custom', dot), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-item-head-' + color, true), _classNames2));
            return _react2['default'].createElement(
                'li',
                (0, _extends3['default'])({}, restProps, { className: itemClassName }),
                _react2['default'].createElement('div', { className: prefixCls + '-item-tail' }),
                _react2['default'].createElement(
                    'div',
                    { className: dotClassName, style: { borderColor: /blue|red|green/.test(color) ? undefined : color } },
                    dot
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-item-content' },
                    children
                )
            );
        }
    }]);
    return TimelineItem;
}(_react.Component);

exports['default'] = TimelineItem;

TimelineItem.displayName = 'TimelineItem';
TimelineItem.defaultProps = {
    color: 'blue',
    last: false,
    pending: false
};
module.exports = exports['default'];