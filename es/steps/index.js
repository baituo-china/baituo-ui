import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcSteps from '../rc-components/steps';
import { getPrefixCls } from '../configure';

var Steps = function (_Component) {
    _inherits(Steps, _Component);

    function Steps() {
        _classCallCheck(this, Steps);

        return _possibleConstructorReturn(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).apply(this, arguments));
    }

    _createClass(Steps, [{
        key: 'render',
        value: function render() {
            return React.createElement(RcSteps, _extends({}, this.props, { prefixCls: getPrefixCls('steps', this.props.prefixCls) }));
        }
    }]);

    return Steps;
}(Component);

export default Steps;

Steps.displayName = 'Steps';
Steps.Step = RcSteps.Step;
Steps.defaultProps = {
    iconPrefix: 'icon',
    current: 0
};
Steps.propTypes = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    current: PropTypes.number
};