import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';

var LazyRenderBox = function (_Component) {
  _inherits(LazyRenderBox, _Component);

  function LazyRenderBox() {
    _classCallCheck(this, LazyRenderBox);

    return _possibleConstructorReturn(this, (LazyRenderBox.__proto__ || Object.getPrototypeOf(LazyRenderBox)).apply(this, arguments));
  }

  _createClass(LazyRenderBox, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.hiddenClassName || !nextProps.hidden;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          hiddenClassName = _props.hiddenClassName,
          hidden = _props.hidden,
          props = _objectWithoutProperties(_props, ['hiddenClassName', 'hidden']);

      if (hiddenClassName || Children.count(props.children) > 1) {
        if (hidden && hiddenClassName) {
          props.className += ' ' + hiddenClassName;
        }
        return React.createElement('div', props);
      }

      return Children.only(props.children);
    }
  }]);

  return LazyRenderBox;
}(Component);

LazyRenderBox.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  hidden: PropTypes.bool,
  hiddenClassName: PropTypes.string
};
export default LazyRenderBox;