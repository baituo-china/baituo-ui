import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, cloneElement, Component } from 'react';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';
import Icon from '../icon';
import { getPrefixCls } from '../configure';

var Timeline = function (_Component) {
    _inherits(Timeline, _Component);

    function Timeline() {
        _classCallCheck(this, Timeline);

        return _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).apply(this, arguments));
    }

    _createClass(Timeline, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                children = _props.children,
                pending = _props.pending,
                pendingDot = _props.pendingDot,
                className = _props.className,
                restProps = _objectWithoutProperties(_props, ['prefixCls', 'children', 'pending', 'pendingDot', 'className']);

            var pendingNode = typeof pending === 'boolean' ? null : pending;
            var prefixCls = getPrefixCls('timeline', customizePrefixCls);
            var classString = classNames(prefixCls, _defineProperty({}, prefixCls + '-pending', !!pending), className);
            // Remove falsy items
            var falsylessItems = Children.toArray(children).filter(function (item) {
                return !!item;
            });
            var items = Children.map(falsylessItems, function (ele, idx) {
                return cloneElement(ele, {
                    last: idx === Children.count(falsylessItems) - 1
                });
            });
            var pendingItem = !!pending ? React.createElement(
                TimelineItem,
                { pending: !!pending, dot: pendingDot || React.createElement(Icon, { type: 'loading' }) },
                pendingNode
            ) : null;
            return React.createElement(
                'ul',
                _extends({}, restProps, { className: classString }),
                items,
                pendingItem
            );
        }
    }]);

    return Timeline;
}(Component);

export default Timeline;

Timeline.displayName = 'Timeline';
Timeline.Item = TimelineItem;