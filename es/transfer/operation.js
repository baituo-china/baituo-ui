import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import noop from 'lodash/noop';
import Button from '../button';

var Operation = function (_Component) {
  _inherits(Operation, _Component);

  function Operation() {
    _classCallCheck(this, Operation);

    return _possibleConstructorReturn(this, (Operation.__proto__ || Object.getPrototypeOf(Operation)).apply(this, arguments));
  }

  _createClass(Operation, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$moveToLeft = _props.moveToLeft,
          moveToLeft = _props$moveToLeft === undefined ? noop : _props$moveToLeft,
          _props$moveToRight = _props.moveToRight,
          moveToRight = _props$moveToRight === undefined ? noop : _props$moveToRight,
          _props$leftArrowText = _props.leftArrowText,
          leftArrowText = _props$leftArrowText === undefined ? '' : _props$leftArrowText,
          _props$rightArrowText = _props.rightArrowText,
          rightArrowText = _props$rightArrowText === undefined ? '' : _props$rightArrowText,
          leftActive = _props.leftActive,
          rightActive = _props.rightActive,
          className = _props.className;

      return React.createElement(
        'div',
        { className: className },
        React.createElement(
          Button,
          { type: 'primary', size: "small" /* small */, disabled: !leftActive, onClick: moveToLeft, icon: 'left' },
          leftArrowText
        ),
        React.createElement(
          Button,
          { type: 'primary', size: "small" /* small */, disabled: !rightActive, onClick: moveToRight, icon: 'right' },
          rightArrowText
        )
      );
    }
  }]);

  return Operation;
}(Component);

export default Operation;