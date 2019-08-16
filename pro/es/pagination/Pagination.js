import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { action, computed } from 'mobx';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import defaultTo from 'lodash/defaultTo';
import DataSetComponent from '../data-set/DataSetComponent';
import Select from '../select/Select';
import { $l } from '../locale-context';
import Pager from './Pager';
import Icon from '../icon';
function defaultItemRender(page, type) {
    switch (type) {
        case 'first':
            return React.createElement(Icon, { type: 'first_page' });
        case 'last':
            return React.createElement(Icon, { type: 'last_page' });
        case 'prev':
            return React.createElement(Icon, { type: 'navigate_before' });
        case 'next':
            return React.createElement(Icon, { type: 'navigate_next' });
        case 'jump-prev':
        case 'jump-next':
            return '•••';
        default:
            return page;
    }
}
;
var Pagination = function (_DataSetComponent) {
    _inherits(Pagination, _DataSetComponent);

    function Pagination() {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));

        _this.handlePageSizeChange = function (value) {
            _this.handleChange(_this.page, Number(value));
        };
        _this.handlePagerClick = function (page) {
            var dataSet = _this.props.dataSet;

            if (dataSet) {
                dataSet.page(page);
            }
            _this.handleChange(page, _this.pageSize);
        };
        return _this;
    }

    _createClass(Pagination, [{
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return _extends({}, _get(Pagination.prototype.__proto__ || Object.getPrototypeOf(Pagination.prototype), 'getObservableProps', this).call(this, props, context), {
                page: defaultTo(props.page, 1),
                pageSize: defaultTo(props.pageSize, 10),
                total: props.total
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(page, pageSize) {
            var _props = this.props,
                dataSet = _props.dataSet,
                onChange = _props.onChange;

            if (this.pageSize !== pageSize) {
                this.observableProps.pageSize = pageSize;
                this.observableProps.page = 1;
                if (dataSet) {
                    dataSet.pageSize = pageSize;
                    dataSet.currentPage = 1;
                    dataSet.query();
                }
            } else {
                this.observableProps.page = page;
            }
            if (onChange) {
                onChange(page, pageSize);
            }
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(Pagination.prototype.__proto__ || Object.getPrototypeOf(Pagination.prototype), 'getOtherProps', this).call(this), ['total', 'page', 'pageSize', 'onChange', 'pageSizeOptions', 'itemRender', 'showSizeChanger', 'showTotal', 'showPager']);
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            var pageSize = this.pageSize;
            var pageSizeOptions = this.props.pageSizeOptions;

            var options = pageSizeOptions || [];
            if (options.indexOf(String(pageSize)) === -1) {
                options.unshift(String(pageSize));
            }
            var Option = Select.Option;

            return options.map(function (option) {
                return React.createElement(
                    Option,
                    { key: option, value: option },
                    option
                );
            });
        }
    }, {
        key: 'getPager',
        value: function getPager(page, type) {
            var active = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var disabled = arguments[3];
            var prefixCls = this.prefixCls,
                _props$itemRender = this.props.itemRender,
                itemRender = _props$itemRender === undefined ? defaultItemRender : _props$itemRender;

            return React.createElement(Pager, { key: type === 'page' ? page : type, page: page, active: active, type: type, onClick: this.handlePagerClick, renderer: itemRender, disabled: disabled, className: prefixCls + '-pager' });
        }
    }, {
        key: 'renderPagers',
        value: function renderPagers(page) {
            var totalPage = this.totalPage;

            var bufferSize = 2;
            var pagerList = [];
            if (totalPage <= 1 + bufferSize) {
                for (var i = 1; i <= totalPage; i++) {
                    pagerList.push(this.getPager(i, 'page', page === i));
                }
            } else {
                var left = Math.max(1, page - bufferSize);
                var right = Math.min(totalPage, page + bufferSize);
                if (page - 1 <= bufferSize) {
                    right = 1 + bufferSize * 2;
                }
                if (totalPage - page <= bufferSize) {
                    left = totalPage - bufferSize * 2;
                }
                for (var _i = left; _i <= right; _i++) {
                    pagerList.push(this.getPager(_i, 'page', page === _i));
                }
                if (page - 1 >= bufferSize * 2 && page !== 1 + 2) {
                    pagerList.unshift(this.getPager(Math.max(page - 5, 1), 'jump-prev'));
                }
                if (totalPage - page >= bufferSize * 2 && page !== totalPage - 2) {
                    pagerList.push(this.getPager(Math.min(page + 5, totalPage), 'jump-next'));
                }
                if (left !== 1) {
                    pagerList.unshift(this.getPager(1, 'page', page === 1));
                }
                if (totalPage > 1 && right !== totalPage) {
                    pagerList.push(this.getPager(totalPage, 'page', page === totalPage));
                }
            }
            return pagerList;
        }
    }, {
        key: 'renderSizeChange',
        value: function renderSizeChange(pageSize) {
            return [React.createElement(
                'span',
                { key: 'size-info' },
                $l('Pagination', 'records_per_page')
            ), React.createElement(
                Select,
                { key: 'size-select', onChange: this.handlePageSizeChange, value: String(pageSize), clearButton: false },
                this.getOptions()
            )];
        }
    }, {
        key: 'renderTotal',
        value: function renderTotal(pageSize, page, total) {
            var prefixCls = this.prefixCls;

            return React.createElement(
                'span',
                { key: 'total', className: prefixCls + '-page-info' },
                pageSize * (page - 1) + 1,
                ' - ',
                Math.min(pageSize * page, total),
                ' / ',
                total
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var total = this.total,
                pageSize = this.pageSize,
                page = this.page;

            if (total === void 0 || pageSize === void 0 || page === void 0) {
                return null;
            }
            var totalPage = this.totalPage,
                _props2 = this.props,
                children = _props2.children,
                showSizeChanger = _props2.showSizeChanger,
                showTotal = _props2.showTotal,
                showPager = _props2.showPager;

            return React.createElement(
                'nav',
                this.getMergedProps(),
                children,
                showSizeChanger && this.renderSizeChange(pageSize),
                showTotal && this.renderTotal(pageSize, page, total),
                !showPager && this.getPager(1, 'first', false, page === 1),
                this.getPager(page - 1, 'prev', false, page === 1),
                showPager && this.renderPagers(page),
                this.getPager(page + 1, 'next', false, page === totalPage),
                !showPager && this.getPager(totalPage, 'last', false, page === totalPage)
            );
        }
    }, {
        key: 'pageSize',
        get: function get() {
            var _observableProps = this.observableProps,
                dataSet = _observableProps.dataSet,
                pageSize = _observableProps.pageSize;

            if (dataSet) {
                return dataSet.pageSize;
            }
            return pageSize;
        }
    }, {
        key: 'page',
        get: function get() {
            var _observableProps2 = this.observableProps,
                dataSet = _observableProps2.dataSet,
                page = _observableProps2.page;

            if (dataSet) {
                return dataSet.currentPage;
            }
            return page;
        }
    }, {
        key: 'total',
        get: function get() {
            var _observableProps3 = this.observableProps,
                dataSet = _observableProps3.dataSet,
                total = _observableProps3.total;

            if (dataSet) {
                return dataSet.totalCount;
            }
            return total;
        }
    }, {
        key: 'totalPage',
        get: function get() {
            var dataSet = this.observableProps.dataSet;
            var total = this.total,
                pageSize = this.pageSize;

            if (dataSet) {
                return dataSet.totalPage;
            }
            if (total !== void 0 && pageSize !== void 0) {
                return Math.ceil(total / pageSize);
            }
            return 1;
        }
    }]);

    return Pagination;
}(DataSetComponent);
Pagination.displayName = 'Pagination';
Pagination.propTypes = _extends({
    total: PropTypes.number,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func,
    itemRender: PropTypes.func,
    showSizeChanger: PropTypes.bool,
    showTotal: PropTypes.bool,
    showPager: PropTypes.bool
}, DataSetComponent.propTypes);
Pagination.defaultProps = {
    suffixCls: 'pagination',
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    showTotal: true
};
tslib_1.__decorate([computed], Pagination.prototype, "pageSize", null);
tslib_1.__decorate([computed], Pagination.prototype, "page", null);
tslib_1.__decorate([computed], Pagination.prototype, "total", null);
tslib_1.__decorate([computed], Pagination.prototype, "totalPage", null);
tslib_1.__decorate([action], Pagination.prototype, "handleChange", null);
Pagination = tslib_1.__decorate([observer], Pagination);
export default Pagination;