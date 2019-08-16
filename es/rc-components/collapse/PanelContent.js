import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var PanelContent = function (_Component) {
  _inherits(PanelContent, _Component);

  function PanelContent() {
    _classCallCheck(this, PanelContent);

    return _possibleConstructorReturn(this, (PanelContent.__proto__ || Object.getPrototypeOf(PanelContent)).apply(this, arguments));
  }

  _createClass(PanelContent, [{
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

      var contentCls = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-content', true), _defineProperty(_classnames, prefixCls + '-content-active', !isInactive), _defineProperty(_classnames, prefixCls + '-content-inactive', isInactive), _classnames));
      var child = !forceRender && isInactive && destroyInactivePanel ? null : React.createElement(
        'div',
        { className: prefixCls + '-content-box' },
        children
      );
      return React.createElement(
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
}(Component);

PanelContent.propTypes = {
  prefixCls: PropTypes.string,
  isInactive: PropTypes.bool,
  children: PropTypes.any,
  destroyInactivePanel: PropTypes.bool,
  forceRender: PropTypes.bool
};
export default PanelContent;