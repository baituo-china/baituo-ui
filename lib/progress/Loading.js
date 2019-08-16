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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SIZE = 50;

var Loading = function (_Component) {
    (0, _inherits3['default'])(Loading, _Component);

    function Loading() {
        (0, _classCallCheck3['default'])(this, Loading);
        return (0, _possibleConstructorReturn3['default'])(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Loading, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'svg',
                { viewBox: '0 0 ' + SIZE + ' ' + SIZE },
                _react2['default'].createElement('circle', { cx: SIZE / 2, cy: SIZE / 2, r: SIZE / 2 - 5 })
            );
        }
    }]);
    return Loading;
}(_react.Component);

exports['default'] = Loading;

Loading.displayName = 'Loading';
module.exports = exports['default'];