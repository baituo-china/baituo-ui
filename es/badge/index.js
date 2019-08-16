import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import Animate from '../animate';
import { getPrefixCls } from '../configure';

var Badge = function (_Component) {
    _inherits(Badge, _Component);

    function Badge() {
        _classCallCheck(this, Badge);

        return _possibleConstructorReturn(this, (Badge.__proto__ || Object.getPrototypeOf(Badge)).apply(this, arguments));
    }

    _createClass(Badge, [{
        key: 'render',
        value: function render() {
            var _classNames, _classNames2, _classNames3;

            var _props = this.props,
                count = _props.count,
                showZero = _props.showZero,
                customizePrefixCls = _props.prefixCls,
                scrollNumberPrefixCls = _props.scrollNumberPrefixCls,
                overflowCount = _props.overflowCount,
                className = _props.className,
                style = _props.style,
                children = _props.children,
                dot = _props.dot,
                status = _props.status,
                text = _props.text,
                offset = _props.offset,
                restProps = _objectWithoutProperties(_props, ['count', 'showZero', 'prefixCls', 'scrollNumberPrefixCls', 'overflowCount', 'className', 'style', 'children', 'dot', 'status', 'text', 'offset']);

            var prefixCls = getPrefixCls('badge', customizePrefixCls);
            var displayCount = count > overflowCount ? overflowCount + '+' : count;
            var isZero = displayCount === '0' || displayCount === 0;
            var isDot = dot && !isZero || status;
            // dot mode don't need count
            if (isDot) {
                displayCount = '';
            }
            var isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
            var hidden = (isEmpty || isZero && !showZero) && !isDot;
            var statusCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-status-dot', !!status), _defineProperty(_classNames, prefixCls + '-status-' + status, !!status), _classNames));
            var scrollNumberCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-dot', isDot), _defineProperty(_classNames2, prefixCls + '-count', !isDot), _defineProperty(_classNames2, prefixCls + '-multiple-words', !isDot && count && count.toString && count.toString().length > 1), _defineProperty(_classNames2, prefixCls + '-status-' + status, !!status), _classNames2));
            var badgeCls = classNames(className, prefixCls, (_classNames3 = {}, _defineProperty(_classNames3, prefixCls + '-status', !!status), _defineProperty(_classNames3, prefixCls + '-not-a-wrapper', !children), _classNames3));
            var styleWithOffset = offset ? _extends({
                marginTop: offset[0],
                marginLeft: offset[1]
            }, style) : style;
            // <Badge status="success" />
            if (!children && status) {
                return React.createElement(
                    'span',
                    { className: badgeCls, style: styleWithOffset },
                    React.createElement('span', { className: statusCls }),
                    React.createElement(
                        'span',
                        { className: prefixCls + '-status-text' },
                        text
                    )
                );
            }
            var scrollNumber = hidden ? null : React.createElement(ScrollNumber, { prefixCls: getPrefixCls('scroll-number', scrollNumberPrefixCls), hidden: hidden, className: scrollNumberCls, count: displayCount, title: count, style: styleWithOffset });
            var statusText = hidden || !text ? null : React.createElement(
                'span',
                { className: prefixCls + '-status-text' },
                text
            );
            return React.createElement(
                'span',
                _extends({}, restProps, { className: badgeCls }),
                children,
                React.createElement(
                    Animate,
                    { component: '', hiddenProp: 'hidden', transitionName: children ? prefixCls + '-zoom' : '', transitionAppear: true },
                    scrollNumber
                ),
                statusText
            );
        }
    }]);

    return Badge;
}(Component);

export default Badge;

Badge.displayName = 'Badge';
Badge.defaultProps = {
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99
};
Badge.propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number
};