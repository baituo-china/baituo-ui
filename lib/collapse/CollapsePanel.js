'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _collapse = require('../rc-components/collapse');

var _collapse2 = _interopRequireDefault(_collapse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CollapsePanel = function (_Component) {
    (0, _inherits3['default'])(CollapsePanel, _Component);

    function CollapsePanel() {
        (0, _classCallCheck3['default'])(this, CollapsePanel);
        return (0, _possibleConstructorReturn3['default'])(this, (CollapsePanel.__proto__ || Object.getPrototypeOf(CollapsePanel)).apply(this, arguments));
    }

    (0, _createClass3['default'])(CollapsePanel, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                _props$showArrow = _props.showArrow,
                showArrow = _props$showArrow === undefined ? true : _props$showArrow;

            var collapsePanelClassName = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-no-arrow', !showArrow), className);
            return _react2['default'].createElement(_collapse2['default'].Panel, (0, _extends3['default'])({}, this.props, { className: collapsePanelClassName }));
        }
    }]);
    return CollapsePanel;
}(_react.Component);

exports['default'] = CollapsePanel;
module.exports = exports['default'];