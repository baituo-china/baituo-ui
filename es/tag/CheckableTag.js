import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';

var CheckableTag = function (_Component) {
    _inherits(CheckableTag, _Component);

    function CheckableTag() {
        _classCallCheck(this, CheckableTag);

        var _this = _possibleConstructorReturn(this, (CheckableTag.__proto__ || Object.getPrototypeOf(CheckableTag)).apply(this, arguments));

        _this.handleClick = function () {
            var _this$props = _this.props,
                checked = _this$props.checked,
                onChange = _this$props.onChange;

            if (onChange) {
                onChange(!checked);
            }
        };
        return _this;
    }

    _createClass(CheckableTag, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                className = _props.className,
                checked = _props.checked,
                restProps = _objectWithoutProperties(_props, ['prefixCls', 'className', 'checked']);

            var prefixCls = getPrefixCls('tag', customizePrefixCls);
            var cls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-checkable', true), _defineProperty(_classNames, prefixCls + '-checkable-checked', checked), _classNames), className);
            delete restProps.onChange; // TypeScript cannot check delete now.
            return React.createElement('div', _extends({}, restProps, { className: cls, onClick: this.handleClick }));
        }
    }]);

    return CheckableTag;
}(Component);

export default CheckableTag;

CheckableTag.displayName = 'CheckableTag';