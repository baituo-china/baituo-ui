'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _spin = require('../spin');

var _spin2 = _interopRequireDefault(_spin);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _default = require('../locale-provider/default');

var _default2 = _interopRequireDefault(_default);

var _pagination = require('../pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _grid = require('../grid');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var List = function (_Component) {
    (0, _inherits3['default'])(List, _Component);

    function List() {
        (0, _classCallCheck3['default'])(this, List);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));

        _this.keys = {};
        _this.renderItem = function (item, index) {
            var _this$props = _this.props,
                dataSource = _this$props.dataSource,
                renderItem = _this$props.renderItem,
                rowKey = _this$props.rowKey;

            var key = void 0;
            if (typeof rowKey === 'function') {
                key = rowKey(dataSource[index]);
            } else if (typeof rowKey === 'string') {
                key = dataSource[rowKey];
            } else {
                key = dataSource.key;
            }
            if (!key) {
                key = 'list-item-' + index;
            }
            _this.keys[index] = key;
            return renderItem(item, index);
        };
        _this.renderEmpty = function (contextLocale) {
            var locale = (0, _extends3['default'])({}, contextLocale, _this.props.locale);
            return _react2['default'].createElement(
                'div',
                { className: _this.getPrefixCls() + '-empty-text' },
                locale.emptyText
            );
        };
        return _this;
    }

    (0, _createClass3['default'])(List, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                grid: this.props.grid
            };
        }
    }, {
        key: 'isSomethingAfterLastTtem',
        value: function isSomethingAfterLastTtem() {
            var _props = this.props,
                loadMore = _props.loadMore,
                pagination = _props.pagination,
                footer = _props.footer;

            return !!(loadMore || pagination || footer);
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('list', this.props.prefixCls);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var _props2 = this.props,
                bordered = _props2.bordered,
                split = _props2.split,
                className = _props2.className,
                children = _props2.children,
                itemLayout = _props2.itemLayout,
                loadMore = _props2.loadMore,
                pagination = _props2.pagination,
                grid = _props2.grid,
                dataSource = _props2.dataSource,
                size = _props2.size,
                header = _props2.header,
                footer = _props2.footer,
                empty = _props2.empty,
                loading = _props2.loading,
                rest = (0, _objectWithoutProperties3['default'])(_props2, ['bordered', 'split', 'className', 'children', 'itemLayout', 'loadMore', 'pagination', 'grid', 'dataSource', 'size', 'header', 'footer', 'empty', 'loading']);

            var prefixCls = this.getPrefixCls();
            var loadingProp = loading;
            if (typeof loadingProp === 'boolean') {
                loadingProp = {
                    spinning: loadingProp
                };
            }
            var isLoading = loadingProp && loadingProp.spinning;
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
            var classString = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-vertical', itemLayout === 'vertical'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + sizeCls, sizeCls), (0, _defineProperty3['default'])(_classNames, prefixCls + '-split', split), (0, _defineProperty3['default'])(_classNames, prefixCls + '-bordered', bordered), (0, _defineProperty3['default'])(_classNames, prefixCls + '-loading', isLoading), (0, _defineProperty3['default'])(_classNames, prefixCls + '-grid', grid), (0, _defineProperty3['default'])(_classNames, prefixCls + '-something-after-last-item', this.isSomethingAfterLastTtem()), _classNames));
            var paginationContent = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-pagination' },
                _react2['default'].createElement(_pagination2['default'], pagination)
            );
            var childrenContent = void 0;
            childrenContent = isLoading && _react2['default'].createElement('div', { style: { minHeight: 53 } });
            if (dataSource.length > 0) {
                var items = dataSource.map(function (item, index) {
                    return _this2.renderItem(item, index);
                });
                var childrenList = _react.Children.map(items, function (child, index) {
                    return (0, _react.cloneElement)(child, {
                        key: _this2.keys[index]
                    });
                });
                childrenContent = grid ? _react2['default'].createElement(
                    _grid.Row,
                    { gutter: grid.gutter },
                    childrenList
                ) : childrenList;
            } else if (!children && !isLoading && !empty) {
                childrenContent = _react2['default'].createElement(
                    _LocaleReceiver2['default'],
                    { componentName: 'Table', defaultLocale: _default2['default'].Table },
                    this.renderEmpty
                );
            } else {
                childrenContent = empty;
            }
            var content = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    _spin2['default'],
                    loadingProp,
                    childrenContent
                ),
                loadMore,
                !loadMore && pagination ? paginationContent : null
            );
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({ className: classString }, (0, _omit2['default'])(rest, ['prefixCls', 'rowKey', 'renderItem'])),
                header && _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    header
                ),
                content,
                children,
                footer && _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    footer
                )
            );
        }
    }]);
    return List;
}(_react.Component);

exports['default'] = List;

List.displayName = 'List';
List.Item = _Item2['default'];
List.childContextTypes = {
    grid: _propTypes2['default'].any
};
List.defaultProps = {
    dataSource: [],
    bordered: false,
    split: true,
    loading: false,
    pagination: false
};
module.exports = exports['default'];