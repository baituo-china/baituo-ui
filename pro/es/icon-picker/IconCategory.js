import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import measureScrollbar from '../../../es/_util/measureScrollbar';
import IconItem from './IconItem';
import Pagination from '../pagination/Pagination';
var IconCategory = function (_Component) {
    _inherits(IconCategory, _Component);

    function IconCategory(props) {
        _classCallCheck(this, IconCategory);

        var _this = _possibleConstructorReturn(this, (IconCategory.__proto__ || Object.getPrototypeOf(IconCategory)).call(this, props));

        _this.saveRef = function (node) {
            return _this.ul = node;
        };
        _this.handlePageChange = function (page) {
            _this.setPage(page);
            var _this$props = _this.props,
                onPageChange = _this$props.onPageChange,
                category = _this$props.category;

            if (onPageChange) {
                onPageChange(page, category);
            }
        };
        _this.handleItemSelect = function (icon) {
            var onSelect = _this.props.onSelect;

            onSelect(icon);
        };
        _this.setPage(props.page);
        return _this;
    }

    _createClass(IconCategory, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.page && nextProps.page !== this.page) {
                this.setPage(nextProps.page);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.syncItemPosition();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.syncItemPosition();
        }
    }, {
        key: 'syncItemPosition',
        value: function syncItemPosition() {
            var _props = this.props,
                value = _props.value,
                prefixCls = _props.prefixCls,
                ul = this.ul;

            if (value && ul) {
                var item = ul.querySelector('li.' + prefixCls + '-item-selected');
                if (item) {
                    var offsetHeight = ul.offsetHeight,
                        scrollTop = ul.scrollTop;
                    var offsetTop = item.offsetTop,
                        height = item.offsetHeight;

                    if (offsetTop < scrollTop) {
                        ul.scrollTo(0, offsetTop);
                    } else if (offsetTop + height > scrollTop + offsetHeight) {
                        ul.scrollTo(0, offsetTop + height - offsetHeight);
                    }
                }
            }
        }
    }, {
        key: 'setPage',
        value: function setPage() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            this.page = page;
        }
    }, {
        key: 'renderPagination',
        value: function renderPagination() {
            var page = this.page,
                _props2 = this.props,
                paging = _props2.paging,
                pageSize = _props2.pageSize,
                prefixCls = _props2.prefixCls,
                icons = _props2.icons;

            var total = icons.length;
            if (paging && total > pageSize) {
                return React.createElement(Pagination, { key: 'page', className: prefixCls + '-pagination', total: total, page: page, pageSize: pageSize, showSizeChanger: false, onChange: this.handlePageChange, style: { right: pxToRem(measureScrollbar()) } });
            }
        }
    }, {
        key: 'renderIcons',
        value: function renderIcons() {
            var _this2 = this;

            var _props3 = this.props,
                value = _props3.value,
                prefixCls = _props3.prefixCls;

            return this.getIcons().map(function (icon) {
                return React.createElement(IconItem, { key: icon, prefixCls: prefixCls, type: icon, onSelect: _this2.handleItemSelect, active: value === icon });
            });
        }
    }, {
        key: 'getIcons',
        value: function getIcons() {
            var page = this.page,
                _props4 = this.props,
                paging = _props4.paging,
                pageSize = _props4.pageSize,
                icons = _props4.icons;

            if (paging && icons.length > pageSize) {
                return icons.slice((page - 1) * pageSize, page * pageSize);
            } else {
                return icons;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.props.prefixCls;

            return React.createElement(
                'div',
                { className: prefixCls + '-category' },
                this.renderPagination(),
                React.createElement(
                    'ul',
                    { key: 'icon-items', ref: this.saveRef },
                    this.renderIcons()
                )
            );
        }
    }]);

    return IconCategory;
}(Component);
IconCategory.displayName = 'IconCategory';
IconCategory.propTypes = {
    prefixCls: PropTypes.string,
    icons: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onPageChange: PropTypes.func,
    pageSize: PropTypes.number,
    page: PropTypes.number,
    paging: PropTypes.bool
};
IconCategory.defaultProps = {
    paging: true
};
tslib_1.__decorate([observable], IconCategory.prototype, "page", void 0);
tslib_1.__decorate([action], IconCategory.prototype, "setPage", null);
IconCategory = tslib_1.__decorate([observer], IconCategory);
export default IconCategory;