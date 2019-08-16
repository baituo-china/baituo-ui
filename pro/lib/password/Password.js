'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _TextField2 = require('../text-field/TextField');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// let selectionStart;
// let selectionEnd;
var Password = function (_TextField) {
    (0, _inherits3['default'])(Password, _TextField);

    // let selectionStart;
    // let selectionEnd;
    function Password() {
        (0, _classCallCheck3['default'])(this, Password);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Password.__proto__ || Object.getPrototypeOf(Password)).apply(this, arguments));

        _this.type = 'password';
        return _this;
    }

    (0, _createClass3['default'])(Password, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(Password.prototype.__proto__ || Object.getPrototypeOf(Password.prototype), 'getOtherProps', this).call(this), ['reveal']);
        }
    }, {
        key: 'getOtherPrevNode',
        value: function getOtherPrevNode() {
            return _react2['default'].createElement('input', { tabIndex: -1, className: this.prefixCls + '-fix-autofill' });
        }
    }, {
        key: 'getInnerSpanButton',
        value: function getInnerSpanButton() {
            var reveal = this.props.reveal;

            if (reveal) {
                return this.wrapperInnerSpanButton(_react2['default'].createElement(_icon2['default'], { type: this.reveal ? 'visibility' : 'visibility_off', onClick: this.handleToggleReveal }));
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
}(_TextField2.TextField);
Password.displayName = 'Password';
Password.propTypes = (0, _extends3['default'])({
    /**
     * 是否可揭示
     * @default true
     */
    reveal: _propTypes2['default'].bool
}, _TextField2.TextField.propTypes);
Password.defaultProps = (0, _extends3['default'])({}, _TextField2.TextField.defaultProps, {
    suffixCls: 'password',
    reveal: true
});
tslib_1.__decorate([_mobx.observable], Password.prototype, "reveal", void 0);
tslib_1.__decorate([_autobind2['default']], Password.prototype, "handleToggleReveal", null);
tslib_1.__decorate([_mobx.action], Password.prototype, "doReveal", null);
tslib_1.__decorate([_mobx.action], Password.prototype, "resetReveal", null);
Password = tslib_1.__decorate([_mobxReact.observer], Password);
exports['default'] = Password;
module.exports = exports['default'];