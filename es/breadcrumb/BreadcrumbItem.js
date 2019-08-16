import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPrefixCls } from '../configure';

var BreadcrumbItem = function (_Component) {
    _inherits(BreadcrumbItem, _Component);

    function BreadcrumbItem() {
        _classCallCheck(this, BreadcrumbItem);

        return _possibleConstructorReturn(this, (BreadcrumbItem.__proto__ || Object.getPrototypeOf(BreadcrumbItem)).apply(this, arguments));
    }

    _createClass(BreadcrumbItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                separator = _props.separator,
                children = _props.children,
                restProps = _objectWithoutProperties(_props, ['prefixCls', 'separator', 'children']);

            var prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
            var link = void 0;
            if ('href' in this.props) {
                link = React.createElement(
                    'a',
                    _extends({ className: prefixCls + '-link' }, restProps),
                    children
                );
            } else {
                link = React.createElement(
                    'span',
                    _extends({ className: prefixCls + '-link' }, restProps),
                    children
                );
            }
            if (children) {
                return React.createElement(
                    'span',
                    null,
                    link,
                    React.createElement(
                        'span',
                        { className: prefixCls + '-separator' },
                        separator
                    )
                );
            }
            return null;
        }
    }]);

    return BreadcrumbItem;
}(Component);

export default BreadcrumbItem;

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
BreadcrumbItem.defaultProps = {
    separator: '/'
};
BreadcrumbItem.propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    href: PropTypes.string
};