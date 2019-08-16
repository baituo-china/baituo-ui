'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableFooterCell = function (_Component) {
    (0, _inherits3['default'])(TableFooterCell, _Component);

    function TableFooterCell() {
        (0, _classCallCheck3['default'])(this, TableFooterCell);
        return (0, _possibleConstructorReturn3['default'])(this, (TableFooterCell.__proto__ || Object.getPrototypeOf(TableFooterCell)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TableFooterCell, [{
        key: 'getFooter',
        value: function getFooter(footer, dataSet) {
            switch (typeof footer === 'undefined' ? 'undefined' : (0, _typeof3['default'])(footer)) {
                case 'function':
                    return footer(dataSet, this.props.column.name);
                case 'string':
                    return _react2['default'].createElement(
                        'span',
                        null,
                        footer
                    );
                default:
                    return footer;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                column = _props.column,
                prefixCls = _props.prefixCls,
                dataSet = _props.dataSet;
            var rowHeight = this.context.tableStore.rowHeight;
            var footer = column.footer,
                footerClassName = column.footerClassName,
                _column$footerStyle = column.footerStyle,
                footerStyle = _column$footerStyle === undefined ? {} : _column$footerStyle,
                align = column.align,
                name = column.name,
                command = column.command;

            var classString = (0, _classnames2['default'])(prefixCls + '-cell', footerClassName);
            var innerProps = {
                className: prefixCls + '-cell-inner'
            };
            if (rowHeight !== 'auto') {
                innerProps.style = {
                    height: (0, _UnitConvertor.pxToRem)(rowHeight)
                };
            }
            var cellStyle = (0, _extends3['default'])({
                textAlign: align || (command ? "center" /* center */ : (0, _utils.getAlignByField)(dataSet.getField(name)))
            }, footerStyle);
            return _react2['default'].createElement(
                'th',
                { className: classString, style: (0, _omit2['default'])(cellStyle, ['width', 'height']) },
                _react2['default'].createElement(
                    'div',
                    innerProps,
                    this.getFooter(footer, dataSet)
                )
            );
        }
    }]);
    return TableFooterCell;
}(_react.Component);
TableFooterCell.displayName = 'TableFooterCell';
TableFooterCell.propTypes = {
    column: _propTypes2['default'].object.isRequired
};
TableFooterCell.contextType = _TableContext2['default'];
TableFooterCell = tslib_1.__decorate([_mobxReact.observer], TableFooterCell);
exports['default'] = TableFooterCell;
module.exports = exports['default'];