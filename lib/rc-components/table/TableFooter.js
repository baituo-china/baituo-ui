'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports['default'] = TableFooter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TableFooterRow = require('./TableFooterRow');

var _TableFooterRow2 = _interopRequireDefault(_TableFooterRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function appendExpandIconColumn(columns) {
  var expandIconCol = {
    key: 'expand-icon-placeholder',
    render: function render() {
      return null;
    }
  };
  return [expandIconCol].concat((0, _toConsumableArray3['default'])(columns));
}

function TableFooter(props, _ref) {
  var table = _ref.table;
  var columnManager = table.columnManager,
      components = table.components;
  var _table$props = table.props,
      prefixCls = _table$props.prefixCls,
      data = _table$props.data,
      expandIconAsCell = _table$props.expandIconAsCell;
  var fixed = props.fixed,
      onHover = props.onHover;


  var leafColumns = void 0;
  if (fixed === 'left') {
    leafColumns = columnManager.leftLeafColumns();
    if (expandIconAsCell) {
      leafColumns = appendExpandIconColumn(leafColumns);
    }
  } else if (fixed === 'right') {
    leafColumns = columnManager.rightLeafColumns();
  } else {
    leafColumns = columnManager.leafColumns();
    if (expandIconAsCell) {
      leafColumns = appendExpandIconColumn(leafColumns);
    }
  }

  var FooterWrapper = components.footer.wrapper;

  return _react2['default'].createElement(
    FooterWrapper,
    { className: prefixCls + '-tfoot' },
    _react2['default'].createElement(_TableFooterRow2['default'], {
      prefixCls: prefixCls,
      columns: leafColumns,
      components: components,
      fixed: fixed,
      data: data,
      onHover: columnManager.isAnyColumnsFixed() ? onHover : null
    })
  );
}

TableFooter.propTypes = {
  fixed: _propTypes2['default'].string,
  columns: _propTypes2['default'].array.isRequired,
  onHover: _propTypes2['default'].func
};

TableFooter.contextTypes = {
  table: _propTypes2['default'].any
};
module.exports = exports['default'];