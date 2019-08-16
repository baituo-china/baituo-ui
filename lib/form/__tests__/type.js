'use strict';

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

var _Form = require('../Form');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// test Form.create on component without own props
/* tslint:disable */
var WithoutOwnProps = function (_Component) {
    (0, _inherits3['default'])(WithoutOwnProps, _Component);

    function WithoutOwnProps() {
        (0, _classCallCheck3['default'])(this, WithoutOwnProps);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (WithoutOwnProps.__proto__ || Object.getPrototypeOf(WithoutOwnProps)).apply(this, arguments));

        _this.state = {
            foo: 'bar'
        };
        return _this;
    }

    (0, _createClass3['default'])(WithoutOwnProps, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                'foo'
            );
        }
    }]);
    return WithoutOwnProps;
}(_react.Component);

var WithoutOwnPropsForm = _Form2['default'].create()(WithoutOwnProps);
_react2['default'].createElement(WithoutOwnPropsForm, null);

var WithOwnProps = function (_Component2) {
    (0, _inherits3['default'])(WithOwnProps, _Component2);

    function WithOwnProps() {
        (0, _classCallCheck3['default'])(this, WithOwnProps);

        var _this2 = (0, _possibleConstructorReturn3['default'])(this, (WithOwnProps.__proto__ || Object.getPrototypeOf(WithOwnProps)).apply(this, arguments));

        _this2.state = {
            foo: 'bar'
        };
        return _this2;
    }

    (0, _createClass3['default'])(WithOwnProps, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                'foo'
            );
        }
    }]);
    return WithOwnProps;
}(_react.Component);

var WithOwnPropsForm = _Form2['default'].create()(WithOwnProps);
_react2['default'].createElement(WithOwnPropsForm, { name: 'foo' });

var WithCreateOptions = function (_Component3) {
    (0, _inherits3['default'])(WithCreateOptions, _Component3);

    function WithCreateOptions() {
        (0, _classCallCheck3['default'])(this, WithCreateOptions);
        return (0, _possibleConstructorReturn3['default'])(this, (WithCreateOptions.__proto__ || Object.getPrototypeOf(WithCreateOptions)).apply(this, arguments));
    }

    (0, _createClass3['default'])(WithCreateOptions, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                'foo'
            );
        }
    }]);
    return WithCreateOptions;
}(_react.Component);

var mapPropsToFields = function mapPropsToFields(props) {
    var username = props.username;

    return {
        username: _Form2['default'].createFormField({ value: username })
    };
};
var formOptions = { mapPropsToFields: mapPropsToFields };
var WithCreateOptionsForm = _Form2['default'].create(formOptions)(WithCreateOptions);
_react2['default'].createElement(WithCreateOptionsForm, { username: 'foo' });