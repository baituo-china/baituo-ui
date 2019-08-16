'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get3 = require('babel-runtime/helpers/get');

var _get4 = _interopRequireDefault(_get3);

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

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _FormContext = require('../form/FormContext');

var _FormContext2 = _interopRequireDefault(_FormContext);

var _progress = require('../progress');

var _progress2 = _interopRequireDefault(_progress);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _DataSetComponent2 = require('../data-set/DataSetComponent');

var _DataSetComponent3 = _interopRequireDefault(_DataSetComponent2);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _configure = require('../../../lib/configure');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Button = function (_DataSetComponent) {
    (0, _inherits3['default'])(Button, _DataSetComponent);

    function Button(props, context) {
        (0, _classCallCheck3['default'])(this, Button);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props, context));

        _this.handleClickWait = _this.getHandleClick(props);
        return _this;
    }

    (0, _createClass3['default'])(Button, [{
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return {
                dataSet: props.dataSet || context.dataSet,
                loading: props.loading,
                type: props.type
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            (0, _get4['default'])(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);
            var _props = this.props,
                wait = _props.wait,
                waitType = _props.waitType;

            if (wait !== nextProps.wait || waitType !== nextProps.waitType) {
                this.handleClickWait = this.getHandleClick(nextProps);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.handleClickWait.cancel();
        }
    }, {
        key: 'getHandleClick',
        value: function getHandleClick(props) {
            var wait = props.wait,
                waitType = props.waitType;

            if (wait && waitType) {
                var options = { leading: true, trailing: true };
                if (waitType === "throttle" /* throttle */) {
                        options.trailing = false;
                        options.maxWait = wait;
                    } else if (waitType === "debounce" /* debounce */) {
                        options.leading = false;
                    }
                return (0, _debounce2['default'])(this.handleClick, wait, options);
            }
            return (0, _debounce2['default'])(this.handleClick, 0);
        }
    }, {
        key: 'handleClick',
        value: function () {
            var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(e) {
                var onClick, afterClick;
                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                onClick = this.props.onClick;

                                if (!onClick) {
                                    _context.next = 11;
                                    break;
                                }

                                afterClick = onClick(e);

                                if (!(afterClick && afterClick instanceof Promise)) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.prev = 4;

                                this.loading = true;
                                _context.next = 8;
                                return afterClick;

                            case 8:
                                _context.prev = 8;

                                this.loading = false;
                                return _context.finish(8);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[4,, 8, 11]]);
            }));

            function handleClick(_x) {
                return _ref.apply(this, arguments);
            }

            return handleClick;
        }()
    }, {
        key: 'isDisabled',
        value: function isDisabled() {
            var disabled = this.context.disabled;

            return disabled || (0, _get4['default'])(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'isDisabled', this).call(this) || this.loading;
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get4['default'])(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'getOtherProps', this).call(this), ['icon', 'funcType', 'color', 'loading', 'wait', 'waitType']);
            if (!this.isDisabled()) {
                otherProps.onClick = this.handleClickWait;
            }
            return otherProps;
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var _get2, _ref2;

            var prefixCls = this.prefixCls,
                _props2 = this.props,
                color = _props2.color,
                _props2$funcType = _props2.funcType,
                funcType = _props2$funcType === undefined ? (0, _configure.getConfig)('buttonFuncType') || "raised" : _props2$funcType,
                children = _props2.children,
                icon = _props2.icon;

            var childrenCount = _react.Children.count(children);

            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            return (_get2 = (0, _get4['default'])(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'getClassName', this)).call.apply(_get2, [this, (_ref2 = {}, (0, _defineProperty3['default'])(_ref2, prefixCls + '-' + funcType, funcType), (0, _defineProperty3['default'])(_ref2, prefixCls + '-' + color, color), (0, _defineProperty3['default'])(_ref2, prefixCls + '-icon-only', icon ? childrenCount === 0 || children === false : childrenCount === 1 && children.type === _icon2['default']), _ref2)].concat(props));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                children = _props3.children,
                icon = _props3.icon,
                href = _props3.href;

            var buttonIcon = this.loading ? _react2['default'].createElement(_progress2['default'], { key: 'loading', type: "loading" /* loading */, size: "small" /* small */ }) : icon && _react2['default'].createElement(_icon2['default'], { type: icon });
            var hasString = _react.Children.toArray(children).some(function (child) {
                return (0, _isString2['default'])(child);
            });
            var Cmp = href ? 'a' : 'button';
            var props = this.getMergedProps();
            return _react2['default'].createElement(
                _ripple2['default'],
                { disabled: this.isDisabled() },
                _react2['default'].createElement(
                    Cmp,
                    href ? (0, _omit2['default'])(props, ['type']) : props,
                    buttonIcon,
                    hasString ? _react2['default'].createElement(
                        'span',
                        null,
                        children
                    ) : children
                )
            );
        }
    }, {
        key: 'loading',
        get: function get() {
            var _observableProps = this.observableProps,
                type = _observableProps.type,
                dataSet = _observableProps.dataSet,
                loading = _observableProps.loading;

            return loading || type === "submit" /* submit */ && !!dataSet && dataSet.status === "submitting" /* submitting */;
        },
        set: function set(loading) {
            var _this2 = this;

            (0, _mobx.runInAction)(function () {
                _this2.observableProps.loading = loading;
            });
        }
    }]);
    return Button;
}(_DataSetComponent3['default']);
Button.displayName = 'Button';
Button.contextType = _FormContext2['default'];
Button.propTypes = (0, _extends3['default'])({
    /**
     * 按钮展现模式
     * 可选值：'flat' | 'raised'
     * @default raised
     */
    funcType: _propTypes2['default'].oneOf(["flat" /* flat */
    , "raised" /* raised */
    ]),
    /**
     * 按钮颜色风格
     * 可选值：'default' | 'gray' | 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'dark'
     * @default 'default'
     */
    color: _propTypes2['default'].oneOf(["default" /* default */
    , "gray" /* gray */
    , "blue" /* blue */
    , "red" /* red */
    , "green" /* green */
    , "yellow" /* yellow */
    , "purple" /* purple */
    , "dark" /* dark */
    ]),
    /**
     * 按钮类型
     * 可选值：'button' | 'submit' | 'reset'
     * @default 'button'
     */
    type: _propTypes2['default'].oneOf(["button" /* button */
    , "submit" /* submit */
    , "reset" /* reset */
    ]),
    /**
     * 按钮是否是加载状态
     */
    loading: _propTypes2['default'].bool,
    /**
     * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
     */
    href: _propTypes2['default'].string,
    /**
     * 相当于 a 链接的 target 属性，href 存在时生效
     */
    target: _propTypes2['default'].string,
    /**
     * 点击等待时间
     */
    wait: _propTypes2['default'].number,
    /**
     * 点击间隔类型，可选值：throttle | debounce
     * @default throttle
     */
    waitType: _propTypes2['default'].oneOf(["throttle" /* throttle */, "debounce" /* debounce */])
}, _DataSetComponent3['default'].propTypes);
Button.defaultProps = {
    suffixCls: 'btn',
    type: "button" /* button */
    , color: "default" /* default */
    , loading: false,
    waitType: "throttle" /* throttle */
};
tslib_1.__decorate([_mobx.computed], Button.prototype, "loading", null);
tslib_1.__decorate([_autobind2['default']], Button.prototype, "handleClick", null);
Button = tslib_1.__decorate([_mobxReact.observer], Button);
exports['default'] = Button;
module.exports = exports['default'];