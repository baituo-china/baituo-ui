'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _defaultTo = require('lodash/defaultTo');

var _defaultTo2 = _interopRequireDefault(_defaultTo);

var _DataSetComponent2 = require('../data-set/DataSetComponent');

var _DataSetComponent3 = _interopRequireDefault(_DataSetComponent2);

var _Select = require('../select/Select');

var _Select2 = _interopRequireDefault(_Select);

var _localeContext = require('../locale-context');

var _Pager = require('./Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function defaultItemRender(page, type) {
    switch (type) {
        case 'first':
            return _react2['default'].createElement(_icon2['default'], { type: 'first_page' });
        case 'last':
            return _react2['default'].createElement(_icon2['default'], { type: 'last_page' });
        case 'prev':
            return _react2['default'].createElement(_icon2['default'], { type: 'navigate_before' });
        case 'next':
            return _react2['default'].createElement(_icon2['default'], { type: 'navigate_next' });
        case 'jump-prev':
        case 'jump-next':
            return '•••';
        default:
            return page;
    }
}
;
var Pagination = function (_DataSetComponent) {
    (0, _inherits3['default'])(Pagination, _DataSetComponent);

    function Pagination() {
        (0, _classCallCheck3['default'])(this, Pagination);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));

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

    (0, _createClass3['default'])(Pagination, [{
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return (0, _extends3['default'])({}, (0, _get3['default'])(Pagination.prototype.__proto__ || Object.getPrototypeOf(Pagination.prototype), 'getObservableProps', this).call(this, props, context), {
                page: (0, _defaultTo2['default'])(props.page, 1),
                pageSize: (0, _defaultTo2['default'])(props.pageSize, 10),
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
            return (0, _omit2['default'])((0, _get3['default'])(Pagination.prototype.__proto__ || Object.getPrototypeOf(Pagination.prototype), 'getOtherProps', this).call(this), ['total', 'page', 'pageSize', 'onChange', 'pageSizeOptions', 'itemRender', 'showSizeChanger', 'showTotal', 'showPager']);
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
            var Option = _Select2['default'].Option;

            return options.map(function (option) {
                return _react2['default'].createElement(
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

            return _react2['default'].createElement(_Pager2['default'], { key: type === 'page' ? page : type, page: page, active: active, type: type, onClick: this.handlePagerClick, renderer: itemRender, disabled: disabled, className: prefixCls + '-pager' });
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
            return [_react2['default'].createElement(
                'span',
                { key: 'size-info' },
                (0, _localeContext.$l)('Pagination', 'records_per_page')
            ), _react2['default'].createElement(
                _Select2['default'],
                { key: 'size-select', onChange: this.handlePageSizeChange, value: String(pageSize), clearButton: false },
                this.getOptions()
            )];
        }
    }, {
        key: 'renderTotal',
        value: function renderTotal(pageSize, page, total) {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(
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

            return _react2['default'].createElement(
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
}(_DataSetComponent3['default']);
Pagination.displayName = 'Pagination';
Pagination.propTypes = (0, _extends3['default'])({
    total: _propTypes2['default'].number,
    page: _propTypes2['default'].number,
    pageSize: _propTypes2['default'].number,
    onChange: _propTypes2['default'].func,
    itemRender: _propTypes2['default'].func,
    showSizeChanger: _propTypes2['default'].bool,
    showTotal: _propTypes2['default'].bool,
    showPager: _propTypes2['default'].bool
}, _DataSetComponent3['default'].propTypes);
Pagination.defaultProps = {
    suffixCls: 'pagination',
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    showTotal: true
};
tslib_1.__decorate([_mobx.computed], Pagination.prototype, "pageSize", null);
tslib_1.__decorate([_mobx.computed], Pagination.prototype, "page", null);
tslib_1.__decorate([_mobx.computed], Pagination.prototype, "total", null);
tslib_1.__decorate([_mobx.computed], Pagination.prototype, "totalPage", null);
tslib_1.__decorate([_mobx.action], Pagination.prototype, "handleChange", null);
Pagination = tslib_1.__decorate([_mobxReact.observer], Pagination);
exports['default'] = Pagination;
module.exports = exports['default'];