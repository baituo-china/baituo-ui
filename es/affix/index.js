import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowequal from 'lodash/isEqual';
import omit from 'lodash/omit';
import noop from 'lodash/noop';
import getScroll from '../_util/getScroll';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
import addEventListener from '../_util/addEventListener';
import { getPrefixCls } from '../configure';
function getTargetRect(target) {
    return target !== window ? target.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };
}
function getOffset(element, target) {
    var elemRect = element.getBoundingClientRect();
    var targetRect = getTargetRect(target);
    var scrollTop = getScroll(target, true);
    var scrollLeft = getScroll(target, false);
    var docElem = window.document.body;
    var clientTop = docElem.clientTop || 0;
    var clientLeft = docElem.clientLeft || 0;
    return {
        top: elemRect.top - targetRect.top + scrollTop - clientTop,
        left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
        width: elemRect.width,
        height: elemRect.height
    };
}
function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}

var Affix = function (_Component) {
    _inherits(Affix, _Component);

    function Affix() {
        _classCallCheck(this, Affix);

        var _this = _possibleConstructorReturn(this, (Affix.__proto__ || Object.getPrototypeOf(Affix)).apply(this, arguments));

        _this.state = {
            affixStyle: undefined,
            placeholderStyle: undefined
        };
        _this.eventHandlers = {};
        _this.events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
        _this.saveFixedNode = function (node) {
            _this.fixedNode = node;
        };
        _this.savePlaceholderNode = function (node) {
            _this.placeholderNode = node;
        };
        return _this;
    }

    _createClass(Affix, [{
        key: 'setAffixStyle',
        value: function setAffixStyle(e, affixStyle) {
            var _this2 = this;

            var _props = this.props,
                _props$onChange = _props.onChange,
                onChange = _props$onChange === undefined ? noop : _props$onChange,
                _props$target = _props.target,
                target = _props$target === undefined ? getDefaultTarget : _props$target;

            var originalAffixStyle = this.state.affixStyle;
            var isWindow = target() === window;
            if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
                return;
            }
            if (shallowequal(affixStyle, originalAffixStyle)) {
                return;
            }
            this.setState({ affixStyle: affixStyle }, function () {
                var affixed = !!_this2.state.affixStyle;
                if (affixStyle && !originalAffixStyle || !affixStyle && originalAffixStyle) {
                    onChange(affixed);
                }
            });
        }
    }, {
        key: 'setPlaceholderStyle',
        value: function setPlaceholderStyle(placeholderStyle) {
            var originalPlaceholderStyle = this.state.placeholderStyle;
            if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
                return;
            }
            this.setState({ placeholderStyle: placeholderStyle });
        }
    }, {
        key: 'syncPlaceholderStyle',
        value: function syncPlaceholderStyle(e) {
            var affixStyle = this.state.affixStyle;

            if (!affixStyle) {
                return;
            }
            this.placeholderNode.style.cssText = '';
            this.setAffixStyle(e, _extends({}, affixStyle, {
                width: this.placeholderNode.offsetWidth
            }));
            this.setPlaceholderStyle({
                width: this.placeholderNode.offsetWidth
            });
        }
    }, {
        key: 'updatePosition',
        value: function updatePosition(e) {
            var _props2 = this.props,
                offsetBottom = _props2.offsetBottom,
                offset = _props2.offset,
                _props2$target = _props2.target,
                target = _props2$target === undefined ? getDefaultTarget : _props2$target;
            var offsetTop = this.props.offsetTop;

            var targetNode = target();
            // Backwards support
            offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop;
            var scrollTop = getScroll(targetNode, true);
            var affixNode = findDOMNode(this);
            var elemOffset = getOffset(affixNode, targetNode);
            var elemSize = {
                width: this.fixedNode.offsetWidth,
                height: this.fixedNode.offsetHeight
            };
            var offsetMode = {
                top: false,
                bottom: false
            };
            // Default to `offsetTop=0`.
            if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
                offsetMode.top = true;
                offsetTop = 0;
            } else {
                offsetMode.top = typeof offsetTop === 'number';
                offsetMode.bottom = typeof offsetBottom === 'number';
            }
            var targetRect = getTargetRect(targetNode);
            var targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
            if (scrollTop >= elemOffset.top - offsetTop && offsetMode.top) {
                // Fixed Top
                var width = elemOffset.width;
                var top = targetRect.top + offsetTop;
                this.setAffixStyle(e, {
                    position: 'fixed',
                    top: top,
                    left: targetRect.left + elemOffset.left,
                    width: width
                });
                this.setPlaceholderStyle({
                    width: width,
                    height: elemSize.height
                });
            } else if (scrollTop <= elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight && offsetMode.bottom) {
                // Fixed Bottom
                var targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
                var _width = elemOffset.width;
                this.setAffixStyle(e, {
                    position: 'fixed',
                    bottom: targetBottomOffet + offsetBottom,
                    left: targetRect.left + elemOffset.left,
                    width: _width
                });
                this.setPlaceholderStyle({
                    width: _width,
                    height: elemOffset.height
                });
            } else {
                var affixStyle = this.state.affixStyle;

                if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
                    this.setAffixStyle(e, _extends({}, affixStyle, { width: affixNode.offsetWidth }));
                } else {
                    this.setAffixStyle(e, null);
                }
                this.setPlaceholderStyle(null);
            }
            if (e.type === 'resize') {
                this.syncPlaceholderStyle(e);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var target = this.props.target || getDefaultTarget;
            // Wait for parent component ref has its value
            this.timeout = setTimeout(function () {
                _this3.setTargetEventListeners(target);
                // Mock Event object.
                _this3.updatePosition({});
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.target !== nextProps.target) {
                this.clearEventListeners();
                this.setTargetEventListeners(nextProps.target);
                // Mock Event object.
                this.updatePosition({});
            }
            if (this.props.offsetTop !== nextProps.offsetTop || this.props.offsetBottom !== nextProps.offsetBottom) {
                this.updatePosition({});
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearEventListeners();
            clearTimeout(this.timeout);
            this.updatePosition.cancel();
        }
    }, {
        key: 'setTargetEventListeners',
        value: function setTargetEventListeners(getTarget) {
            var _this4 = this;

            var target = getTarget();
            if (!target) {
                return;
            }
            this.clearEventListeners();
            this.events.forEach(function (eventName) {
                _this4.eventHandlers[eventName] = addEventListener(target, eventName, _this4.updatePosition);
            });
        }
    }, {
        key: 'clearEventListeners',
        value: function clearEventListeners() {
            var _this5 = this;

            this.events.forEach(function (eventName) {
                var handler = _this5.eventHandlers[eventName];
                if (handler && handler.remove) {
                    handler.remove();
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                prefixCls = _props3.prefixCls,
                style = _props3.style,
                children = _props3.children;
            var _state = this.state,
                affixStyle = _state.affixStyle,
                placeholderStyle = _state.placeholderStyle;

            var className = classNames(_defineProperty({}, getPrefixCls('affix', prefixCls), affixStyle));
            var props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
            return React.createElement(
                'div',
                _extends({}, props, { style: _extends({}, placeholderStyle, style), ref: this.savePlaceholderNode }),
                React.createElement(
                    'div',
                    { className: className, ref: this.saveFixedNode, style: affixStyle },
                    children
                )
            );
        }
    }]);

    return Affix;
}(Component);

export default Affix;

Affix.displayName = 'Affix';
Affix.propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    target: PropTypes.func
};
tslib_1.__decorate([throttleByAnimationFrameDecorator()], Affix.prototype, "updatePosition", null);