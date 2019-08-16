import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Align from '../../align';
import Animate from '../../animate';
import PopupInner from './PopupInner';
import LazyRenderBox from './LazyRenderBox';
import { saveRef } from './utils';

var Popup = function (_Component) {
  _inherits(Popup, _Component);

  function Popup(props) {
    _classCallCheck(this, Popup);

    var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      // Used for stretch
      stretchChecked: false,
      targetWidth: undefined,
      targetHeight: undefined
    };

    _this.savePopupRef = saveRef.bind(_this, 'popupInstance');
    _this.saveAlignRef = saveRef.bind(_this, 'alignInstance');
    return _this;
  }

  _createClass(Popup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootNode = this.getPopupDomNode();
      this.setStretchSize();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setStretchSize();
    }

    // Record size if stretch needed

  }, {
    key: 'getPopupDomNode',
    value: function getPopupDomNode() {
      return ReactDOM.findDOMNode(this.popupInstance);
    }
  }, {
    key: 'getMaskTransitionName',
    value: function getMaskTransitionName() {
      var props = this.props;
      var transitionName = props.maskTransitionName;
      var animation = props.maskAnimation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    }
  }, {
    key: 'getTransitionName',
    value: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = props.prefixCls + '-' + props.animation;
      }
      return transitionName;
    }
  }, {
    key: 'getClassName',
    value: function getClassName(currentAlignClassName) {
      return this.props.prefixCls + ' ' + this.props.className + ' ' + currentAlignClassName;
    }
  }, {
    key: 'getPopupElement',
    value: function getPopupElement() {
      var savePopupRef = this.savePopupRef;
      var _state = this.state,
          stretchChecked = _state.stretchChecked,
          targetHeight = _state.targetHeight,
          targetWidth = _state.targetWidth;
      var _props = this.props,
          align = _props.align,
          visible = _props.visible,
          prefixCls = _props.prefixCls,
          style = _props.style,
          getClassNameFromAlign = _props.getClassNameFromAlign,
          destroyPopupOnHide = _props.destroyPopupOnHide,
          stretch = _props.stretch,
          children = _props.children,
          onMouseEnter = _props.onMouseEnter,
          onMouseLeave = _props.onMouseLeave;

      var className = this.getClassName(this.currentAlignClassName || getClassNameFromAlign(align));
      var hiddenClassName = prefixCls + '-hidden';

      if (!visible) {
        this.currentAlignClassName = null;
      }

      var sizeStyle = {};
      if (stretch) {
        if (stretchChecked) {
          // Stretch with target
          if (stretch.indexOf('height') !== -1) {
            sizeStyle.height = targetHeight;
          } else if (stretch.indexOf('minHeight') !== -1) {
            sizeStyle.minHeight = targetHeight;
          }
          if (stretch.indexOf('width') !== -1) {
            sizeStyle.width = targetWidth;
          } else if (stretch.indexOf('minWidth') !== -1) {
            sizeStyle.minWidth = targetWidth;
          }
        } else {
          // Do nothing when stretch not ready
          return null;
        }
      }

      var newStyle = _extends({}, sizeStyle, style, this.getZIndexStyle());

      var popupInnerProps = {
        className: className,
        prefixCls: prefixCls,
        ref: savePopupRef,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        style: newStyle
      };
      if (destroyPopupOnHide) {
        return React.createElement(
          Animate,
          {
            component: '',
            exclusive: true,
            transitionAppear: true,
            transitionName: this.getTransitionName()
          },
          visible ? React.createElement(
            Align,
            {
              target: this.getTarget,
              key: 'popup',
              ref: this.saveAlignRef,
              monitorWindowResize: true,
              hidden: !visible,
              childrenProps: { hidden: 'hidden' },
              align: align,
              onAlign: this.onAlign
            },
            React.createElement(
              PopupInner,
              popupInnerProps,
              children
            )
          ) : null
        );
      }
      return React.createElement(
        Animate,
        {
          component: '',
          exclusive: true,
          transitionAppear: true,
          transitionName: this.getTransitionName(),
          hiddenProp: 'hidden'
        },
        React.createElement(
          Align,
          {
            target: this.getTarget,
            key: 'popup',
            ref: this.saveAlignRef,
            monitorWindowResize: true,
            hidden: !visible,
            childrenProps: { hidden: 'hidden' },
            disabled: !visible,
            align: align,
            onAlign: this.onAlign
          },
          React.createElement(
            PopupInner,
            _extends({
              hiddenClassName: hiddenClassName
            }, popupInnerProps),
            children
          )
        )
      );
    }
  }, {
    key: 'getZIndexStyle',
    value: function getZIndexStyle() {
      var style = {};
      var props = this.props;
      if (props.zIndex !== undefined) {
        style.zIndex = props.zIndex;
      }
      return style;
    }
  }, {
    key: 'getMaskElement',
    value: function getMaskElement() {
      var props = this.props;
      var maskElement = void 0;
      if (props.mask) {
        var maskTransition = this.getMaskTransitionName();
        maskElement = React.createElement(LazyRenderBox, {
          style: this.getZIndexStyle(),
          key: 'mask',
          className: props.prefixCls + '-mask',
          hiddenClassName: props.prefixCls + '-mask-hidden',
          hidden: !props.visible
        });
        if (maskTransition) {
          maskElement = React.createElement(
            Animate,
            {
              key: 'mask',
              hiddenProp: 'hidden',
              transitionAppear: true,
              component: '',
              transitionName: maskTransition
            },
            maskElement
          );
        }
      }
      return maskElement;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.getMaskElement(),
        this.getPopupElement()
      );
    }
  }]);

  return Popup;
}(Component);

Popup.propTypes = {
  visible: PropTypes.bool,
  style: PropTypes.object,
  getClassNameFromAlign: PropTypes.func,
  onAlign: PropTypes.func,
  getRootDomNode: PropTypes.func,
  onMouseEnter: PropTypes.func,
  align: PropTypes.any,
  destroyPopupOnHide: PropTypes.bool,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  onMouseLeave: PropTypes.func,
  stretch: PropTypes.string,
  children: PropTypes.node
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onAlign = function (popupDomNode, align) {
    var props = _this2.props;
    var currentAlignClassName = props.getClassNameFromAlign(align);
    // FIX: https://github.com/react-component/trigger/issues/56
    // FIX: https://github.com/react-component/tooltip/issues/79
    if (_this2.currentAlignClassName !== currentAlignClassName) {
      _this2.currentAlignClassName = currentAlignClassName;
      popupDomNode.className = _this2.getClassName(currentAlignClassName);
    }
    props.onAlign(popupDomNode, align);
  };

  this.setStretchSize = function () {
    var _props2 = _this2.props,
        stretch = _props2.stretch,
        getRootDomNode = _props2.getRootDomNode,
        visible = _props2.visible;
    var _state2 = _this2.state,
        stretchChecked = _state2.stretchChecked,
        targetHeight = _state2.targetHeight,
        targetWidth = _state2.targetWidth;


    if (!stretch || !visible) {
      if (stretchChecked) {
        _this2.setState({ stretchChecked: false });
      }
      return;
    }

    var $ele = getRootDomNode();
    if (!$ele) return;

    var height = $ele.offsetHeight;
    var width = $ele.offsetWidth;

    if (targetHeight !== height || targetWidth !== width || !stretchChecked) {
      _this2.setState({
        stretchChecked: true,
        targetHeight: height,
        targetWidth: width
      });
    }
  };

  this.getTarget = function () {
    return _this2.props.getRootDomNode();
  };
};

export default Popup;