import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { action, observable, runInAction } from 'mobx';
import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import defer from 'lodash/defer';
import merge from 'lodash/merge';
import noop from 'lodash/noop';
import isUndefined from 'lodash/isUndefined';
import classes from 'component-classes';
import { getProPrefixCls } from '../../../es/configure';
import autobind from '../_util/autobind';
import normalizeLanguage from '../_util/normalizeLanguage';
import localeContext from '../locale-context';

var ViewComponent = function (_Component) {
    _inherits(ViewComponent, _Component);

    function ViewComponent(props, context) {
        _classCallCheck(this, ViewComponent);

        var _this = _possibleConstructorReturn(this, (ViewComponent.__proto__ || Object.getPrototypeOf(ViewComponent)).call(this, props, context));

        _this.setObservableProps(props, context);
        return _this;
    }

    _createClass(ViewComponent, [{
        key: 'getMergedClassNames',
        value: function getMergedClassNames() {
            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            return classNames.apply(undefined, [this.getClassName(), this.getWrapperClassNames()].concat(props));
        }
    }, {
        key: 'getMergedProps',
        value: function getMergedProps() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return _extends({}, merge(this.getWrapperProps(props), this.getOtherProps()), {
                className: this.getMergedClassNames()
            });
        }
    }, {
        key: 'getObservableProps',
        value: function getObservableProps(_props, _context) {
            return {};
        }
    }, {
        key: 'setObservableProps',
        value: function setObservableProps(props, context) {
            this.observableProps = this.getObservableProps(props, context);
        }
    }, {
        key: 'updateObservableProps',
        value: function updateObservableProps(props, context) {
            _extends(this.observableProps, omitBy(this.getObservableProps(props, context), isUndefined));
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var _props2 = this.props,
                tabIndex = _props2.tabIndex,
                lang = _props2.lang,
                _props2$style = _props2.style,
                style = _props2$style === undefined ? {} : _props2$style;

            var otherProps = omit(this.props, ['prefixCls', 'suffixCls', 'className', 'elementClassName', 'style', 'size', 'autoFocus', 'onFocus', 'onBlur', 'children', 'dataSet']);
            if (this.isDisabled()) {
                otherProps = omit(otherProps, ['onClick', 'onMouseUp', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onMouseOut', 'onKeyDown', 'onKeyUp', 'onKeyPress', 'onContextMenu']);
                if (tabIndex !== void 0) {
                    otherProps.tabIndex = -1;
                }
            } else {
                otherProps.onFocus = this.handleFocus;
                otherProps.onBlur = this.handleBlur;
            }
            otherProps.ref = this.elementReference;
            otherProps.disabled = this.isDisabled();
            otherProps.className = this.getClassName();
            if ('height' in style) {
                otherProps.style = { height: style.height };
            }
            otherProps.lang = normalizeLanguage(lang);
            return otherProps;
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var prefixCls = this.prefixCls,
                elementClassName = this.props.elementClassName;

            for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                props[_key2] = arguments[_key2];
            }

            return classNames.apply(undefined, [prefixCls, elementClassName].concat(props));
        }
    }, {
        key: 'getWrapperProps',
        value: function getWrapperProps() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var _props3 = this.props,
                style = _props3.style,
                hidden = _props3.hidden;

            var wrapperProps = _extends({
                ref: this.wrapperReference,
                className: this.getWrapperClassNames(),
                hidden: hidden
            }, props);
            if (style) {
                wrapperProps.style = omit(style, 'height');
            }
            return wrapperProps;
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var _ref;

            var prefixCls = this.prefixCls,
                _props4 = this.props,
                className = _props4.className,
                size = _props4.size;

            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return classNames.apply(undefined, [prefixCls + '-wrapper', className, (_ref = {}, _defineProperty(_ref, prefixCls + '-sm', size === 'small'), _defineProperty(_ref, prefixCls + '-lg', size === 'large'), _defineProperty(_ref, prefixCls + '-disabled', this.isDisabled()), _defineProperty(_ref, prefixCls + '-focused', this.isFocus), _ref)].concat(args));
        }
    }, {
        key: 'isDisabled',
        value: function isDisabled() {
            return this.props.disabled;
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(e) {
            var _this2 = this;

            runInAction(function () {
                _this2.isFocused = true;
                _this2.isFocus = true;
                var _props$onFocus = _this2.props.onFocus,
                    onFocus = _props$onFocus === undefined ? noop : _props$onFocus,
                    prefixCls = _this2.prefixCls;

                onFocus(e);
                var element = _this2.wrapper || findDOMNode(_this2);
                if (element) {
                    classes(element).add(prefixCls + '-focused');
                }
            });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var _this3 = this;

            if (!e.isDefaultPrevented()) {
                runInAction(function () {
                    _this3.isFocused = false;
                    _this3.isFocus = false;
                    var _props$onBlur = _this3.props.onBlur,
                        onBlur = _props$onBlur === undefined ? noop : _props$onBlur,
                        prefixCls = _this3.prefixCls;

                    onBlur(e);
                    var element = _this3.wrapper || findDOMNode(_this3);
                    if (element) {
                        classes(element).remove(prefixCls + '-focused');
                    }
                });
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            if (this.element) {
                this.element.focus();
            }
        }
    }, {
        key: 'blur',
        value: function blur() {
            if (this.element) {
                this.element.blur();
            }
        }
    }, {
        key: 'elementReference',
        value: function elementReference(node) {
            this.element = node;
        }
    }, {
        key: 'wrapperReference',
        value: function wrapperReference(node) {
            this.wrapper = node;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            this.updateObservableProps(nextProps, nextContext);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this4 = this;

            var _props5 = this.props,
                tabIndex = _props5.tabIndex,
                autoFocus = _props5.autoFocus;

            if (!this.isDisabled() && autoFocus && (tabIndex === void 0 || tabIndex > -1)) {
                defer(function () {
                    return _this4.focus();
                });
            }
        }
    }, {
        key: 'prefixCls',
        get: function get() {
            var _props6 = this.props,
                suffixCls = _props6.suffixCls,
                prefixCls = _props6.prefixCls;

            return getProPrefixCls(suffixCls, prefixCls);
        }
    }, {
        key: 'lang',
        get: function get() {
            var lang = this.props.lang;

            if (lang) {
                return lang;
            }
            return localeContext.locale.lang;
        }
    }]);

    return ViewComponent;
}(Component);

export default ViewComponent;

ViewComponent.propTypes = {
    /**
     * 组件id
     */
    id: PropTypes.string,
    /**
     * 组件大小<未实现>
     * 可选值 `default` `small` `big`
     */
    size: PropTypes.oneOf(["small" /* small */, "default" /* default */, "large" /* large */
    ]),
    /**
     * 样式后缀
     */
    suffixCls: PropTypes.string,
    /**
     * 样式前缀
     */
    prefixCls: PropTypes.string,
    /**
     * 悬浮提示，建议用ToolTip组件
     */
    title: PropTypes.string,
    /**
     *  是否禁用
     */
    disabled: PropTypes.bool,
    /**
     * 是否隐藏
     */
    hidden: PropTypes.bool,
    /**
     * 自动获取焦点，多个组件同时设置该参数时，以节点树的顺序最末的组件获取焦点
     */
    autoFocus: PropTypes.bool,
    /**
     * 内链样式
     */
    style: PropTypes.object,
    /**
     * 自定义样式名
     */
    className: PropTypes.string,
    /**
     * 键盘Tab键焦点序号，设为-1时不会获得焦点，设为0时为节点树的顺序。
     */
    tabIndex: PropTypes.number,
    /**
     * 语言
     */
    lang: PropTypes.string,
    /**
     * 获取焦点回调
     */
    onFocus: PropTypes.func,
    /**
     * 失去焦点回调
     */
    onBlur: PropTypes.func,
    /**
     * 单击回调
     */
    onClick: PropTypes.func,
    /**
     * 双击回调
     */
    onDoubleClick: PropTypes.func,
    /**
     * 鼠标抬起回调
     */
    onMouseUp: PropTypes.func,
    /**
     * 鼠标点下回调
     */
    onMouseDown: PropTypes.func,
    /**
     * 鼠标移动回调
     */
    onMouseMove: PropTypes.func,
    /**
     * 鼠标进入回调
     */
    onMouseEnter: PropTypes.func,
    /**
     * 鼠标离开回调
     */
    onMouseLeave: PropTypes.func,
    /**
     * 鼠标进入回调，与onMouseEnter区别在于鼠标进入子节点时会触发onMouseOut
     */
    onMouseOver: PropTypes.func,
    /**
     * 鼠标离开回调，与onMouseLeave区别在于子节点的onMouseout会冒泡触发本回调
     */
    onMouseOut: PropTypes.func,
    /**
     * 鼠标右击后的回调
     */
    onContextMenu: PropTypes.func,
    /**
     * 键盘按下时的回调
     */
    onKeyDown: PropTypes.func,
    /**
     * 键盘抬起时的回调
     */
    onKeyUp: PropTypes.func,
    /**
     * 键盘敲击后的回调
     */
    onKeyPress: PropTypes.func
};
tslib_1.__decorate([observable], ViewComponent.prototype, "isFocused", void 0);
tslib_1.__decorate([observable], ViewComponent.prototype, "observableProps", void 0);
tslib_1.__decorate([action], ViewComponent.prototype, "setObservableProps", null);
tslib_1.__decorate([action], ViewComponent.prototype, "updateObservableProps", null);
tslib_1.__decorate([autobind], ViewComponent.prototype, "handleFocus", null);
tslib_1.__decorate([autobind], ViewComponent.prototype, "handleBlur", null);
tslib_1.__decorate([autobind], ViewComponent.prototype, "elementReference", null);
tslib_1.__decorate([autobind, action], ViewComponent.prototype, "wrapperReference", null);