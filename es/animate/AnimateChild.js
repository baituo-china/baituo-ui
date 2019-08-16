import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { cloneElement, Component, isValidElement } from 'react';
import { findDOMNode } from 'react-dom';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import cssAnimate, { isCssAnimationSupported } from 'css-animation';
import animUtil from './util';
var transitionMap = {
    enter: 'transitionEnter',
    appear: 'transitionAppear',
    leave: 'transitionLeave'
};

var AnimateChild = function (_Component) {
    _inherits(AnimateChild, _Component);

    function AnimateChild() {
        _classCallCheck(this, AnimateChild);

        return _possibleConstructorReturn(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).apply(this, arguments));
    }

    _createClass(AnimateChild, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stop();
        }
    }, {
        key: 'componentWillEnter',
        value: function componentWillEnter(done) {
            if (animUtil.isEnterSupported(this.props)) {
                this.transition('enter', done);
            } else {
                done();
            }
        }
    }, {
        key: 'componentWillAppear',
        value: function componentWillAppear(done) {
            if (animUtil.isAppearSupported(this.props)) {
                this.transition('appear', done);
            } else {
                done();
            }
        }
    }, {
        key: 'componentWillLeave',
        value: function componentWillLeave(done) {
            if (animUtil.isLeaveSupported(this.props)) {
                this.transition('leave', done);
            } else {
                done();
            }
        }
    }, {
        key: 'transition',
        value: function transition(animationType, finishCallback) {
            var _this2 = this;

            var node = findDOMNode(this);
            if (node) {
                var props = this.props;
                var transitionName = props.transitionName,
                    _props$animation = props.animation,
                    animation = _props$animation === undefined ? {} : _props$animation;

                var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : _typeof(transitionName)) === 'object';
                this.stop();
                var end = function end() {
                    _this2.stopper = null;
                    finishCallback();
                };
                if ((isCssAnimationSupported || !animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
                    var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
                    var activeName = name + '-active';
                    if (nameIsObj && transitionName[animationType + 'Active']) {
                        activeName = transitionName[animationType + 'Active'];
                    }
                    this.stopper = cssAnimate(node, {
                        name: name,
                        active: activeName
                    }, end);
                } else {
                    this.stopper = animation[animationType](node, end);
                }
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            var stopper = this.stopper;

            if (stopper) {
                this.stopper = null;
                stopper.stop();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                otherProps = _objectWithoutProperties(_props, ['children']);

            if (isValidElement(children)) {
                var props = omit(otherProps, ['animation', 'transitionName', 'transitionEnter', 'transitionAppear', 'transitionLeave']);
                var style = children.props.style;

                return cloneElement(children, _extends({}, props, { style: _extends({}, props.style, style) }));
            }
            return children;
        }
    }]);

    return AnimateChild;
}(Component);

export default AnimateChild;

AnimateChild.displayName = 'AnimateChild';
AnimateChild.propTypes = {
    children: PropTypes.any,
    transitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animation: PropTypes.any
};