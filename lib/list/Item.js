'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Meta = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _grid = require('../grid');

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Meta = function Meta(props) {
    var customizePrefixCls = props.prefixCls,
        className = props.className,
        avatar = props.avatar,
        title = props.title,
        description = props.description,
        others = (0, _objectWithoutProperties3['default'])(props, ['prefixCls', 'className', 'avatar', 'title', 'description']);

    var prefixCls = (0, _configure.getPrefixCls)('list', customizePrefixCls);
    var classString = (0, _classnames2['default'])(prefixCls + '-item-meta', className);
    var content = _react2['default'].createElement(
        'div',
        { className: prefixCls + '-item-meta-content' },
        title && _react2['default'].createElement(
            'h4',
            { className: prefixCls + '-item-meta-title' },
            title
        ),
        description && _react2['default'].createElement(
            'div',
            { className: prefixCls + '-item-meta-description' },
            description
        )
    );
    return _react2['default'].createElement(
        'div',
        (0, _extends3['default'])({}, others, { className: classString }),
        avatar && _react2['default'].createElement(
            'div',
            { className: prefixCls + '-item-meta-avatar' },
            avatar
        ),
        (title || description) && content
    );
};
exports.Meta = Meta;
Meta.displayName = 'ListMeta';
function getGrid(grid, t) {
    return grid[t] && Math.floor(24 / grid[t]);
}
var GridColumns = ['', 1, 2, 3, 4, 6, 8, 12, 24];

var Item = function (_Component) {
    (0, _inherits3['default'])(Item, _Component);

    function Item() {
        (0, _classCallCheck3['default'])(this, Item);
        return (0, _possibleConstructorReturn3['default'])(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Item, [{
        key: 'render',
        value: function render() {
            var grid = this.context.grid;
            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                children = _props.children,
                actions = _props.actions,
                extra = _props.extra,
                className = _props.className,
                others = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'children', 'actions', 'extra', 'className']);

            var prefixCls = (0, _configure.getPrefixCls)('list', customizePrefixCls);
            var classString = (0, _classnames2['default'])(prefixCls + '-item', className);
            var metaContent = [];
            var otherContent = [];
            _react.Children.forEach(children, function (element) {
                if (element && element.type && element.type === Meta) {
                    metaContent.push(element);
                } else {
                    otherContent.push(element);
                }
            });
            var contentClassString = (0, _classnames2['default'])(prefixCls + '-item-content', (0, _defineProperty3['default'])({}, prefixCls + '-item-content-single', metaContent.length < 1));
            var content = otherContent.length > 0 ? _react2['default'].createElement(
                'div',
                { className: contentClassString },
                otherContent
            ) : null;
            var actionsContent = void 0;
            if (actions && actions.length > 0) {
                var actionsContentItem = function actionsContentItem(action, i) {
                    return _react2['default'].createElement(
                        'li',
                        { key: prefixCls + '-item-action-' + i },
                        action,
                        i !== actions.length - 1 && _react2['default'].createElement('em', { className: prefixCls + '-item-action-split' })
                    );
                };
                actionsContent = _react2['default'].createElement(
                    'ul',
                    { className: prefixCls + '-item-action' },
                    actions.map(function (action, i) {
                        return actionsContentItem(action, i);
                    })
                );
            }
            var extraContent = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-item-extra-wrap' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-item-main' },
                    metaContent,
                    content,
                    actionsContent
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-item-extra' },
                    extra
                )
            );
            var mainContent = grid ? _react2['default'].createElement(
                _grid.Col,
                { span: getGrid(grid, 'column'), xs: getGrid(grid, 'xs'), sm: getGrid(grid, 'sm'), md: getGrid(grid, 'md'), lg: getGrid(grid, 'lg'), xl: getGrid(grid, 'xl'), xxl: getGrid(grid, 'xxl') },
                _react2['default'].createElement(
                    'div',
                    (0, _extends3['default'])({}, others, { className: classString }),
                    extra && extraContent,
                    !extra && metaContent,
                    !extra && content,
                    !extra && actionsContent
                )
            ) : _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({}, others, { className: classString }),
                extra && extraContent,
                !extra && metaContent,
                !extra && content,
                !extra && actionsContent
            );
            return mainContent;
        }
    }]);
    return Item;
}(_react.Component);

exports['default'] = Item;

Item.displayName = 'ListItem';
Item.Meta = Meta;
Item.propTypes = {
    column: _propTypes2['default'].oneOf(GridColumns),
    xs: _propTypes2['default'].oneOf(GridColumns),
    sm: _propTypes2['default'].oneOf(GridColumns),
    md: _propTypes2['default'].oneOf(GridColumns),
    lg: _propTypes2['default'].oneOf(GridColumns),
    xl: _propTypes2['default'].oneOf(GridColumns),
    xxl: _propTypes2['default'].oneOf(GridColumns)
};
Item.contextTypes = {
    grid: _propTypes2['default'].any
};