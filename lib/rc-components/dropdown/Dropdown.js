'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _reactDom2 = _interopRequireDefault(_reactDom);

var _trigger = require('../trigger');

var _trigger2 = _interopRequireDefault(_trigger);

var _placements = require('./placements');

var _placements2 = _interopRequireDefault(_placements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Dropdown = function (_Component) {
  (0, _inherits3['default'])(Dropdown, _Component);

  function Dropdown(props) {
    (0, _classCallCheck3['default'])(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

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

  (0, _createClass3['default'])(Dropdown, [{
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
      return (0, _react.cloneElement)(overlay, extraOverlayProps);
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
          otherProps = (0, _objectWithoutProperties3['default'])(_props2, ['prefixCls', 'children', 'transitionName', 'animation', 'align', 'placement', 'getPopupContainer', 'showAction', 'hideAction', 'overlayClassName', 'overlayStyle', 'trigger']);

      return _react2['default'].createElement(
        _trigger2['default'],
        (0, _extends3['default'])({}, otherProps, {
          prefixCls: prefixCls,
          ref: this.saveTrigger,
          popupClassName: overlayClassName,
          popupStyle: overlayStyle,
          builtinPlacements: _placements2['default'],
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
}(_react.Component);

Dropdown.propTypes = {
  minOverlayWidthMatchTrigger: _propTypes2['default'].bool,
  onVisibleChange: _propTypes2['default'].func,
  onOverlayClick: _propTypes2['default'].func,
  prefixCls: _propTypes2['default'].string,
  children: _propTypes2['default'].any,
  transitionName: _propTypes2['default'].string,
  overlayClassName: _propTypes2['default'].string,
  animation: _propTypes2['default'].any,
  align: _propTypes2['default'].object,
  overlayStyle: _propTypes2['default'].object,
  placement: _propTypes2['default'].string,
  overlay: _propTypes2['default'].node,
  trigger: _propTypes2['default'].array,
  showAction: _propTypes2['default'].array,
  hideAction: _propTypes2['default'].array,
  getPopupContainer: _propTypes2['default'].func,
  visible: _propTypes2['default'].bool,
  defaultVisible: _propTypes2['default'].bool
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
      var rootNode = _reactDom2['default'].findDOMNode(_this2);
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

exports['default'] = Dropdown;
module.exports = exports['default'];