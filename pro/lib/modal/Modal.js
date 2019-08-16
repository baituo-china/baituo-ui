'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _defer = require('lodash/defer');

var _defer2 = _interopRequireDefault(_defer);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _ViewComponent2 = require('../core/ViewComponent');

var _ViewComponent3 = _interopRequireDefault(_ViewComponent2);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _EventManager = require('../_util/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _isEmpty = require('../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _AsyncComponent = require('../_util/AsyncComponent');

var _AsyncComponent2 = _interopRequireDefault(_AsyncComponent);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _message = require('../message');

var _message2 = _interopRequireDefault(_message);

var _exception = require('../_util/exception');

var _exception2 = _interopRequireDefault(_exception);

var _localeContext = require('../locale-context');

var _configure = require('../../../lib/configure');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Modal = function (_ViewComponent) {
    (0, _inherits3['default'])(Modal, _ViewComponent);

    function Modal() {
        (0, _classCallCheck3['default'])(this, Modal);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));

        _this.moveEvent = new _EventManager2['default'](typeof window === 'undefined' ? void 0 : document);
        _this.okCancelEvent = new _EventManager2['default']();
        _this.saveCancelRef = function (node) {
            return _this.cancelButton = node;
        };
        _this.handleKeyDown = function (e) {
            var cancelButton = _this.cancelButton;

            if (cancelButton && !cancelButton.isDisabled() && e.keyCode === _KeyCode2['default'].ESC) {
                cancelButton.handleClickWait(e);
            }
        };
        _this.registerOk = function (ok) {
            _this.okCancelEvent.removeEventListener('ok');
            _this.okCancelEvent.addEventListener('ok', ok);
        };
        _this.registerCancel = function (cancel) {
            _this.okCancelEvent.removeEventListener('cancel');
            _this.okCancelEvent.addEventListener('cancel', cancel);
        };
        _this.getDefaultFooter = function (okBtn, cancelBtn) {
            var _this$props = _this.props,
                okCancel = _this$props.okCancel,
                _this$props$okFirst = _this$props.okFirst,
                okFirst = _this$props$okFirst === undefined ? (0, _configure.getConfig)('modalOkFirst') : _this$props$okFirst,
                drawer = _this$props.drawer;

            var buttons = [okBtn];
            if (okCancel) {
                if (okFirst || drawer) {
                    buttons.push(cancelBtn);
                } else {
                    buttons.unshift(cancelBtn);
                }
            }
            return _react2['default'].createElement(
                'div',
                null,
                buttons
            );
        };
        return _this;
    }

    (0, _createClass3['default'])(Modal, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get3['default'])(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'getOtherProps', this).call(this), ['closable', 'movable', 'maskClosable', 'keyboardClosable', 'fullScreen', 'title', 'header', 'footer', 'close', 'update', 'okText', 'cancelText', 'okCancel', 'onClose', 'onOk', 'onCancel', 'destroyOnClose', 'drawer', 'afterClose', 'okProps', 'cancelProps', 'border', 'okFirst']);
            if (this.props.keyboardClosable) {
                otherProps.autoFocus = true;
                otherProps.tabIndex = -1;
                otherProps.onKeyDown = this.handleKeyDown;
            }
            return otherProps;
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var _get$call;

            var prefixCls = this.prefixCls,
                _props = this.props,
                _props$style = _props.style,
                style = _props$style === undefined ? {} : _props$style,
                fullScreen = _props.fullScreen,
                drawer = _props.drawer,
                _props$border = _props.border,
                border = _props$border === undefined ? (0, _configure.getConfig)('modalSectionBorder') : _props$border;

            return (0, _get3['default'])(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'getClassName', this).call(this, (_get$call = {}, (0, _defineProperty3['default'])(_get$call, prefixCls + '-center', !drawer && !('left' in style || 'right' in style) && !this.offset), (0, _defineProperty3['default'])(_get$call, prefixCls + '-fullscreen', fullScreen), (0, _defineProperty3['default'])(_get$call, prefixCls + '-drawer', drawer), (0, _defineProperty3['default'])(_get$call, prefixCls + '-border', border), _get$call));
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.prefixCls;

            var header = this.getHeader();
            var body = this.getBody();
            var footer = this.getFooter();
            return _react2['default'].createElement(
                'div',
                this.getMergedProps(),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    header,
                    body,
                    footer
                )
            );
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(_ref) {
            var _this2 = this;

            var hidden = _ref.hidden;

            if (hidden === false && hidden !== this.props.hidden) {
                (0, _defer2['default'])(function () {
                    return _this2.focus();
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.moveEvent.clear();
            this.okCancelEvent.clear();
        }
    }, {
        key: 'handleHeaderMouseDown',
        value: function handleHeaderMouseDown(downEvent) {
            var _this3 = this;

            var element = this.element;

            if (element) {
                var prefixCls = this.prefixCls;
                var clientX = downEvent.clientX,
                    clientY = downEvent.clientY;
                var offsetLeft = element.offsetLeft,
                    offsetTop = element.offsetTop;

                this.moveEvent.addEventListener('mousemove', function (moveEvent) {
                    var moveX = moveEvent.clientX,
                        moveY = moveEvent.clientY;

                    (0, _componentClasses2['default'])(element).remove(prefixCls + '-center');
                    var left = (0, _UnitConvertor.pxToRem)(Math.max(offsetLeft + moveX - clientX, 0));
                    var top = (0, _UnitConvertor.pxToRem)(Math.max(offsetTop + moveY - clientY, 0));
                    _this3.offset = [left, top];
                    (0, _extends3['default'])(element.style, {
                        left: left,
                        top: top
                    });
                }).addEventListener('mouseup', function () {
                    _this3.moveEvent.clear();
                });
            }
        }
    }, {
        key: 'handleOk',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
                var _props$onOk, onOk, promise, _ref3, _ref4, ret1, ret2;

                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _props$onOk = this.props.onOk, onOk = _props$onOk === undefined ? _noop2['default'] : _props$onOk;
                                promise = Promise.all([onOk(), this.okCancelEvent.fireEvent('ok')]);
                                _context.prev = 2;
                                _context.next = 5;
                                return promise;

                            case 5:
                                _ref3 = _context.sent;
                                _ref4 = (0, _slicedToArray3['default'])(_ref3, 2);
                                ret1 = _ref4[0];
                                ret2 = _ref4[1];

                                if (ret1 !== false && ret2) {
                                    this.close();
                                }
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](2);

                                _message2['default'].error((0, _exception2['default'])(_context.t0));

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 12]]);
            }));

            function handleOk() {
                return _ref2.apply(this, arguments);
            }

            return handleOk;
        }()
    }, {
        key: 'handleCancel',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
                var _props$onCancel, onCancel, promise, _ref6, _ref7, ret1, ret2;

                return _regenerator2['default'].wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _props$onCancel = this.props.onCancel, onCancel = _props$onCancel === undefined ? _noop2['default'] : _props$onCancel;
                                promise = Promise.all([onCancel(), this.okCancelEvent.fireEvent('cancel')]);
                                _context2.prev = 2;
                                _context2.next = 5;
                                return promise;

                            case 5:
                                _ref6 = _context2.sent;
                                _ref7 = (0, _slicedToArray3['default'])(_ref6, 2);
                                ret1 = _ref7[0];
                                ret2 = _ref7[1];

                                if (ret1 !== false && ret2) {
                                    this.close();
                                }
                                _context2.next = 15;
                                break;

                            case 12:
                                _context2.prev = 12;
                                _context2.t0 = _context2['catch'](2);

                                _message2['default'].error((0, _exception2['default'])(_context2.t0));

                            case 15:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 12]]);
            }));

            function handleCancel() {
                return _ref5.apply(this, arguments);
            }

            return handleCancel;
        }()
    }, {
        key: 'getTitle',
        value: function getTitle() {
            var title = this.props.title,
                prefixCls = this.prefixCls;

            if (title) {
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-title' },
                    title
                );
            }
        }
    }, {
        key: 'getHeader',
        value: function getHeader() {
            var prefixCls = this.prefixCls,
                _props2 = this.props,
                closable = _props2.closable,
                movable = _props2.movable,
                fullScreen = _props2.fullScreen,
                drawer = _props2.drawer,
                header = _props2.header;

            if (!!header) {
                var title = this.getTitle();
                var buttons = this.getHeaderButtons();
                if (title || closable || movable) {
                    var headerProps = {
                        className: (0, _classnames2['default'])(prefixCls + '-header', (0, _defineProperty3['default'])({}, prefixCls + '-movable', movable && !fullScreen && !drawer))
                    };
                    if (movable && !fullScreen && !drawer) {
                        headerProps.onMouseDown = this.handleHeaderMouseDown;
                    }
                    return _react2['default'].createElement(
                        'div',
                        headerProps,
                        title,
                        buttons
                    );
                }
            }
        }
    }, {
        key: 'getHeaderButtons',
        value: function getHeaderButtons() {
            var prefixCls = this.prefixCls;

            var closeButton = this.getCloseButton();
            if (closeButton) {
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-header-buttons' },
                    closeButton
                );
            }
        }
    }, {
        key: 'getCloseButton',
        value: function getCloseButton() {
            var prefixCls = this.prefixCls,
                closable = this.props.closable;

            if (closable) {
                return _react2['default'].createElement(
                    'button',
                    { className: prefixCls + '-header-button', onClick: this.close },
                    _react2['default'].createElement(_icon2['default'], { type: 'close' })
                );
            }
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(children) {
            if (children) {
                var prefixCls = this.prefixCls,
                    props = this.props;
                var _props$close = props.close,
                    close = _props$close === undefined ? _noop2['default'] : _props$close,
                    _props$update = props.update,
                    update = _props$update === undefined ? _noop2['default'] : _props$update;

                var modal = {
                    close: close,
                    update: update,
                    props: props,
                    handleOk: this.registerOk,
                    handleCancel: this.registerCancel
                };
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-body' },
                    (0, _react.isValidElement)(children) ? (0, _react.cloneElement)(children, { modal: modal }) : children
                );
            }
        }
    }, {
        key: 'getBody',
        value: function getBody() {
            var children = this.props.children;

            return this.renderChildren(typeof children === 'function' ? (0, _AsyncComponent2['default'])(children) : children);
        }
    }, {
        key: 'getFooter',
        value: function getFooter() {
            var _props3 = this.props,
                okProps = _props3.okProps,
                cancelProps = _props3.cancelProps,
                drawer = _props3.drawer,
                _props3$okText = _props3.okText,
                okText = _props3$okText === undefined ? (0, _localeContext.$l)('Modal', 'ok') : _props3$okText,
                _props3$cancelText = _props3.cancelText,
                cancelText = _props3$cancelText === undefined ? (0, _localeContext.$l)('Modal', 'cancel') : _props3$cancelText,
                _props3$footer = _props3.footer,
                footer = _props3$footer === undefined ? this.getDefaultFooter : _props3$footer;

            var funcType = drawer ? "raised" /* raised */ : (0, _configure.getConfig)('buttonFuncType');
            var okBtn = _react2['default'].createElement(_Button2['default'], (0, _extends3['default'])({ key: 'ok', funcType: funcType, color: "blue" /* blue */, onClick: this.handleOk, children: okText }, okProps));
            var cancelBtn = _react2['default'].createElement(_Button2['default'], (0, _extends3['default'])({ key: 'cancel', ref: this.saveCancelRef, funcType: funcType, onClick: this.handleCancel, children: cancelText }, cancelProps));
            if (typeof footer === 'function') {
                return this.getWrappedFooter(footer(okBtn, cancelBtn));
            }
            if (!(0, _isEmpty2['default'])(footer, true)) {
                return this.getWrappedFooter(footer);
            }
        }
    }, {
        key: 'getWrappedFooter',
        value: function getWrappedFooter(footer) {
            var prefixCls = this.prefixCls;
            var drawer = this.props.drawer;

            var className = (0, _classnames2['default'])(prefixCls + '-footer', (0, _defineProperty3['default'])({}, prefixCls + '-footer-drawer', !!drawer));
            return _react2['default'].createElement(
                'div',
                { className: className },
                footer
            );
        }
    }, {
        key: 'close',
        value: function close() {
            var _props$close2 = this.props.close,
                close = _props$close2 === undefined ? _noop2['default'] : _props$close2;

            close();
        }
    }]);
    return Modal;
}(_ViewComponent3['default']);

