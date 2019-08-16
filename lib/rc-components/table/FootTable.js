'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = FootTable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _measureScrollbar = require('../../_util/measureScrollbar');

var _measureScrollbar2 = _interopRequireDefault(_measureScrollbar);

var _BaseTable = require('./BaseTable');

var _BaseTable2 = _interopRequireDefault(_BaseTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function FootTable(props, _ref) {
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
    var scrollbarWidth = (0, _measureScrollbar2['default'])('horizontal');
    if (scrollbarWidth > 0 && !fixed) {
      footStyle.marginBottom = '-' + scrollbarWidth + 'px';
      footStyle.paddingBottom = '0px';
    }
  }

  if (!useFixedHeader || !columnManager.hasFooter()) {
    return null;
  }

  return _react2['default'].createElement(
    'div',
    {
      key: 'footTable',
      ref: fixed ? null : saveRef('footTable'),
      className: prefixCls + '-column-footer',
      style: footStyle,
      onScroll: handleBodyScrollLeft
    },
    _react2['default'].createElement(_BaseTable2['default'], {
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
  fixed: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].bool]),
  columns: _propTypes2['default'].array.isRequired,
  tableClassName: _propTypes2['default'].string.isRequired,
  handleBodyScrollLeft: _propTypes2['default'].func.isRequired,
  expander: _propTypes2['default'].object.isRequired
};

FootTable.contextTypes = {
  table: _propTypes2['default'].any
};
module.exports = exports['default'];