import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import noop from 'lodash/noop';
import domAlign from 'dom-align';
import EventManager from '../_util/EventManager';
import TaskRunner from '../_util/TaskRunner';

var Align = function (_Component) {
    _inherits(Align, _Component);

    function Align() {
        _classCallCheck(this, Align);

        return _possibleConstructorReturn(this, (Align.__proto__ || Object.getPrototypeOf(Align)).apply(this, arguments));
    }

    _createClass(Align, [{
        key: 'forceAlign',
        value: function forceAlign() {
            var _props = this.props,
                hidden = _props.hidden,
                _props$onAlign = _props.onAlign,
                onAlign = _props$onAlign === undefined ? noop : _props$onAlign,
                _props$target = _props.target,
                target = _props$target === undefined ? function () {
                return window;
            } : _props$target,
                align = _props.align;

            if (!hidden) {
                var source = findDOMNode(this);
                var ref = target();
                onAlign(source, domAlign(source, ref, align), ref);
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
                this.resizeHandler = new EventManager(window);
                this.bufferMonitor = new TaskRunner();
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
                return cloneElement(Children.only(children), newProps);
            }
            return children;
        }
    }]);

    return Align;
}(Component);

export default Align;

Align.displayName = 'Align';
Align.propTypes = {
    childrenProps: PropTypes.object,
    align: PropTypes.object.isRequired,
    target: PropTypes.func,
    onAlign: PropTypes.func,
    monitorBufferTime: PropTypes.number,
    monitorWindowResize: PropTypes.bool,
    hidden: PropTypes.bool,
    children: PropTypes.any
};
Align.defaultProps = {
    monitorBufferTime: 50,
    monitorWindowResize: false,
    hidden: true
};
function isWindow(obj) {
    return obj != null && obj === obj.window;
}