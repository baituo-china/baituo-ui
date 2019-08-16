'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var OptGroup = function (_Component) {
    (0, _inherits3['default'])(OptGroup, _Component);

    function OptGroup() {
        (0, _classCallCheck3['default'])(this, OptGroup);
        return (0, _possibleConstructorReturn3['default'])(this, (OptGroup.__proto__ || Object.getPrototypeOf(OptGroup)).apply(this, arguments));
    }

    return OptGroup;
}(_react.Component);

exports['default'] = OptGroup;

OptGroup.propTypes = {
    label: _propTypes2['default'].string
};
module.exports = exports['default'];