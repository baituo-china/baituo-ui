'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _omitBy = require('lodash/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

var _defer = require('lodash/defer');

var _defer2 = _interopRequireDefault(_defer);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _configure = require('../../../lib/configure');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _normalizeLanguage = require('../_util/normalizeLanguage');

var _normalizeLanguage2 = _interopRequireDefault(_normalizeLanguage);

var _localeContext = require('../locale-context');

var _localeContext2 = _interopRequireDefault(_localeContext);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ViewComponent = function (_Component) {
    (0, _inherits3['default'])(ViewComponent, _Component);

    function ViewComponent(props, context) {
        (0, _classCallCheck3['default'])(this, ViewComponent);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ViewComponent.__proto__ || Object.getPrototypeOf(ViewComponent)).call(this, props, context));

        _this.setObservableProps(props, context);
        return _this;
    }

    (0, _createClass3['default'])(ViewComponent, [{
        key: 'getMergedClassNames',
        value: function getMergedClassNames() {
            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            return _classnames2['default'].apply(undefined, [this.getClassName(), this.getWrapperClassNames()].concat(props));
        }
    }, {
        key: 'getMergedProps',
        value: function getMergedProps() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return (0, _extends3['default'])({}, (0, _merge2['default'])(this.getWrapperProps(props), this.getOtherProps()), {
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
            (0, _extends3['default'])(this.observableProps, (0, _omitBy2['default'])(this.getObservableProps(props, context), _isUndefined2['default']));
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var _props2 = this.props,
                tabIndex = _props2.tabIndex,
                lang = _props2.lang,
                _props2$style = _props2.style,
                style = _props2$style === undefined ? {} : _props2$style;

            var otherProps = (0, _omit2['default'])(this.props, ['prefixCls', 'suffixCls', 'className', 'elementClassName', 'style', 'size', 'autoFocus', 'onFocus', 'onBlur', 'children', 'dataSet']);
            if (this.isDisabled()) {
                otherProps = (0, _omit2['default'])(otherProps, ['onClick', 'onMouseUp', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onMouseOut', 'onKeyDown', 'onKeyUp', 'onKeyPress', 'onContextMenu']);
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
            otherProps.lang = (0, _normalizeLanguage2['default'])(lang);
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

            return _classnames2['default'].apply(undefined, [prefixCls, elementClassName].concat(props));
        }
    }, {
        key: 'getWrapperProps',
        value: function getWrapperProps() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var _props3 = this.props,
                style = _props3.style,
                hidden = _props3.hidden;

            var wrapperProps = (0, _extends3['default'])({
                ref: this.wrapperReference,
                className: this.getWrapperClassNames(),
                hidden: hidden
            }, props);
            if (style) {
                wrapperProps.style = (0, _omit2['default'])(style, 'height');
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

            return _classnames2['default'].apply(undefined, [prefixCls + '-wrapper', className, (_ref = {}, (0, _defineProperty3['default'])(_ref, prefixCls + '-sm', size === 'small'), (0, _defineProperty3['default'])(_ref, prefixCls + '-lg', size === 'large'), (0, _defineProperty3['default'])(_ref, prefixCls + '-disabled', this.isDisabled()), (0, _defineProperty3['default'])(_ref, prefixCls + '-focused', this.isFocus), _ref)].concat(args));
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

            (0, _mobx.runInAction)(function () {
                _this2.isFocused = true;
                _this2.isFocus = true;
                var _props$onFocus = _this2.props.onFocus,
                    onFocus = _props$onFocus === undefined ? _noop2['default'] : _props$onFocus,
                    prefixCls = _this2.prefixCls;

                onFocus(e);
                var element = _this2.wrapper || (0, _reactDom.findDOMNode)(_this2);
                if (element) {
                    (0, _componentClasses2['default'])(element).add(prefixCls + '-focused');
                }
            });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var _this3 = this;

            if (!e.isDefaultPrevented()) {
                (0, _mobx.runInAction)(function () {
                    _this3.isFocused = false;
                    _this3.isFocus = false;
                    var _props$onBlur = _this3.props.onBlur,
                        onBlur = _props$onBlur === undefined ? _noop2['default'] : _props$onBlur,
                        prefixCls = _this3.prefixCls;

                    onBlur(e);
                    var element = _this3.wrapper || (0, _reactDom.findDOMNode)(_this3);
                    if (element) {
                        (0, _componentClasses2['default'])(element).remove(prefixCls + '-focused');
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
                (0, _defer2['default'])(function () {
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

            return (0, _configure.getProPrefixCls)(suffixCls, prefixCls);
        }
    }, {
        key: 'lang',
        get: function get() {
            var lang = this.props.lang;

            if (lang) {
                return lang;
            }
            return _localeContext2['default'].locale.lang;
        }
    }]);
    return ViewComponent;
}(_react.Component);

exports['default'] = ViewComponent;

ViewComponent.propTypes = {
    /**
     * 组件id
     */
    id: _propTypes2['default'].string,
    /**
     * 组件大小<未实现>
     * 可选值 `default` `small` `big`
     */
    size: _propTypes2['default'].oneOf(["small" /* small */, "default" /* default */, "large" /* large */
    ]),
    /**
     * 样式后缀
     */
    suffixCls: _propTypes2['default'].string,
    /**
     * 样式前缀
     */
    prefixCls: _propTypes2['default'].string,
    /**
     * 悬浮提示，建议用ToolTip组件
     */
    title: _propTypes2['default'].string,
    /**
     *  是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否隐藏
     */
    hidden: _propTypes2['default'].bool,
    /**
     * 自动获取焦点，多个组件同时设置该参数时，以节点树的顺序最末的组件获取焦点
     */
    autoFocus: _propTypes2['default'].bool,
    /**
     * 内链样式
     */
    style: _propTypes2['default'].object,
    /**
     * 自定义样式名
     */
    className: _propTypes2['default'].string,
    /**
     * 键盘Tab键焦点序号，设为-1时不会获得焦点，设为0时为节点树的顺序。
     */
    tabIndex: _propTypes2['default'].number,
    /**
     * 语言
     */
    lang: _propTypes2['default'].string,
    /**
     * 获取焦点回调
     */
    onFocus: _propTypes2['default'].func,
    /**
     * 失去焦点回调
     */
    onBlur: _propTypes2['default'].func,
    /**
     * 单击回调
     */
    onClick: _propTypes2['default'].func,
    /**
     * 双击回调
     */
    onDoubleClick: _propTypes2['default'].func,
    /**
     * 鼠标抬起回调
     */
    onMouseUp: _propTypes2['default'].func,
    /**
     * 鼠标点下回调
     */
    onMouseDown: _propTypes2['default'].func,
    /**
     * 鼠标移动回调
     */
    onMouseMove: _propTypes2['default'].func,
    /**
     * 鼠标进入回调
     */
    onMouseEnter: _propTypes2['default'].func,
    /**
     * 鼠标离开回调
     */
    onMouseLeave: _propTypes2['default'].func,
    /**
     * 鼠标进入回调，与onMouseEnter区别在于鼠标进入子节点时会触发onMouseOut
     */
    onMouseOver: _propTypes2['default'].func,
    /**
     * 鼠标离开回调，与onMouseLeave区别在于子节点的onMouseout会冒泡触发本回调
     */
    onMouseOut: _propTypes2['default'].func,
    /**
     * 鼠标右击后的回调
     */
    onContextMenu: _propTypes2['default'].func,
    /**
     * 键盘按下时的回调
     */
    onKeyDown: _propTypes2['default'].func,
    /**
     * 键盘抬起时的回调
     */
    onKeyUp: _propTypes2['default'].func,
    /**
     * 键盘敲击后的回调
     */
    onKeyPress: _propTypes2['default'].func
};
tslib_1.__decorate([_mobx.observable], ViewComponent.prototype, "isFocused", void 0);
tslib_1.__decorate([_mobx.observable], ViewComponent.prototype, "observableProps", void 0);
tslib_1.__decorate([_mobx.action], ViewComponent.prototype, "setObservableProps", null);
tslib_1.__decorate([_mobx.action], ViewComponent.prototype, "updateObservableProps", null);
tslib_1.__decorate([_autobind2['default']], ViewComponent.prototype, "handleFocus", null);
tslib_1.__decorate([_autobind2['default']], ViewComponent.prototype, "handleBlur", null);
tslib_1.__decorate([_autobind2['default']], ViewComponent.prototype, "elementReference", null);
tslib_1.__decorate([_autobind2['default'], _mobx.action], ViewComponent.prototype, "wrapperReference", null);
module.exports = exports['default'];