'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextTypes = undefined;

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _warning = require('../../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Thought we still use `cloneElement` to pass `key`,
 * other props can pass with context for future refactor.
 */
var contextTypes = exports.contextTypes = {
  rcTree: _propTypes2['default'].shape({
    root: _propTypes2['default'].object,

    prefixCls: _propTypes2['default'].string,
    selectable: _propTypes2['default'].bool,
    showIcon: _propTypes2['default'].bool,
    icon: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func]),
    draggable: _propTypes2['default'].bool,
    checkable: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].node]),
    checkStrictly: _propTypes2['default'].bool,
    disabled: _propTypes2['default'].bool,
    openTransitionName: _propTypes2['default'].string,
    openAnimation: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),

    loadData: _propTypes2['default'].func,
    filterTreeNode: _propTypes2['default'].func,
    renderTreeNode: _propTypes2['default'].func,

    isKeyChecked: _propTypes2['default'].func,

    onNodeExpand: _propTypes2['default'].func,
    onNodeSelect: _propTypes2['default'].func,
    onNodeMouseEnter: _propTypes2['default'].func,
    onNodeMouseLeave: _propTypes2['default'].func,
    onNodeContextMenu: _propTypes2['default'].func,
    onNodeDragStart: _propTypes2['default'].func,
    onNodeDragEnter: _propTypes2['default'].func,
    onNodeDragOver: _propTypes2['default'].func,
    onNodeDragLeave: _propTypes2['default'].func,
    onNodeDragEnd: _propTypes2['default'].func,
    onNodeDrop: _propTypes2['default'].func,
    onBatchNodeCheck: _propTypes2['default'].func,
    onCheckConductFinished: _propTypes2['default'].func
  })
};

