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

var _arrayTreeFilter = require('array-tree-filter');

var _arrayTreeFilter2 = _interopRequireDefault(_arrayTreeFilter);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Menus = function (_Component) {
  (0, _inherits3['default'])(Menus, _Component);

  function Menus(props) {
    (0, _classCallCheck3['default'])(this, Menus);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Menus.__proto__ || Object.getPrototypeOf(Menus)).call(this, props));

    _this.saveMenuItem = function (index) {
      return function (node) {
        _this.menuItems[index] = node;
      };
    };

    _this.menuItems = {};
    return _this;
  }

  (0, _createClass3['default'])(Menus, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollActiveItemToView();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.visible && this.props.visible) {
        this.scrollActiveItemToView();
      }
    }
  }, {
    key: 'getOption',
    value: function getOption(option, menuIndex) {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          expandTrigger = _props.expandTrigger;

      var onSelect = this.props.onSelect.bind(this, option, menuIndex);
      var expandProps = {
        onClick: onSelect
      };
      var menuItemCls = prefixCls + '-menu-item';
      var hasChildren = option.children && option.children.length > 0;
      if (hasChildren || option.isLeaf === false) {
        menuItemCls += ' ' + prefixCls + '-menu-item-expand';
      }
      if (expandTrigger === 'hover' && hasChildren) {
        expandProps = {
          onMouseEnter: this.delayOnSelect.bind(this, onSelect),
          onMouseLeave: this.delayOnSelect.bind(this),
          onClick: onSelect
        };
      }
      if (this.isActiveOption(option, menuIndex)) {
        menuItemCls += ' ' + prefixCls + '-menu-item-active';
        expandProps.ref = this.saveMenuItem(menuIndex);
      }
      if (option.disabled) {
        menuItemCls += ' ' + prefixCls + '-menu-item-disabled';
      }
      if (option.loading) {
        menuItemCls += ' ' + prefixCls + '-menu-item-loading';
      }
      var title = '';
      if (option.title) {
        title = option.title;
      } else if (typeof option.label === 'string') {
        title = option.label;
      }
      return _react2['default'].createElement(
        'li',
        (0, _extends3['default'])({
          key: option.value,
          className: menuItemCls,
          title: title
        }, expandProps),
        option.label
      );
    }
  }, {
    key: 'getActiveOptions',
    value: function getActiveOptions(values) {
      var activeValue = values || this.props.activeValue;
      var options = this.props.options;
      return (0, _arrayTreeFilter2['default'])(options, function (o, level) {
        return o.value === activeValue[level];
      });
    }
  }, {
    key: 'getShowOptions',
    value: function getShowOptions() {
      var options = this.props.options;

      var result = this.getActiveOptions().map(function (activeOption) {
        return activeOption.children;
      }).filter(function (activeOption) {
        return !!activeOption;
      });
      result.unshift(options);
      return result;
    }
  }, {
    key: 'delayOnSelect',
    value: function delayOnSelect(onSelect) {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      if (typeof onSelect === 'function') {
        this.delayTimer = setTimeout(function () {
          onSelect(args);
          _this2.delayTimer = null;
        }, 150);
      }
    }
  }, {
    key: 'scrollActiveItemToView',
    value: function scrollActiveItemToView() {
      // scroll into view
      var optionsLength = this.getShowOptions().length;
      for (var i = 0; i < optionsLength; i++) {
        var itemComponent = this.menuItems[i];
        if (itemComponent) {
          var target = (0, _reactDom.findDOMNode)(itemComponent);
          target.parentNode.scrollTop = target.offsetTop;
        }
      }
    }
  }, {
    key: 'isActiveOption',
    value: function isActiveOption(option, menuIndex) {
      var _props$activeValue = this.props.activeValue,
          activeValue = _props$activeValue === undefined ? [] : _props$activeValue;

      return activeValue[menuIndex] === option.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          dropdownMenuColumnStyle = _props2.dropdownMenuColumnStyle;

      return _react2['default'].createElement(
        'div',
        null,
        this.getShowOptions().map(function (options, menuIndex) {
          return _react2['default'].createElement(
            'ul',
            { className: prefixCls + '-menu', key: menuIndex, style: dropdownMenuColumnStyle },
            options.map(function (option) {
              return _this3.getOption(option, menuIndex);
            })
          );
        })
      );
    }
  }]);
  return Menus;
}(_react.Component);

Menus.defaultProps = {
  options: [],
  value: [],
  activeValue: [],
  onSelect: function onSelect() {},

  prefixCls: 'rc-cascader-menus',
  visible: false,
  expandTrigger: 'click'
};
Menus.propTypes = {
  value: _propTypes2['default'].array,
  activeValue: _propTypes2['default'].array,
  options: _propTypes2['default'].array.isRequired,
  prefixCls: _propTypes2['default'].string,
  expandTrigger: _propTypes2['default'].string,
  onSelect: _propTypes2['default'].func,
  visible: _propTypes2['default'].bool,
  dropdownMenuColumnStyle: _propTypes2['default'].object
};
exports['default'] = Menus;
module.exports = exports['default'];