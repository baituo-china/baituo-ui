import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Button from '../button';

var ActionButton = function (_Component) {
    _inherits(ActionButton, _Component);

    function ActionButton(props) {
        _classCallCheck(this, ActionButton);

        var _this = _possibleConstructorReturn(this, (ActionButton.__proto__ || Object.getPrototypeOf(ActionButton)).call(this, props));

        _this.onClick = function (props) {
            var actionFn = props.actionFn,
                closeModal = props.closeModal;

            if (actionFn) {
                var ret = void 0;
                if (actionFn.length) {
                    ret = actionFn(closeModal);
                } else {
                    ret = actionFn();
                    if (!ret) {
                        closeModal();
                    }
                }
                if (ret && ret.then) {
                    _this.setState({ loading: true });
                    ret.then(function () {
                        // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
                        // this.setState({ loading: false });
                        closeModal.apply(undefined, arguments);
                    }, function () {
                        _this.setState({ loading: false });
                    });
                }
            } else {
                closeModal();
            }
        };
        _this.state = {
            loading: false
        };
        return _this;
    }

    _createClass(ActionButton, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.autoFocus) {
                var $this = findDOMNode(this);
                this.timeoutId = setTimeout(function () {
                    return $this.focus();
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timeoutId);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                okProps = _props.okProps,
                cancelProps = _props.cancelProps;
            var loading = this.state.loading;

            var cancelButton = cancelProps && React.createElement(
                Button,
                { disabled: loading, onClick: function onClick() {
                        _this2.onClick(cancelProps);
                    } },
                cancelProps.text
            );
            return React.createElement(
                'div',
                null,
                cancelButton,
                React.createElement(
                    Button,
                    { loading: loading, type: okProps.type, onClick: function onClick() {
                            _this2.onClick(okProps);
                        } },
                    okProps.text
                )
            );
        }
    }]);

    return ActionButton;
}(Component);

export default ActionButton;