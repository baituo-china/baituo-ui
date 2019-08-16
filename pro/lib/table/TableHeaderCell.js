'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _defaultTo = require('lodash/defaultTo');

var _defaultTo2 = _interopRequireDefault(_defaultTo);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _Column = require('./Column');

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _EventManager = require('../_util/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

var _utils = require('./utils');

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableHeaderCell = function (_Component) {
    (0, _inherits3['default'])(TableHeaderCell, _Component);

    function TableHeaderCell() {
        (0, _classCallCheck3['default'])(this, TableHeaderCell);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableHeaderCell.__proto__ || Object.getPrototypeOf(TableHeaderCell)).apply(this, arguments));

        _this.resizeEvent = new _EventManager2['default'](typeof window !== 'undefined' && document);
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
            var limit = _this.resizeBoundary + (0, _Column.minColumnWidth)(column);
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
                var newWidth = Math.max(_this.resizePosition - _this.resizeBoundary, (0, _Column.minColumnWidth)(column));
                if (newWidth !== column.width) {
                    (0, _mobx.set)(column, 'width', newWidth);
                    return;
                }
            }
            (0, _componentClasses2['default'])(_this.context.tableStore.node.element).remove(_this.props.prefixCls + '-resizing');
        };
        return _this;
    }

    (0, _createClass3['default'])(TableHeaderCell, [{
        key: 'getNode',
        value: function getNode(column) {
            var headerDom = this.props.getHeaderNode();
            if (headerDom) {
                return headerDom.querySelector('[data-index="' + (0, _utils.getColumnKey)(column) + '"]');
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
            (0, _componentClasses2['default'])(this.context.tableStore.node.element).add(this.props.prefixCls + '-resizing');
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
            resizeLine.style.left = (0, _UnitConvertor.pxToRem)(left) || null;
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
            var pre = prevColumn && prevColumn.resizable && _react2['default'].createElement('div', { key: 'pre', className: resizerPrefixCls + ' ' + resizerPrefixCls + '-left', onMouseDown: this.handleLeftResize });
            var next = column.resizable && _react2['default'].createElement('div', { key: 'next', className: resizerPrefixCls + ' ' + resizerPrefixCls + '-right', onMouseDown: this.handleRightResize });
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
            var headerNode = (0, _utils.getHeader)(column, dataSet);
            var innerProps = {
                className: prefixCls + '-cell-inner',
                children: [(0, _react.isValidElement)(headerNode) ? (0, _react.cloneElement)(headerNode, { key: 'text' }) : (0, _isString2['default'])(headerNode) ? _react2['default'].createElement(
                    'span',
                    { key: 'text' },
                    headerNode
                ) : headerNode]
            };
            var cellStyle = (0, _extends3['default'])({
                textAlign: align || (command || children && children.length ? "center" /* center */ : (0, _utils.getAlignByField)(field))
            }, headerStyle);
            if (rowHeight !== 'auto') {
                innerProps.style = {
                    height: (0, _UnitConvertor.pxToRem)(rowHeight)
                };
            }
            if (showHelp !== "none" /* none */) {
                    var fieldHelp = (0, _defaultTo2['default'])(field && field.get('help'), help);
                    if (fieldHelp) {
                        var helpIcon = _react2['default'].createElement(
                            _tooltip2['default'],
                            { title: fieldHelp, placement: 'bottom', key: 'help' },
                            _react2['default'].createElement(_icon2['default'], { type: 'help_outline', className: prefixCls + '-help-icon' })
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
                var icon = _react2['default'].createElement(_icon2['default'], { key: 'sort', type: 'arrow_upward', className: sortPrefixCls + '-icon' });
                if (cellStyle.textAlign === "right" /* right */) {
                        innerProps.children.unshift(icon);
                    } else {
                    innerProps.children.push(icon);
                }
            }
            return _react2['default'].createElement(
                'th',
                { className: classList.join(' '), style: (0, _omit2['default'])(cellStyle, ['width', 'height']), rowSpan: rowSpan, colSpan: colSpan, 'data-index': (0, _utils.getColumnKey)(column) },
                _react2['default'].createElement('div', innerProps),
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
}(_react.Component);
TableHeaderCell.displayName = 'TableHeaderCell';
TableHeaderCell.propTypes = {
    column: _propTypes2['default'].object.isRequired
};
TableHeaderCell.contextType = _TableContext2['default'];
tslib_1.__decorate([_mobx.action], TableHeaderCell.prototype, "resizeStart", null);
tslib_1.__decorate([_mobx.action], TableHeaderCell.prototype, "resizeEnd", void 0);
tslib_1.__decorate([_mobx.action], TableHeaderCell.prototype, "setSplitLinePosition", null);
TableHeaderCell = tslib_1.__decorate([_mobxReact.observer], TableHeaderCell);
exports['default'] = TableHeaderCell;
module.exports = exports['default'];