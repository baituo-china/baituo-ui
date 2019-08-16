import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon';
import Input from '../../input';
import Button from '../../button';
import { saveRef } from './util';

var FilterInput = function (_Component) {
  _inherits(FilterInput, _Component);

  function FilterInput(props) {
    _classCallCheck(this, FilterInput);

    var _this = _possibleConstructorReturn(this, (FilterInput.__proto__ || Object.getPrototypeOf(FilterInput)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.filterValue || '';
    _this.state = {
      value: value
    };
    return _this;
  }

  _createClass(FilterInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          placeholder = _props.placeholder;
      var value = this.state.value;

      var suffix = value && React.createElement(Button, { size: 'small', onClick: this.clearInputValue, shape: 'circle', icon: 'close' });
      return React.createElement(
        'div',
        { className: prefixCls + '-filter' },
        React.createElement(
          'span',
          { className: prefixCls + '-filter-input' },
          React.createElement(Input, {
            value: value,
            placeholder: placeholder,
            prefix: React.createElement(Icon, { type: 'search' }),
            suffix: suffix,
            onChange: this.handleChange,
            onKeyDown: this.props.onKeyDown,
            ref: saveRef(this, 'filterInputRef')
          })
        )
      );
    }
  }]);

  return FilterInput;
}(Component);

FilterInput.propTypes = {
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
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

export default FilterInput;