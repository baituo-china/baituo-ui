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

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _TableFooterCell = require('./TableFooterCell');

var _TableFooterCell2 = _interopRequireDefault(_TableFooterCell);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableFooter = function (_Component) {
    (0, _inherits3['default'])(TableFooter, _Component);

    function TableFooter() {
        (0, _classCallCheck3['default'])(this, TableFooter);
        return (0, _possibleConstructorReturn3['default'])(this, (TableFooter.__proto__ || Object.getPrototypeOf(TableFooter)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TableFooter, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                lock = _props.lock,
                dataSet = _props.dataSet;
            var _context$tableStore = this.context.tableStore,
                lockColumnsFootRowsHeight = _context$tableStore.lockColumnsFootRowsHeight,
                overflowY = _context$tableStore.overflowY,
                rowHeight = _context$tableStore.rowHeight;

            var tds = this.leafColumns.map(function (column) {
                var hidden = column.hidden;

                if (!hidden) {
                    return _react2['default'].createElement(_TableFooterCell2['default'], { key: (0, _utils.getColumnKey)(column), prefixCls: prefixCls, dataSet: dataSet, column: column });
                }
            });
            if (overflowY && lock !== "left" /* left */) {
                    tds.push(_react2['default'].createElement('th', { key: 'fixed-column', className: prefixCls + '-cell' }));
                }
            return _react2['default'].createElement(
                'tfoot',
                { className: prefixCls + '-tfoot' },
                _react2['default'].createElement(
                    'tr',
                    { style: { height: lock && rowHeight === 'auto' ? (0, _UnitConvertor.pxToRem)((0, _mobx.get)(lockColumnsFootRowsHeight, 0)) : void 0 } },
                    tds
                )
            );
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
    return TableFooter;
}(_react.Component);
TableFooter.displayName = 'TableFooter';
TableFooter.propTypes = {
    prefixCls: _propTypes2['default'].string,
    lock: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].oneOf(["right" /* right */, "left" /* left */])])
};
TableFooter.contextType = _TableContext2['default'];
tslib_1.__decorate([_mobx.computed], TableFooter.prototype, "leafColumns", null);
TableFooter = tslib_1.__decorate([_mobxReact.observer], TableFooter);
exports['default'] = TableFooter;
module.exports = exports['default'];