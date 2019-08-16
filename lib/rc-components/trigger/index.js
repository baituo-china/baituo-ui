'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _contains = require('../util/Dom/contains');

var _contains2 = _interopRequireDefault(_contains);

var _addEventListener = require('../../_util/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _utils = require('./utils');

var _ContainerRender = require('../util/ContainerRender');

var _ContainerRender2 = _interopRequireDefault(_ContainerRender);

var _Portal = require('../util/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function returnEmptyString() {
  return '';
}

function returnDocument() {
  return window.document;
}

var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur', 'onContextMenu'];

var IS_REACT_16 = !!_reactDom.createPortal;

var Trigger = function (_Component) {
  (0, _inherits3['default'])(Trigger, _Component);

  function Trigger(props) {
    (0, _classCallCheck3['default'])(this, Trigger);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this, props));

    _initialiseProps.call(_this);

    var popupVisible = void 0;
    if ('popupVisible' in props) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }

    _this.prevPopupVisible = popupVisible;

    _this.state = {
      popupVisible: popupVisible
    };
    return _this;
  }

  (0, _createClass3['default'])(Trigger, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      ALL_HANDLERS.forEach(function (h) {
        _this2['fire' + h] = function (e) {
          _this2.fireEvents(h, e);
        };
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate({}, {
        popupVisible: this.state.popupVisible
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var popupVisible = _ref.popupVisible;

      if (popupVisible !== undefined) {
        this.setState({
          popupVisible: popupVisible
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_, prevState) {
      var props = this.props;
      var state = this.state;
      var triggerAfterPopupVisibleChange = function triggerAfterPopupVisibleChange() {
        if (prevState.popupVisible !== state.popupVisible) {
          props.afterPopupVisibleChange(state.popupVisible);
        }
      };
      if (!IS_REACT_16) {
        this.renderComponent(null, triggerAfterPopupVisibleChange);
      }

      this.prevPopupVisible = prevState.popupVisible;

      // We must listen to `mousedown` or `touchstart`, edge case:
      // https://github.com/react-component/calendar/issues/250
      // https://github.com/react-component/trigger/issues/50
      if (state.popupVisible) {
        var currentDocument = void 0;
        if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextMenuToShow())) {
          currentDocument = props.getDocument();
          this.clickOutsideHandler = (0, _addEventListener2['default'])(currentDocument, 'mousedown', this.onDocumentClick);
        }
        // always hide on mobile
        if (!this.touchOutsideHandler) {
          currentDocument = currentDocument || props.getDocument();
          this.touchOutsideHandler = (0, _addEventListener2['default'])(currentDocument, 'touchstart', this.onDocumentClick);
        }
        // close popup when trigger type contains 'onContextMenu' and document is scrolling.
        if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
          currentDocument = currentDocument || props.getDocument();
          this.contextMenuOutsideHandler1 = (0, _addEventListener2['default'])(currentDocument, 'scroll', this.onContextMenuClose);
        }
        // close popup when trigger type contains 'onContextMenu' and window is blur.
        if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
          this.contextMenuOutsideHandler2 = (0, _addEventListener2['default'])(window, 'blur', this.onContextMenuClose);
        }
        return;
      }

      this.clearOutsideHandler();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearDelayTimer();
      this.clearOutsideHandler();
    }
  }, {
    key: 'getPopupDomNode',
    value: function getPopupDomNode() {
      // for test
      if (this._component && this._component.getPopupDomNode) {
        return this._component.getPopupDomNode();
      }
      return null;
    }
  }, {
    key: 'getPopupAlign',
    value: function getPopupAlign() {
      var props = this.props;
      var popupPlacement = props.popupPlacement,
          popupAlign = props.popupAlign,
          builtinPlacements = props.builtinPlacements;

      if (popupPlacement && builtinPlacements) {
        return (0, _utils.getAlignFromPlacement)(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    }
  }, {
    key: 'setPopupVisible',
    value: function setPopupVisible(popupVisible) {
      this.clearDelayTimer();
      if (this.state.popupVisible !== popupVisible) {
        if (!('popupVisible' in this.props)) {
          this.setState({
            popupVisible: popupVisible
          });
        }
        this.props.onPopupVisibleChange(popupVisible);
      }
    }
  }, {
    key: 'delaySetPopupVisible',
    value: function delaySetPopupVisible(visible, delayS) {
      var _this3 = this;

      var delay = delayS * 1000;
      this.clearDelayTimer();
      if (delay) {
        this.delayTimer = setTimeout(function () {
          _this3.setPopupVisible(visible);
          _this3.clearDelayTimer();
        }, delay);
      } else {
        this.setPopupVisible(visible);
      }
    }
  }, {
    key: 'clearDelayTimer',
    value: function clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    }
  }, {
    key: 'clearOutsideHandler',
    value: function clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }

      if (this.contextMenuOutsideHandler1) {
        this.contextMenuOutsideHandler1.remove();
        this.contextMenuOutsideHandler1 = null;
      }

      if (this.contextMenuOutsideHandler2) {
        this.contextMenuOutsideHandler2.remove();
        this.contextMenuOutsideHandler2 = null;
      }

      if (this.touchOutsideHandler) {
        this.touchOutsideHandler.remove();
        this.touchOutsideHandler = null;
      }
    }
  }, {
    key: 'createTwoChains',
    value: function createTwoChains(event) {
      var childPros = this.props.children.props;
      var props = this.props;
      if (childPros[event] && props[event]) {
        return this['fire' + event];
      }
      return childPros[event] || props[event];
    }
  }, {
    key: 'isClickToShow',
    value: function isClickToShow() {
      var _props = this.props,
          action = _props.action,
          showAction = _props.showAction;

      return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
    }
  }, {
    key: 'isContextMenuToShow',
    value: function isContextMenuToShow() {
      var _props2 = this.props,
          action = _props2.action,
          showAction = _props2.showAction;

      return action.indexOf('contextMenu') !== -1 || showAction.indexOf('contextMenu') !== -1;
    }
  }, {
    key: 'isClickToHide',
    value: function isClickToHide() {
      var _props3 = this.props,
          action = _props3.action,
          hideAction = _props3.hideAction;

      return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
    }
  }, {
    key: 'isMouseEnterToShow',
    value: function isMouseEnterToShow() {
      var _props4 = this.props,
          action = _props4.action,
          showAction = _props4.showAction;

      return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
    }
  }, {
    key: 'isMouseLeaveToHide',
    value: function isMouseLeaveToHide() {
      var _props5 = this.props,
          action = _props5.action,
          hideAction = _props5.hideAction;

      return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
    }
  }, {
    key: 'isFocusToShow',
    value: function isFocusToShow() {
      var _props6 = this.props,
          action = _props6.action,
          showAction = _props6.showAction;

      return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
    }
  }, {
    key: 'isBlurToHide',
    value: function isBlurToHide() {
      var _props7 = this.props,
          action = _props7.action,
          hideAction = _props7.hideAction;

      return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
    }
  }, {
    key: 'forcePopupAlign',
    value: function forcePopupAlign() {
      if (this.state.popupVisible && this._component && this._component.alignInstance) {
        this._component.alignInstance.forceAlign();
      }
    }
  }, {
    key: 'fireEvents',
    value: function fireEvents(type, e) {
      var childCallback = this.props.children.props[type];
      if (childCallback) {
        childCallback(e);
      }
      var callback = this.props[type];
      if (callback) {
        callback(e);
      }
    }
  }, {
    key: 'close',
    value: function close() {
      this.setPopupVisible(false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var popupVisible = this.state.popupVisible;

      var props = this.props;
      var children = props.children;
      var child = _react.Children.only(children);
      var newChildProps = { key: 'trigger' };

      if (this.isContextMenuToShow()) {
        newChildProps.onContextMenu = this.onContextMenu;
      } else {
        newChildProps.onContextMenu = this.createTwoChains('onContextMenu');
      }

      if (this.isClickToHide() || this.isClickToShow()) {
        newChildProps.onClick = this.onClick;
        newChildProps.onMouseDown = this.onMouseDown;
        newChildProps.onTouchStart = this.onTouchStart;
      } else {
        newChildProps.onClick = this.createTwoChains('onClick');
        newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
        newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
      }
      if (this.isMouseEnterToShow()) {
        newChildProps.onMouseEnter = this.onMouseEnter;
      } else {
        newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
      }
      if (this.isMouseLeaveToHide()) {
        newChildProps.onMouseLeave = this.onMouseLeave;
      } else {
        newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
      }
      if (this.isFocusToShow() || this.isBlurToHide()) {
        newChildProps.onFocus = this.onFocus;
        newChildProps.onBlur = this.onBlur;
      } else {
        newChildProps.onFocus = this.createTwoChains('onFocus');
        newChildProps.onBlur = this.createTwoChains('onBlur');
      }

      var trigger = (0, _react.cloneElement)(child, newChildProps);

      if (!IS_REACT_16) {
        return _react2['default'].createElement(
          _ContainerRender2['default'],
          {
            parent: this,
            visible: popupVisible,
            autoMount: false,
            forceRender: props.forceRender,
            getComponent: this.getComponent,
            getContainer: this.getContainer
          },
          function (_ref2) {
            var renderComponent = _ref2.renderComponent;

            _this4.renderComponent = renderComponent;
            return trigger;
          }
        );
      }

      var portal = void 0;
      // prevent unmounting after it's rendered
      if (popupVisible || this._component || props.forceRender) {
        portal = _react2['default'].createElement(
          _Portal2['default'],
          {
            key: 'portal',
            getContainer: this.getContainer,
            didUpdate: this.handlePortalUpdate
          },
          this.getComponent()
        );
      }

      return [trigger, portal];
    }
  }]);
  return Trigger;
}(_react.Component);

