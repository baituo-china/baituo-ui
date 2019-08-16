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

var _FilterSelect = require('./FilterSelect');

var _FilterSelect2 = _interopRequireDefault(_FilterSelect);

var _ColumnFilter = require('./ColumnFilter');

var _ColumnFilter2 = _interopRequireDefault(_ColumnFilter);

var _localeContext = require('../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FilterBar = function (_PureComponent) {
    (0, _inherits3['default'])(FilterBar, _PureComponent);

    function FilterBar() {
        (0, _classCallCheck3['default'])(this, FilterBar);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (FilterBar.__proto__ || Object.getPrototypeOf(FilterBar)).apply(this, arguments));

        _this.handleChange = function () {
            var dataSet = _this.props.dataSet;

            dataSet.query();
        };
        return _this;
    }

    (0, _createClass3['default'])(FilterBar, [{
        key: 'renderSuffix',
        value: function renderSuffix() {
            var prefixCls = this.props.prefixCls;

            return _react2['default'].createElement(_ColumnFilter2['default'], { prefixCls: prefixCls });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                dataSet = _props.dataSet,
                paramName = _props.paramName,
                _props$placeholder = _props.placeholder,
                placeholder = _props$placeholder === undefined ? (0, _localeContext.$l)('Table', 'filter_bar_placeholder') : _props$placeholder;

            return _react2['default'].createElement(_FilterSelect2['default'], { prefixCls: prefixCls + '-filter-select', optionDataSet: dataSet, placeholder: placeholder, suffix: this.renderSuffix(), paramName: paramName, onChange: this.handleChange });
        }
    }]);
    return FilterBar;
}(_react.PureComponent);

exports['default'] = FilterBar;

;
module.exports = exports['default'];