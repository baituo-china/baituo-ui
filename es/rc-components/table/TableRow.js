import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import TableCell from './TableCell';
import warning from '../../_util/warning';

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props) {
    _classCallCheck(this, TableRow);

    var _this = _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call(this, props));

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

  _createClass(TableRow, [{
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
      expandedRowsHeight = _extends({}, expandedRowsHeight, _defineProperty({}, rowKey, height));
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
        this.style = _extends({}, this.style, { height: height });
      }

      if (!visible && !this.style.display) {
        this.style = _extends({}, this.style, { display: 'none' });
      }

      return this.style;
    }
  }, {
    key: 'saveRowRef',
    value: function saveRowRef() {
      this.rowRef = ReactDOM.findDOMNode(this);

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

        warning(column.onCellClick === undefined, 'column[onCellClick] is deprecated, please use column[onCell] instead.');

        cells.push(React.createElement(TableCell, {
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

      style = _extends({}, style, customStyle);

      return React.createElement(
        BodyRow,
        _extends({
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
}(Component);

TableRow.propTypes = {
  onRow: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  onRowContextMenu: PropTypes.func,
  onRowMouseEnter: PropTypes.func,
  onRowMouseLeave: PropTypes.func,
  record: PropTypes.object,
  prefixCls: PropTypes.string,
  onHover: PropTypes.func,
  columns: PropTypes.array,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  indent: PropTypes.number,
  indentSize: PropTypes.number,
  hasExpandIcon: PropTypes.func.isRequired,
  hovered: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  renderExpandIcon: PropTypes.func,
  renderExpandIconCell: PropTypes.func,
  components: PropTypes.any,
  expandedRow: PropTypes.bool,
  isAnyColumnsFixed: PropTypes.bool,
  ancestorKeys: PropTypes.array.isRequired
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

export default connect(function (state, props) {
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