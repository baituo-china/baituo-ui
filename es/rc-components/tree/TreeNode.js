import _typeof from 'babel-runtime/helpers/typeof';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import React, { Children, Component, createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from '../../_util/warning';
import Animate from '../../animate';
import toArray from '../util/Children/toArray';
import { contextTypes } from './Tree';
import Progress from '../../progress';
import { getNodeChildren as _getNodeChildren, getPosition, isCheckDisabled, traverseTreeNodes } from './util';

var ICON_OPEN = 'open';
var ICON_CLOSE = 'close';

var LOAD_STATUS_NONE = 0;
var LOAD_STATUS_LOADING = 1;
var LOAD_STATUS_LOADED = 2;
var LOAD_STATUS_FAILED = 0; // Action align, let's make failed same as init.

var defaultTitle = '---';

var onlyTreeNodeWarned = false; // Only accept TreeNode

export var nodeContextTypes = _extends({}, contextTypes, {
  rcTreeNode: PropTypes.shape({
    onUpCheckConduct: PropTypes.func
  })
});

var TreeNode = function (_Component) {
  _inherits(TreeNode, _Component);

  function TreeNode(props) {
    _classCallCheck(this, TreeNode);

    var _this = _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      loadStatus: LOAD_STATUS_NONE,
      dragNodeHighlight: false
    };
    return _this;
  }

  _createClass(TreeNode, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        rcTreeNode: {
          onUpCheckConduct: this.onUpCheckConduct
        }
      });
    }

    // Isomorphic needn't load data in server side

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.syncLoadData(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.syncLoadData(nextProps);
    }

    // Disabled item still can be switch


    // Drag usage

  }, {
    key: 'getNodeChildren',
    value: function getNodeChildren() {
      var children = this.props.children;

      var originList = toArray(children).filter(function (node) {
        return node;
      });
      var targetList = _getNodeChildren(originList);

      if (originList.length !== targetList.length && !onlyTreeNodeWarned) {
        onlyTreeNodeWarned = true;
        warning(false, 'Tree only accept TreeNode as children.');
      }

      return targetList;
    }
  }, {
    key: 'isSelectable',
    value: function isSelectable() {
      var selectable = this.props.selectable;
      var treeSelectable = this.context.rcTree.selectable;

      // Ignore when selectable is undefined or null

      if (typeof selectable === 'boolean') {
        return selectable;
      }

      return treeSelectable;
    }

    // Load data to avoid default expanded tree without data


    // Switcher


    // Checkbox


    // Icon + Title


    // Children list wrapped with `Animation`

  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          className = _props.className,
          dragOver = _props.dragOver,
          dragOverGapTop = _props.dragOverGapTop,
          dragOverGapBottom = _props.dragOverGapBottom;
      var _context$rcTree = this.context.rcTree,
          prefixCls = _context$rcTree.prefixCls,
          filterTreeNode = _context$rcTree.filterTreeNode;

      var disabled = this.isDisabled();

      return React.createElement(
        'li',
        {
          className: classNames(className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-treenode-disabled', disabled), _defineProperty(_classNames, 'drag-over', !disabled && dragOver), _defineProperty(_classNames, 'drag-over-gap-top', !disabled && dragOverGapTop), _defineProperty(_classNames, 'drag-over-gap-bottom', !disabled && dragOverGapBottom), _defineProperty(_classNames, 'filter-node', filterTreeNode && filterTreeNode(this)), _classNames)),

          onDragEnter: this.onDragEnter,
          onDragOver: this.onDragOver,
          onDragLeave: this.onDragLeave,
          onDrop: this.onDrop,
          onDragEnd: this.onDragEnd
        },
        this.renderSwitcher(),
        this.renderCheckbox(),
        this.renderSelector(),
        this.renderChildren()
      );
    }
  }]);

  return TreeNode;
}(Component);

