import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';
var Grid = function Grid(props) {
    var customizePrefixCls = props.prefixCls,
        className = props.className,
        others = _objectWithoutProperties(props, ['prefixCls', 'className']);

    var prefixCls = getPrefixCls('card', customizePrefixCls);
    var classString = classNames(prefixCls + '-grid', className);
    return React.createElement('div', _extends({}, others, { className: classString }));
};
Grid.displayName = 'CardGrid';
export default Grid;