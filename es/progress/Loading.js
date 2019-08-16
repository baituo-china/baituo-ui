import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
var SIZE = 50;

var Loading = function (_Component) {
    _inherits(Loading, _Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'svg',
                { viewBox: '0 0 ' + SIZE + ' ' + SIZE },
                React.createElement('circle', { cx: SIZE / 2, cy: SIZE / 2, r: SIZE / 2 - 5 })
            );
        }
    }]);

    return Loading;
}(Component);

export default Loading;

Loading.displayName = 'Loading';