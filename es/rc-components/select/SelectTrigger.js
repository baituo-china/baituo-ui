import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Trigger from '../trigger';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropdownMenu from './DropdownMenu';
import ReactDOM from 'react-dom';
import { isSingleMode, saveRef } from './util';
import Spin from '../../spin';

Trigger.displayName = 'Trigger';

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
  _inherits(SelectTrigger, _Component);

  function SelectTrigger() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectTrigger);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectTrigger.__proto__ || Object.getPrototypeOf(SelectTrigger)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dropdownWidth: null
    }, _this.setDropdownWidth = function () {
      var width = ReactDOM.findDOMNode(_this).offsetWidth;
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
      return React.createElement(
        Spin,
        loading,
        React.createElement(DropdownMenu, _extends({
          ref: saveRef(_this, 'dropdownMenuRef')
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectTrigger, [{
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
          props = _objectWithoutProperties(_props, ['onPopupFocus']);

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
      var popupClassName = (_popupClassName = {}, _defineProperty(_popupClassName, dropdownClassName, !!dropdownClassName), _defineProperty(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), _popupClassName);
      var popupElement = this.getDropdownElement({
        menuItems: props.options,
        onPopupFocus: onPopupFocus,
        multiple: multiple,
        inputValue: inputValue,
        visible: visible,
        filter: filter,
        filterValue: filterValue
      });

      var popupStyle = _extends({}, dropdownStyle);
      var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
      if (this.state.dropdownWidth && !popupStyle[widthProp]) {
        popupStyle[widthProp] = this.state.dropdownWidth + 'px';
      }

      return React.createElement(
        Trigger,
        _extends({}, props, {
          action: disabled ? [] : ['click'],
          ref: saveRef(this, 'triggerRef'),
          popupPlacement: props.popupPlacement,
          builtinPlacements: props.builtinPlacements || BUILT_IN_PLACEMENTS,
          prefixCls: dropdownPrefixCls,
          popupTransitionName: this.getDropdownTransitionName(),
          onPopupVisibleChange: props.onDropdownVisibleChange,
          popup: popupElement,
          popupAlign: dropdownAlign,
          popupVisible: visible,
          getPopupContainer: props.getPopupContainer,
          popupClassName: classnames(popupClassName),
          popupStyle: popupStyle
        }),
        props.children
      );
    }
  }]);

  return SelectTrigger;
}(Component);

SelectTrigger.propTypes = {
  onPopupFocus: PropTypes.func,
  onPopupScroll: PropTypes.func,
  dropdownMatchSelectWidth: PropTypes.bool,
  dropdownAlign: PropTypes.object,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  showSearch: PropTypes.bool,
  dropdownClassName: PropTypes.string,
  onDropdownMouseDown: PropTypes.any,
  dropdownStyle: PropTypes.any,
  multiple: PropTypes.bool,
  inputValue: PropTypes.string,
  filterOption: PropTypes.any,
  options: PropTypes.any,
  prefixCls: PropTypes.string,
  popupClassName: PropTypes.string,
  popupPlacement: PropTypes.string,
  children: PropTypes.any,
  filter: PropTypes.bool,
  builtinPlacements: PropTypes.any,
  getRootDomNode: PropTypes.func,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onKeyDown: PropTypes.func
};
SelectTrigger.defaultProps = {
  popupPlacement: 'bottomLeft',
  loading: false
};
export default SelectTrigger;


SelectTrigger.displayName = 'SelectTrigger';