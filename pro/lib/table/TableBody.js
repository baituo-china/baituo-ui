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

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _ExpandedRow = require('./ExpandedRow');

var _ExpandedRow2 = _interopRequireDefault(_ExpandedRow);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableBody = function (_Component) {
    (0, _inherits3['default'])(TableBody, _Component);

    function TableBody() {
        (0, _classCallCheck3['default'])(this, TableBody);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).apply(this, arguments));

        _this.handleResize = (0, _debounce2['default'])(function () {
            _this.syncBodyHeight();
        }, 30);
        _this.saveRef = function (node) {
            _this.tableBody = node;
        };
        _this.renderExpandedRows = function (columns, record, isExpanded, lock) {
            return _this.getRows(record.children || [], columns, isExpanded, lock);
        };
        return _this;
    }

    (0, _createClass3['default'])(TableBody, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                lock = _props.lock;
            var leafColumns = this.leafColumns;
            var data = this.context.tableStore.data;

            var rows = data.length ? this.getRows(data, leafColumns, true, lock) : this.getEmptyRow(leafColumns, lock);
            return _react2['default'].createElement(
                'tbody',
                { ref: lock ? void 0 : this.saveRef, className: prefixCls + '-tbody' },
                rows
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.tableBody) {
                this.resizeObserver = new _resizeObserverPolyfill2['default'](this.handleResize);
                this.resizeObserver.observe(this.tableBody);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.handleResize.cancel();
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this.props.lock) {
                var node = this.context.tableStore.node;

                if ((0, _componentClasses2['default'])(node.wrapper).has(this.props.prefixCls + '-focused')) {
                    node.focus();
                }
            }
        }
    }, {
        key: 'getRows',
        value: function getRows(records, columns, expanded, lock) {
            var _this2 = this;

            return records.map(function (record, index) {
                return _this2.getRow(columns, record, index, expanded, lock);
            });
        }
    }, {
        key: 'getEmptyRow',
        value: function getEmptyRow(columns, lock) {
            var _context$tableStore = this.context.tableStore,
                dataSet = _context$tableStore.dataSet,
                emptyText = _context$tableStore.emptyText,
                width = _context$tableStore.width;
            var prefixCls = this.props.prefixCls;

            var style = width ? {
                marginLeft: (0, _UnitConvertor.pxToRem)(width / 2)
            } : {
                transform: 'none',
                display: 'inline-block'
            };
            var tdStyle = width ? {} : { textAlign: 'center' };
            return _react2['default'].createElement(
                'tr',
                { className: prefixCls + '-empty-row' },
                _react2['default'].createElement(
                    'td',
                    { colSpan: columns.length, style: tdStyle },
                    _react2['default'].createElement(
                        'div',
                        { style: style },
                        !lock && dataSet.status === "ready" /* ready */ && emptyText
                    )
                )
            );
        }
    }, {
        key: 'getRow',
        value: function getRow(columns, record, index, expanded, lock) {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                indentSize = _props2.indentSize;
            var isTree = this.context.tableStore.isTree;

            var children = isTree && _react2['default'].createElement(
                _ExpandedRow2['default'],
                { record: record, columns: columns, lock: lock },
                this.renderExpandedRows
            );
            return _react2['default'].createElement(
                _TableRow2['default'],
                { key: record.key, hidden: !expanded, lock: lock, indentSize: indentSize, prefixCls: prefixCls, columns: columns, record: record, index: index },
                children
            );
        }
    }, {
        key: 'syncBodyHeight',
        value: function syncBodyHeight() {
            var tableStore = this.context.tableStore;

            if (this.tableBody) {
                tableStore.bodyHeight = this.tableBody.offsetHeight;
            }
        }
    }, {
        key: 'leafColumns',
        get: function get() {
            var tableStore = this.context.tableStore;
            var lock = this.props.lock;

            if (lock === 'right') {
                return tableStore.rightLeafColumns;
            } else if (lock) {
                return tableStore.leftLeafColumns;
            } else {
                return tableStore.leafColumns;
            }
        }
    }]);
    return TableBody;
}(_react.Component);
TableBody.displayName = 'TableBody';
TableBody.propTypes = {
    lock: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].oneOf(["right" /* right */, "left" /* left */])]),
    prefixCls: _propTypes2['default'].string,
    indentSize: _propTypes2['default'].number.isRequired
};
TableBody.contextType = _TableContext2['default'];
tslib_1.__decorate([_mobx.computed], TableBody.prototype, "leafColumns", null);
tslib_1.__decorate([_mobx.action], TableBody.prototype, "syncBodyHeight", null);
TableBody = tslib_1.__decorate([_mobxReact.observer], TableBody);
exports['default'] = TableBody;
module.exports = exports['default'];