import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { cloneElement, Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { action, set } from 'mobx';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import defaultTo from 'lodash/defaultTo';
import isString from 'lodash/isString';
import classes from 'component-classes';
import { minColumnWidth } from './Column';
import TableContext from './TableContext';
import Icon from '../icon';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import EventManager from '../_util/EventManager';
import { getAlignByField, getColumnKey, getHeader } from './utils';
import Tooltip from '../tooltip';
var TableHeaderCell = function (_Component) {
    _inherits(TableHeaderCell, _Component);

    function TableHeaderCell() {
        _classCallCheck(this, TableHeaderCell);

        var _this = _possibleConstructorReturn(this, (TableHeaderCell.__proto__ || Object.getPrototypeOf(TableHeaderCell)).apply(this, arguments));

        _this.resizeEvent = new EventManager(typeof window !== 'undefined' && document);
        _this.resizeBoundary = 0;
        _this.handleClick = function () {
            var _this$props = _this.props,
                column = _this$props.column,
                dataSet = _this$props.dataSet;
            var name = column.name;

            if (name) {
                dataSet.sort(name);
            }
        };
        _this.handleLeftResize = function (e) {
            _this.setResizeColumn(_this.props.prevColumn);
            _this.resizeStart(e);
        };
        _this.handleRightResize = function (e) {
            _this.setResizeColumn(_this.props.resizeColumn);
            _this.resizeStart(e);
        };
        _this.resize = function (e) {
            var column = _this.resizeColumn;
            var limit = _this.resizeBoundary + minColumnWidth(column);
            var left = e.pageX;
            if (left < limit) {
                left = limit;
            }
            _this.resizePosition = _this.setSplitLinePosition(left);
        };
        _this.resizeEnd = function () {
            _this.resizeEvent.removeEventListener('mousemove').removeEventListener('mouseup');
            var column = _this.resizeColumn;
            if (_this.resizePosition && column) {
                var newWidth = Math.max(_this.resizePosition - _this.resizeBoundary, minColumnWidth(column));
                if (newWidth !== column.width) {
                    set(column, 'width', newWidth);
                    return;
                }
            }
            classes(_this.context.tableStore.node.element).remove(_this.props.prefixCls + '-resizing');
        };
        return _this;
    }

    _createClass(TableHeaderCell, [{
        key: 'getNode',
        value: function getNode(column) {
            var headerDom = this.props.getHeaderNode();
            if (headerDom) {
                return headerDom.querySelector('[data-index="' + getColumnKey(column) + '"]');
            }
        }
    }, {
        key: 'setResizeColumn',
        value: function setResizeColumn(column) {
            this.resizeColumn = column;
            var node = this.getNode(column);
            if (node) {
                this.resizeBoundary = node.getBoundingClientRect().left;
            }
        }
    }, {
        key: 'resizeStart',
        value: function resizeStart(e) {
            classes(this.context.tableStore.node.element).add(this.props.prefixCls + '-resizing');
            delete this.resizePosition;
            this.setSplitLinePosition(e.pageX);
            this.resizeEvent.addEventListener('mousemove', this.resize).addEventListener('mouseup', this.resizeEnd);
        }
    }, {
        key: 'setSplitLinePosition',
        value: function setSplitLinePosition(left) {
            var resizeLine = this.context.tableStore.node.resizeLine;

            var _resizeLine$offsetPar = resizeLine.offsetParent.getBoundingClientRect(),
                rectLeft = _resizeLine$offsetPar.left,
                width = _resizeLine$offsetPar.width;

            left -= rectLeft;
            if (left < 0) {
                left = 0;
            } else if (left >= width) {
                left = width - 1;
            }
            resizeLine.style.left = pxToRem(left) || null;
            return left + rectLeft;
        }
    }, {
        key: 'renderResizer',
        value: function renderResizer() {
            var _props = this.props,
                prevColumn = _props.prevColumn,
                column = _props.column,
                prefixCls = _props.prefixCls;

            var resizerPrefixCls = prefixCls + '-resizer';
            var pre = prevColumn && prevColumn.resizable && React.createElement('div', { key: 'pre', className: resizerPrefixCls + ' ' + resizerPrefixCls + '-left', onMouseDown: this.handleLeftResize });
            var next = column.resizable && React.createElement('div', { key: 'next', className: resizerPrefixCls + ' ' + resizerPrefixCls + '-right', onMouseDown: this.handleRightResize });
            return [pre, next];
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                column = _props2.column,
                prefixCls = _props2.prefixCls,
                dataSet = _props2.dataSet,
                rowSpan = _props2.rowSpan,
                colSpan = _props2.colSpan;
            var _context$tableStore = this.context.tableStore,
                rowHeight = _context$tableStore.rowHeight,
                columnResizable = _context$tableStore.columnResizable;

            var sortPrefixCls = prefixCls + '-sort';
            var headerClassName = column.headerClassName,
                _column$headerStyle = column.headerStyle,
                headerStyle = _column$headerStyle === undefined ? {} : _column$headerStyle,
                sortable = column.sortable,
                name = column.name,
                align = column.align,
                help = column.help,
                showHelp = column.showHelp,
                children = column.children,
                command = column.command;

            var classList = [prefixCls + '-cell'];
            var field = dataSet.getField(name);
            if (headerClassName) {
                classList.push(headerClassName);
            }
            var headerNode = getHeader(column, dataSet);
            var innerProps = {
                className: prefixCls + '-cell-inner',
                children: [isValidElement(headerNode) ? cloneElement(headerNode, { key: 'text' }) : isString(headerNode) ? React.createElement(
                    'span',
                    { key: 'text' },
                    headerNode
                ) : headerNode]
            };
            var cellStyle = _extends({
                textAlign: align || (command || children && children.length ? "center" /* center */ : getAlignByField(field))
            }, headerStyle);
            if (rowHeight !== 'auto') {
                innerProps.style = {
                    height: pxToRem(rowHeight)
                };
            }
            if (showHelp !== "none" /* none */) {
                    var fieldHelp = defaultTo(field && field.get('help'), help);
                    if (fieldHelp) {
                        var helpIcon = React.createElement(
                            Tooltip,
                            { title: fieldHelp, placement: 'bottom', key: 'help' },
                            React.createElement(Icon, { type: 'help_outline', className: prefixCls + '-help-icon' })
                        );
                        if (cellStyle.textAlign === "right" /* right */) {
                                innerProps.children.unshift(helpIcon);
                            } else {
                            innerProps.children.push(helpIcon);
                        }
                    }
                }
            if (sortable && name) {
                if (field) {
                    var order = field.order;

                    if (order) {
                        classList.push(sortPrefixCls + '-' + order);
                    }
                }
                innerProps.onClick = this.handleClick;
                var icon = React.createElement(Icon, { key: 'sort', type: 'arrow_upward', className: sortPrefixCls + '-icon' });
                if (cellStyle.textAlign === "right" /* right */) {
                        innerProps.children.unshift(icon);
                    } else {
                    innerProps.children.push(icon);
                }
            }
            return React.createElement(
                'th',
                { className: classList.join(' '), style: omit(cellStyle, ['width', 'height']), rowSpan: rowSpan, colSpan: colSpan, 'data-index': getColumnKey(column) },
                React.createElement('div', innerProps),
                columnResizable && this.renderResizer()
            );
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.resizeEvent.clear();
        }
    }]);

    return TableHeaderCell;
}(Component);
TableHeaderCell.displayName = 'TableHeaderCell';
TableHeaderCell.propTypes = {
    column: PropTypes.object.isRequired
};
TableHeaderCell.contextType = TableContext;
tslib_1.__decorate([action], TableHeaderCell.prototype, "resizeStart", null);
tslib_1.__decorate([action], TableHeaderCell.prototype, "resizeEnd", void 0);
tslib_1.__decorate([action], TableHeaderCell.prototype, "setSplitLinePosition", null);
TableHeaderCell = tslib_1.__decorate([observer], TableHeaderCell);
export default TableHeaderCell;