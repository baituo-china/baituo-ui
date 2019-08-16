import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import TableContext from './TableContext';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import classNames from 'classnames';
import { getAlignByField } from './utils';
var TableFooterCell = function (_Component) {
    _inherits(TableFooterCell, _Component);

    function TableFooterCell() {
        _classCallCheck(this, TableFooterCell);

        return _possibleConstructorReturn(this, (TableFooterCell.__proto__ || Object.getPrototypeOf(TableFooterCell)).apply(this, arguments));
    }

    _createClass(TableFooterCell, [{
        key: 'getFooter',
        value: function getFooter(footer, dataSet) {
            switch (typeof footer === 'undefined' ? 'undefined' : _typeof(footer)) {
                case 'function':
                    return footer(dataSet, this.props.column.name);
                case 'string':
                    return React.createElement(
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

            var classString = classNames(prefixCls + '-cell', footerClassName);
            var innerProps = {
                className: prefixCls + '-cell-inner'
            };
            if (rowHeight !== 'auto') {
                innerProps.style = {
                    height: pxToRem(rowHeight)
                };
            }
            var cellStyle = _extends({
                textAlign: align || (command ? "center" /* center */ : getAlignByField(dataSet.getField(name)))
            }, footerStyle);
            return React.createElement(
                'th',
                { className: classString, style: omit(cellStyle, ['width', 'height']) },
                React.createElement(
                    'div',
                    innerProps,
                    this.getFooter(footer, dataSet)
                )
            );
        }
    }]);

    return TableFooterCell;
}(Component);
TableFooterCell.displayName = 'TableFooterCell';
TableFooterCell.propTypes = {
    column: PropTypes.object.isRequired
};
TableFooterCell.contextType = TableContext;
TableFooterCell = tslib_1.__decorate([observer], TableFooterCell);
export default TableFooterCell;