'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _miniStore = require('mini-store');

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _warning = require('../../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableRow = function (_Component) {
  (0, _inherits3['default'])(TableRow, _Component);

  function TableRow(props) {
    (0, _classCallCheck3['default'])(this, TableRow);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call(this, props));

    _this.onRowClick = function (event) {
      var _this$props = _this.props,
          record = _this$props.record,
          index = _this$props.index,
          onRowClick = _this$props.onRowClick;

      if (onRowClick) {
        onRowClick(record, index, event);
      }
    };

    _this.onRowDoubleClick = function (event) {
      var _this$props2 = _this.props,
          record = _this$props2.record,
          index = _this$props2.index,
          onRowDoubleClick = _this$props2.onRowDoubleClick;

      if (onRowDoubleClick) {
        onRowDoubleClick(record, index, event);
      }
    };

    _this.onContextMenu = function (event) {
      var _this$props3 = _this.props,
          record = _this$props3.record,
          index = _this$props3.index,
          onRowContextMenu = _this$props3.onRowContextMenu;

      if (onRowContextMenu) {
        onRowContextMenu(record, index, event);
      }
    };

    _this.onMouseEnter = function (event) {
      var _this$props4 = _this.props,
          record = _this$props4.record,
          index = _this$props4.index,
          onRowMouseEnter = _this$props4.onRowMouseEnter,
          onHover = _this$props4.onHover,
          rowKey = _this$props4.rowKey;

      onHover(true, rowKey);
      if (onRowMouseEnter) {
        onRowMouseEnter(record, index, event);
      }
    };

    _this.onMouseLeave = function (event) {
      var _this$props5 = _this.props,
          record = _this$props5.record,
          index = _this$props5.index,
          onRowMouseLeave = _this$props5.onRowMouseLeave,
          onHover = _this$props5.onHover,
          rowKey = _this$props5.rowKey;

      onHover(false, rowKey);
      if (onRowMouseLeave) {
        onRowMouseLeave(record, index, event);
      }
    };

    _this.shouldRender = props.visible;
    return _this;
  }

  (0, _createClass3['default'])(TableRow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.shouldRender) {
        this.saveRowRef();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.visible || !this.props.visible && nextProps.visible) {
        this.shouldRender = true;
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !!(this.props.visible || nextProps.visible);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.shouldRender && !this.rowRef) {
        this.saveRowRef();
      }
    }
  }, {
    key: 'setExpanedRowHeight',
    value: function setExpanedRowHeight() {
      var _props = this.props,
          store = _props.store,
          rowKey = _props.rowKey;

      var _store$getState = store.getState(),
          expandedRowsHeight = _store$getState.expandedRowsHeight;

      var height = this.rowRef.getBoundingClientRect().height;
      expandedRowsHeight = (0, _extends4['default'])({}, expandedRowsHeight, (0, _defineProperty3['default'])({}, rowKey, height));
      store.setState({ expandedRowsHeight: expandedRowsHeight });
    }
  }, {
    key: 'setRowHeight',
    value: function setRowHeight() {
      var _props2 = this.props,
          store = _props2.store,
          index = _props2.index;

      var fixedColumnsBodyRowsHeight = store.getState().fixedColumnsBodyRowsHeight.slice();
      var height = this.rowRef.getBoundingClientRect().height;
      fixedColumnsBodyRowsHeight[index] = height;
      store.setState({ fixedColumnsBodyRowsHeight: fixedColumnsBodyRowsHeight });
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var _props3 = this.props,
          height = _props3.height,
          visible = _props3.visible;


      if (height && height !== this.style.height) {
        this.style = (0, _extends4['default'])({}, this.style, { height: height });
      }

      if (!visible && !this.style.display) {
        this.style = (0, _extends4['default'])({}, this.style, { display: 'none' });
      }

      return this.style;
    }
  }, {
    key: 'saveRowRef',
    value: function saveRowRef() {
      this.rowRef = _reactDom2['default'].findDOMNode(this);

      var _props4 = this.props,
          isAnyColumnsFixed = _props4.isAnyColumnsFixed,
          fixed = _props4.fixed,
          expandedRow = _props4.expandedRow,
          ancestorKeys = _props4.ancestorKeys;


      if (!isAnyColumnsFixed) {
        return;
      }

      if (!fixed && expandedRow) {
        this.setExpanedRowHeight();
      }

      if (!fixed && ancestorKeys.length >= 0) {
        this.setRowHeight();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.shouldRender) {
        return null;
      }

      var _props5 = this.props,
          prefixCls = _props5.prefixCls,
          columns = _props5.columns,
          record = _props5.record,
          index = _props5.index,
          onRow = _props5.onRow,
          indent = _props5.indent,
          indentSize = _props5.indentSize,
          hovered = _props5.hovered,
          height = _props5.height,
          visible = _props5.visible,
          components = _props5.components,
          hasExpandIcon = _props5.hasExpandIcon,
          renderExpandIcon = _props5.renderExpandIcon,
          renderExpandIconCell = _props5.renderExpandIconCell;


      var BodyRow = components.body.row;
      var BodyCell = components.body.cell;

      var className = this.props.className;


      if (hovered) {
        className += ' ' + prefixCls + '-hover';
      }

      var cells = [];

      renderExpandIconCell(cells);

      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];

        (0, _warning2['default'])(column.onCellClick === undefined, 'column[onCellClick] is deprecated, please use column[onCell] instead.');

        cells.push(_react2['default'].createElement(_TableCell2['default'], {
          prefixCls: prefixCls,
          record: record,
          indentSize: indentSize,
          indent: indent,
          index: index,
          column: column,
          key: column.key || column.dataIndex,
          expandIcon: hasExpandIcon(i) && renderExpandIcon(),
          component: BodyCell
        }));
      }

      var rowClassName = (prefixCls + ' ' + className + ' ' + prefixCls + '-level-' + indent).trim();

      var rowProps = onRow(record, index);
      var customStyle = rowProps ? rowProps.style : {};
      var style = { height: height };

      if (!visible) {
        style.display = 'none';
      }

      style = (0, _extends4['default'])({}, style, customStyle);

      return _react2['default'].createElement(
        BodyRow,
        (0, _extends4['default'])({
          onClick: this.onRowClick,
          onDoubleClick: this.onRowDoubleClick,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          onContextMenu: this.onContextMenu,
          className: rowClassName
        }, rowProps, {
          style: style
        }),
        cells
      );
    }
  }]);
  return TableRow;
}(_react.Component);

