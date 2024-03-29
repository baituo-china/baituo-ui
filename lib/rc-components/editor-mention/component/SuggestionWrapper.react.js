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

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var IS_REACT_16 = !!_reactDom.createPortal;

var SuggestionWrapper = function (_Component) {
  (0, _inherits3['default'])(SuggestionWrapper, _Component);

  function SuggestionWrapper() {
    (0, _classCallCheck3['default'])(this, SuggestionWrapper);
    return (0, _possibleConstructorReturn3['default'])(this, (SuggestionWrapper.__proto__ || Object.getPrototypeOf(SuggestionWrapper)).apply(this, arguments));
  }

  (0, _createClass3['default'])(SuggestionWrapper, [{
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

      (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, children, container, function callback() {
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

        return (0, _reactDom.createPortal)(children, container);
      }
      return null;
    }
  }]);
  return SuggestionWrapper;
}(_react.Component);

SuggestionWrapper.propTypes = {
  children: _propTypes2['default'].any,
  renderReady: _propTypes2['default'].func,
  container: _propTypes2['default'].any
};
exports['default'] = SuggestionWrapper;
module.exports = exports['default'];