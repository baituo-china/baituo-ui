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

var _reactDom2 = _interopRequireDefault(_reactDom);

var _align = require('../../align');

var _align2 = _interopRequireDefault(_align);

var _animate = require('../../animate');

var _animate2 = _interopRequireDefault(_animate);

var _PopupInner = require('./PopupInner');

var _PopupInner2 = _interopRequireDefault(_PopupInner);

var _LazyRenderBox = require('./LazyRenderBox');

var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Popup = function (_Component) {
  (0, _inherits3['default'])(Popup, _Component);

  function Popup(props) {
    (0, _classCallCheck3['default'])(this, Popup);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      // Used for stretch
      stretchChecked: false,
      targetWidth: undefined,
      targetHeight: undefined
    };

    _this.savePopupRef = _utils.saveRef.bind(_this, 'popupInstance');
    _this.saveAlignRef = _utils.saveRef.bind(_this, 'alignInstance');
    return _this;
  }

  (0, _createClass3['default'])(Popup, [{
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
      return _reactDom2['default'].findDOMNode(this.popupInstance);
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

      var newStyle = (0, _extends3['default'])({}, sizeStyle, style, this.getZIndexStyle());

      var popupInnerProps = {
        className: className,
        prefixCls: prefixCls,
        ref: savePopupRef,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        style: newStyle
      };
      if (destroyPopupOnHide) {
        return _react2['default'].createElement(
          _animate2['default'],
          {
            component: '',
            exclusive: true,
            transitionAppear: true,
            transitionName: this.getTransitionName()
          },
          visible ? _react2['default'].createElement(
            _align2['default'],
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
            _react2['default'].createElement(
              _PopupInner2['default'],
              popupInnerProps,
              children
            )
          ) : null
        );
      }
      return _react2['default'].createElement(
        _animate2['default'],
        {
          component: '',
          exclusive: true,
          transitionAppear: true,
          transitionName: this.getTransitionName(),
          hiddenProp: 'hidden'
        },
        _react2['default'].createElement(
          _align2['default'],
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
          _react2['default'].createElement(
            _PopupInner2['default'],
            (0, _extends3['default'])({
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
        maskElement = _react2['default'].createElement(_LazyRenderBox2['default'], {
          style: this.getZIndexStyle(),
          key: 'mask',
          className: props.prefixCls + '-mask',
          hiddenClassName: props.prefixCls + '-mask-hidden',
          hidden: !props.visible
        });
        if (maskTransition) {
          maskElement = _react2['default'].createElement(
            _animate2['default'],
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
      return _react2['default'].createElement(
        'div',
        null,
        this.getMaskElement(),
        this.getPopupElement()
      );
    }
  }]);
  return Popup;
}(_react.Component);

Popup.propTypes = {
  visible: _propTypes2['default'].bool,
  style: _propTypes2['default'].object,
  getClassNameFromAlign: _propTypes2['default'].func,
  onAlign: _propTypes2['default'].func,
  getRootDomNode: _propTypes2['default'].func,
  onMouseEnter: _propTypes2['default'].func,
  align: _propTypes2['default'].any,
  destroyPopupOnHide: _propTypes2['default'].bool,
  className: _propTypes2['default'].string,
  prefixCls: _propTypes2['default'].string,
  onMouseLeave: _propTypes2['default'].func,
  stretch: _propTypes2['default'].string,
  children: _propTypes2['default'].node
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

exports['default'] = Popup;
module.exports = exports['default'];