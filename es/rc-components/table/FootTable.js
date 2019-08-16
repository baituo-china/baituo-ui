import React from 'react';
import PropTypes from 'prop-types';
import measureScrollbar from '../../_util/measureScrollbar';
import BaseTable from './BaseTable';

export default function FootTable(props, _ref) {
  var table = _ref.table;
  var _table$props = table.props,
      prefixCls = _table$props.prefixCls,
      scroll = _table$props.scroll;
  var columns = props.columns,
      fixed = props.fixed,
      tableClassName = props.tableClassName,
      handleBodyScrollLeft = props.handleBodyScrollLeft,
      expander = props.expander;
  var saveRef = table.saveRef,
      columnManager = table.columnManager;
  var useFixedHeader = table.props.useFixedHeader;

  var footStyle = {};

  if (scroll.y) {
    useFixedHeader = true;
    // Add negative margin bottom for scroll bar overflow bug
    var scrollbarWidth = measureScrollbar('horizontal');
    if (scrollbarWidth > 0 && !fixed) {
      footStyle.marginBottom = '-' + scrollbarWidth + 'px';
      footStyle.paddingBottom = '0px';
    }
  }

  if (!useFixedHeader || !columnManager.hasFooter()) {
    return null;
  }

  return React.createElement(
    'div',
    {
      key: 'footTable',
      ref: fixed ? null : saveRef('footTable'),
      className: prefixCls + '-column-footer',
      style: footStyle,
      onScroll: handleBodyScrollLeft
    },
    React.createElement(BaseTable, {
      tableClassName: tableClassName,
      hasHead: false,
      hasBody: false,
      hasFoot: true,
      fixed: fixed,
      columns: columns,
      expander: expander
    })
  );
}

FootTable.propTypes = {
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  columns: PropTypes.array.isRequired,
  tableClassName: PropTypes.string.isRequired,
  handleBodyScrollLeft: PropTypes.func.isRequired,
  expander: PropTypes.object.isRequired
};

FootTable.contextTypes = {
  table: PropTypes.any
};