TreeNode.propTypes = {
  eventKey: PropTypes.string, // Pass by parent `cloneElement`
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  root: PropTypes.object,
  onSelect: PropTypes.func,
  wrapper: PropTypes.func,

  // By parent
  expanded: PropTypes.bool,
  selected: PropTypes.bool,
  checked: PropTypes.bool,
  halfChecked: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.node,
  pos: PropTypes.string,
  dragOver: PropTypes.bool,
  dragOverGapTop: PropTypes.bool,
  dragOverGapBottom: PropTypes.bool,

  // By user
  isLeaf: PropTypes.bool,
  selectable: PropTypes.bool,
  disabled: PropTypes.bool,
  disableCheckbox: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  switcherIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};
TreeNode.contextTypes = nodeContextTypes;
TreeNode.childContextTypes = nodeContextTypes;
TreeNode.defaultProps = {
  title: defaultTitle
};
TreeNode.isTreeNode = 1;

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onUpCheckConduct = function (treeNode, nodeChecked, nodeHalfChecked) {
    var nodePos = treeNode.props.pos;
    var _props2 = _this2.props,
        eventKey = _props2.eventKey,
        pos = _props2.pos,
        checked = _props2.checked,
        halfChecked = _props2.halfChecked;
    var _context = _this2.context,
        _context$rcTree2 = _context.rcTree,
        checkStrictly = _context$rcTree2.checkStrictly,
        isKeyChecked = _context$rcTree2.isKeyChecked,
        onBatchNodeCheck = _context$rcTree2.onBatchNodeCheck,
        onCheckConductFinished = _context$rcTree2.onCheckConductFinished,
        _context$rcTreeNode = _context.rcTreeNode;
    _context$rcTreeNode = _context$rcTreeNode === undefined ? {} : _context$rcTreeNode;
    var onUpCheckConduct = _context$rcTreeNode.onUpCheckConduct;

    // Stop conduct when current node is disabled

    if (isCheckDisabled(_this2)) {
      onCheckConductFinished();
      return;
    }

    var children = _this2.getNodeChildren();

    var checkedCount = nodeChecked ? 1 : 0;

    // Statistic checked count
    children.forEach(function (node, index) {
      var childPos = getPosition(pos, index);

      if (nodePos === childPos || isCheckDisabled(node)) {
        return;
      }

      if (isKeyChecked(node.key || childPos)) {
        checkedCount += 1;
      }
    });

    // Static enabled children count
    var enabledChildrenCount = children.filter(function (node) {
      return !isCheckDisabled(node);
    }).length;

    // checkStrictly will not conduct check status
    var nextChecked = checkStrictly ? checked : enabledChildrenCount === checkedCount;
    var nextHalfChecked = checkStrictly ? // propagated or child checked
    halfChecked : nodeHalfChecked || checkedCount > 0 && !nextChecked;

    // Add into batch update
    if (checked !== nextChecked || halfChecked !== nextHalfChecked) {
      onBatchNodeCheck(eventKey, nextChecked, nextHalfChecked);

      if (onUpCheckConduct) {
        onUpCheckConduct(_this2, nextChecked, nextHalfChecked);
      } else {
        // Flush all the update
        onCheckConductFinished();
      }
    } else {
      // Flush all the update
      onCheckConductFinished();
    }
  };

  this.onDownCheckConduct = function (nodeChecked) {
    var children = _this2.props.children;
    var _context$rcTree3 = _this2.context.rcTree,
        checkStrictly = _context$rcTree3.checkStrictly,
        isKeyChecked = _context$rcTree3.isKeyChecked,
        onBatchNodeCheck = _context$rcTree3.onBatchNodeCheck;

    if (checkStrictly) return;

    traverseTreeNodes(children, function (_ref) {
      var node = _ref.node,
          key = _ref.key;

      if (isCheckDisabled(node)) return false;

      if (nodeChecked !== isKeyChecked(key)) {
        onBatchNodeCheck(key, nodeChecked, false);
      }
    });
  };

  this.onSelectorClick = function (e) {
    if (_this2.isSelectable()) {
      _this2.onSelect(e);
    } else {
      _this2.onCheck(e);
    }
  };

  this.onSelect = function (e) {
    if (_this2.isDisabled()) return;

    var onNodeSelect = _this2.context.rcTree.onNodeSelect;

    e.preventDefault();
    onNodeSelect(e, _this2);
  };

  this.onCheck = function (e) {
    if (_this2.isDisabled()) return;

    var _props3 = _this2.props,
        disableCheckbox = _props3.disableCheckbox,
        checked = _props3.checked,
        eventKey = _props3.eventKey;
    var _context2 = _this2.context,
        _context2$rcTree = _context2.rcTree,
        checkable = _context2$rcTree.checkable,
        onBatchNodeCheck = _context2$rcTree.onBatchNodeCheck,
        onCheckConductFinished = _context2$rcTree.onCheckConductFinished,
        _context2$rcTreeNode = _context2.rcTreeNode;
    _context2$rcTreeNode = _context2$rcTreeNode === undefined ? {} : _context2$rcTreeNode;
    var onUpCheckConduct = _context2$rcTreeNode.onUpCheckConduct;


    if (!checkable || disableCheckbox) return;

    e.preventDefault();
    var targetChecked = !checked;
    onBatchNodeCheck(eventKey, targetChecked, false, _this2);

    // Children conduct
    _this2.onDownCheckConduct(targetChecked);

    // Parent conduct
    if (onUpCheckConduct) {
      onUpCheckConduct(_this2, targetChecked, false);
    } else {
      onCheckConductFinished();
    }
  };

  this.onMouseEnter = function (e) {
    var onNodeMouseEnter = _this2.context.rcTree.onNodeMouseEnter;

    onNodeMouseEnter(e, _this2);
  };

  this.onMouseLeave = function (e) {
    var onNodeMouseLeave = _this2.context.rcTree.onNodeMouseLeave;

    onNodeMouseLeave(e, _this2);
  };

  this.onContextMenu = function (e) {
    var onNodeContextMenu = _this2.context.rcTree.onNodeContextMenu;

    onNodeContextMenu(e, _this2);
  };

  this.onDragStart = function (e) {
    var onNodeDragStart = _this2.context.rcTree.onNodeDragStart;


    e.stopPropagation();
    _this2.setState({
      dragNodeHighlight: true
    });
    onNodeDragStart(e, _this2);

    try {
      // ie throw error
      // firefox-need-it
      e.dataTransfer.setData('text/plain', '');
    } catch (error) {
      // empty
    }
  };

  this.onDragEnter = function (e) {
    var onNodeDragEnter = _this2.context.rcTree.onNodeDragEnter;


    e.preventDefault();
    e.stopPropagation();
    onNodeDragEnter(e, _this2);
  };

  this.onDragOver = function (e) {
    var onNodeDragOver = _this2.context.rcTree.onNodeDragOver;


    e.preventDefault();
    e.stopPropagation();
    onNodeDragOver(e, _this2);
  };

  this.onDragLeave = function (e) {
    var onNodeDragLeave = _this2.context.rcTree.onNodeDragLeave;


    e.stopPropagation();
    onNodeDragLeave(e, _this2);
  };

  this.onDragEnd = function (e) {
    var onNodeDragEnd = _this2.context.rcTree.onNodeDragEnd;


    e.stopPropagation();
    _this2.setState({
      dragNodeHighlight: false
    });
    onNodeDragEnd(e, _this2);
  };

  this.onDrop = function (e) {
    var onNodeDrop = _this2.context.rcTree.onNodeDrop;


    e.preventDefault();
    e.stopPropagation();
    _this2.setState({
      dragNodeHighlight: false
    });
    onNodeDrop(e, _this2);
  };

  this.onExpand = function (e) {
    var onNodeExpand = _this2.context.rcTree.onNodeExpand;

    var callbackPromise = onNodeExpand(e, _this2);

    // Promise like
    if (callbackPromise && callbackPromise.then) {
      _this2.setState({ loadStatus: LOAD_STATUS_LOADING });

      callbackPromise.then(function () {
        _this2.setState({ loadStatus: LOAD_STATUS_LOADED });
      })['catch'](function () {
        _this2.setState({ loadStatus: LOAD_STATUS_FAILED });
      });
    }
  };

  this.setSelectHandle = function (node) {
    _this2.selectHandle = node;
  };

  this.getNodeState = function () {
    var expanded = _this2.props.expanded;


    if (_this2.isLeaf()) {
      return null;
    }

    return expanded ? ICON_OPEN : ICON_CLOSE;
  };

  this.isLeaf = function () {
    var loadStatus = _this2.state.loadStatus;
    var _props4 = _this2.props,
        isLeaf = _props4.isLeaf,
        _props4$hasChildren = _props4.hasChildren,
        hasChildren = _props4$hasChildren === undefined ? _this2.getNodeChildren().length !== 0 : _props4$hasChildren;
    var loadData = _this2.context.rcTree.loadData;


    return isLeaf || !loadData && !hasChildren || loadData && loadStatus === LOAD_STATUS_LOADED && !hasChildren;
  };

  this.isDisabled = function () {
    var disabled = _this2.props.disabled;
    var treeDisabled = _this2.context.rcTree.disabled;

    // Follow the logic of Selectable

    if (disabled === false) {
      return false;
    }

    return !!(treeDisabled || disabled);
  };

  this.syncLoadData = function (props) {
    var loadStatus = _this2.state.loadStatus;
    var expanded = props.expanded;
    var loadData = _this2.context.rcTree.loadData;


    if (loadData && loadStatus === LOAD_STATUS_NONE && expanded && !_this2.isLeaf()) {
      _this2.setState({ loadStatus: LOAD_STATUS_LOADING });

      loadData(_this2).then(function () {
        _this2.setState({ loadStatus: LOAD_STATUS_LOADED });
      })['catch'](function () {
        _this2.setState({ loadStatus: LOAD_STATUS_FAILED });
      });
    }
  };

  this.renderSwitcher = function () {
    var _props5 = _this2.props,
        expanded = _props5.expanded,
        switcherIconFromProps = _props5.switcherIcon;
    var _context$rcTree4 = _this2.context.rcTree,
        prefixCls = _context$rcTree4.prefixCls,
        switcherIconFromCtx = _context$rcTree4.switcherIcon;


    var switcherIcon = switcherIconFromProps || switcherIconFromCtx;

    if (_this2.isLeaf()) {
      return React.createElement(
        'span',
        { className: classNames(prefixCls + '-switcher', prefixCls + '-switcher-noop') },
        typeof switcherIcon === 'function' ? switcherIcon(_extends({}, _this2.props, { isLeaf: true })) : switcherIcon
      );
    }

    var switcherCls = classNames(prefixCls + '-switcher', prefixCls + '-switcher_' + (expanded ? ICON_OPEN : ICON_CLOSE));
    return React.createElement(
      'span',
      { onClick: _this2.onExpand, className: switcherCls },
      typeof switcherIcon === 'function' ? switcherIcon(_extends({}, _this2.props, { isLeaf: false })) : switcherIcon
    );
  };

  this.renderCheckbox = function () {
    var _props6 = _this2.props,
        checked = _props6.checked,
        halfChecked = _props6.halfChecked,
        disableCheckbox = _props6.disableCheckbox;
    var _context$rcTree5 = _this2.context.rcTree,
        prefixCls = _context$rcTree5.prefixCls,
        checkable = _context$rcTree5.checkable;

    var disabled = _this2.isDisabled();

    if (!checkable) return null;

    // [Legacy] Custom element should be separate with `checkable` in future
    var $custom = typeof checkable !== 'boolean' ? checkable : null;

    return React.createElement(
      'span',
      {
        className: classNames(prefixCls + '-checkbox', checked && prefixCls + '-checkbox-checked', !checked && halfChecked && prefixCls + '-checkbox-indeterminate', (disabled || disableCheckbox) && prefixCls + '-checkbox-disabled'),
        onClick: _this2.onCheck
      },
      $custom
    );
  };

  this.renderIcon = function () {
    var loadStatus = _this2.state.loadStatus;
    var prefixCls = _this2.context.rcTree.prefixCls;


    return loadStatus === LOAD_STATUS_LOADING ? React.createElement(Progress, {
      type: 'loading',
      size: 'small',
      width: 14,
      className: prefixCls + '-icon_loading'
    }) : React.createElement('span', {
      className: classNames(prefixCls + '-iconEle', prefixCls + '-icon__' + (_this2.getNodeState() || 'docu'))
    });
  };

  this.renderSelector = function () {
    var _state = _this2.state,
        loadStatus = _state.loadStatus,
        dragNodeHighlight = _state.dragNodeHighlight;
    var _props7 = _this2.props,
        title = _props7.title,
        selected = _props7.selected,
        icon = _props7.icon;
    var _context$rcTree6 = _this2.context.rcTree,
        prefixCls = _context$rcTree6.prefixCls,
        showIcon = _context$rcTree6.showIcon,
        draggable = _context$rcTree6.draggable,
        loadData = _context$rcTree6.loadData;

    var disabled = _this2.isDisabled();

    var wrapClass = prefixCls + '-node-content-wrapper';

    // Icon - Still show loading icon when loading without showIcon
    var $icon = void 0;

    if (showIcon) {
      $icon = icon ? React.createElement(
        'span',
        {
          className: classNames(prefixCls + '-iconEle', prefixCls + '-icon__customize')
        },
        typeof icon === 'function' ? createElement(icon, _this2.props) : icon
      ) : _this2.renderIcon();
    } else if (loadData && loadStatus === LOAD_STATUS_LOADING) {
      $icon = _this2.renderIcon();
    }

    // Title
    var $title = React.createElement(
      'span',
      { className: prefixCls + '-title' },
      title
    );

    return React.createElement(
      'span',
      {
        ref: _this2.setSelectHandle,
        title: typeof title === 'string' ? title : '',
        className: classNames('' + wrapClass, wrapClass + '-' + (_this2.getNodeState() || 'normal'), !disabled && (selected || dragNodeHighlight) && prefixCls + '-node-selected', !disabled && draggable && 'draggable'),
        draggable: !disabled && draggable || undefined,
        'aria-grabbed': !disabled && draggable || undefined,

        onMouseEnter: _this2.onMouseEnter,
        onMouseLeave: _this2.onMouseLeave,
        onContextMenu: _this2.onContextMenu,
        onClick: _this2.onSelectorClick,
        onDragStart: _this2.onDragStart
      },
      $icon,
      $title
    );
  };

  this.renderChildren = function () {
    var _props8 = _this2.props,
        expanded = _props8.expanded,
        pos = _props8.pos,
        wrapper = _props8.wrapper;
    var _context$rcTree7 = _this2.context.rcTree,
        prefixCls = _context$rcTree7.prefixCls,
        openTransitionName = _context$rcTree7.openTransitionName,
        openAnimation = _context$rcTree7.openAnimation,
        renderTreeNode = _context$rcTree7.renderTreeNode;

    // [Legacy] Animation control

    var renderFirst = _this2.renderFirst;
    _this2.renderFirst = 1;
    var transitionAppear = true;
    if (!renderFirst && expanded) {
      transitionAppear = false;
    }

    var animProps = {};
    if (openTransitionName) {
      animProps.transitionName = openTransitionName;
    } else if ((typeof openAnimation === 'undefined' ? 'undefined' : _typeof(openAnimation)) === 'object') {
      animProps.animation = _extends({}, openAnimation);
      if (!transitionAppear) {
        delete animProps.animation.appear;
      }
    }

    // Children TreeNode
    var nodeList = _this2.getNodeChildren();

    if (nodeList.length === 0) {
      return null;
    }

    var $children = void 0;
    if (expanded) {
      var treeNodes = Children.map(nodeList, function (node, index) {
        return renderTreeNode(node, index, pos);
      });
      if (wrapper) {
        treeNodes = wrapper(treeNodes);
      }
      $children = React.createElement(
        'ul',
        { hidden: !expanded },
        treeNodes
      );
    }

    return React.createElement(
      Animate,
      _extends({}, animProps, {
        hiddenProp: 'hidden',
        transitionAppear: transitionAppear,
        component: ''
      }),
      $children
    );
  };
};

export default TreeNode;