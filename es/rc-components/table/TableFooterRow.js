import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';

var FOOTER_ROW_KEY = 'rc_table_footer_key_' + Date.now();

function getColumnFooter(col) {
  if (typeof col.footer === 'function') return col.footer;
  return function () {
    return col.footer;
  };
}

var TableFooterRow = function (_Component) {
  _inherits(TableFooterRow, _Component);

  function TableFooterRow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableFooterRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableFooterRow.__proto__ || Object.getPrototypeOf(TableFooterRow)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseEnter = function () {
      var onHover = _this.props.onHover;

      if (onHover) {
        onHover(true, FOOTER_ROW_KEY);
      }
    }, _this.handleMouseLeave = function () {
      var onHover = _this.props.onHover;

      if (onHover) {
        onHover(false, FOOTER_ROW_KEY);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableFooterRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          columns = _props.columns,
          data = _props.data,
          components = _props.components,
          prefixCls = _props.prefixCls,
          hovered = _props.hovered,
          height = _props.height;

      var FooterRow = components.footer.row;
      var FooterCell = components.footer.cell;

      var className = prefixCls + '-footer-row';
      if (hovered) {
        className += ' ' + prefixCls + '-row-hover';
      }

      return React.createElement(
        FooterRow,
        {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          className: className,
          style: { height: height }
        },
        columns.map(function (col) {
          return React.createElement(
            FooterCell,
            {
              key: col.key || col.dataIndex
            },
            col.footer ? getColumnFooter(col)(data) : null
          );
        })
      );
    }
  }]);

  return TableFooterRow;
}(Component);

TableFooterRow.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  components: PropTypes.any,
  prefixCls: PropTypes.string,
  onHover: PropTypes.func,
  hovered: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};


function getRowHeight(state, props) {
  var fixedColumnsFootRowsHeight = state.fixedColumnsFootRowsHeight;
  var fixed = props.fixed;

  return fixed ? fixedColumnsFootRowsHeight[0] : null;
}

export default connect(function (state, props) {
  return {
    hovered: state.currentHoverKey === FOOTER_ROW_KEY,
    height: getRowHeight(state, props)
  };
})(TableFooterRow);