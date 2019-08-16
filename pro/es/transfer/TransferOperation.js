import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import noop from 'lodash/noop';
import Button from '../button';

var TransferOperation = function (_Component) {
    _inherits(TransferOperation, _Component);

    function TransferOperation() {
        _classCallCheck(this, TransferOperation);

        return _possibleConstructorReturn(this, (TransferOperation.__proto__ || Object.getPrototypeOf(TransferOperation)).apply(this, arguments));
    }

    _createClass(TransferOperation, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$moveToLeft = _props.moveToLeft,
                moveToLeft = _props$moveToLeft === undefined ? noop : _props$moveToLeft,
                _props$moveToRight = _props.moveToRight,
                moveToRight = _props$moveToRight === undefined ? noop : _props$moveToRight,
                leftActive = _props.leftActive,
                rightActive = _props.rightActive,
                className = _props.className,
                multiple = _props.multiple;

            if (multiple) {
                return React.createElement(
                    'div',
                    { className: className },
                    React.createElement(Button, { color: "blue" /* blue */, size: "small" /* small */, disabled: !leftActive, onClick: moveToLeft, icon: 'navigate_before' }),
                    React.createElement(Button, { color: "blue" /* blue */, size: "small" /* small */, disabled: !rightActive, onClick: moveToRight, icon: 'navigate_next' })
                );
            }
            return null;
        }
    }]);

    return TransferOperation;
}(Component);

export default TransferOperation;