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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Star = function (_Component) {
  (0, _inherits3['default'])(Star, _Component);

  function Star() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Star);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Star.__proto__ || Object.getPrototypeOf(Star)).call.apply(_ref, [this].concat(args))), _this), _this.onHover = function (e) {
      var _this$props = _this.props,
          onHover = _this$props.onHover,
          index = _this$props.index;

      onHover(e, index);
    }, _this.onClick = function (e) {
      var _this$props2 = _this.props,
          onClick = _this$props2.onClick,
          index = _this$props2.index;

      onClick(e, index);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Star, [{
    key: 'getClassName',
    value: function getClassName() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          index = _props.index,
          value = _props.value,
          allowHalf = _props.allowHalf,
          focused = _props.focused;

      var starValue = index + 1;
      var className = prefixCls;
      if (value === 0 && index === 0 && focused) {
        className += ' ' + prefixCls + '-focused';
      } else if (allowHalf && value + 0.5 === starValue) {
        className += ' ' + prefixCls + '-half ' + prefixCls + '-active';
        if (focused) {
          className += ' ' + prefixCls + '-focused';
        }
      } else {
        className += starValue <= value ? ' ' + prefixCls + '-full' : ' ' + prefixCls + '-zero';
        if (starValue === value && focused) {
          className += ' ' + prefixCls + '-focused';
        }
      }
      return className;
    }
  }, {
    key: 'render',
    value: function render() {
      var onHover = this.onHover,
          onClick = this.onClick;
      var _props2 = this.props,
          disabled = _props2.disabled,
          prefixCls = _props2.prefixCls,
          character = _props2.character;

      return _react2['default'].createElement(
        'li',
        {
          className: this.getClassName(),
          onClick: disabled ? null : onClick,
          onMouseMove: disabled ? null : onHover
        },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-first' },
          character
        ),
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-second' },
          character
        )
      );
    }
  }]);
  return Star;
}(_react.Component);

Star.propTypes = {
  value: _propTypes2['default'].number,
  index: _propTypes2['default'].number,
  prefixCls: _propTypes2['default'].string,
  allowHalf: _propTypes2['default'].bool,
  disabled: _propTypes2['default'].bool,
  onHover: _propTypes2['default'].func,
  onClick: _propTypes2['default'].func,
  character: _propTypes2['default'].node,
  focused: _propTypes2['default'].bool
};
exports['default'] = Star;
module.exports = exports['default'];