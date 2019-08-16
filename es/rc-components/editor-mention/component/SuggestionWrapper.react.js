import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal, unstable_renderSubtreeIntoContainer } from 'react-dom';

var IS_REACT_16 = !!createPortal;

var SuggestionWrapper = function (_Component) {
  _inherits(SuggestionWrapper, _Component);

  function SuggestionWrapper() {
    _classCallCheck(this, SuggestionWrapper);

    return _possibleConstructorReturn(this, (SuggestionWrapper.__proto__ || Object.getPrototypeOf(SuggestionWrapper)).apply(this, arguments));
  }

  _createClass(SuggestionWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderOrReady();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderOrReady();
    }
  }, {
    key: 'renderOrReady',
    value: function renderOrReady() {
      if (IS_REACT_16) {
        this.props.renderReady();
      } else {
        this.renderComponent();
      }
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      var _props = this.props,
          children = _props.children,
          container = _props.container,
          renderReady = _props.renderReady;

      unstable_renderSubtreeIntoContainer(this, children, container, function callback() {
        if (renderReady) {
          renderReady.call(this);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (IS_REACT_16) {
        var _props2 = this.props,
            children = _props2.children,
            container = _props2.container;

        return createPortal(children, container);
      }
      return null;
    }
  }]);

  return SuggestionWrapper;
}(Component);

SuggestionWrapper.propTypes = {
  children: PropTypes.any,
  renderReady: PropTypes.func,
  container: PropTypes.any
};
export default SuggestionWrapper;