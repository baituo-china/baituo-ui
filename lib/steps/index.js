'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _steps = require('../rc-components/steps');

var _steps2 = _interopRequireDefault(_steps);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Steps = function (_Component) {
    (0, _inherits3['default'])(Steps, _Component);

    function Steps() {
        (0, _classCallCheck3['default'])(this, Steps);
        return (0, _possibleConstructorReturn3['default'])(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Steps, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(_steps2['default'], (0, _extends3['default'])({}, this.props, { prefixCls: (0, _configure.getPrefixCls)('steps', this.props.prefixCls) }));
        }
    }]);
    return Steps;
}(_react.Component);

exports['default'] = Steps;

Steps.displayName = 'Steps';
Steps.Step = _steps2['default'].Step;
Steps.defaultProps = {
    iconPrefix: 'icon',
    current: 0
};
Steps.propTypes = {
    prefixCls: _propTypes2['default'].string,
    iconPrefix: _propTypes2['default'].string,
    current: _propTypes2['default'].number
};
module.exports = exports['default'];