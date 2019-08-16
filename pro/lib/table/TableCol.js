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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _TableContext = require('./TableContext');

var _TableContext2 = _interopRequireDefault(_TableContext);

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableCol = function (_PureComponent) {
    (0, _inherits3['default'])(TableCol, _PureComponent);

    function TableCol() {
        (0, _classCallCheck3['default'])(this, TableCol);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TableCol.__proto__ || Object.getPrototypeOf(TableCol)).apply(this, arguments));

        _this.handleTransitionEnd = function () {
            _this.fireResizeEnd();
        };
        return _this;
    }

    (0, _createClass3['default'])(TableCol, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                width = _props.width,
                minWidth = _props.minWidth;

            return _react2['default'].createElement('col', { style: { width: (0, _UnitConvertor.pxToRem)(width), minWidth: (0, _UnitConvertor.pxToRem)(minWidth) }, onTransitionEnd: this.handleTransitionEnd });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var prefixCls = this.props.prefixCls;
            var element = this.context.tableStore.node.element;

            if (element && (0, _componentClasses2['default'])(element).has(prefixCls + '-resizing')) {
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
            (0, _componentClasses2['default'])(this.context.tableStore.node.element).remove(prefixCls + '-resizing');
        }
    }]);
    return TableCol;
}(_react.PureComponent);

exports['default'] = TableCol;

TableCol.displayName = 'TableCol';
TableCol.contextType = _TableContext2['default'];
TableCol.propTypes = {
    width: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    minWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
    onResizeEnd: _propTypes2['default'].func.isRequired
};
module.exports = exports['default'];