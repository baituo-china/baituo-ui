'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PanelContent = function (_Component) {
  (0, _inherits3['default'])(PanelContent, _Component);

  function PanelContent() {
    (0, _classCallCheck3['default'])(this, PanelContent);
    return (0, _possibleConstructorReturn3['default'])(this, (PanelContent.__proto__ || Object.getPrototypeOf(PanelContent)).apply(this, arguments));
  }

  (0, _createClass3['default'])(PanelContent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !this.props.isInactive || !nextProps.isInactive;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      this._isActived = this.props.forceRender || this._isActived || !this.props.isInactive;
      if (!this._isActived) {
        return null;
      }
      var _props = this.props,
          prefixCls = _props.prefixCls,
          isInactive = _props.isInactive,
          children = _props.children,
          destroyInactivePanel = _props.destroyInactivePanel,
          forceRender = _props.forceRender;

      var contentCls = (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-content', true), (0, _defineProperty3['default'])(_classnames, prefixCls + '-content-active', !isInactive), (0, _defineProperty3['default'])(_classnames, prefixCls + '-content-inactive', isInactive), _classnames));
      var child = !forceRender && isInactive && destroyInactivePanel ? null : _react2['default'].createElement(
        'div',
        { className: prefixCls + '-content-box' },
        children
      );
      return _react2['default'].createElement(
        'div',
        {
          className: contentCls,
          role: 'tabpanel'
        },
        child
      );
    }
  }]);
  return PanelContent;
}(_react.Component);

PanelContent.propTypes = {
  prefixCls: _propTypes2['default'].string,
  isInactive: _propTypes2['default'].bool,
  children: _propTypes2['default'].any,
  destroyInactivePanel: _propTypes2['default'].bool,
  forceRender: _propTypes2['default'].bool
};
exports['default'] = PanelContent;
module.exports = exports['default'];