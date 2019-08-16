import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';

var TimelineItem = function (_Component) {
    _inherits(TimelineItem, _Component);

    function TimelineItem() {
        _classCallCheck(this, TimelineItem);

        return _possibleConstructorReturn(this, (TimelineItem.__proto__ || Object.getPrototypeOf(TimelineItem)).apply(this, arguments));
    }

    _createClass(TimelineItem, [{
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
                restProps = _objectWithoutProperties(_props, ['prefixCls', 'className', 'color', 'last', 'children', 'pending', 'dot']);

            var prefixCls = getPrefixCls('timeline', customizePrefixCls);
            var itemClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-item', true), _defineProperty(_classNames, prefixCls + '-item-last', last), _defineProperty(_classNames, prefixCls + '-item-pending', pending), _classNames), className);
            var dotClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-item-head', true), _defineProperty(_classNames2, prefixCls + '-item-head-custom', dot), _defineProperty(_classNames2, prefixCls + '-item-head-' + color, true), _classNames2));
            return React.createElement(
                'li',
                _extends({}, restProps, { className: itemClassName }),
                React.createElement('div', { className: prefixCls + '-item-tail' }),
                React.createElement(
                    'div',
                    { className: dotClassName, style: { borderColor: /blue|red|green/.test(color) ? undefined : color } },
                    dot
                ),
                React.createElement(
                    'div',
                    { className: prefixCls + '-item-content' },
                    children
                )
            );
        }
    }]);

    return TimelineItem;
}(Component);

export default TimelineItem;

TimelineItem.displayName = 'TimelineItem';
TimelineItem.defaultProps = {
    color: 'blue',
    last: false,
    pending: false
};