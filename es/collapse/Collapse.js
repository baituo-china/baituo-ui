import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import CollapsePanel from './CollapsePanel';
import RcCollapse from '../rc-components/collapse';
import { getPrefixCls } from '../configure';

var Collapse = function (_Component) {
    _inherits(Collapse, _Component);

    function Collapse() {
        _classCallCheck(this, Collapse);

        return _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).apply(this, arguments));
    }

    _createClass(Collapse, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                bordered = _props.bordered;

            var prefixCls = getPrefixCls('collapse', customizePrefixCls);
            var collapseClassName = classNames(_defineProperty({}, prefixCls + '-borderless', !bordered), className);
            return React.createElement(RcCollapse, _extends({}, this.props, { prefixCls: prefixCls, className: collapseClassName }));
        }
    }]);

    return Collapse;
}(Component);

export default Collapse;

Collapse.displayName = 'Collapse';
Collapse.Panel = CollapsePanel;
Collapse.defaultProps = {
    bordered: true,
    openAnimation: _extends({}, animation, {
        appear: function appear() {}
    })
};