TableRow.propTypes = {
  onRow: _propTypes2['default'].func,
  onRowClick: _propTypes2['default'].func,
  onRowDoubleClick: _propTypes2['default'].func,
  onRowContextMenu: _propTypes2['default'].func,
  onRowMouseEnter: _propTypes2['default'].func,
  onRowMouseLeave: _propTypes2['default'].func,
  record: _propTypes2['default'].object,
  prefixCls: _propTypes2['default'].string,
  onHover: _propTypes2['default'].func,
  columns: _propTypes2['default'].array,
  height: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
  index: _propTypes2['default'].number,
  rowKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]).isRequired,
  className: _propTypes2['default'].string,
  indent: _propTypes2['default'].number,
  indentSize: _propTypes2['default'].number,
  hasExpandIcon: _propTypes2['default'].func.isRequired,
  hovered: _propTypes2['default'].bool.isRequired,
  visible: _propTypes2['default'].bool.isRequired,
  store: _propTypes2['default'].object.isRequired,
  fixed: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].bool]),
  renderExpandIcon: _propTypes2['default'].func,
  renderExpandIconCell: _propTypes2['default'].func,
  components: _propTypes2['default'].any,
  expandedRow: _propTypes2['default'].bool,
  isAnyColumnsFixed: _propTypes2['default'].bool,
  ancestorKeys: _propTypes2['default'].array.isRequired
};
TableRow.defaultProps = {
  onRow: function onRow() {},

  expandIconColumnIndex: 0,
  expandRowByClick: false,
  onHover: function onHover() {},
  hasExpandIcon: function hasExpandIcon() {},
  renderExpandIcon: function renderExpandIcon() {},
  renderExpandIconCell: function renderExpandIconCell() {}
};


function getRowHeight(state, props) {
  var expandedRowsHeight = state.expandedRowsHeight,
      fixedColumnsBodyRowsHeight = state.fixedColumnsBodyRowsHeight;
  var fixed = props.fixed,
      index = props.index,
      rowKey = props.rowKey;


  if (!fixed) {
    return null;
  }

  if (expandedRowsHeight[rowKey]) {
    return expandedRowsHeight[rowKey];
  }

  if (fixedColumnsBodyRowsHeight[index]) {
    return fixedColumnsBodyRowsHeight[index];
  }

  return null;
}

exports['default'] = (0, _miniStore.connect)(function (state, props) {
  var currentHoverKey = state.currentHoverKey,
      expandedRowKeys = state.expandedRowKeys;
  var rowKey = props.rowKey,
      ancestorKeys = props.ancestorKeys;

  var visible = ancestorKeys.length === 0 || ancestorKeys.every(function (k) {
    return ~expandedRowKeys.indexOf(k);
  });

  return {
    visible: visible,
    hovered: currentHoverKey === rowKey,
    height: getRowHeight(state, props)
  };
})(TableRow);
module.exports = exports['default'];