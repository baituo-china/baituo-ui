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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _rate = require('../rc-components/rate');

var _rate2 = _interopRequireDefault(_rate);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Rate = function (_Component) {
    (0, _inherits3['default'])(Rate, _Component);

    function Rate() {
        (0, _classCallCheck3['default'])(this, Rate);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).apply(this, arguments));

        _this.saveRate = function (node) {
            _this.rcRate = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Rate, [{
        key: 'focus',
        value: function focus() {
            this.rcRate.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcRate.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(_rate2['default'], (0, _extends3['default'])({ ref: this.saveRate, prefixCls: (0, _configure.getPrefixCls)('rate') }, this.props));
        }
    }]);
    return Rate;
}(_react.Component);

exports['default'] = Rate;

Rate.displayName = 'Rate';
Rate.propTypes = {
    prefixCls: _propTypes2['default'].string,
    character: _propTypes2['default'].node
};
Rate.defaultProps = {
    character: _react2['default'].createElement(_icon2['default'], { type: 'star' })
};
module.exports = exports['default'];