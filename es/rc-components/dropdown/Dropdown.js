import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Trigger from '../trigger';
import placements from './placements';

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _initialiseProps.call(_this);

    if ('visible' in props) {
      _this.state = {
        visible: props.visible
      };
    } else {
      _this.state = {
        visible: props.defaultVisible
      };
    }
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var visible = _ref.visible;

      if (visible !== undefined) {
        this.setState({
          visible: visible
        });
      }
    }
  }, {
    key: 'getMenuElement',
    value: function getMenuElement() {
      var _props = this.props,
          overlay = _props.overlay,
          prefixCls = _props.prefixCls;

      var extraOverlayProps = {
        prefixCls: prefixCls + '-menu',
        onClick: this.onClick
      };
      if (typeof overlay.type === 'string') {
        delete extraOverlayProps.prefixCls;
      }
      return cloneElement(overlay, extraOverlayProps);
    }
  }, {
    key: 'getPopupDomNode',
    value: function getPopupDomNode() {
      return this.trigger.getPopupDomNode();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          children = _props2.children,
          transitionName = _props2.transitionName,
          animation = _props2.animation,
          align = _props2.align,
          placement = _props2.placement,
          getPopupContainer = _props2.getPopupContainer,
          showAction = _props2.showAction,
          hideAction = _props2.hideAction,
          overlayClassName = _props2.overlayClassName,
          overlayStyle = _props2.overlayStyle,
          trigger = _props2.trigger,
          otherProps = _objectWithoutProperties(_props2, ['prefixCls', 'children', 'transitionName', 'animation', 'align', 'placement', 'getPopupContainer', 'showAction', 'hideAction', 'overlayClassName', 'overlayStyle', 'trigger']);

      return React.createElement(
        Trigger,
        _extends({}, otherProps, {
          prefixCls: prefixCls,
          ref: this.saveTrigger,
          popupClassName: overlayClassName,
          popupStyle: overlayStyle,
          builtinPlacements: placements,
          action: trigger,
          showAction: showAction,
          hideAction: hideAction,
          popupPlacement: placement,
          popupAlign: align,
          popupTransitionName: transitionName,
          popupAnimation: animation,
          popupVisible: this.state.visible,
          afterPopupVisibleChange: this.afterVisibleChange,
          popup: this.getMenuElement(),
          onPopupVisibleChange: this.onVisibleChange,
          getPopupContainer: getPopupContainer
        }),
        children
      );
    }
  }]);

  return Dropdown;
}(Component);

Dropdown.propTypes = {
  minOverlayWidthMatchTrigger: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  onOverlayClick: PropTypes.func,
  prefixCls: PropTypes.string,
  children: PropTypes.any,
  transitionName: PropTypes.string,
  overlayClassName: PropTypes.string,
  animation: PropTypes.any,
  align: PropTypes.object,
  overlayStyle: PropTypes.object,
  placement: PropTypes.string,
  overlay: PropTypes.node,
  trigger: PropTypes.array,
  showAction: PropTypes.array,
  hideAction: PropTypes.array,
  getPopupContainer: PropTypes.func,
  visible: PropTypes.bool,
  defaultVisible: PropTypes.bool
};
Dropdown.defaultProps = {
  minOverlayWidthMatchTrigger: true,
  prefixCls: 'rc-dropdown',
  trigger: ['hover'],
  showAction: [],
  hideAction: [],
  overlayClassName: '',
  overlayStyle: {},
  defaultVisible: false,
  onVisibleChange: function onVisibleChange() {},

  placement: 'bottomLeft'
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onClick = function (e) {
    var props = _this2.props;
    var overlayProps = props.overlay.props;
    // do no call onVisibleChange, if you need click to hide, use onClick and control visible
    if (!('visible' in props)) {
      _this2.setState({
        visible: false
      });
    }
    if (props.onOverlayClick) {
      props.onOverlayClick(e);
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  };

  this.onVisibleChange = function (visible) {
    var props = _this2.props;
    if (!('visible' in props)) {
      _this2.setState({
        visible: visible
      });
    }
    props.onVisibleChange(visible);
  };

  this.afterVisibleChange = function (visible) {
    if (visible && _this2.props.minOverlayWidthMatchTrigger) {
      var overlayNode = _this2.getPopupDomNode();
      var rootNode = ReactDOM.findDOMNode(_this2);
      if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.minWidth = rootNode.offsetWidth + 'px';
        if (_this2.trigger && _this2.trigger._component && _this2.trigger._component.alignInstance) {
          _this2.trigger._component.alignInstance.forceAlign();
        }
      }
    }
  };

  this.saveTrigger = function (node) {
    _this2.trigger = node;
  };
};

export default Dropdown;