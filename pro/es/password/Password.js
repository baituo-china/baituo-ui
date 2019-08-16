import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { TextField } from '../text-field/TextField';
import autobind from '../_util/autobind';
import Icon from '../icon';
// let selectionStart;
// let selectionEnd;
var Password = function (_TextField) {
    _inherits(Password, _TextField);

    // let selectionStart;
    // let selectionEnd;
    function Password() {
        _classCallCheck(this, Password);

        var _this = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).apply(this, arguments));

        _this.type = 'password';
        return _this;
    }

    _createClass(Password, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(Password.prototype.__proto__ || Object.getPrototypeOf(Password.prototype), 'getOtherProps', this).call(this), ['reveal']);
        }
    }, {
        key: 'getOtherPrevNode',
        value: function getOtherPrevNode() {
            return React.createElement('input', { tabIndex: -1, className: this.prefixCls + '-fix-autofill' });
        }
    }, {
        key: 'getInnerSpanButton',
        value: function getInnerSpanButton() {
            var reveal = this.props.reveal;

            if (reveal) {
                return this.wrapperInnerSpanButton(React.createElement(Icon, { type: this.reveal ? 'visibility' : 'visibility_off', onClick: this.handleToggleReveal }));
            }
        }
    }, {
        key: 'handleToggleReveal',
        value: function handleToggleReveal(e) {
            e.preventDefault();
            if (!this.isFocused) {
                this.focus();
            }
            var target = this.element;
            if (target) {
                if (target.type === 'password') {
                    this.doReveal(target);
                } else {
                    this.resetReveal(target);
                }
            }
        }
    }, {
        key: 'doReveal',
        value: function doReveal(target) {
            this.selectionEnd = target.selectionEnd;
            this.selectionStart = target.selectionStart;
            this.type = target.type = 'text';
            this.reveal = true;
        }
    }, {
        key: 'resetReveal',
        value: function resetReveal(target) {
            var selectionStart = this.selectionStart,
                selectionEnd = this.selectionEnd;

            this.type = target.type = 'password';
            if (typeof selectionStart !== 'undefined' && typeof selectionEnd !== 'undefined') {
                target.setSelectionRange(selectionStart, selectionEnd);
                this.selectionStart = void 0;
                this.selectionEnd = void 0;
            }
            this.reveal = false;
        }
    }]);

    return Password;
}(TextField);
Password.displayName = 'Password';
Password.propTypes = _extends({
    /**
     * 是否可揭示
     * @default true
     */
    reveal: PropTypes.bool
}, TextField.propTypes);
Password.defaultProps = _extends({}, TextField.defaultProps, {
    suffixCls: 'password',
    reveal: true
});
tslib_1.__decorate([observable], Password.prototype, "reveal", void 0);
tslib_1.__decorate([autobind], Password.prototype, "handleToggleReveal", null);
tslib_1.__decorate([action], Password.prototype, "doReveal", null);
tslib_1.__decorate([action], Password.prototype, "resetReveal", null);
Password = tslib_1.__decorate([observer], Password);
export default Password;