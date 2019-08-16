import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import { observer } from 'mobx-react';
import KeyCode from '../../../es/_util/KeyCode';
import { CheckBox } from '../check-box/CheckBox';
import autobind from '../_util/autobind';
var Switch = function (_CheckBox) {
    _inherits(Switch, _CheckBox);

    function Switch() {
        _classCallCheck(this, Switch);

        return _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));
    }

    _createClass(Switch, [{
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (e.keyCode === KeyCode.LEFT) {
                this.setChecked(false);
            } else if (e.keyCode === KeyCode.RIGHT) {
                this.setChecked(true);
            }
            _get(Switch.prototype.__proto__ || Object.getPrototypeOf(Switch.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'getText',
        value: function getText() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                children = _props.children,
                unCheckedChildren = _props.unCheckedChildren;

            var text = this.isChecked() ? children : unCheckedChildren || children;
            return React.createElement(
                'span',
                { className: prefixCls + '-label' },
                text
            );
        }
    }, {
        key: 'renderInner',
        value: function renderInner() {
            return;
        }
    }]);

    return Switch;
}(CheckBox);
Switch.displayName = 'Switch';
Switch.defaultProps = _extends({}, CheckBox.defaultProps, {
    suffixCls: 'switch'
});
tslib_1.__decorate([autobind], Switch.prototype, "handleKeyDown", null);
Switch = tslib_1.__decorate([observer], Switch);
export default Switch;