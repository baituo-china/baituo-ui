'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _reactDom = require('react-dom');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cssAnimation = require('css-animation');

var _cssAnimation2 = _interopRequireDefault(_cssAnimation);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var transitionMap = {
    enter: 'transitionEnter',
    appear: 'transitionAppear',
    leave: 'transitionLeave'
};

var AnimateChild = function (_Component) {
    (0, _inherits3['default'])(AnimateChild, _Component);

    function AnimateChild() {
        (0, _classCallCheck3['default'])(this, AnimateChild);
        return (0, _possibleConstructorReturn3['default'])(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).apply(this, arguments));
    }

    (0, _createClass3['default'])(AnimateChild, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stop();
        }
    }, {
        key: 'componentWillEnter',
        value: function componentWillEnter(done) {
            if (_util2['default'].isEnterSupported(this.props)) {
                this.transition('enter', done);
            } else {
                done();
            }
        }
    }, {
        key: 'componentWillAppear',
        value: function componentWillAppear(done) {
            if (_util2['default'].isAppearSupported(this.props)) {
                this.transition('appear', done);
            } else {
                done();
            }
        }
    }, {
        key: 'componentWillLeave',
        value: function componentWillLeave(done) {
            if (_util2['default'].isLeaveSupported(this.props)) {
                this.transition('leave', done);
            } else {
                done();
            }
        }
    }, {
        key: 'transition',
        value: function transition(animationType, finishCallback) {
            var _this2 = this;

            var node = (0, _reactDom.findDOMNode)(this);
            if (node) {
                var props = this.props;
                var transitionName = props.transitionName,
                    _props$animation = props.animation,
                    animation = _props$animation === undefined ? {} : _props$animation;

                var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : (0, _typeof3['default'])(transitionName)) === 'object';
                this.stop();
                var end = function end() {
                    _this2.stopper = null;
                    finishCallback();
                };
                if ((_cssAnimation.isCssAnimationSupported || !animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
                    var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
                    var activeName = name + '-active';
                    if (nameIsObj && transitionName[animationType + 'Active']) {
                        activeName = transitionName[animationType + 'Active'];
                    }
                    this.stopper = (0, _cssAnimation2['default'])(node, {
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
                otherProps = (0, _objectWithoutProperties3['default'])(_props, ['children']);

            if ((0, _react.isValidElement)(children)) {
                var props = (0, _omit2['default'])(otherProps, ['animation', 'transitionName', 'transitionEnter', 'transitionAppear', 'transitionLeave']);
                var style = children.props.style;

                return (0, _react.cloneElement)(children, (0, _extends3['default'])({}, props, { style: (0, _extends3['default'])({}, props.style, style) }));
            }
            return children;
        }
    }]);
    return AnimateChild;
}(_react.Component);

exports['default'] = AnimateChild;

AnimateChild.displayName = 'AnimateChild';
AnimateChild.propTypes = {
    children: _propTypes2['default'].any,
    transitionName: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
    animation: _propTypes2['default'].any
};
module.exports = exports['default'];