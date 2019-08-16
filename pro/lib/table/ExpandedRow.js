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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ExpandedRow = function (_PureComponent) {
    (0, _inherits3['default'])(ExpandedRow, _PureComponent);

    function ExpandedRow() {
        (0, _classCallCheck3['default'])(this, ExpandedRow);
        return (0, _possibleConstructorReturn3['default'])(this, (ExpandedRow.__proto__ || Object.getPrototypeOf(ExpandedRow)).apply(this, arguments));
    }

    (0, _createClass3['default'])(ExpandedRow, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                isExpanded = _props.isExpanded,
                children = _props.children,
                columns = _props.columns,
                record = _props.record,
                lock = _props.lock;

            if (typeof children === 'function') {
                return children(columns, record, isExpanded, lock);
            }
            return null;
        }
    }]);
    return ExpandedRow;
}(_react.PureComponent);

exports['default'] = ExpandedRow;
module.exports = exports['default'];