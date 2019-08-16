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

var _TimelineItem = require('./TimelineItem');

var _TimelineItem2 = _interopRequireDefault(_TimelineItem);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Timeline = function (_Component) {
    (0, _inherits3['default'])(Timeline, _Component);

    function Timeline() {
        (0, _classCallCheck3['default'])(this, Timeline);
        return (0, _possibleConstructorReturn3['default'])(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Timeline, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                children = _props.children,
                pending = _props.pending,
                pendingDot = _props.pendingDot,
                className = _props.className,
                restProps = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'children', 'pending', 'pendingDot', 'className']);

            var pendingNode = typeof pending === 'boolean' ? null : pending;
            var prefixCls = (0, _configure.getPrefixCls)('timeline', customizePrefixCls);
            var classString = (0, _classnames2['default'])(prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-pending', !!pending), className);
            // Remove falsy items
            var falsylessItems = _react.Children.toArray(children).filter(function (item) {
                return !!item;
            });
            var items = _react.Children.map(falsylessItems, function (ele, idx) {
                return (0, _react.cloneElement)(ele, {
                    last: idx === _react.Children.count(falsylessItems) - 1
                });
            });
            var pendingItem = !!pending ? _react2['default'].createElement(
                _TimelineItem2['default'],
                { pending: !!pending, dot: pendingDot || _react2['default'].createElement(_icon2['default'], { type: 'loading' }) },
                pendingNode
            ) : null;
            return _react2['default'].createElement(
                'ul',
                (0, _extends3['default'])({}, restProps, { className: classString }),
                items,
                pendingItem
            );
        }
    }]);
    return Timeline;
}(_react.Component);

exports['default'] = Timeline;

Timeline.displayName = 'Timeline';
Timeline.Item = _TimelineItem2['default'];
module.exports = exports['default'];