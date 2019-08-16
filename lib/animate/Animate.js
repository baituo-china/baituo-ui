'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _ChildrenUtils = require('./ChildrenUtils');

var _AnimateChild = require('./AnimateChild');

var _AnimateChild2 = _interopRequireDefault(_AnimateChild);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var defaultKey = 'animate_' + Date.now();
function getChildrenFromProps(props) {
    var children = props.children;

    if ((0, _react.isValidElement)(children)) {
        if (!children.key) {
            return (0, _react.cloneElement)(children, {
                key: defaultKey
            });
        }
    }
    return children;
}

var Animate = function (_Component) {
    (0, _inherits3['default'])(Animate, _Component);

    function Animate() {
        (0, _classCallCheck3['default'])(this, Animate);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).apply(this, arguments));

        _this.currentlyAnimatingKeys = {};
        _this.keysToEnter = [];
        _this.keysToLeave = [];
        _this.state = {
            children: (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(_this.props))
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
                onAppear = _props$onAppear === undefined ? _noop2['default'] : _props$onAppear,
                _props$onEnd = props.onEnd,
                onEnd = _props$onEnd === undefined ? _noop2['default'] : _props$onEnd,
                _props$onEnter = props.onEnter,
                onEnter = _props$onEnter === undefined ? _noop2['default'] : _props$onEnter;

            delete _this.currentlyAnimatingKeys[key];
            if (exclusive && props !== _this.nextProps) {
                return;
            }
            if (!_this.isValidChildByKey((0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props)), key)) {
                _this.performLeave(key);
            } else {
                if (type === 'appear') {
                    if (_util2['default'].allowAppearCallback(props)) {
                        onAppear(key);
                        onEnd(key, true);
                    }
                } else {
                    if (_util2['default'].allowEnterCallback(props)) {
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
                onEnd = _props$onEnd2 === undefined ? _noop2['default'] : _props$onEnd2,
                _props$onLeave = props.onLeave,
                onLeave = _props$onLeave === undefined ? _noop2['default'] : _props$onLeave,
                hiddenProp = props.hiddenProp;

            delete _this.currentlyAnimatingKeys[key];
            if (exclusive && props !== _this.nextProps) {
                return;
            }
            var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props));
            if (_this.isValidChildByKey(currentChildren, key)) {
                _this.performEnter(key);
            } else {
                var end = function end() {
                    if (_util2['default'].allowLeaveCallback(props)) {
                        onLeave(key);
                        onEnd(key, false);
                    }
                };
                if (!(0, _ChildrenUtils.isSameChildren)(_this.state.children, currentChildren, hiddenProp)) {
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

    (0, _createClass3['default'])(Animate, [{
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
            var nextChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(nextProps));
            var _props = this.props,
                exclusive = _props.exclusive,
                hiddenProp = _props.hiddenProp;

            var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
            if (exclusive) {
                Object.keys(currentlyAnimatingKeys).forEach(function (key) {
                    return _this3.stop(key);
                });
            }
            var currentChildren = exclusive ? (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(this.props)) : this.state.children;
            var newChildren = [];
            if (hiddenProp) {
                nextChildren.forEach(function (nextChild) {
                    if (nextChild) {
                        var newChild = void 0;
                        var currentChild = (0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, nextChild.key);
                        if (nextChild.props[hiddenProp] && currentChild && !currentChild.props[hiddenProp]) {
                            newChild = (0, _react.cloneElement)(nextChild, (0, _defineProperty3['default'])({}, hiddenProp, false));
                        } else {
                            newChild = nextChild;
                        }
                        if (newChild) {
                            newChildren.push(newChild);
                        }
                    }
                });
                newChildren = (0, _ChildrenUtils.mergeChildren)(currentChildren, newChildren);
            } else {
                newChildren = (0, _ChildrenUtils.mergeChildren)(currentChildren, nextChildren);
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
                    var hasPrev = child && (0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, key);
                    if (hiddenProp) {
                        var showInNext = !child.props[hiddenProp];
                        if (hasPrev) {
                            var showInNow = (0, _ChildrenUtils.findShownChildInChildrenByKey)(currentChildren, key, hiddenProp);
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
                    var hasNext = child && (0, _ChildrenUtils.findChildInChildrenByKey)(nextChildren, key);
                    if (hiddenProp) {
                        var showInNow = !child.props[hiddenProp];
                        if (hasNext) {
                            var showInNext = (0, _ChildrenUtils.findShownChildInChildrenByKey)(nextChildren, key, hiddenProp);
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
                return !!(0, _ChildrenUtils.findShownChildInChildrenByKey)(currentChildren, key, hiddenProp);
            }
            return !!(0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, key);
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
                otherProps = (0, _objectWithoutProperties3['default'])(props, ['animation', 'transitionName', 'transitionEnter', 'transitionAppear', 'transitionLeave', 'component', 'componentProps']);
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
                    return (0, _react.createElement)(_AnimateChild2['default'], {
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
                var passedProps = (0, _omit2['default'])(otherProps, ['exclusive', 'onEnd', 'onEnter', 'onLeave', 'onAppear', 'hiddenProp']);
                return (0, _react.createElement)(Cmp, (0, _extends3['default'])({}, passedProps, componentProps), children);
            }
            return children[0] || null;
        }
    }]);
    return Animate;
}(_react.Component);

exports['default'] = Animate;

Animate.displayName = 'Animate';
Animate.propTypes = {
    component: _propTypes2['default'].any,
    componentProps: _propTypes2['default'].object,
    animation: _propTypes2['default'].object,
    transitionName: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
    transitionEnter: _propTypes2['default'].bool,
    transitionAppear: _propTypes2['default'].bool,
    exclusive: _propTypes2['default'].bool,
    transitionLeave: _propTypes2['default'].bool,
    onEnd: _propTypes2['default'].func,
    onEnter: _propTypes2['default'].func,
    onLeave: _propTypes2['default'].func,
    onAppear: _propTypes2['default'].func,
    hiddenProp: _propTypes2['default'].string
};
Animate.defaultProps = {
    animation: {},
    component: 'span',
    componentProps: {},
    transitionEnter: true,
    transitionLeave: true,
    transitionAppear: false
};
module.exports = exports['default'];