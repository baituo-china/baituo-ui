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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _menu = require('../rc-components/menu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var MenuItem = function (_Component) {
    (0, _inherits3['default'])(MenuItem, _Component);

    function MenuItem() {
        (0, _classCallCheck3['default'])(this, MenuItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));

        _this.onKeyDown = function (e) {
            _this.menuItem.onKeyDown(e);
        };
        _this.saveMenuItem = function (menuItem) {
            _this.menuItem = menuItem;
        };
        return _this;
    }

    (0, _createClass3['default'])(MenuItem, [{
        key: 'render',
        value: function render() {
            var inlineCollapsed = this.context.inlineCollapsed;

            var props = this.props;
            var item = _react2['default'].createElement(_menu.Item, (0, _extends3['default'])({}, props, { ref: this.saveMenuItem }));
            if (inlineCollapsed && props.level === 1) {
                return _react2['default'].createElement(
                    _tooltip2['default'],
                    { title: props.children, placement: 'right', overlayClassName: props.rootPrefixCls + '-inline-collapsed-tooltip' },
                    item
                );
            }
            return item;
        }
    }]);
    return MenuItem;
}(_react.Component);

MenuItem.contextTypes = {
    inlineCollapsed: _propTypes2['default'].bool
};
MenuItem.isMenuItem = 1;
exports['default'] = MenuItem;
module.exports = exports['default'];