import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import Icon from '../icon';
import { getPrefixCls } from '../configure';
import { matchMediaPolifill } from '../_util/mediaQueryListPolyfill';
if (typeof window !== 'undefined') {
    // const matchMediaPolyfill = (mediaQuery: string): MediaQueryList => {
    //   return {
    //     media: mediaQuery,
    //     matches: false,
    //     addListener() {
    //     },
    //     removeListener() {
    //     },
    //   };
    // };
    window.matchMedia = window.matchMedia || matchMediaPolifill;
}
var dimensionMap = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px'
};
var generateId = function () {
    var i = 0;
    return function () {
        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        i += 1;
        return '' + prefix + i;
    };
}();

var Sider = function (_Component) {
    _inherits(Sider, _Component);

    function Sider(props) {
        _classCallCheck(this, Sider);

        var _this = _possibleConstructorReturn(this, (Sider.__proto__ || Object.getPrototypeOf(Sider)).call(this, props));

        _this.responsiveHandler = function (event) {
            _this.setState({ below: event.matches });
            if (_this.state.collapsed !== event.matches) {
                _this.setCollapsed(event.matches, 'responsive');
            }
        };
        _this.setCollapsed = function (collapsed, type) {
            if (!('collapsed' in _this.props)) {
                _this.setState({
                    collapsed: collapsed
                });
            }
            var onCollapse = _this.props.onCollapse;

            if (onCollapse) {
                onCollapse(collapsed, type);
            }
        };
        _this.toggle = function () {
            var collapsed = !_this.state.collapsed;
            _this.setCollapsed(collapsed, 'clickTrigger');
        };
        _this.belowShowChange = function () {
            _this.setState({ belowShow: !_this.state.belowShow });
        };
        _this.uniqueId = generateId(getPrefixCls('sider-'));
        var matchMedia = void 0;
        if (typeof window !== 'undefined') {
            matchMedia = window.matchMedia;
        }
        if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
            _this.mql = matchMedia('(max-width: ' + dimensionMap[props.breakpoint] + ')');
        }
        var collapsed = void 0;
        if ('collapsed' in props) {
            collapsed = props.collapsed;
        } else {
            collapsed = props.defaultCollapsed;
        }
        _this.state = {
            collapsed: collapsed,
            below: false
        };
        return _this;
    }

    _createClass(Sider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                siderCollapsed: this.state.collapsed,
                collapsedWidth: this.props.collapsedWidth
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('collapsed' in nextProps) {
                this.setState({
                    collapsed: nextProps.collapsed
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.mql) {
                this.mql.addListener(this.responsiveHandler);
                this.responsiveHandler(new MediaQueryListEvent('change', {
                    matches: this.mql.matches,
                    media: this.mql.media
                }));
            }
            if (this.context.siderHook) {
                this.context.siderHook.addSider(this.uniqueId);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.mql) {
                this.mql.removeListener(this.responsiveHandler);
            }
            if (this.context.siderHook) {
                this.context.siderHook.removeSider(this.uniqueId);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                className = _props.className,
                collapsible = _props.collapsible,
                reverseArrow = _props.reverseArrow,
                trigger = _props.trigger,
                style = _props.style,
                width = _props.width,
                collapsedWidth = _props.collapsedWidth,
                others = _objectWithoutProperties(_props, ['prefixCls', 'className', 'collapsible', 'reverseArrow', 'trigger', 'style', 'width', 'collapsedWidth']);

            var prefixCls = getPrefixCls('layout-sider', customizePrefixCls);
            var divProps = omit(others, ['collapsed', 'defaultCollapsed', 'onCollapse', 'breakpoint']);
            var siderWidth = this.state.collapsed ? collapsedWidth : width;
            // special trigger when collapsedWidth == 0
            var zeroWidthTrigger = collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px' ? React.createElement(
                'span',
                { onClick: this.toggle, className: prefixCls + '-zero-width-trigger' },
                React.createElement(Icon, { type: 'bars' })
            ) : null;
            var iconObj = {
                'expanded': reverseArrow ? React.createElement(Icon, { type: 'right' }) : React.createElement(Icon, { type: 'left' }),
                'collapsed': reverseArrow ? React.createElement(Icon, { type: 'left' }) : React.createElement(Icon, { type: 'right' })
            };
            var status = this.state.collapsed ? 'collapsed' : 'expanded';
            var defaultTrigger = iconObj[status];
            var triggerDom = trigger !== null ? zeroWidthTrigger || React.createElement(
                'div',
                { className: prefixCls + '-trigger', onClick: this.toggle, style: { width: siderWidth } },
                trigger || defaultTrigger
            ) : null;
            var divStyle = _extends({}, style, {
                flex: '0 0 ' + siderWidth + 'px',
                maxWidth: siderWidth + 'px',
                minWidth: siderWidth + 'px',
                width: siderWidth + 'px'
            });
            var siderCls = classNames(className, prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-collapsed', !!this.state.collapsed), _defineProperty(_classNames, prefixCls + '-has-trigger', collapsible && trigger !== null && !zeroWidthTrigger), _defineProperty(_classNames, prefixCls + '-below', !!this.state.below), _defineProperty(_classNames, prefixCls + '-zero-width', siderWidth === 0 || siderWidth === '0' || siderWidth === '0px'), _classNames));
            return React.createElement(
                'div',
                _extends({ className: siderCls }, divProps, { style: divStyle }),
                React.createElement(
                    'div',
                    { className: prefixCls + '-children' },
                    this.props.children
                ),
                collapsible || this.state.below && zeroWidthTrigger ? triggerDom : null
            );
        }
    }]);

    return Sider;
}(Component);

export default Sider;

Sider.displayName = 'LayoutSider';
Sider.__ANT_LAYOUT_SIDER = true;
Sider.defaultProps = {
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80,
    style: {}
};
Sider.childContextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
Sider.contextTypes = {
    siderHook: PropTypes.object
};