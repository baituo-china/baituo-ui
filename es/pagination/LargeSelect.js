import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Select from '../select';

var LargeSelect = function (_Component) {
    _inherits(LargeSelect, _Component);

    function LargeSelect() {
        _classCallCheck(this, LargeSelect);

        return _possibleConstructorReturn(this, (LargeSelect.__proto__ || Object.getPrototypeOf(LargeSelect)).apply(this, arguments));
    }

    _createClass(LargeSelect, [{
        key: 'render',
        value: function render() {
            return React.createElement(Select, _extends({ size: "large" /* large */ }, this.props));
        }
    }]);

    return LargeSelect;
}(Component);

export default LargeSelect;

LargeSelect.Option = Select.Option;