var Tree = function (_Component) {
  (0, _inherits3['default'])(Tree, _Component);

  function Tree(props) {
    (0, _classCallCheck3['default'])(this, Tree);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

    _initialiseProps.call(_this);

    var defaultExpandAll = props.defaultExpandAll,
        defaultExpandParent = props.defaultExpandParent,
        defaultExpandedKeys = props.defaultExpandedKeys,
        defaultCheckedKeys = props.defaultCheckedKeys,
        defaultSelectedKeys = props.defaultSelectedKeys,
        expandedKeys = props.expandedKeys;

    // Sync state with props

    var _ref = (0, _util.calcCheckedKeys)(defaultCheckedKeys, props) || {},
        _ref$checkedKeys = _ref.checkedKeys,
        checkedKeys = _ref$checkedKeys === undefined ? [] : _ref$checkedKeys,
        _ref$halfCheckedKeys = _ref.halfCheckedKeys,
        halfCheckedKeys = _ref$halfCheckedKeys === undefined ? [] : _ref$halfCheckedKeys;

    var state = {
      selectedKeys: (0, _util.calcSelectedKeys)(defaultSelectedKeys, props),
      checkedKeys: checkedKeys,
      halfCheckedKeys: halfCheckedKeys
    };

    if (defaultExpandAll) {
      state.expandedKeys = (0, _util.getFullKeyList)(props.children);
    } else if (defaultExpandParent) {
      state.expandedKeys = (0, _util.calcExpandedKeys)(expandedKeys || defaultExpandedKeys, props);
    } else {
      state.expandedKeys = defaultExpandedKeys;
    }

    _this.state = (0, _extends3['default'])({}, state, _this.getSyncProps(props) || {});

    // Cache for check status to optimize
    _this.checkedBatch = null;
    return _this;
  }

  (0, _createClass3['default'])(Tree, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          selectable = _props.selectable,
          showIcon = _props.showIcon,
          icon = _props.icon,
          draggable = _props.draggable,
          checkable = _props.checkable,
          checkStrictly = _props.checkStrictly,
          disabled = _props.disabled,
          loadData = _props.loadData,
          filterTreeNode = _props.filterTreeNode,
          openTransitionName = _props.openTransitionName,
          openAnimation = _props.openAnimation,
          switcherIcon = _props.switcherIcon;


      return {
        rcTree: {
          // root: this,

          prefixCls: prefixCls,
          selectable: selectable,
          showIcon: showIcon,
          icon: icon,
          switcherIcon: switcherIcon,
          draggable: draggable,
          checkable: checkable,
          checkStrictly: checkStrictly,
          disabled: disabled,
          openTransitionName: openTransitionName,
          openAnimation: openAnimation,

          loadData: loadData,
          filterTreeNode: filterTreeNode,
          renderTreeNode: this.renderTreeNode,
          isKeyChecked: this.isKeyChecked,

          onNodeExpand: this.onNodeExpand,
          onNodeSelect: this.onNodeSelect,
          onNodeMouseEnter: this.onNodeMouseEnter,
          onNodeMouseLeave: this.onNodeMouseLeave,
          onNodeContextMenu: this.onNodeContextMenu,
          onNodeDragStart: this.onNodeDragStart,
          onNodeDragEnter: this.onNodeDragEnter,
          onNodeDragOver: this.onNodeDragOver,
          onNodeDragLeave: this.onNodeDragLeave,
          onNodeDragEnd: this.onNodeDragEnd,
          onNodeDrop: this.onNodeDrop,
          onBatchNodeCheck: this.onBatchNodeCheck,
          onCheckConductFinished: this.onCheckConductFinished
        }
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // React 16 will not trigger update if new state is null
      this.setState(this.getSyncProps(nextProps, this.props));
    }

    /**
     * [Legacy] Select handler is less small than node,
     * so that this will trigger when drag enter node or select handler.
     * This is a little tricky if customize css without padding.
     * Better for use mouse move event to refresh drag state.
     * But let's just keep it to avoid event trigger logic change.
     */


    /**
     * This will cache node check status to optimize update process.
     * When Tree get trigger `onCheckConductFinished` will flush all the update.
     */


    /**
     * When top `onCheckConductFinished` called, will execute all batch update.
     * And trigger `onCheck` event.
     */


    /**
     * Sync state with props if needed
     */


    /**
     * Only update the value which is not in props
     */


    /**
     * [Legacy] Original logic use `key` as tracking clue.
     * We have to use `cloneElement` to pass `key`.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          className = _props2.className,
          focusable = _props2.focusable,
          showLine = _props2.showLine,
          children = _props2.children;

      var domProps = {};

      // [Legacy] Commit: 0117f0c9db0e2956e92cb208f51a42387dfcb3d1
      if (focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.onKeyDown;
      }

      return _react2['default'].createElement(
        'ul',
        (0, _extends3['default'])({}, domProps, {
          className: (0, _classnames2['default'])(prefixCls, className, (0, _defineProperty3['default'])({}, prefixCls + '-show-line', showLine)),
          role: 'tree-node',
          unselectable: 'on'
        }),
        _react.Children.map(children, this.renderTreeNode, this)
      );
    }
  }]);
  return Tree;
}(_react.Component);

Tree.propTypes = {
  prefixCls: _propTypes2['default'].string,
  className: _propTypes2['default'].string,
  children: _propTypes2['default'].any,
  showLine: _propTypes2['default'].bool,
  showIcon: _propTypes2['default'].bool,
  icon: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func]),
  focusable: _propTypes2['default'].bool,
  selectable: _propTypes2['default'].bool,
  disabled: _propTypes2['default'].bool,
  multiple: _propTypes2['default'].bool,
  checkable: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].node]),
  checkStrictly: _propTypes2['default'].bool,
  draggable: _propTypes2['default'].bool,
  defaultExpandParent: _propTypes2['default'].bool,
  autoExpandParent: _propTypes2['default'].bool,
  defaultExpandAll: _propTypes2['default'].bool,
  defaultExpandedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  expandedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  defaultCheckedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  checkedKeys: _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(_propTypes2['default'].string), _propTypes2['default'].object]),
  defaultSelectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  selectedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
  onExpand: _propTypes2['default'].func,
  onCheck: _propTypes2['default'].func,
  onSelect: _propTypes2['default'].func,
  loadData: _propTypes2['default'].func,
  onMouseEnter: _propTypes2['default'].func,
  onMouseLeave: _propTypes2['default'].func,
  onRightClick: _propTypes2['default'].func,
  onDragStart: _propTypes2['default'].func,
  onDragEnter: _propTypes2['default'].func,
  onDragOver: _propTypes2['default'].func,
  onDragLeave: _propTypes2['default'].func,
  onDragEnd: _propTypes2['default'].func,
  onDrop: _propTypes2['default'].func,
  filterTreeNode: _propTypes2['default'].func,
  openTransitionName: _propTypes2['default'].string,
  openAnimation: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
  switcherIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func])
};
Tree.childContextTypes = contextTypes;
Tree.defaultProps = {
  prefixCls: 'rc-tree',
  showLine: false,
  showIcon: true,
  selectable: true,
  multiple: false,
  checkable: false,
  disabled: false,
  checkStrictly: false,
  draggable: false,
  defaultExpandParent: true,
  autoExpandParent: false,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  onExpand: null,
  onCheck: null,
  onSelect: null,
  onDragStart: null,
  onDragEnter: null,
  onDragOver: null,
  onDragLeave: null,
  onDrop: null,
  onDragEnd: null,
  onMouseEnter: null,
  onMouseLeave: null
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onNodeDragStart = function (event, node) {
    var expandedKeys = _this2.state.expandedKeys;
    var onDragStart = _this2.props.onDragStart;
    var _node$props = node.props,
        eventKey = _node$props.eventKey,
        children = _node$props.children;


    _this2.dragNode = node;

    _this2.setState({
      dragNodesKeys: (0, _util.getDragNodesKeys)(children, node),
      expandedKeys: (0, _util.arrDel)(expandedKeys, eventKey)
    });

    if (onDragStart) {
      onDragStart({ event: event, node: node });
    }
  };

  this.onNodeDragEnter = function (event, node) {
    var expandedKeys = _this2.state.expandedKeys;
    var onDragEnter = _this2.props.onDragEnter;
    var _node$props2 = node.props,
        pos = _node$props2.pos,
        eventKey = _node$props2.eventKey;


    var dropPosition = (0, _util.calcDropPosition)(event, node);

    // Skip if drag node is self
    if (_this2.dragNode.props.eventKey === eventKey && dropPosition === 0) {
      _this2.setState({
        dragOverNodeKey: '',
        dropPosition: null
      });
      return;
    }

    // Ref: https://github.com/react-component/tree/issues/132
    // Add timeout to let onDragLevel fire before onDragEnter,
    // so that we can clean drag props for onDragLeave node.
    // Macro task for this:
    // https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-script
    setTimeout(function () {
      // Update drag over node
      _this2.setState({
        dragOverNodeKey: eventKey,
        dropPosition: dropPosition
      });

      // Side effect for delay drag
      if (!_this2.delayedDragEnterLogic) {
        _this2.delayedDragEnterLogic = {};
      }
      Object.keys(_this2.delayedDragEnterLogic).forEach(function (key) {
        clearTimeout(_this2.delayedDragEnterLogic[key]);
      });
      _this2.delayedDragEnterLogic[pos] = setTimeout(function () {
        var newExpandedKeys = (0, _util.arrAdd)(expandedKeys, eventKey);
        _this2.setState({
          expandedKeys: newExpandedKeys
        });

        if (onDragEnter) {
          onDragEnter({ event: event, node: node, expandedKeys: newExpandedKeys });
        }
      }, 400);
    }, 0);
  };

  this.onNodeDragOver = function (event, node) {
    var onDragOver = _this2.props.onDragOver;

    if (onDragOver) {
      onDragOver({ event: event, node: node });
    }
  };

  this.onNodeDragLeave = function (event, node) {
    var onDragLeave = _this2.props.onDragLeave;


    _this2.setState({
      dragOverNodeKey: ''
    });

    if (onDragLeave) {
      onDragLeave({ event: event, node: node });
    }
  };

  this.onNodeDragEnd = function (event, node) {
    var onDragEnd = _this2.props.onDragEnd;

    _this2.setState({
      dragOverNodeKey: ''
    });
    if (onDragEnd) {
      onDragEnd({ event: event, node: node });
    }
  };

  this.onNodeDrop = function (event, node) {
    var _state = _this2.state,
        dragNodesKeys = _state.dragNodesKeys,
        dropPosition = _state.dropPosition;
    var onDrop = _this2.props.onDrop;
    var _node$props3 = node.props,
        eventKey = _node$props3.eventKey,
        pos = _node$props3.pos;


    _this2.setState({
      dragOverNodeKey: '',
      dropNodeKey: eventKey
    });

    if (dragNodesKeys.indexOf(eventKey) !== -1) {
      (0, _warning2['default'])(false, 'Can not drop to dragNode(include it\'s children node)');
      return;
    }

    var posArr = (0, _util.posToArr)(pos);

    var dropResult = {
      event: event,
      node: node,
      dragNode: _this2.dragNode,
      dragNodesKeys: dragNodesKeys.slice(),
      dropPosition: dropPosition + Number(posArr[posArr.length - 1])
    };

    if (dropPosition !== 0) {
      dropResult.dropToGap = true;
    }

    if (onDrop) {
      onDrop(dropResult);
    }
  };

  this.onNodeSelect = function (e, treeNode) {
    var selectedKeys = _this2.state.selectedKeys;
    var _props3 = _this2.props,
        onSelect = _props3.onSelect,
        multiple = _props3.multiple,
        children = _props3.children;
    var _treeNode$props = treeNode.props,
        selected = _treeNode$props.selected,
        eventKey = _treeNode$props.eventKey;

    var targetSelected = !selected;

    // Update selected keys
    if (!targetSelected) {
      selectedKeys = (0, _util.arrDel)(selectedKeys, eventKey);
    } else if (!multiple) {
      selectedKeys = [eventKey];
    } else {
      selectedKeys = (0, _util.arrAdd)(selectedKeys, eventKey);
    }

    // [Legacy] Not found related usage in doc or upper libs
    // [Legacy] TODO: add optimize prop to skip node process
    var selectedNodes = [];
    if (selectedKeys.length) {
      (0, _util.traverseTreeNodes)(children, function (_ref2) {
        var node = _ref2.node,
            key = _ref2.key;

        if (selectedKeys.indexOf(key) !== -1) {
          selectedNodes.push(node);
        }
      });
    }

    _this2.setUncontrolledState({ selectedKeys: selectedKeys });

    if (onSelect) {
      var eventObj = {
        event: 'select',
        selected: targetSelected,
        node: treeNode,
        selectedNodes: selectedNodes
      };
      onSelect(selectedKeys, eventObj);
    }
  };

  this.onBatchNodeCheck = function (key, checked, halfChecked, startNode) {
    if (startNode) {
      _this2.checkedBatch = {
        treeNode: startNode,
        checked: checked,
        list: []
      };
    }

    // This code should never called
    if (!_this2.checkedBatch) {
      _this2.checkedBatch = {
        list: []
      };
      (0, _warning2['default'])(false, 'Checked batch not init. This should be a bug. Please fire a issue.');
    }

    _this2.checkedBatch.list.push({ key: key, checked: checked, halfChecked: halfChecked });
  };

  this.onCheckConductFinished = function () {
    var _state2 = _this2.state,
        checkedKeys = _state2.checkedKeys,
        halfCheckedKeys = _state2.halfCheckedKeys;
    var _props4 = _this2.props,
        onCheck = _props4.onCheck,
        checkStrictly = _props4.checkStrictly,
        children = _props4.children;

    // Use map to optimize update speed

    var checkedKeySet = {};
    var halfCheckedKeySet = {};

    checkedKeys.forEach(function (key) {
      checkedKeySet[key] = true;
    });
    halfCheckedKeys.forEach(function (key) {
      halfCheckedKeySet[key] = true;
    });

    // Batch process
    _this2.checkedBatch.list.forEach(function (_ref3) {
      var key = _ref3.key,
          checked = _ref3.checked,
          halfChecked = _ref3.halfChecked;

      checkedKeySet[key] = checked;
      halfCheckedKeySet[key] = halfChecked;
    });
    var newCheckedKeys = Object.keys(checkedKeySet).filter(function (key) {
      return checkedKeySet[key];
    });
    var newHalfCheckedKeys = Object.keys(halfCheckedKeySet).filter(function (key) {
      return halfCheckedKeySet[key];
    });

    // Trigger onChecked
    var selectedObj = void 0;

    var eventObj = {
      event: 'check',
      node: _this2.checkedBatch.treeNode,
      checked: _this2.checkedBatch.checked
    };

    if (checkStrictly) {
      selectedObj = (0, _util.getStrictlyValue)(newCheckedKeys, newHalfCheckedKeys);

      // [Legacy] TODO: add optimize prop to skip node process
      eventObj.checkedNodes = [];
      (0, _util.traverseTreeNodes)(children, function (_ref4) {
        var node = _ref4.node,
            key = _ref4.key;

        if (checkedKeySet[key]) {
          eventObj.checkedNodes.push(node);
        }
      });

      _this2.setUncontrolledState({ checkedKeys: newCheckedKeys });
    } else {
      selectedObj = newCheckedKeys;

      // [Legacy] TODO: add optimize prop to skip node process
      eventObj.checkedNodes = [];
      eventObj.checkedNodesPositions = []; // [Legacy] TODO: not in API
      eventObj.halfCheckedKeys = newHalfCheckedKeys; // [Legacy] TODO: not in API
      (0, _util.traverseTreeNodes)(children, function (_ref5) {
        var node = _ref5.node,
            pos = _ref5.pos,
            key = _ref5.key;

        if (checkedKeySet[key]) {
          eventObj.checkedNodes.push(node);
          eventObj.checkedNodesPositions.push({ node: node, pos: pos });
        }
      });

      _this2.setUncontrolledState({
        checkedKeys: newCheckedKeys,
        halfCheckedKeys: newHalfCheckedKeys
      });
    }

    if (onCheck) {
      onCheck(selectedObj, eventObj);
    }

    // Clean up
    _this2.checkedBatch = null;
  };

  this.onNodeExpand = function (e, treeNode) {
    var expandedKeys = _this2.state.expandedKeys;
    var _props5 = _this2.props,
        onExpand = _props5.onExpand,
        loadData = _props5.loadData;
    var _treeNode$props2 = treeNode.props,
        eventKey = _treeNode$props2.eventKey,
        expanded = _treeNode$props2.expanded;

    // Update selected keys

    var index = expandedKeys.indexOf(eventKey);
    var targetExpanded = !expanded;

    (0, _warning2['default'])(expanded && index !== -1 || !expanded && index === -1, 'Expand state not sync with index check');

    if (targetExpanded) {
      expandedKeys = (0, _util.arrAdd)(expandedKeys, eventKey);
    } else {
      expandedKeys = (0, _util.arrDel)(expandedKeys, eventKey);
    }

    _this2.setUncontrolledState({ expandedKeys: expandedKeys });

    if (onExpand) {
      onExpand(expandedKeys, { node: treeNode, expanded: targetExpanded });
    }

    // Async Load data
    if (targetExpanded && loadData) {
      return loadData(treeNode).then(function () {
        // [Legacy] Refresh logic
        _this2.setUncontrolledState({ expandedKeys: expandedKeys });
      });
    }

    return null;
  };

  this.onNodeMouseEnter = function (event, node) {
    var onMouseEnter = _this2.props.onMouseEnter;

    if (onMouseEnter) {
      onMouseEnter({ event: event, node: node });
    }
  };

  this.onNodeMouseLeave = function (event, node) {
    var onMouseLeave = _this2.props.onMouseLeave;

    if (onMouseLeave) {
      onMouseLeave({ event: event, node: node });
    }
  };

  this.onNodeContextMenu = function (event, node) {
    var onRightClick = _this2.props.onRightClick;

    if (onRightClick) {
      event.preventDefault();
      onRightClick({ event: event, node: node });
    }
  };

  this.getSyncProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var prevProps = arguments[1];

    var needSync = false;
    var newState = {};
    var myPrevProps = prevProps || {};

    function checkSync(name) {
      if (props[name] !== myPrevProps[name]) {
        needSync = true;
        return true;
      }
      return false;
    }

    // Children change will affect check box status.
    // And no need to check when prev props not provided
    if (prevProps && checkSync('children')) {
      var _ref6 = (0, _util.calcCheckedKeys)(props.checkedKeys || _this2.state.checkedKeys, props) || {},
          _ref6$checkedKeys = _ref6.checkedKeys,
          checkedKeys = _ref6$checkedKeys === undefined ? [] : _ref6$checkedKeys,
          _ref6$halfCheckedKeys = _ref6.halfCheckedKeys,
          halfCheckedKeys = _ref6$halfCheckedKeys === undefined ? [] : _ref6$halfCheckedKeys;

      newState.checkedKeys = checkedKeys;
      newState.halfCheckedKeys = halfCheckedKeys;
    }

    // Re-calculate when autoExpandParent or expandedKeys changed
    if (prevProps && (checkSync('autoExpandParent') || checkSync('expandedKeys'))) {
      newState.expandedKeys = props.autoExpandParent ? (0, _util.calcExpandedKeys)(props.expandedKeys, props) : props.expandedKeys;
    }

    if (checkSync('selectedKeys')) {
      newState.selectedKeys = (0, _util.calcSelectedKeys)(props.selectedKeys, props);
    }

    if (checkSync('checkedKeys')) {
      var _ref7 = (0, _util.calcCheckedKeys)(props.checkedKeys, props) || {},
          _ref7$checkedKeys = _ref7.checkedKeys,
          _checkedKeys = _ref7$checkedKeys === undefined ? [] : _ref7$checkedKeys,
          _ref7$halfCheckedKeys = _ref7.halfCheckedKeys,
          _halfCheckedKeys = _ref7$halfCheckedKeys === undefined ? [] : _ref7$halfCheckedKeys;

      newState.checkedKeys = _checkedKeys;
      newState.halfCheckedKeys = _halfCheckedKeys;
    }

    return needSync ? newState : null;
  };

  this.setUncontrolledState = function (state) {
    var needSync = false;
    var newState = {};

    Object.keys(state).forEach(function (name) {
      if (name in _this2.props) return;

      needSync = true;
      newState[name] = state[name];
    });

    _this2.setState(needSync ? newState : null);
  };

  this.isKeyChecked = function (key) {
    var _state$checkedKeys = _this2.state.checkedKeys,
        checkedKeys = _state$checkedKeys === undefined ? [] : _state$checkedKeys;

    return checkedKeys.indexOf(key) !== -1;
  };

  this.renderTreeNode = function (child, index) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _state3 = _this2.state,
        _state3$expandedKeys = _state3.expandedKeys,
        expandedKeys = _state3$expandedKeys === undefined ? [] : _state3$expandedKeys,
        _state3$selectedKeys = _state3.selectedKeys,
        selectedKeys = _state3$selectedKeys === undefined ? [] : _state3$selectedKeys,
        _state3$halfCheckedKe = _state3.halfCheckedKeys,
        halfCheckedKeys = _state3$halfCheckedKe === undefined ? [] : _state3$halfCheckedKe,
        dragOverNodeKey = _state3.dragOverNodeKey,
        dropPosition = _state3.dropPosition;
    (0, _objectDestructuringEmpty3['default'])(_this2.props);

    var pos = (0, _util.getPosition)(level, index);
    var key = child.key || pos;

    return (0, _react.cloneElement)(child, {
      eventKey: key,
      expanded: expandedKeys.indexOf(key) !== -1,
      selected: selectedKeys.indexOf(key) !== -1,
      checked: _this2.isKeyChecked(key),
      halfChecked: halfCheckedKeys.indexOf(key) !== -1,
      pos: pos,

      // [Legacy] Drag props
      dragOver: dragOverNodeKey === key && dropPosition === 0,
      dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
      dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
    });
  };
};

exports['default'] = Tree;