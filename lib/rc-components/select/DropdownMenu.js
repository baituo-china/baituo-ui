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

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _toArray = require('../util/Children/toArray');

var _toArray2 = _interopRequireDefault(_toArray);

var _menu = require('../menu');

var _menu2 = _interopRequireDefault(_menu);

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _util = require('./util');

var _FilterInput = require('./FilterInput');

var _FilterInput2 = _interopRequireDefault(_FilterInput);

var _LocaleReceiver = require('../../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _default = require('../../locale-provider/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DropdownMenu = function (_Component) {
  (0, _inherits3['default'])(DropdownMenu, _Component);

  function DropdownMenu() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, DropdownMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.scrollActiveItemToView = function () {
      // scroll into view
      var itemComponent = (0, _reactDom.findDOMNode)(_this.firstActiveItem);
      var props = _this.props;

      if (itemComponent) {
        var scrollIntoViewOpts = {
          onlyScrollIfNeeded: true
        };
        if ((!props.value || props.value.length === 0) && props.firstActiveValue) {
          scrollIntoViewOpts.alignWithTop = true;
        }

        (0, _domScrollIntoView2['default'])(itemComponent, (0, _reactDom.findDOMNode)(_this.menuRef), scrollIntoViewOpts);
      }
    }, _this.renderCheckLabel = function (locale) {
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          checkAll = _this$props.checkAll;

      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-select-all-none' },
        _react2['default'].createElement(
          'span',
          { name: 'check-all', onClick: checkAll },
          locale.selectAll
        ),
        _react2['default'].createElement(
          'span',
          { name: 'check-none', onClick: checkAll },
          locale.selectNone
        )
      );
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(DropdownMenu, [{
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

        var selectedKeys = (0, _util.getSelectKeys)(menuItems, value);
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
              return (0, _react.cloneElement)(item, {
                ref: function ref(_ref2) {
                  _this2.firstActiveItem = _ref2;
                }
              });
            }
            return item;
          };

          clonedMenuItems = menuItems.map(function (item) {
            if (item.type.isMenuItemGroup) {
              var children = (0, _toArray2['default'])(item.props.children).map(clone);
              return (0, _react.cloneElement)(item, {}, children);
            }
            return clone(item);
          });
        }

        // clear activeKey when inputValue change
        var lastValue = value && value[value.length - 1];
        if (inputValue !== this.lastInputValue && (!lastValue || lastValue !== backfillValue)) {
          activeKeyProps.activeKey = '';
        }

        return _react2['default'].createElement(
          _menu2['default'],
          (0, _extends3['default'])({
            ref: (0, _util.saveRef)(this, 'menuRef'),
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
      return filter ? _react2['default'].createElement(_FilterInput2['default'], (0, _extends3['default'])({}, props, { ref: (0, _util.saveRef)(this, 'filterRef') })) : null;
    }
  }, {
    key: 'getFooter',
    value: function getFooter() {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          footer = _props2.footer;

      return footer ? _react2['default'].createElement(
        'div',
        { className: prefixCls + '-footer', onMouseDown: _util.preventDefaultEvent },
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
        selectOpt = _react2['default'].createElement(
          _LocaleReceiver2['default'],
          {
            componentName: 'Select',
            defaultLocale: _default2['default'].Select
          },
          this.renderCheckLabel
        );
      }
      return _react2['default'].createElement(
        'div',
        { onMouseDown: onMouseDown },
        filterInput,
        selectOpt,
        _react2['default'].createElement(
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
}(_react.Component);

DropdownMenu.propTypes = {
  defaultActiveFirstOption: _propTypes2['default'].bool,
  value: _propTypes2['default'].any,
  dropdownMenuStyle: _propTypes2['default'].object,
  multiple: _propTypes2['default'].bool,
  onPopupFocus: _propTypes2['default'].func,
  onPopupScroll: _propTypes2['default'].func,
  onMenuDeSelect: _propTypes2['default'].func,
  onMenuSelect: _propTypes2['default'].func,
  onMouseDown: _propTypes2['default'].func,
  prefixCls: _propTypes2['default'].string,
  menuItems: _propTypes2['default'].any,
  inputValue: _propTypes2['default'].string,
  visible: _propTypes2['default'].bool,
  filter: _propTypes2['default'].bool,
  checkAll: _propTypes2['default'].func,
  footer: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].string]),
  onKeyDown: _propTypes2['default'].func
};
DropdownMenu.defaultProps = {
  footer: null
};
exports['default'] = DropdownMenu;


DropdownMenu.displayName = 'DropdownMenu';
module.exports = exports['default'];