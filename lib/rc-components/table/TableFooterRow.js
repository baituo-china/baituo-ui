'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _miniStore = require('mini-store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FOOTER_ROW_KEY = 'rc_table_footer_key_' + Date.now();

function getColumnFooter(col) {
  if (typeof col.footer === 'function') return col.footer;
  return function () {
    return col.footer;
  };
}

var TableFooterRow = function (_Component) {
  (0, _inherits3['default'])(TableFooterRow, _Component);

  function TableFooterRow() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, TableFooterRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = TableFooterRow.__proto__ || Object.getPrototypeOf(TableFooterRow)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseEnter = function () {
      var onHover = _this.props.onHover;

      if (onHover) {
        onHover(true, FOOTER_ROW_KEY);
      }
    }, _this.handleMouseLeave = function () {
      var onHover = _this.props.onHover;

      if (onHover) {
        onHover(false, FOOTER_ROW_KEY);
      }
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(TableFooterRow, [{
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

      return _react2['default'].createElement(
        FooterRow,
        {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          className: className,
          style: { height: height }
        },
        columns.map(function (col) {
          return _react2['default'].createElement(
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
}(_react.Component);

TableFooterRow.propTypes = {
  columns: _propTypes2['default'].array,
  data: _propTypes2['default'].array,
  components: _propTypes2['default'].any,
  prefixCls: _propTypes2['default'].string,
  onHover: _propTypes2['default'].func,
  hovered: _propTypes2['default'].bool,
  height: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])
};


function getRowHeight(state, props) {
  var fixedColumnsFootRowsHeight = state.fixedColumnsFootRowsHeight;
  var fixed = props.fixed;

  return fixed ? fixedColumnsFootRowsHeight[0] : null;
}

exports['default'] = (0, _miniStore.connect)(function (state, props) {
  return {
    hovered: state.currentHoverKey === FOOTER_ROW_KEY,
    height: getRowHeight(state, props)
  };
})(TableFooterRow);
module.exports = exports['default'];