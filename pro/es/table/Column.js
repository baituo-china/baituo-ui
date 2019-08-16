import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'mobx';
export var defaultMinWidth = 100;

var Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
  }

  return Column;
}(Component);

export default Column;

Column.propTypes = {
  /**
   * 列对照的字段名
   */
  name: PropTypes.string,
  /**
   * 列宽
   * 不推荐给所有列设置宽度，而是给某一列不设置宽度达到自动宽度的效果
   */
  width: PropTypes.number,
  /**
   * 最小列宽
   */
  minWidth: PropTypes.number,
  /**
   * 列头
   */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  /**
   * 列脚
   */
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  /**
   * 单元格渲染回调
   */
  renderer: PropTypes.func,
  /**
   * 编辑器
   */
  editor: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.bool]),
  /**
   * 是否锁定
   * 可选值： false | true | 'left' | 'right'
   * @default false
   */
  lock: PropTypes.oneOf(["left" /* left */, "right" /* right */, true, false]),
  /**
   * 文字对齐方式
   * 可选值： 'left' | 'center' | 'right'
   */
  align: PropTypes.oneOf(["left" /* left */, "center" /* center */, "right" /* right */]),
  /**
   * 是否可调整宽度
   * @default true
   */
  resizable: PropTypes.bool,
  /**
   * 是否可排序
   * @default false
   */
  sortable: PropTypes.bool,
  /**
   * 是否可隐藏，设为false时不会出现在列过滤选项中
   * @default true
   */
  hideable: PropTypes.bool,
  /**
   * 是否可排序
   * @default false
   */
  /**
   * 列头提示信息
   */
  help: PropTypes.string,
  /**
   * 显示提示信息的方式
   *
   */
  showHelp: PropTypes.oneOf(["tooltip" /* tooltip */
  , "newLine" /* newLine */
  , "none" /* none */
  ]),
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  children: PropTypes.array
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
export function minColumnWidth(col) {
  var hidden = get(col, 'hidden');
  if (hidden) {
    return 0;
  }
  var width = get(col, 'width');
  var min = get(col, 'minWidth');
  var minWidth = min === void 0 ? defaultMinWidth : min;
  if (width === void 0) {
    return minWidth;
  }
  return Math.min(width, minWidth);
}
export function columnWidth(col) {
  var hidden = get(col, 'hidden');
  if (hidden) {
    return 0;
  }
  var width = get(col, 'width');
  if (width === void 0) {
    var minWidth = get(col, 'minWidth');
    if (minWidth === void 0) {
      return defaultMinWidth;
    }
    return minWidth;
  }
  return width;
}