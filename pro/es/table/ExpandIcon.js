import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowequal from 'lodash/isEqual';
import Icon from '../icon';

var ExpandIcon = function (_Component) {
    _inherits(ExpandIcon, _Component);

    function ExpandIcon() {
        _classCallCheck(this, ExpandIcon);

        var _this = _possibleConstructorReturn(this, (ExpandIcon.__proto__ || Object.getPrototypeOf(ExpandIcon)).apply(this, arguments));

        _this.handleClick = function (e) {
            e.stopPropagation();
            _this.props.onChange(e);
        };
        return _this;
    }

    _createClass(ExpandIcon, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return !shallowequal(nextProps, this.props);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                expanded = _props.expanded,
                expandable = _props.expandable;

            var iconPrefixCls = prefixCls + '-expand-icon';
            var classString = classNames(iconPrefixCls, (_classNames = {}, _defineProperty(_classNames, iconPrefixCls + '-expanded', expanded), _defineProperty(_classNames, iconPrefixCls + '-spaced', !expandable), _classNames));
            return React.createElement(Icon, { type: 'baseline-arrow_right', className: classString, onClick: expandable ? this.handleClick : void 0, tabIndex: expandable ? 0 : -1 });
        }
    }]);

    return ExpandIcon;
}(Component);

export default ExpandIcon;

ExpandIcon.propTypes = {
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};