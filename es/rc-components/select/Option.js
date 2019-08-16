import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var Option = function (_Component) {
  _inherits(Option, _Component);

  function Option() {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
  }

  return Option;
}(Component);

Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Option.isSelectOption = true;
export default Option;