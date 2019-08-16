import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
import { getPrefixCls } from '../configure';
var enquire = void 0;
if (typeof window !== 'undefined') {
    window.matchMedia = window.matchMedia || matchMediaPolifill;
    enquire = require('enquire.js');
}
import React, { Children, cloneElement, Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { matchMediaPolifill } from '../_util/mediaQueryListPolyfill';
var responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
var responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};

var Row = function (_Component) {
    _inherits(Row, _Component);

    function Row() {
        _classCallCheck(this, Row);

        var _this = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));

        _this.state = {
            screens: {}
        };
        return _this;
    }

    _createClass(Row, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            Object.keys(responsiveMap).map(function (screen) {
                return enquire.register(responsiveMap[screen], {
                    match: function match() {
                        if (_typeof(_this2.props.gutter) !== 'object') {
                            return;
                        }
                        _this2.setState(function (prevState) {
                            return {
                                screens: _extends({}, prevState.screens, _defineProperty({}, screen, true))
                            };
                        });
                    },
                    unmatch: function unmatch() {
                        if (_typeof(_this2.props.gutter) !== 'object') {
                            return;
                        }
                        _this2.setState(function (prevState) {
                            return {
                                screens: _extends({}, prevState.screens, _defineProperty({}, screen, false))
                            };
                        });
                    },
                    // Keep a empty destory to avoid triggering unmatch when unregister
                    destroy: function destroy() {}
                });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            Object.keys(responsiveMap).map(function (screen) {
                return enquire.unregister(responsiveMap[screen]);
            });
        }
    }, {
        key: 'getGutter',
        value: function getGutter() {
            var gutter = this.props.gutter;

            if ((typeof gutter === 'undefined' ? 'undefined' : _typeof(gutter)) === 'object') {
                for (var i = 0; i <= responsiveArray.length; i++) {
                    var breakpoint = responsiveArray[i];
                    if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
                        return gutter[breakpoint];
                    }
                }
            }
            return gutter;
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                type = _props.type,
                justify = _props.justify,
                align = _props.align,
                className = _props.className,
                style = _props.style,
                children = _props.children,
                customizePrefixCls = _props.prefixCls,
                others = _objectWithoutProperties(_props, ['type', 'justify', 'align', 'className', 'style', 'children', 'prefixCls']);

            var prefixCls = getPrefixCls('row', customizePrefixCls);
            var gutter = this.getGutter();
            var classes = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, !type), _defineProperty(_classNames, prefixCls + '-' + type, type), _defineProperty(_classNames, prefixCls + '-' + type + '-' + justify, type && justify), _defineProperty(_classNames, prefixCls + '-' + type + '-' + align, type && align), _classNames), className);
            var rowStyle = gutter > 0 ? _extends({
                marginLeft: gutter / -2,
                marginRight: gutter / -2
            }, style) : style;
            var cols = Children.map(children, function (col) {
                if (!col) {
                    return null;
                }
                if (col.props && gutter > 0) {
                    return cloneElement(col, {
                        style: _extends({
                            paddingLeft: gutter / 2,
                            paddingRight: gutter / 2
                        }, col.props.style)
                    });
                }
                return col;
            });
            var otherProps = _extends({}, others);
            delete otherProps.gutter;
            return React.createElement(
                'div',
                _extends({}, otherProps, { className: classes, style: rowStyle }),
                cols
            );
        }
    }]);

    return Row;
}(Component);

export default Row;

Row.displayName = 'Row';
Row.defaultProps = {
    gutter: 0
};
Row.propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    prefixCls: PropTypes.string
};