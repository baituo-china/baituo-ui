'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _trigger = require('../trigger');

var _trigger2 = _interopRequireDefault(_trigger);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _util = require('./util');

var _spin = require('../../spin');

var _spin2 = _interopRequireDefault(_spin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_trigger2['default'].displayName = 'Trigger';

var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var SelectTrigger = function (_Component) {
  (0, _inherits3['default'])(SelectTrigger, _Component);

  function SelectTrigger() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, SelectTrigger);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = SelectTrigger.__proto__ || Object.getPrototypeOf(SelectTrigger)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dropdownWidth: null
    }, _this.setDropdownWidth = function () {
      var width = _reactDom2['default'].findDOMNode(_this).offsetWidth;
      if (width !== _this.state.dropdownWidth) {
        _this.setState({ dropdownWidth: width });
      }
    }, _this.getInnerMenu = function () {
      return _this.dropdownMenuRef && _this.dropdownMenuRef.menuRef;
    }, _this.getFilterInput = function () {
      return _this.dropdownMenuRef && _this.dropdownMenuRef.filterRef;
    }, _this.getPopupDOMNode = function () {
      return _this.triggerRef.getPopupDomNode();
    }, _this.getDropdownElement = function (newProps) {
      var props = _this.props;
      var loading = props.loading;
      if (typeof loading === 'boolean') {
        loading = {
          spinning: loading
        };
      }
      return _react2['default'].createElement(
        _spin2['default'],
        loading,
        _react2['default'].createElement(_DropdownMenu2['default'], (0, _extends3['default'])({
          ref: (0, _util.saveRef)(_this, 'dropdownMenuRef')
        }, newProps, {
          prefixCls: _this.getDropdownPrefixCls(),
          onMenuSelect: props.onMenuSelect,
          onMenuDeselect: props.onMenuDeselect,
          onPopupScroll: props.onPopupScroll,
          onKeyDown: props.onKeyDown,
          value: props.value,
          placeholder: props.filterPlaceholder,
          checkAll: props.checkAll,
          backfillValue: props.backfillValue,
          firstActiveValue: props.firstActiveValue,
          defaultActiveFirstOption: props.defaultActiveFirstOption,
          dropdownMenuStyle: props.dropdownMenuStyle,
          onFilterChange: props.onFilterChange,
          footer: props.footer,
          onMouseDown: props.onDropdownMouseDown
        }))
      );
    }, _this.getDropdownTransitionName = function () {
      var props = _this.props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = _this.getDropdownPrefixCls() + '-' + props.animation;
      }
      return transitionName;
    }, _this.getDropdownPrefixCls = function () {
      return _this.props.prefixCls + '-dropdown';
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(SelectTrigger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setDropdownWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setDropdownWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _popupClassName;

      var _props = this.props,
          onPopupFocus = _props.onPopupFocus,
          props = (0, _objectWithoutProperties3['default'])(_props, ['onPopupFocus']);
      var multiple = props.multiple,
          visible = props.visible,
          inputValue = props.inputValue,
          dropdownAlign = props.dropdownAlign,
          disabled = props.disabled,
          showSearch = props.showSearch,
          dropdownClassName = props.dropdownClassName,
          dropdownStyle = props.dropdownStyle,
          dropdownMatchSelectWidth = props.dropdownMatchSelectWidth,
          filter = props.filter,
          filterValue = props.filterValue;

      var dropdownPrefixCls = this.getDropdownPrefixCls();
      var popupClassName = (_popupClassName = {}, (0, _defineProperty3['default'])(_popupClassName, dropdownClassName, !!dropdownClassName), (0, _defineProperty3['default'])(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), _popupClassName);
      var popupElement = this.getDropdownElement({
        menuItems: props.options,
        onPopupFocus: onPopupFocus,
        multiple: multiple,
        inputValue: inputValue,
        visible: visible,
        filter: filter,
        filterValue: filterValue
      });

      var popupStyle = (0, _extends3['default'])({}, dropdownStyle);
      var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
      if (this.state.dropdownWidth && !popupStyle[widthProp]) {
        popupStyle[widthProp] = this.state.dropdownWidth + 'px';
      }

      return _react2['default'].createElement(
        _trigger2['default'],
        (0, _extends3['default'])({}, props, {
          action: disabled ? [] : ['click'],
          ref: (0, _util.saveRef)(this, 'triggerRef'),
          popupPlacement: props.popupPlacement,
          builtinPlacements: props.builtinPlacements || BUILT_IN_PLACEMENTS,
          prefixCls: dropdownPrefixCls,
          popupTransitionName: this.getDropdownTransitionName(),
          onPopupVisibleChange: props.onDropdownVisibleChange,
          popup: popupElement,
          popupAlign: dropdownAlign,
          popupVisible: visible,
          getPopupContainer: props.getPopupContainer,
          popupClassName: (0, _classnames2['default'])(popupClassName),
          popupStyle: popupStyle
        }),
        props.children
      );
    }
  }]);
  return SelectTrigger;
}(_react.Component);

SelectTrigger.propTypes = {
  onPopupFocus: _propTypes2['default'].func,
  onPopupScroll: _propTypes2['default'].func,
  dropdownMatchSelectWidth: _propTypes2['default'].bool,
  dropdownAlign: _propTypes2['default'].object,
  visible: _propTypes2['default'].bool,
  disabled: _propTypes2['default'].bool,
  showSearch: _propTypes2['default'].bool,
  dropdownClassName: _propTypes2['default'].string,
  onDropdownMouseDown: _propTypes2['default'].any,
  dropdownStyle: _propTypes2['default'].any,
  multiple: _propTypes2['default'].bool,
  inputValue: _propTypes2['default'].string,
  filterOption: _propTypes2['default'].any,
  options: _propTypes2['default'].any,
  prefixCls: _propTypes2['default'].string,
  popupClassName: _propTypes2['default'].string,
  popupPlacement: _propTypes2['default'].string,
  children: _propTypes2['default'].any,
  filter: _propTypes2['default'].bool,
  builtinPlacements: _propTypes2['default'].any,
  getRootDomNode: _propTypes2['default'].func,
  loading: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
  onKeyDown: _propTypes2['default'].func
};
SelectTrigger.defaultProps = {
  popupPlacement: 'bottomLeft',
  loading: false
};
exports['default'] = SelectTrigger;


SelectTrigger.displayName = 'SelectTrigger';
module.exports = exports['default'];