import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classes from 'component-classes';
import TableContext from './TableContext';
import { pxToRem } from '../../../es/_util/UnitConvertor';

var TableCol = function (_PureComponent) {
    _inherits(TableCol, _PureComponent);

    function TableCol() {
        _classCallCheck(this, TableCol);

        var _this = _possibleConstructorReturn(this, (TableCol.__proto__ || Object.getPrototypeOf(TableCol)).apply(this, arguments));

        _this.handleTransitionEnd = function () {
            _this.fireResizeEnd();
        };
        return _this;
    }

    _createClass(TableCol, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                width = _props.width,
                minWidth = _props.minWidth;

            return React.createElement('col', { style: { width: pxToRem(width), minWidth: pxToRem(minWidth) }, onTransitionEnd: this.handleTransitionEnd });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var prefixCls = this.props.prefixCls;
            var element = this.context.tableStore.node.element;

            if (element && classes(element).has(prefixCls + '-resizing')) {
                this.fireResizeEnd();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var width = prevProps.width;

            if (!width || isNaN(width)) {
                this.fireResizeEnd();
            }
        }
    }, {
        key: 'fireResizeEnd',
        value: function fireResizeEnd() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                onResizeEnd = _props2.onResizeEnd;

            onResizeEnd();
            classes(this.context.tableStore.node.element).remove(prefixCls + '-resizing');
        }
    }]);

    return TableCol;
}(PureComponent);

export default TableCol;

TableCol.displayName = 'TableCol';
TableCol.contextType = TableContext;
TableCol.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onResizeEnd: PropTypes.func.isRequired
};