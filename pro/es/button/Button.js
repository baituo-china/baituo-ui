import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';
import isString from 'lodash/isString';
import { computed, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import Icon from '../icon';
import FormContext from '../form/FormContext';
import Progress from '../progress';
import Ripple from '../ripple';
import DataSetComponent from '../data-set/DataSetComponent';
import autobind from '../_util/autobind';
import { getConfig } from '../../../es/configure';
var Button = function (_DataSetComponent) {
    _inherits(Button, _DataSetComponent);

    function Button(props, context) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props, context));

        _this.handleClickWait = _this.getHandleClick(props);
        return _this;
    }

    _createClass(Button, [{
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
            _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);
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
                return debounce(this.handleClick, wait, options);
            }
            return debounce(this.handleClick, 0);
        }
    }, {
        key: 'handleClick',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e) {
                var onClick, afterClick;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
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

            return disabled || _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'isDisabled', this).call(this) || this.loading;
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'getOtherProps', this).call(this), ['icon', 'funcType', 'color', 'loading', 'wait', 'waitType']);
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
                funcType = _props2$funcType === undefined ? getConfig('buttonFuncType') || "raised" : _props2$funcType,
                children = _props2.children,
                icon = _props2.icon;

            var childrenCount = Children.count(children);

            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            return (_get2 = _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'getClassName', this)).call.apply(_get2, [this, (_ref2 = {}, _defineProperty(_ref2, prefixCls + '-' + funcType, funcType), _defineProperty(_ref2, prefixCls + '-' + color, color), _defineProperty(_ref2, prefixCls + '-icon-only', icon ? childrenCount === 0 || children === false : childrenCount === 1 && children.type === Icon), _ref2)].concat(props));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                children = _props3.children,
                icon = _props3.icon,
                href = _props3.href;

            var buttonIcon = this.loading ? React.createElement(Progress, { key: 'loading', type: "loading" /* loading */, size: "small" /* small */ }) : icon && React.createElement(Icon, { type: icon });
            var hasString = Children.toArray(children).some(function (child) {
                return isString(child);
            });
            var Cmp = href ? 'a' : 'button';
            var props = this.getMergedProps();
            return React.createElement(
                Ripple,
                { disabled: this.isDisabled() },
                React.createElement(
                    Cmp,
                    href ? omit(props, ['type']) : props,
                    buttonIcon,
                    hasString ? React.createElement(
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

            runInAction(function () {
                _this2.observableProps.loading = loading;
            });
        }
    }]);

    return Button;
}(DataSetComponent);
Button.displayName = 'Button';
Button.contextType = FormContext;
Button.propTypes = _extends({
    /**
     * 按钮展现模式
     * 可选值：'flat' | 'raised'
     * @default raised
     */
    funcType: PropTypes.oneOf(["flat" /* flat */
    , "raised" /* raised */
    ]),
    /**
     * 按钮颜色风格
     * 可选值：'default' | 'gray' | 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'dark'
     * @default 'default'
     */
    color: PropTypes.oneOf(["default" /* default */
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
    type: PropTypes.oneOf(["button" /* button */
    , "submit" /* submit */
    , "reset" /* reset */
    ]),
    /**
     * 按钮是否是加载状态
     */
    loading: PropTypes.bool,
    /**
     * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
     */
    href: PropTypes.string,
    /**
     * 相当于 a 链接的 target 属性，href 存在时生效
     */
    target: PropTypes.string,
    /**
     * 点击等待时间
     */
    wait: PropTypes.number,
    /**
     * 点击间隔类型，可选值：throttle | debounce
     * @default throttle
     */
    waitType: PropTypes.oneOf(["throttle" /* throttle */, "debounce" /* debounce */])
}, DataSetComponent.propTypes);
Button.defaultProps = {
    suffixCls: 'btn',
    type: "button" /* button */
    , color: "default" /* default */
    , loading: false,
    waitType: "throttle" /* throttle */
};
tslib_1.__decorate([computed], Button.prototype, "loading", null);
tslib_1.__decorate([autobind], Button.prototype, "handleClick", null);
Button = tslib_1.__decorate([observer], Button);
export default Button;