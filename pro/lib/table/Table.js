'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buttonsEnumType = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _mobx = require('mobx');

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _measureScrollbar = require('../../../lib/_util/measureScrollbar');

var _measureScrollbar2 = _interopRequireDefault(_measureScrollbar);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

var _TableStore = require('./TableStore');

var _TableStore2 = _interopRequireDefault(_TableStore);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _Pagination = require('../pagination/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _spin = require('../spin');

var _spin2 = _interopRequireDefault(_spin);

var _DataSetComponent2 = require('../data-set/DataSetComponent');

var _DataSetComponent3 = _interopRequireDefault(_DataSetComponent2);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _TableWrapper = require('./TableWrapper');

var _TableWrapper2 = _interopRequireDefault(_TableWrapper);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableFooter = require('./TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _enum = require('./enum');

var _TableToolBar = require('./TableToolBar');

var _TableToolBar2 = _interopRequireDefault(_TableToolBar);

var _Switch = require('../switch/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _localeContext = require('../locale-context');

var _FilterBar = require('./FilterBar');

var _FilterBar2 = _interopRequireDefault(_FilterBar);

var _utils = require('./utils');

var _TableAdvancedQueryBar = require('./TableAdvancedQueryBar');

var _TableAdvancedQueryBar2 = _interopRequireDefault(_TableAdvancedQueryBar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var buttonsEnumType = exports.buttonsEnumType = _propTypes2['default'].oneOf([_enum.TableButtonType.add, _enum.TableButtonType.save, _enum.TableButtonType.remove, _enum.TableButtonType['delete'], _enum.TableButtonType.reset, _enum.TableButtonType.query, _enum.TableButtonType['export'], _enum.TableButtonType.expandAll, _enum.TableButtonType.collapseAll]);
var Table = function (_DataSetComponent) {
    (0, _inherits3['default'])(Table, _DataSetComponent);

    function Table() {
        (0, _classCallCheck3['default'])(this, Table);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));

        _this.tableStore = new _TableStore2['default'](_this);
        _this.handleSwitchChange = (0, _mobx.action)(function (value) {
            _this.tableStore.showCachedSeletion = !!value;
        });
        _this.handleResize = (0, _debounce2['default'])(function () {
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
                        case _KeyCode2['default'].UP:
                            _this.handleKeyDownUp(e);
                            break;
                        case _KeyCode2['default'].DOWN:
                            _this.handleKeyDownDown(e);
                            break;
                        case _KeyCode2['default'].RIGHT:
                            _this.handleKeyDownRight(e);
                            break;
                        case _KeyCode2['default'].LEFT:
                            _this.handleKeyDownLeft(e);
                            break;
                        case _KeyCode2['default'].PAGE_UP:
                            e.preventDefault();
                            dataSet.prePage();
                            break;
                        case _KeyCode2['default'].PAGE_DOWN:
                            e.preventDefault();
                            dataSet.nextPage();
                            break;
                        case _KeyCode2['default'].HOME:
                            _this.handleKeyDownHome(e);
                            break;
                        case _KeyCode2['default'].END:
                            _this.handleKeyDownEnd(e);
                            break;
                        default:
                    }
                } catch (e) {}
            }
            var _this$props$onKeyDown = _this.props.onKeyDown,
                onKeyDown = _this$props$onKeyDown === undefined ? _noop2['default'] : _this$props$onKeyDown;

            onKeyDown(e);
        };
        return _this;
    }

    (0, _createClass3['default'])(Table, [{
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
            var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(e) {
                var dataSet;
                return _regenerator2['default'].wrap(function _callee$(_context) {
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
            var _ref3 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2(e) {
                var dataSet;
                return _regenerator2['default'].wrap(function _callee2$(_context2) {
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
            var _ref4 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee3(e) {
                var currentRow, previousElementSibling, dataSet;
                return _regenerator2['default'].wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                e.preventDefault();
                                currentRow = this.currentRow;

                                if (!currentRow) {
                                    _context3.next = 12;
                                    break;
                                }

                                previousElementSibling = (0, _utils.findIndexedSibling)(currentRow, -1);

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
            var _ref5 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee4(e) {
                var currentRow, nextElementSibling, dataSet;
                return _regenerator2['default'].wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                e.preventDefault();
                                currentRow = this.currentRow;

                                if (!currentRow) {
                                    _context4.next = 12;
                                    break;
                                }

                                nextElementSibling = (0, _utils.findIndexedSibling)(currentRow, 1);

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
            var otherProps = (0, _omit2['default'])((0, _get3['default'])(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'getOtherProps', this).call(this), ['columns', 'header', 'footer', 'border', 'style', 'selectionMode', 'onRow', 'rowRenderer', 'buttons', 'rowHeight', 'queryFields', 'queryFieldsLimit', 'queryBar', 'defaultRowExpanded', 'expandRowByClick', 'expandedRowRenderer', 'expandIconColumnIndex', 'indentSize', 'filter', 'mode', 'editMode', 'filterBarFieldName', 'filterBarPlaceholder', 'pagination', 'highLightRow', 'columnResizable']);
            otherProps.onKeyDown = this.handleKeyDown;
            var rowHeight = this.tableStore.rowHeight;

            if (rowHeight !== 'auto') {
                otherProps.style = { lineHeight: (0, _UnitConvertor.pxToRem)(rowHeight) };
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

            return (0, _get3['default'])(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'getClassName', this).call(this, prefixCls + '-scroll-position-left', (_get$call = {}, (0, _defineProperty3['default'])(_get$call, prefixCls + '-bordered', border), (0, _defineProperty3['default'])(_get$call, prefixCls + '-row-height-fixed', (0, _isNumber2['default'])(rowHeight)), (0, _defineProperty3['default'])(_get$call, prefixCls + '-has-tfoot', this.tableStore.hasFooter), _get$call));
        }
    }, {
        key: 'getWrapperProps',
        value: function getWrapperProps() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var style = this.props.style;
            var tableStore = this.tableStore;

            var newStyle = (0, _omit2['default'])(style, ['width', 'height']);
            if (style && style.width !== void 0 && style.width !== 'auto') {
                newStyle.width = Math.max(style.width, tableStore.leftLeafColumnsWidth + tableStore.rightLeafColumnsWidth + _Column.defaultMinWidth);
            }
            return (0, _get3['default'])(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'getWrapperProps', this).call(this, (0, _extends3['default'])({
                style: newStyle
            }, props));
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            (0, _get3['default'])(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'componentWillMount', this).call(this);
            this.initDefaultExpandedRows();
            this.processDataSetListener(true);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.resizeObserver = new _resizeObserverPolyfill2['default'](this.handleResize);
            this.resizeObserver.observe(this.element);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            (0, _get3['default'])(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);
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

            return _react2['default'].createElement(_FilterBar2['default'], { key: 'querybar', prefixCls: prefixCls, dataSet: dataSet, paramName: filterBarFieldName, placeholder: filterBarPlaceholder });
        }
    }, {
        key: 'renderAdvancedQueryBar',
        value: function renderAdvancedQueryBar() {
            var prefixCls = this.prefixCls,
                _props4 = this.props,
                queryFields = _props4.queryFields,
                queryFieldsLimit = _props4.queryFieldsLimit;

            return _react2['default'].createElement(_TableAdvancedQueryBar2['default'], { key: 'advancebar', prefixCls: prefixCls, queryFields: queryFields, queryFieldsLimit: queryFieldsLimit });
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
            return _react2['default'].createElement(
                _TableContext2['default'].Provider,
                { value: context },
                _react2['default'].createElement(
                    'div',
                    this.getWrapperProps(),
                    this.getHeader(),
                    _react2['default'].createElement(_TableToolBar2['default'], { key: 'toolbar', header: header, buttons: buttons, queryFieldsLimit: queryFieldsLimit, queryFields: queryFields, showQueryBar: queryBar === "normal" /* normal */ && showQueryBar !== false, prefixCls: prefixCls }),
                    this.getPagination("top" /* top */),
                    queryBar === "bar" /* bar */ && this.renderBar(),
                    queryBar === "advancedBar" /* advancedBar */ && showQueryBar !== false && this.renderAdvancedQueryBar(),
                    _react2['default'].createElement(
                        _spin2['default'],
                        { key: 'content', dataSet: dataSet },
                        _react2['default'].createElement(
                            'div',
                            this.getOtherProps(),
                            _react2['default'].createElement(
                                'div',
                                { className: prefixCls + '-content' },
                                content,
                                isAnyColumnsLeftLock && overflowX && this.getLeftFixedTable(),
                                isAnyColumnsRightLock && overflowX && this.getRightFixedTable(),
                                _react2['default'].createElement('div', { ref: this.saveResizeRef, className: prefixCls + '-split-line' })
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

                var cls = (0, _componentClasses2['default'])(this.element).remove(new RegExp('^' + prefixCls + '-scroll-position-.+$'));
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

            return _react2['default'].createElement(
                _TableWrapper2['default'],
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
                return _react2['default'].createElement(
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
                return _react2['default'].createElement(
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
                var paginationPosition = (0, _utils.getPaginationPosition)(pagination);
                if (paginationPosition === "both" /* both */ || paginationPosition === position) {
                    var props = (0, _omit2['default'])(pagination, 'position');
                    return _react2['default'].createElement(
                        _Pagination2['default'],
                        (0, _extends3['default'])({ key: 'pagination-' + position }, props, { className: (0, _classnames2['default'])(prefixCls + '-pagination', props.className), dataSet: dataSet }),
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

                return _react2['default'].createElement(
                    _Tooltip2['default'],
                    { title: (0, _localeContext.$l)('Table', showCachedSeletion ? 'hide_cached_seletion' : 'show_cached_seletion') },
                    _react2['default'].createElement(_Switch2['default'], { className: prefixCls + '-switch', checked: showCachedSeletion, onChange: this.handleSwitchChange })
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
                    bodyHeight = Math.max(bodyHeight, (0, _isNumber2['default'])(rowHeight) ? rowHeight : lockColumnsBodyRowsHeight[0] || 0);
                    if (lock && !footer) {
                        bodyHeight -= (0, _measureScrollbar2['default'])();
                    }
                }
                tableHead = _react2['default'].createElement(
                    'div',
                    { key: 'tableHead', ref: tableHeadRef, className: prefixCls + '-head' },
                    this.renderTable(true, false, false, lock)
                );
                var fixedLeft = lock === true || lock === "left" /* left */;
                tableBody = _react2['default'].createElement(
                    'div',
                    { key: 'tableBody', ref: tableBodyRef, className: prefixCls + '-body', style: { height: (0, _UnitConvertor.pxToRem)(bodyHeight), width: fixedLeft ? (0, _UnitConvertor.pxToRem)(leftLeafColumnsWidth + (0, _measureScrollbar2['default'])()) : void 0 }, onScroll: this.handleBodyScroll },
                    this.renderTable(false, true, false, lock)
                );
                if (fixedLeft) {
                    tableBody = _react2['default'].createElement(
                        'div',
                        { key: 'tableBody', style: { width: (0, _UnitConvertor.pxToRem)(leftLeafColumnsWidth), overflow: 'hidden' } },
                        tableBody
                    );
                }
                if (footer) {
                    tableFooter = _react2['default'].createElement(
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
            return _react2['default'].createElement(
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
            return _react2['default'].createElement(
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

            return _react2['default'].createElement(_TableBody2['default'], { key: 'tbody', prefixCls: prefixCls, lock: lock, indentSize: indentSize });
        }
    }, {
        key: 'getTableHeader',
        value: function getTableHeader(lock) {
            var prefixCls = this.prefixCls,
                dataSet = this.props.dataSet;

            return _react2['default'].createElement(_TableHeader2['default'], { key: 'thead', prefixCls: prefixCls, lock: lock, dataSet: dataSet });
        }
    }, {
        key: 'getTableFooter',
        value: function getTableFooter(lock) {
            var prefixCls = this.prefixCls,
                dataSet = this.props.dataSet;

            return _react2['default'].createElement(_TableFooter2['default'], { key: 'tfoot', prefixCls: prefixCls, lock: lock, dataSet: dataSet });
        }
    }, {
        key: 'getStyleHeight',
        value: function getStyleHeight() {
            var style = this.props.style;

            if (style) {
                return (0, _UnitConvertor.toPx)(style.height);
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
                if (element && (0, _isNumber2['default'])(height)) {
                    var tableTitle = element.querySelector('.' + prefixCls + '-title');
                    var tableHeader = element.querySelector('.' + prefixCls + '-thead');
                    var tableFooter = element.querySelector('.' + prefixCls + '-footer');
                    var tableFootWrap = element.querySelector('.' + prefixCls + '-foot');
                    if (tableTitle) {
                        height -= (0, _utils.getHeight)(tableTitle);
                    }
                    if (tableHeader) {
                        height -= (0, _utils.getHeight)(tableHeader);
                    }
                    if (tableFooter) {
                        height -= (0, _utils.getHeight)(tableFooter);
                    }
                    if (tableFootWrap) {
                        height -= (0, _utils.getHeight)(tableFootWrap);
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
}(_DataSetComponent3['default']);
Table.displayName = 'Table';
Table.Column = _Column2['default'];
Table.propTypes = (0, _extends3['default'])({
    columns: _propTypes2['default'].array,
    /**
     * 表头
     */
    header: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func]),
    /**
     * 表脚
     */
    footer: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func]),
    /**
     * 是否显示边框
     * @default true
     */
    border: _propTypes2['default'].bool,
    /**
     * 功能按钮
     * 可选值：`add` `delete` `remove` `save` `query` `expandAll` `collapseAll` 或 自定义按钮
     */
    buttons: _propTypes2['default'].arrayOf(_propTypes2['default'].oneOfType([buttonsEnumType, _propTypes2['default'].arrayOf(_propTypes2['default'].oneOfType([buttonsEnumType, _propTypes2['default'].object])), _propTypes2['default'].node])),
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
    queryFields: _propTypes2['default'].object,
    /**
     * 头部显示的查询字段的数量，超出限制的查询字段放入弹出窗口
     * @default 1
     */
    queryFieldsLimit: _propTypes2['default'].number,
    /**
     * 显示查询条
     * @default true
     */
    queryBar: _propTypes2['default'].oneOf(["advancedBar" /* advancedBar */, "normal" /* normal */, "bar" /* bar */, "none" /* none */]),
    /**
     * 行高
     * @default 30
     */
    rowHeight: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].oneOf(['auto'])]),
    defaultRowExpanded: _propTypes2['default'].bool,
    expandRowByClick: _propTypes2['default'].bool,
    indentSize: _propTypes2['default'].number,
    filter: _propTypes2['default'].func,
    mode: _propTypes2['default'].oneOf(["list" /* list */, "tree" /* tree */]),
    editMode: _propTypes2['default'].oneOf(["inline" /* inline */, "cell" /* cell */]),
    filterBarFieldName: _propTypes2['default'].string,
    filterBarPlaceholder: _propTypes2['default'].string,
    highLightRow: _propTypes2['default'].bool
}, _DataSetComponent3['default'].propTypes);
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
tslib_1.__decorate([_autobind2['default']], Table.prototype, "handleBodyScroll", null);
tslib_1.__decorate([_mobx.action], Table.prototype, "syncSize", null);
tslib_1.__decorate([_mobx.action], Table.prototype, "initDefaultExpandedRows", null);
Table = tslib_1.__decorate([_mobxReact.observer], Table);
exports['default'] = Table;