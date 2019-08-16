import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';
var Meta = function Meta(props) {
    var customizePrefixCls = props.prefixCls,
        className = props.className,
        avatar = props.avatar,
        title = props.title,
        description = props.description,
        others = _objectWithoutProperties(props, ['prefixCls', 'className', 'avatar', 'title', 'description']);

    var prefixCls = getPrefixCls('card', customizePrefixCls);
    var classString = classNames(prefixCls + '-meta', className);
    var avatarDom = avatar ? React.createElement(
        'div',
        { className: prefixCls + '-meta-avatar' },
        avatar
    ) : null;
    var titleDom = title ? React.createElement(
        'div',
        { className: prefixCls + '-meta-title' },
        title
    ) : null;
    var descriptionDom = description ? React.createElement(
        'div',
        { className: prefixCls + '-meta-description' },
        description
    ) : null;
    var MetaDetail = titleDom || descriptionDom ? React.createElement(
        'div',
        { className: prefixCls + '-meta-detail' },
        titleDom,
        descriptionDom
    ) : null;
    return React.createElement(
        'div',
        _extends({}, others, { className: classString }),
        avatarDom,
        MetaDetail
    );
};
Meta.displayName = 'CardMeta';
export default Meta;