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

var _icon = require('../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('../../input');

var _input2 = _interopRequireDefault(_input);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FilterInput = function (_Component) {
  (0, _inherits3['default'])(FilterInput, _Component);

  function FilterInput(props) {
    (0, _classCallCheck3['default'])(this, FilterInput);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (FilterInput.__proto__ || Object.getPrototypeOf(FilterInput)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.filterValue || '';
    _this.state = {
      value: value
    };
    return _this;
  }

  (0, _createClass3['default'])(FilterInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          placeholder = _props.placeholder;
      var value = this.state.value;

      var suffix = value && _react2['default'].createElement(_button2['default'], { size: 'small', onClick: this.clearInputValue, shape: 'circle', icon: 'close' });
      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-filter' },
        _react2['default'].createElement(
          'span',
          { className: prefixCls + '-filter-input' },
          _react2['default'].createElement(_input2['default'], {
            value: value,
            placeholder: placeholder,
            prefix: _react2['default'].createElement(_icon2['default'], { type: 'search' }),
            suffix: suffix,
            onChange: this.handleChange,
            onKeyDown: this.props.onKeyDown,
            ref: (0, _util.saveRef)(this, 'filterInputRef')
          })
        )
      );
    }
  }]);
  return FilterInput;
}(_react.Component);

FilterInput.propTypes = {
  prefixCls: _propTypes2['default'].string,
  placeholder: _propTypes2['default'].string,
  onChange: _propTypes2['default'].func,
  onKeyDown: _propTypes2['default'].func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentWillReceiveProps = function (nextProps) {
    if ('filterValue' in nextProps) {
      var value = nextProps.filterValue;
      _this2.setState({
        value: value
      });
    }
  };

  this.handleChange = function (event, input) {
    var onChange = _this2.props.onChange;

    onChange(event.target.value);
    _this2.setState({
      value: event.target.value
    });
  };

  this.clearInputValue = function () {
    var onChange = _this2.props.onChange;

    onChange('');
  };

  this.focus = function () {
    _this2.filterInputRef.focus();
  };

  this.blur = function () {
    _this2.filterInputRef.blur();
  };
};

exports['default'] = FilterInput;
module.exports = exports['default'];