import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { cloneElement, Component, createElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import noop from 'lodash/noop';
import { findChildInChildrenByKey, findShownChildInChildrenByKey, isSameChildren, mergeChildren, toArrayChildren } from './ChildrenUtils';
import AnimateChild from './AnimateChild';
import animUtil from './util';
var defaultKey = 'animate_' + Date.now();
function getChildrenFromProps(props) {
    var children = props.children;

    if (isValidElement(children)) {
        if (!children.key) {
            return cloneElement(children, {
                key: defaultKey
            });
        }
    }
    return children;
}

var Animate = function (_Component) {
    _inherits(Animate, _Component);

    function Animate() {
        _classCallCheck(this, Animate);

        var _this = _possibleConstructorReturn(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).apply(this, arguments));

        _this.currentlyAnimatingKeys = {};
        _this.keysToEnter = [];
        _this.keysToLeave = [];
        _this.state = {
            children: toArrayChildren(getChildrenFromProps(_this.props))
        };
        _this.childrenRefs = {};
        _this.performEnter = function (key) {
            if (_this.childrenRefs[key]) {
                _this.currentlyAnimatingKeys[key] = true;
                _this.childrenRefs[key].componentWillEnter(_this.handleDoneAdding.bind(_this, key, 'enter'));
            }
        };
        _this.performAppear = function (key) {
            if (_this.childrenRefs[key]) {
                _this.currentlyAnimatingKeys[key] = true;
                _this.childrenRefs[key].componentWillAppear(_this.handleDoneAdding.bind(_this, key, 'appear'));
            }
        };
        _this.handleDoneAdding = function (key, type) {
            var props = _this.props;
            var exclusive = props.exclusive,
                _props$onAppear = props.onAppear,
                onAppear = _props$onAppear === undefined ? noop : _props$onAppear,
                _props$onEnd = props.onEnd,
                onEnd = _props$onEnd === undefined ? noop : _props$onEnd,
                _props$onEnter = props.onEnter,
                onEnter = _props$onEnter === undefined ? noop : _props$onEnter;

            delete _this.currentlyAnimatingKeys[key];
            if (exclusive && props !== _this.nextProps) {
                return;
            }
            if (!_this.isValidChildByKey(toArrayChildren(getChildrenFromProps(props)), key)) {
                _this.performLeave(key);
            } else {
                if (type === 'appear') {
                    if (animUtil.allowAppearCallback(props)) {
                        onAppear(key);
                        onEnd(key, true);
                    }
                } else {
                    if (animUtil.allowEnterCallback(props)) {
                        onEnter(key);
                        onEnd(key, true);
                    }
                }
            }
        };
        _this.performLeave = function (key) {
            if (_this.childrenRefs[key]) {
                _this.currentlyAnimatingKeys[key] = true;
                _this.childrenRefs[key].componentWillLeave(_this.handleDoneLeaving.bind(_this, key));
            }
        };
        _this.handleDoneLeaving = function (key) {
            var props = _this.props;
            var exclusive = props.exclusive,
                _props$onEnd2 = props.onEnd,
                onEnd = _props$onEnd2 === undefined ? noop : _props$onEnd2,
                _props$onLeave = props.onLeave,
                onLeave = _props$onLeave === undefined ? noop : _props$onLeave,
                hiddenProp = props.hiddenProp;

            delete _this.currentlyAnimatingKeys[key];
            if (exclusive && props !== _this.nextProps) {
                return;
            }
            var currentChildren = toArrayChildren(getChildrenFromProps(props));
            if (_this.isValidChildByKey(currentChildren, key)) {
                _this.performEnter(key);
            } else {
                var end = function end() {
                    if (animUtil.allowLeaveCallback(props)) {
                        onLeave(key);
                        onEnd(key, false);
                    }
                };
                if (!isSameChildren(_this.state.children, currentChildren, hiddenProp)) {
                    _this.setState({
                        children: currentChildren
                    }, end);
                } else {
                    end();
                }
            }
        };
        return _this;
    }

    _createClass(Animate, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var hiddenProp = this.props.hiddenProp;
            var children = this.state.children;

            if (hiddenProp) {
                children = children.filter(function (child) {
                    return !child.props[hiddenProp];
                });
            }
            children.forEach(function (child) {
                if (child && child.key) {
                    _this2.performAppear(child.key);
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            this.nextProps = nextProps;
            var nextChildren = toArrayChildren(getChildrenFromProps(nextProps));
            var _props = this.props,
                exclusive = _props.exclusive,
                hiddenProp = _props.hiddenProp;

            var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
            if (exclusive) {
                Object.keys(currentlyAnimatingKeys).forEach(function (key) {
                    return _this3.stop(key);
                });
            }
            var currentChildren = exclusive ? toArrayChildren(getChildrenFromProps(this.props)) : this.state.children;
            var newChildren = [];
            if (hiddenProp) {
                nextChildren.forEach(function (nextChild) {
                    if (nextChild) {
                        var newChild = void 0;
                        var currentChild = findChildInChildrenByKey(currentChildren, nextChild.key);
                        if (nextChild.props[hiddenProp] && currentChild && !currentChild.props[hiddenProp]) {
                            newChild = cloneElement(nextChild, _defineProperty({}, hiddenProp, false));
                        } else {
                            newChild = nextChild;
                        }
                        if (newChild) {
                            newChildren.push(newChild);
                        }
                    }
                });
                newChildren = mergeChildren(currentChildren, newChildren);
            } else {
                newChildren = mergeChildren(currentChildren, nextChildren);
            }
            this.setState({
                children: newChildren
            });
            nextChildren.forEach(function (child) {
                var key = child && child.key;
                if (key) {
                    if (child && currentlyAnimatingKeys[key]) {
                        return;
                    }
                    var hasPrev = child && findChildInChildrenByKey(currentChildren, key);
                    if (hiddenProp) {
                        var showInNext = !child.props[hiddenProp];
                        if (hasPrev) {
                            var showInNow = findShownChildInChildrenByKey(currentChildren, key, hiddenProp);
                            if (!showInNow && showInNext) {
                                _this3.keysToEnter.push(key);
                            }
                        } else if (showInNext) {
                            _this3.keysToEnter.push(key);
                        }
                    } else if (!hasPrev) {
                        _this3.keysToEnter.push(key);
                    }
                }
            });
            currentChildren.forEach(function (child) {
                var key = child && child.key;
                if (key) {
                    if (child && currentlyAnimatingKeys[key]) {
                        return;
                    }
                    var hasNext = child && findChildInChildrenByKey(nextChildren, key);
                    if (hiddenProp) {
                        var showInNow = !child.props[hiddenProp];
                        if (hasNext) {
                            var showInNext = findShownChildInChildrenByKey(nextChildren, key, hiddenProp);
                            if (!showInNext && showInNow) {
                                _this3.keysToLeave.push(key);
                            }
                        } else if (showInNow) {
                            _this3.keysToLeave.push(key);
                        }
                    } else if (!hasNext) {
                        _this3.keysToLeave.push(key);
                    }
                }
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var keysToEnter = this.keysToEnter;
            this.keysToEnter = [];
            keysToEnter.forEach(this.performEnter);
            var keysToLeave = this.keysToLeave;
            this.keysToLeave = [];
            keysToLeave.forEach(this.performLeave);
        }
    }, {
        key: 'isValidChildByKey',
        value: function isValidChildByKey(currentChildren, key) {
            var hiddenProp = this.props.hiddenProp;

            if (hiddenProp) {
                return !!findShownChildInChildrenByKey(currentChildren, key, hiddenProp);
            }
            return !!findChildInChildrenByKey(currentChildren, key);
        }
    }, {
        key: 'stop',
        value: function stop(key) {
            delete this.currentlyAnimatingKeys[key];
            var component = this.childrenRefs[key];
            if (component) {
                component.stop();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var props = this.props;

            this.nextProps = props;

            var animation = props.animation,
                transitionName = props.transitionName,
                transitionEnter = props.transitionEnter,
                transitionAppear = props.transitionAppear,
                transitionLeave = props.transitionLeave,
                Cmp = props.component,
                componentProps = props.componentProps,
                otherProps = _objectWithoutProperties(props, ['animation', 'transitionName', 'transitionEnter', 'transitionAppear', 'transitionLeave', 'component', 'componentProps']);

            var stateChildren = this.state.children;

            var children = [];
            if (stateChildren) {
                children = stateChildren.map(function (child) {
                    if (child === null || child === undefined) {
                        return child;
                    }
                    if (!child.key) {
                        throw new Error('must set key for animate children');
                    }
                    return createElement(AnimateChild, {
                        key: child.key,
                        ref: function ref(node) {
                            if (child.key) {
                                _this4.childrenRefs[child.key] = node;
                            }
                        },
                        animation: animation,
                        transitionName: transitionName,
                        transitionEnter: transitionEnter,
                        transitionAppear: transitionAppear,
                        transitionLeave: transitionLeave
                    }, child);
                });
            }
            if (Cmp) {
                var passedProps = omit(otherProps, ['exclusive', 'onEnd', 'onEnter', 'onLeave', 'onAppear', 'hiddenProp']);
                return createElement(Cmp, _extends({}, passedProps, componentProps), children);
            }
            return children[0] || null;
        }
    }]);

    return Animate;
}(Component);

export default Animate;

Animate.displayName = 'Animate';
Animate.propTypes = {
    component: PropTypes.any,
    componentProps: PropTypes.object,
    animation: PropTypes.object,
    transitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    transitionEnter: PropTypes.bool,
    transitionAppear: PropTypes.bool,
    exclusive: PropTypes.bool,
    transitionLeave: PropTypes.bool,
    onEnd: PropTypes.func,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    onAppear: PropTypes.func,
    hiddenProp: PropTypes.string
};
Animate.defaultProps = {
    animation: {},
    component: 'span',
    componentProps: {},
    transitionEnter: true,
    transitionLeave: true,
    transitionAppear: false
};