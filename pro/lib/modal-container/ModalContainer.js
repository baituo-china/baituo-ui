'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.getContainer = getContainer;
exports.open = open;
exports.getKey = getKey;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _findLast = require('lodash/findLast.js');

var _findLast2 = _interopRequireDefault(_findLast);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _measureScrollbar = require('../../../lib/_util/measureScrollbar');

var _measureScrollbar2 = _interopRequireDefault(_measureScrollbar);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _warning = require('../../../lib/_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _configure = require('../../../lib/configure');

var _Modal = require('../modal/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _Mask = require('./Mask');

var _Mask2 = _interopRequireDefault(_Mask);

var _EventManager = require('../_util/EventManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var suffixCls = _Modal2['default'].defaultProps.suffixCls;

var KeyGen = /*#__PURE__*/_regenerator2['default'].mark(function _callee(id) {
    return _regenerator2['default'].wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!true) {
                        _context.next = 5;
                        break;
                    }

                    _context.next = 3;
                    return (0, _configure.getProPrefixCls)(suffixCls) + '-' + id++;

                case 3:
                    _context.next = 0;
                    break;

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})(1);
var containerInstanses = [];
function addInstanse(instanse) {
    removeInstanse(instanse);
    containerInstanses.push(instanse);
}
function removeInstanse(instanse) {
    var index = containerInstanses.indexOf(instanse);
    if (index > -1) {
        containerInstanses.splice(index, 1);
    }
}
var root = void 0;
var defaultBodyStyle = void 0;
/**
 * 判断body是否有滚动条
 *
 * @returns {boolean}
 */
function hasScrollBar() {
    var _document$body = document.body,
        scrollHeight = _document$body.scrollHeight,
        clientHeight = _document$body.clientHeight;

    return scrollHeight > clientHeight;
}
function hideBodyScrollBar() {
    var style = document.body.style;

    if (!defaultBodyStyle) {
        defaultBodyStyle = {
            overflow: style.overflow,
            paddingRight: style.paddingRight
        };
        style.overflow = 'hidden';
        if (hasScrollBar()) {
            style.paddingRight = (0, _UnitConvertor.pxToRem)((0, _measureScrollbar2['default'])()) || null;
        }
    }
}
function showBodyScrollBar() {
    var style = document.body.style;

    if (defaultBodyStyle) {
        var _defaultBodyStyle = defaultBodyStyle,
            overflow = _defaultBodyStyle.overflow,
            paddingRight = _defaultBodyStyle.paddingRight;

        defaultBodyStyle = void 0;
        style.overflow = overflow;
        style.paddingRight = paddingRight;
    }
}

var ModalContainer = function (_Component) {
    (0, _inherits3['default'])(ModalContainer, _Component);

    function ModalContainer(props, context) {
        var _this2 = this;

        (0, _classCallCheck3['default'])(this, ModalContainer);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ModalContainer.__proto__ || Object.getPrototypeOf(ModalContainer)).call(this, props, context));

        _this.state = {
            modals: []
        };
        _this.handleAnimationEnd = function (modalKey, isEnter) {
            if (!isEnter) {
                var modals = _this.state.modals;

                var index = _this.findIndex(modalKey);
                if (index !== -1) {
                    var _props = modals[index];
                    modals.splice(index, 1);
                    if (!_props.destroyOnClose) {
                        modals.unshift(_props);
                    }
                    if (_props.afterClose) {
                        _props.afterClose();
                    }
                    _this.setState({ modals: modals });
                }
            }
        };
        _this.handleMaskClick = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
            var modal, _modal$close, close, _modal$onCancel, onCancel, maskClosable, ret;

            return _regenerator2['default'].wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            modal = (0, _findLast2['default'])(_this.state.modals, function (_ref2) {
                                var hidden = _ref2.hidden;
                                return !hidden;
                            });

                            if (!modal) {
                                _context2.next = 8;
                                break;
                            }

                            _modal$close = modal.close, close = _modal$close === undefined ? _noop2['default'] : _modal$close, _modal$onCancel = modal.onCancel, onCancel = _modal$onCancel === undefined ? _noop2['default'] : _modal$onCancel, maskClosable = modal.maskClosable;

                            if (!maskClosable) {
                                _context2.next = 8;
                                break;
                            }

                            _context2.next = 6;
                            return onCancel();

                        case 6:
                            ret = _context2.sent;

                            if (ret !== false) {
                                close();
                            }

                        case 8:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));
        addInstanse(_this);
        return _this;
    }

    (0, _createClass3['default'])(ModalContainer, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            var location = nextProps.location;
            var currentLocation = this.props.location;

            if (location && currentLocation && location.pathname !== currentLocation.pathname) {
                this.clear();
            }
            addInstanse(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            removeInstanse(this);
        }
    }, {
        key: 'findIndex',
        value: function findIndex(modalKey) {
            return this.state.modals.findIndex(function (_ref3) {
                var key = _ref3.key;
                return key === modalKey;
            });
        }
    }, {
        key: 'open',
        value: function open(props) {
            var modals = this.state.modals;

            if (!props.key) {
                props.key = getKey();
                (0, _warning2['default'])(!!props.destroyOnClose, 'The modal which opened has no key, please provide a key or set the `destroyOnClose` as true.');
            } else {
                var index = this.findIndex(props.key);
                if (index !== -1) {
                    modals.splice(index, 1);
                }
            }
            modals.push((0, _extends3['default'])({}, props, { hidden: false }));
            this.setState({ modals: modals });
        }
    }, {
        key: 'close',
        value: function close(props) {
            var modals = this.state.modals;

            var target = modals.find(function (_ref4) {
                var key = _ref4.key;
                return key === props.key;
            });
            if (target) {
                (0, _extends3['default'])(target, props, { hidden: true });
                this.setState({ modals: modals });
            }
        }
    }, {
        key: 'update',
        value: function update(props) {
            var modals = [].concat((0, _toConsumableArray3['default'])(this.state.modals));
            if (props.key) {
                var index = this.findIndex(props.key);
                if (index !== -1) {
                    modals[index] = props;
                    this.setState({ modals: modals });
                }
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _this3 = this;

            this.state.modals.forEach(function (modal) {
                return _this3.close((0, _extends3['default'])({}, modal, { destroyOnClose: true }));
            });
        }
    }, {
        key: 'getOffset',
        value: function getOffset(modals, idx) {
            var MARGIN_RIGHT_ARRAY = [];
            var DEFAULT = 150;
            var drawers = modals.filter(function (modal) {
                return modal.drawer && !modal.hidden;
            });
            var indexInDrawers = drawers.findIndex(function (drawer) {
                return drawer.key === modals[idx].key;
            });
            if (indexInDrawers === -1) {
                return 0;
            }
            for (var i = drawers.length - 1; i >= indexInDrawers; i--) {
                if (i === drawers.length - 1) {
                    MARGIN_RIGHT_ARRAY.push(0);
                } else {
                    var CURRENT_WIDTH = this.getModalWidth(drawers[i]);
                    var NEXT_WIDTH = this.getModalWidth(drawers[i + 1]);
                    var NEXT_MARGIN = MARGIN_RIGHT_ARRAY[drawers.length - i - 2];
                    if (CURRENT_WIDTH >= NEXT_MARGIN + NEXT_WIDTH + DEFAULT) {
                        MARGIN_RIGHT_ARRAY.push(0);
                    } else {
                        MARGIN_RIGHT_ARRAY.push(NEXT_MARGIN + NEXT_WIDTH + DEFAULT - CURRENT_WIDTH);
                    }
                }
            }
            return MARGIN_RIGHT_ARRAY[MARGIN_RIGHT_ARRAY.length - 1];
        }
    }, {
        key: 'getModalWidth',
        value: function getModalWidth(modal) {
            return modal && modal.style && modal.style.width || 520;
        }
    }, {
        key: 'getComponent',
        value: function getComponent() {
            var _this4 = this;

            var hidden = true;
            var modals = this.state.modals;

            var items = modals.map(function (props, index) {
                var thisHidden = props.hidden;
                if (hidden && !thisHidden) {
                    hidden = false;
                }
                var newProps = {};
                if (props.drawer) {
                    newProps.style = (0, _extends3['default'])({
                        marginRight: _this4.getOffset(modals, index)
                    }, props.style);
                }
                if (index === modals.length - 1) {
                    newProps.className = (0, _classnames2['default'])(props.className, (0, _configure.getProPrefixCls)(suffixCls) + '-active');
                }
                return _react2['default'].createElement(
                    _animate2['default'],
                    { key: props.key, component: 'div', transitionAppear: true, transitionName: props.drawer ? 'slide-right' : 'zoom', hiddenProp: 'hidden', onEnd: _this4.handleAnimationEnd },
                    _react2['default'].createElement(_Modal2['default'], (0, _extends3['default'])({ key: props.key }, props, newProps))
                );
            });
            var animationProps = {};
            if (typeof window !== 'undefined') {
                if (hidden) {
                    animationProps.onEnd = showBodyScrollBar;
                } else {
                    hideBodyScrollBar();
                }
            }
            return _react2['default'].createElement(
                _react.Fragment,
                null,
                _react2['default'].createElement(
                    _animate2['default'],
                    (0, _extends3['default'])({ component: '', transitionAppear: true, transitionName: 'fade', hiddenProp: 'hidden' }, animationProps),
                    _react2['default'].createElement(_Mask2['default'], { hidden: hidden, onClick: this.handleMaskClick, onMouseDown: _EventManager.stopEvent })
                ),
                items
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var mount = getRoot();
            if (mount) {
                return (0, _reactDom.createPortal)(this.getComponent(), mount);
            } else {
                return null;
            }
        }
    }]);
    return ModalContainer;
}(_react.Component);

