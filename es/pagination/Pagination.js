import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import Select from '../select';
import MiniSelect from './MiniSelect';
import LargeSelect from './LargeSelect';
import RcPagination from '../rc-components/pagination';
import enUS from '../rc-components/pagination/locale/en_US';
import Button from '../button/Button';
import { getPrefixCls } from '../configure';
function getSelect(size) {
    switch (size) {
        case "small" /* small */:
            return MiniSelect;
        case "large" /* large */:
            return LargeSelect;
        default:
            return Select;
    }
}
function getIcon(type) {
    switch (type) {
        case 'first':
            return 'first_page';
        case 'last':
            return 'last_page';
        case 'prev':
            return 'navigate_before';
        case 'next':
            return 'navigate_next';
        default:
            return;
    }
}
function itemRender(page, type, item, disabled, size) {
    if (page !== undefined) {
        if (type === 'page' || type === 'jump-prev' || type === 'jump-next') {
            return React.createElement(
                Button,
                { size: size, shape: 'circle' },
                item
            );
        } else {
            return React.createElement(Button, { size: size, shape: 'circle', icon: getIcon(type), disabled: disabled });
        }
    }
}

var Pagination = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination() {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));

        _this.renderPagination = function (locale) {
            var _this$props = _this.props,
                className = _this$props.className,
                size = _this$props.size,
                customizePrefixCls = _this$props.prefixCls,
                customizeSelectPrefixCls = _this$props.selectPrefixCls,
                restProps = _objectWithoutProperties(_this$props, ['className', 'size', 'prefixCls', 'selectPrefixCls']);

            var prefixCls = getPrefixCls('pagination', customizePrefixCls);
            var selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);
            return React.createElement(RcPagination, _extends({}, restProps, { selectPrefixCls: selectPrefixCls, prefixCls: prefixCls, size: size, className: classNames(className, _defineProperty({}, prefixCls + '-' + size, size)), selectComponentClass: getSelect(size), locale: locale }));
        };
        return _this;
    }

    _createClass(Pagination, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                LocaleReceiver,
                { componentName: 'Pagination', defaultLocale: enUS },
                this.renderPagination
            );
        }
    }]);

    return Pagination;
}(Component);

export default Pagination;

Pagination.displayName = 'Pagination';
Pagination.defaultProps = {
    showSizeChanger: true,
    showSizeChangerLabel: true,
    tiny: true,
    pageSizeOptions: ['10', '30', '50', '100', '200'],
    showTotal: function showTotal(total, range) {
        return range[0] + ' - ' + range[1] + ' / ' + total;
    },
    sizeChangerOptionText: function sizeChangerOptionText(value) {
        return value;
    },
    itemRender: itemRender
};