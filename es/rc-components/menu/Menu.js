import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { create, Provider } from 'mini-store';
import noop from 'lodash/noop';
import { default as MenuMixin, getActiveKey } from './MenuMixin';

var Menu = createReactClass({
  displayName: 'Menu',

  propTypes: {
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    openKeys: PropTypes.arrayOf(PropTypes.string),
    mode: PropTypes.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
    getPopupContainer: PropTypes.func,
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    onDestroy: PropTypes.func,
    openTransitionName: PropTypes.string,
    openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    subMenuOpenDelay: PropTypes.number,
    subMenuCloseDelay: PropTypes.number,
    forceSubMenuRender: PropTypes.bool,
    triggerSubMenuAction: PropTypes.string,
    level: PropTypes.number,
    selectable: PropTypes.bool,
    multiple: PropTypes.bool,
    children: PropTypes.any
  },

  mixins: [MenuMixin],

  isRootMenu: true,

  getDefaultProps: function getDefaultProps() {
    return {
      selectable: true,
      onClick: noop,
      onSelect: noop,
      onOpenChange: noop,
      onDeselect: noop,
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
      subMenuOpenDelay: 0.1,
      subMenuCloseDelay: 0.1,
      triggerSubMenuAction: 'hover'
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var selectedKeys = props.defaultSelectedKeys;
    var openKeys = props.defaultOpenKeys;
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }
    if ('openKeys' in props) {
      openKeys = props.openKeys || [];
    }

    this.store = create({
      selectedKeys: selectedKeys,
      openKeys: openKeys,
      activeKey: { '0-menu-': getActiveKey(props, props.activeKey) }
    });

    return {};
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('selectedKeys' in nextProps) {
      this.store.setState({
        selectedKeys: nextProps.selectedKeys || []
      });
    }
    if ('openKeys' in nextProps) {
      this.store.setState({
        openKeys: nextProps.openKeys || []
      });
    }
  },
  onSelect: function onSelect(selectInfo) {
    var props = this.props;
    if (props.selectable) {
      // root menu
      var selectedKeys = this.store.getState().selectedKeys;
      var selectedKey = selectInfo.key;
      if (props.multiple) {
        selectedKeys = selectedKeys.concat([selectedKey]);
      } else {
        selectedKeys = [selectedKey];
      }
      if (!('selectedKeys' in props)) {
        this.store.setState({
          selectedKeys: selectedKeys
        });
      }
      props.onSelect(_extends({}, selectInfo, {
        selectedKeys: selectedKeys
      }));
    }
  },
  onClick: function onClick(e) {
    this.props.onClick(e);
  },
  onOpenChange: function onOpenChange(event) {
    var props = this.props;
    var openKeys = this.store.getState().openKeys.concat();
    var changed = false;
    var processSingle = function processSingle(e) {
      var oneChanged = false;
      if (e.open) {
        oneChanged = openKeys.indexOf(e.key) === -1;
        if (oneChanged) {
          openKeys.push(e.key);
        }
      } else {
        var index = openKeys.indexOf(e.key);
        oneChanged = index !== -1;
        if (oneChanged) {
          openKeys.splice(index, 1);
        }
      }
      changed = changed || oneChanged;
    };
    if (Array.isArray(event)) {
      // batch change call
      event.forEach(processSingle);
    } else {
      processSingle(event);
    }
    if (changed) {
      if (!('openKeys' in this.props)) {
        this.store.setState({ openKeys: openKeys });
      }
      props.onOpenChange(openKeys);
    }
  },
  onDeselect: function onDeselect(selectInfo) {
    var props = this.props;
    if (props.selectable) {
      var selectedKeys = this.store.getState().selectedKeys.concat();
      var selectedKey = selectInfo.key;
      var index = selectedKeys.indexOf(selectedKey);
      if (index !== -1) {
        selectedKeys.splice(index, 1);
      }
      if (!('selectedKeys' in props)) {
        this.store.setState({
          selectedKeys: selectedKeys
        });
      }
      props.onDeselect(_extends({}, selectInfo, {
        selectedKeys: selectedKeys
      }));
    }
  },
  getOpenTransitionName: function getOpenTransitionName() {
    var props = this.props;
    var transitionName = props.openTransitionName;
    var animationName = props.openAnimation;
    if (!transitionName && typeof animationName === 'string') {
      transitionName = props.prefixCls + '-open-' + animationName;
    }
    return transitionName;
  },
  isInlineMode: function isInlineMode() {
    return this.props.mode === 'inline';
  },
  lastOpenSubMenu: function lastOpenSubMenu() {
    var lastOpen = [];

    var _store$getState = this.store.getState(),
        openKeys = _store$getState.openKeys;

    if (openKeys.length) {
      lastOpen = this.getFlatInstanceArray().filter(function (c) {
        return c && openKeys.indexOf(c.props.eventKey) !== -1;
      });
    }
    return lastOpen[0];
  },
  renderMenuItem: function renderMenuItem(c, i, subIndex, subMenuKey) {
    if (!c) {
      return null;
    }
    var state = this.store.getState();
    var extraProps = {
      openKeys: state.openKeys,
      selectedKeys: state.selectedKeys,
      triggerSubMenuAction: this.props.triggerSubMenuAction,
      subMenuKey: subMenuKey
    };
    return this.renderCommonMenuItem(c, i, subIndex, extraProps);
  },
  render: function render() {
    var props = _extends({}, this.props);
    props.className += ' ' + props.prefixCls + '-root';
    return React.createElement(
      Provider,
      { store: this.store },
      this.renderRoot(props)
    );
  }
});

export default Menu;