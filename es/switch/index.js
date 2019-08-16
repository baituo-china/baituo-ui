import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import RcSwitch from '../rc-components/switch';
import { getPrefixCls } from '../configure';

var Switch = function (_Component) {
    _inherits(Switch, _Component);

    function Switch() {
        _classCallCheck(this, Switch);

        var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));

        _this.saveSwitch = function (node) {
            _this.rcSwitch = node;
        };
        return _this;
    }

    _createClass(Switch, [{
        key: 'focus',
        value: function focus() {
            this.rcSwitch.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcSwitch.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                size = _props.size,
                loading = _props.loading,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className;

            var prefixCls = getPrefixCls('switch', customizePrefixCls);
            var classes = classNames(className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-small', size === "small"), _defineProperty(_classNames, prefixCls + '-loading', loading), _classNames));
            return React.createElement(RcSwitch, _extends({}, omit(this.props, ['loading']), { prefixCls: prefixCls, className: classes, ref: this.saveSwitch }));
        }
    }]);

    return Switch;
}(Component);

export default Switch;

Switch.displayName = 'Switch';
Switch.propTypes = {
    prefixCls: PropTypes.string,
    // size=default and size=large are the same
    size: PropTypes.oneOf(["small" /* small */, "default" /* default */, "large" /* large */]),
    className: PropTypes.string
};