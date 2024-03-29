'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _miniStore = require('mini-store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function TableHeaderRow(_ref) {
  var row = _ref.row,
      index = _ref.index,
      height = _ref.height,
      components = _ref.components,
      onHeaderRow = _ref.onHeaderRow;

  var HeaderRow = components.header.row;
  var HeaderCell = components.header.cell;
  var rowProps = onHeaderRow(row.map(function (cell) {
    return cell.column;
  }), index);
  var customStyle = rowProps ? rowProps.style : {};
  var style = (0, _extends3['default'])({ height: height }, customStyle);

  return _react2['default'].createElement(
    HeaderRow,
    (0, _extends3['default'])({}, rowProps, { style: style }),
    row.map(function (cell, i) {
      var column = cell.column,
          cellProps = (0, _objectWithoutProperties3['default'])(cell, ['column']);

      var customProps = column.onHeaderCell ? column.onHeaderCell(column) : {};
      if (column.align) {
        cellProps.style = { textAlign: column.align };
      }
      return _react2['default'].createElement(HeaderCell, (0, _extends3['default'])({}, cellProps, customProps, {
        key: column.key || column.dataIndex || i
      }));
    })
  );
}

function getRowHeight(state, props) {
  var fixedColumnsHeadRowsHeight = state.fixedColumnsHeadRowsHeight;
  var columns = props.columns,
      rows = props.rows,
      fixed = props.fixed;

  var headerHeight = fixedColumnsHeadRowsHeight[0];

  if (!fixed) {
    return null;
  }

  if (headerHeight && columns) {
    if (headerHeight === 'auto') {
      return 'auto';
    }
    return headerHeight / rows.length;
  }
  return null;
}

exports['default'] = (0, _miniStore.connect)(function (state, props) {
  return {
    height: getRowHeight(state, props)
  };
})(TableHeaderRow);
module.exports = exports['default'];