Trigger.propTypes = {
  children: _propTypes2['default'].any,
  action: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
  showAction: _propTypes2['default'].any,
  hideAction: _propTypes2['default'].any,
  getPopupClassNameFromAlign: _propTypes2['default'].any,
  onPopupVisibleChange: _propTypes2['default'].func,
  afterPopupVisibleChange: _propTypes2['default'].func,
  popup: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func]).isRequired,
  popupStyle: _propTypes2['default'].object,
  prefixCls: _propTypes2['default'].string,
  popupClassName: _propTypes2['default'].string,
  popupPlacement: _propTypes2['default'].string,
  builtinPlacements: _propTypes2['default'].object,
  popupTransitionName: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
  popupAnimation: _propTypes2['default'].any,
  mouseEnterDelay: _propTypes2['default'].number,
  mouseLeaveDelay: _propTypes2['default'].number,
  zIndex: _propTypes2['default'].number,
  focusDelay: _propTypes2['default'].number,
  blurDelay: _propTypes2['default'].number,
  getPopupContainer: _propTypes2['default'].func,
  getDocument: _propTypes2['default'].func,
  getRootDomNode: _propTypes2['default'].func,
  forceRender: _propTypes2['default'].bool,
  destroyPopupOnHide: _propTypes2['default'].bool,
  mask: _propTypes2['default'].bool,
  maskClosable: _propTypes2['default'].bool,
  onPopupAlign: _propTypes2['default'].func,
  popupAlign: _propTypes2['default'].object,
  popupVisible: _propTypes2['default'].bool,
  defaultPopupVisible: _propTypes2['default'].bool,
  maskTransitionName: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
  maskAnimation: _propTypes2['default'].string,
  stretch: _propTypes2['default'].string
};
Trigger.defaultProps = {
  prefixCls: 'rc-trigger-popup',
  getPopupClassNameFromAlign: returnEmptyString,
  getDocument: returnDocument,
  onPopupVisibleChange: _noop2['default'],
  afterPopupVisibleChange: _noop2['default'],
  onPopupAlign: _noop2['default'],
  popupClassName: '',
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0.1,
  focusDelay: 0,
  blurDelay: 0.15,
  popupStyle: {},
  destroyPopupOnHide: false,
  popupAlign: {},
  defaultPopupVisible: false,
  mask: false,
  maskClosable: true,
  action: [],
  showAction: [],
  hideAction: []
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.onMouseEnter = function (e) {
    _this5.fireEvents('onMouseEnter', e);
    _this5.delaySetPopupVisible(true, _this5.props.mouseEnterDelay);
  };

  this.onMouseLeave = function (e) {
    _this5.fireEvents('onMouseLeave', e);
    _this5.delaySetPopupVisible(false, _this5.props.mouseLeaveDelay);
  };

  this.onPopupMouseEnter = function () {
    _this5.clearDelayTimer();
  };

  this.onPopupMouseLeave = function (e) {
    // https://github.com/react-component/trigger/pull/13
    // react bug?
    if (e.relatedTarget && !e.relatedTarget.setTimeout && _this5._component && _this5._component.getPopupDomNode && (0, _contains2['default'])(_this5._component.getPopupDomNode(), e.relatedTarget)) {
      return;
    }
    _this5.delaySetPopupVisible(false, _this5.props.mouseLeaveDelay);
  };

  this.onFocus = function (e) {
    _this5.fireEvents('onFocus', e);
    // incase focusin and focusout
    _this5.clearDelayTimer();
    if (_this5.isFocusToShow()) {
      _this5.focusTime = Date.now();
      _this5.delaySetPopupVisible(true, _this5.props.focusDelay);
    }
  };

  this.onMouseDown = function (e) {
    _this5.fireEvents('onMouseDown', e);
    _this5.preClickTime = Date.now();
  };

  this.onTouchStart = function (e) {
    _this5.fireEvents('onTouchStart', e);
    _this5.preTouchTime = Date.now();
  };

  this.onBlur = function (e) {
    _this5.fireEvents('onBlur', e);
    _this5.clearDelayTimer();
    if (_this5.isBlurToHide()) {
      _this5.delaySetPopupVisible(false, _this5.props.blurDelay);
    }
  };

  this.onContextMenu = function (e) {
    e.preventDefault();
    _this5.fireEvents('onContextMenu', e);
    _this5.setPopupVisible(true);
  };

  this.onContextMenuClose = function () {
    if (_this5.isContextMenuToShow()) {
      _this5.close();
    }
  };

  this.onClick = function (event) {
    _this5.fireEvents('onClick', event);
    // focus will trigger click
    if (_this5.focusTime) {
      var preTime = void 0;
      if (_this5.preClickTime && _this5.preTouchTime) {
        preTime = Math.min(_this5.preClickTime, _this5.preTouchTime);
      } else if (_this5.preClickTime) {
        preTime = _this5.preClickTime;
      } else if (_this5.preTouchTime) {
        preTime = _this5.preTouchTime;
      }
      if (Math.abs(preTime - _this5.focusTime) < 20) {
        return;
      }
      _this5.focusTime = 0;
    }
    _this5.preClickTime = 0;
    _this5.preTouchTime = 0;
    event.preventDefault();
    var nextVisible = !_this5.state.popupVisible;
    if (_this5.isClickToHide() && !nextVisible || nextVisible && _this5.isClickToShow()) {
      _this5.setPopupVisible(!_this5.state.popupVisible);
    }
  };

  this.onDocumentClick = function (event) {
    if (_this5.props.mask && !_this5.props.maskClosable) {
      return;
    }
    var target = event.target;
    var root = (0, _reactDom.findDOMNode)(_this5);
    var popupNode = _this5.getPopupDomNode();
    if (!(0, _contains2['default'])(root, target) && !(0, _contains2['default'])(popupNode, target)) {
      _this5.close();
    }
  };

  this.getRootDomNode = function () {
    var getRootDomNode = _this5.props.getRootDomNode;

    if (getRootDomNode) {
      return getRootDomNode();
    } else {
      return (0, _reactDom.findDOMNode)(_this5);
    }
  };

  this.getPopupClassFromAlign = function (align) {
    var className = [];
    var props = _this5.props;
    var popupPlacement = props.popupPlacement,
        builtinPlacements = props.builtinPlacements,
        prefixCls = props.prefixCls;

    if (popupPlacement && builtinPlacements) {
      className.push((0, _utils.getPopupClassNameFromAlign)(builtinPlacements, prefixCls, align));
    }
    if (props.getPopupClassNameFromAlign) {
      className.push(props.getPopupClassNameFromAlign(align));
    }
    return className.join(' ');
  };

  this.getComponent = function () {
    var _props8 = _this5.props,
        prefixCls = _props8.prefixCls,
        destroyPopupOnHide = _props8.destroyPopupOnHide,
        popupClassName = _props8.popupClassName,
        action = _props8.action,
        onPopupAlign = _props8.onPopupAlign,
        popupAnimation = _props8.popupAnimation,
        popupTransitionName = _props8.popupTransitionName,
        popupStyle = _props8.popupStyle,
        mask = _props8.mask,
        maskAnimation = _props8.maskAnimation,
        maskTransitionName = _props8.maskTransitionName,
        zIndex = _props8.zIndex,
        popup = _props8.popup,
        stretch = _props8.stretch;
    var state = _this5.state;


    var align = _this5.getPopupAlign();

    var mouseProps = {};
    if (_this5.isMouseEnterToShow()) {
      mouseProps.onMouseEnter = _this5.onPopupMouseEnter;
    }
    if (_this5.isMouseLeaveToHide()) {
      mouseProps.onMouseLeave = _this5.onPopupMouseLeave;
    }

    return _react2['default'].createElement(
      _Popup2['default'],
      (0, _extends3['default'])({
        prefixCls: prefixCls,
        destroyPopupOnHide: destroyPopupOnHide,
        visible: state.popupVisible,
        className: popupClassName,
        action: action,
        align: align,
        onAlign: onPopupAlign,
        animation: popupAnimation,
        getClassNameFromAlign: _this5.getPopupClassFromAlign
      }, mouseProps, {
        stretch: stretch,
        getRootDomNode: _this5.getRootDomNode,
        style: popupStyle,
        mask: mask,
        zIndex: zIndex,
        transitionName: popupTransitionName,
        maskAnimation: maskAnimation,
        maskTransitionName: maskTransitionName,
        ref: _this5.savePopup
      }),
      typeof popup === 'function' ? popup() : popup
    );
  };

  this.getContainer = function () {
    var props = _this5.props;

    var popupContainer = document.createElement('div');
    // Make sure default popup container will never cause scrollbar appearing
    // https://github.com/react-component/trigger/issues/41
    popupContainer.style.position = 'absolute';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.width = '100%';
    var mountNode = props.getPopupContainer ? props.getPopupContainer((0, _reactDom.findDOMNode)(_this5)) : props.getDocument().body;
    mountNode.appendChild(popupContainer);
    return popupContainer;
  };

  this.handlePortalUpdate = function () {
    if (_this5.prevPopupVisible !== _this5.state.popupVisible) {
      _this5.props.afterPopupVisibleChange(_this5.state.popupVisible);
    }
  };

  this.savePopup = function (node) {
    _this5._component = node;
  };
};

exports['default'] = Trigger;
module.exports = exports['default'];