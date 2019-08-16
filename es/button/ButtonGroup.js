import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';
var ButtonGroup = function ButtonGroup(props) {
    var customizePrefixCls = props.prefixCls,
        size = props.size,
        className = props.className,
        others = _objectWithoutProperties(props, ['prefixCls', 'size', 'className']);

    var prefixCls = getPrefixCls('btn-group', customizePrefixCls);
    // large => lg
    // small => sm
    var sizeCls = '';
    switch (size) {
        case "large" /* large */:
            sizeCls = 'lg';
            break;
        case "small" /* small */:
            sizeCls = 'sm';
        default:
            break;
    }
    var classes = classNames(prefixCls, _defineProperty({}, prefixCls + '-' + sizeCls, sizeCls), className);
    return React.createElement('div', _extends({}, others, { className: classes }));
};
ButtonGroup.displayName = 'ButtonGroup';
export default ButtonGroup;