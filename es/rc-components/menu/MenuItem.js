import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import KeyCode from '../../_util/KeyCode';
import classNames from 'classnames';
import { connect } from 'mini-store';
import noop from 'lodash/noop';
import Checkbox from '../../checkbox/Checkbox';
import Ripple from '../../ripple';
/* eslint react/no-is-mounted:0 */

var MenuItem = createReactClass({
  displayName: 'MenuItem',

  propTypes: {
    rootPrefixCls: PropTypes.string,
    eventKey: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.any,
    selectedKeys: PropTypes.array,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    onItemHover: PropTypes.func,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    onDeselect: PropTypes.func,
    parentMenu: PropTypes.object,
    onDestroy: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseDown: PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSelect: noop,
      onMouseEnter: noop,
      onMouseLeave: noop,
      onMouseDown: noop
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
    if (keyCode === KeyCode.ENTER) {
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
    var className = classNames(this.getPrefixCls(), props.className, (_classNames = {}, _defineProperty(_classNames, this.getActiveClassName(), !props.disabled && props.active), _defineProperty(_classNames, this.getSelectedClassName(), props.isSelected), _defineProperty(_classNames, this.getDisabledClassName(), props.disabled), _classNames));
    var attrs = _extends({}, props.attribute, {
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
    var style = _extends({}, props.style);
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }

    var notFound = props.eventKey === 'NOT_FOUND';
    var checkbox = props.multiple && !notFound ? React.createElement(Checkbox, { disabled: props.disabled, checked: props.isSelected, tabIndex: -1 }) : null;
    return React.createElement(
      Ripple,
      { disabled: props.disabled },
      React.createElement(
        'li',
        _extends({}, attrs, mouseEvent, {
          style: style
        }),
        checkbox,
        props.children
      )
    );
  }
});

MenuItem.isMenuItem = 1;

export default connect(function (_ref, _ref2) {
  var activeKey = _ref.activeKey,
      selectedKeys = _ref.selectedKeys;
  var eventKey = _ref2.eventKey,
      subMenuKey = _ref2.subMenuKey;
  return {
    active: activeKey[subMenuKey] === eventKey,
    isSelected: selectedKeys.indexOf(eventKey) !== -1
  };
})(MenuItem);