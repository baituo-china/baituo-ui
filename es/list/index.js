import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import Spin from '../spin';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import Pagination from '../pagination';
import { Row } from '../grid';
import Item from './Item';
import { getPrefixCls as _getPrefixCls } from '../configure';

var List = function (_Component) {
    _inherits(List, _Component);

    function List() {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));

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
            var locale = _extends({}, contextLocale, _this.props.locale);
            return React.createElement(
                'div',
                { className: _this.getPrefixCls() + '-empty-text' },
                locale.emptyText
            );
        };
        return _this;
    }

    _createClass(List, [{
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
            return _getPrefixCls('list', this.props.prefixCls);
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
                rest = _objectWithoutProperties(_props2, ['bordered', 'split', 'className', 'children', 'itemLayout', 'loadMore', 'pagination', 'grid', 'dataSource', 'size', 'header', 'footer', 'empty', 'loading']);

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
            var classString = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-vertical', itemLayout === 'vertical'), _defineProperty(_classNames, prefixCls + '-' + sizeCls, sizeCls), _defineProperty(_classNames, prefixCls + '-split', split), _defineProperty(_classNames, prefixCls + '-bordered', bordered), _defineProperty(_classNames, prefixCls + '-loading', isLoading), _defineProperty(_classNames, prefixCls + '-grid', grid), _defineProperty(_classNames, prefixCls + '-something-after-last-item', this.isSomethingAfterLastTtem()), _classNames));
            var paginationContent = React.createElement(
                'div',
                { className: prefixCls + '-pagination' },
                React.createElement(Pagination, pagination)
            );
            var childrenContent = void 0;
            childrenContent = isLoading && React.createElement('div', { style: { minHeight: 53 } });
            if (dataSource.length > 0) {
                var items = dataSource.map(function (item, index) {
                    return _this2.renderItem(item, index);
                });
                var childrenList = Children.map(items, function (child, index) {
                    return cloneElement(child, {
                        key: _this2.keys[index]
                    });
                });
                childrenContent = grid ? React.createElement(
                    Row,
                    { gutter: grid.gutter },
                    childrenList
                ) : childrenList;
            } else if (!children && !isLoading && !empty) {
                childrenContent = React.createElement(
                    LocaleReceiver,
                    { componentName: 'Table', defaultLocale: defaultLocale.Table },
                    this.renderEmpty
                );
            } else {
                childrenContent = empty;
            }
            var content = React.createElement(
                'div',
                null,
                React.createElement(
                    Spin,
                    loadingProp,
                    childrenContent
                ),
                loadMore,
                !loadMore && pagination ? paginationContent : null
            );
            return React.createElement(
                'div',
                _extends({ className: classString }, omit(rest, ['prefixCls', 'rowKey', 'renderItem'])),
                header && React.createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    header
                ),
                content,
                children,
                footer && React.createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    footer
                )
            );
        }
    }]);

    return List;
}(Component);

export default List;

List.displayName = 'List';
List.Item = Item;
List.childContextTypes = {
    grid: PropTypes.any
};
List.defaultProps = {
    dataSource: [],
    bordered: false,
    split: true,
    loading: false,
    pagination: false
};