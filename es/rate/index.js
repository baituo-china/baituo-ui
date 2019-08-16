import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import RcRate from '../rc-components/rate';
import { getPrefixCls } from '../configure';

var Rate = function (_Component) {
    _inherits(Rate, _Component);

    function Rate() {
        _classCallCheck(this, Rate);

        var _this = _possibleConstructorReturn(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).apply(this, arguments));

        _this.saveRate = function (node) {
            _this.rcRate = node;
        };
        return _this;
    }

    _createClass(Rate, [{
        key: 'focus',
        value: function focus() {
            this.rcRate.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcRate.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(RcRate, _extends({ ref: this.saveRate, prefixCls: getPrefixCls('rate') }, this.props));
        }
    }]);

    return Rate;
}(Component);

export default Rate;

Rate.displayName = 'Rate';
Rate.propTypes = {
    prefixCls: PropTypes.string,
    character: PropTypes.node
};
Rate.defaultProps = {
    character: React.createElement(Icon, { type: 'star' })
};