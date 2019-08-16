'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMinWidth = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.minColumnWidth = minColumnWidth;
exports.columnWidth = columnWidth;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var defaultMinWidth = exports.defaultMinWidth = 100;

var Column = function (_Component) {
  (0, _inherits3['default'])(Column, _Component);

  function Column() {
    (0, _classCallCheck3['default'])(this, Column);
    return (0, _possibleConstructorReturn3['default'])(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
  }

  return Column;
}(_react.Component);

exports['default'] = Column;

Column.propTypes = {
  /**
   * 列对照的字段名
   */
  name: _propTypes2['default'].string,
  /**
   * 列宽
   * 不推荐给所有列设置宽度，而是给某一列不设置宽度达到自动宽度的效果
   */
  width: _propTypes2['default'].number,
  /**
   * 最小列宽
   */
  minWidth: _propTypes2['default'].number,
  /**
   * 列头
   */
  header: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element, _propTypes2['default'].func]),
  /**
   * 列脚
   */
  footer: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element, _propTypes2['default'].func]),
  /**
   * 单元格渲染回调
   */
  renderer: _propTypes2['default'].func,
  /**
   * 编辑器
   */
  editor: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].func, _propTypes2['default'].bool]),
  /**
   * 是否锁定
   * 可选值： false | true | 'left' | 'right'
   * @default false
   */
  lock: _propTypes2['default'].oneOf(["left" /* left */, "right" /* right */, true, false]),
  /**
   * 文字对齐方式
   * 可选值： 'left' | 'center' | 'right'
   */
  align: _propTypes2['default'].oneOf(["left" /* left */, "center" /* center */, "right" /* right */]),
  /**
   * 是否可调整宽度
   * @default true
   */
  resizable: _propTypes2['default'].bool,
  /**
   * 是否可排序
   * @default false
   */
  sortable: _propTypes2['default'].bool,
  /**
   * 是否可隐藏，设为false时不会出现在列过滤选项中
   * @default true
   */
  hideable: _propTypes2['default'].bool,
  /**
   * 是否可排序
   * @default false
   */
  /**
   * 列头提示信息
   */
  help: _propTypes2['default'].string,
  /**
   * 显示提示信息的方式
   *
   */
  showHelp: _propTypes2['default'].oneOf(["tooltip" /* tooltip */
  , "newLine" /* newLine */
  , "none" /* none */
  ]),
  colSpan: _propTypes2['default'].number,
  rowSpan: _propTypes2['default'].number,
  children: _propTypes2['default'].array
};
Column.defaultProps = {
  hidden: false,
  lock: false,
  resizable: true,
  sortable: false,
  hideable: true,
  minWidth: defaultMinWidth,
  showHelp: "tooltip" /* tooltip */
};
function minColumnWidth(col) {
  var hidden = (0, _mobx.get)(col, 'hidden');
  if (hidden) {
    return 0;
  }
  var width = (0, _mobx.get)(col, 'width');
  var min = (0, _mobx.get)(col, 'minWidth');
  var minWidth = min === void 0 ? defaultMinWidth : min;
  if (width === void 0) {
    return minWidth;
  }
  return Math.min(width, minWidth);
}
function columnWidth(col) {
  var hidden = (0, _mobx.get)(col, 'hidden');
  if (hidden) {
    return 0;
  }
  var width = (0, _mobx.get)(col, 'width');
  if (width === void 0) {
    var minWidth = (0, _mobx.get)(col, 'minWidth');
    if (minWidth === void 0) {
      return defaultMinWidth;
    }
    return minWidth;
  }
  return width;
}