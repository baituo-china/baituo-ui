import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import React from 'react';
import PropTypes from 'prop-types';
import TableFooterRow from './TableFooterRow';

function appendExpandIconColumn(columns) {
  var expandIconCol = {
    key: 'expand-icon-placeholder',
    render: function render() {
      return null;
    }
  };
  return [expandIconCol].concat(_toConsumableArray(columns));
}

export default function TableFooter(props, _ref) {
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

  return React.createElement(
    FooterWrapper,
    { className: prefixCls + '-tfoot' },
    React.createElement(TableFooterRow, {
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
  fixed: PropTypes.string,
  columns: PropTypes.array.isRequired,
  onHover: PropTypes.func
};

TableFooter.contextTypes = {
  table: PropTypes.any
};