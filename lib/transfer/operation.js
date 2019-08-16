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

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Operation = function (_Component) {
  (0, _inherits3['default'])(Operation, _Component);

  function Operation() {
    (0, _classCallCheck3['default'])(this, Operation);
    return (0, _possibleConstructorReturn3['default'])(this, (Operation.__proto__ || Object.getPrototypeOf(Operation)).apply(this, arguments));
  }

  (0, _createClass3['default'])(Operation, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$moveToLeft = _props.moveToLeft,
          moveToLeft = _props$moveToLeft === undefined ? _noop2['default'] : _props$moveToLeft,
          _props$moveToRight = _props.moveToRight,
          moveToRight = _props$moveToRight === undefined ? _noop2['default'] : _props$moveToRight,
          _props$leftArrowText = _props.leftArrowText,
          leftArrowText = _props$leftArrowText === undefined ? '' : _props$leftArrowText,
          _props$rightArrowText = _props.rightArrowText,
          rightArrowText = _props$rightArrowText === undefined ? '' : _props$rightArrowText,
          leftActive = _props.leftActive,
          rightActive = _props.rightActive,
          className = _props.className;

      return _react2['default'].createElement(
        'div',
        { className: className },
        _react2['default'].createElement(
          _button2['default'],
          { type: 'primary', size: "small" /* small */, disabled: !leftActive, onClick: moveToLeft, icon: 'left' },
          leftArrowText
        ),
        _react2['default'].createElement(
          _button2['default'],
          { type: 'primary', size: "small" /* small */, disabled: !rightActive, onClick: moveToRight, icon: 'right' },
          rightArrowText
        )
      );
    }
  }]);
  return Operation;
}(_react.Component);

exports['default'] = Operation;
module.exports = exports['default'];