exports['default'] = Modal;

Modal.displayName = 'Modal';
Modal.propTypes = (0, _extends3['default'])({}, _ViewComponent3['default'].propTypes, {
    closable: _propTypes2['default'].bool,
    movable: _propTypes2['default'].bool,
    fullScreen: _propTypes2['default'].bool,
    maskClosable: _propTypes2['default'].bool,
    keyboardClosable: _propTypes2['default'].bool,
    header: _propTypes2['default'].bool,
    footer: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].node, _propTypes2['default'].bool]),
    destroyOnClose: _propTypes2['default'].bool,
    okText: _propTypes2['default'].node,
    cancelText: _propTypes2['default'].node,
    okProps: _propTypes2['default'].object,
    cancelProps: _propTypes2['default'].object,
    onClose: _propTypes2['default'].func,
    onOk: _propTypes2['default'].func,
    onCancel: _propTypes2['default'].func,
    afterClose: _propTypes2['default'].func,
    okCancel: _propTypes2['default'].bool,
    drawer: _propTypes2['default'].bool,
    // title: PropTypes.node,
    // 此处原本允许title传入node，但是类型为PropTypes.node时无法正确继承ViewComponent
    // 父类中的title指的是HTML元素的title属性，此处title指modal标题，产生歧义，暂时设置为string
    // TODO: 添加modalTitle属性替代此处的title
    title: _propTypes2['default'].string,
    okFirst: _propTypes2['default'].bool
});
Modal.defaultProps = {
    suffixCls: 'modal',
    header: true,
    closable: false,
    movable: true,
    maskClosable: false,
    keyboardClosable: true,
    okCancel: true,
    destroyOnClose: true,
    fullScreen: false,
    drawer: false,
    autoFocus: true
};
tslib_1.__decorate([_autobind2['default']], Modal.prototype, "handleHeaderMouseDown", null);
tslib_1.__decorate([_autobind2['default']], Modal.prototype, "handleOk", null);
tslib_1.__decorate([_autobind2['default']], Modal.prototype, "handleCancel", null);
tslib_1.__decorate([_autobind2['default']], Modal.prototype, "close", null);
module.exports = exports['default'];