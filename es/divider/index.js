import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';
export default function Divider(_ref) {
    var _classNames;

    var customizePrefixCls = _ref.prefixCls,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? 'horizontal' : _ref$type,
        _ref$orientation = _ref.orientation,
        orientation = _ref$orientation === undefined ? '' : _ref$orientation,
        className = _ref.className,
        children = _ref.children,
        dashed = _ref.dashed,
        restProps = _objectWithoutProperties(_ref, ['prefixCls', 'type', 'orientation', 'className', 'children', 'dashed']);

    var prefixCls = getPrefixCls('divider', customizePrefixCls);
    var orientationPrefix = orientation.length > 0 ? '-' + orientation : orientation;
    var classString = classNames(className, prefixCls, prefixCls + '-' + type, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-with-text' + orientationPrefix, children), _defineProperty(_classNames, prefixCls + '-dashed', !!dashed), _classNames));
    return React.createElement(
        'div',
        _extends({ className: classString }, restProps),
        children && React.createElement(
            'span',
            { className: prefixCls + '-inner-text' },
            children
        )
    );
}