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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ViewComponent2 = require('../core/ViewComponent');

var _ViewComponent3 = _interopRequireDefault(_ViewComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Mask = function (_ViewComponent) {
    (0, _inherits3['default'])(Mask, _ViewComponent);

    function Mask() {
        (0, _classCallCheck3['default'])(this, Mask);
        return (0, _possibleConstructorReturn3['default'])(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Mask, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement('div', this.getMergedProps());
        }
    }]);
    return Mask;
}(_ViewComponent3['default']);

exports['default'] = Mask;

Mask.displayName = 'Mask';
Mask.defaultProps = {
    suffixCls: 'mask'
};
module.exports = exports['default'];