'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _MiniSelect = require('./MiniSelect');

var _MiniSelect2 = _interopRequireDefault(_MiniSelect);

var _LargeSelect = require('./LargeSelect');

var _LargeSelect2 = _interopRequireDefault(_LargeSelect);

var _pagination = require('../rc-components/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _en_US = require('../rc-components/pagination/locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getSelect(size) {
    switch (size) {
        case "small" /* small */:
            return _MiniSelect2['default'];
        case "large" /* large */:
            return _LargeSelect2['default'];
        default:
            return _select2['default'];
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
            return _react2['default'].createElement(
                _Button2['default'],
                { size: size, shape: 'circle' },
                item
            );
        } else {
            return _react2['default'].createElement(_Button2['default'], { size: size, shape: 'circle', icon: getIcon(type), disabled: disabled });
        }
    }
}

var Pagination = function (_Component) {
    (0, _inherits3['default'])(Pagination, _Component);

    function Pagination() {
        (0, _classCallCheck3['default'])(this, Pagination);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));

        _this.renderPagination = function (locale) {
            var _this$props = _this.props,
                className = _this$props.className,
                size = _this$props.size,
                customizePrefixCls = _this$props.prefixCls,
                customizeSelectPrefixCls = _this$props.selectPrefixCls,
                restProps = (0, _objectWithoutProperties3['default'])(_this$props, ['className', 'size', 'prefixCls', 'selectPrefixCls']);

            var prefixCls = (0, _configure.getPrefixCls)('pagination', customizePrefixCls);
            var selectPrefixCls = (0, _configure.getPrefixCls)('select', customizeSelectPrefixCls);
            return _react2['default'].createElement(_pagination2['default'], (0, _extends3['default'])({}, restProps, { selectPrefixCls: selectPrefixCls, prefixCls: prefixCls, size: size, className: (0, _classnames2['default'])(className, (0, _defineProperty3['default'])({}, prefixCls + '-' + size, size)), selectComponentClass: getSelect(size), locale: locale }));
        };
        return _this;
    }

    (0, _createClass3['default'])(Pagination, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _LocaleReceiver2['default'],
                { componentName: 'Pagination', defaultLocale: _en_US2['default'] },
                this.renderPagination
            );
        }
    }]);
    return Pagination;
}(_react.Component);

exports['default'] = Pagination;

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
module.exports = exports['default'];