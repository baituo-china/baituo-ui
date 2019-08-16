'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var IconItem = function (_PureComponent) {
    (0, _inherits3['default'])(IconItem, _PureComponent);

    function IconItem() {
        (0, _classCallCheck3['default'])(this, IconItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (IconItem.__proto__ || Object.getPrototypeOf(IconItem)).apply(this, arguments));

        _this.handleClick = function () {
            var _this$props = _this.props,
                onSelect = _this$props.onSelect,
                type = _this$props.type;

            onSelect(type);
        };
        return _this;
    }

    (0, _createClass3['default'])(IconItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                type = _props.type,
                active = _props.active;

            return _react2['default'].createElement(
                'li',
                { className: (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-item-selected', active)), onClick: this.handleClick },
                _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(_icon2['default'], { type: type }),
                    _react2['default'].createElement(
                        'p',
                        null,
                        type
                    )
                )
            );
        }
    }]);
    return IconItem;
}(_react.PureComponent);

exports['default'] = IconItem;

IconItem.displayName = 'IconItem';
IconItem.propTypes = {
    prefixCls: _propTypes2['default'].string,
    active: _propTypes2['default'].bool.isRequired,
    type: _propTypes2['default'].string.isRequired,
    onSelect: _propTypes2['default'].func.isRequired
};
module.exports = exports['default'];