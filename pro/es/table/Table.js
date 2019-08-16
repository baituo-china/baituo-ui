import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';
import isNumber from 'lodash/isNumber';
import noop from 'lodash/noop';
import classes from 'component-classes';
import { action } from 'mobx';
import { pxToRem, toPx } from '../../../es/_util/UnitConvertor';
import measureScrollbar from '../../../es/_util/measureScrollbar';
import KeyCode from '../../../es/_util/KeyCode';
import Column, { defaultMinWidth } from './Column';
import TableStore from './TableStore';
import TableHeader from './TableHeader';
import autobind from '../_util/autobind';
import Pagination from '../pagination/Pagination';
import Spin from '../spin';
import DataSetComponent from '../data-set/DataSetComponent';
import TableContext from './TableContext';
import TableWrapper from './TableWrapper';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import { TableButtonType } from './enum';
import TableToolBar from './TableToolBar';
import Switch from '../switch/Switch';
import Tooltip from '../tooltip/Tooltip';
import { $l } from '../locale-context';
import FilterBar from './FilterBar';
import { findIndexedSibling, getHeight, getPaginationPosition } from './utils';
import TableAdvancedQueryBar from './TableAdvancedQueryBar';
export var buttonsEnumType = PropTypes.oneOf([TableButtonType.add, TableButtonType.save, TableButtonType.remove, TableButtonType['delete'], TableButtonType.reset, TableButtonType.query, TableButtonType['export'], TableButtonType.expandAll, TableButtonType.collapseAll]);
var Table = function (_DataSetComponent) {
    _inherits(Table, _DataSetComponent);

    function Table() {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));

        _this.tableStore = new TableStore(_this);
        _this.handleSwitchChange = action(function (value) {
            _this.tableStore.showCachedSeletion = !!value;
        });
        _this.handleResize = debounce(function () {
            if (!_this.element.offsetParent) {
                _this.isHidden = true;
            } else if (!_this.isHidden) {
                _this.syncSize();
                _this.setScrollPositionClassName();
            } else {
                _this.isHidden = false;
            }
        }, 30);
        _this.saveResizeRef = function (node) {
            _this.resizeLine = node;
        };
        _this.handleDataSetLoad = function () {
            _this.initDefaultExpandedRows();
        };
        _this.handleDataSetCreate = function (_ref) {
            var record = _ref.record;
            var tableStore = _this.tableStore;

            if (tableStore.inlineEdit) {
                tableStore.currentEditRecord = record;
            }
        };
        _this.handleKeyDown = function (e) {
            var tableStore = _this.tableStore;

            if (!tableStore.editing) {
                try {
                    var dataSet = _this.props.dataSet;

                    switch (e.keyCode) {
                        case KeyCode.UP:
                            _this.handleKeyDownUp(e);
                            break;
                        case KeyCode.DOWN:
                            _this.handleKeyDownDown(e);
                            break;
                        case KeyCode.RIGHT:
                            _this.handleKeyDownRight(e);
                            break;
                        case KeyCode.LEFT:
                            _this.handleKeyDownLeft(e);
                            break;
                        case KeyCode.PAGE_UP:
                            e.preventDefault();
                            dataSet.prePage();
                            break;
                        case KeyCode.PAGE_DOWN:
                            e.preventDefault();
                            dataSet.nextPage();
                            break;
                        case KeyCode.HOME:
                            _this.handleKeyDownHome(e);
                            break;
                        case KeyCode.END:
                            _this.handleKeyDownEnd(e);
                            break;
                        default:
                    }
                } catch (e) {}
            }
            var _this$props$onKeyDown = _this.props.onKeyDown,
                onKeyDown = _this$props$onKeyDown === undefined ? noop : _this$props$onKeyDown;

            onKeyDown(e);
        };
        return _this;
    }

    _createClass(Table, [{
        key: 'focusRow',
        value: function focusRow(row) {
            if (row) {
                var index = row.dataset.index;

                if (index) {
                    var dataSet = this.props.dataSet;

                    var record = dataSet.findRecordById(index);
                    if (record) {
                        dataSet.current = record;
                    }
                }
            }
        }
    }, {
        key: 'handleKeyDownHome',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e) {
                var dataSet;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                e.preventDefault();
                                dataSet = this.props.dataSet;

                                if (this.tableStore.isTree) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 5;
                                return dataSet.first();

                            case 5:
                                this.focusRow(this.firstRow);

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function handleKeyDownHome(_x) {
                return _ref2.apply(this, arguments);
            }

            return handleKeyDownHome;
        }()
    }, {
        key: 'handleKeyDownEnd',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(e) {
                var dataSet;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                e.preventDefault();
                                dataSet = this.props.dataSet;

                                if (this.tableStore.isTree) {
                                    _context2.next = 5;
                                    break;
                                }

                                _context2.next = 5;
                                return dataSet.last();

                            case 5:
                                this.focusRow(this.lastRow);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function handleKeyDownEnd(_x2) {
                return _ref3.apply(this, arguments);
            }

            return handleKeyDownEnd;
        }()
    }, {
        key: 'handleKeyDownUp',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(e) {
                var currentRow, previousElementSibling, dataSet;
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                e.preventDefault();
                                currentRow = this.currentRow;

                                if (!currentRow) {
                                    _context3.next = 12;
                                    break;
                                }

                                previousElementSibling = findIndexedSibling(currentRow, -1);

                                if (!previousElementSibling) {
                                    _context3.next = 8;
                                    break;
                                }

                                this.focusRow(previousElementSibling);
                                _context3.next = 12;
                                break;

                            case 8:
                                dataSet = this.props.dataSet;
                                _context3.next = 11;
                                return dataSet.prePage();

                            case 11:
                                this.focusRow(this.lastRow);

                            case 12:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function handleKeyDownUp(_x3) {
                return _ref4.apply(this, arguments);
            }

            return handleKeyDownUp;
        }()
    }, {
        key: 'handleKeyDownDown',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(e) {
                var currentRow, nextElementSibling, dataSet;
                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                e.preventDefault();
                                currentRow = this.currentRow;

                                if (!currentRow) {
                                    _context4.next = 12;
                                    break;
                                }

                                nextElementSibling = findIndexedSibling(currentRow, 1);

                                if (!nextElementSibling) {
                                    _context4.next = 8;
                                    break;
                                }

                                this.focusRow(nextElementSibling);
                                _context4.next = 12;
                                break;

                            case 8:
                                dataSet = this.props.dataSet;
                                _context4.next = 11;
                                return dataSet.nextPage();

                            case 11:
                                this.focusRow(this.firstRow);

                            case 12:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function handleKeyDownDown(_x4) {
                return _ref5.apply(this, arguments);
            }

            return handleKeyDownDown;
        }()
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight(e) {
            var tableStore = this.tableStore,
                _props = this.props,
                expandedRowRenderer = _props.expandedRowRenderer,
                dataSet = _props.dataSet;

            if (tableStore.isTree || expandedRowRenderer) {
                var current = dataSet.current;

                if (current) {
                    e.preventDefault();
                    tableStore.setRowExpanded(current, true);
                }
            }
        }
    }, {
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft(e) {
            var tableStore = this.tableStore,
                _props2 = this.props,
                expandedRowRenderer = _props2.expandedRowRenderer,
                dataSet = _props2.dataSet;

            if (tableStore.isTree || expandedRowRenderer) {
                var current = dataSet.current;

                if (current) {
                    e.preventDefault();
                    tableStore.setRowExpanded(current, false);
                }
            }
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'getOtherProps', this).call(this), ['columns', 'header', 'footer', 'border', 'style', 'selectionMode', 'onRow', 'rowRenderer', 'buttons', 'rowHeight', 'queryFields', 'queryFieldsLimit', 'queryBar', 'defaultRowExpanded', 'expandRowByClick', 'expandedRowRenderer', 'expandIconColumnIndex', 'indentSize', 'filter', 'mode', 'editMode', 'filterBarFieldName', 'filterBarPlaceholder', 'pagination', 'highLightRow', 'columnResizable']);
            otherProps.onKeyDown = this.handleKeyDown;
            var rowHeight = this.tableStore.rowHeight;

            if (rowHeight !== 'auto') {
                otherProps.style = { lineHeight: pxToRem(rowHeight) };
            }
            return otherProps;
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var _get$call;

            var prefixCls = this.prefixCls,
                _tableStore = this.tableStore,
                border = _tableStore.border,
                rowHeight = _tableStore.rowHeight;

            return _get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'getClassName', this).call(this, prefixCls + '-scroll-position-left', (_get$call = {}, _defineProperty(_get$call, prefixCls + '-bordered', border), _defineProperty(_get$call, prefixCls + '-row-height-fixed', isNumber(rowHeight)), _defineProperty(_get$call, prefixCls + '-has-tfoot', this.tableStore.hasFooter), _get$call));
        }
    }, {
        key: 'getWrapperProps',
        value: function getWrapperProps() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var style = this.props.style;
            var tableStore = this.tableStore;

            var newStyle = omit(style, ['width', 'height']);
            if (style && style.width !== void 0 && style.width !== 'auto') {
                newStyle.width = Math.max(style.width, tableStore.leftLeafColumnsWidth + tableStore.rightLeafColumnsWidth + defaultMinWidth);
            }
            return _get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'getWrapperProps', this).call(this, _extends({
                style: newStyle
            }, props));
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            _get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'componentWillMount', this).call(this);
            this.initDefaultExpandedRows();
            this.processDataSetListener(true);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.resizeObserver = new ResizeObserver(this.handleResize);
            this.resizeObserver.observe(this.element);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            _get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);
            this.processDataSetListener(false);
            this.tableStore.setProps(nextProps);
            this.processDataSetListener(true);
        }
        // componentDidUpdate() {
        //   this.handleResize();
        // }

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.handleResize.cancel();
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
            this.processDataSetListener(false);
        }
    }, {
        key: 'processDataSetListener',
        value: function processDataSetListener(flag) {
            var _tableStore2 = this.tableStore,
                isTree = _tableStore2.isTree,
                dataSet = _tableStore2.dataSet;

            if (dataSet) {
                var handler = flag ? dataSet.addEventListener : dataSet.removeEventListener;
                if (isTree) {
                    handler.call(dataSet, 'load', this.handleDataSetLoad);
                }
                handler.call(dataSet, 'create', this.handleDataSetCreate);
            }
        }
    }, {
        key: 'renderBar',
        value: function renderBar() {
            var prefixCls = this.prefixCls,
                _props3 = this.props,
                dataSet = _props3.dataSet,
                filterBarFieldName = _props3.filterBarFieldName,
                filterBarPlaceholder = _props3.filterBarPlaceholder;

            return React.createElement(FilterBar, { key: 'querybar', prefixCls: prefixCls, dataSet: dataSet, paramName: filterBarFieldName, placeholder: filterBarPlaceholder });
        }
    }, {
        key: 'renderAdvancedQueryBar',
        value: function renderAdvancedQueryBar() {
            var prefixCls = this.prefixCls,
                _props4 = this.props,
                queryFields = _props4.queryFields,
                queryFieldsLimit = _props4.queryFieldsLimit;

            return React.createElement(TableAdvancedQueryBar, { key: 'advancebar', prefixCls: prefixCls, queryFields: queryFields, queryFieldsLimit: queryFieldsLimit });
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.prefixCls,
                tableStore = this.tableStore,
                _tableStore3 = this.tableStore,
                overflowX = _tableStore3.overflowX,
                isAnyColumnsLeftLock = _tableStore3.isAnyColumnsLeftLock,
                isAnyColumnsRightLock = _tableStore3.isAnyColumnsRightLock,
                queryBar = _tableStore3.queryBar,
                _props5 = this.props,
                dataSet = _props5.dataSet,
                buttons = _props5.buttons,
                queryFieldsLimit = _props5.queryFieldsLimit,
                queryFields = _props5.queryFields,
                header = _props5.header,
                showQueryBar = _props5.showQueryBar;

            var content = this.getTable();
            var context = { tableStore: tableStore };
            return React.createElement(
                TableContext.Provider,
                { value: context },
                React.createElement(
                    'div',
                    this.getWrapperProps(),
                    this.getHeader(),
                    React.createElement(TableToolBar, { key: 'toolbar', header: header, buttons: buttons, queryFieldsLimit: queryFieldsLimit, queryFields: queryFields, showQueryBar: queryBar === "normal" /* normal */ && showQueryBar !== false, prefixCls: prefixCls }),
                    this.getPagination("top" /* top */),
                    queryBar === "bar" /* bar */ && this.renderBar(),
                    queryBar === "advancedBar" /* advancedBar */ && showQueryBar !== false && this.renderAdvancedQueryBar(),
                    React.createElement(
                        Spin,
                        { key: 'content', dataSet: dataSet },
                        React.createElement(
                            'div',
                            this.getOtherProps(),
                            React.createElement(
                                'div',
                                { className: prefixCls + '-content' },
                                content,
                                isAnyColumnsLeftLock && overflowX && this.getLeftFixedTable(),
                                isAnyColumnsRightLock && overflowX && this.getRightFixedTable(),
                                React.createElement('div', { ref: this.saveResizeRef, className: prefixCls + '-split-line' })
                            ),
                            this.getFooter()
                        )
                    ),
                    this.getPagination("bottom" /* bottom */)
                )
            );
        }
    }, {
        key: 'handleBodyScroll',
        value: function handleBodyScroll(e) {
            this.handleBodyScrollTop(e);
            this.handleBodyScrollLeft(e);
        }
    }, {
        key: 'handleBodyScrollTop',
        value: function handleBodyScrollTop(e) {
            var target = e.target,
                currentTarget = e.currentTarget;

            if (this.tableStore.height === void 0 || currentTarget !== target || target === this.tableFootWrap) {
                return;
            }
            var fixedColumnsBodyLeft = this.fixedColumnsBodyLeft;
            var bodyTable = this.tableBodyWrap;
            var fixedColumnsBodyRight = this.fixedColumnsBodyRight;
            var scrollTop = target.scrollTop;

            if (scrollTop !== this.lastScrollTop) {
                if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
                    fixedColumnsBodyLeft.scrollTop = scrollTop;
                }
                if (bodyTable && target !== bodyTable) {
                    bodyTable.scrollTop = scrollTop;
                }
                if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
                    fixedColumnsBodyRight.scrollTop = scrollTop;
                }
            }
            this.lastScrollTop = scrollTop;
        }
    }, {
        key: 'handleBodyScrollLeft',
        value: function handleBodyScrollLeft(e) {
            var target = e.target,
                currentTarget = e.currentTarget;

            var headTable = this.tableHeadWrap;
            var bodyTable = this.tableBodyWrap;
            var footTable = this.tableFootWrap;
            if (this.tableStore.overflowX === void 0 || currentTarget !== target || target === this.fixedColumnsBodyRight || target === this.fixedColumnsBodyLeft) {
                return;
            }
            var scrollLeft = target.scrollLeft;

            if (scrollLeft !== this.lastScrollLeft) {
                if (headTable && target !== headTable) {
                    headTable.scrollLeft = scrollLeft;
                }
                if (bodyTable && target !== bodyTable) {
                    bodyTable.scrollLeft = scrollLeft;
                }
                if (footTable && target !== footTable) {
                    footTable.scrollLeft = scrollLeft;
                }
                this.setScrollPositionClassName(target);
            }
            this.lastScrollLeft = scrollLeft;
        }
    }, {
        key: 'setScrollPositionClassName',
        value: function setScrollPositionClassName(target) {
            if (this.tableStore.isAnyColumnsLock) {
                var node = target || this.tableBodyWrap;
                if (node) {
                    var scrollToLeft = node.scrollLeft === 0;
                    var table = node.querySelector('table');
                    var scrollToRight = table && node.scrollLeft >= table.offsetWidth - node.offsetWidth;
                    if (scrollToLeft && scrollToRight) {
                        this.setScrollPosition("both" /* both */);
                    } else if (scrollToLeft) {
                        this.setScrollPosition("left" /* left */);
                    } else if (scrollToRight) {
                        this.setScrollPosition("right" /* right */);
                    } else {
                        this.setScrollPosition("middle" /* middle */);
                    }
                }
            }
        }
    }, {
        key: 'setScrollPosition',
        value: function setScrollPosition(position) {
            if (this.scrollPosition !== position) {
                this.scrollPosition = position;
                var prefixCls = this.prefixCls;

                var cls = classes(this.element).remove(new RegExp('^' + prefixCls + '-scroll-position-.+$'));
                if (position === "both" /* both */) {
                        cls.add(prefixCls + '-scroll-position-left').add(prefixCls + '-scroll-position-right');
                    } else {
                    cls.add(prefixCls + '-scroll-position-' + position);
                }
            }
        }
    }, {
        key: 'renderTable',
        value: function renderTable(hasHeader, hasBody, hasFooter, lock) {
            var prefixCls = this.prefixCls;

            return React.createElement(
                TableWrapper,
                { prefixCls: prefixCls, key: 'tableWrapper', lock: lock, hasBody: hasBody, hasHeader: hasHeader, hasFooter: hasFooter },
                hasHeader && this.getTableHeader(lock),
                hasBody && this.getTableBody(lock),
                hasFooter && this.getTableFooter(lock)
            );
        }
    }, {
        key: 'getHeader',
        value: function getHeader() {
            var prefixCls = this.prefixCls,
                _props6 = this.props,
                header = _props6.header,
                dataSet = _props6.dataSet;

            var data = dataSet ? dataSet.data : [];
            if (header) {
                return React.createElement(
                    'div',
                    { key: 'header', className: prefixCls + '-header' },
                    typeof header === 'function' ? header(data) : header
                );
            }
        }
    }, {
        key: 'getFooter',
        value: function getFooter() {
            var prefixCls = this.prefixCls,
                _props7 = this.props,
                footer = _props7.footer,
                dataSet = _props7.dataSet;

            var data = dataSet ? dataSet.data : [];
            if (footer) {
                return React.createElement(
                    'div',
                    { key: 'footer', className: prefixCls + '-footer' },
                    typeof footer === 'function' ? footer(data) : footer
                );
            }
        }
    }, {
        key: 'getPagination',
        value: function getPagination(position) {
            var prefixCls = this.prefixCls,
                _props8 = this.props,
                dataSet = _props8.dataSet,
                pagination = _props8.pagination;

            if (pagination !== false && dataSet && dataSet.paging) {
                var paginationPosition = getPaginationPosition(pagination);
                if (paginationPosition === "both" /* both */ || paginationPosition === position) {
                    var props = omit(pagination, 'position');
                    return React.createElement(
                        Pagination,
                        _extends({ key: 'pagination-' + position }, props, { className: classNames(prefixCls + '-pagination', props.className), dataSet: dataSet }),
                        this.getCacheSelectionSwitch()
                    );
                }
            }
        }
    }, {
        key: 'getCacheSelectionSwitch',
        value: function getCacheSelectionSwitch() {
            var dataSet = this.props.dataSet,
                prefixCls = this.prefixCls;

            if (dataSet && dataSet.cacheSelectionKeys && dataSet.cachedSelected.length) {
                var showCachedSeletion = this.tableStore.showCachedSeletion;

                return React.createElement(
                    Tooltip,
                    { title: $l('Table', showCachedSeletion ? 'hide_cached_seletion' : 'show_cached_seletion') },
                    React.createElement(Switch, { className: prefixCls + '-switch', checked: showCachedSeletion, onChange: this.handleSwitchChange })
                );
            }
        }
    }, {
        key: 'getTable',
        value: function getTable(lock) {
            var _this2 = this;

            var prefixCls = this.prefixCls;
            var _tableStore4 = this.tableStore,
                overflowX = _tableStore4.overflowX,
                height = _tableStore4.height,
                footer = _tableStore4.hasFooter;

            var tableHead = void 0;
            var tableBody = void 0;
            var tableFooter = void 0;
            if (height !== void 0 || overflowX) {
                var _tableStore5 = this.tableStore,
                    lockColumnsBodyRowsHeight = _tableStore5.lockColumnsBodyRowsHeight,
                    leftLeafColumnsWidth = _tableStore5.leftLeafColumnsWidth,
                    rowHeight = _tableStore5.rowHeight;

                var bodyHeight = height;
                var tableHeadRef = void 0;
                var tableBodyRef = void 0;
                var tableFootRef = void 0;
                if (!lock) {
                    tableHeadRef = function tableHeadRef(node) {
                        return _this2.tableHeadWrap = node;
                    };
                    tableFootRef = function tableFootRef(node) {
                        return _this2.tableFootWrap = node;
                    };
                    tableBodyRef = function tableBodyRef(node) {
                        return _this2.tableBodyWrap = node;
                    };
                } else if (lock === 'right') {
                    tableBodyRef = function tableBodyRef(node) {
                        return _this2.fixedColumnsBodyRight = node;
                    };
                } else {
                    tableBodyRef = function tableBodyRef(node) {
                        return _this2.fixedColumnsBodyLeft = node;
                    };
                }
                if (bodyHeight !== void 0) {
                    bodyHeight = Math.max(bodyHeight, isNumber(rowHeight) ? rowHeight : lockColumnsBodyRowsHeight[0] || 0);
                    if (lock && !footer) {
                        bodyHeight -= measureScrollbar();
                    }
                }
                tableHead = React.createElement(
                    'div',
                    { key: 'tableHead', ref: tableHeadRef, className: prefixCls + '-head' },
                    this.renderTable(true, false, false, lock)
                );
                var fixedLeft = lock === true || lock === "left" /* left */;
                tableBody = React.createElement(
                    'div',
                    { key: 'tableBody', ref: tableBodyRef, className: prefixCls + '-body', style: { height: pxToRem(bodyHeight), width: fixedLeft ? pxToRem(leftLeafColumnsWidth + measureScrollbar()) : void 0 }, onScroll: this.handleBodyScroll },
                    this.renderTable(false, true, false, lock)
                );
                if (fixedLeft) {
                    tableBody = React.createElement(
                        'div',
                        { key: 'tableBody', style: { width: pxToRem(leftLeafColumnsWidth), overflow: 'hidden' } },
                        tableBody
                    );
                }
                if (footer) {
                    tableFooter = React.createElement(
                        'div',
                        { key: 'tableFooter', ref: tableFootRef, className: prefixCls + '-foot', onScroll: this.handleBodyScroll },
                        this.renderTable(false, false, true, lock)
                    );
                }
            } else {
                tableBody = this.renderTable(true, true, footer, lock);
            }
            return [tableHead, tableBody, tableFooter];
        }
    }, {
        key: 'getLeftFixedTable',
        value: function getLeftFixedTable() {
            var _tableStore6 = this.tableStore,
                overflowX = _tableStore6.overflowX,
                height = _tableStore6.height;

            if (!overflowX && height === void 0) {
                return;
            }
            var prefixCls = this.prefixCls;

            var table = this.getTable("left" /* left */);
            return React.createElement(
                'div',
                { className: prefixCls + '-fixed-left' },
                table
            );
        }
    }, {
        key: 'getRightFixedTable',
        value: function getRightFixedTable() {
            var _tableStore7 = this.tableStore,
                overflowX = _tableStore7.overflowX,
                height = _tableStore7.height;

            if (!overflowX && height === void 0) {
                return;
            }
            var prefixCls = this.prefixCls;

            var table = this.getTable("right" /* right */);
            return React.createElement(
                'div',
                { className: prefixCls + '-fixed-right' },
                table
            );
        }
    }, {
        key: 'getTableBody',
        value: function getTableBody(lock) {
            var prefixCls = this.prefixCls,
                indentSize = this.props.indentSize;

            return React.createElement(TableBody, { key: 'tbody', prefixCls: prefixCls, lock: lock, indentSize: indentSize });
        }
    }, {
        key: 'getTableHeader',
        value: function getTableHeader(lock) {
            var prefixCls = this.prefixCls,
                dataSet = this.props.dataSet;

            return React.createElement(TableHeader, { key: 'thead', prefixCls: prefixCls, lock: lock, dataSet: dataSet });
        }
    }, {
        key: 'getTableFooter',
        value: function getTableFooter(lock) {
            var prefixCls = this.prefixCls,
                dataSet = this.props.dataSet;

            return React.createElement(TableFooter, { key: 'tfoot', prefixCls: prefixCls, lock: lock, dataSet: dataSet });
        }
    }, {
        key: 'getStyleHeight',
        value: function getStyleHeight() {
            var style = this.props.style;

            if (style) {
                return toPx(style.height);
            }
        }
    }, {
        key: 'syncSize',
        value: function syncSize() {
            var element = this.element,
                tableStore = this.tableStore;

            if (element) {
                var width = element.offsetWidth;
                if (this.oldWidth !== width) {
                    this.oldWidth = tableStore.width;
                    tableStore.width = width;
                }
                var prefixCls = this.prefixCls;

                var height = this.getStyleHeight();
                if (element && isNumber(height)) {
                    var tableTitle = element.querySelector('.' + prefixCls + '-title');
                    var tableHeader = element.querySelector('.' + prefixCls + '-thead');
                    var tableFooter = element.querySelector('.' + prefixCls + '-footer');
                    var tableFootWrap = element.querySelector('.' + prefixCls + '-foot');
                    if (tableTitle) {
                        height -= getHeight(tableTitle);
                    }
                    if (tableHeader) {
                        height -= getHeight(tableHeader);
                    }
                    if (tableFooter) {
                        height -= getHeight(tableFooter);
                    }
                    if (tableFootWrap) {
                        height -= getHeight(tableFootWrap);
                    }
                    this.tableStore.height = height;
                }
            }
        }
    }, {
        key: 'initDefaultExpandedRows',
        value: function initDefaultExpandedRows() {
            var tableStore = this.tableStore,
                _props9 = this.props,
                dataSet = _props9.dataSet,
                defaultRowExpanded = _props9.defaultRowExpanded;

            if (tableStore.isTree && defaultRowExpanded && !dataSet.props.expandField) {
                tableStore.expandedRows = dataSet.data.filter(function (record) {
                    return !!record.children;
                });
            }
        }
    }, {
        key: 'currentRow',
        get: function get() {
            return this.element.querySelector('.' + this.prefixCls + '-row-current');
        }
    }, {
        key: 'firstRow',
        get: function get() {
            return this.element.querySelector('.' + this.prefixCls + '-row:first-child');
        }
    }, {
        key: 'lastRow',
        get: function get() {
            return this.element.querySelector('.' + this.prefixCls + '-row:last-child');
        }
    }]);

    return Table;
}(DataSetComponent);
Table.displayName = 'Table';
Table.Column = Column;
Table.propTypes = _extends({
    columns: PropTypes.array,
    /**
     * 表头
     */
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * 表脚
     */
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * 是否显示边框
     * @default true
     */
    border: PropTypes.bool,
    /**
     * 功能按钮
     * 可选值：`add` `delete` `remove` `save` `query` `expandAll` `collapseAll` 或 自定义按钮
     */
    buttons: PropTypes.arrayOf(PropTypes.oneOfType([buttonsEnumType, PropTypes.arrayOf(PropTypes.oneOfType([buttonsEnumType, PropTypes.object])), PropTypes.node])),
    /**
     * 自定义查询字段组件
     * 默认会根据queryDataSet中定义的field类型自动匹配组件， 匹配类型如下
     * lovCode => Lov
     * lookupCode => Select
     * type:number => NumberField
     * type:date => DatePicker
     * type:dateTime => DatePicker[mode=dateTime]
     * type:week => DatePicker[mode=week]
     * default => TextField
     */
    queryFields: PropTypes.object,
    /**
     * 头部显示的查询字段的数量，超出限制的查询字段放入弹出窗口
     * @default 1
     */
    queryFieldsLimit: PropTypes.number,
    /**
     * 显示查询条
     * @default true
     */
    queryBar: PropTypes.oneOf(["advancedBar" /* advancedBar */, "normal" /* normal */, "bar" /* bar */, "none" /* none */]),
    /**
     * 行高
     * @default 30
     */
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    defaultRowExpanded: PropTypes.bool,
    expandRowByClick: PropTypes.bool,
    indentSize: PropTypes.number,
    filter: PropTypes.func,
    mode: PropTypes.oneOf(["list" /* list */, "tree" /* tree */]),
    editMode: PropTypes.oneOf(["inline" /* inline */, "cell" /* cell */]),
    filterBarFieldName: PropTypes.string,
    filterBarPlaceholder: PropTypes.string,
    highLightRow: PropTypes.bool
}, DataSetComponent.propTypes);
Table.defaultProps = {
    suffixCls: 'table',
    tabIndex: 0,
    selectionMode: "rowbox" /* rowbox */
    , queryFields: {},
    queryFieldsLimit: 1,
    defaultRowExpanded: false,
    expandRowByClick: false,
    indentSize: 15,
    filterBarFieldName: 'params'
};
tslib_1.__decorate([autobind], Table.prototype, "handleBodyScroll", null);
tslib_1.__decorate([action], Table.prototype, "syncSize", null);
tslib_1.__decorate([action], Table.prototype, "initDefaultExpandedRows", null);
Table = tslib_1.__decorate([observer], Table);
export default Table;