exports['default'] = ModalContainer;

ModalContainer.displayName = 'ModalContainer';
function getRoot() {
    if (typeof window !== 'undefined') {
        var doc = window.document;
        if (root) {
            if (!root.parentNode) {
                doc.body.appendChild(root);
            }
        } else {
            root = doc.createElement('div');
            root.className = (0, _configure.getProPrefixCls)(suffixCls) + '-container';
            doc.body.appendChild(root);
        }
    }
    return root;
}
function getContainer(loop) {
    var length = containerInstanses.length;

    if (length) {
        return containerInstanses[length - 1];
    } else if (loop !== true) {
        (0, _reactDom.render)(_react2['default'].createElement(ModalContainer, null), getRoot());
        return getContainer(true);
    }
}
function open(props) {
    var close = function () {
        var _ref5 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee3(destroy) {
            var _props2, _props2$onClose, onClose;

            return _regenerator2['default'].wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _props2 = props, _props2$onClose = _props2.onClose, onClose = _props2$onClose === undefined ? _noop2['default'] : _props2$onClose;
                            _context3.next = 3;
                            return onClose();

                        case 3:
                            _context3.t0 = _context3.sent;

                            if (!(_context3.t0 !== false)) {
                                _context3.next = 6;
                                break;
                            }

                            if (destroy) {
                                container.close((0, _extends3['default'])({}, props, { destroyOnClose: true }));
                            } else {
                                container.close(props);
                            }

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        return function close(_x) {
            return _ref5.apply(this, arguments);
        };
    }();

    var container = getContainer();

    function show() {
        container.open(props);
    }
    function update(newProps) {
        container.update((0, _extends3['default'])({}, props, newProps));
    }
    props = (0, _extends3['default'])({
        close: close,
        update: update
    }, _Modal2['default'].defaultProps, props);
    container.open(props);
    return {
        close: close,
        open: show,
        update: update
    };
}
function getKey() {
    return KeyGen.next().value;
}