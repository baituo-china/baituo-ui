import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from '../../_util/addEventListener';

var Handle = function (_Component) {
  _inherits(Handle, _Component);

  function Handle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Handle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Handle.__proto__ || Object.getPrototypeOf(Handle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      clickFocused: false
    }, _this.handleMouseUp = function () {
      if (document.activeElement === _this.handle) {
        _this.setClickFocus(true);
      }
    }, _this.handleBlur = function () {
      _this.setClickFocus(false);
    }, _this.handleKeyDown = function () {
      _this.setClickFocus(false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Handle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // mouseup won't trigger if mouse moved out of handle,
      // so we listen on document here.
      this.onMouseUpListener = addEventListener(document, 'mouseup', this.handleMouseUp);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.onMouseUpListener) {
        this.onMouseUpListener.remove();
      }
    }
  }, {
    key: 'setClickFocus',
    value: function setClickFocus(focused) {
      this.setState({ clickFocused: focused });
    }
  }, {
    key: 'clickFocus',
    value: function clickFocus() {
      this.setClickFocus(true);
      this.focus();
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.handle.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.handle.blur();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          prefixCls = _props.prefixCls,
          vertical = _props.vertical,
          offset = _props.offset,
          style = _props.style,
          disabled = _props.disabled,
          min = _props.min,
          max = _props.max,
          value = _props.value,
          tabIndex = _props.tabIndex,
          restProps = _objectWithoutProperties(_props, ['prefixCls', 'vertical', 'offset', 'style', 'disabled', 'min', 'max', 'value', 'tabIndex']);

      var className = classNames(this.props.className, _defineProperty({}, prefixCls + '-handle-click-focused', this.state.clickFocused));

      var postionStyle = vertical ? { bottom: offset + '%' } : { left: offset + '%' };
      var elStyle = _extends({}, style, postionStyle);
      var ariaProps = {};
      if (value !== undefined) {
        ariaProps = _extends({}, ariaProps, {
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-valuenow': value,
          'aria-disabled': !!disabled
        });
      }

      return React.createElement('div', _extends({
        ref: function ref(node) {
          return _this2.handle = node;
        },
        role: 'slider',
        tabIndex: disabled ? null : tabIndex || 0
      }, ariaProps, restProps, {
        className: className,
        style: elStyle,
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
      }));
    }
  }]);

  return Handle;
}(Component);

Handle.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  tabIndex: PropTypes.number
};
export default Handle;