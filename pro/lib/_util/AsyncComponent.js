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

var _spin = require('../spin');

var _spin2 = _interopRequireDefault(_spin);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var asyncComponent = function asyncComponent(importComponent) {
    var AsyncComponent = function (_Component) {
        (0, _inherits3['default'])(AsyncComponent, _Component);

        function AsyncComponent() {
            (0, _classCallCheck3['default'])(this, AsyncComponent);

            var _this = (0, _possibleConstructorReturn3['default'])(this, (AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).apply(this, arguments));

            _this.state = {};
            return _this;
        }

        (0, _createClass3['default'])(AsyncComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                importComponent().then(function (_ref) {
                    var component = _ref['default'];

                    _this2.setState({ component: component });
                }, _exception2['default']);
            }
        }, {
            key: 'render',
            value: function render() {
                var Cmp = this.state.component;

                return Cmp ? _react2['default'].createElement(Cmp, this.props) : _react2['default'].createElement(_spin2['default'], null);
            }
        }]);
        return AsyncComponent;
    }(_react.Component);

    return AsyncComponent;
};
exports['default'] = asyncComponent;
module.exports = exports['default'];