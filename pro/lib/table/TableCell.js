'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _measureScrollbar = require('../../../lib/_util/measureScrollbar');

var _measureScrollbar2 = _interopRequireDefault(_measureScrollbar);

var _Record = require('../data-set/Record');

var _Record2 = _interopRequireDefault(_Record);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _utils = require('./utils');

var _enum = require('./enum');

var _CheckBox = require('../check-box/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _Output = require('../output/Output');

var _Output2 = _interopRequireDefault(_Output);

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _localeContext = require('../locale-context');

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var inTab = false;
var TableCell = function (_Component) {
    (0, _inherits3['default'])(TableCell, _Component);

    function TableCell() {
        var _this2 = this;

        (0, _classCallCheck3['default'])(this, TableCell);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableCell.__proto__ || Object.getPrototypeOf(TableCell)).apply(this, arguments));

        _this.handleEditorKeyDown = function (e) {
            switch (e.keyCode) {
                case _KeyCode2['default'].TAB:
                    var _this$props = _this.props,
                        prefixCls = _this$props.prefixCls,
                        column = _this$props.column;

                    var cell = (0, _utils.findCell)(_this.context.tableStore, prefixCls, (0, _utils.getColumnKey)(column));
                    var node = (0, _utils.findFirstFocusableElement)(cell);
                    if (node) {
                        inTab = true;
                        node.focus();
                    }
                    break;
                default:
            }
        };
        _this.handleFocus = function (e) {
            var tableStore = _this.context.tableStore;
            var currentEditorName = tableStore.currentEditorName,
                dataSet = tableStore.dataSet,
                inlineEdit = tableStore.inlineEdit;
            var _this$props2 = _this.props,
                prefixCls = _this$props2.prefixCls,
                record = _this$props2.record,
                column = _this$props2.column,
                lock = _this$props2.column.lock;

            if (!currentEditorName && !(0, _utils.isDisabledRow)(record) && (!inlineEdit || record.editing)) {
                dataSet.current = record;
                _this.showEditor(e.currentTarget, lock);
                if (!_this.cellEditor || (0, _utils.isRadio)(_this.cellEditor)) {
                    var cell = (0, _utils.findCell)(tableStore, prefixCls, (0, _utils.getColumnKey)(column), lock);
                    var node = (0, _utils.findFirstFocusableElement)(cell);
                    if (node && !inTab) {
                        node.focus();
                    }
                }
            }
            inTab = false;
        };
        _this.handleCommandEdit = function () {
            var record = _this.props.record;
            var tableStore = _this.context.tableStore;

            if (tableStore.inlineEdit) {
                tableStore.currentEditRecord = record;
            }
        };
        _this.handleCommandDelete = function () {
            var record = _this.props.record;
            var tableStore = _this.context.tableStore;
            var dataSet = tableStore.dataSet;

            dataSet['delete'](record);
        };
        _this.handleCommandSave = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
            var tableStore, dataSet;
            return _regenerator2['default'].wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            tableStore = _this.context.tableStore;
                            dataSet = tableStore.dataSet;
                            _context.next = 4;
                            return dataSet.submit();

                        case 4:
                            _context.t0 = _context.sent;

                            if (!(_context.t0 !== false)) {
                                _context.next = 7;
                                break;
                            }

                            tableStore.currentEditRecord = void 0;

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        _this.handleCommandCancel = function () {
            var record = _this.props.record;
            var tableStore = _this.context.tableStore;

            if (record.status === "add" /* add */) {
                    var dataSet = tableStore.dataSet;

                    dataSet.remove(record);
                } else {
                record.reset();
                tableStore.currentEditRecord = void 0;
            }
        };
        _this.renderCommand = function () {
            var _this$props3 = _this.props,
                column = _this$props3.column,
                record = _this$props3.record;
            var command = column.command;

            if (record.editing) {
                return [_react2['default'].createElement(
                    _Tooltip2['default'],
                    { key: 'save', title: (0, _localeContext.$l)('Table', 'save_button') },
                    _react2['default'].createElement(_Button2['default'], { color: "blue" /* blue */, funcType: "flat" /* flat */, icon: 'finished', onClick: _this.handleCommandSave })
                ), _react2['default'].createElement(
                    _Tooltip2['default'],
                    { key: 'cancel', title: (0, _localeContext.$l)('Table', 'cancel_button') },
                    _react2['default'].createElement(_Button2['default'], { color: "blue" /* blue */, funcType: "flat" /* flat */, icon: 'cancle_a', onClick: _this.handleCommandCancel })
                )];
            }
            if (command) {
                var children = [];
                command.forEach(function (button) {
                    var props = {};
                    if ((0, _mobx.isArrayLike)(button)) {
                        props = button[1];
                        button = button[0];
                    }
                    if ((0, _isString2['default'])(button) && button in _enum.TableCommandType) {
                        var defaultButtonProps = _this.getButtonProps(button, record);
                        if (defaultButtonProps) {
                            var title = defaultButtonProps.title,
                                otherProps = (0, _objectWithoutProperties3['default'])(defaultButtonProps, ['title']);

                            children.push(_react2['default'].createElement(
                                _Tooltip2['default'],
                                { key: button, title: title },
                                _react2['default'].createElement(_Button2['default'], (0, _extends3['default'])({ color: "blue" /* blue */, funcType: "flat" /* flat */ }, otherProps, props))
                            ));
                        }
                    } else if ((0, _react.isValidElement)(button)) {
                        children.push(button);
                    }
                });
                return children;
            }
        };
        _this.renderEditor = function () {
            var cellEditor = _this.cellEditor;

            if ((0, _react.isValidElement)(cellEditor)) {
                var _this$context$tableSt = _this.context.tableStore,
                    dataSet = _this$context$tableSt.dataSet,
                    pristine = _this$context$tableSt.pristine;
                var _this$props4 = _this.props,
                    name = _this$props4.column.name,
                    record = _this$props4.record;
                var checkField = dataSet.props.checkField;

                var newEditorProps = (0, _extends3['default'])({}, cellEditor.props, {
                    record: record,
                    name: name,
                    pristine: pristine,
                    disabled: (0, _utils.isDisabledRow)(record),
                    indeterminate: checkField && checkField === name && record.isIndeterminate,
                    labelLayout: "none" /* none */
                });
                return (0, _react.cloneElement)(cellEditor, newEditorProps);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(TableCell, [{
        key: 'getButtonProps',
        value: function getButtonProps(type, record) {
            var disabled = (0, _utils.isDisabledRow)(record);
            switch (type) {
                case _enum.TableCommandType.edit:
                    return { icon: 'mode_edit', onClick: this.handleCommandEdit, disabled: disabled, title: (0, _localeContext.$l)('Table', 'edit_button') };
                case _enum.TableCommandType['delete']:
                    return { icon: 'delete', onClick: this.handleCommandDelete, disabled: disabled, title: (0, _localeContext.$l)('Table', 'delete_button') };
                default:
            }
        }
    }, {
        key: 'getCheckBox',
        value: function getCheckBox() {
            var record = this.props.record;
            var dataSet = this.context.tableStore.dataSet;
            var checkField = dataSet.props.checkField;

            if (checkField) {
                return _react2['default'].createElement(_CheckBox2['default'], { name: checkField, record: record, disabled: (0, _utils.isDisabledRow)(record), indeterminate: record.isIndeterminate });
            }
        }
    }, {
        key: 'getCellRenderer',
        value: function getCellRenderer() {
            var column = this.props.column;
            var renderer = column.renderer,
                command = column.command;

            if (command) {
                return this.renderCommand;
            }
            if (this.cellEditorInCell) {
                return this.renderEditor;
            }
            return renderer;
        }
    }, {
        key: 'getInnerNode',
        value: function getInnerNode(prefixCls) {
            var _context$tableStore = this.context.tableStore,
                rowHeight = _context$tableStore.rowHeight,
                expandIconAsCell = _context$tableStore.expandIconAsCell,
                hasCheckFieldColumn = _context$tableStore.hasCheckFieldColumn,
                pristine = _context$tableStore.pristine,
                children = this.props.children;

            if (expandIconAsCell && children) {
                return children;
            }
            var _props = this.props,
                column = _props.column,
                record = _props.record,
                indentSize = _props.indentSize;
            var name = column.name;
            var hasEditor = this.hasEditor;

            var innerProps = {
                className: prefixCls + '-inner',
                tabIndex: hasEditor && !(0, _utils.isDisabledRow)(record) ? 0 : -1,
                onFocus: this.handleFocus,
                pristine: pristine
            };
            if (!hasEditor) {
                innerProps.onKeyDown = this.handleEditorKeyDown;
            }
            if (rowHeight !== 'auto') {
                innerProps.style = {
                    height: (0, _UnitConvertor.pxToRem)(rowHeight)
                };
            }
            var indentText = children && _react2['default'].createElement('span', { style: { paddingLeft: (0, _UnitConvertor.pxToRem)(indentSize * record.level) } });
            var checkBox = children && !hasCheckFieldColumn && this.getCheckBox();
            var prefix = (indentText || children || checkBox) && _react2['default'].createElement(
                'span',
                { key: 'prefix', className: prefixCls + '-prefix', style: innerProps.style },
                indentText,
                children,
                checkBox
            );
            return [prefix, _react2['default'].createElement(_Output2['default'], (0, _extends3['default'])({ key: 'output' }, innerProps, { record: record, renderer: this.getCellRenderer(), name: name, disabled: (0, _utils.isDisabledRow)(record), showHelp: "none" /* none */ }))];
        }
    }, {
        key: 'render',
        value: function render() {
            var _ref2;

            var _props2 = this.props,
                column = _props2.column,
                prefixCls = _props2.prefixCls,
                record = _props2.record;
            var _context$tableStore2 = this.context.tableStore,
                inlineEdit = _context$tableStore2.inlineEdit,
                pristine = _context$tableStore2.pristine;
            var className = column.className,
                style = column.style,
                align = column.align,
                name = column.name,
                onCell = column.onCell,
                command = column.command;

            var field = name ? record.getField(name) : void 0;
            var cellPrefix = prefixCls + '-cell';
            var cellExternalProps = typeof onCell === 'function' ? onCell({
                dataSet: record.dataSet,
                record: record,
                column: column
            }) : {};
            var cellStyle = (0, _extends3['default'])({
                textAlign: align || (command ? "center" /* center */ : (0, _utils.getAlignByField)(field))
            }, style, cellExternalProps.style);
            var classString = (0, _classnames2['default'])(cellPrefix, field ? (_ref2 = {}, (0, _defineProperty3['default'])(_ref2, cellPrefix + '-dirty', !pristine && field.dirty), (0, _defineProperty3['default'])(_ref2, cellPrefix + '-required', !inlineEdit && field.required), (0, _defineProperty3['default'])(_ref2, cellPrefix + '-editable', !inlineEdit && this.hasEditor), _ref2) : void 0, className, cellExternalProps.className);
            return _react2['default'].createElement(
                'td',
                (0, _extends3['default'])({}, cellExternalProps, { className: classString, style: (0, _omit2['default'])(cellStyle, ['width', 'height']), 'data-index': (0, _utils.getColumnKey)(column) }),
                this.getInnerNode(cellPrefix)
            );
        }
    }, {
        key: 'showEditor',
        value: function showEditor(cell, lock) {
            var name = this.props.column.name;
            var cellEditor = this.cellEditor;

            if (name && cellEditor && !(0, _utils.isRadio)(cellEditor)) {
                if (!lock) {
                    var tableStore = this.context.tableStore;
                    var node = tableStore.node,
                        overflowX = tableStore.overflowX;

                    if (overflowX) {
                        var tableBodyWrap = cell.offsetParent;
                        if (tableBodyWrap) {
                            var leftLeafColumnsWidth = tableStore.leftLeafColumnsWidth,
                                rightLeafColumnsWidth = tableStore.rightLeafColumnsWidth;
                            var offsetLeft = cell.offsetLeft,
                                offsetWidth = cell.offsetWidth;
                            var scrollLeft = tableBodyWrap.scrollLeft;

                            var _tableBodyWrap$getBou = tableBodyWrap.getBoundingClientRect(),
                                width = _tableBodyWrap$getBou.width;

                            var leftSide = offsetLeft - leftLeafColumnsWidth;
                            var rightSide = offsetLeft + offsetWidth - width + rightLeafColumnsWidth + (0, _measureScrollbar2['default'])();
                            var _scrollLeft = scrollLeft;
                            if (_scrollLeft < rightSide) {
                                _scrollLeft = rightSide;
                            }
                            if (_scrollLeft > leftSide) {
                                _scrollLeft = leftSide;
                            }
                            if (_scrollLeft !== scrollLeft) {
                                tableBodyWrap.scrollLeft = _scrollLeft;
                                node.handleBodyScrollLeft({
                                    target: tableBodyWrap,
                                    currentTarget: tableBodyWrap
                                });
                            }
                        }
                    }
                }
                this.context.tableStore.showEditor(name);
            }
        }
    }, {
        key: 'cellEditor',
        get: function get() {
            var _props3 = this.props,
                column = _props3.column,
                record = _props3.record;

            return (0, _utils.getEditorByColumnAndRecord)(column, record);
        }
    }, {
        key: 'cellEditorInCell',
        get: function get() {
            return (0, _utils.isRadio)(this.cellEditor);
        }
    }, {
        key: 'hasEditor',
        get: function get() {
            return !this.context.tableStore.pristine && this.cellEditor && !this.cellEditorInCell;
        }
    }]);
    return TableCell;
}(_react.Component);
TableCell.displayName = 'TableCell';
TableCell.propTypes = {
    prefixCls: _propTypes2['default'].string,
    column: _propTypes2['default'].object.isRequired,
    record: _propTypes2['default'].instanceOf(_Record2['default']).isRequired,
    indentSize: _propTypes2['default'].number.isRequired
};
TableCell.contextType = _TableContext2['default'];
tslib_1.__decorate([_mobx.computed], TableCell.prototype, "cellEditor", null);
tslib_1.__decorate([_mobx.computed], TableCell.prototype, "cellEditorInCell", null);
tslib_1.__decorate([_mobx.computed], TableCell.prototype, "hasEditor", null);
TableCell = tslib_1.__decorate([_mobxReact.observer], TableCell);
exports['default'] = TableCell;
module.exports = exports['default'];