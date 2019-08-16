'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _KeyCode = require('../../_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _miniStore = require('mini-store');

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _Checkbox = require('../../checkbox/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _ripple = require('../../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint react/no-is-mounted:0 */

var MenuItem = (0, _createReactClass2['default'])({
  displayName: 'MenuItem',

  propTypes: {
    rootPrefixCls: _propTypes2['default'].string,
    eventKey: _propTypes2['default'].string,
    active: _propTypes2['default'].bool,
    children: _propTypes2['default'].any,
    selectedKeys: _propTypes2['default'].array,
    disabled: _propTypes2['default'].bool,
    title: _propTypes2['default'].string,
    onItemHover: _propTypes2['default'].func,
    onSelect: _propTypes2['default'].func,
    onClick: _propTypes2['default'].func,
    onDeselect: _propTypes2['default'].func,
    parentMenu: _propTypes2['default'].object,
    onDestroy: _propTypes2['default'].func,
    onMouseEnter: _propTypes2['default'].func,
    onMouseLeave: _propTypes2['default'].func,
    onMouseDown: _propTypes2['default'].func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSelect: _noop2['default'],
      onMouseEnter: _noop2['default'],
      onMouseLeave: _noop2['default'],
      onMouseDown: _noop2['default']
    };
  },
  componentWillUnmount: function componentWillUnmount() {
    var props = this.props;
    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
  },
  componentDidMount: function componentDidMount() {
    // invoke customized ref to expose component to mixin
    if (this.props.manualRef) {
      this.props.manualRef(this);
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    // invoke customized ref to expose component to mixin
    if (this.props.manualRef) {
      this.props.manualRef(this);
    }
  },
  onKeyDown: function onKeyDown(e) {
    var keyCode = e.keyCode;
    if (keyCode === _KeyCode2['default'].ENTER) {
      this.onClick(e);
      return true;
    }
  },
  onMouseLeave: function onMouseLeave(e) {
    var _props = this.props,
        eventKey = _props.eventKey,
        onItemHover = _props.onItemHover,
        onMouseLeave = _props.onMouseLeave;

    onItemHover({
      key: eventKey,
      hover: false
    });
    onMouseLeave({
      key: eventKey,
      domEvent: e
    });
  },
  onMouseEnter: function onMouseEnter(e) {
    var _props2 = this.props,
        eventKey = _props2.eventKey,
        onItemHover = _props2.onItemHover,
        onMouseEnter = _props2.onMouseEnter;

    onItemHover({
      key: eventKey,
      hover: true
    });
    onMouseEnter({
      key: eventKey,
      domEvent: e
    });
  },
  onClick: function onClick(e) {
    var _props3 = this.props,
        eventKey = _props3.eventKey,
        multiple = _props3.multiple,
        onClick = _props3.onClick,
        onSelect = _props3.onSelect,
        onDeselect = _props3.onDeselect,
        isSelected = _props3.isSelected;

    var info = {
      key: eventKey,
      keyPath: [eventKey],
      item: this,
      domEvent: e
    };
    onClick(info);
    if (multiple) {
      if (isSelected) {
        onDeselect(info);
      } else {
        onSelect(info);
      }
    } else if (!isSelected) {
      onSelect(info);
    }
  },
  getPrefixCls: function getPrefixCls() {
    return this.props.rootPrefixCls + '-item';
  },
  getActiveClassName: function getActiveClassName() {
    return this.getPrefixCls() + '-active';
  },
  getSelectedClassName: function getSelectedClassName() {
    return this.getPrefixCls() + '-selected';
  },
  getDisabledClassName: function getDisabledClassName() {
    return this.getPrefixCls() + '-disabled';
  },
  render: function render() {
    var _classNames;

    var props = this.props;
    var className = (0, _classnames2['default'])(this.getPrefixCls(), props.className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, this.getActiveClassName(), !props.disabled && props.active), (0, _defineProperty3['default'])(_classNames, this.getSelectedClassName(), props.isSelected), (0, _defineProperty3['default'])(_classNames, this.getDisabledClassName(), props.disabled), _classNames));
    var attrs = (0, _extends3['default'])({}, props.attribute, {
      title: props.title,
      className: className,
      role: 'menuitem',
      'aria-selected': props.isSelected,
      'aria-disabled': props.disabled
    });
    var mouseEvent = {};
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter,
        onMouseDown: this.props.onMouseDown
      };
    }
    var style = (0, _extends3['default'])({}, props.style);
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }

    var notFound = props.eventKey === 'NOT_FOUND';
    var checkbox = props.multiple && !notFound ? _react2['default'].createElement(_Checkbox2['default'], { disabled: props.disabled, checked: props.isSelected, tabIndex: -1 }) : null;
    return _react2['default'].createElement(
      _ripple2['default'],
      { disabled: props.disabled },
      _react2['default'].createElement(
        'li',
        (0, _extends3['default'])({}, attrs, mouseEvent, {
          style: style
        }),
        checkbox,
        props.children
      )
    );
  }
});

MenuItem.isMenuItem = 1;

exports['default'] = (0, _miniStore.connect)(function (_ref, _ref2) {
  var activeKey = _ref.activeKey,
      selectedKeys = _ref.selectedKeys;
  var eventKey = _ref2.eventKey,
      subMenuKey = _ref2.subMenuKey;
  return {
    active: activeKey[subMenuKey] === eventKey,
    isSelected: selectedKeys.indexOf(eventKey) !== -1
  };
})(MenuItem);
module.exports = exports['default'];