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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SuggestionWrapper = function (_Component) {
  (0, _inherits3['default'])(SuggestionWrapper, _Component);

  function SuggestionWrapper() {
    (0, _classCallCheck3['default'])(this, SuggestionWrapper);
    return (0, _possibleConstructorReturn3['default'])(this, (SuggestionWrapper.__proto__ || Object.getPrototypeOf(SuggestionWrapper)).apply(this, arguments));
  }

  (0, _createClass3['default'])(SuggestionWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.renderReady();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.renderReady();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return SuggestionWrapper;
}(_react.Component);

exports['default'] = SuggestionWrapper;
module.exports = exports['default'];