'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _measureScrollbar = require('../../../lib/_util/measureScrollbar');

var _measureScrollbar2 = _interopRequireDefault(_measureScrollbar);

var _IconItem = require('./IconItem');

var _IconItem2 = _interopRequireDefault(_IconItem);

var _Pagination = require('../pagination/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var IconCategory = function (_Component) {
    (0, _inherits3['default'])(IconCategory, _Component);

    function IconCategory(props) {
        (0, _classCallCheck3['default'])(this, IconCategory);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (IconCategory.__proto__ || Object.getPrototypeOf(IconCategory)).call(this, props));

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

    (0, _createClass3['default'])(IconCategory, [{
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
                return _react2['default'].createElement(_Pagination2['default'], { key: 'page', className: prefixCls + '-pagination', total: total, page: page, pageSize: pageSize, showSizeChanger: false, onChange: this.handlePageChange, style: { right: (0, _UnitConvertor.pxToRem)((0, _measureScrollbar2['default'])()) } });
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
                return _react2['default'].createElement(_IconItem2['default'], { key: icon, prefixCls: prefixCls, type: icon, onSelect: _this2.handleItemSelect, active: value === icon });
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

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-category' },
                this.renderPagination(),
                _react2['default'].createElement(
                    'ul',
                    { key: 'icon-items', ref: this.saveRef },
                    this.renderIcons()
                )
            );
        }
    }]);
    return IconCategory;
}(_react.Component);
IconCategory.displayName = 'IconCategory';
IconCategory.propTypes = {
    prefixCls: _propTypes2['default'].string,
    icons: _propTypes2['default'].arrayOf(_propTypes2['default'].string).isRequired,
    value: _propTypes2['default'].string,
    onSelect: _propTypes2['default'].func.isRequired,
    onPageChange: _propTypes2['default'].func,
    pageSize: _propTypes2['default'].number,
    page: _propTypes2['default'].number,
    paging: _propTypes2['default'].bool
};
IconCategory.defaultProps = {
    paging: true
};
tslib_1.__decorate([_mobx.observable], IconCategory.prototype, "page", void 0);
tslib_1.__decorate([_mobx.action], IconCategory.prototype, "setPage", null);
IconCategory = tslib_1.__decorate([_mobxReact.observer], IconCategory);
exports['default'] = IconCategory;
module.exports = exports['default'];