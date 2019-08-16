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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _KeyCode = require('../../_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _util = require('./util');

var _Star = require('./Star');

var _Star2 = _interopRequireDefault(_Star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Rate = function (_Component) {
  (0, _inherits3['default'])(Rate, _Component);

  function Rate(props) {
    (0, _classCallCheck3['default'])(this, Rate);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.value;
    if (value === undefined) {
      value = props.defaultValue;
    }

    _this.stars = {};

    _this.state = {
      value: value,
      focused: false,
      cleanedValue: null
    };
    return _this;
  }

  (0, _createClass3['default'])(Rate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus && !this.props.disabled) {
        this.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        var value = nextProps.value;
        if (value === undefined) {
          value = nextProps.defaultValue;
        }
        this.setState({
          value: value
        });
      }
    }
  }, {
    key: 'getStarDOM',
    value: function getStarDOM(index) {
      return _reactDom2['default'].findDOMNode(this.stars[index]);
    }
  }, {
    key: 'getStarValue',
    value: function getStarValue(index, x) {
      var value = index + 1;
      if (this.props.allowHalf) {
        var starEle = this.getStarDOM(index);
        var leftDis = (0, _util.getOffsetLeft)(starEle);
        var width = starEle.clientWidth;
        if (x - leftDis < width / 2) {
          value -= 0.5;
        }
      }
      return value;
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!this.props.disabled) {
        this.rate.focus();
      }
    }
  }, {
    key: 'blur',
    value: function blur() {
      if (!this.props.disabled) {
        this.rate.focus();
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(value) {
      if (!('value' in this.props)) {
        this.setState({
          value: value
        });
      }
      this.props.onChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          count = _props.count,
          allowHalf = _props.allowHalf,
          style = _props.style,
          prefixCls = _props.prefixCls,
          disabled = _props.disabled,
          className = _props.className,
          character = _props.character,
          tabIndex = _props.tabIndex;
      var _state = this.state,
          value = _state.value,
          hoverValue = _state.hoverValue,
          focused = _state.focused;

      var stars = [];
      var disabledClass = disabled ? prefixCls + '-disabled' : '';
      for (var index = 0; index < count; index++) {
        stars.push(_react2['default'].createElement(_Star2['default'], {
          ref: this.saveRef(index),
          index: index,
          disabled: disabled,
          prefixCls: prefixCls + '-star',
          allowHalf: allowHalf,
          value: hoverValue === undefined ? value : hoverValue,
          onClick: this.onClick,
          onHover: this.onHover,
          key: index,
          character: character,
          focused: focused
        }));
      }
      return _react2['default'].createElement(
        'ul',
        {
          className: (0, _classnames2['default'])(prefixCls, disabledClass, className),
          style: style,
          onMouseLeave: disabled ? null : this.onMouseLeave,
          tabIndex: disabled ? -1 : tabIndex,
          onFocus: disabled ? null : this.onFocus,
          onBlur: disabled ? null : this.onBlur,
          onKeyDown: disabled ? null : this.onKeyDown,
          ref: this.saveRate
        },
        stars
      );
    }
  }]);
  return Rate;
}(_react.Component);

Rate.propTypes = {
  disabled: _propTypes2['default'].bool,
  value: _propTypes2['default'].number,
  defaultValue: _propTypes2['default'].number,
  count: _propTypes2['default'].number,
  allowHalf: _propTypes2['default'].bool,
  allowClear: _propTypes2['default'].bool,
  style: _propTypes2['default'].object,
  prefixCls: _propTypes2['default'].string,
  onChange: _propTypes2['default'].func,
  onHoverChange: _propTypes2['default'].func,
  className: _propTypes2['default'].string,
  character: _propTypes2['default'].node,
  tabIndex: _propTypes2['default'].number,
  onFocus: _propTypes2['default'].func,
  onBlur: _propTypes2['default'].func,
  onKeyDown: _propTypes2['default'].func,
  autoFocus: _propTypes2['default'].bool
};
Rate.defaultProps = {
  defaultValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  style: {},
  prefixCls: 'rc-rate',
  onChange: _noop2['default'],
  character: '★',
  onHoverChange: _noop2['default'],
  tabIndex: 0
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onHover = function (event, index) {
    var hoverValue = _this2.getStarValue(index, event.pageX);
    var cleanedValue = _this2.state.cleanedValue;

    if (hoverValue !== cleanedValue) {
      _this2.setState({
        hoverValue: hoverValue,
        cleanedValue: null
      });
    }
    _this2.props.onHoverChange(hoverValue);
  };

  this.onMouseLeave = function () {
    _this2.setState({
      hoverValue: undefined,
      cleanedValue: null
    });
    _this2.props.onHoverChange(undefined);
  };

  this.onClick = function (event, index) {
    var value = _this2.getStarValue(index, event.pageX);
    var isReset = false;
    if (_this2.props.allowClear) {
      isReset = value === _this2.state.value;
    }
    _this2.onMouseLeave(true);
    _this2.changeValue(isReset ? 0 : value);
    _this2.setState({
      cleanedValue: isReset ? value : null
    });
  };

  this.onFocus = function () {
    var onFocus = _this2.props.onFocus;

    _this2.setState({
      focused: true
    });
    if (onFocus) {
      onFocus();
    }
  };

  this.onBlur = function () {
    var onBlur = _this2.props.onBlur;

    _this2.setState({
      focused: false
    });
    if (onBlur) {
      onBlur();
    }
  };

  this.onKeyDown = function (event) {
    var keyCode = event.keyCode;
    var _props2 = _this2.props,
        count = _props2.count,
        allowHalf = _props2.allowHalf,
        onKeyDown = _props2.onKeyDown;
    var value = _this2.state.value;

    if (keyCode === _KeyCode2['default'].RIGHT && value < count) {
      if (allowHalf) {
        value += 0.5;
      } else {
        value += 1;
      }
      _this2.changeValue(value);
      event.preventDefault();
    } else if (keyCode === _KeyCode2['default'].LEFT && value > 0) {
      if (allowHalf) {
        value -= 0.5;
      } else {
        value -= 1;
      }
      _this2.changeValue(value);
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  this.saveRef = function (index) {
    return function (node) {
      _this2.stars[index] = node;
    };
  };

  this.saveRate = function (node) {
    _this2.rate = node;
  };
};

exports['default'] = Rate;
module.exports = exports['default'];