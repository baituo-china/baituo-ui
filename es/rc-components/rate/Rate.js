import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import KeyCode from '../../_util/KeyCode';
import { getOffsetLeft } from './util';
import Star from './Star';

var Rate = function (_Component) {
  _inherits(Rate, _Component);

  function Rate(props) {
    _classCallCheck(this, Rate);

    var _this = _possibleConstructorReturn(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).call(this, props));

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

  _createClass(Rate, [{
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
      return ReactDOM.findDOMNode(this.stars[index]);
    }
  }, {
    key: 'getStarValue',
    value: function getStarValue(index, x) {
      var value = index + 1;
      if (this.props.allowHalf) {
        var starEle = this.getStarDOM(index);
        var leftDis = getOffsetLeft(starEle);
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
        stars.push(React.createElement(Star, {
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
      return React.createElement(
        'ul',
        {
          className: classNames(prefixCls, disabledClass, className),
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
}(Component);

Rate.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  count: PropTypes.number,
  allowHalf: PropTypes.bool,
  allowClear: PropTypes.bool,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  onChange: PropTypes.func,
  onHoverChange: PropTypes.func,
  className: PropTypes.string,
  character: PropTypes.node,
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool
};
Rate.defaultProps = {
  defaultValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  style: {},
  prefixCls: 'rc-rate',
  onChange: noop,
  character: '★',
  onHoverChange: noop,
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

    if (keyCode === KeyCode.RIGHT && value < count) {
      if (allowHalf) {
        value += 0.5;
      } else {
        value += 1;
      }
      _this2.changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && value > 0) {
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

export default Rate;