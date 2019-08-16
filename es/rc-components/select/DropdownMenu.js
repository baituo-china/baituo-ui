import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import toArray from '../util/Children/toArray';
import Menu from '../menu';
import scrollIntoView from 'dom-scroll-into-view';
import { getSelectKeys, preventDefaultEvent, saveRef } from './util';
import FilterInput from './FilterInput';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import defaultLocale from '../../locale-provider/default';

var DropdownMenu = function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DropdownMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.scrollActiveItemToView = function () {
      // scroll into view
      var itemComponent = findDOMNode(_this.firstActiveItem);
      var props = _this.props;

      if (itemComponent) {
        var scrollIntoViewOpts = {
          onlyScrollIfNeeded: true
        };
        if ((!props.value || props.value.length === 0) && props.firstActiveValue) {
          scrollIntoViewOpts.alignWithTop = true;
        }

        scrollIntoView(itemComponent, findDOMNode(_this.menuRef), scrollIntoViewOpts);
      }
    }, _this.renderCheckLabel = function (locale) {
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          checkAll = _this$props.checkAll;

      return React.createElement(
        'div',
        { className: prefixCls + '-select-all-none' },
        React.createElement(
          'span',
          { name: 'check-all', onClick: checkAll },
          locale.selectAll
        ),
        React.createElement(
          'span',
          { name: 'check-none', onClick: checkAll },
          locale.selectNone
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DropdownMenu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.lastInputValue = this.props.inputValue;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollActiveItemToView();
      this.lastVisible = this.props.visible;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (!nextProps.visible) {
        this.lastVisible = false;
      }
      // freeze when hide
      return nextProps.visible;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var props = this.props;
      if (!prevProps.visible && props.visible) {
        this.scrollActiveItemToView();
      }
      this.lastVisible = props.visible;
      this.lastInputValue = props.inputValue;
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this2 = this;

      var props = this.props;
      var menuItems = props.menuItems,
          value = props.value,
          defaultActiveFirstOption = props.defaultActiveFirstOption,
          prefixCls = props.prefixCls,
          multiple = props.multiple,
          onMenuSelect = props.onMenuSelect,
          inputValue = props.inputValue,
          firstActiveValue = props.firstActiveValue,
          backfillValue = props.backfillValue;


      if (menuItems && menuItems.length) {
        var menuProps = {};
        if (multiple) {
          menuProps.onDeselect = props.onMenuDeselect;
          menuProps.onSelect = onMenuSelect;
        } else {
          menuProps.onClick = onMenuSelect;
        }

        var selectedKeys = getSelectKeys(menuItems, value);
        var activeKeyProps = {};

        var clonedMenuItems = menuItems;
        if (selectedKeys.length || firstActiveValue) {
          if (props.visible && !this.lastVisible) {
            activeKeyProps.activeKey = selectedKeys[0] || firstActiveValue;
          }
          var foundFirst = false;
          // set firstActiveItem via cloning menus
          // for scroll into view
          var clone = function clone(item) {
            if (!foundFirst && selectedKeys.indexOf(item.key) !== -1 || !foundFirst && !selectedKeys.length && firstActiveValue.indexOf(item.key) !== -1) {
              foundFirst = true;
              return cloneElement(item, {
                ref: function ref(_ref2) {
                  _this2.firstActiveItem = _ref2;
                }
              });
            }
            return item;
          };

          clonedMenuItems = menuItems.map(function (item) {
            if (item.type.isMenuItemGroup) {
              var children = toArray(item.props.children).map(clone);
              return cloneElement(item, {}, children);
            }
            return clone(item);
          });
        }

        // clear activeKey when inputValue change
        var lastValue = value && value[value.length - 1];
        if (inputValue !== this.lastInputValue && (!lastValue || lastValue !== backfillValue)) {
          activeKeyProps.activeKey = '';
        }

        return React.createElement(
          Menu,
          _extends({
            ref: saveRef(this, 'menuRef'),
            style: this.props.dropdownMenuStyle,
            defaultActiveFirst: defaultActiveFirstOption
          }, activeKeyProps, {
            multiple: multiple
          }, menuProps, {
            selectedKeys: selectedKeys,
            prefixCls: prefixCls + '-menu'
          }),
          clonedMenuItems
        );
      }
      return null;
    }
  }, {
    key: 'renderFilterInput',
    value: function renderFilterInput() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          filter = _props.filter,
          placeholder = _props.placeholder,
          onFilterChange = _props.onFilterChange,
          filterValue = _props.filterValue,
          onKeyDown = _props.onKeyDown;

      var props = {
        filterValue: filterValue,
        prefixCls: prefixCls,
        placeholder: placeholder,
        onChange: onFilterChange,
        onKeyDown: onKeyDown
      };
      return filter ? React.createElement(FilterInput, _extends({}, props, { ref: saveRef(this, 'filterRef') })) : null;
    }
  }, {
    key: 'getFooter',
    value: function getFooter() {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          footer = _props2.footer;

      return footer ? React.createElement(
        'div',
        { className: prefixCls + '-footer', onMouseDown: preventDefaultEvent },
        footer
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var renderMenu = this.renderMenu();
      var filterInput = this.renderFilterInput();
      var _props3 = this.props,
          multiple = _props3.multiple,
          menuItems = _props3.menuItems,
          checkAll = _props3.checkAll,
          onMouseDown = _props3.onMouseDown;


      var selectOpt = null;
      if (checkAll && multiple && menuItems.length && menuItems[0].key !== 'NOT_FOUND') {
        selectOpt = React.createElement(
          LocaleReceiver,
          {
            componentName: 'Select',
            defaultLocale: defaultLocale.Select
          },
          this.renderCheckLabel
        );
      }
      return React.createElement(
        'div',
        { onMouseDown: onMouseDown },
        filterInput,
        selectOpt,
        React.createElement(
          'div',
          {
            style: { overflow: 'auto' },
            onScroll: this.props.onPopupScroll,
            onFocus: this.props.onPopupFocus
          },
          renderMenu
        ),
        this.getFooter()
      );
    }
  }]);

  return DropdownMenu;
}(Component);

DropdownMenu.propTypes = {
  defaultActiveFirstOption: PropTypes.bool,
  value: PropTypes.any,
  dropdownMenuStyle: PropTypes.object,
  multiple: PropTypes.bool,
  onPopupFocus: PropTypes.func,
  onPopupScroll: PropTypes.func,
  onMenuDeSelect: PropTypes.func,
  onMenuSelect: PropTypes.func,
  onMouseDown: PropTypes.func,
  prefixCls: PropTypes.string,
  menuItems: PropTypes.any,
  inputValue: PropTypes.string,
  visible: PropTypes.bool,
  filter: PropTypes.bool,
  checkAll: PropTypes.func,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onKeyDown: PropTypes.func
};
DropdownMenu.defaultProps = {
  footer: null
};
export default DropdownMenu;


DropdownMenu.displayName = 'DropdownMenu';