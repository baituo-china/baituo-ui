'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactDom = require('react-dom');

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _domAlign = require('dom-align');

var _domAlign2 = _interopRequireDefault(_domAlign);

var _EventManager = require('../_util/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

var _TaskRunner = require('../_util/TaskRunner');

var _TaskRunner2 = _interopRequireDefault(_TaskRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Align = function (_Component) {
    (0, _inherits3['default'])(Align, _Component);

    function Align() {
        (0, _classCallCheck3['default'])(this, Align);
        return (0, _possibleConstructorReturn3['default'])(this, (Align.__proto__ || Object.getPrototypeOf(Align)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Align, [{
        key: 'forceAlign',
        value: function forceAlign() {
            var _props = this.props,
                hidden = _props.hidden,
                _props$onAlign = _props.onAlign,
                onAlign = _props$onAlign === undefined ? _noop2['default'] : _props$onAlign,
                _props$target = _props.target,
                target = _props$target === undefined ? function () {
                return window;
            } : _props$target,
                align = _props.align;

            if (!hidden) {
                var source = (0, _reactDom.findDOMNode)(this);
                var ref = target();
                onAlign(source, (0, _domAlign2['default'])(source, ref, align), ref);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props2 = this.props,
                hidden = _props2.hidden,
                monitorWindowResize = _props2.monitorWindowResize;

            this.forceAlign();
            if (!hidden && monitorWindowResize) {
                this.startMonitorWindowResize();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _props3 = this.props,
                hidden = _props3.hidden,
                align = _props3.align,
                _props3$target = _props3.target,
                target = _props3$target === undefined ? function () {
                return window;
            } : _props3$target,
                monitorWindowResize = _props3.monitorWindowResize;
            var preHidden = prevProps.hidden,
                preAlign = prevProps.align,
                preTarget = prevProps.target;

            var reAlign = false;
            if (!hidden) {
                if (preHidden || preAlign !== align) {
                    reAlign = true;
                } else {
                    var lastTarget = preTarget();
                    var currentTarget = target();
                    if (isWindow(lastTarget) && isWindow(currentTarget)) {
                        reAlign = false;
                    } else if (lastTarget !== currentTarget) {
                        reAlign = true;
                    }
                }
            }
            if (reAlign) {
                this.forceAlign();
            }
            if (monitorWindowResize && !hidden) {
                this.startMonitorWindowResize();
            } else {
                this.stopMonitorWindowResize();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stopMonitorWindowResize();
        }
    }, {
        key: 'startMonitorWindowResize',
        value: function startMonitorWindowResize() {
            if (!this.resizeHandler) {
                this.resizeHandler = new _EventManager2['default'](window);
                this.bufferMonitor = new _TaskRunner2['default']();
                this.resizeHandler.addEventListener('resize', this.bufferMonitor.delay.bind(this.bufferMonitor, this.props.monitorBufferTime, this.forceAlign.bind(this)));
            }
        }
    }, {
        key: 'stopMonitorWindowResize',
        value: function stopMonitorWindowResize() {
            if (this.resizeHandler) {
                if (this.bufferMonitor) {
                    this.bufferMonitor.cancel();
                }
                this.resizeHandler.clear();
                this.resizeHandler = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                childrenProps = _props4.childrenProps,
                children = _props4.children;

            if (childrenProps) {
                var newProps = {};
                for (var prop in childrenProps) {
                    if (childrenProps.hasOwnProperty(prop)) {
                        newProps[prop] = this.props[childrenProps[prop]];
                    }
                }
                return (0, _react.cloneElement)(_react.Children.only(children), newProps);
            }
            return children;
        }
    }]);
    return Align;
}(_react.Component);

exports['default'] = Align;

Align.displayName = 'Align';
Align.propTypes = {
    childrenProps: _propTypes2['default'].object,
    align: _propTypes2['default'].object.isRequired,
    target: _propTypes2['default'].func,
    onAlign: _propTypes2['default'].func,
    monitorBufferTime: _propTypes2['default'].number,
    monitorWindowResize: _propTypes2['default'].bool,
    hidden: _propTypes2['default'].bool,
    children: _propTypes2['default'].any
};
Align.defaultProps = {
    monitorBufferTime: 50,
    monitorWindowResize: false,
    hidden: true
};
function isWindow(obj) {
    return obj != null && obj === obj.window;
}
module.exports = exports['default'];