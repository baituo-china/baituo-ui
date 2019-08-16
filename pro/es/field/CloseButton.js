import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import Icon from '../icon';
import { stopEvent, stopPropagation } from '../_util/EventManager';

var CloseButton = function (_PureComponent) {
    _inherits(CloseButton, _PureComponent);

    function CloseButton() {
        _classCallCheck(this, CloseButton);

        var _this = _possibleConstructorReturn(this, (CloseButton.__proto__ || Object.getPrototypeOf(CloseButton)).apply(this, arguments));

        _this.handleClick = function (e) {
            stopEvent(e);
            var _this$props = _this.props,
                onClose = _this$props.onClose,
                value = _this$props.value,
                index = _this$props.index;

            onClose(e, value, index);
        };
        return _this;
    }

    _createClass(CloseButton, [{
        key: 'render',
        value: function render() {
            return React.createElement(Icon, { type: 'cancel', onClick: this.handleClick, onFocus: stopPropagation, onMouseDown: stopEvent, tabIndex: -1 });
        }
    }]);

    return CloseButton;
}(PureComponent);

export default CloseButton;