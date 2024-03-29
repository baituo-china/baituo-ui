import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable */
import React, { Component } from 'react';
import Form from '../Form';
// test Form.create on component without own props

var WithoutOwnProps = function (_Component) {
    _inherits(WithoutOwnProps, _Component);

    function WithoutOwnProps() {
        _classCallCheck(this, WithoutOwnProps);

        var _this = _possibleConstructorReturn(this, (WithoutOwnProps.__proto__ || Object.getPrototypeOf(WithoutOwnProps)).apply(this, arguments));

        _this.state = {
            foo: 'bar'
        };
        return _this;
    }

    _createClass(WithoutOwnProps, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'foo'
            );
        }
    }]);

    return WithoutOwnProps;
}(Component);

var WithoutOwnPropsForm = Form.create()(WithoutOwnProps);
React.createElement(WithoutOwnPropsForm, null);

var WithOwnProps = function (_Component2) {
    _inherits(WithOwnProps, _Component2);

    function WithOwnProps() {
        _classCallCheck(this, WithOwnProps);

        var _this2 = _possibleConstructorReturn(this, (WithOwnProps.__proto__ || Object.getPrototypeOf(WithOwnProps)).apply(this, arguments));

        _this2.state = {
            foo: 'bar'
        };
        return _this2;
    }

    _createClass(WithOwnProps, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'foo'
            );
        }
    }]);

    return WithOwnProps;
}(Component);

var WithOwnPropsForm = Form.create()(WithOwnProps);
React.createElement(WithOwnPropsForm, { name: 'foo' });

var WithCreateOptions = function (_Component3) {
    _inherits(WithCreateOptions, _Component3);

    function WithCreateOptions() {
        _classCallCheck(this, WithCreateOptions);

        return _possibleConstructorReturn(this, (WithCreateOptions.__proto__ || Object.getPrototypeOf(WithCreateOptions)).apply(this, arguments));
    }

    _createClass(WithCreateOptions, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'foo'
            );
        }
    }]);

    return WithCreateOptions;
}(Component);

var mapPropsToFields = function mapPropsToFields(props) {
    var username = props.username;

    return {
        username: Form.createFormField({ value: username })
    };
};
var formOptions = { mapPropsToFields: mapPropsToFields };
var WithCreateOptionsForm = Form.create(formOptions)(WithCreateOptions);
React.createElement(WithCreateOptionsForm, { username: 'foo' });