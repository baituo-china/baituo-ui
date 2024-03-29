import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';
var Group = function Group(props) {
    var _classNames;

    var customizePrefixCls = props.prefixCls,
        _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className;

    var prefixCls = getPrefixCls('input-group', customizePrefixCls);
    var cls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', props.size === "large"), _defineProperty(_classNames, prefixCls + '-sm', props.size === "small"), _defineProperty(_classNames, prefixCls + '-compact', props.compact), _classNames), className);
    return React.createElement(
        'span',
        { className: cls, style: props.style },
        props.children
    );
};
export default Group;